// ============================================================
// Guide Firebase Auth - Progression, thème, solutions, filtres
// ============================================================

(function () {
  'use strict';

  const STORAGE_KEY = 'cours_ios_firebase_progress_v1';
  const THEME_STORAGE_KEY = 'cours_ios_theme';
  const TOTAL_STEPS = 13; // Étapes 0 à 12

  let stepProgress = loadProgress();
  let currentTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';

  function emptyProgress() {
    const progress = {};
    for (let i = 0; i < TOTAL_STEPS; i++) {
      progress[`step${i}`] = false;
    }
    return progress;
  }

  function loadProgress() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return Object.assign(emptyProgress(), JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Impossible de charger la progression Firebase :', e);
    }
    return emptyProgress();
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stepProgress));
    } catch (e) {
      console.warn('Impossible de sauvegarder la progression Firebase :', e);
    }
  }

  function applyTheme(theme) {
    currentTheme = theme;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    const themeIcon = document.getElementById('theme-icon');

    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      if (themeIcon) themeIcon.innerText = '☀️';
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      if (themeIcon) themeIcon.innerText = '🌙';
    }
  }

  window.toggleAppTheme = function () {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  function updateProgressUI() {
    const completedCount = Object.values(stepProgress).filter(Boolean).length;
    const percentage = Math.round((completedCount / TOTAL_STEPS) * 100);

    const headerCounter = document.getElementById('header-progress-count');
    const headerBar = document.getElementById('header-progress-bar');
    const heroBar = document.getElementById('hero-progress-bar');
    const heroText = document.getElementById('hero-progress-text');
    const allDoneBanner = document.getElementById('all-done-banner');

    if (headerCounter) headerCounter.innerText = `${completedCount}/${TOTAL_STEPS}`;
    if (headerBar) headerBar.style.width = `${percentage}%`;
    if (heroBar) heroBar.style.width = `${percentage}%`;
    if (heroText) heroText.innerText = `${completedCount} sur ${TOTAL_STEPS} validée(s) (${percentage}%)`;

    if (allDoneBanner) {
      if (completedCount === TOTAL_STEPS) {
        allDoneBanner.classList.remove('hidden');
      } else {
        allDoneBanner.classList.add('hidden');
      }
    }

    for (let i = 0; i < TOTAL_STEPS; i++) {
      const stepKey = `step${i}`;
      const checkbox = document.getElementById(`check-${stepKey}`);
      const card = document.getElementById(`card-${stepKey}`);

      if (checkbox) {
        checkbox.checked = Boolean(stepProgress[stepKey]);
      }
      if (card) {
        if (stepProgress[stepKey]) {
          card.classList.add('completed');
        } else {
          card.classList.remove('completed');
        }
      }
    }
  }

  window.toggleStep = function (stepKey) {
    stepProgress[stepKey] = !stepProgress[stepKey];
    saveProgress();
    updateProgressUI();
  };

  window.resetAllProgress = function () {
    if (confirm('Voulez-vous vraiment réinitialiser votre progression du module Firebase ?')) {
      stepProgress = emptyProgress();
      saveProgress();
      updateProgressUI();
    }
  };

  window.completeAllSteps = function () {
    for (let i = 0; i < TOTAL_STEPS; i++) {
      stepProgress[`step${i}`] = true;
    }
    saveProgress();
    updateProgressUI();
  };

  // --- Protection des solutions ---
  const CORRECTION_PASSWORD = 'tutoSwift';
  const PASSWORD_STORAGE_KEY = 'cours_ios_firebase_correction_unlocked_v1';
  let isCorrectionUnlocked = sessionStorage.getItem(PASSWORD_STORAGE_KEY) === 'true';
  let pendingSolution = null;

  function updateLockUI() {
    const lockIcon = document.getElementById('lock-icon');
    const lockLabel = document.getElementById('lock-label');
    const lockBtn = document.getElementById('lock-toggle-btn');
    const lockIndicators = document.querySelectorAll('.solution-lock-indicator');

    if (isCorrectionUnlocked) {
      if (lockIcon) lockIcon.innerText = '🔓';
      if (lockLabel) lockLabel.innerText = 'Solutions déverrouillées';
      if (lockBtn) {
        lockBtn.classList.remove('bg-white/5', 'text-gray-300');
        lockBtn.classList.add('bg-emerald-500/20', 'text-emerald-300', 'border-emerald-500/40');
      }
      lockIndicators.forEach(ind => ind.innerText = '🔓');
    } else {
      if (lockIcon) lockIcon.innerText = '🔒';
      if (lockLabel) lockLabel.innerText = 'Solutions protégées';
      if (lockBtn) {
        lockBtn.classList.add('bg-white/5', 'text-gray-300');
        lockBtn.classList.remove('bg-emerald-500/20', 'text-emerald-300', 'border-emerald-500/40');
      }
      lockIndicators.forEach(ind => ind.innerText = '🔒');
    }
  }

  window.toggleLockState = function () {
    if (isCorrectionUnlocked) {
      if (confirm('Voulez-vous reverrouiller les solutions du module Firebase ?')) {
        isCorrectionUnlocked = false;
        sessionStorage.removeItem(PASSWORD_STORAGE_KEY);
        document.querySelectorAll("[id^='sol-step']").forEach(el => el.classList.remove('open'));
        updateLockUI();
      }
    } else {
      window.openPasswordModal();
    }
  };

  window.openPasswordModal = function (pending = null) {
    pendingSolution = pending;
    const modal = document.getElementById('password-modal');
    const input = document.getElementById('pwd-input');
    const errorEl = document.getElementById('pwd-error');
    if (!modal) return;

    if (errorEl) errorEl.classList.add('hidden');
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 100);
    }
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  };

  window.closePasswordModal = function () {
    const modal = document.getElementById('password-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
    pendingSolution = null;
  };

  window.checkCorrectionPassword = function () {
    const input = document.getElementById('pwd-input');
    const errorEl = document.getElementById('pwd-error');
    if (!input) return;

    const entered = input.value.trim();
    if (entered === CORRECTION_PASSWORD) {
      isCorrectionUnlocked = true;
      sessionStorage.setItem(PASSWORD_STORAGE_KEY, 'true');
      updateLockUI();
      window.closePasswordModal();

      if (pendingSolution && pendingSolution.contentId) {
        performAccordionToggle(pendingSolution.contentId, pendingSolution.triggerBtn);
      }
    } else {
      if (errorEl) errorEl.classList.remove('hidden');
      input.classList.add('border-rose-500');
      setTimeout(() => {
        input.classList.remove('border-rose-500');
      }, 500);
    }
  };

  function performAccordionToggle(contentId, triggerBtn) {
    const content = document.getElementById(contentId);
    if (!content) return;

    const isOpen = content.classList.contains('open');
    if (isOpen) {
      content.classList.remove('open');
      if (triggerBtn) {
        triggerBtn.setAttribute('aria-expanded', 'false');
        const arrow = triggerBtn.querySelector('.accordion-arrow');
        if (arrow) arrow.style.transform = 'rotate(0deg)';
      }
    } else {
      content.classList.add('open');
      if (triggerBtn) {
        triggerBtn.setAttribute('aria-expanded', 'true');
        const arrow = triggerBtn.querySelector('.accordion-arrow');
        if (arrow) arrow.style.transform = 'rotate(180deg)';
      }
    }
  }

  window.toggleAccordion = function (contentId, triggerBtn) {
    if (contentId.startsWith('sol-') && !isCorrectionUnlocked) {
      window.openPasswordModal({ contentId, triggerBtn });
      return;
    }
    performAccordionToggle(contentId, triggerBtn);
  };

  // --- Copie du code ---
  window.copySnippet = function (btn, targetCodeId) {
    const codeElement = document.getElementById(targetCodeId);
    if (!codeElement) return;

    const text = codeElement.innerText;
    navigator.clipboard.writeText(text).then(() => {
      const originalText = btn.innerText;
      btn.innerText = '✓ Copié !';
      btn.classList.add('text-emerald-400');
      setTimeout(() => {
        btn.innerText = originalText;
        btn.classList.remove('text-emerald-400');
      }, 2000);
    }).catch(err => {
      console.error('Échec de la copie :', err);
    });
  };

  // --- Filtres ---
  window.filterCategory = function (category, btn) {
    const cards = document.querySelectorAll('.step-card');
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(b => {
      b.classList.remove('active', 'bg-orange-500/20', 'text-orange-300', 'border-orange-500/40');
      b.classList.add('bg-white/5', 'text-gray-400', 'border-white/10');
    });

    if (btn) {
      btn.classList.add('active', 'bg-orange-500/20', 'text-orange-300', 'border-orange-500/40');
      btn.classList.remove('bg-white/5', 'text-gray-400', 'border-white/10');
    }

    cards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      if (category === 'all' || cardCat === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme);
    updateProgressUI();
    updateLockUI();
  });

})();
