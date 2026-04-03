import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

// GET - Fetch all data from database
export async function GET() {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  try {
    const [dynasties, battles, articles, facts, maps, quizzes, apps] = await Promise.all([
      supabase.from('dynasties').select('*').order('name'),
      supabase.from('battles').select('*').order('year'),
      supabase.from('articles').select('*').order('title'),
      supabase.from('facts').select('*'),
      supabase.from('maps').select('*').order('year_label'),
      supabase.from('quizzes').select('*').order('question'),
      supabase.from('apps').select('*').order('name'),
    ]);

    const appsData =
      apps.error && apps.error.code === '42P01'
        ? []
        : (apps.data || []);

    return NextResponse.json({
      dynasties: dynasties.data || [],
      battles: battles.data || [],
      articles: articles.data || [],
      facts: facts.data?.map(f => f.content) || [],
      maps: maps.data || [],
      quizzes: quizzes.data || [],
      apps: appsData,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Update data (admin only - add auth in production)
export async function POST(request) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { dynasties, battles, articles, facts, maps, quizzes, apps } = body;

    // Clear and insert new data
    if (dynasties) {
      await supabase.from('dynasties').delete().neq('id', '');
      if (dynasties.length > 0) {
        await supabase.from('dynasties').insert(
          dynasties.map((d) => ({
            id: d.id,
            name: d.name,
            period: d.period,
            founder: d.founder,
            sig: d.sig,
            rulers: d.rulers || [],
            era: d.era || 'ancient',
            region: d.region || 'Pan-Indian',
            summary: d.summary || d.sig || '',
          })),
        );
      }
    }

    if (battles) {
      await supabase.from('battles').delete().neq('id', '');
      if (battles.length > 0) {
        await supabase.from('battles').insert(
          battles.map((b) => ({
            id: b.id,
            name: b.name,
            year: b.year,
            icon: b.icon,
            between_field: b.between,
            summary: b.summary,
            details: b.d || {},
          })),
        );
      }
    }

    if (articles) {
      await supabase.from('articles').delete().neq('id', '');
      if (articles.length > 0) {
        await supabase.from('articles').insert(
          articles.map((a) => ({
            id: a.id,
            title: a.title,
            subtitle: a.subtitle,
            category: a.cat,
            excerpt: a.excerpt,
            image_url: a.img,
            body: a.body || [],
          })),
        );
      }
    }

    if (facts) {
      await supabase.from('facts').delete().neq('id', '');
      if (facts.length > 0) {
        const factData = facts.map((content, i) => ({ id: `fact-${i}`, content }));
        await supabase.from('facts').insert(factData);
      }
    }

    if (maps) {
      await supabase.from('maps').delete().neq('id', '');
      if (maps.length > 0) {
        await supabase.from('maps').insert(
          maps.map((m) => ({
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
          })),
        );
      }
    }

    if (quizzes) {
      await supabase.from('quizzes').delete().neq('id', '');
      if (quizzes.length > 0) {
        await supabase.from('quizzes').insert(
          quizzes.map((q) => ({
            id: q.id,
            question: q.question,
            answer: q.answer,
            options: q.options || [],
            explanation: q.explanation || '',
          })),
        );
      }
    }

    if (apps) {
      const { error: deleteAppsError } = await supabase.from('apps').delete().neq('id', '');
      if (deleteAppsError && deleteAppsError.code !== '42P01') {
        throw deleteAppsError;
      }

      if (apps.length > 0 && !deleteAppsError) {
        await supabase.from('apps').insert(
          apps.map((app) => ({
            id: app.id,
            name: app.name,
            url: app.url,
            description: app.description || '',
            image_url: app.image || '',
            image_alt: app.imageAlt || app.name || '',
          })),
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
