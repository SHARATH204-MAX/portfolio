/* ============================================================
   SHARATH M — PORTFOLIO  |  script.js  (Premium Interactions)
   ============================================================ */

/* =====================================================
   1. CUSTOM CURSOR
   ===================================================== */
(function () {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  // Ring lags behind dot for smooth trail effect
  function animateRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Enlarge ring on hoverable elements
  const hoverEls = document.querySelectorAll('a, button, .btn, .skill-category, .project-card, .achievement-card, .tag');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });

  // Hide when leaving window
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
})();

/* =====================================================
   2. SCROLL PROGRESS BAR
   ===================================================== */
(function () {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
})();

/* =====================================================
   3. THREE.JS ANIMATED PARTICLE FIELD
   ===================================================== */
(function () {
  const canvas = document.getElementById('three-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 80;

  // Particles
  const COUNT = 2200;
  const geo   = new THREE.BufferGeometry();
  const pos   = new Float32Array(COUNT * 3);
  const col   = new Float32Array(COUNT * 3);

  const palette = [
    new THREE.Color('#4facfe'),
    new THREE.Color('#a78bfa'),
    new THREE.Color('#34d399'),
    new THREE.Color('#f472b6'),
  ];

  for (let i = 0; i < COUNT; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 220;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 220;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 110;
    const c = palette[Math.floor(Math.random() * palette.length)];
    col[i * 3]     = c.r;
    col[i * 3 + 1] = c.g;
    col[i * 3 + 2] = c.b;
  }

  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.7,
    vertexColors: true,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
    depthWrite: false,
  });

  const particles = new THREE.Points(geo, mat);
  scene.add(particles);

  // Floating geometric shapes — wireframe, softly lit
  function makeMesh(geo, color, x, y, z) {
    const m = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.10 });
    const mesh = new THREE.Mesh(geo, m);
    mesh.position.set(x, y, z);
    scene.add(mesh);
    return mesh;
  }

  const shapes = [
    makeMesh(new THREE.OctahedronGeometry(12),       0x4facfe, -65,  32, -35),
    makeMesh(new THREE.IcosahedronGeometry(9),        0xa78bfa,  58, -22, -20),
    makeMesh(new THREE.TorusGeometry(14, 3.5, 8, 24), 0x34d399,  22,  52, -45),
    makeMesh(new THREE.TetrahedronGeometry(9),        0xf472b6, -30, -42, -12),
    makeMesh(new THREE.TorusKnotGeometry(8, 2.5, 80, 8), 0x4facfe, 50, 30, -50),
  ];

  // Mouse parallax
  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.004;
    particles.rotation.y += 0.0005;
    particles.rotation.x += 0.0002;
    camera.position.x += (mouseX * 6 - camera.position.x) * 0.035;
    camera.position.y += (-mouseY * 6 - camera.position.y) * 0.035;
    shapes.forEach((s, i) => {
      s.rotation.x = t * 0.28 + i * 0.8;
      s.rotation.y = t * 0.42 + i * 1.2;
      s.position.y += Math.sin(t * 0.8 + i) * 0.018;
    });
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

/* =====================================================
   4. TYPEWRITER EFFECT
   ===================================================== */
(function () {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const phrases = [
    'Full-Stack Developer',
    'AI Engineer',
    'Data Analyst',
    'Problem Solver',
    'Open Source Builder',
  ];
  let pi = 0, ci = 0, deleting = false;
  function type() {
    const phrase = phrases[pi];
    el.textContent = deleting ? phrase.substring(0, ci--) : phrase.substring(0, ci++);
    let delay = deleting ? 45 : 95;
    if (!deleting && ci > phrase.length) { delay = 2200; deleting = true; }
    else if (deleting && ci < 0)        { deleting = false; ci = 0; pi = (pi + 1) % phrases.length; delay = 350; }
    setTimeout(type, delay);
  }
  type();
})();

/* =====================================================
   5. NAVBAR – SCROLL STYLE + MOBILE TOGGLE
   ===================================================== */
(function () {
  const nav    = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60), { passive: true });
  const toggle = document.getElementById('nav-toggle');
  const links  = nav.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }
})();

/* =====================================================
   6. SCROLL REVEAL (IntersectionObserver)
   ===================================================== */
(function () {
  // Add reveal class to staggered groups
  const staggerGroups = [
    '.skill-category',
    '.achievement-card',
    '.contact-item',
  ];
  staggerGroups.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = (i * 0.07) + 's';
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10 });

  document.querySelectorAll('.reveal, .timeline-item, .project-card').forEach(el => observer.observe(el));
})();

/* =====================================================
   7. 3D TILT EFFECT ON CARDS
   ===================================================== */
