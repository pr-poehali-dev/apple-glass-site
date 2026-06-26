import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const API = 'https://functions.poehali.dev/5cedcb71-2e0c-41bc-bab1-1bc5983ef1ff';
const TOKEN_KEY = 'admin_token';

function api(action: string, method = 'GET', body?: object, token?: string) {
  return fetch(`${API}?action=${action}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'X-Admin-Token': token } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  }).then(r => r.json());
}

type Video = { id: number; title: string; duration: string; locked: boolean; views: string; video_url: string; sort_order: number };
type Settings = Record<string, string>;

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [tab, setTab] = useState<'texts' | 'plans' | 'videos' | 'contacts'>('texts');
  const [settings, setSettings] = useState<Settings>({});
  const [videos, setVideos] = useState<Video[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const isAuth = !!token;

  useEffect(() => {
    if (!isAuth) return;
    api('settings', 'GET', undefined, token).then(d => { if (!d.error) setSettings(d); });
    api('videos', 'GET', undefined, token).then(d => { if (Array.isArray(d)) setVideos(d); });
  }, [isAuth, token]);

  async function login() {
    setLoginLoading(true);
    setLoginError('');
    const res = await api('login', 'POST', { password });
    setLoginLoading(false);
    if (res.success) {
      setToken(password);
      localStorage.setItem(TOKEN_KEY, password);
    } else {
      setLoginError('Неверный пароль');
    }
  }

  function setSetting(key: string, value: string) {
    setSettings(s => ({ ...s, [key]: value }));
  }

  async function saveSettings() {
    setSaving(true);
    await api('settings', 'POST', settings, token);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function saveVideo(v: Video) {
    await api('videos', 'PUT', v, token);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function addVideo() {
    const res = await api('videos', 'POST', { title: 'Новое видео', duration: '00:00', locked: true, views: '0', video_url: '' }, token);
    if (res.id) {
      const d = await api('videos', 'GET', undefined, token);
      if (Array.isArray(d)) setVideos(d);
    }
  }

  async function deleteVideo(id: number) {
    await api('videos', 'DELETE', { id }, token);
    setVideos(v => v.filter(x => x.id !== id));
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken('');
  }

  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#05060a] text-white px-4">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-400 to-fuchsia-500 flex items-center justify-center">
              <Icon name="Play" size={18} className="text-white" />
            </div>
            <span className="font-display font-extrabold text-xl">MAXON CREATORS</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h1 className="font-display font-bold text-2xl mb-1">Админ-панель</h1>
            <p className="text-white/50 text-sm mb-6">Введи пароль для доступа</p>
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && login()}
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-400 transition-colors mb-3"
              autoFocus
            />
            {loginError && <p className="text-red-400 text-sm mb-3">{loginError}</p>}
            <button
              onClick={login}
              disabled={loginLoading || !password}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 py-3 font-display font-semibold disabled:opacity-50 hover:scale-[1.02] transition-transform"
            >
              {loginLoading ? 'Проверяю...' : 'Войти'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const TABS = [
    { id: 'texts', label: 'Тексты', icon: 'Type' },
    { id: 'plans', label: 'Тарифы', icon: 'CreditCard' },
    { id: 'videos', label: 'Видео', icon: 'Clapperboard' },
    { id: 'contacts', label: 'Контакты', icon: 'Mail' },
  ] as const;

  return (
    <div className="min-h-screen bg-[#05060a] text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-400 to-fuchsia-500 flex items-center justify-center">
            <Icon name="Play" size={14} className="text-white" />
          </div>
          <span className="font-display font-bold">Админ-панель</span>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-green-400 text-sm flex items-center gap-1"><Icon name="Check" size={14} /> Сохранено</span>}
          <a href="/" target="_blank" className="text-white/50 hover:text-white text-sm flex items-center gap-1.5 transition-colors">
            <Icon name="ExternalLink" size={14} /> Сайт
          </a>
          <button onClick={logout} className="text-white/50 hover:text-white text-sm flex items-center gap-1.5 transition-colors">
            <Icon name="LogOut" size={14} /> Выйти
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white/5 rounded-2xl p-1.5 w-fit">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === t.id ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white'}`}
            >
              <Icon name={t.icon} size={15} /> {t.label}
            </button>
          ))}
        </div>

        {/* TEXTS */}
        {tab === 'texts' && (
          <div className="space-y-5">
            <h2 className="font-display font-bold text-xl">Тексты на главной</h2>
            {[
              { key: 'hero_badge', label: 'Бейдж над заголовком' },
              { key: 'hero_title1', label: 'Заголовок — строка 1' },
              { key: 'hero_title2', label: 'Заголовок — строка 2 (с градиентом)' },
              { key: 'hero_desc', label: 'Описание под заголовком', multiline: true },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-sm text-white/60 mb-1.5">{f.label}</label>
                {f.multiline ? (
                  <textarea
                    value={settings[f.key] || ''}
                    onChange={e => setSetting(f.key, e.target.value)}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-400 transition-colors resize-none"
                  />
                ) : (
                  <input
                    value={settings[f.key] || ''}
                    onChange={e => setSetting(f.key, e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-400 transition-colors"
                  />
                )}
              </div>
            ))}
            <button onClick={saveSettings} disabled={saving} className="rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-8 py-3 font-display font-semibold disabled:opacity-50 hover:scale-[1.02] transition-transform">
              {saving ? 'Сохраняю...' : 'Сохранить'}
            </button>
          </div>
        )}

        {/* PLANS */}
        {tab === 'plans' && (
          <div className="space-y-6">
            <h2 className="font-display font-bold text-xl">Тарифы и цены</h2>
            {['basic', 'premium', 'pro'].map(p => (
              <div key={p} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="font-display font-semibold capitalize">{p === 'basic' ? 'Basic' : p === 'premium' ? 'Premium' : 'Pro'}</h3>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Цена ($/мес)</label>
                  <input
                    type="number"
                    value={settings[`plan_${p}_price`] || ''}
                    onChange={e => setSetting(`plan_${p}_price`, e.target.value)}
                    className="w-32 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Опции (каждая с новой строки)</label>
                  <textarea
                    value={(settings[`plan_${p}_features`] || '').replace(/\|/g, '\n')}
                    onChange={e => setSetting(`plan_${p}_features`, e.target.value.replace(/\n/g, '|'))}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-400 transition-colors resize-none"
                  />
                </div>
              </div>
            ))}
            <button onClick={saveSettings} disabled={saving} className="rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-8 py-3 font-display font-semibold disabled:opacity-50 hover:scale-[1.02] transition-transform">
              {saving ? 'Сохраняю...' : 'Сохранить'}
            </button>
          </div>
        )}

        {/* VIDEOS */}
        {tab === 'videos' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-xl">Видеотека</h2>
              <button onClick={addVideo} className="flex items-center gap-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 px-4 py-2.5 text-sm font-medium transition-colors">
                <Icon name="Plus" size={16} /> Добавить видео
              </button>
            </div>
            {videos.map(v => (
              <div key={v.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-white/50 mb-1">Название</label>
                    <input
                      value={v.title}
                      onChange={e => setVideos(vs => vs.map(x => x.id === v.id ? { ...x, title: e.target.value } : x))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 mb-1">Длительность</label>
                    <input
                      value={v.duration}
                      onChange={e => setVideos(vs => vs.map(x => x.id === v.id ? { ...x, duration: e.target.value } : x))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1">Ссылка на видео (URL)</label>
                  <input
                    value={v.video_url}
                    onChange={e => setVideos(vs => vs.map(x => x.id === v.id ? { ...x, video_url: e.target.value } : x))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors"
                    placeholder="https://..."
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <div
                      onClick={() => setVideos(vs => vs.map(x => x.id === v.id ? { ...x, locked: !x.locked } : x))}
                      className={`w-10 h-6 rounded-full transition-colors ${v.locked ? 'bg-indigo-500' : 'bg-white/20'} relative`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${v.locked ? 'left-5' : 'left-1'}`} />
                    </div>
                    <span className="text-sm text-white/70">{v.locked ? 'Платный (Premium)' : 'Бесплатный'}</span>
                  </label>
                  <div className="flex gap-2">
                    <button onClick={() => saveVideo(v)} className="text-sm bg-indigo-500/20 hover:bg-indigo-500/40 text-indigo-300 rounded-lg px-3 py-1.5 transition-colors">
                      Сохранить
                    </button>
                    <button onClick={() => deleteVideo(v.id)} className="text-sm bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-lg px-3 py-1.5 transition-colors">
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CONTACTS */}
        {tab === 'contacts' && (
          <div className="space-y-5">
            <h2 className="font-display font-bold text-xl">Контакты</h2>
            {[
              { key: 'contact_email', label: 'Email', placeholder: 'you@example.com' },
              { key: 'contact_telegram', label: 'Telegram', placeholder: '@username' },
              { key: 'contact_location', label: 'Местоположение', placeholder: 'Москва / Worldwide' },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-sm text-white/60 mb-1.5">{f.label}</label>
                <input
                  value={settings[f.key] || ''}
                  onChange={e => setSetting(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-400 transition-colors"
                />
              </div>
            ))}
            <button onClick={saveSettings} disabled={saving} className="rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-8 py-3 font-display font-semibold disabled:opacity-50 hover:scale-[1.02] transition-transform">
              {saving ? 'Сохраняю...' : 'Сохранить'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
