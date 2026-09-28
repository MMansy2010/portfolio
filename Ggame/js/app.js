// Main Game Controller for 6th Grade German Learning App
class GameApp {
  constructor() {
    this.unlockedLevel = parseInt(localStorage.getItem('unlockedLevel')) || 40;
    this.stars = JSON.parse(localStorage.getItem('levelStars')) || {};
    this.totalXP = parseInt(localStorage.getItem('totalXP')) || 0;
    this.streak = parseInt(localStorage.getItem('streak')) || 1;
    this.theme = localStorage.getItem('theme') || 'dark';

    this.currentLevel = 1;
    this.currentQuestionIdx = 0;
    this.levelScore = 0;
    this.selectedWorldId = 1;
    this.isAnswered = false;

    this.initElements();
    this.applyTheme(this.theme);
    this.bindEvents();
    this.renderHeaderStats();
    this.renderWorldTabs();
    this.renderLevelMap();
  }

  initElements() {
    this.screens = {
      map: document.getElementById('screen-map'),
      quiz: document.getElementById('screen-quiz')
    };

    this.elements = {
      xpDisplay: document.getElementById('xp-display'),
      starsDisplay: document.getElementById('stars-display'),
      themeBtn: document.getElementById('theme-toggle-btn'),
      soundBtn: document.getElementById('sound-toggle-btn'),
      
      worldTabsContainer: document.getElementById('world-tabs-container'),
      mapTitle: document.getElementById('world-map-title'),
      mapSubtitle: document.getElementById('world-map-subtitle'),
      mapPath: document.getElementById('map-path'),

      quizTitle: document.getElementById('quiz-level-title'),
      progressFill: document.getElementById('quiz-progress-fill'),
      svgContainer: document.getElementById('question-svg-container'),
      typeBadge: document.getElementById('question-type-badge'),
      qTitle: document.getElementById('question-title'),
      qText: document.getElementById('question-text'),
      optionsGrid: document.getElementById('options-grid'),
      feedbackBox: document.getElementById('feedback-box'),
      feedbackTitle: document.getElementById('feedback-title'),
      feedbackText: document.getElementById('feedback-text'),
      nextBtn: document.getElementById('next-question-btn'),

      modalOverlay: document.getElementById('modal-overlay'),
      modalIcon: document.getElementById('modal-icon'),
      modalTitle: document.getElementById('modal-title'),
      modalStars: document.getElementById('modal-stars'),
      modalAccuracy: document.getElementById('modal-accuracy'),
      modalXp: document.getElementById('modal-xp-earned'),
      modalNextBtn: document.getElementById('modal-next-btn'),
      modalReplayBtn: document.getElementById('modal-replay-btn'),
      modalMapBtn: document.getElementById('modal-map-btn')
    };
  }

  bindEvents() {
    // Top Bar Actions
    document.getElementById('back-to-map-btn').addEventListener('click', () => {
      sounds.playClick();
      this.showScreen('map');
    });

    this.elements.themeBtn.addEventListener('click', () => {
      sounds.playClick();
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', this.theme);
      this.applyTheme(this.theme);
    });

    this.elements.soundBtn.addEventListener('click', () => {
      const muted = sounds.toggleMute();
      this.elements.soundBtn.textContent = muted ? '🔇' : '🔊';
    });

    document.getElementById('reset-progress-btn')?.addEventListener('click', () => {
      if (confirm('Bist du sicher, dass du deinen gesamten Fortschritt zurücksetzen möchtest?')) {
        localStorage.clear();
        location.reload();
      }
    });

    // Quiz Actions
    this.elements.nextBtn.addEventListener('click', () => {
      sounds.playClick();
      this.advanceQuestion();
    });

    // Modal Actions
    this.elements.modalNextBtn.addEventListener('click', () => {
      sounds.playClick();
      this.closeModal();
      if (this.currentLevel < 40) {
        this.startLevel(this.currentLevel + 1);
      } else {
        this.showScreen('map');
      }
    });

    this.elements.modalReplayBtn.addEventListener('click', () => {
      sounds.playClick();
      this.closeModal();
      this.startLevel(this.currentLevel);
    });

    this.elements.modalMapBtn.addEventListener('click', () => {
      sounds.playClick();
      this.closeModal();
      this.showScreen('map');
    });
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.elements.themeBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
  }

  renderHeaderStats() {
    let totalStarsEarned = 0;
    Object.values(this.stars).forEach(s => totalStarsEarned += s);
    this.elements.starsDisplay.textContent = totalStarsEarned;
    this.elements.xpDisplay.textContent = this.totalXP;
  }

