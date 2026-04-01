import { NextResponse } from 'next/server';

const WIKI_API = 'https://en.wikipedia.org/w/api.php';

async function wikipediaSearch(query) {
  const searchParams = new URLSearchParams({
    action: 'query',
    list: 'search',
    srsearch: query,
    srlimit: '1',
    format: 'json',
    origin: '*',
  });

  const response = await fetch(`${WIKI_API}?${searchParams.toString()}`, {
    headers: {
      'User-Agent': 'Bharatam/1.0 (history chatbot fallback)',
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error('Search request failed');
  }

  const data = await response.json();
  return data?.query?.search?.[0] || null;
}

async function wikipediaExtract(title) {
  const searchParams = new URLSearchParams({
    action: 'query',
    prop: 'extracts',
    titles: title,
    exintro: '1',
    exsentences: '2',
    explaintext: '1',
    format: 'json',
    origin: '*',
  });

  const response = await fetch(`${WIKI_API}?${searchParams.toString()}`, {
    headers: {
      'User-Agent': 'Bharatam/1.0 (history chatbot fallback)',
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error('Extract request failed');
  }

  const data = await response.json();
  const pages = Object.values(data?.query?.pages || {});
  return pages?.[0]?.extract || '';
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim();

  if (!query) {
    return NextResponse.json({ error: 'Missing query' }, { status: 400 });
  }

  try {
    const match = await wikipediaSearch(query);

    if (!match?.title) {
      return NextResponse.json({
        answer: "No directory found, fetching from the web: I couldn't find a concise reference for that query.",
      });
    }

    const extract = await wikipediaExtract(match.title);
    const summary = extract?.trim()
      ? extract.trim()
      : `${match.title} is available on the web, but a short extract was not returned.`;

    return NextResponse.json({
      answer: `No directory found, fetching from the web: ${summary}`,
      sourceTitle: match.title,
      sourceUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(match.title.replace(/ /g, '_'))}`,
    });
  } catch {
    return NextResponse.json({
      answer: 'No directory found, fetching from the web: I could not fetch a short answer right now.',
    });
  }
}
