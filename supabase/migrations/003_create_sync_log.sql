-- Sync run tracking table
CREATE TABLE sync_log (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform    platform NOT NULL,
  started_at  TIMESTAMPTZ DEFAULT now(),
  finished_at TIMESTAMPTZ,
  status      TEXT NOT NULL DEFAULT 'running',
  items_added INTEGER DEFAULT 0,
  error       TEXT,
  metadata    JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_sync_log_platform ON sync_log (platform, started_at DESC);
