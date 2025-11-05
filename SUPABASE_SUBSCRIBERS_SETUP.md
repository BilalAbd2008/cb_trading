# Setup Supabase Subscribers Table

## Langkah-langkah Setup:

### 1. Login ke Supabase Dashboard

- Buka: https://supabase.com/dashboard
- Login dengan akun Anda
- Pilih project: `asiymlhsdlntawtawbdy`

### 2. Buat Table `subscribers`

Buka **SQL Editor** dan jalankan query berikut:

```sql
-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  agreed_to_terms BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);

-- Add index for date sorting
CREATE INDEX IF NOT EXISTS idx_subscribers_subscribed_at ON subscribers(subscribed_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public INSERT (for newsletter signup)
CREATE POLICY "Allow public insert" ON subscribers
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow public SELECT (for checking duplicates)
CREATE POLICY "Allow public select" ON subscribers
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to DELETE (admin only)
CREATE POLICY "Allow authenticated delete" ON subscribers
  FOR DELETE
  USING (auth.role() = 'authenticated');
```

### 3. Verifikasi Table

Setelah menjalankan query di atas, verifikasi:

1. **Table Structure:**

   - `id` (uuid, primary key)
   - `email` (text, unique, not null)
   - `agreed_to_terms` (boolean, default: true)
   - `subscribed_at` (timestamp with time zone)
   - `created_at` (timestamp with time zone)

2. **Indexes:**

   - `idx_subscribers_email` (untuk pencarian email)
   - `idx_subscribers_subscribed_at` (untuk sorting berdasarkan tanggal)

3. **Row Level Security (RLS):**
   - Public dapat INSERT (signup)
   - Public dapat SELECT (check duplicate)
   - Authenticated dapat DELETE (admin)

### 4. Test Table

Jalankan query test ini untuk memastikan table bekerja:

```sql
-- Insert test subscriber
INSERT INTO subscribers (email, agreed_to_terms)
VALUES ('test@example.com', true);

-- Query all subscribers
SELECT * FROM subscribers ORDER BY subscribed_at DESC;

-- Delete test subscriber
DELETE FROM subscribers WHERE email = 'test@example.com';
```

## Struktur Table:

| Column          | Type      | Constraints                            | Description               |
| --------------- | --------- | -------------------------------------- | ------------------------- |
| id              | UUID      | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier         |
| email           | TEXT      | NOT NULL, UNIQUE                       | Subscriber email address  |
| agreed_to_terms | BOOLEAN   | DEFAULT true                           | Terms acceptance status   |
| subscribed_at   | TIMESTAMP | DEFAULT NOW()                          | Subscription timestamp    |
| created_at      | TIMESTAMP | DEFAULT NOW()                          | Record creation timestamp |

## Fitur yang Sudah Terintegrasi:

✅ Newsletter form menyimpan ke Supabase
✅ Check duplicate email
✅ Auto-redirect ke Discord setelah submit
✅ Admin dashboard untuk view subscribers
✅ Export subscribers to CSV
✅ Delete subscribers
✅ Search subscribers by email
✅ Real-time refresh

## Link Discord:

⚠️ **PENTING:** Update link Discord di file `components/Newsletter.tsx` line 17:

```typescript
const DISCORD_LINK = "https://discord.gg/cbtrading"; // GANTI DENGAN LINK DISCORD ASLI
```

Ganti dengan invite link Discord CB Trading yang sebenarnya!

## Akses Admin:

- Dashboard: `http://localhost:3000/admin`
- Subscribers: `http://localhost:3000/admin/subscribers`
- Blog Management: `http://localhost:3000/admin/blog`
