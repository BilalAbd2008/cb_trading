-- ============================================
-- QUICK FIX: Disable RLS untuk Development
-- ============================================
-- Copy dan paste ini ke Supabase SQL Editor, lalu click RUN

-- Disable RLS untuk table posts (allow semua operasi)
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;

-- Verifikasi RLS status
SELECT 
  tablename,
  rowsecurity
FROM 
  pg_tables
WHERE 
  tablename = 'posts';

-- Jika rowsecurity = false, berarti RLS sudah disabled
-- Sekarang admin bisa create, edit, delete blog posts tanpa error

-- ============================================
-- DONE! Sekarang coba create blog post lagi
-- ============================================
