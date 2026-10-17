document.addEventListener('DOMContentLoaded', () => {

  // =========================================================
  // 1. GSAP ENVELOPE UNVEIL ON OM TAP
  // =========================================================
  const waxSeal = document.getElementById('wax-seal');
  const stage = document.getElementById('envelope-stage');
  const audio = document.getElementById('wedding-audio');
  const musicToggle = document.getElementById('music-toggle');

  // waxSeal.addEventListener('click', () => {
  //   const tl = gsap.timeline({
  //     onComplete: () => {
  //       stage.style.visibility = 'hidden';
  //     }
  //   });

  //   // 1. Golden Om radiates, expands with burst of light, then dissolves
  //   tl.to(waxSeal, { scale: 1.35, opacity: 0, duration: 0.7, ease: 'power2.in' })
  //     // 2. Top triangular flap unfolds upward in 3D
  //     .to('.flap-top', { rotationX: 180, duration: 1.5, ease: 'power2.inOut' }, '-=0.15')
  //     // 3. Left and right flaps open outward
  //     .to('.flap-left', { rotationY: -130, duration: 1.6, ease: 'power2.inOut' }, '-=0.4')
  //     .to('.flap-right', { rotationY: 130, duration: 1.6, ease: 'power2.inOut' }, '<')
  //     // 4. Bottom flap drops down
  //     .to('.flap-bottom', { rotationX: -140, duration: 1.4, ease: 'power2.inOut' }, '-=0.4')
  //     // 5. Entire envelope dissolves to reveal card
  //     .to(stage, { opacity: 0, duration: 0.6, ease: 'power1.out' }, '-=0.4');

  //   // Trigger music playback
  //   if (audio) {
  //     audio.play().then(() => {
  //       musicToggle.classList.remove('hidden');
  //     }).catch(() => {
  //       musicToggle.classList.remove('hidden');
  //     });
  //   }
  // });

waxSeal.addEventListener('click', () => {
    const tl = gsap.timeline({
      onComplete: () => {
        stage.style.visibility = 'hidden';
      }
    });

    // 1. Om seal dissolves gracefully (1.0s)
    tl.to(waxSeal, { 
      scale: 1.15, 
      opacity: 0, 
      duration: 1.0, 
      ease: 'sine.inOut' 
    })
    
    // 2. All 4 flaps open together very slowly (3.0s)
    .to('.flap-top', { 
      rotationX: 180, 
      duration: 3.0, 
      ease: 'sine.inOut' 
    }, 'openTogether')
    .to('.flap-bottom', { 
      rotationX: -140, 
      duration: 3.0, 
      ease: 'sine.inOut' 
    }, 'openTogether')
    .to('.flap-left', { 
      rotationY: -130, 
      duration: 3.0, 
      ease: 'sine.inOut' 
    }, 'openTogether')
    .to('.flap-right', { 
      rotationY: 130, 
      duration: 3.0, 
      ease: 'sine.inOut' 
    }, 'openTogether')

    // 3. Stage gently fades out during the final moment of opening
    .to(stage, { 
      opacity: 0, 
      duration: 0.8, 
      ease: 'sine.out' 
    }, '-=0.6');

    // Music playback
    if (audio) {
      audio.play().then(() => {
        musicToggle.classList.remove('hidden');
      }).catch(() => {
        musicToggle.classList.remove('hidden');
      });
    }
  });

  // Music toggle control
  musicToggle.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      musicToggle.style.opacity = '1';
    } else {
      audio.pause();
      musicToggle.style.opacity = '0.5';
    }
  });

  // =========================================================
  // 2. LIVE COUNTDOWN (12 DEC 2026, 11:11 AM IST)
  // =========================================================
  const weddingDate = new Date('2026-12-12T11:11:00+05:30').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const gap = weddingDate - now;

    if (gap < 0) {
      document.querySelector('.timer-grid').innerHTML = 
        "<p style='color:var(--snow-white); font-family:var(--font-serif-display); font-size:1.4rem;'>Our Forever Has Begun!</p>";
      return;
    }

    const d = Math.floor(gap / (1000 * 60 * 60 * 24));
    const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((gap % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = String(d).padStart(2, '0');
    document.getElementById('hours').innerText = String(h).padStart(2, '0');
    document.getElementById('minutes').innerText = String(m).padStart(2, '0');
    document.getElementById('seconds').innerText = String(s).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // =========================================================
  // 3. GOOGLE CALENDAR
  // =========================================================
  const calBtn = document.getElementById('calendar-btn');
  const calData = {
    title: encodeURIComponent("Akshuna & Darrpan's Wedding Celebration"),
    details: encodeURIComponent("Together with our families, we invite you to celebrate our forever. Wedding Ceremony at Navale Lawns, Pune."),
    location: encodeURIComponent("Navale Lawns, Pune, Maharashtra"),
    startDate: "20261212T054100Z",
    endDate: "20261212T103000Z"
  };
  calBtn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calData.title}&dates=${calData.startDate}/${calData.endDate}&details=${calData.details}&location=${calData.location}`;

// =========================================================
  // 4. THREE.JS 3D ENGINE: FALLING FLOWER PETALS (Lotus & Jasmine)
  // =========================================================
  const container = document.getElementById('divine-3d-scene');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 320;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  function createPetalTexture() {
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');

    pCtx.translate(32, 32);
    pCtx.beginPath();
    pCtx.moveTo(0, -26);
    pCtx.bezierCurveTo(16, -14, 20, 16, 0, 26);
    pCtx.bezierCurveTo(-20, 16, -16, -14, 0, -26);
    pCtx.closePath();

    const grad = pCtx.createRadialGradient(0, 0, 2, 0, 0, 26);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.6, '#fde8ef');
    grad.addColorStop(1, '#f3b6c7');

    pCtx.fillStyle = grad;
    pCtx.fill();

    return new THREE.CanvasTexture(pCanvas);
  }

  const petalTexture = createPetalTexture();
  const petalCount = 42;
  const petals = [];
  const petalGeo = new THREE.PlaneGeometry(12, 16);

  // Colors drawn directly from the lotus flowers and jasmine vines in the artwork
  const materials = [
    new THREE.MeshBasicMaterial({ map: petalTexture, transparent: true, opacity: 0.85, side: THREE.DoubleSide, depthWrite: false }),
    new THREE.MeshBasicMaterial({ map: petalTexture, color: 0xffffff, transparent: true, opacity: 0.9, side: THREE.DoubleSide, depthWrite: false }),
    new THREE.MeshBasicMaterial({ map: petalTexture, color: 0xfce4ec, transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false })
  ];

  for (let i = 0; i < petalCount; i++) {
    const mat = materials[Math.floor(Math.random() * materials.length)];
    const mesh = new THREE.Mesh(petalGeo, mat);

    mesh.position.set(
      (Math.random() - 0.5) * 420,
      (Math.random() - 0.5) * 550,
      (Math.random() - 0.5) * 200
    );

    mesh.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );

    const scale = Math.random() * 0.6 + 0.7;
    mesh.scale.set(scale, scale, scale);

    scene.add(mesh);

    petals.push({
      mesh,
      speedY: -(Math.random() * 0.7 + 0.35),
      speedX: (Math.random() - 0.5) * 0.3,
      swayOffset: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.02 + 0.01,
      rotX: (Math.random() - 0.5) * 0.02,
      rotY: (Math.random() - 0.5) * 0.03,
      rotZ: (Math.random() - 0.5) * 0.015
    });
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  let clock = 0;
  function renderScene() {
    clock += 0.03;

    petals.forEach(p => {
      p.mesh.position.y += p.speedY;
      p.mesh.position.x += Math.sin(clock + p.swayOffset) * 0.4 + p.speedX;

      p.mesh.rotation.x += p.rotX;
      p.mesh.rotation.y += p.rotY;
      p.mesh.rotation.z += p.rotZ;

      if (p.mesh.position.y < -260) {
        p.mesh.position.y = 260;
        p.mesh.position.x = (Math.random() - 0.5) * 420;
      }
    });

    renderer.render(scene, camera);
    requestAnimationFrame(renderScene);
  }

  renderScene();
});