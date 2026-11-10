// ============================================================
// Guide Interactif du TP iOS Swift & TDD - Logic & State
// ============================================================

(function () {
  'use strict';

  // --- State & LocalStorage Keys ---
  const STORAGE_KEY = 'cours_ios_tp_progress_v1';
  const THEME_STORAGE_KEY = 'cours_ios_theme';
  const TOTAL_STEPS = 7; // Steps 0 to 6

  let stepProgress = loadProgress();
  let currentTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';

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

  function loadProgress() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Impossible de charger la progression:', e);
    }
    return {
      step0: false,
      step1: false,
      step2: false,
      step3: false,
      step4: false,
      step5: false,
      step6: false
    };
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stepProgress));
    } catch (e) {
      console.warn('Impossible de sauvegarder la progression:', e);
    }
  }

  // --- Progress Updates ---
  function updateProgressUI() {
    const completedCount = Object.values(stepProgress).filter(Boolean).length;
    const percentage = Math.round((completedCount / TOTAL_STEPS) * 100);

    // Update Header Bar
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

    // Sync Checkboxes & Card Classes
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

  // Global handler for checkbox toggles
  window.toggleStep = function (stepKey) {
    stepProgress[stepKey] = !stepProgress[stepKey];
    saveProgress();
    updateProgressUI();
  };

  // Reset progress
  window.resetAllProgress = function () {
    if (confirm('Voulez-vous vraiment réinitialiser votre progression dans le guide ?')) {
      stepProgress = {
        step0: false,
        step1: false,
        step2: false,
        step3: false,
        step4: false,
        step5: false,
        step6: false
      };
      saveProgress();
      updateProgressUI();
    }
  };

  // Mark all completed
  window.completeAllSteps = function () {
    for (let i = 0; i < TOTAL_STEPS; i++) {
      stepProgress[`step${i}`] = true;
    }
    saveProgress();
    updateProgressUI();
  };

  // --- Password Protection for Solutions ---
  const CORRECTION_PASSWORD = 'tutoSwift';
  const PASSWORD_STORAGE_KEY = 'cours_ios_correction_unlocked_v1';
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
      if (confirm('Voulez-vous reverrouiller les solutions du TP ?')) {
        isCorrectionUnlocked = false;
        sessionStorage.removeItem(PASSWORD_STORAGE_KEY);
        // Close all open solutions
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

  // --- Accordion Hint / Solution Toggles ---
  window.toggleAccordion = function (contentId, triggerBtn) {
    // If it's a solution and not unlocked yet, require password!
    if (contentId.startsWith('sol-') && !isCorrectionUnlocked) {
      window.openPasswordModal({ contentId, triggerBtn });
      return;
    }

    performAccordionToggle(contentId, triggerBtn);
  };

  // --- Copy Code to Clipboard ---
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

  // --- Filtering Modules by Category ---
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

  // --- Interactive iPhone Simulator Widget ---
  const guideTasks = [
    { id: '1', title: 'Comprendre SwiftUI', isDone: false, priority: 'Moyenne' },
    { id: '2', title: 'Écrire le premier test', isDone: true, priority: 'Moyenne' },
    { id: '3', title: 'Refactorer proprement', isDone: false, priority: 'Moyenne' }
  ];

  window.toggleGuideTask = function (id) {
    const task = guideTasks.find(t => t.id === id);
    if (task) {
      task.isDone = !task.isDone;
      renderGuideSimulator();
    }
  };

  window.addGuideTask = function () {
    const input = document.getElementById('guide-sim-input');
    if (!input || !input.value.trim()) return;

    guideTasks.push({
      id: Date.now().toString(),
      title: input.value.trim(),
      isDone: false,
      priority: 'Moyenne'
    });

    input.value = '';
    renderGuideSimulator();
  };

  function renderGuideSimulator() {
    const listEl = document.getElementById('guide-sim-tasks');
    const completedEl = document.getElementById('guide-sim-completed');
    const pendingEl = document.getElementById('guide-sim-pending');
    if (!listEl) return;

    const completed = guideTasks.filter(t => t.isDone).length;
    const pending = guideTasks.length - completed;

    if (completedEl) completedEl.innerText = `${completed} terminée(s)`;
    if (pendingEl) pendingEl.innerText = pending === 0 ? 'Tout est fini' : `${pending} en cours`;

    listEl.innerHTML = '';
    guideTasks.forEach(task => {
      const row = document.createElement('div');
      row.className = `p-3 rounded-2xl bg-white border border-gray-100 flex items-center justify-between shadow-sm cursor-pointer transition-all duration-200 hover:scale-[1.01] ${task.isDone ? 'opacity-60' : ''}`;
      row.onclick = () => window.toggleGuideTask(task.id);

      row.innerHTML = `
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 rounded-full ${task.isDone ? 'bg-emerald-500' : 'bg-orange-400'}"></div>
          <div>
            <div class="text-xs font-semibold text-gray-900 ${task.isDone ? 'line-through text-gray-400' : ''}">${escapeHtml(task.title)}</div>
            <div class="text-[10px] text-gray-500">${task.priority}</div>
          </div>
        </div>
        <div>
          ${task.isDone 
            ? `<span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">✓</span>`
            : `<button class="text-xs font-semibold text-blue-600 hover:underline">Terminer</button>`}
        </div>
      `;
      listEl.appendChild(row);
    });
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // --- Initial Setup on DOMContentLoaded ---
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme);
    updateProgressUI();
    updateLockUI();
    renderGuideSimulator();
  });

})();
