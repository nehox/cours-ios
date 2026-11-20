// ============================================================
// Diaporama Firebase Auth - Navigation, thème, quiz et démo
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
        feedback.innerText = '❌ Pas tout à fait. Relisez l\'étape correspondante du guide.';
        feedback.className = 'quiz-feedback mt-3 text-xs font-semibold text-rose-400';
      }
    }
  };

  // --- Démo visuelle d'authentification ---
  window.demoSignIn = function () {
    const emailInput = document.getElementById('demo-email');
    const passwordInput = document.getElementById('demo-password');
    const result = document.getElementById('demo-result');
    if (!emailInput || !passwordInput || !result) return;

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    result.classList.remove('hidden');

    if (!email || !password) {
      result.className = 'demo-result mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200';
      result.innerText = '⚠️ Renseignez un email et un mot de passe pour simuler la connexion.';
      return;
    }

    if (!email.includes('@')) {
      result.className = 'demo-result mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200';
      result.innerText = '⚠️ L\'adresse email doit contenir un @.';
      return;
    }

    if (password.length < 6) {
      result.className = 'demo-result mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200';
      result.innerText = '⚠️ Firebase exige un mot de passe d\'au moins 6 caractères.';
      return;
    }

    result.className = 'demo-result mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200';
    result.innerText = `✅ Démo visuelle : connexion simulée pour ${email}. Dans l\'app, Firebase créerait ou connecterait réellement ce compte.`;
  };

  // --- Initialisation ---
  applyTheme(currentTheme);

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
