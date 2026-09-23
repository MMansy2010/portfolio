/* ==========================================================================
   MOHAMMED MANSY — 3D INTERACTIVE ENGINE & UI CONTROLLER
   Technologies: Three.js, WebGL Shaders, Canvas API, Web Audio API, ES6 JS
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. THREE.JS 3D SCENE SETUP ---
  let scene, camera, renderer;
  let mainGroup, wireframeMesh, innerCoreMesh, outerParticles;
  let light1, light2, lightPoint;
  
  let targetMouseX = 0;
  let targetMouseY = 0;
  let mouseX = 0;
  let mouseY = 0;

  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  function init3D() {
    const container = document.getElementById('three-canvas-container');
    if (!container) return;

    // Create Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060810, 0.0018);

    // Create Camera
    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    camera.position.z = 400;

    // Create Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Group for objects
    mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central 3D Cyber Core (Icosahedron)
    const geometry = new THREE.IcosahedronGeometry(110, 2);
    const wireframeGeo = new THREE.WireframeGeometry(geometry);

    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0x00f3ff,
      transparent: true,
      opacity: 0.35,
      linewidth: 1
    });

    wireframeMesh = new THREE.LineSegments(wireframeGeo, wireframeMat);
    mainGroup.add(wireframeMesh);

    // Inner Glowing Core
    const innerGeo = new THREE.IcosahedronGeometry(75, 1);
    const innerMat = new THREE.MeshPhongMaterial({
      color: 0x6100ff,
      emissive: 0x220055,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
      shininess: 100
    });
    innerCoreMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerCoreMesh);

    // 2. Floating Satellite Polyhedrons around main core
    const smallPolyGroup = new THREE.Group();
    for (let i = 0; i < 8; i++) {
      const smallGeo = new THREE.DodecahedronGeometry(Math.random() * 14 + 6, 0);
      const smallMat = new THREE.MeshPhongMaterial({
        color: i % 2 === 0 ? 0x00f3ff : 0xb026ff,
        wireframe: true,
        transparent: true,
        opacity: 0.5
      });
      const smallMesh = new THREE.Mesh(smallGeo, smallMat);
      
      const angle = (i / 8) * Math.PI * 2;
      const radius = Math.random() * 80 + 200;
      smallMesh.position.x = Math.cos(angle) * radius;
      smallMesh.position.y = Math.sin(angle) * radius + (Math.random() - 0.5) * 50;
      smallMesh.position.z = (Math.random() - 0.5) * 200;

      smallMesh.userData = {
        angle: angle,
        radius: radius,
        speed: (Math.random() * 0.005 + 0.002) * (i % 2 === 0 ? 1 : -1)
      };

      smallPolyGroup.add(smallMesh);
    }
    mainGroup.add(smallPolyGroup);

    // 3. 3D Interactive Particle Field
    const particleCount = 700;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorCyan = new THREE.Color(0x00f3ff);
    const colorPurple = new THREE.Color(0xb026ff);
    const colorWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 1200;
      positions[i + 1] = (Math.random() - 0.5) * 1200;
      positions[i + 2] = (Math.random() - 0.5) * 1200;

      let chosenColor = colorCyan;
      const rand = Math.random();
      if (rand > 0.6) chosenColor = colorPurple;
      else if (rand > 0.85) chosenColor = colorWhite;

      colors[i] = chosenColor.r;
      colors[i + 1] = chosenColor.g;
      colors[i + 2] = chosenColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    outerParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(outerParticles);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0x101525, 1.5);
    scene.add(ambientLight);

    light1 = new THREE.PointLight(0x00f3ff, 3, 800);
    light1.position.set(200, 300, 200);
    scene.add(light1);

    light2 = new THREE.PointLight(0xb026ff, 3, 800);
    light2.position.set(-200, -300, 100);
    scene.add(light2);

    lightPoint = new THREE.PointLight(0xffffff, 2, 400);
    scene.add(lightPoint);

    // Listeners
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);

    // Start Animation Loop
    animate3D();
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onDocumentMouseMove(event) {
    targetMouseX = (event.clientX - windowHalfX) * 0.8;
    targetMouseY = (event.clientY - windowHalfY) * 0.8;

    // Move interactive light
    lightPoint.position.x = (event.clientX / window.innerWidth) * 400 - 200;
    lightPoint.position.y = -(event.clientY / window.innerHeight) * 400 + 200;
  }

  function animate3D() {
    requestAnimationFrame(animate3D);

    // Smooth lerp mouse positioning
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Rotate Main Core
    if (wireframeMesh) {
      wireframeMesh.rotation.x += 0.003;
      wireframeMesh.rotation.y += 0.005;
    }
    if (innerCoreMesh) {
      innerCoreMesh.rotation.x -= 0.004;
      innerCoreMesh.rotation.y -= 0.003;
    }

    // Move Group based on mouse & scroll
    if (mainGroup) {
      mainGroup.rotation.y = mouseX * 0.001;
      mainGroup.rotation.x = -mouseY * 0.001;

      // Parallax with scroll
      const scrollY = window.scrollY || window.pageYOffset;
      mainGroup.position.y = -scrollY * 0.15;
      mainGroup.position.z = -scrollY * 0.2;

      // Orbit satellites
      mainGroup.children.forEach((child) => {
        if (child.isGroup) {
          child.children.forEach((smallMesh) => {
            if (smallMesh.userData) {
              smallMesh.userData.angle += smallMesh.userData.speed;
              smallMesh.position.x = Math.cos(smallMesh.userData.angle) * smallMesh.userData.radius;
              smallMesh.position.z = Math.sin(smallMesh.userData.angle) * smallMesh.userData.radius;
              smallMesh.rotation.x += 0.01;
              smallMesh.rotation.y += 0.01;
            }
          });
        }
      });
    }

    // Slowly rotate outer particles
    if (outerParticles) {
      outerParticles.rotation.y += 0.0004;
      outerParticles.rotation.x += 0.0002;
    }

    renderer.render(scene, camera);
  }


  // --- 2. AUDIO SYNTHESIZER (SUBTLE SOUND FX) ---
  let audioCtx = null;
  let soundEnabled = false;

  function initAudio() {
    const audioBtn = document.getElementById('audio-toggle');
    if (!audioBtn) return;

    audioBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundEnabled && !audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
      }
      audioBtn.classList.toggle('active', soundEnabled);
      audioBtn.setAttribute('title', soundEnabled ? 'Mute Sound' : 'Enable Cyber Sound FX');
      playTone(soundEnabled ? 880 : 330, 'sine', 0.1);
    });
  }

  function playTone(freq, type = 'sine', duration = 0.08) {
    if (!soundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Ignore audio autoplay restrictions if uninitialized
    }
  }


  // --- 3. CARD 3D TILT PHYSICS ---
  function init3DTilt() {
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (centerY - y) / 10;
        const rotateY = (x - centerX) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

        // Reflective glare element update
        const glare = card.querySelector('.card-glare');
        if (glare) {
          glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.15), transparent 70%)`;
        }
      });

      card.addEventListener('mouseenter', () => {
        playTone(600, 'triangle', 0.05);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        const glare = card.querySelector('.card-glare');
        if (glare) {
          glare.style.background = 'transparent';
        }
      });
    });
  }


  // --- 4. PROJECT FILTERING SYSTEM ---
  function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        playTone(520, 'sine', 0.06);

        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category.includes(filter)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px) scale(0.95)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }


  // --- 5. LIVE PREVIEW MODAL MANAGER ---
  function initModal() {
    const modal = document.getElementById('preview-modal');
    const modalFrame = document.getElementById('modal-iframe');
    const modalTitle = document.getElementById('modal-title');
    const closeBtn = document.getElementById('modal-close');
    const externalLink = document.getElementById('modal-external-link');

    if (!modal || !modalFrame) return;

    document.querySelectorAll('.open-preview-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        playTone(700, 'sine', 0.1);

        const url = btn.getAttribute('data-url');
        const title = btn.getAttribute('data-title');

        modalTitle.textContent = title || 'Live Project Preview';
        modalFrame.src = url;
        if (externalLink) externalLink.href = url;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      playTone(400, 'sine', 0.08);
      modal.classList.remove('active');
      modalFrame.src = 'about:blank';
      document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }


  // --- 6. SMOOTH REVEAL & STATS COUNTER ---
  function initScrollReveals() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach((r) => observer.observe(r));
  }


  // --- 7. INITIALIZE EVERYTHING ON DOM READY ---
  document.addEventListener('DOMContentLoaded', () => {
    init3D();
    initAudio();
    init3DTilt();
    initFilters();
    initModal();
    initScrollReveals();
  });

})();
