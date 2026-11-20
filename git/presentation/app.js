// ============================================================
// Diaporama Git - Navigation, thème, quiz et générateur de commit
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const totalSlides = slides.length;
  let currentIndex = 0;

  const progressBar = document.getElementById('progress-bar');
  const slideCounter = document.getElementById('slide-counter');
  const THEME_STORAGE_KEY = 'cours_ios_theme';
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

  window.toggleTheme = function () {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  function showSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    currentIndex = index;

    if (progressBar) {
      const percentage = ((index + 1) / totalSlides) * 100;
      progressBar.style.width = `${percentage}%`;
    }
    if (slideCounter) {
      slideCounter.innerText = `${index + 1} / ${totalSlides}`;
    }

    window.location.hash = `slide-${index + 1}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.nextSlide = function () {
    showSlide(currentIndex + 1);
  };

  window.prevSlide = function () {
    showSlide(currentIndex - 1);
  };

  window.goToSlide = function (index) {
    showSlide(index);
  };

  document.addEventListener('keydown', (event) => {
    const tag = (event.target.tagName || '').toLowerCase();
    const isTyping = tag === 'input' || tag === 'textarea' || tag === 'select' || event.target.isContentEditable;
    if (isTyping) return;

    if (event.key === ' ' && (tag === 'button' || tag === 'a')) return;

    if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
      event.preventDefault();
      window.nextSlide();
    } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
      event.preventDefault();
      window.prevSlide();
    } else if (event.key === 'Home') {
      window.goToSlide(0);
    } else if (event.key === 'End') {
      window.goToSlide(totalSlides - 1);
    }
  });

  // --- Quiz ---
  window.answerQuiz = function (button, isCorrect) {
    const container = button.closest('.quiz-block');
    if (!container) return;

    container.querySelectorAll('.quiz-option').forEach(option => {
      option.classList.remove('correct', 'incorrect');
    });

    button.classList.add(isCorrect ? 'correct' : 'incorrect');

    const feedback = container.querySelector('.quiz-feedback');
    if (feedback) {
      feedback.classList.remove('hidden');
      if (isCorrect) {
        feedback.innerText = '✅ Bonne réponse !';
        feedback.className = 'quiz-feedback mt-3 text-xs font-semibold text-emerald-400';
      } else {
        feedback.innerText = '❌ Pas tout à fait. Relisez la diapositive correspondante.';
        feedback.className = 'quiz-feedback mt-3 text-xs font-semibold text-rose-400';
      }
    }
  };

  // --- Générateur de message de commit conventionnel ---
  function buildCommitMessage() {
    const typeEl = document.getElementById('cb-type');
    const scopeEl = document.getElementById('cb-scope');
    const descEl = document.getElementById('cb-desc');
    const breakingEl = document.getElementById('cb-breaking');
    const bodyEl = document.getElementById('cb-body');
    const breakingTextEl = document.getElementById('cb-breaking-text');
    const output = document.getElementById('cb-output');
    if (!typeEl || !scopeEl || !descEl || !output) return;

    const type = typeEl.value;
    const scope = scopeEl.value.trim();
    const desc = descEl.value.trim();
    const breaking = breakingEl ? breakingEl.checked : false;
    const body = bodyEl ? bodyEl.value.trim() : '';
    const breakingText = breakingTextEl ? breakingTextEl.value.trim() : '';

    if (!desc) {
      output.textContent = `${type}${scope ? `(${scope})` : ''}${breaking ? '!' : ''}: <description>`;
      return;
    }

    let message = `${type}${scope ? `(${scope})` : ''}${breaking ? '!' : ''}: ${desc}`;

    if (body) {
      message += `\n\n${body}`;
    }

    if (breaking) {
      message += `\n\nBREAKING CHANGE: ${breakingText || 'décrivez ce qui casse la compatibilité'}`;
    }

    output.textContent = message;
  }

  window.buildCommitMessage = buildCommitMessage;

  window.copyCommitMessage = async function () {
    const output = document.getElementById('cb-output');
    const button = document.getElementById('cb-copy');
    if (!output || !button) return;

    try {
      await navigator.clipboard.writeText(output.textContent);
      const original = button.innerText;
      button.innerText = '✅ Copié';
      setTimeout(() => { button.innerText = original; }, 1600);
    } catch (error) {
      button.innerText = '⚠️ Copie manuelle';
      setTimeout(() => { button.innerText = 'Copier'; }, 1600);
    }
  };

  window.resetCommitBuilder = function () {
    const typeEl = document.getElementById('cb-type');
    const scopeEl = document.getElementById('cb-scope');
    const descEl = document.getElementById('cb-desc');
    const breakingEl = document.getElementById('cb-breaking');
    const bodyEl = document.getElementById('cb-body');
    const breakingTextEl = document.getElementById('cb-breaking-text');
    if (typeEl) typeEl.value = 'feat';
    if (scopeEl) scopeEl.value = '';
    if (descEl) descEl.value = '';
    if (breakingEl) breakingEl.checked = false;
    if (bodyEl) bodyEl.value = '';
    if (breakingTextEl) breakingTextEl.value = '';
    buildCommitMessage();
  };

  // --- Initialisation ---
  applyTheme(currentTheme);
  buildCommitMessage();

  const hashMatch = window.location.hash.match(/#slide-(\d+)/);
  if (hashMatch) {
    const requested = parseInt(hashMatch[1], 10) - 1;
    if (requested >= 0 && requested < totalSlides) {
      showSlide(requested);
      return;
    }
  }

  showSlide(0);
});
