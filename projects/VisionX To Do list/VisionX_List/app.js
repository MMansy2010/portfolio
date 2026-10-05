/* ============================================
   VisionX To-Do List — Interactive Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // === State Management ===
    const STORAGE_KEY = 'visionx-todo-state';

    function loadState() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    }

    function saveState(state) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.warn('Could not save state:', e);
        }
    }

    const state = loadState();

    // === Initialize Checkboxes from State ===
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"][data-task]');

    allCheckboxes.forEach(cb => {
        const taskId = cb.getAttribute('data-task');
        if (state[taskId]) {
            cb.checked = true;
        }
    });

    // === Checkbox Event Handling ===
    allCheckboxes.forEach(cb => {
        cb.addEventListener('change', (e) => {
            const taskId = e.target.getAttribute('data-task');
            const taskItem = e.target.closest('.task-item');

            if (e.target.checked) {
                state[taskId] = true;
                taskItem.classList.add('just-completed');
                setTimeout(() => taskItem.classList.remove('just-completed'), 500);

                // Ripple effect
                createRipple(taskItem);
            } else {
                delete state[taskId];
                taskItem.classList.add('just-unchecked');
                setTimeout(() => taskItem.classList.remove('just-unchecked'), 300);
            }

            saveState(state);
            updateAllProgress();
            checkPhaseCompletion();
        });
    });

    // === Ripple Effect ===
    function createRipple(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 10px;
            height: 10px;
            background: rgba(0, 240, 255, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: rippleOut 0.6s ease-out forwards;
            pointer-events: none;
            z-index: 10;
        `;
        element.style.position = 'relative';
        element.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    // Add ripple keyframes
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleOut {
            to { transform: translate(-50%, -50%) scale(40); opacity: 0; }
        }
    `;
    document.head.appendChild(rippleStyle);

    // === Progress Updates ===
    function updateAllProgress() {
        const phaseCards = document.querySelectorAll('.phase-card[data-phase]');
        let totalTasks = 0;
        let totalCompleted = 0;
        // Phase 0 is already completed (5 tasks)
        const phase0Tasks = 5;
        totalTasks += phase0Tasks;
        totalCompleted += phase0Tasks;

        phaseCards.forEach(card => {
            const phase = card.getAttribute('data-phase');
            if (phase === '0') return; // Phase 0 is pre-completed

            const checkboxes = card.querySelectorAll('input[type="checkbox"][data-task]');
            const total = checkboxes.length;
            const checked = Array.from(checkboxes).filter(cb => cb.checked).length;

            totalTasks += total;
            totalCompleted += checked;

            // Update phase progress bar
            const progressFill = card.querySelector('.progress-fill');
            const progressText = card.querySelector('.progress-text');
            if (progressFill && progressText) {
                const percentage = total > 0 ? (checked / total) * 100 : 0;
                progressFill.style.width = percentage + '%';
                progressText.textContent = `${checked}/${total}`;
            }
        });

        // Update master stats
        const completedPhasesCount = countCompletedPhases();
        document.getElementById('completedCount').textContent = completedPhasesCount;

        const overallPercent = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;
        document.getElementById('progressPercent').textContent = overallPercent + '%';

        // Update master progress bar
        const masterFill = document.getElementById('masterProgressFill');
        const masterGlow = document.getElementById('masterProgressGlow');
        if (masterFill) masterFill.style.width = overallPercent + '%';
        if (masterGlow) masterGlow.style.width = overallPercent + '%';

        // Animate stat numbers
        animateStatNumbers();
    }

    function countCompletedPhases() {
        const phaseCards = document.querySelectorAll('.phase-card[data-phase]');
        let completed = 0;

        phaseCards.forEach(card => {
            const phase = card.getAttribute('data-phase');
            if (phase === '0') {
                completed++;
                return;
            }
            const checkboxes = card.querySelectorAll('input[type="checkbox"][data-task]');
            const total = checkboxes.length;
            const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
            if (total > 0 && checked === total) completed++;
        });

        return completed;
    }

    function checkPhaseCompletion() {
        const phaseCards = document.querySelectorAll('.phase-card[data-phase]');

        phaseCards.forEach(card => {
            const phase = card.getAttribute('data-phase');
            if (phase === '0') return;

            const checkboxes = card.querySelectorAll('input[type="checkbox"][data-task]');
            const total = checkboxes.length;
            const checked = Array.from(checkboxes).filter(cb => cb.checked).length;

            if (total > 0 && checked === total) {
                if (!card.classList.contains('phase-done')) {
                    card.classList.add('phase-done');
                    showToast(`🎉 المرحلة ${phase} اكتملت!`);

                    // Confetti for milestones
                    if (phase === '11' || phase === '14') {
                        launchConfetti();
                    }
                }
            } else {
                card.classList.remove('phase-done');
            }
        });
    }

    function animateStatNumbers() {
        document.querySelectorAll('.stat-number').forEach(el => {
            el.style.transform = 'scale(1.15)';
            setTimeout(() => {
                el.style.transform = 'scale(1)';
                el.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
            }, 100);
        });
    }

    // === Toast Notifications ===
    let toastTimeout;
    function showToast(message) {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // === Confetti ===
    function launchConfetti() {
        const canvas = document.getElementById('confettiCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#00f0ff', '#7c3aed', '#f472b6', '#22c55e', '#f59e0b', '#ef4444', '#ffffff'];

        for (let i = 0; i < 200; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: -20 - Math.random() * 300,
                w: 6 + Math.random() * 6,
                h: 4 + Math.random() * 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 4,
                vy: 2 + Math.random() * 4,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10,
                opacity: 1,
            });
        }

        let frame = 0;
        const maxFrames = 180;

        function animate() {
            if (frame > maxFrames) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                return;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.08;
                p.rotation += p.rotationSpeed;
                if (frame > maxFrames - 40) {
                    p.opacity -= 0.025;
                }

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.globalAlpha = Math.max(0, p.opacity);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
            });

            frame++;
            requestAnimationFrame(animate);
        }

        animate();
    }

    // === Particle Background ===
    function initParticles() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        const particles = [];
        const count = Math.min(60, Math.floor(window.innerWidth / 25));

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                r: 1 + Math.random() * 1.5,
                opacity: 0.1 + Math.random() * 0.25,
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 240, 255, ${p.opacity})`;
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        const alpha = (1 - dist / 120) * 0.06;
                        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(draw);
        }

        draw();
    }

    // === Intersection Observer for Scroll Animations ===
    function initScrollAnimations() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        document.querySelectorAll('.phase-card').forEach(card => {
            observer.observe(card);
        });
    }

    // === Timeline Line Animation ===
    function animateTimelineLine() {
        const line = document.getElementById('timelineLine');
        if (!line) return;

        window.addEventListener('scroll', () => {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            line.style.opacity = 0.1 + scrollPercent * 0.2;
        });
    }

    // === Keyboard Shortcut ===
    document.addEventListener('keydown', (e) => {
        // Ctrl + Shift + R = Reset all
        if (e.ctrlKey && e.shiftKey && e.key === 'R') {
            e.preventDefault();
            if (confirm('هل تريد إعادة تعيين كل المهام؟')) {
                allCheckboxes.forEach(cb => {
                    cb.checked = false;
                });
                localStorage.removeItem(STORAGE_KEY);
                updateAllProgress();
                checkPhaseCompletion();
                showToast('🔄 تم إعادة التعيين');
            }
        }
    });

    // === Initialize ===
    initParticles();
    initScrollAnimations();
    animateTimelineLine();
    updateAllProgress();
    checkPhaseCompletion();

    // Small delay to ensure smooth initial animation
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
