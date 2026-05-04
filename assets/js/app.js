class HeaderComponent {
  constructor(root) { this.root = root; }

  render(page) {
    const pages = {
      index: { leftHref: '/', links: [] },
      profile: { leftHref: '/', links: [{ href: '/projects.html', ko: '프로젝트', en: 'Projects' }] },
      projects: { leftHref: '/', links: [{ href: '/profile.html', ko: '개인정보', en: 'Profile' }] },
      'project-default': { leftHref: '/index.html', links: [{ href: '/projects.html', ko: '프로젝트 목록', en: 'Project list' }] }
    };

    const cfg = pages[page] || pages.index;
    const links = cfg.links.map((l) => `<a href="${l.href}" class="interactive rounded-full border border-slate-300 px-4 py-2 text-sm dark:border-slate-700" data-i18n data-i18n-ko="${l.ko}" data-i18n-en="${l.en}">${l.ko}</a>`).join('');

    return `<header class="flex items-center justify-between">
      <a href="${cfg.leftHref}" class="interactive text-sm font-semibold tracking-[0.2em] text-slate-500 dark:text-slate-400" aria-label="Home">CARPEDIEM</a>
      <div class="flex gap-2">${links}
        <button id="langButton" aria-label="Language toggle" class="interactive control-btn rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold dark:border-slate-700">EN</button>
        <button id="themeButton" aria-label="Theme toggle" data-theme-label-dark-ko="다크 모드" data-theme-label-light-ko="라이트 모드" data-theme-label-dark-en="Dark mode" data-theme-label-light-en="Light mode" class="interactive control-btn rounded-full border border-slate-300 px-4 py-2 text-sm dark:border-slate-700">다크 모드</button>
      </div>
    </header>`;
  }

  init() {
    const target = document.querySelector('[data-site-header]');
    if (!target) return;
    target.innerHTML = this.render(target.dataset.page || 'index');
  }
}

class ThemeManager {
  constructor(root, button) { this.root = root; this.button = button; this.storageKey = 'theme'; }
  getInitialTheme() { const s = localStorage.getItem(this.storageKey); if (s === 'light' || s === 'dark') return s; return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }
  getLabel(language, isDark) { if (!this.button) return ''; const d = language === 'en' ? this.button.dataset.themeLabelDarkEn : this.button.dataset.themeLabelDarkKo; const l = language === 'en' ? this.button.dataset.themeLabelLightEn : this.button.dataset.themeLabelLightKo; return isDark ? (l || 'Light mode') : (d || 'Dark mode'); }
  apply(theme, language = 'ko') { const isDark = theme === 'dark'; this.root.classList.toggle('dark', isDark); this.root.style.colorScheme = isDark ? 'dark' : 'light'; localStorage.setItem(this.storageKey, theme); if (this.button) this.button.textContent = this.getLabel(language, isDark); }
  toggle(language) { this.apply(this.root.classList.contains('dark') ? 'light' : 'dark', language); }
}

class LanguageManager {
  constructor(root, button) { this.root = root; this.button = button; this.storageKey = 'language'; }
  getInitialLanguage() { const s = localStorage.getItem(this.storageKey); if (s === 'ko' || s === 'en') return s; return (navigator.language || 'ko').toLowerCase().startsWith('ko') ? 'ko' : 'en'; }
  getValue(el, lang, prefix) { return el.dataset[lang === 'en' ? `${prefix}En` : `${prefix}Ko`]; }
  apply(language) {
    this.root.lang = language;
    ['i18n', 'i18nTitle', 'i18nContent'].forEach((prefix) => {
      document.querySelectorAll(`[data-${prefix.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}]`).forEach((el) => {
        const v = this.getValue(el, language, prefix);
        if (!v) return;
        if (prefix === 'i18n') el.textContent = v;
        if (prefix === 'i18nTitle') el.setAttribute('title', v);
        if (prefix === 'i18nContent') el.setAttribute('content', v);
      });
    });
    if (this.button) this.button.textContent = language === 'ko' ? 'EN' : '한';
    localStorage.setItem(this.storageKey, language);
  }
  toggle() { this.apply(this.root.lang === 'ko' ? 'en' : 'ko'); }
}

