-- Ephemeral Instagram Stories table
CREATE TABLE stories (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform_id   TEXT NOT NULL UNIQUE,
  media_type    TEXT NOT NULL,
  media_url     TEXT NOT NULL,
  thumbnail_url TEXT,
  published_at  TIMESTAMPTZ NOT NULL,
  expires_at    TIMESTAMPTZ NOT NULL,
  is_expired    BOOLEAN DEFAULT false,
  metadata      JSONB DEFAULT '{}'::jsonb,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_stories_active ON stories (is_expired, expires_at DESC)
  WHERE is_expired = false;

-- Row Level Security
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON stories FOR SELECT USING (true);
