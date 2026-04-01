import { NextResponse } from 'next/server';

const WIKI_API = 'https://en.wikipedia.org/w/api.php';
const DDG_API = 'https://api.duckduckgo.com/';

// ─── Wikipedia helpers ────────────────────────────────────────────────────────

async function wikiSearch(query, limit = 3) {
  const params = new URLSearchParams({
    action: 'query',
    list: 'search',
    srsearch: query,
    srlimit: String(limit),
    srprop: 'snippet|titlesnippet',
    format: 'json',
    origin: '*',
  });
  const res = await fetch(`${WIKI_API}?${params}`, {
    headers: { 'User-Agent': 'AhamBharatam/2.0 (history-chatbot)' },
    next: { revalidate: 1800 },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data?.query?.search || [];
}

async function wikiExtract(title, sentences = 6) {
  const params = new URLSearchParams({
    action: 'query',
    prop: 'extracts|info',
    titles: title,
    exsentences: String(sentences),
    explaintext: '1',
    exintro: '1',
    inprop: 'url',
    format: 'json',
    origin: '*',
  });
  const res = await fetch(`${WIKI_API}?${params}`, {
    headers: { 'User-Agent': 'AhamBharatam/2.0 (history-chatbot)' },
    next: { revalidate: 1800 },
  });
  if (!res.ok) return null;
  const data = await res.json();
  const pages = Object.values(data?.query?.pages || {});
  if (!pages.length || pages[0].missing !== undefined) return null;
  return {
    title: pages[0].title,
    extract: pages[0].extract || '',
    url: `https://en.wikipedia.org/wiki/${encodeURIComponent((pages[0].title || title).replace(/ /g, '_'))}`,
  };
}

// ─── DuckDuckGo Instant Answer ────────────────────────────────────────────────

async function ddgInstant(query) {
  const params = new URLSearchParams({
    q: query,
    format: 'json',
    no_html: '1',
    skip_disambig: '1',
  });
  try {
    const res = await fetch(`${DDG_API}?${params}`, {
      headers: { 'User-Agent': 'AhamBharatam/2.0 (history-chatbot)' },
      next: { revalidate: 1800 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      abstract: data?.AbstractText || '',
      abstractUrl: data?.AbstractURL || '',
      abstractSource: data?.AbstractSource || '',
      relatedTopics: (data?.RelatedTopics || [])
        .filter((t) => t.FirstURL && t.Text)
        .slice(0, 3)
        .map((t) => ({ url: t.FirstURL, text: t.Text })),
    };
  } catch {
    return null;
  }
}

// ─── Synthesise answer ────────────────────────────────────────────────────────

function cleanExtract(text) {
  return text
    .replace(/\n{3,}/g, '\n\n')
    .replace(/=+\s*[^=]+\s*=+/g, '')
    .trim();
}

function buildSummary(results, ddg) {
  // Prefer DDG abstract if rich
  if (ddg?.abstract && ddg.abstract.length > 120) {
    return ddg.abstract;
  }
  // Fall back to first Wikipedia extract
  const best = results.find((r) => r?.extract && r.extract.length > 60);
  if (best) return cleanExtract(best.extract);
  // Last resort: snippet text
  return null;
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim();

  if (!query) {
    return NextResponse.json({ error: 'Missing query' }, { status: 400 });
  }

  try {
    // Run Wikipedia search + DuckDuckGo in parallel
    const [searchHits, ddg] = await Promise.all([
      wikiSearch(query, 4),
      ddgInstant(query),
    ]);

    if (!searchHits.length && !ddg?.abstract) {
      return NextResponse.json({
        answer: `I could not find any information about "${query}" on the web right now. Try rephrasing your question.`,
        sources: [],
      });
    }

    // Fetch full extracts for top 2 Wikipedia hits in parallel
    const topTitles = searchHits.slice(0, 2).map((h) => h.title);
    const extracts = await Promise.all(topTitles.map((t) => wikiExtract(t, 6)));

    const validExtracts = extracts.filter(Boolean);
    const summary = buildSummary(validExtracts, ddg);

    // Build source list (deduplicated)
    const sources = [];
    const seenUrls = new Set();

    // DDG source first if it has a URL
    if (ddg?.abstractUrl && ddg.abstractSource) {
      sources.push({
        title: ddg.abstractSource,
        url: ddg.abstractUrl,
        snippet: ddg.abstract?.slice(0, 120) || '',
      });
      seenUrls.add(ddg.abstractUrl);
    }

    // Wikipedia pages
    for (const ex of validExtracts) {
      if (!seenUrls.has(ex.url)) {
        sources.push({
          title: ex.title,
          url: ex.url,
          snippet: cleanExtract(ex.extract).slice(0, 140),
        });
        seenUrls.add(ex.url);
      }
    }

    // Additional Wikipedia search results as extra references
    for (const hit of searchHits.slice(0, 3)) {
      const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(hit.title.replace(/ /g, '_'))}`;
      if (!seenUrls.has(url)) {
        sources.push({
          title: hit.title,
          url,
          snippet: hit.snippet?.replace(/<[^>]*>/g, '').slice(0, 140) || '',
        });
        seenUrls.add(url);
      }
    }

    // DDG related topics as bonus links
    for (const topic of ddg?.relatedTopics || []) {
      if (!seenUrls.has(topic.url)) {
        sources.push({
          title: topic.text.slice(0, 60),
          url: topic.url,
          snippet: topic.text.slice(0, 140),
        });
        seenUrls.add(topic.url);
      }
    }

    const finalSources = sources.slice(0, 5);

    if (!summary) {
      return NextResponse.json({
        answer: `Here are the most relevant web results I found for "${query}":`,
        sources: finalSources,
      });
    }

    return NextResponse.json({
      answer: summary,
      sources: finalSources,
    });
  } catch (err) {
    console.error('[history-chat] error:', err);
    return NextResponse.json({
      answer: 'I encountered an error fetching web results. Please try again in a moment.',
      sources: [],
    });
  }
}
