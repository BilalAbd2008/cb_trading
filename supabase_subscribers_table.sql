-- ============================================
-- CB TRADING - SUBSCRIBERS TABLE SETUP
-- ============================================
-- Copy and paste this entire script into Supabase SQL Editor
-- Then click "RUN" to create the subscribers table

-- 1. Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  agreed_to_terms BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_subscribed_at ON subscribers(subscribed_at DESC);

-- 3. Enable Row Level Security
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies

-- Allow anyone to insert (public newsletter signup)
CREATE POLICY "Allow public insert" ON subscribers
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to select (for duplicate check)
CREATE POLICY "Allow public select" ON subscribers
  FOR SELECT
  USING (true);

-- Allow authenticated users to delete (admin only)
CREATE POLICY "Allow authenticated delete" ON subscribers
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Allow authenticated users to update (admin only)
CREATE POLICY "Allow authenticated update" ON subscribers
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- 5. Verify table creation (this will show the table structure)
SELECT 
  column_name, 
  data_type, 
  column_default, 
  is_nullable
FROM 
  information_schema.columns
WHERE 
  table_name = 'subscribers'
ORDER BY 
  ordinal_position;

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- Your subscribers table is now ready to use.
-- The CB Trading newsletter form will automatically
-- save subscribers to this table.