(function () {
  const TILT = 12; // max degrees
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const dx = (e.clientX - cx) / (r.width  / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      const rx = -dy * TILT;
      const ry =  dx * TILT;

      card.style.transform    = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
      card.style.transition   = 'transform 0.1s ease';

      // Update CSS vars for inner glow position
      const pctX = ((e.clientX - r.left) / r.width  * 100).toFixed(1) + '%';
      const pctY = ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%';
      card.style.setProperty('--mx', pctX);
      card.style.setProperty('--my', pctY);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform 0.55s cubic-bezier(0.22,1,0.36,1)';
    });
  });
})();

/* =====================================================
   8. ANIMATED COUNTER (About stats)
   ===================================================== */
(function () {
  const counters = document.querySelectorAll('.stat-num[data-count]');
  if (!counters.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseFloat(el.dataset.count);
      const isFloat = String(target).includes('.');
      const duration = 1400;
      const start   = performance.now();

      function update(now) {
        const p   = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3); // ease-out cubic
        const val  = target * ease;
        el.textContent = isFloat ? val.toFixed(2) : Math.floor(val) + '+';
        if (p < 1) requestAnimationFrame(update);
        else el.textContent = isFloat ? target.toFixed(2) : target + '+';
      }
      requestAnimationFrame(update);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => obs.observe(el));
})();

/* =====================================================
   9. MAGNETIC BUTTON EFFECT
   ===================================================== */
(function () {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r   = btn.getBoundingClientRect();
      const dx  = e.clientX - (r.left + r.width  / 2);
      const dy  = e.clientY - (r.top  + r.height / 2);
      btn.style.transform    = `translate(${dx * 0.28}px, ${dy * 0.28}px)`;
      btn.style.transition   = 'transform 0.15s ease';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform  = '';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
    });
  });
})();

/* =====================================================
   10. HERO MOUSE PARALLAX (portrait depth layer)
   ===================================================== */
(function () {
  const portrait = document.querySelector('.hero-portrait');
  const badges   = document.querySelectorAll('.hero-float-badge');
  if (!portrait) return;

  window.addEventListener('mousemove', e => {
    const mx = (e.clientX / window.innerWidth  - 0.5);
    const my = (e.clientY / window.innerHeight - 0.5);

    portrait.style.transform  = `translate(${mx * -18}px, ${my * -10}px)`;
    portrait.style.transition = 'transform 0.25s ease-out';

    badges.forEach((b, i) => {
      const depth = (i + 1) * 0.4;
      b.style.transform  = `translate(${mx * 28 * depth}px, ${my * 16 * depth}px) rotate(${mx * 3}deg)`;
      b.style.transition = 'transform 0.3s ease-out';
    });
  }, { passive: true });
})();

/* =====================================================
   11. CLICK RIPPLE EFFECT
   ===================================================== */
(function () {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const r    = btn.getBoundingClientRect();
      const rip  = document.createElement('span');
      const size = Math.max(r.width, r.height);
      Object.assign(rip.style, {
        position:      'absolute',
        width:         size + 'px',
        height:        size + 'px',
        left:          (e.clientX - r.left - size / 2) + 'px',
        top:           (e.clientY - r.top  - size / 2) + 'px',
        borderRadius:  '50%',
        background:    'rgba(255,255,255,0.25)',
        transform:     'scale(0)',
        animation:     'ripple 0.6s linear',
        pointerEvents: 'none',
      });
      btn.appendChild(rip);
      setTimeout(() => rip.remove(), 700);
    });
  });

  // Inject ripple keyframes once
  if (!document.getElementById('ripple-style')) {
    const s = document.createElement('style');
    s.id = 'ripple-style';
    s.textContent = `@keyframes ripple { to { transform: scale(3); opacity: 0; } }`;
    document.head.appendChild(s);
  }
})();

/* =====================================================
   12. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
   ===================================================== */
(function () {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === '#' + id
            ? 'var(--clr-heading)'
            : 'var(--clr-muted)';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => obs.observe(s));
})();

/* =====================================================
   13. DARK / LIGHT THEME TOGGLE
   ===================================================== */
(function () {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;
  const icon = toggleBtn.querySelector('.theme-icon');

  // Check stored theme or default to dark
  const storedTheme = localStorage.getItem('theme') || 'dark';
  if (storedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (icon) icon.textContent = '☀️';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (icon) icon.textContent = '🌙';
  }

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    if (icon) {
      icon.textContent = newTheme === 'light' ? '☀️' : '🌙';
    }
  });
})();

/* =====================================================
   14. MAILTO & EMAIL COPY TO CLIPBOARD WITH TOAST
   ===================================================== */
(function () {
  function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'toast-notification';
      toast.innerHTML = `<span class="toast-icon">📧</span><span class="toast-text"></span>`;
      document.body.appendChild(toast);
    }
    toast.querySelector('.toast-text').textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
      const email = link.getAttribute('href').replace('mailto:', '');
      if (navigator.clipboard && email) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Email address (${email}) copied to clipboard! Opening mail app...`);
        }).catch(() => {
          showToast(`Opening email application for ${email}...`);
        });
      }
    });
  });
})();


