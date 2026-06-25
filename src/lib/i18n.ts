export type Lang = 'ru' | 'en' | 'es' | 'de' | 'fr' | 'pt' | 'zh' | 'ja' | 'ko' | 'ar' | 'tr' | 'it' | 'pl' | 'nl' | 'sv' | 'no' | 'da' | 'fi';

export const LANG_LABELS: Record<string, string> = {
  ru: '🇷🇺 Русский',
  en: '🇺🇸 English',
  es: '🇪🇸 Español',
  de: '🇩🇪 Deutsch',
  fr: '🇫🇷 Français',
  pt: '🇧🇷 Português',
  zh: '🇨🇳 中文',
  ja: '🇯🇵 日本語',
  ko: '🇰🇷 한국어',
  ar: '🇸🇦 العربية',
  tr: '🇹🇷 Türkçe',
  it: '🇮🇹 Italiano',
  pl: '🇵🇱 Polski',
  nl: '🇳🇱 Nederlands',
  sv: '🇸🇪 Svenska',
  no: '🇳🇴 Norsk',
  da: '🇩🇰 Dansk',
  fi: '🇫🇮 Suomi',
};

export type T = {
  nav_home: string;
  nav_library: string;
  nav_subscribe: string;
  nav_profile: string;
  nav_manage: string;
  nav_contacts: string;
  nav_login: string;
  hero_badge: string;
  hero_title1: string;
  hero_title2: string;
  hero_desc: string;
  hero_cta: string;
  hero_cta2: string;
  library_title: string;
  library_sub: string;
  library_premium: string;
  subscribe_title: string;
  subscribe_sub: string;
  subscribe_popular: string;
  subscribe_per_month: string;
  subscribe_pay: string;
  profile_title: string;
  profile_settings: string;
  profile_watched: string;
  profile_saved: string;
  profile_plan: string;
  profile_until: string;
  manage_title: string;
  manage_sub: string;
  manage_stat1: string;
  manage_stat2: string;
  manage_stat3: string;
  manage_stat4: string;
  manage_upload: string;
  manage_upload_hint: string;
  manage_upload_btn: string;
  contacts_title: string;
  contacts_sub: string;
  contacts_name: string;
  contacts_email: string;
  contacts_message: string;
  contacts_send: string;
  footer: string;
  video1: string;
  video2: string;
  video3: string;
  video4: string;
  video5: string;
  video6: string;
  plan_basic: string[];
  plan_premium: string[];
  plan_pro: string[];
  lang_switcher: string;
};