  showScreen(screenName) {
    Object.values(this.screens).forEach(s => s.classList.remove('active'));
    this.screens[screenName].classList.add('active');
    if (screenName === 'map') {
      this.renderLevelMap();
      this.renderHeaderStats();
    }
  }

  renderWorldTabs() {
    this.elements.worldTabsContainer.innerHTML = '';
    WORLDS_DATA.forEach(world => {
      const btn = document.createElement('button');
      btn.className = `world-tab-btn ${world.id === this.selectedWorldId ? 'active' : ''}`;
      btn.innerHTML = `<span>${world.icon}</span> <span>Lektion ${world.id}</span>`;
      btn.addEventListener('click', () => {
        sounds.playClick();
        this.selectedWorldId = world.id;
        this.renderWorldTabs();
        this.renderLevelMap();
      });
      this.elements.worldTabsContainer.appendChild(btn);
    });
  }

  renderLevelMap() {
    const world = WORLDS_DATA.find(w => w.id === this.selectedWorldId);
    if (!world) return;

    this.elements.mapTitle.textContent = world.title;
    this.elements.mapSubtitle.textContent = world.subtitle;

    this.elements.mapPath.innerHTML = '';

    world.levels.forEach(lvlNum => {
      const wrapper = document.createElement('div');
      wrapper.className = 'level-node-wrapper';

      const btn = document.createElement('button');
      const isUnlocked = true;
      const isCurrent = lvlNum === this.currentLevel;
      const isBoss = lvlNum % 7 === 0 || lvlNum === 40;

      let statusClass = 'unlocked';
      if (isCurrent) statusClass = 'current';
      if (isBoss) statusClass = 'boss';

      btn.className = `level-node-btn ${statusClass}`;

      const lvlStarsCount = this.stars[lvlNum] || 0;
      let starsHTML = '';
      if (lvlStarsCount > 0) {
        starsHTML = `
          <div class="level-stars">
            <span class="star ${lvlStarsCount >= 1 ? 'active' : ''}">★</span>
            <span class="star ${lvlStarsCount >= 2 ? 'active' : ''}">★</span>
            <span class="star ${lvlStarsCount >= 3 ? 'active' : ''}">★</span>
          </div>
        `;
      }

      btn.innerHTML = `
        <span>${lvlNum}</span>
        ${starsHTML}
      `;

      btn.addEventListener('click', () => {
        sounds.playClick();
        this.startLevel(lvlNum);
      });

      const label = document.createElement('div');
      label.className = 'node-title-label';
      label.textContent = isBoss ? `👑 Boss Level ${lvlNum}` : `Level ${lvlNum}`;

      wrapper.appendChild(btn);
      wrapper.appendChild(label);
      this.elements.mapPath.appendChild(wrapper);
    });
  }

  startLevel(levelNum) {
    this.currentLevel = levelNum;
    this.currentQuestionIdx = 0;
    this.levelScore = 0;
    
    // Auto switch to correct world tab if level belongs to another world
    const targetWorld = WORLDS_DATA.find(w => w.levels.includes(levelNum));
    if (targetWorld) {
      this.selectedWorldId = targetWorld.id;
    }

    this.showScreen('quiz');
    this.loadQuestion();
  }

  loadQuestion() {
    this.isAnswered = false;
    const questions = LEVELS_DATA[this.currentLevel];
    if (!questions || this.currentQuestionIdx >= questions.length) {
      this.finishLevel();
      return;
    }

    const q = questions[this.currentQuestionIdx];

    // Reset UI
    if (this.elements.quizTitle) {
      this.elements.quizTitle.textContent = `Level ${this.currentLevel} (Frage ${this.currentQuestionIdx + 1} von ${questions.length})`;
    }
    if (this.elements.progressFill) {
      const pct = ((this.currentQuestionIdx) / questions.length) * 100;
      this.elements.progressFill.style.width = `${pct}%`;
    }

    this.elements.feedbackBox.className = 'feedback-box';
    this.elements.feedbackBox.classList.remove('show');
    this.elements.nextBtn.style.display = 'none';

    // SVG display
    if (q.svg) {
      this.elements.svgContainer.innerHTML = getSVG(q.svg);
      this.elements.svgContainer.style.display = 'flex';
    } else {
      this.elements.svgContainer.style.display = 'none';
    }

    // Type Badge
    let badgeText = "Multiple-Choice-Frage";
    if (q.type === "image-choice") badgeText = "🖼️ Bild- & Artikel-Frage";
    if (q.type === "odd-word") badgeText = "🔍 Kuckucksei-Frage (Was passt hier nicht!)";
    if (q.type === "sentence-match") badgeText = "✍️ Grammatik & Satzbau";
    this.elements.typeBadge.textContent = badgeText;

    this.elements.qTitle.textContent = q.question;
    this.elements.qText.textContent = q.text || '';

    // Shuffle options dynamically for variety
    const optionObjects = q.options.map((optText, idx) => ({
      text: optText,
      isCorrect: idx === q.correct
    }));

    for (let i = optionObjects.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionObjects[i], optionObjects[j]] = [optionObjects[j], optionObjects[i]];
    }

