
CREATE TABLE IF NOT EXISTS t_p63746311_apple_glass_site.site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO t_p63746311_apple_glass_site.site_settings (key, value) VALUES
  ('hero_title1', 'Твой контент.'),
  ('hero_title2', 'Твой заработок.'),
  ('hero_desc', 'Закрытая видеотека по платной подписке. Загружай видео, открывай доступ за деньги и получай выплаты через PayPal.'),
  ('hero_badge', 'Новые видео каждую неделю'),
  ('contact_email', 'support@maxoncreators.com'),
  ('contact_telegram', '@maxoncreators'),
  ('contact_location', 'Worldwide'),
  ('plan_basic_price', '9'),
  ('plan_premium_price', '19'),
  ('plan_pro_price', '49'),
  ('plan_basic_features', 'Доступ к базовой библиотеке|Качество до 1080p|Новые видео раз в неделю'),
  ('plan_premium_features', 'Полный доступ ко всем видео|Качество 4K Ultra HD|Ранний доступ к новинкам|Закрытые трансляции'),
  ('plan_pro_features', 'Всё из Premium|Личные консультации|Эксклюзивный чат|Скачивание офлайн')
ON CONFLICT (key) DO NOTHING;

CREATE TABLE IF NOT EXISTS t_p63746311_apple_glass_site.site_videos (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration TEXT NOT NULL DEFAULT '00:00',
  locked BOOLEAN DEFAULT true,
  views TEXT DEFAULT '0',
  video_url TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO t_p63746311_apple_glass_site.site_videos (title, duration, locked, views, sort_order) VALUES
  ('Введение в профессию', '12:40', false, '4.2K', 1),
  ('Глубокий разбор кейса', '28:15', true, '2.8K', 2),
  ('Эксклюзив для подписчиков', '45:02', true, '1.9K', 3),
  ('Закрытый воркшоп', '1:12:30', true, '980', 4),
  ('Q&A сессия', '34:18', true, '1.5K', 5),
  ('Бонусный материал', '19:55', true, '760', 6)
ON CONFLICT DO NOTHING;
