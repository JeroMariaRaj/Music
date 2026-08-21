// Shared navigation, display preferences, and course filtering.
document.addEventListener('DOMContentLoaded', () => {
  setupMobileNavigation(); setupThemeToggle(); setupRtlToggle(); setupTrialModal(); setupCourseFilters(); highlightCurrentPage(); setupSubscribeForm();
});

function setupMobileNavigation() {
  const header = document.querySelector('header');
  if (!header) return;
  const menuButton = document.querySelector('#mobile-menu-btn') || [...header.querySelectorAll('button')].find(button => button.classList.contains('lg:hidden'));
  const existingMenu = document.querySelector('#mobile-menu');
  if (menuButton && existingMenu) {
    menuButton.type = 'button'; menuButton.setAttribute('aria-label', 'Open navigation menu'); menuButton.setAttribute('aria-expanded', 'false');
    menuButton.addEventListener('click', () => { const opening = existingMenu.classList.contains('hidden'); existingMenu.classList.toggle('hidden'); menuButton.setAttribute('aria-expanded', String(opening)); const icon = menuButton.querySelector('i'); icon?.classList.toggle('fa-bars', !opening); icon?.classList.toggle('fa-xmark', opening); });
    existingMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => existingMenu.classList.add('hidden')));
    return;
  }
  const desktopNav = header.querySelector('nav');
  if (!menuButton || !desktopNav) return;
  const links = [...desktopNav.querySelectorAll('a')].map(link => `<a href="${link.getAttribute('href')}" class="block rounded-lg px-3 py-2.5 font-medium hover:bg-red-50 hover:text-primary">${link.textContent.trim()}</a>`).join('');
  const mobileMenu = document.createElement('div');
  mobileMenu.id = 'mobile-menu';
  mobileMenu.className = 'hidden border-t border-gray-100 bg-white px-4 py-4 shadow-lg dark:border-gray-700 dark:bg-gray-800 lg:hidden';
  mobileMenu.innerHTML = `<nav class="space-y-1">${links}</nav><div class="mt-3 flex items-center gap-3 border-t border-gray-100 pt-3 dark:border-gray-700"><button type="button" class="theme-toggle rounded-lg border px-3 py-2 text-sm font-bold">Theme</button><button type="button" class="rtl-toggle rounded-lg border px-3 py-2 text-sm font-bold">RTL</button><a href="login.html" class="rounded-lg bg-primary px-3 py-2 text-sm font-bold text-white">Login</a></div>`;
  header.append(mobileMenu);
  menuButton.type = 'button'; menuButton.setAttribute('aria-label', 'Open navigation menu'); menuButton.setAttribute('aria-expanded', 'false');
  menuButton.addEventListener('click', () => { const opening = mobileMenu.classList.contains('hidden'); mobileMenu.classList.toggle('hidden'); menuButton.setAttribute('aria-expanded', String(opening)); const icon = menuButton.querySelector('i'); icon?.classList.toggle('fa-bars', !opening); icon?.classList.toggle('fa-xmark', opening); });
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => mobileMenu.classList.add('hidden')));
}

function setupThemeToggle() {
  const apply = () => { const dark = localStorage.getItem('theme') === 'dark'; document.documentElement.classList.toggle('dark', dark); document.querySelectorAll('#themeToggle,#theme-toggle,.theme-toggle,.themeToggle').forEach(button => { button.setAttribute('aria-label', dark ? 'Use light theme' : 'Use dark theme'); const icon = button.querySelector('i'); if (icon) icon.className = dark ? 'fas fa-sun text-lg' : 'fas fa-moon text-lg'; }); };
  apply(); document.querySelectorAll('#themeToggle,#theme-toggle,.theme-toggle,.themeToggle').forEach(button => button.addEventListener('click', () => { localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'light' : 'dark'); apply(); }));
}

function setupRtlToggle() {
  const apply = () => { const rtl = localStorage.getItem('dir') === 'rtl'; document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr'); document.querySelectorAll('#rtlToggle,#rtl-toggle,.rtl-toggle,.rtlToggle').forEach(button => button.textContent = rtl ? 'LTR' : 'RTL'); };
  apply(); document.querySelectorAll('#rtlToggle,#rtl-toggle,.rtl-toggle,.rtlToggle').forEach(button => button.addEventListener('click', () => { localStorage.setItem('dir', document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl'); apply(); }));
}

function setupTrialModal() { const modal = document.querySelector('#trialModal'); if (!modal) return; document.addEventListener('click', event => { const button = event.target.closest('.book-trial-btn, button'); if (button && (button.classList.contains('book-trial-btn') || button.textContent.includes('Trial'))) { event.preventDefault(); modal.classList.remove('hidden'); modal.classList.add('flex'); } if (event.target.closest('#close-modal,#closeModalBtn,.fa-times')) { modal.classList.add('hidden'); modal.classList.remove('flex'); } }); modal.addEventListener('click', event => { if (event.target === modal || event.target.classList.contains('backdrop-blur-sm')) { modal.classList.add('hidden'); modal.classList.remove('flex'); } }); }
function setupCourseFilters() { const buttons = document.querySelectorAll('.filter-btn'), cards = document.querySelectorAll('.course-card'); buttons.forEach(button => button.addEventListener('click', () => { buttons.forEach(item => item.classList.remove('active','bg-primary','text-white')); button.classList.add('active','bg-primary','text-white'); cards.forEach(card => card.style.display = button.dataset.filter === 'all' || card.dataset.category === button.dataset.filter ? 'block' : 'none'); })); }
function highlightCurrentPage() { const page = location.pathname.split('/').pop() || 'index.html'; document.querySelectorAll('nav a,#mobile-menu a').forEach(link => { const href = link.getAttribute('href'); if (href === page || (page.startsWith('course-') && href === 'courses.html') || (page.startsWith('blog-') && href === 'blog.html')) link.classList.add('text-primary','font-bold'); }); }


function setupSubscribeForm() {
  document.querySelectorAll('.subscribe-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        showPopup('Successfully subscribed! Welcome to Symphony.');
        form.reset();
      }
    });
  });
}

function showPopup(message) {
  let popup = document.getElementById('global-popup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'global-popup';
    popup.className = 'fixed bottom-6 right-6 z-[200] bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-4 rounded-xl shadow-2xl transform transition-all duration-300 translate-y-20 opacity-0 flex items-center gap-3 font-semibold border border-gray-800 dark:border-gray-200';
    document.body.appendChild(popup);
  }
  popup.innerHTML = '<i class="fas fa-check-circle text-green-500 text-xl"></i> <span>' + message + '</span>';
  
  // Force reflow
  void popup.offsetWidth;
  
  // Animate in
  popup.classList.remove('translate-y-20', 'opacity-0');
  
  // Auto-hide after 3.5 seconds
  if (window.popupTimer) clearTimeout(window.popupTimer);
  window.popupTimer = setTimeout(() => {
    popup.classList.add('translate-y-20', 'opacity-0');
  }, 3500);
}

