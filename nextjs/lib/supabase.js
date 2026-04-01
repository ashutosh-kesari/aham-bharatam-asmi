import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Database schema to create in Supabase:
// 
// Table: dynasties
// - id: text (primary key)
// - name: text
// - period: text  
// - founder: text
// - sig: text
// - rulers: jsonb
// - era: text (ancient/medieval/modern)
// - region: text
// - summary: text
//
// Table: battles
// - id: text (primary key)
// - name: text
// - year: text
// - icon: text
// - between: text
// - summary: text
// - details: jsonb
//
// Table: articles
// - id: text (primary key)
// - title: text
// - subtitle: text
// - category: text
// - excerpt: text
// - image_url: text
// - body: jsonb
//
// Table: facts
// - id: text (primary key)
// - content: text
//
// Table: maps
// - id: text (primary key)
// - dynasty_id: text
// - era: text
// - year_label: text
// - title: text
// - description: text
// - image_url: text
// - width: integer
// - height: integer
// - source_url: text
// - source_label: text
// - source_note: text
//
// Table: quizzes
// - id: text (primary key)
// - question: text
// - answer: text
// - options: jsonb
// - explanation: text
