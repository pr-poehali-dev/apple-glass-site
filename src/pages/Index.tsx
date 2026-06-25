import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { useLang } from '@/lib/LangContext';
import { LANG_LABELS, SUPPORTED_LANGS } from '@/lib/i18n';

const BG = 'https://cdn.poehali.dev/projects/573eff07-508c-4e0a-bdb3-eda314a64263/files/29731728-3cf1-428a-99d0-444d43341beb.jpg';
const THUMB = 'https://cdn.poehali.dev/projects/573eff07-508c-4e0a-bdb3-eda314a64263/files/6e5e0b57-680b-4aca-8725-06fa4338d1ca.jpg';

const STATS_ICONS = ['DollarSign', 'Users', 'Eye', 'Film'];
const STATS_VALUES = ['$4,820', '1,284', '38.4K', '67'];
const STATS_TRENDS = ['+18%', '+124', '+9%', '+3'];

const PayPalButton = ({ label }: { label: string }) => (
  <button className="w-full flex items-center justify-center gap-2 rounded-full bg-[#FFC439] hover:bg-[#f5b800] text-[#003087] font-display font-bold py-3 transition-all hover:scale-[1.03] active:scale-95">
    <Icon name="Wallet" size={18} />
    {label}
  </button>
);

function LangSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="glass glass-hover flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium"
      >
        <span>{LANG_LABELS[lang]?.split(' ')[0] || '🌐'}</span>
        <Icon name="ChevronDown" size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-12 glass-strong rounded-2xl p-2 min-w-[180px] max-h-[320px] overflow-y-auto z-50 animate-fade-in">
          {SUPPORTED_LANGS.map(l => (
            <button
              key={l}
              onClick={() => { setLang(l); setOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${lang === l ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
            >
              {LANG_LABELS[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const Index = () => {
  const [active, setActive] = useState('home');
  const { t, loading } = useLang();

  const NAV = [
    { id: 'home', label: t.nav_home, icon: 'Home' },
    { id: 'library', label: t.nav_library, icon: 'Clapperboard' },
    { id: 'subscribe', label: t.nav_subscribe, icon: 'Gem' },
    { id: 'profile', label: t.nav_profile, icon: 'User' },
    { id: 'manage', label: t.nav_manage, icon: 'BarChart3' },
    { id: 'contacts', label: t.nav_contacts, icon: 'Mail' },
  ];

  const VIDEOS = [
    { title: t.video1, dur: '12:40', locked: false, views: '4.2K' },
    { title: t.video2, dur: '28:15', locked: true, views: '2.8K' },
    { title: t.video3, dur: '45:02', locked: true, views: '1.9K' },
    { title: t.video4, dur: '1:12:30', locked: true, views: '980' },
    { title: t.video5, dur: '34:18', locked: true, views: '1.5K' },
    { title: t.video6, dur: '19:55', locked: true, views: '760' },
  ];

  const PLANS = [
    { name: 'Basic', price: 9, features: t.plan_basic, popular: false },
    { name: 'Premium', price: 19, features: t.plan_premium, popular: true },
    { name: 'Pro', price: 49, features: t.plan_pro, popular: false },
  ];

  const STATS = [
    { label: t.manage_stat1, value: STATS_VALUES[0], icon: STATS_ICONS[0], trend: STATS_TRENDS[0] },
    { label: t.manage_stat2, value: STATS_VALUES[1], icon: STATS_ICONS[1], trend: STATS_TRENDS[1] },
    { label: t.manage_stat3, value: STATS_VALUES[2], icon: STATS_ICONS[2], trend: STATS_TRENDS[2] },
    { label: t.manage_stat4, value: STATS_VALUES[3], icon: STATS_ICONS[3], trend: STATS_TRENDS[3] },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#05060a' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-400 to-fuchsia-500 flex items-center justify-center animate-pulse">
            <Icon name="Play" size={24} className="text-white" />
          </div>
          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden font-body">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img src={BG} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#05060a]/70" />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-500/20 blur-[120px] animate-glow" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-fuchsia-500/15 blur-[120px] animate-glow" />
      </div>

      {/* Navbar */}
      <header className="sticky top-4 z-50 mx-auto max-w-6xl px-4">
        <nav className="glass-strong rounded-full px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2 pl-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-400 to-fuchsia-500 flex items-center justify-center">
              <Icon name="Play" size={16} className="text-white" />
            </div>
            <span className="font-display font-extrabold text-lg tracking-tight">MAXON CREATORS</span>
          </div>
          <div className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => setActive(n.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${active === n.id ? 'bg-white/15 text-white' : 'text-white/60 hover:text-white'}`}
              >
                {n.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <LangSwitcher />
            <button className="rounded-full bg-white text-[#05060a] px-5 py-2 text-sm font-display font-semibold hover:scale-105 transition-transform">
              {t.nav_login}
            </button>
          </div>
        </nav>
        {/* Mobile nav */}
        <div className="lg:hidden mt-2 glass rounded-2xl p-1.5 flex overflow-x-auto gap-1">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setActive(n.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium ${active === n.id ? 'bg-white/15' : 'text-white/60'}`}
            >
              <Icon name={n.icon} size={14} />
              {n.label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-24">
        {/* HOME / HERO */}
        <section id="home" className="pt-20 pb-16 text-center animate-fade-in">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-white/80 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> {t.hero_badge}
          </span>
          <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-[1.05] tracking-tight mb-6">
            {t.hero_title1} <br /><span className="text-gradient">{t.hero_title2}</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">{t.hero_desc}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => setActive('subscribe')} className="rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-8 py-4 font-display font-semibold hover:scale-105 transition-transform shadow-lg shadow-indigo-500/30">
              {t.hero_cta}
            </button>
            <button onClick={() => setActive('library')} className="glass-strong glass-hover rounded-full px-8 py-4 font-display font-semibold">
              {t.hero_cta2}
            </button>
          </div>
        </section>

        {/* LIBRARY */}
        <section id="library" className="py-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl">{t.library_title}</h2>
              <p className="text-white/50 mt-1">{t.library_sub}</p>
            </div>
            <Icon name="Clapperboard" size={32} className="text-white/30" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VIDEOS.map((v, i) => (
              <div key={i} className="glass glass-hover rounded-3xl overflow-hidden group animate-scale-in" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="relative aspect-video overflow-hidden">
                  <img src={THUMB} alt={v.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05060a] to-transparent" />
                  {v.locked ? (
                    <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30">
                      <div className="glass-strong rounded-full p-4"><Icon name="Lock" size={24} /></div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="glass-strong rounded-full p-4"><Icon name="Play" size={24} /></div>
                    </div>
                  )}
                  <span className="absolute bottom-3 right-3 glass rounded-md px-2 py-0.5 text-xs">{v.dur}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-lg mb-1">{v.title}</h3>
                  <div className="flex items-center gap-3 text-white/50 text-sm">
                    <span className="flex items-center gap-1"><Icon name="Eye" size={14} /> {v.views}</span>
                    {v.locked && <span className="flex items-center gap-1 text-amber-300"><Icon name="Crown" size={14} /> {t.library_premium}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SUBSCRIBE */}
        <section id="subscribe" className="py-12">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-2">{t.subscribe_title}</h2>
            <p className="text-white/50">{t.subscribe_sub}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((p) => (
              <div key={p.name} className={`relative rounded-3xl p-7 ${p.popular ? 'glass-strong ring-2 ring-indigo-400/50 scale-[1.03]' : 'glass'} glass-hover`}>
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-1 text-xs font-display font-bold">
                    {t.subscribe_popular}
                  </span>
                )}
                <h3 className="font-display font-bold text-xl mb-1">{p.name}</h3>
                <div className="flex items-end gap-1 mb-6">
                  <span className="font-display font-extrabold text-5xl">${p.price}</span>
                  <span className="text-white/50 mb-2">/{t.subscribe_per_month}</span>
                </div>
                <ul className="space-y-3 mb-7">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                      <Icon name="Check" size={18} className="text-indigo-400 flex-shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
                <PayPalButton label={`${t.subscribe_pay} $${p.price}`} />
              </div>
            ))}
          </div>
        </section>

        {/* PROFILE */}
        <section id="profile" className="py-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-8">{t.profile_title}</h2>
          <div className="glass-strong rounded-3xl p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-500 flex items-center justify-center font-display font-bold text-3xl">A</div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="font-display font-bold text-2xl">Alexander Petrov</h3>
                <p className="text-white/50">alex@example.com</p>
                <span className="inline-flex items-center gap-1 mt-2 glass rounded-full px-3 py-1 text-sm text-amber-300">
                  <Icon name="Crown" size={14} /> {t.profile_until} 24 Jul 2026
                </span>
              </div>
              <button className="glass glass-hover rounded-full px-6 py-3 font-medium">{t.profile_settings}</button>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10 text-center">
              <div><div className="font-display font-bold text-2xl">42</div><div className="text-white/50 text-sm">{t.profile_watched}</div></div>
              <div><div className="font-display font-bold text-2xl">8</div><div className="text-white/50 text-sm">{t.profile_saved}</div></div>
              <div><div className="font-display font-bold text-2xl">$19</div><div className="text-white/50 text-sm">{t.profile_plan}</div></div>
            </div>
          </div>
        </section>

        {/* MANAGE / ANALYTICS */}
        <section id="manage" className="py-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-2">{t.manage_title}</h2>
          <p className="text-white/50 mb-8">{t.manage_sub}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            {STATS.map((s) => (
              <div key={s.label} className="glass glass-hover rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="glass rounded-xl p-2"><Icon name={s.icon} size={20} className="text-indigo-300" /></div>
                  <span className="text-green-400 text-sm font-medium">{s.trend}</span>
                </div>
                <div className="font-display font-bold text-3xl">{s.value}</div>
                <div className="text-white/50 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="glass-strong rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-xl mb-1">{t.manage_upload}</h3>
              <p className="text-white/50">{t.manage_upload_hint}</p>
            </div>
            <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-7 py-3.5 font-display font-semibold hover:scale-105 transition-transform">
              <Icon name="Upload" size={18} /> {t.manage_upload_btn}
            </button>
          </div>
        </section>

        {/* CONTACTS */}
        <section id="contacts" className="py-12">
          <div className="glass-strong rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">{t.contacts_title}</h2>
              <p className="text-white/60 mb-8">{t.contacts_sub}</p>
              <div className="space-y-4">
                <a className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"><div className="glass rounded-xl p-2.5"><Icon name="Mail" size={18} /></div> support@maxoncreators.com</a>
                <a className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"><div className="glass rounded-xl p-2.5"><Icon name="Send" size={18} /></div> @maxoncreators</a>
                <a className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"><div className="glass rounded-xl p-2.5"><Icon name="MapPin" size={18} /></div> Worldwide</a>
              </div>
            </div>
            <form className="space-y-4">
              <input placeholder={t.contacts_name} className="w-full glass rounded-xl px-4 py-3.5 placeholder:text-white/40 outline-none focus:ring-2 ring-indigo-400/50" />
              <input placeholder={t.contacts_email} className="w-full glass rounded-xl px-4 py-3.5 placeholder:text-white/40 outline-none focus:ring-2 ring-indigo-400/50" />
              <textarea placeholder={t.contacts_message} rows={4} className="w-full glass rounded-xl px-4 py-3.5 placeholder:text-white/40 outline-none focus:ring-2 ring-indigo-400/50 resize-none" />
              <button type="button" className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 py-3.5 font-display font-semibold hover:scale-[1.02] transition-transform">
                {t.contacts_send}
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-12 text-center text-white/40 text-sm">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-400 to-fuchsia-500 flex items-center justify-center"><Icon name="Play" size={12} /></div>
            <span className="font-display font-bold text-white">MAXON CREATORS</span>
          </div>
          © 2026 MAXON CREATORS. {t.footer}
        </footer>
      </main>
    </div>
  );
};

export default Index;