const translations: Record<string, T> = {
  ru: {
    nav_home: 'Главная', nav_library: 'Видеотека', nav_subscribe: 'Подписка',
    nav_profile: 'Профиль', nav_manage: 'Управление', nav_contacts: 'Контакты', nav_login: 'Войти',
    hero_badge: 'Новые видео каждую неделю',
    hero_title1: 'Твой контент.', hero_title2: 'Твой заработок.',
    hero_desc: 'Закрытая видеотека по платной подписке. Загружай видео, открывай доступ за деньги и получай выплаты через PayPal.',
    hero_cta: 'Оформить подписку', hero_cta2: 'Смотреть видеотеку',
    library_title: 'Видеотека', library_sub: 'Эксклюзивный контент в одном месте', library_premium: 'Premium',
    subscribe_title: 'Подписка', subscribe_sub: 'Выбери тариф и оплати через PayPal',
    subscribe_popular: 'Популярный', subscribe_per_month: 'мес', subscribe_pay: 'Оплатить',
    profile_title: 'Профиль', profile_settings: 'Настройки',
    profile_watched: 'просмотрено', profile_saved: 'в избранном', profile_plan: 'подписка',
    profile_until: 'Premium до',
    manage_title: 'Управление и аналитика', manage_sub: 'Панель автора — загрузка видео и статистика дохода',
    manage_stat1: 'Доход за месяц', manage_stat2: 'Подписчиков', manage_stat3: 'Просмотров', manage_stat4: 'Видео в архиве',
    manage_upload: 'Загрузить новое видео', manage_upload_hint: 'Перетащите файл или выберите с устройства', manage_upload_btn: 'Загрузить видео',
    contacts_title: 'Контакты', contacts_sub: 'Остались вопросы? Напишите нам — ответим в течение дня.',
    contacts_name: 'Ваше имя', contacts_email: 'Email', contacts_message: 'Сообщение', contacts_send: 'Отправить сообщение',
    footer: 'Все платежи защищены PayPal.',
    video1: 'Введение в профессию', video2: 'Глубокий разбор кейса', video3: 'Эксклюзив для подписчиков',
    video4: 'Закрытый воркшоп', video5: 'Q&A сессия', video6: 'Бонусный материал',
    plan_basic: ['Доступ к базовой библиотеке', 'Качество до 1080p', 'Новые видео раз в неделю'],
    plan_premium: ['Полный доступ ко всем видео', 'Качество 4K Ultra HD', 'Ранний доступ к новинкам', 'Закрытые трансляции'],
    plan_pro: ['Всё из Premium', 'Личные консультации', 'Эксклюзивный чат', 'Скачивание офлайн'],
    lang_switcher: 'Язык',
  },
  en: {
    nav_home: 'Home', nav_library: 'Library', nav_subscribe: 'Subscribe',
    nav_profile: 'Profile', nav_manage: 'Dashboard', nav_contacts: 'Contact', nav_login: 'Log in',
    hero_badge: 'New videos every week',
    hero_title1: 'Your content.', hero_title2: 'Your income.',
    hero_desc: 'Exclusive paid video library. Upload videos, charge for access and receive PayPal payouts.',
    hero_cta: 'Get subscription', hero_cta2: 'Browse library',
    library_title: 'Video Library', library_sub: 'Exclusive content in one place', library_premium: 'Premium',
    subscribe_title: 'Subscription', subscribe_sub: 'Choose a plan and pay via PayPal',
    subscribe_popular: 'Popular', subscribe_per_month: 'mo', subscribe_pay: 'Pay',
    profile_title: 'Profile', profile_settings: 'Settings',
    profile_watched: 'watched', profile_saved: 'saved', profile_plan: 'plan',
    profile_until: 'Premium until',
    manage_title: 'Dashboard & Analytics', manage_sub: 'Creator panel — upload videos and track revenue',
    manage_stat1: 'Monthly revenue', manage_stat2: 'Subscribers', manage_stat3: 'Views', manage_stat4: 'Videos',
    manage_upload: 'Upload new video', manage_upload_hint: 'Drag a file or select from device', manage_upload_btn: 'Upload video',
    contacts_title: 'Contact', contacts_sub: 'Have questions? Write to us — we reply within a day.',
    contacts_name: 'Your name', contacts_email: 'Email', contacts_message: 'Message', contacts_send: 'Send message',
    footer: 'All payments secured by PayPal.',
    video1: 'Introduction to the craft', video2: 'Deep case study', video3: 'Exclusive for subscribers',
    video4: 'Private workshop', video5: 'Q&A session', video6: 'Bonus material',
    plan_basic: ['Access to basic library', 'Up to 1080p quality', 'New videos weekly'],
    plan_premium: ['Full access to all videos', '4K Ultra HD quality', 'Early access to new content', 'Private streams'],
    plan_pro: ['Everything in Premium', 'Personal consultations', 'Exclusive chat', 'Offline downloads'],
    lang_switcher: 'Language',
  },
  es: {
    nav_home: 'Inicio', nav_library: 'Biblioteca', nav_subscribe: 'Suscripción',
    nav_profile: 'Perfil', nav_manage: 'Panel', nav_contacts: 'Contacto', nav_login: 'Entrar',
    hero_badge: 'Nuevos vídeos cada semana',
    hero_title1: 'Tu contenido.', hero_title2: 'Tus ingresos.',
    hero_desc: 'Videoteca privada de pago. Sube vídeos, cobra el acceso y recibe pagos por PayPal.',
    hero_cta: 'Suscribirse', hero_cta2: 'Ver biblioteca',
    library_title: 'Biblioteca', library_sub: 'Contenido exclusivo en un solo lugar', library_premium: 'Premium',
    subscribe_title: 'Suscripción', subscribe_sub: 'Elige un plan y paga con PayPal',
    subscribe_popular: 'Popular', subscribe_per_month: 'mes', subscribe_pay: 'Pagar',
    profile_title: 'Perfil', profile_settings: 'Ajustes',
    profile_watched: 'vistos', profile_saved: 'guardados', profile_plan: 'plan',
    profile_until: 'Premium hasta',
    manage_title: 'Panel y analíticas', manage_sub: 'Panel del creador — sube vídeos y monitorea ingresos',
    manage_stat1: 'Ingresos mensuales', manage_stat2: 'Suscriptores', manage_stat3: 'Visualizaciones', manage_stat4: 'Vídeos',
    manage_upload: 'Subir nuevo vídeo', manage_upload_hint: 'Arrastra un archivo o selecciónalo', manage_upload_btn: 'Subir vídeo',
    contacts_title: 'Contacto', contacts_sub: '¿Tienes preguntas? Escríbenos.',
    contacts_name: 'Tu nombre', contacts_email: 'Email', contacts_message: 'Mensaje', contacts_send: 'Enviar mensaje',
    footer: 'Todos los pagos protegidos por PayPal.',
    video1: 'Introducción a la profesión', video2: 'Análisis profundo', video3: 'Exclusivo para suscriptores',
    video4: 'Taller privado', video5: 'Sesión Q&A', video6: 'Material extra',
    plan_basic: ['Acceso a biblioteca básica', 'Calidad hasta 1080p', 'Nuevos vídeos semanales'],
    plan_premium: ['Acceso completo', 'Calidad 4K Ultra HD', 'Acceso anticipado', 'Streams privados'],
    plan_pro: ['Todo de Premium', 'Consultas personales', 'Chat exclusivo', 'Descargas offline'],
    lang_switcher: 'Idioma',
  },
  de: {
    nav_home: 'Start', nav_library: 'Bibliothek', nav_subscribe: 'Abonnement',
    nav_profile: 'Profil', nav_manage: 'Dashboard', nav_contacts: 'Kontakt', nav_login: 'Anmelden',
    hero_badge: 'Neue Videos jede Woche',
    hero_title1: 'Dein Inhalt.', hero_title2: 'Dein Einkommen.',
    hero_desc: 'Private Videothek mit Bezahlzugang. Lade Videos hoch und erhalte Auszahlungen per PayPal.',
    hero_cta: 'Abonnieren', hero_cta2: 'Bibliothek ansehen',
    library_title: 'Videothek', library_sub: 'Exklusive Inhalte an einem Ort', library_premium: 'Premium',
    subscribe_title: 'Abonnement', subscribe_sub: 'Wähle einen Plan und zahle per PayPal',
    subscribe_popular: 'Beliebt', subscribe_per_month: 'Mo.', subscribe_pay: 'Bezahlen',
    profile_title: 'Profil', profile_settings: 'Einstellungen',
    profile_watched: 'gesehen', profile_saved: 'gespeichert', profile_plan: 'Plan',
    profile_until: 'Premium bis',
    manage_title: 'Dashboard & Analyse', manage_sub: 'Creator-Panel — Videos hochladen und Einnahmen verfolgen',
    manage_stat1: 'Monatliche Einnahmen', manage_stat2: 'Abonnenten', manage_stat3: 'Aufrufe', manage_stat4: 'Videos',
    manage_upload: 'Neues Video hochladen', manage_upload_hint: 'Datei ziehen oder auswählen', manage_upload_btn: 'Video hochladen',
    contacts_title: 'Kontakt', contacts_sub: 'Fragen? Schreib uns — wir antworten innerhalb eines Tages.',
    contacts_name: 'Dein Name', contacts_email: 'E-Mail', contacts_message: 'Nachricht', contacts_send: 'Nachricht senden',
    footer: 'Alle Zahlungen durch PayPal gesichert.',
    video1: 'Einführung', video2: 'Fallstudie', video3: 'Exklusiv für Abonnenten',
    video4: 'Privater Workshop', video5: 'Q&A-Sitzung', video6: 'Bonusmaterial',
    plan_basic: ['Zugang zur Basisbibliothek', 'Bis 1080p Qualität', 'Wöchentliche neue Videos'],
    plan_premium: ['Voller Zugang', '4K Ultra HD', 'Früher Zugang zu Neuheiten', 'Private Streams'],
    plan_pro: ['Alles aus Premium', 'Persönliche Beratungen', 'Exklusiver Chat', 'Offline-Downloads'],
    lang_switcher: 'Sprache',
  },
  fr: {
    nav_home: 'Accueil', nav_library: 'Vidéothèque', nav_subscribe: 'Abonnement',
    nav_profile: 'Profil', nav_manage: 'Tableau de bord', nav_contacts: 'Contact', nav_login: 'Connexion',
    hero_badge: 'Nouvelles vidéos chaque semaine',
    hero_title1: 'Votre contenu.', hero_title2: 'Vos revenus.',
    hero_desc: 'Vidéothèque privée avec accès payant. Publiez des vidéos et recevez des paiements via PayPal.',
    hero_cta: "S'abonner", hero_cta2: 'Voir la vidéothèque',
    library_title: 'Vidéothèque', library_sub: 'Contenu exclusif en un seul endroit', library_premium: 'Premium',
    subscribe_title: 'Abonnement', subscribe_sub: 'Choisissez un plan et payez via PayPal',
    subscribe_popular: 'Populaire', subscribe_per_month: 'mois', subscribe_pay: 'Payer',
    profile_title: 'Profil', profile_settings: 'Paramètres',
    profile_watched: 'regardés', profile_saved: 'sauvegardés', profile_plan: 'abonnement',
    profile_until: 'Premium jusqu\'au',
    manage_title: 'Tableau de bord & Analyses', manage_sub: 'Panel créateur — téléchargez des vidéos et suivez vos revenus',
    manage_stat1: 'Revenus mensuels', manage_stat2: 'Abonnés', manage_stat3: 'Vues', manage_stat4: 'Vidéos',
    manage_upload: 'Télécharger une vidéo', manage_upload_hint: 'Glissez un fichier ou sélectionnez-en un', manage_upload_btn: 'Télécharger',
    contacts_title: 'Contact', contacts_sub: 'Des questions ? Écrivez-nous — réponse sous 24h.',
    contacts_name: 'Votre nom', contacts_email: 'Email', contacts_message: 'Message', contacts_send: 'Envoyer',
    footer: 'Tous les paiements sécurisés par PayPal.',
    video1: 'Introduction au métier', video2: 'Analyse approfondie', video3: 'Exclusif pour abonnés',
    video4: 'Atelier privé', video5: 'Session Q&R', video6: 'Contenu bonus',
    plan_basic: ['Accès à la bibliothèque de base', "Jusqu'à 1080p", 'Nouvelles vidéos hebdomadaires'],
    plan_premium: ['Accès complet', '4K Ultra HD', 'Accès anticipé', 'Streams privés'],
    plan_pro: ['Tout de Premium', 'Consultations personnelles', 'Chat exclusif', 'Téléchargements hors ligne'],
    lang_switcher: 'Langue',
  },
};

// Fallback to English for unknown languages
export function getTranslation(lang: string): T {
  return translations[lang] || translations['en'];
}

export const SUPPORTED_LANGS = Object.keys(translations);
