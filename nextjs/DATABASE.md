# Database Setup Guide

## Supabase Setup

### Step 1: Create a project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Open **Settings → API**
4. Copy:
- `Project URL`
- `anon public` key

### Step 2: Create the schema
Open **SQL Editor** and run this:

```sql
CREATE TABLE dynasties (
  id TEXT PRIMARY KEY,
  name TEXT,
  period TEXT,
  founder TEXT,
  sig TEXT,
  rulers JSONB,
  era TEXT,
  region TEXT,
  summary TEXT
);

-- Create battles table  
CREATE TABLE battles (
  id TEXT PRIMARY KEY,
  name TEXT,
  year TEXT,
  icon TEXT,
  between_field TEXT,
  summary TEXT,
  details JSONB
);

-- Create articles table
CREATE TABLE articles (
  id TEXT PRIMARY KEY,
  title TEXT,
  subtitle TEXT,
  category TEXT,
  excerpt TEXT,
  image_url TEXT,
  body JSONB
);

-- Create facts table
CREATE TABLE facts (
  id TEXT PRIMARY KEY,
  content TEXT
);

CREATE TABLE maps (
  id TEXT PRIMARY KEY,
  dynasty_id TEXT,
  era TEXT,
  year_label TEXT,
  title TEXT,
  description TEXT,
  image_url TEXT,
  width INTEGER,
  height INTEGER,
  source_url TEXT,
  source_label TEXT,
  source_note TEXT
);

CREATE TABLE quizzes (
  id TEXT PRIMARY KEY,
  question TEXT,
  answer TEXT,
  options JSONB,
  explanation TEXT
);

ALTER TABLE dynasties ENABLE ROW LEVEL SECURITY;
ALTER TABLE battles ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE facts ENABLE ROW LEVEL SECURITY;
ALTER TABLE maps ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read dynasties" ON dynasties FOR SELECT USING (true);
CREATE POLICY "Public read battles" ON battles FOR SELECT USING (true);
CREATE POLICY "Public read articles" ON articles FOR SELECT USING (true);
CREATE POLICY "Public read facts" ON facts FOR SELECT USING (true);
CREATE POLICY "Public read maps" ON maps FOR SELECT USING (true);
CREATE POLICY "Public read quizzes" ON quizzes FOR SELECT USING (true);

CREATE POLICY "Public write dynasties" ON dynasties FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write battles" ON battles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write articles" ON articles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write facts" ON facts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write maps" ON maps FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write quizzes" ON quizzes FOR ALL USING (true) WITH CHECK (true);
```

### Step 3: Add environment variables
Create `.env.local` inside the `nextjs/` folder:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Step 4: Restart the app
```bash
npm run dev
```

### Important notes
- The admin panel already writes directly to Supabase once these tables and env vars exist.
- Article images inside the editor currently use public image URLs. If you want direct uploads later, add a Supabase Storage bucket and wire an uploader into the admin panel.
- The current write policies are intentionally open for simplicity. Before going public, tighten them with authenticated admin-only policies.

## Local-only fallback

If Supabase is not configured, `/admin` still works with browser `localStorage` for:
- dynasties and ruler timelines
- battles
- articles
- did-you-know facts
- historical maps
- quiz questions
