import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { COMPREHENSIVE_DYNASTIES } from '../../../lib/comprehensiveData';
import { DYN, BATTLES, ARTICLES, DYKS } from '../../../lib/data';
import { HISTORICAL_MAPS } from '../../../lib/historicalMaps';
import { DEFAULT_QUIZ_QUESTIONS } from '../../../lib/quizData';

export async function GET() {
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  try {
    // Clear existing data
    await supabase.from('dynasties').delete().neq('id', '');
    await supabase.from('battles').delete().neq('id', '');
    await supabase.from('articles').delete().neq('id', '');
    await supabase.from('facts').delete().neq('id', '');
    await supabase.from('maps').delete().neq('id', '');
    await supabase.from('quizzes').delete().neq('id', '');

    // Prepare dynasties data from comprehensiveData.js
    const allDynasties = [
      ...COMPREHENSIVE_DYNASTIES.ancient,
      ...COMPREHENSIVE_DYNASTIES.medieval,
      ...COMPREHENSIVE_DYNASTIES.modern
    ];
    
    const dynastyData = allDynasties.map(d => ({
      id: d.id,
      name: d.name,
      period: d.period,
      founder: d.founder,
      sig: d.sig,
      rulers: d.rulers,
      era: COMPREHENSIVE_DYNASTIES.ancient.includes(d) ? 'ancient' : 
            COMPREHENSIVE_DYNASTIES.medieval.includes(d) ? 'medieval' : 'modern',
      region: d.region || 'Pan-Indian',
      summary: d.summary || d.sig || ''
    }));

    // Insert dynasties
    const { error: dynError } = await supabase.from('dynasties').insert(dynastyData);
    if (dynError) throw dynError;

    // Prepare battles data
    const battlesData = BATTLES.map(b => ({
      id: b.id,
      name: b.name,
      year: b.year,
      icon: b.icon,
      between_field: b.between,
      summary: b.summary,
      details: b.d
    }));

    // Insert battles
    const { error: batError } = await supabase.from('battles').insert(battlesData);
    if (batError) throw batError;

    // Prepare articles data
    const articlesData = ARTICLES.map(a => ({
      id: a.id,
      title: a.title,
      subtitle: a.subtitle,
      category: a.cat,
      excerpt: a.excerpt,
      image_url: a.img,
      body: a.body
    }));

    // Insert articles
    const { error: artError } = await supabase.from('articles').insert(articlesData);
    if (artError) throw artError;

    // Prepare facts data
    const factsData = DYKS.map((content, i) => ({
      id: `fact-${i}`,
      content
    }));

    // Insert facts
    const { error: factError } = await supabase.from('facts').insert(factsData);
    if (factError) throw factError;

    const mapsData = HISTORICAL_MAPS.map((m) => ({
      id: m.id,
      dynasty_id: m.dynastyId,
      era: m.era,
      year_label: m.yearLabel,
      title: m.title,
      description: m.description,
      image_url: m.image,
      width: m.width,
      height: m.height,
      source_url: m.sourceUrl,
      source_label: m.sourceLabel,
      source_note: m.sourceNote,
    }));
    const { error: mapError } = await supabase.from('maps').insert(mapsData);
    if (mapError) throw mapError;

    const quizData = DEFAULT_QUIZ_QUESTIONS.map((q) => ({
      id: q.id,
      question: q.question,
      answer: q.answer,
      options: q.options,
      explanation: q.explanation,
    }));
    const { error: quizError } = await supabase.from('quizzes').insert(quizData);
    if (quizError) throw quizError;

    return NextResponse.json({ 
      success: true, 
      message: `Added ${dynastyData.length} dynasties, ${battlesData.length} battles, ${articlesData.length} articles, ${factsData.length} facts, ${mapsData.length} maps, ${quizData.length} quizzes`
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
