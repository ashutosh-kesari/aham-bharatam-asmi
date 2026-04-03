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

CREATE TABLE apps (
  id TEXT PRIMARY KEY,
  name TEXT,
  url TEXT,
  description TEXT,
  image_url TEXT,
  image_alt TEXT
);

ALTER TABLE dynasties ENABLE ROW LEVEL SECURITY;
ALTER TABLE battles ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE facts ENABLE ROW LEVEL SECURITY;
ALTER TABLE maps ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE apps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read dynasties" ON dynasties FOR SELECT USING (true);
CREATE POLICY "Public read battles" ON battles FOR SELECT USING (true);
CREATE POLICY "Public read articles" ON articles FOR SELECT USING (true);
CREATE POLICY "Public read facts" ON facts FOR SELECT USING (true);
CREATE POLICY "Public read maps" ON maps FOR SELECT USING (true);
CREATE POLICY "Public read quizzes" ON quizzes FOR SELECT USING (true);
CREATE POLICY "Public read apps" ON apps FOR SELECT USING (true);

CREATE POLICY "Public write dynasties" ON dynasties FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write battles" ON battles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write articles" ON articles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write facts" ON facts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write maps" ON maps FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write quizzes" ON quizzes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write apps" ON apps FOR ALL USING (true) WITH CHECK (true);
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

### Step 5: Create an admin user
Open **Authentication → Users** and create your admin account, or enable email/password sign-up and create one manually.

### Step 6: Tighten write access for production
Replace open write rules with authenticated admin-only write rules:

```sql
drop policy if exists "Public write dynasties" on dynasties;
drop policy if exists "Public write battles" on battles;
drop policy if exists "Public write articles" on articles;
drop policy if exists "Public write facts" on facts;
drop policy if exists "Public write maps" on maps;
drop policy if exists "Public write quizzes" on quizzes;
drop policy if exists "Public write apps" on apps;

create policy "Authenticated write dynasties" on dynasties
for all using (auth.uid() is not null) with check (auth.uid() is not null);

create policy "Authenticated write battles" on battles
for all using (auth.uid() is not null) with check (auth.uid() is not null);

create policy "Authenticated write articles" on articles
for all using (auth.uid() is not null) with check (auth.uid() is not null);

create policy "Authenticated write facts" on facts
for all using (auth.uid() is not null) with check (auth.uid() is not null);

create policy "Authenticated write maps" on maps
for all using (auth.uid() is not null) with check (auth.uid() is not null);

create policy "Authenticated write quizzes" on quizzes
for all using (auth.uid() is not null) with check (auth.uid() is not null);

create policy "Authenticated write apps" on apps
for all using (auth.uid() is not null) with check (auth.uid() is not null);
```

### Step 7: Create a Storage bucket for article images
Open **Storage** and create a public bucket named `article-images`.

Then add policies so anyone can read uploaded article images, but only signed-in admins can upload:

```sql
create policy "Public read article images" on storage.objects
for select using (bucket_id = 'article-images');

create policy "Authenticated upload article images" on storage.objects
for insert to authenticated with check (bucket_id = 'article-images');

create policy "Authenticated update article images" on storage.objects
for update to authenticated using (bucket_id = 'article-images') with check (bucket_id = 'article-images');

create policy "Authenticated delete article images" on storage.objects
for delete to authenticated using (bucket_id = 'article-images');
```

### Important notes
- The admin panel now reads with the publishable key, but writes to Supabase only after admin sign-in.
- Article hero images and inline article images can now upload directly to the `article-images` bucket from `/admin`.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` is the env var used by the current app, though `NEXT_PUBLIC_SUPABASE_ANON_KEY` still works as a fallback.

## Local-only fallback

If Supabase is not configured, `/admin` still works with browser `localStorage` for:
- dynasties and ruler timelines
- battles
- articles
- did-you-know facts
- historical maps
- quiz questions
- explore-more app links
