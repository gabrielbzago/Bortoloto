(function () {
  const toggle = document.querySelector('[data-mobile-toggle]');
  const menu = document.querySelector('[data-menu]');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', menu.classList.contains('open') ? 'true' : 'false');
    });
  }

  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('[data-menu] a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path) a.setAttribute('aria-current', 'page');
  });

  const form = document.querySelector('[data-inscricao-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const payload = Object.fromEntries(fd.entries());

      const key = 'bortoloto_inscricoes';
      const current = JSON.parse(localStorage.getItem(key) || '[]');
      current.push({ ...payload, createdAt: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(current));

      const out = document.querySelector('[data-inscricao-result]');
      if (out) out.textContent = 'Inscrição registrada localmente (neste navegador). Para receber online, conecte a um backend ou Google Forms.';
      form.reset();
    });
  }

  const exportBtn = document.querySelector('[data-export-inscricoes]');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const key = 'bortoloto_inscricoes';
      const current = JSON.parse(localStorage.getItem(key) || '[]');
      const blob = new Blob([JSON.stringify(current, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'inscricoes-bortoloto.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  }
})();
