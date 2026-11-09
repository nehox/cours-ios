/**
 * Cours iOS & Swift - Présentation Interactive Haute Performance
 * Navigation, Simulateurs, Quiz & Outils Pédagogiques
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Navigation & State ---
  const slides = Array.from(document.querySelectorAll('.slide'));
  const totalSlides = slides.length;
  let currentIndex = 0;
  
  const progressBar = document.getElementById('progress-bar');
  const slideCounter = document.getElementById('slide-counter');
  const overviewModal = document.getElementById('overview-modal');
  const overviewGrid = document.getElementById('overview-grid');
  const helpModal = document.getElementById('help-modal');

  // Load initial slide from URL hash if available
  const hashMatch = window.location.hash.match(/#slide-(\d+)/);
  if (hashMatch) {
    const requestedSlide = parseInt(hashMatch[1], 10) - 1;
    if (requestedSlide >= 0 && requestedSlide < totalSlides) {
      currentIndex = requestedSlide;
    }
  }

  function updateSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });

    currentIndex = index;
    window.location.hash = `slide-${index + 1}`;

    // Update Progress Bar
    const progressPercent = ((index + 1) / totalSlides) * 100;
    if (progressBar) progressBar.style.width = `${progressPercent}%`;
    if (slideCounter) slideCounter.innerText = `${index + 1} / ${totalSlides}`;

    // Update active state in overview if opened
    document.querySelectorAll('.overview-card').forEach((card, i) => {
      card.classList.toggle('current', i === index);
    });
  }

  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      updateSlide(currentIndex + 1);
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      updateSlide(currentIndex - 1);
    }
  }

  // --- Keyboard Shortcuts ---
  window.addEventListener('keydown', (e) => {
    // Avoid triggering when user is typing in an input
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ':
      case 'PageDown':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        prevSlide();
        break;
      case 'f':
      case 'F':
        toggleFullscreen();
        break;
      case 'o':
      case 'O':
        toggleOverview();
        break;
      case 't':
      case 'T':
        toggleTimer();
        break;
      case '?':
      case 'h':
      case 'H':
        toggleHelp();
        break;
      case 'Escape':
        if (overviewModal && overviewModal.classList.contains('active')) toggleOverview();
        if (helpModal && helpModal.classList.contains('active')) toggleHelp();
        break;
    }
  });

  // UI buttons
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const overviewBtn = document.getElementById('overview-btn');
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  const helpBtn = document.getElementById('help-btn');

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (overviewBtn) overviewBtn.addEventListener('click', toggleOverview);
  if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);
  if (helpBtn) helpBtn.addEventListener('click', toggleHelp);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  function toggleOverview() {
    if (!overviewModal) return;
    const isActive = overviewModal.classList.contains('active');
    if (!isActive) {
      populateOverviewGrid();
      overviewModal.classList.add('active');
    } else {
      overviewModal.classList.remove('active');
    }
  }

  function toggleHelp() {
    if (!helpModal) return;
    helpModal.classList.toggle('active');
  }

  // Close modals on overlay click
  if (overviewModal) {
    overviewModal.addEventListener('click', (e) => {
      if (e.target === overviewModal) toggleOverview();
    });
  }
  if (helpModal) {
    helpModal.addEventListener('click', (e) => {
      if (e.target === helpModal) toggleHelp();
    });
  }

  function populateOverviewGrid() {
    if (!overviewGrid) return;
    overviewGrid.innerHTML = '';
    slides.forEach((slide, i) => {
      const title = slide.querySelector('h1, h2')?.innerText || `Slide ${i + 1}`;
      const subtitle = slide.querySelector('.act-badge')?.innerText || `Partie ${Math.floor(i / 3) + 1}`;
      
      const card = document.createElement('div');
      card.className = `overview-card ${i === currentIndex ? 'current' : ''}`;
      card.innerHTML = `
        <div>
          <span class="text-xs font-semibold uppercase tracking-wider text-orange-400 opacity-80">${subtitle}</span>
          <h3 class="text-base font-bold mt-1 text-white line-clamp-2">${title}</h3>
        </div>
        <div class="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-white/10">
          <span>Diapositive</span>
          <span class="font-mono bg-white/10 px-2 py-0.5 rounded text-white">${i + 1} / ${totalSlides}</span>
        </div>
      `;
      card.addEventListener('click', () => {
        updateSlide(i);
        toggleOverview();
      });
      overviewGrid.appendChild(card);
    });
  }

  // --- Presenter Timer ---
  let timerInterval = null;
  let secondsElapsed = 0;
  let timerRunning = false;
  const timerDisplay = document.getElementById('timer-display');
  const timerToggleBtn = document.getElementById('timer-toggle');
  const timerResetBtn = document.getElementById('timer-reset');

  function updateTimerText() {
    const mins = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
    const secs = (secondsElapsed % 60).toString().padStart(2, '0');
    if (timerDisplay) timerDisplay.innerText = `${mins}:${secs}`;
  }

  function toggleTimer() {
    if (timerRunning) {
      clearInterval(timerInterval);
      timerRunning = false;
      if (timerToggleBtn) timerToggleBtn.innerHTML = '▶';
    } else {
      timerInterval = setInterval(() => {
        secondsElapsed++;
        updateTimerText();
      }, 1000);
      timerRunning = true;
      if (timerToggleBtn) timerToggleBtn.innerHTML = '⏸';
    }
  }

  if (timerToggleBtn) timerToggleBtn.addEventListener('click', toggleTimer);
  if (timerResetBtn) timerResetBtn.addEventListener('click', () => {
    secondsElapsed = 0;
    updateTimerText();
  });

  // --- Copy Code to Clipboard ---
  document.querySelectorAll('.copy-code-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const codeBlock = btn.closest('.code-container').querySelector('code');
      if (codeBlock) {
        navigator.clipboard.writeText(codeBlock.innerText).then(() => {
          const originalText = btn.innerHTML;
          btn.innerHTML = `<span class="text-emerald-400 text-xs flex items-center gap-1">✓ Copié !</span>`;
          setTimeout(() => btn.innerHTML = originalText, 2000);
        });
      }
    });
  });

  // --- Interactive Widget 1: Visualiseur d'Optionnels ("La Boîte") ---
  const optBox = document.getElementById('optional-box');
  const optValueText = document.getElementById('optional-value-text');
  const optStateBadge = document.getElementById('optional-state-badge');
  const optIfLetOutput = document.getElementById('opt-iflet-output');
  const optGuardOutput = document.getElementById('opt-guard-output');
  const optNilCoalOutput = document.getElementById('opt-nilcoal-output');
  const optCrashOutput = document.getElementById('opt-crash-output');

  window.setOptionalMode = function(hasValue) {
    const valBtn = document.getElementById('btn-opt-val');
    const nilBtn = document.getElementById('btn-opt-nil');

    if (hasValue) {
      if (valBtn) valBtn.className = "px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-500/10 transition";
      if (nilBtn) nilBtn.className = "px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 transition";
      
      if (optBox) {
        optBox.className = "w-36 h-36 rounded-2xl border-2 border-emerald-400 bg-emerald-500/10 flex flex-col items-center justify-center p-4 transition-all duration-300 shadow-xl shadow-emerald-500/20";
      }
      if (optValueText) optValueText.innerHTML = `📦 <div class="mt-1 font-mono text-xs font-bold text-emerald-300">"Swift 5.10"</div>`;
      if (optStateBadge) optStateBadge.innerHTML = `<span class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">.some("Swift 5.10")</span>`;

      if (optIfLetOutput) optIfLetOutput.innerHTML = `<span class="text-emerald-400 font-bold">✓ Exécuté :</span> "Le titre est Swift 5.10"`;
      if (optGuardOutput) optGuardOutput.innerHTML = `<span class="text-emerald-400 font-bold">✓ Passe le garde :</span> continue avec "Swift 5.10"`;
      if (optNilCoalOutput) optNilCoalOutput.innerHTML = `"Swift 5.10" <span class="text-gray-400">(valeur déballée)</span>`;
      if (optCrashOutput) optCrashOutput.innerHTML = `<span class="text-emerald-400">"Swift 5.10" (OK mais risqué)</span>`;
    } else {
      if (valBtn) valBtn.className = "px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 transition";
      if (nilBtn) nilBtn.className = "px-4 py-2 rounded-xl text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-lg shadow-rose-500/10 transition";

      if (optBox) {
        optBox.className = "w-36 h-36 rounded-2xl border-2 border-dashed border-rose-400/60 bg-rose-500/10 flex flex-col items-center justify-center p-4 transition-all duration-300 shadow-xl shadow-rose-500/10";
      }
      if (optValueText) optValueText.innerHTML = `📭 <div class="mt-1 font-mono text-xs font-bold text-rose-300">nil (Vide)</div>`;
      if (optStateBadge) optStateBadge.innerHTML = `<span class="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">.none (nil)</span>`;

      if (optIfLetOutput) optIfLetOutput.innerHTML = `<span class="text-amber-400 font-bold">↷ Ignoré :</span> passe dans le bloc else`;
      if (optGuardOutput) optGuardOutput.innerHTML = `<span class="text-rose-400 font-bold">⛔ Bloqué :</span> déclenche le <code class="text-rose-300">return nil</code> immédiatement !`;
      if (optNilCoalOutput) optNilCoalOutput.innerHTML = `<span class="text-blue-400 font-bold">"Sans titre"</span> <span class="text-gray-400">(fallback sécurisé)</span>`;
      if (optCrashOutput) optCrashOutput.innerHTML = `<span class="text-rose-400 font-bold font-mono">💥 Fatal error: Unexpectedly found nil while unwrapping an Optional value</span>`;
    }
  };

  // --- Interactive Widget 2: Simulateur SwiftUI iPhone 15 ---
  let simulatorTasks = [
    { id: 1, title: "Corriger l'erreur de compilation", priority: "Haute", isDone: true },
    { id: 2, title: "Comprendre struct vs class", priority: "Moyenne", isDone: true },
    { id: 3, title: "Sécuriser les Optionnels", priority: "Haute", isDone: false },
    { id: 4, title: "Créer le HomeScreenViewModel", priority: "Normal", isDone: false }
  ];

  function renderSimulator() {
    const listEl = document.getElementById('sim-tasks-list');
    const completedCountEl = document.getElementById('sim-completed-count');
    const pendingCountEl = document.getElementById('sim-pending-count');
    const allDoneBanner = document.getElementById('sim-alldone-banner');

    if (!listEl) return;

    const completed = simulatorTasks.filter(t => t.isDone).length;
    const pending = simulatorTasks.length - completed;

    if (completedCountEl) completedCountEl.innerText = `${completed} terminée(s)`;
    if (pendingCountEl) pendingCountEl.innerText = pending === 0 ? "Tout est fini !" : `${pending} en cours`;

    if (allDoneBanner) {
      allDoneBanner.style.display = pending === 0 ? 'block' : 'none';
    }

    listEl.innerHTML = '';
    simulatorTasks.forEach(task => {
      const taskRow = document.createElement('div');
      taskRow.className = `p-3 rounded-xl bg-white border border-gray-100 flex items-center justify-between shadow-sm cursor-pointer transition-all duration-200 hover:scale-[1.02] ${task.isDone ? 'opacity-70' : ''}`;
      taskRow.innerHTML = `
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 rounded-full ${task.isDone ? 'bg-emerald-500' : 'bg-orange-400'}"></div>
          <div>
            <div class="text-xs font-semibold text-gray-900 ${task.isDone ? 'line-through text-gray-400' : ''}">${task.title}</div>
            <div class="text-[10px] text-gray-500">Priorité ${task.priority}</div>
          </div>
        </div>
        <div>
          ${task.isDone 
            ? `<span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">✓</span>` 
            : `<span class="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center"></span>`}
        </div>
      `;
      taskRow.addEventListener('click', () => {
        task.isDone = !task.isDone;
        renderSimulator();
      });
      listEl.appendChild(taskRow);
    });
  }

  window.toggleSimTask = function(id) {
    const task = simulatorTasks.find(t => t.id === id);
    if (task) {
      task.isDone = !task.isDone;
      renderSimulator();
    }
  };

  window.addSimTask = function() {
    const input = document.getElementById('sim-new-task-input');
    if (!input || !input.value.trim()) return;
    simulatorTasks.push({
      id: Date.now(),
      title: input.value.trim(),
      priority: "Normal",
      isDone: false
    });
    input.value = '';
    renderSimulator();
  };

  // --- Interactive Widget 3: Struct vs Class Memory Visualizer ---
  window.setMemoryDemo = function(type) {
    const structBtn = document.getElementById('btn-mem-struct');
    const classBtn = document.getElementById('btn-mem-class');
    const memTitle = document.getElementById('mem-demo-title');
    const memDesc = document.getElementById('mem-demo-desc');
    const memBoxA = document.getElementById('mem-box-a');
    const memBoxB = document.getElementById('mem-box-b');
    const memPointer = document.getElementById('mem-pointer-graphic');

    if (type === 'struct') {
      if (structBtn) structBtn.className = "px-4 py-2 rounded-xl text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40 shadow-lg shadow-orange-500/10";
      if (classBtn) classBtn.className = "px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10";

      if (memTitle) memTitle.innerHTML = `<span class="text-orange-400 font-bold">Struct (Value Type)</span> : Copie intégrale indépendante`;
      if (memDesc) memDesc.innerText = `Modifier 'b' ne touche JAMAIS 'a'. Chaque variable possède sa propre boîte en mémoire (Stack).`;

      if (memBoxA) memBoxA.innerHTML = `
        <div class="text-[11px] text-gray-400 font-mono">variable a</div>
        <div class="text-sm font-bold text-white mt-1">title = <span class="text-orange-300">"Tâche A"</span></div>
        <div class="text-[10px] text-emerald-400 mt-1">Adresse : 0xStack01</div>
      `;
      if (memBoxB) memBoxB.innerHTML = `
        <div class="text-[11px] text-gray-400 font-mono">variable b (copie)</div>
        <div class="text-sm font-bold text-white mt-1">title = <span class="text-emerald-300">"Tâche Modifiée"</span></div>
        <div class="text-[10px] text-emerald-400 mt-1">Adresse : 0xStack02 (Indépendant)</div>
      `;
      if (memPointer) memPointer.style.display = 'none';
    } else {
      if (structBtn) structBtn.className = "px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10";
      if (classBtn) classBtn.className = "px-4 py-2 rounded-xl text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/40 shadow-lg shadow-blue-500/10";

      if (memTitle) memTitle.innerHTML = `<span class="text-blue-400 font-bold">Class (Reference Type)</span> : Partage de la même instance !`;
      if (memDesc) memDesc.innerText = `'a' et 'b' pointent vers la MÊME zone mémoire (Heap). Modifier 'b' modifie aussi 'a' ! Risque d'effets de bord imprévus.`;

      if (memBoxA) memBoxA.innerHTML = `
        <div class="text-[11px] text-gray-400 font-mono">variable a (Pointeur)</div>
        <div class="text-sm font-bold text-white mt-1">Pointe vers -> <span class="text-blue-300">0xHeap99</span></div>
        <div class="text-[10px] text-amber-400 mt-1">Valeur vue : "Tâche Modifiée"</div>
      `;
      if (memBoxB) memBoxB.innerHTML = `
        <div class="text-[11px] text-gray-400 font-mono">variable b (Pointeur)</div>
        <div class="text-sm font-bold text-white mt-1">Pointe vers -> <span class="text-blue-300">0xHeap99</span></div>
        <div class="text-[10px] text-emerald-400 mt-1">Valeur modifiée : "Tâche Modifiée"</div>
      `;
      if (memPointer) memPointer.style.display = 'flex';
    }
  };

  // --- Interactive Widget 4: Quiz Engine ---
  window.checkQuiz = function(button, isCorrect, explanationId) {
    const parentContainer = button.closest('.quiz-options');
    const allButtons = parentContainer.querySelectorAll('button');
    allButtons.forEach(b => {
      b.disabled = true;
      b.classList.add('opacity-50');
    });

    button.classList.remove('opacity-50');
    const explEl = document.getElementById(explanationId);

    if (isCorrect) {
      button.classList.add('bg-emerald-500/30', 'border-emerald-500', 'text-emerald-300');
      button.innerHTML += ' <span class="ml-2 font-bold">✓ Bravo !</span>';
      if (explEl) {
        explEl.classList.remove('hidden');
        explEl.classList.add('border-emerald-500/40', 'bg-emerald-500/10');
      }
    } else {
      button.classList.add('bg-rose-500/30', 'border-rose-500', 'text-rose-300', 'animate-shake');
      button.innerHTML += ' <span class="ml-2 font-bold">✗ Raté</span>';
      if (explEl) {
        explEl.classList.remove('hidden');
        explEl.classList.add('border-rose-500/40', 'bg-rose-500/10');
      }
    }
  };

  // --- Interactive Widget 5: Xcode Architecture Explorer ---
  window.selectXcodeZone = function(zoneName) {
    const zones = {
      navigator: {
        title: "1. Project Navigator (Volet Gauche)",
        desc: "L'arborescence de vos fichiers Swift, Assets graphiques, Configs (.plist) et Tests unitaires. Raccourci clé : Cmd+1 pour l'afficher.",
        badge: "Cmd + 1"
      },
      editor: {
        title: "2. Code Editor (Centre)",
        desc: "L'éditeur Swift intelligent avec autocomplétion, vérification des types en direct et aides visuelles Apple.",
        badge: "Cmd + Return"
      },
      canvas: {
        title: "3. SwiftUI Preview Canvas (Droite)",
        desc: "Le simulateur interactif instantané. Toute modification dans votre View SwiftUI se répercute instantanément sans recompiler l'app entière !",
        badge: "Cmd + Option + Return"
      },
      inspector: {
        title: "4. Utilities & Inspector (Extrême Droite)",
        desc: "Inspecteur d'attributs visuels, typographie, couleurs, accessibilité et localisation.",
        badge: "Cmd + Option + 0"
      },
      debugger: {
        title: "5. Console & Debugger (Bas)",
        desc: "Sortie des logs `print()`, arrêt sur point d'arrêt (breakpoints) et console LLDB pour inspecter vos variables.",
        badge: "Cmd + Shift + Y"
      }
    };

    const target = zones[zoneName];
    if (!target) return;

    const titleEl = document.getElementById('xcode-zone-title');
    const descEl = document.getElementById('xcode-zone-desc');
    const badgeEl = document.getElementById('xcode-zone-badge');

    if (titleEl) titleEl.innerText = target.title;
    if (descEl) descEl.innerText = target.desc;
    if (badgeEl) badgeEl.innerText = target.badge;

    // Highlight button
    document.querySelectorAll('.xcode-zone-btn').forEach(btn => {
      btn.classList.toggle('border-blue-500', btn.dataset.zone === zoneName);
      btn.classList.toggle('bg-blue-500/20', btn.dataset.zone === zoneName);
    });
  };

  // Initial call
  updateSlide(currentIndex);
  renderSimulator();
});