class ProjectManager {
  constructor() {
    this.password = window.APP_CONFIG?.GM_PASSWORD || '1234';
    this.container = document.getElementById('projectsContainer');
    this.form = document.getElementById('projectForm');
    this.gmButton = document.getElementById('gmButton');
    this.status = document.getElementById('projectStatus');
    this.admin = false;
    this.client = null;
  }
  setStatus(message) { if (this.status) this.status.textContent = message; }
  setupClient() {
    const url = window.APP_CONFIG?.SUPABASE_URL;
    const key = window.APP_CONFIG?.SUPABASE_ANON_KEY;
    if (!url || !key || url.includes('YOUR_PROJECT') || key.includes('YOUR_SUPABASE')) {
      this.setStatus('DB 설정이 필요합니다. assets/js/config.js에서 Supabase 값을 입력하세요.');
      return false;
    }
    if (!window.supabase?.createClient) {
      this.setStatus('Supabase 라이브러리를 불러오지 못했습니다.');
      return false;
    }
    this.client = window.supabase.createClient(url, key);
    return true;
  }
  async getProjects() {
    const { data, error } = await this.client.from('projects').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }
  async render() {
    if (!this.container || !this.client) return;
    try {
      const projects = await this.getProjects();
      this.container.innerHTML = projects.map((p) => {
        const imgs = [p.image1, p.image2, p.image3, p.image4].filter(Boolean).map((img) => `<img src="${img}" alt="${p.title}" class="h-32 w-full rounded-xl object-cover">`).join('');
        return `<article class="rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900">
          <h2 class="mt-2 text-2xl font-semibold">${p.title}</h2>
          <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">${p.description}</p>
          <div class="mt-4 grid gap-3 sm:grid-cols-2">${imgs || '<p class="text-xs text-slate-400">이미지 없음</p>'}</div>
          ${this.admin ? `<button data-delete-id="${p.id}" class="interactive mt-5 rounded-full border border-rose-300 px-4 py-2 text-xs font-semibold text-rose-600">Delete</button>` : ''}
        </article>`;
      }).join('');
      this.container.querySelectorAll('[data-delete-id]').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const id = btn.getAttribute('data-delete-id');
          const { error } = await this.client.from('projects').delete().eq('id', id);
          if (error) return this.setStatus(`삭제 실패: ${error.message}`);
          await this.render();
        });
      });
      this.form?.classList.toggle('hidden', !this.admin);
      this.setStatus('');
    } catch (e) { this.setStatus(`프로젝트 조회 실패: ${e.message}`); }
  }
  initForm() {
    if (!this.form || !this.client) return;
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(this.form);
      const payload = {
        title: String(formData.get('title') || '').trim(),
        description: String(formData.get('description') || '').trim(),
        image1: String(formData.get('image1') || '').trim(),
        image2: String(formData.get('image2') || '').trim(),
        image3: String(formData.get('image3') || '').trim(),
        image4: String(formData.get('image4') || '').trim()
      };
      const { error } = await this.client.from('projects').insert(payload);
      if (error) return this.setStatus(`추가 실패: ${error.message}`);
      this.form.reset();
      await this.render();
    });
  }
  initGM() {
    if (!this.gmButton) return;
    this.gmButton.addEventListener('click', async () => {
      if (this.admin) { this.admin = false; await this.render(); return; }
      const input = prompt('관리자 암호를 입력하세요');
      if (input === this.password) { this.admin = true; await this.render(); }
      else if (input !== null) alert('암호가 일치하지 않습니다.');
    });
  }
  async init() {
    if (!this.container) return;
    if (!this.setupClient()) return;
    this.initForm();
    this.initGM();
    await this.render();
  }
}

class CursorEffect { constructor() { this.ring = null; this.pointerX = innerWidth / 2; this.pointerY = innerHeight / 2; this.ringX = this.pointerX; this.ringY = this.pointerY; }
  setup() { if (!matchMedia('(min-width: 768px)').matches) return; this.ring = document.getElementById('cursorRing') || document.createElement('div'); this.ring.id='cursorRing'; this.ring.className='cursor-ring'; if (!document.getElementById('cursorRing')) document.body.appendChild(this.ring); document.body.classList.add('custom-cursor'); addEventListener('pointermove',(e)=>{ this.pointerX=e.clientX; this.pointerY=e.clientY; const t=e.target instanceof Element?e.target:null; this.ring.classList.toggle('is-hover', Boolean(t?.closest('a, button, input, textarea, select, [role="button"], .interactive'))); }); addEventListener('pointerdown',()=>this.ring.classList.add('is-active')); addEventListener('pointerup',()=>this.ring.classList.remove('is-active')); requestAnimationFrame(()=>this.animate()); }
  animate(){ if(!this.ring) return; this.ringX += (this.pointerX-this.ringX)*0.16; this.ringY += (this.pointerY-this.ringY)*0.16; this.ring.style.transform=`translate3d(${this.ringX}px, ${this.ringY}px, 0) translate(-50%, -50%)`; requestAnimationFrame(()=>this.animate()); }}

class PortfolioApp {
  init() {
    new HeaderComponent(document.documentElement).init();
    const root = document.documentElement;
    const langButton = document.getElementById('langButton');
    const themeButton = document.getElementById('themeButton');
    const language = new LanguageManager(root, langButton);
    const theme = new ThemeManager(root, themeButton);
    const initialLanguage = language.getInitialLanguage();
    language.apply(initialLanguage);
    theme.apply(theme.getInitialTheme(), initialLanguage);
    langButton?.addEventListener('click', () => { language.toggle(); theme.apply(root.classList.contains('dark') ? 'dark' : 'light', root.lang); });
    themeButton?.addEventListener('click', () => theme.toggle(root.lang));
    new CursorEffect().setup();
    new ProjectManager().init();
  }
}

document.addEventListener('DOMContentLoaded', () => new PortfolioApp().init());
