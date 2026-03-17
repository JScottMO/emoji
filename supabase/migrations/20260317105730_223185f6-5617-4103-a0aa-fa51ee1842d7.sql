CREATE TABLE public.copy_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  emoji_slug text NOT NULL,
  copied_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.copy_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert copy events"
  ON public.copy_events FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read copy events"
  ON public.copy_events FOR SELECT
  TO anon, authenticated
  USING (true);