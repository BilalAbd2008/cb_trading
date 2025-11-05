-- ============================================
-- FIX: Row Level Security untuk Table Posts
-- ============================================
-- Jalankan script ini di Supabase SQL Editor untuk memperbaiki
-- error "new row violates row-level security policy"

-- 1. Drop existing policies (jika ada)
DROP POLICY IF EXISTS "Allow public insert" ON posts;
DROP POLICY IF EXISTS "Allow public select" ON posts;
DROP POLICY IF EXISTS "Allow public update" ON posts;
DROP POLICY IF EXISTS "Allow public delete" ON posts;
DROP POLICY IF EXISTS "Enable read access for all users" ON posts;
DROP POLICY IF EXISTS "Enable insert for all users" ON posts;
DROP POLICY IF EXISTS "Enable update for all users" ON posts;
DROP POLICY IF EXISTS "Enable delete for all users" ON posts;

-- 2. Disable RLS temporarily untuk testing
-- ATAU buat policies yang allow semua operasi

-- OPSI A: Disable RLS (untuk development)
-- ALTER TABLE posts DISABLE ROW LEVEL SECURITY;

-- OPSI B: Buat policies yang allow semua (lebih aman)
-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Allow SELECT untuk semua (public bisa baca blog posts)
CREATE POLICY "Allow public read access" ON posts
  FOR SELECT
  USING (true);

-- Allow INSERT untuk semua (admin bisa create via app)
CREATE POLICY "Allow public insert access" ON posts
  FOR INSERT
  WITH CHECK (true);

-- Allow UPDATE untuk semua (admin bisa update via app)
CREATE POLICY "Allow public update access" ON posts
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow DELETE untuk semua (admin bisa delete via app)
CREATE POLICY "Allow public delete access" ON posts
  FOR DELETE
  USING (true);

-- 3. Verifikasi policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM 
  pg_policies
WHERE 
  tablename = 'posts';

-- ============================================
-- CATATAN:
-- ============================================
-- Policies di atas allow semua operasi untuk development.
-- Untuk production, sebaiknya gunakan authenticated user check:
--
-- FOR INSERT WITH CHECK (auth.role() = 'authenticated')
-- FOR UPDATE USING (auth.role() = 'authenticated')
-- FOR DELETE USING (auth.role() = 'authenticated')
--
-- Tapi karena kita pakai localStorage auth (bukan Supabase Auth),
-- kita perlu allow public access untuk semua operasi.
-- ============================================

-- ALTERNATIVE: Disable RLS completely (paling simple untuk dev)
-- Uncomment baris di bawah jika mau disable RLS:
-- ALTER TABLE posts DISABLE ROW LEVEL SECURITY;