    this.currentShuffledOptions = optionObjects;

    // Render Options
    this.elements.optionsGrid.innerHTML = '';
    optionObjects.forEach((optObj, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = optObj.text;
      btn.addEventListener('click', () => this.handleAnswer(idx, btn));
      this.elements.optionsGrid.appendChild(btn);
    });
  }

  handleAnswer(selectedIdx, clickedBtn) {
    if (this.isAnswered) return;
    this.isAnswered = true;

    const questions = LEVELS_DATA[this.currentLevel];
    const q = questions[this.currentQuestionIdx];
    const optionBtns = this.elements.optionsGrid.querySelectorAll('.option-btn');

    const selectedOptObj = this.currentShuffledOptions ? this.currentShuffledOptions[selectedIdx] : null;
    const isCorrect = selectedOptObj ? selectedOptObj.isCorrect : (selectedIdx === q.correct);

    const correctIdx = this.currentShuffledOptions ? this.currentShuffledOptions.findIndex(o => o.isCorrect) : q.correct;

    if (isCorrect) {
      this.levelScore++;
      clickedBtn.classList.add('correct-choice');
      sounds.playCorrect();

      this.elements.feedbackBox.className = 'feedback-box correct show';
      this.elements.feedbackTitle.textContent = 'Richtig! 🎉';
    } else {
      clickedBtn.classList.add('wrong-choice');
      if (correctIdx !== -1 && optionBtns[correctIdx]) {
        optionBtns[correctIdx].classList.add('correct-choice');
      }
      sounds.playWrong();

      this.elements.feedbackBox.className = 'feedback-box wrong show';
      this.elements.feedbackTitle.textContent = 'Falsch! ❌';
    }

    this.elements.feedbackText.textContent = q.explanation;
    this.elements.nextBtn.style.display = 'flex';
  }

  advanceQuestion() {
    this.currentQuestionIdx++;
    const questions = LEVELS_DATA[this.currentLevel];
    if (this.currentQuestionIdx >= questions.length) {
      this.elements.progressFill.style.width = '100%';
      this.finishLevel();
    } else {
      this.loadQuestion();
    }
  }

  finishLevel() {
    const questions = LEVELS_DATA[this.currentLevel];
    const totalQ = questions.length;
    const accuracy = (this.levelScore / totalQ);

    let starsEarned = 1;
    if (accuracy >= 0.99) starsEarned = 3;
    else if (accuracy >= 0.6) starsEarned = 2;

    // Save stars & unlock next level
    if (!this.stars[this.currentLevel] || starsEarned > this.stars[this.currentLevel]) {
      this.stars[this.currentLevel] = starsEarned;
      localStorage.setItem('levelStars', JSON.stringify(this.stars));
    }

    if (this.currentLevel === this.unlockedLevel && this.unlockedLevel < 40) {
      this.unlockedLevel++;
      localStorage.setItem('unlockedLevel', this.unlockedLevel);
    }

    const xpGained = this.levelScore * 10 + (starsEarned * 15);
    this.totalXP += xpGained;
    localStorage.setItem('totalXP', this.totalXP);

    sounds.playLevelComplete();

    // Show Modal
    this.elements.modalIcon.textContent = starsEarned === 3 ? '🏆' : (starsEarned === 2 ? '🌟' : '👍');
    this.elements.modalTitle.textContent = `Glückwunsch! Level ${this.currentLevel} abgeschlossen`;
    
    let starsStr = '';
    for (let i = 1; i <= 3; i++) {
      starsStr += `<span class="star ${i <= starsEarned ? 'active' : ''}">★</span>`;
    }
    this.elements.modalStars.innerHTML = starsStr;

    this.elements.modalAccuracy.textContent = `${Math.round(accuracy * 100)}% (${this.levelScore}/${totalQ})`;
    this.elements.modalXp.textContent = `+${xpGained} XP`;

    this.elements.modalNextBtn.textContent = this.currentLevel < 40 ? 'Nächstes Level ➔' : 'Prüfung abschließen 🎉';

    this.elements.modalOverlay.classList.add('active');
  }

  closeModal() {
    this.elements.modalOverlay.classList.remove('active');
  }
}

// Initialize application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new GameApp();
});
