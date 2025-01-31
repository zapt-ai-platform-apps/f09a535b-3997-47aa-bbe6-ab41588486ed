CREATE TABLE IF NOT EXISTS activities (
  id SERIAL PRIMARY KEY,
  client_id INT REFERENCES clients(id),
  title TEXT NOT NULL,
  scheduled_time TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID NOT NULL,
  whatsapp_message TEXT
);