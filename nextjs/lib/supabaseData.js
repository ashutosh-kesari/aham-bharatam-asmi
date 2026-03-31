'use client';

import { supabase } from './supabase';
import { DYN, BATTLES, ARTICLES, DYKS } from './data';
import { HISTORICAL_MAPS } from './historicalMaps';
import { DEFAULT_QUIZ_QUESTIONS } from './quizData';

const STORAGE_KEY = 'bharatam_data';

export async function fetchFromSupabase() {
  if (!supabase) {
    return null;
  }

  try {
    const [dynasties, battles, articles, facts, maps, quizzes] = await Promise.all([
      supabase.from('dynasties').select('*'),
      supabase.from('battles').select('*'),
      supabase.from('articles').select('*'),
      supabase.from('facts').select('*'),
      supabase.from('maps').select('*'),
      supabase.from('quizzes').select('*')
    ]);

    if (dynasties.error || battles.error || articles.error || facts.error || maps.error || quizzes.error) {
      console.error(
        'Supabase error:',
        dynasties.error || battles.error || articles.error || facts.error || maps.error || quizzes.error,
      );
      return null;
    }

    // Check if data exists
    if (
      !dynasties.data?.length &&
      !battles.data?.length &&
      !articles.data?.length &&
      !facts.data?.length &&
      !maps.data?.length &&
      !quizzes.data?.length
    ) {
      return null;
    }

    // Transform data to match app format
    const transformDynasty = (d) => ({
      id: d.id,
      name: d.name,
      period: d.period,
      founder: d.founder,
      sig: d.sig,
      rulers: d.rulers || [],
      era: d.era || 'ancient',
      region: d.region || 'Pan-Indian',
      summary: d.summary || d.sig || '',
    });

    const transformBattle = (b) => ({
      id: b.id,
      name: b.name,
      year: b.year,
      icon: b.icon,
      between: b.between_field,
      summary: b.summary,
      d: b.details || {}
    });

    const transformArticle = (a) => ({
      id: a.id,
      title: a.title,
      subtitle: a.subtitle,
      cat: a.category,
      excerpt: a.excerpt,
      img: a.image_url,
      imgAlt: '',
      body: a.body || []
    });

    const transformMap = (m) => ({
      id: m.id,
      dynastyId: m.dynasty_id || '',
      era: m.era || 'ancient',
      yearLabel: m.year_label || '',
      title: m.title,
      description: m.description || '',
      image: m.image_url,
      width: m.width || 960,
      height: m.height || 640,
      sourceUrl: m.source_url || '',
      sourceLabel: m.source_label || 'Source',
      sourceNote: m.source_note || '',
    });

    const transformQuiz = (q) => ({
      id: q.id,
      question: q.question,
      answer: q.answer,
      options: q.options || [],
      explanation: q.explanation || '',
    });

    return {
      dynasties: (dynasties.data || []).map(transformDynasty),
      battles: (battles.data || []).map(transformBattle),
      articles: (articles.data || []).map(transformArticle),
      facts: facts.data?.map(f => f.content) || [],
      maps: (maps.data || []).map(transformMap),
      quizzes: (quizzes.data || []).map(transformQuiz),
    };
  } catch (error) {
    console.error('Error fetching from Supabase:', error);
    return null;
  }
}

