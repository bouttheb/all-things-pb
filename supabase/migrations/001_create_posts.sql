-- Enum for content platforms
CREATE TYPE platform AS ENUM (
  'youtube',
  'instagram',
  'podcast',
  'spotify'
);

-- Enum for media type
CREATE TYPE media_type AS ENUM (
  'video',
  'image',
  'carousel',
  'audio',
  'reel'
);

-- Unified posts table
CREATE TABLE posts (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform      platform NOT NULL,
  platform_id   TEXT NOT NULL,
  media_type    media_type NOT NULL,
  title         TEXT,
  description   TEXT,
  thumbnail_url TEXT,
  content_url   TEXT NOT NULL,
  embed_url     TEXT,
  published_at  TIMESTAMPTZ NOT NULL,
  metadata      JSONB DEFAULT '{}'::jsonb,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now(),

  UNIQUE(platform, platform_id)
);

CREATE INDEX idx_posts_published_at ON posts (published_at DESC);
CREATE INDEX idx_posts_platform ON posts (platform);
CREATE INDEX idx_posts_platform_published ON posts (platform, published_at DESC);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON posts FOR SELECT USING (true);
