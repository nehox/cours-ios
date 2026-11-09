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

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      if (document.documentElement && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
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

  function toggleStorybook() {
    const sbModal = document.getElementById('storybook-modal');
    if (!sbModal) return;
    const isActive = sbModal.classList.contains('active');
    if (!isActive) {
      sbModal.classList.add('active');
      renderStorybook();
    } else {
      sbModal.classList.remove('active');
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
      case 's':
      case 'S':
        toggleStorybook();
        break;
      case '?':
      case 'h':
      case 'H':
        toggleHelp();
        break;
      case 'Escape':
        if (overviewModal && overviewModal.classList.contains('active')) toggleOverview();
        if (helpModal && helpModal.classList.contains('active')) toggleHelp();
        const sbModal = document.getElementById('storybook-modal');
        if (sbModal && sbModal.classList.contains('active')) toggleStorybook();
        break;
    }
  });

  // UI buttons
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const overviewBtn = document.getElementById('overview-btn');
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  const helpBtn = document.getElementById('help-btn');
  const storybookBtn = document.getElementById('storybook-header-btn');

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (overviewBtn) overviewBtn.addEventListener('click', toggleOverview);
  if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);
  if (helpBtn) helpBtn.addEventListener('click', toggleHelp);
  if (storybookBtn) storybookBtn.addEventListener('click', toggleStorybook);

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
      const codeBlock = btn.closest('.code-container')?.querySelector('code');
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

  function setOptionalMode(hasValue) {
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
  }

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

  function toggleSimTask(id) {
    const task = simulatorTasks.find(t => t.id === id);
    if (task) {
      task.isDone = !task.isDone;
      renderSimulator();
    }
  }

  function addSimTask() {
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
  }

  // --- Interactive Widget 3: Struct vs Class Memory Visualizer ---
  function setMemoryDemo(type) {
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
  }

  // --- Interactive Widget 4: Quiz Engine ---
  function checkQuiz(button, isCorrect, explanationId) {
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
  }

  // --- Interactive Widget 5: Xcode Architecture Explorer ---
  function selectXcodeZone(zoneName) {
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
  }

  // --- Interactive Widget 5.5: Dependency Injection Switcher (Prod vs Mock) ---
  function setDiMode(mode) {
    const btnReal = document.getElementById('di-btn-real');
    const btnMock = document.getElementById('di-btn-mock');
    const diSourceBadge = document.getElementById('di-source-badge');
    const diCodeSnippet = document.getElementById('di-code-snippet');
    const diVmOutput = document.getElementById('di-vm-output');
    const diTimeOutput = document.getElementById('di-time-output');
    const diDesc = document.getElementById('di-mode-desc');

    if (mode === 'real') {
      if (btnReal) btnReal.className = "px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-lg shadow-blue-500/10";
      if (btnMock) btnMock.className = "px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 transition";
      if (diSourceBadge) diSourceBadge.innerHTML = `<span class="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">🏢 Production (TaskStore)</span>`;
      if (diCodeSnippet) diCodeSnippet.innerText = `// Dans CoursProductiviteApp.swift (En vrai)\nlet store = TaskStore() // Écrit sur disque\nlet viewModel = Lesson04ViewModel(provider: store)`;
      if (diVmOutput) diVmOutput.innerHTML = `<span class="text-blue-400 font-bold">"4 tâche(s)"</span> (chargées depuis la base locale)`;
      if (diTimeOutput) diTimeOutput.innerHTML = `<span class="text-amber-400 font-mono">~45 ms</span> (I/O disque)`;
      if (diDesc) diDesc.innerText = "L'application lit le disque dur ou le stockage local pour récupérer les vraies tâches de l'utilisateur.";
    } else {
      if (btnReal) btnReal.className = "px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 transition";
      if (btnMock) btnMock.className = "px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-500/10";
      if (diSourceBadge) diSourceBadge.innerHTML = `<span class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">🧪 Test Unitaire (MockProvider)</span>`;
      if (diCodeSnippet) diCodeSnippet.innerText = `// Dans LessonTests.swift (En test unitaire)\nlet mock = Lesson03MockProvider(tasks: []) // RAM\nlet viewModel = Lesson04ViewModel(provider: mock)`;
      if (diVmOutput) diVmOutput.innerHTML = `<span class="text-emerald-400 font-bold">"Aucune tâche"</span> (données factices en RAM)`;
      if (diTimeOutput) diTimeOutput.innerHTML = `<span class="text-emerald-400 font-mono">0.001 ms</span> (instantané en mémoire !)`;
      if (diDesc) diDesc.innerText = "Le test injecte une liste vide en mémoire. Zéro écriture sur disque, aucun risque de corrompre les données réelles !";
    }

    if (window.Prism && diCodeSnippet) {
      Prism.highlightElement(diCodeSnippet);
    }
  }

  // --- Interactive Widget 6: SwiftUI Stacks Switcher (VStack, HStack, ZStack) ---
  function setStackMode(mode) {
    const stage = document.getElementById('stacks-demo-stage');
    const codeEl = document.getElementById('stacks-code-snippet');
    const titleEl = document.getElementById('stacks-demo-title');
    const descEl = document.getElementById('stacks-demo-desc');

    const btnV = document.getElementById('btn-stack-v');
    const btnH = document.getElementById('btn-stack-h');
    const btnZ = document.getElementById('btn-stack-z');

    [btnV, btnH, btnZ].forEach(b => {
      if (b) b.className = "px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 transition";
    });

    if (stage) {
      stage.classList.remove('is-vstack', 'is-hstack', 'is-zstack');
      stage.classList.add(`is-${mode}`);
    }

    if (mode === 'vstack') {
      if (btnV) btnV.className = "px-3.5 py-1.5 rounded-xl text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-lg shadow-orange-500/10";
      if (titleEl) titleEl.innerText = "VStack (Vertical Stack • Colonne)";
      if (descEl) descEl.innerText = "Empile les composants de haut en bas sur l'axe vertical Y. Idéal pour structurer les formulaires, écrans et listes.";
      if (codeEl) {
        codeEl.innerHTML = `VStack(alignment: .leading, spacing: 12) {\n    Text("Titre de la tâche")\n        .font(.headline)\n    Text("Priorité Haute")\n        .font(.subheadline)\n        .foregroundStyle(.secondary)\n    Button("Marquer comme fait") { ... }\n}`;
      }
    } else if (mode === 'hstack') {
      if (btnH) btnH.className = "px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-lg shadow-blue-500/10";
      if (titleEl) titleEl.innerText = "HStack (Horizontal Stack • Ligne)";
      if (descEl) descEl.innerText = "Aligne les composants de gauche à droite sur l'axe horizontal X. Parfait pour les barres de statut, boutons avec icônes et cartes résumées.";
      if (codeEl) {
        codeEl.innerHTML = `HStack(spacing: 12) {\n    Image(systemName: "flag.fill")\n        .foregroundStyle(.orange)\n    Text("Tâche prioritaire")\n    Spacer()\n    Image(systemName: "checkmark.circle")\n}`;
      }
    } else if (mode === 'zstack') {
      if (btnZ) btnZ.className = "px-3.5 py-1.5 rounded-xl text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-lg shadow-purple-500/10";
      if (titleEl) titleEl.innerText = "ZStack (Depth Stack • Superposition)";
      if (descEl) descEl.innerText = "Superpose les composants d'arrière en avant sur l'axe de profondeur Z. Idéal pour ajouter un fond dégradé sous un contenu ou des badges de notification.";
      if (codeEl) {
        codeEl.innerHTML = `ZStack {\n    RoundedRectangle(cornerRadius: 16)\n        .fill(.ultraThinMaterial)\n    VStack {\n        Text("Contenu flottant")\n    }\n}`;
      }
    }

    if (window.Prism && codeEl) {
      Prism.highlightElement(codeEl);
    }
  }

  // --- Interactive Widget 7: SwiftUI Storybook Engine ---
  const storybookComponents = {
    vstack: {
      name: "VStack (Colonne)",
      category: "Layout",
      description: "Conteneur vertical avec alignement et espacement paramétrables.",
      defaultProps: { spacing: 12, alignment: 'leading', padding: 16, cornerRadius: 16 }
    },
    hstack: {
      name: "HStack (Ligne)",
      category: "Layout",
      description: "Conteneur horizontal idéal pour les rangées et les barres d'outils avec Spacer().",
      defaultProps: { spacing: 12, alignment: 'center', padding: 16, cornerRadius: 16 }
    },
    zstack: {
      name: "ZStack (Superposition)",
      category: "Layout",
      description: "Superposition de couches sur l'axe Z (fond, carte, badge flottant).",
      defaultProps: { padding: 16, cornerRadius: 16 }
    },
    text: {
      name: "Text & Hiérarchie",
      category: "Typography",
      description: "Textes typographiques Apple avec styles sémantiques (.largeTitle, .headline, .subheadline).",
      defaultProps: { spacing: 6, alignment: 'leading', padding: 16, cornerRadius: 16 }
    },
    label: {
      name: "Label & SF Symbols",
      category: "Typography",
      description: "Association harmonieuse d'un titre et d'une icône vectorielle SF Symbol.",
      defaultProps: { spacing: 8, padding: 12, cornerRadius: 12, icon: 'checkmark.seal.fill' }
    },
    button: {
      name: "Button & Styles",
      category: "Controls",
      description: "Bouton SwiftUI moderne avec modificateurs .buttonStyle(.borderedProminent).",
      defaultProps: { padding: 14, cornerRadius: 12, buttonVariant: 'prominent' }
    },
    taskrow: {
      name: "TaskRow (TP)",
      category: "CoursProductivite",
      description: "Ligne de tâche interactive du cours avec puce de priorité et indicateur d'état.",
      defaultProps: { isDone: false, priority: "Haute", padding: 14, cornerRadius: 16 }
    },
    summarycard: {
      name: "SummaryCard (TP)",
      category: "CoursProductivite",
      description: "Carte récapitulative de productivité affichant le total complété et restant.",
      defaultProps: { completed: 3, pending: 1, padding: 18, cornerRadius: 20 }
    }
  };

  let currentSbComponent = 'vstack';
  let sbProps = { ...storybookComponents['vstack'].defaultProps };
  let sbDarkMode = true;

  function selectStorybookComponent(compKey) {
    if (!storybookComponents[compKey]) return;
    currentSbComponent = compKey;
    sbProps = { ...storybookComponents[compKey].defaultProps };
    
    // Update sidebar UI
    document.querySelectorAll('.storybook-sidebar-item').forEach(el => {
      el.classList.toggle('active', el.dataset.component === compKey);
    });

    renderStorybook();
  }

  function toggleSbDarkMode() {
    sbDarkMode = !sbDarkMode;
    renderStorybook();
  }

  function updateSbProp(propKey, value) {
    sbProps[propKey] = value;
    renderStorybook();
  }

  function renderStorybook() {
    const comp = storybookComponents[currentSbComponent];
    if (!comp) return;

    // Render Preview Surface
    const surfaces = [document.getElementById('sb-preview-surface'), document.getElementById('sb-slide-preview-surface')];
    const codeBlocks = [document.getElementById('sb-code-output'), document.getElementById('sb-slide-code-output')];
    const titleEls = [document.getElementById('sb-component-title'), document.getElementById('sb-slide-component-title')];
    const descEls = [document.getElementById('sb-component-desc'), document.getElementById('sb-slide-component-desc')];

    titleEls.forEach(el => { if (el) el.innerText = comp.name; });
    descEls.forEach(el => { if (el) el.innerText = comp.description; });

    surfaces.forEach(surface => {
      if (!surface) return;
      surface.className = `storybook-preview-surface ${sbDarkMode ? 'dark-mode' : 'light-mode'}`;
      surface.innerHTML = generateComponentHTML(currentSbComponent, sbProps, sbDarkMode);
    });

    const swiftCode = generateSwiftCode(currentSbComponent, sbProps);
    codeBlocks.forEach(block => {
      if (!block) return;
      block.innerText = swiftCode;
      if (window.Prism) Prism.highlightElement(block);
    });

    // Update Controls Panel
    updateControlsUI();
  }

  function generateComponentHTML(key, props, isDark) {
    const cardBg = isDark ? 'rgba(255,255,255,0.06)' : '#ffffff';
    const cardBorder = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)';
    const textPrimary = isDark ? '#ffffff' : '#0f172a';
    const textSecondary = isDark ? '#94a3b8' : '#64748b';

    switch (key) {
      case 'vstack':
        return `
          <div style="background:${cardBg}; border:1px solid ${cardBorder}; border-radius:${props.cornerRadius}px; padding:${props.padding}px; display:flex; flex-direction:column; gap:${props.spacing}px; align-items:${props.alignment === 'center' ? 'center' : (props.alignment === 'trailing' ? 'flex-end' : 'flex-start')}; width:280px; box-shadow:0 8px 24px rgba(0,0,0,0.2);">
            <div style="font-size:15px; font-weight:700; color:${textPrimary};">Objectif du Cours</div>
            <div style="font-size:12px; color:${textSecondary};">Apprendre à structurer les composants.</div>
            <div style="padding:6px 12px; background:#f05138; color:#fff; border-radius:8px; font-size:12px; font-weight:600;">Commencer le TP</div>
          </div>
        `;
      case 'hstack':
        return `
          <div style="background:${cardBg}; border:1px solid ${cardBorder}; border-radius:${props.cornerRadius}px; padding:${props.padding}px; display:flex; flex-direction:row; align-items:center; gap:${props.spacing}px; width:310px; box-shadow:0 8px 24px rgba(0,0,0,0.2);">
            <div style="width:36px; height:36px; border-radius:10px; background:rgba(41,151,255,0.15); color:#2997ff; display:flex; align-items:center; justify-content:center; font-size:16px;">⚡️</div>
            <div style="flex:1;">
              <div style="font-size:13px; font-weight:600; color:${textPrimary};">Statut du Test</div>
              <div style="font-size:11px; color:${textSecondary};">12 tests validés</div>
            </div>
            <div style="font-size:12px; font-weight:700; color:#30d158;">100%</div>
          </div>
        `;
      case 'zstack':
        return `
          <div style="position:relative; width:280px; height:180px; border-radius:${props.cornerRadius}px; overflow:hidden; display:flex; align-items:center; justify-content:center; box-shadow:0 12px 32px rgba(0,0,0,0.25);">
            <!-- Fond dégradé en Z -->
            <div style="position:absolute; inset:0; background:linear-gradient(135deg, #f05138 0%, #bf5af2 100%); opacity:0.85;"></div>
            <!-- Carte au dessus -->
            <div style="position:relative; z-index:10; background:${cardBg}; backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,0.2); border-radius:14px; padding:16px; text-align:center; color:#fff;">
              <div style="font-size:14px; font-weight:700;">Badge Flottant (ZStack)</div>
              <div style="font-size:11px; opacity:0.85; margin-top:2px;">Calque au premier plan</div>
            </div>
          </div>
        `;
      case 'text':
        return `
          <div style="background:${cardBg}; border:1px solid ${cardBorder}; border-radius:${props.cornerRadius}px; padding:${props.padding}px; width:280px; display:flex; flex-direction:column; gap:${props.spacing}px;">
            <div style="font-size:22px; font-weight:800; color:${textPrimary};">.largeTitle.bold()</div>
            <div style="font-size:15px; font-weight:600; color:${textPrimary};">.headline</div>
            <div style="font-size:12px; color:${textSecondary};">.subheadline (.secondary)</div>
            <div style="font-size:10px; color:#2997ff; font-weight:600; text-transform:uppercase;">.caption.semibold()</div>
          </div>
        `;
      case 'label':
        return `
          <div style="display:flex; flex-direction:column; gap:10px;">
            <div style="background:${cardBg}; border:1px solid ${cardBorder}; border-radius:${props.cornerRadius}px; padding:${props.padding}px 18px; display:flex; align-items:center; gap:${props.spacing}px; color:${textPrimary}; font-size:13px; font-weight:600; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
              <span style="color:#f05138; font-size:16px;">★</span>
              <span>Priorité Haute</span>
            </div>
            <div style="background:${cardBg}; border:1px solid ${cardBorder}; border-radius:${props.cornerRadius}px; padding:${props.padding}px 18px; display:flex; align-items:center; gap:${props.spacing}px; color:${textPrimary}; font-size:13px; font-weight:600; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
              <span style="color:#30d158; font-size:16px;">✓</span>
              <span>Tâche Terminée</span>
            </div>
          </div>
        `;
      case 'button':
        return `
          <div style="display:flex; flex-direction:column; gap:12px; align-items:center;">
            <button style="padding:${props.padding}px 24px; background:#f05138; color:#fff; font-size:13px; font-weight:600; border-radius:${props.cornerRadius}px; border:none; box-shadow:0 4px 14px rgba(240,81,56,0.4); cursor:pointer;">
              .buttonStyle(.borderedProminent)
            </button>
            <button style="padding:${props.padding - 4}px 20px; background:rgba(41,151,255,0.12); color:#2997ff; font-size:12px; font-weight:600; border-radius:${props.cornerRadius}px; border:1px solid rgba(41,151,255,0.3); cursor:pointer;">
              .buttonStyle(.bordered)
            </button>
          </div>
        `;
      case 'taskrow':
        return `
          <div style="background:${cardBg}; border:1px solid ${cardBorder}; border-radius:${props.cornerRadius}px; padding:${props.padding}px; display:flex; align-items:center; justify-content:space-between; width:300px; box-shadow:0 8px 20px rgba(0,0,0,0.15); cursor:pointer;" onclick="updateSbProp('isDone', !sbProps.isDone)">
            <div style="display:flex; align-items:center; gap:12px;">
              <div style="width:12px; height:12px; border-radius:50%; background:${props.isDone ? '#30d158' : '#f05138'};"></div>
              <div>
                <div style="font-size:13px; font-weight:600; color:${textPrimary}; text-decoration:${props.isDone ? 'line-through' : 'none'}; opacity:${props.isDone ? 0.6 : 1};">Créer le ViewModel</div>
                <div style="font-size:11px; color:${textSecondary};">Priorité ${props.priority || 'Haute'}</div>
              </div>
            </div>
            <div style="width:22px; height:22px; border-radius:50%; background:${props.isDone ? '#30d158' : 'transparent'}; border:${props.isDone ? 'none' : '2px solid ' + textSecondary}; display:flex; align-items:center; justify-content:center; color:#fff; font-size:11px; font-weight:700;">
              ${props.isDone ? '✓' : ''}
            </div>
          </div>
        `;
      case 'summarycard':
        return `
          <div style="background:${cardBg}; border:1px solid ${cardBorder}; border-radius:${props.cornerRadius}px; padding:${props.padding}px; width:300px; display:flex; align-items:center; justify-content:space-between; box-shadow:0 12px 28px rgba(0,0,0,0.18);">
            <div>
              <div style="font-size:13px; font-weight:700; color:${textPrimary};">Progression du TP</div>
              <div style="font-size:11px; color:${textSecondary};">Écran lisible et testable</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:16px; font-weight:800; color:#30d158;">${props.completed || 3} finie(s)</div>
              <div style="font-size:11px; color:${textSecondary};">${props.pending || 1} en cours</div>
            </div>
          </div>
        `;
      default:
        return `<div style="color:${textSecondary};">Composant SwiftUI</div>`;
    }
  }

  function generateSwiftCode(key, props) {
    switch (key) {
      case 'vstack':
        return `VStack(alignment: .${props.alignment || 'leading'}, spacing: ${props.spacing || 12}) {\n    Text("Objectif du Cours")\n        .font(.headline)\n    Text("Apprendre à structurer les composants.")\n        .font(.subheadline)\n        .foregroundStyle(.secondary)\n    Button("Commencer le TP") {\n        // Action\n    }\n    .buttonStyle(.borderedProminent)\n}\n.padding(${props.padding || 16})\n.background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: ${props.cornerRadius || 16}))`;

      case 'hstack':
        return `HStack(spacing: ${props.spacing || 12}) {\n    Image(systemName: "bolt.fill")\n        .font(.title3)\n        .foregroundStyle(.blue)\n    VStack(alignment: .leading) {\n        Text("Statut du Test")\n            .font(.subheadline.bold())\n        Text("12 tests validés")\n            .font(.caption)\n            .foregroundStyle(.secondary)\n    }\n    Spacer()\n    Text("100%")\n        .font(.subheadline.bold())\n        .foregroundStyle(.green)\n}\n.padding(${props.padding || 16})\n.background(.white, in: RoundedRectangle(cornerRadius: ${props.cornerRadius || 16}))`;

      case 'zstack':
        return `ZStack {\n    // Calque d'arrière-plan\n    LinearGradient(\n        colors: [.orange, .purple],\n        startPoint: .topLeading,\n        endPoint: .bottomTrailing\n    )\n    .ignoresSafeArea()\n\n    // Calque de contenu superposé\n    VStack {\n        Text("Badge Flottant")\n            .font(.headline.bold())\n    }\n    .padding(${props.padding || 16})\n    .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: ${props.cornerRadius || 14}))\n}`;

      case 'text':
        return `VStack(alignment: .leading, spacing: ${props.spacing || 6}) {\n    Text("Titre Principal")\n        .font(.largeTitle.bold())\n    Text("Sous-titre de section")\n        .font(.headline)\n    Text("Description détaillée du composant.")\n        .font(.subheadline)\n        .foregroundStyle(.secondary)\n    Text("Badge d'état")\n        .font(.caption.weight(.semibold))\n        .foregroundStyle(.blue)\n}`;

      case 'label':
        return `VStack(spacing: 10) {\n    Label("Priorité Haute", systemImage: "star.fill")\n        .font(.subheadline.weight(.semibold))\n        .foregroundStyle(.orange)\n\n    Label("Tâche Terminée", systemImage: "checkmark.circle.fill")\n        .font(.subheadline.weight(.semibold))\n        .foregroundStyle(.green)\n}\n.padding(${props.padding || 12})\n.background(.thinMaterial, in: RoundedRectangle(cornerRadius: ${props.cornerRadius || 12}))`;

      case 'button':
        return `Button(action: {\n    print("Action déclenchée !")\n}) {\n    Label("Ajouter une tâche", systemImage: "plus.circle.fill")\n}\n.buttonStyle(.borderedProminent)\n.tint(.orange)\n.clipShape(RoundedRectangle(cornerRadius: ${props.cornerRadius || 12}))`;

      case 'taskrow':
        return `HStack(spacing: 12) {\n    Circle()\n        .fill(${props.isDone ? 'Color.green' : 'Color.orange'})\n        .frame(width: 12, height: 12)\n    VStack(alignment: .leading, spacing: 2) {\n        Text("Créer le ViewModel")\n            .font(.body.weight(.semibold))\n            .strikethrough(${props.isDone})\n        Text("Priorité ${props.priority || 'Haute'}")\n            .font(.caption)\n            .foregroundStyle(.secondary)\n    }\n    Spacer()\n    if ${props.isDone} {\n        Image(systemName: "checkmark.circle.fill")\n            .foregroundStyle(.green)\n    }\n}\n.padding(${props.padding || 14})\n.background(.white, in: RoundedRectangle(cornerRadius: ${props.cornerRadius || 16}))`;

      case 'summarycard':
        return `HStack {\n    VStack(alignment: .leading, spacing: 4) {\n        Text("Progression du TP")\n            .font(.headline)\n        Text("Écran lisible et testable")\n            .font(.caption)\n            .foregroundStyle(.secondary)\n    }\n    Spacer()\n    VStack(alignment: .trailing, spacing: 2) {\n        Text("${props.completed || 3} finie(s)")\n            .font(.title3.bold())\n            .foregroundStyle(.green)\n        Text("${props.pending || 1} en cours")\n            .font(.caption)\n            .foregroundStyle(.secondary)\n    }\n}\n.padding(${props.padding || 18})\n.background(.white, in: RoundedRectangle(cornerRadius: ${props.cornerRadius || 20}))`;

      default:
        return `// Composant SwiftUI`;
    }
  }

  function updateControlsUI() {
    const spacingSlider = document.getElementById('sb-ctrl-spacing');
    const cornerSlider = document.getElementById('sb-ctrl-corner');
    const paddingSlider = document.getElementById('sb-ctrl-padding');
    const isDoneToggle = document.getElementById('sb-ctrl-isdone');

    if (spacingSlider && sbProps.spacing !== undefined) spacingSlider.value = sbProps.spacing;
    if (cornerSlider && sbProps.cornerRadius !== undefined) cornerSlider.value = sbProps.cornerRadius;
    if (paddingSlider && sbProps.padding !== undefined) paddingSlider.value = sbProps.padding;
    if (isDoneToggle && sbProps.isDone !== undefined) isDoneToggle.checked = sbProps.isDone;
  }

  // --- Export All Public Interactive Functions to Window ---
  window.updateSlide = updateSlide;
  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;
  window.toggleFullscreen = toggleFullscreen;
  window.toggleOverview = toggleOverview;
  window.toggleHelp = toggleHelp;
  window.toggleStorybook = toggleStorybook;
  window.toggleTimer = toggleTimer;
  window.setOptionalMode = setOptionalMode;
  window.toggleSimTask = toggleSimTask;
  window.addSimTask = addSimTask;
  window.setMemoryDemo = setMemoryDemo;
  window.checkQuiz = checkQuiz;
  window.selectXcodeZone = selectXcodeZone;
  window.setDiMode = setDiMode;
  window.setStackMode = setStackMode;
  window.selectStorybookComponent = selectStorybookComponent;
  window.toggleSbDarkMode = toggleSbDarkMode;
  window.updateSbProp = updateSbProp;

  // Initial call
  updateSlide(currentIndex);
  renderSimulator();
  renderStorybook();
});