export async function saveToSupabase(data) {
  if (!supabase) {
    return { success: false, error: 'Database not configured' };
  }

  try {
    const { dynasties, battles, articles, facts, maps, quizzes } = data;

    // Clear and insert dynasties
    if (dynasties) {
      await supabase.from('dynasties').delete().neq('id', '');
      if (dynasties.length > 0) {
      const dynData = dynasties.map(d => ({
        id: d.id,
        name: d.name,
        period: d.period,
          founder: d.founder,
          sig: d.sig,
          rulers: d.rulers,
          era: d.era || 'ancient',
          region: d.region || 'Pan-Indian',
          summary: d.summary || d.sig || '',
        }));
      await supabase.from('dynasties').insert(dynData);
      }
    }

    // Clear and insert battles
    if (battles) {
      await supabase.from('battles').delete().neq('id', '');
      if (battles.length > 0) {
      const batData = battles.map(b => ({
        id: b.id,
        name: b.name,
        year: b.year,
        icon: b.icon,
        between_field: b.between,
        summary: b.summary,
        details: b.d
      }));
      await supabase.from('battles').insert(batData);
      }
    }

    // Clear and insert articles
    if (articles) {
      await supabase.from('articles').delete().neq('id', '');
      if (articles.length > 0) {
      const artData = articles.map(a => ({
        id: a.id,
        title: a.title,
        subtitle: a.subtitle,
        category: a.cat,
        excerpt: a.excerpt,
        image_url: a.img,
        body: a.body
      }));
      await supabase.from('articles').insert(artData);
      }
    }

    // Clear and insert facts
    if (facts) {
      await supabase.from('facts').delete().neq('id', '');
      if (facts.length > 0) {
      const factData = facts.map((content, i) => ({
        id: `fact-${Date.now()}-${i}`,
        content
      }));
      await supabase.from('facts').insert(factData);
      }
    }

    if (maps) {
      await supabase.from('maps').delete().neq('id', '');
      if (maps.length > 0) {
      const mapData = maps.map((m) => ({
        id: m.id,
        dynasty_id: m.dynastyId || '',
        era: m.era || 'ancient',
        year_label: m.yearLabel || '',
        title: m.title,
        description: m.description || '',
        image_url: m.image,
        width: m.width || 960,
        height: m.height || 640,
        source_url: m.sourceUrl || '',
        source_label: m.sourceLabel || 'Source',
        source_note: m.sourceNote || '',
      }));
      await supabase.from('maps').insert(mapData);
      }
    }

    if (quizzes) {
      await supabase.from('quizzes').delete().neq('id', '');
      if (quizzes.length > 0) {
      const quizData = quizzes.map((q) => ({
        id: q.id,
        question: q.question,
        answer: q.answer,
        options: q.options || [],
        explanation: q.explanation || '',
      }));
      await supabase.from('quizzes').insert(quizData);
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Error saving to Supabase:', error);
    return { success: false, error: error.message };
  }
}

// Get merged data - Supabase first, then localStorage, then defaults
export async function getSiteData() {
  // Try Supabase first
  const supabaseData = await fetchFromSupabase();
  
  if (supabaseData) {
    return {
      DYN: {
        ancient: supabaseData.dynasties?.filter(d => d.era === 'ancient') || [],
        medieval: supabaseData.dynasties?.filter(d => d.era === 'medieval') || [],
        modern: supabaseData.dynasties?.filter(d => d.era === 'modern') || []
      },
          BATTLES: supabaseData.battles || [],
          ARTICLES: supabaseData.articles || [],
          DYKS: supabaseData.facts || DYKS,
          MAPS: supabaseData.maps?.length ? supabaseData.maps : HISTORICAL_MAPS,
          QUIZZES: supabaseData.quizzes?.length ? supabaseData.quizzes : DEFAULT_QUIZ_QUESTIONS,
        };
      }

  // Fall back to localStorage
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const parsedDynasties = parsed.dynasties || [];
        return {
          DYN: {
            ancient: parsedDynasties.length > 0 ? parsedDynasties.filter(d => (d.era || 'ancient') === 'ancient') : DYN.ancient,
            medieval: parsedDynasties.length > 0 ? parsedDynasties.filter(d => d.era === 'medieval') : DYN.medieval,
            modern: parsedDynasties.length > 0 ? parsedDynasties.filter(d => d.era === 'modern') : DYN.modern
          },
          BATTLES: parsed.battles?.length > 0 ? parsed.battles : BATTLES,
          ARTICLES: parsed.articles?.length > 0 ? parsed.articles : ARTICLES,
          DYKS: parsed.dyks?.length > 0 ? parsed.dyks : DYKS,
          MAPS: parsed.maps?.length > 0 ? parsed.maps : HISTORICAL_MAPS,
          QUIZZES: parsed.quizzes?.length > 0 ? parsed.quizzes : DEFAULT_QUIZ_QUESTIONS,
        };
      } catch {}
    }
  }

  // Default data
  return { DYN, BATTLES, ARTICLES, DYKS, MAPS: HISTORICAL_MAPS, QUIZZES: DEFAULT_QUIZ_QUESTIONS };
}
