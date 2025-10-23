-- AI Assets Table for storing generated content metadata
-- Run this migration in your Supabase dashboard

CREATE TABLE IF NOT EXISTS ai_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  bucket text NOT NULL,
  path text NOT NULL,
  prompt text,
  model text,
  generated_at timestamptz NOT NULL DEFAULT now(),
  type text NOT NULL CHECK (type IN ('image', 'video', 'document')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Add RLS policies
ALTER TABLE ai_assets ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all assets
CREATE POLICY "Authenticated users can read ai_assets"
  ON ai_assets
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert assets
CREATE POLICY "Authenticated users can insert ai_assets"
  ON ai_assets
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to delete their own assets
CREATE POLICY "Authenticated users can delete ai_assets"
  ON ai_assets
  FOR DELETE
  TO authenticated
  USING (true);

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_ai_assets_type ON ai_assets(type);
CREATE INDEX IF NOT EXISTS idx_ai_assets_generated_at ON ai_assets(generated_at DESC);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ai_assets_updated_at BEFORE UPDATE
  ON ai_assets FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Create storage buckets (if not exists)
-- Run these in Supabase SQL editor or create via dashboard:
-- 1. Create bucket 'assets' with public access
-- 2. Create bucket 'documents' with public access

-- Storage policies for 'assets' bucket
-- (Apply these in Storage > Policies section of Supabase dashboard)
-- Allow authenticated users to upload: authenticated users can insert
-- Allow public read: true for all
-- Allow authenticated delete: authenticated users can delete their uploads
