/* ==============================================
   NEON PORTFOLIO — JavaScript
   Black & Red Electric Edition
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* =============================================
     0. THEME TOGGLE (Dark/Light Mode)
     ============================================= */
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

  function setTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem('portfolio-theme', theme);
  }

  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  /* =============================================
     1. SMOOTH PAGE LOAD (fade-in instead of loader)
     ============================================= */
  const loader = document.getElementById('loader');

  if (loader) {
    // Instantly fade out the loader for a smooth page entry
    requestAnimationFrame(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
      // Trigger hero decorations after a tiny delay
      setTimeout(spawnHeroDecorations, 50);
    });
  } else {
    setTimeout(spawnHeroDecorations, 50);
  }


  /* =============================================
     2. HERO GLITCH DECORATIONS
     ============================================= */
  function spawnHeroDecorations() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const linesL = [
      '// portfolio v4.0',
      'import { creativity }',
      'from "alex-morgan";',
      'const skill = ∞;',
      'while(true) { build(); }',
    ];
    const linesR = [
      '> npm run dev',
      '✓ compiled in 0.3s',
      '> listening on :3000',
      '⚡ neon.mode = "red"',
      '// systems.nominal = true',
    ];

    const decoL = document.createElement('div');
    decoL.className = 'glitch-deco deco-tl';
    decoL.innerHTML = linesL.join('<br>');

    const decoR = document.createElement('div');
    decoR.className = 'glitch-deco deco-br';
    decoR.innerHTML = linesR.join('<br>');

    hero.appendChild(decoL);
    hero.appendChild(decoR);
  }


  /* =============================================
     3. STATIC GRID BACKGROUND
     ============================================= */
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      drawGridPattern();
    }

    function drawGridPattern() {
      ctx.clearRect(0, 0, W, H);
      const isLightMode = document.body.classList.contains('light-mode');

      // Grid settings
      const cellSize = 50;

      // Static subtle colors
      let gridColor = isLightMode
        ? 'rgba(0, 150, 136, 0.06)'
        : 'rgba(255, 0, 64, 0.08)';

      let blockColor = isLightMode
        ? 'rgba(0, 160, 140, 0.12)'
        : 'rgba(255, 0, 64, 0.15)';

      // Draw main grid - thin lines
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 0.8;

      // Vertical lines
      for (let x = 0; x < W; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < H; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Draw stronger accent blocks
      ctx.strokeStyle = blockColor;
      ctx.lineWidth = 1.5;

      // Seed for consistent pattern
      let seed = 42;
      function seededRandom() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      }

      // Draw accent rectangular blocks
      for (let row = 0; row < Math.ceil(H / cellSize) + 1; row++) {
        for (let col = 0; col < Math.ceil(W / cellSize) + 1; col++) {
          if (seededRandom() > 0.6) continue;

          const x = col * cellSize;
          const y = row * cellSize;

          // Random block size (1-2 cells)
          const blockWidth = (Math.floor(seededRandom() * 1.8) + 1) * cellSize;
          const blockHeight = (Math.floor(seededRandom() * 1.8) + 1) * cellSize;

          // Main block outline
          ctx.strokeStyle = blockColor;
          ctx.strokeRect(x, y, blockWidth, blockHeight);

          // Corner accents (like in design.webp)
          const cornerLen = Math.min(blockWidth, blockHeight) * 0.15;
          ctx.lineWidth = 1;
          ctx.strokeStyle = isLightMode
            ? 'rgba(0, 170, 150, 0.15)'
            : 'rgba(255, 0, 64, 0.2)';

          // Top-left corner
          ctx.beginPath();
          ctx.moveTo(x, y + cornerLen);
          ctx.lineTo(x, y);
          ctx.lineTo(x + cornerLen, y);
          ctx.stroke();

          // Top-right corner
          ctx.beginPath();
          ctx.moveTo(x + blockWidth - cornerLen, y);
          ctx.lineTo(x + blockWidth, y);
          ctx.lineTo(x + blockWidth, y + cornerLen);
          ctx.stroke();

          // Bottom-left corner
          ctx.beginPath();
          ctx.moveTo(x, y + blockHeight - cornerLen);
          ctx.lineTo(x, y + blockHeight);
          ctx.lineTo(x + cornerLen, y + blockHeight);
          ctx.stroke();

          // Bottom-right corner
          ctx.beginPath();
          ctx.moveTo(x + blockWidth - cornerLen, y + blockHeight);
          ctx.lineTo(x + blockWidth, y + blockHeight);
          ctx.lineTo(x + blockWidth, y + blockHeight - cornerLen);
          ctx.stroke();
        }
      }
    }

    resize();
    window.addEventListener('resize', resize);
  }


  /* =============================================
     4. SCROLL PROGRESS BAR (THROTTLED)
     ============================================= */
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const total = document.documentElement.scrollHeight - window.innerHeight;
          progressBar.style.width = total > 0 ? (window.scrollY / total * 100) + '%' : '0%';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }


  /* =============================================
     5. CUSTOM CURSOR (OPTIMIZED)
     ============================================= */
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  const isDesktop = window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 1024;

  if (isDesktop && cursor && trail) {
    let mx = 0, my = 0, cx = 0, cy = 0, tx = 0, ty = 0;
    let animating = true;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    document.addEventListener('mouseleave', () => { animating = false; });
    document.addEventListener('mouseenter', () => { animating = true; });

    function animateCursor() {
      if (animating) {
        cx += (mx - cx) * 0.25;
        cy += (my - cy) * 0.25;
        cursor.style.transform = `translate(${cx}px, ${cy}px)`;

        tx += (mx - tx) * 0.1;
        ty += (my - ty) * 0.1;
        trail.style.transform = `translate(${tx}px, ${ty}px)`;
      }
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Removed hover enlargement to keep the cursor as a small red dot only.
    // Previously the cursor grew into a ring on interactive elements; that behavior was removed per request.
  }


  /* =============================================
     6. NAV SCROLL + HAMBURGER
     ============================================= */
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // Active section highlight (THROTTLED)
  const sections = document.querySelectorAll('section[id]');
  let navTicking = false;
  window.addEventListener('scroll', () => {
    if (!navTicking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY + 200;
        sections.forEach(sec => {
          const id = sec.getAttribute('id');
          const link = document.querySelector(`.nav-link[href="#${id}"]`);
          if (link) {
            const active = scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight;
            link.classList.toggle('active', active);
            if (active) moveNavPill(link);
          }
        });
        navTicking = false;
      });
      navTicking = true;
    }
  }, { passive: true });


  /* =============================================
     7. GLIDING NAV PILL
     ============================================= */
  const navPill = document.getElementById('navPill');

  function moveNavPill(activeLink) {
    if (!navPill || !activeLink || !navLinks) return;
    const parentRect = navLinks.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    navPill.style.left = (linkRect.left - parentRect.left) + 'px';
    navPill.style.width = linkRect.width + 'px';
    navPill.style.top = ((navLinks.offsetHeight - 32) / 2) + 'px';
  }


  // Ensure nav-pill is positioned correctly after DOM load and on resize
  function updateNavPillToActive() {
    const current = document.querySelector('.nav-link.active');
    if (current) moveNavPill(current);
  }

  // Initial position after DOM load
  setTimeout(updateNavPillToActive, 150);

  // Update on window resize
  window.addEventListener('resize', updateNavPillToActive);

  links.forEach(link => {
    link.addEventListener('mouseenter', () => moveNavPill(link));
    link.addEventListener('mouseleave', updateNavPillToActive);
  });


  /* =============================================
     8. SMOOTH SCROLL
     ============================================= */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight - 16;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });


  /* =============================================
     9. SCROLL REVEAL
     ============================================= */
  document.querySelectorAll('.scroll-reveal').forEach(el => {
    el.style.setProperty('--d', el.dataset.delay || 0);

    // Hero children use CSS stagger animations — pre-mark them visible
    // so the scroll-reveal opacity:0 doesn't conflict.
    if (el.closest('#home')) {
      el.classList.add('visible');
    }
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -60px 0px'  // trigger 60px before element enters viewport
  });

  document.querySelectorAll('.scroll-reveal').forEach(el => {
    // Skip hero elements — already handled above
    if (!el.closest('#home')) revealObserver.observe(el);
  });


  /* =============================================
     10. TEXT SCRAMBLE ON SECTION TITLES
     ============================================= */
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&⚡';

  function scrambleText(el) {
    const original = el.getAttribute('data-original') || el.textContent;
    el.setAttribute('data-original', original);
    let frame = 0;
    const totalFrames = original.length * 3;

    const tick = setInterval(() => {
      el.textContent = original.split('').map((ch, i) => {
        if (ch === ' ') return ' ';
        if (frame > i * 3) return ch;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');
      frame++;
      if (frame > totalFrames) clearInterval(tick);
    }, 28);
  }

  const scrambleObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const title = entry.target;
        const textNode = [...title.childNodes].find(n => n.nodeType === 3 && n.textContent.trim());
        if (textNode) {
          const span = document.createElement('span');
          span.textContent = textNode.textContent;
          title.replaceChild(span, textNode);
          scrambleText(span);
        }
        scrambleObserver.unobserve(title);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.section-title').forEach(t => scrambleObserver.observe(t));


  /* =============================================
     11. STAGGERED TECH ICON ENTRY
     ============================================= */
  const iconObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.tech-icon').forEach((icon, i) => {
          setTimeout(() => icon.classList.add('icon-visible'), i * 55);
        });
        iconObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const stackGrid = document.querySelector('.stack-icons');
  if (stackGrid) iconObserver.observe(stackGrid);

  /* =============================================
     11b. GRADE CIRCLE ANIMATION (NEW)
     ============================================= */
  const gradeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('grade-animated')) {
        entry.target.classList.add('grade-animated');
        gradeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -20px 0px' });

  document.querySelectorAll('.grade-progress').forEach(circle => {
    gradeObserver.observe(circle);
  });

  /* =============================================
     12. TYPING EFFECT
     ============================================= */
  const typedEl = document.getElementById('typedWords');
  const words = [
    'MERN stack apps.',
    'scalable backends.',
    'AI systems.',
    'elegant code.',
    'full-stack solutions.',
    'innovative products.'
  ];
  let wordIdx = 0, charIdx = 0, deleting = false;

  function typeLoop() {
    const current = words[wordIdx];
    if (!deleting) {
      typedEl.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        setTimeout(() => { deleting = true; typeLoop(); }, 2200);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) { deleting = false; wordIdx = (wordIdx + 1) % words.length; }
    }
    setTimeout(typeLoop, deleting ? 35 : 75);
  }
  if (typedEl) typeLoop();


  /* =============================================
     13. COUNTER ANIMATION (smooth ease-out cubic)
     ============================================= */
  let countersDone = false;

  function animateCounters() {
    document.querySelectorAll('.num[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      const start = performance.now();
      const duration = target > 1000 ? 2200 : 1600;
      const tick = now => {
        const p = Math.min((now - start) / duration, 1);
        // Ease-out cubic: feels natural as numbers slow at the end
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !countersDone) {
        countersDone = true;
        setTimeout(animateCounters, 500);
      }
    }, { threshold: 0.3 }).observe(aboutSection);
  }


  /* =============================================
     14. 3D TILT — CARDS
     ============================================= */
  function addTilt(selector, rx, ry, ty) {
    document.querySelectorAll(selector).forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        /* Use a very short transition instead of 'none' to avoid jerky snapping.
           Setting transition to 'none' causes visible shaking when combined with
           CSS transition declarations that get re-applied on mouseleave. */
        card.style.transition = 'transform 0.08s linear';
        card.style.transform = `perspective(700px) rotateY(${x * rx}deg) rotateX(${-y * ry}deg) translateY(-${ty}px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
        card.style.transform = '';
      });
    });
  }

  addTilt('.tech-icon', 12, 12, 6);
  addTilt('.project-card', 6, 6, 8);
  addTilt('.cert-card', 8, 8, 6);
  addTilt('.exp-card', 5, 5, 4);
  addTilt('.achieve-card', 8, 8, 6);

  /* =============================================
     14b. RIPPLE EFFECT — ALL BUTTONS
     ============================================= */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top:  ${e.clientY - rect.top  - size / 2}px;
      `;
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });


  /* =============================================
     15. CONTACT FORM
     ============================================= */
  // Handled by EmailJS in emailjs-config.js

  /* =============================================
     16. UNIFIED SCROLL HANDLER
     (nav + parallax glows + section dots — one rAF loop, passive)
     ============================================= */
  const glows = document.querySelectorAll('.glow');
  // Combine ALL scroll-driven updates into one requestAnimationFrame per frame
  let _scrollY = 0;
  let _scrollTicking = false;

  function onScrollFrame() {
    _scrollY = window.scrollY;

    // Nav scrolled class
    nav.classList.toggle('scrolled', _scrollY > 50);

    // Parallax glows — translateY only (GPU composited, no scale)
    glows.forEach((g, i) => {
      g.style.transform = `translateY(${_scrollY * (i + 1) * 0.022}px)`;
    });

    _scrollTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!_scrollTicking) {
      requestAnimationFrame(onScrollFrame);
      _scrollTicking = true;
    }
  }, { passive: true });


  /* =============================================
     17. MAGNETIC SOCIAL ICONS
     ============================================= */
  document.querySelectorAll('.social-icon, .contact-socials a, .back-top').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.28}px, ${(e.clientY - rect.top - rect.height / 2) * 0.28}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });


  /* =============================================
     18. TOAST NOTIFICATION
     ============================================= */
  function showToast(msg, duration = 3000) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
  }


  /* =============================================
     19. SIDEBAR SECTION DOTS
     ============================================= */
  const sectionIds = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'softskills', label: 'Soft Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'certs', label: 'Certs' },
    { id: 'achievements', label: 'Awards' },
    { id: 'codingprofiles', label: 'Coding' },
    { id: 'contact', label: 'Contact' },
  ];

  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'section-dots';

  sectionIds.forEach(({ id, label }) => {
    const dot = document.createElement('div');
    dot.className = 'section-dot';
    dot.setAttribute('data-label', label);
    dot.setAttribute('data-target', id);
    dot.addEventListener('click', () => {
      const target = document.getElementById(id);
      if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight - 16, behavior: 'smooth' });
    });
    dotsContainer.appendChild(dot);
  });
  document.body.appendChild(dotsContainer);

  const allDots = dotsContainer.querySelectorAll('.section-dot');

  window.addEventListener('scroll', () => {
    const mid = window.scrollY + window.innerHeight / 2;
    let closest = 0, closestDist = Infinity;
    sectionIds.forEach(({ id }, i) => {
      const sec = document.getElementById(id);
      if (!sec) return;
      const dist = Math.abs(mid - (sec.offsetTop + sec.offsetHeight / 2));
      if (dist < closestDist) { closestDist = dist; closest = i; }
    });
    allDots.forEach((dot, i) => dot.classList.toggle('dot-active', i === closest));
  });


  /* =============================================
     20. CERT CARD  — RIPPLE EFFECT ON CLICK
     ============================================= */
  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', e => {
      const ripple = document.createElement('span');
      const rect = card.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position:absolute;
        width:${size}px;height:${size}px;
        left:${e.clientX - rect.left - size / 2}px;
        top:${e.clientY - rect.top - size / 2}px;
        background:rgba(255,0,64,0.1);
        border-radius:50%;
        transform:scale(0);
        animation:rippleAnim 0.6s ease-out forwards;
        pointer-events:none;
      `;
      if (!document.querySelector('#rippleStyle')) {
        const style = document.createElement('style');
        style.id = 'rippleStyle';
        style.textContent = '@keyframes rippleAnim{to{transform:scale(3);opacity:0}}';
        document.head.appendChild(style);
      }
      card.style.position = 'relative';
      card.style.overflow = 'hidden';
      card.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });


  /* =============================================
     21. KONAMI CODE EASTER EGG 🎮 (RED MATRIX)
     ============================================= */
  const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIdx = 0;

  document.addEventListener('keydown', e => {
    if (e.key === KONAMI[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === KONAMI.length) {
        konamiIdx = 0;
        launchEasterEgg();
      }
    } else {
      konamiIdx = 0;
    }
  });

  function launchEasterEgg() {
    const overlay = document.createElement('div');
    overlay.className = 'easter-egg-overlay';

    const matrixCanvas = document.createElement('canvas');
    matrixCanvas.className = 'matrix-canvas';

    const msg = document.createElement('div');
    msg.className = 'easter-egg-msg';
    msg.innerHTML = `
      <h2>⚡ RED MATRIX UNLOCKED ⚡</h2>
      <p>↑↑↓↓←→←→BA — You found the secret.</p>
      <div class="easter-egg-close" id="eggClose">[ CLOSE ]</div>
    `;

    overlay.appendChild(matrixCanvas);
    overlay.appendChild(msg);
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('active'));

    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    const mCtx = matrixCanvas.getContext('2d');
    const cols = Math.floor(window.innerWidth / 16);
    const drops = Array(cols).fill(1);
    const matChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF</>{}[]⚡';

    function drawMatrix() {
      mCtx.fillStyle = 'rgba(4,0,1,0.06)';
      mCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
      mCtx.font = '14px "Fira Code", monospace';

      drops.forEach((y, i) => {
        const ch = matChars[Math.floor(Math.random() * matChars.length)];
        mCtx.fillStyle = Math.random() > 0.95 ? '#ff4d4d' : 'rgba(255,0,64,0.7)';
        mCtx.shadowColor = '#ff0040';
        mCtx.shadowBlur = 4;
        mCtx.fillText(ch, i * 16, y * 16);
        mCtx.shadowBlur = 0;
        if (y * 16 > matrixCanvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }

    const matrixLoop = setInterval(drawMatrix, 40);

    overlay.querySelector('#eggClose').addEventListener('click', () => {
      clearInterval(matrixLoop);
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 600);
      showToast('MATRIX DISENGAGED. BACK TO REALITY.');
    });
  }

  /* =============================================
     22. COUNTER ANIMATION (Numbers count-up)
     ============================================= */
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.num[data-count]');
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-count'));
          const duration = 2000; // 2 seconds
          const increment = target / (duration / 16);
          let current = 0;

          const countUp = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(countUp);
            } else {
              counter.textContent = target;
            }
          };

          if (counter.textContent === '0') countUp();
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const aboutGridSection = document.querySelector('.about-grid');
  if (aboutGridSection) counterObserver.observe(aboutGridSection);

  /* =============================================
     23. (unified scroll handler — see section 16)
     ============================================= */
  // Parallax and scroll updates consolidated above.

  /* =============================================
     28. TECH STACK FILTER
     ============================================= */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const techIcons = document.querySelectorAll('.tech-icon');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // Filter icons
      techIcons.forEach(icon => {
        const category = icon.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          icon.classList.remove('hidden');
        } else {
          icon.classList.add('hidden');
        }
      });
    });
  });

  // Show all tech icons initially
  techIcons.forEach(icon => icon.classList.remove('hidden'));

  /* =============================================
     29. PROJECT MODAL
     ============================================= */
  const projectData = [
    {
      id: 0,
      title: 'ORDIX — Restaurant Operations Management System',
      icon: '<i class="fas fa-utensils"></i>',
      date: 'Sep 2026',
      overview: 'ORDIX is a single-restaurant internal web app covering table management, menu, orders, kitchen display, billing, payments (cash + Razorpay test mode), inventory, and reporting. Designed as a modular monolith with real-time updates and role-based access control.',
      features: [
        'Table management and occupancy tracking',
        'Menu management with categories and items',
        'Order lifecycle: New → Preparing → Ready → Served',
        'Kitchen Display System with real-time Socket.IO updates',
        'Billing and payments (Cash + Razorpay Test Mode)',
        'Inventory tracking and ingredient usage',
        'Reporting: revenue, top items, table utilization, payment breakdown',
        'JWT authentication, RBAC, Sequelize ORM with PostgreSQL/Neon'
      ],
      tech: ['Node.js', 'Express', 'Sequelize', 'PostgreSQL', 'React', 'Vite', 'Tailwind CSS', 'Socket.IO', 'JWT', 'Razorpay (Test)'],
      liveLink: '#',
      gitLink: 'https://github.com/murali-krishna-palla/restaurant-manager'
    },
    {
      id: 1,
      title: 'AI ATS Resume Analyzer',
      icon: '<i class="fas fa-file-pdf"></i>',
      date: 'Feb 2026',
      overview: 'Resume analysis system that improves job-matching accuracy by 40%. Built with advanced PDF parsing and LLM-based evaluation to provide intelligent resume scoring.',
      features: [
        'Keyword scoring and ATS optimization',
        'PDF parsing and text extraction',
        'LLM-based job match evaluation',
        'Detailed feedback and suggestions',
        'Real-time resume scoring'
      ],
      tech: ['Python', 'Flask', 'Gemini API', 'PyPDF2', 'NLP', 'Machine Learning'],
      liveLink: '#',
      gitLink: 'https://github.com/murali-krishna-palla/ATS_Analyzer'
    },
    {
      id: 2,
      title: 'Finora',
      icon: '<i class="fas fa-wallet"></i>',
      date: 'Mar 2026',
      overview: 'Personal finance management platform with JWT authentication, comprehensive analytics dashboard, and transaction management. Built with modern web technologies.',
      features: [
        'Secure JWT-based authentication',
        'Transaction tracking and categorization',
        'Analytics dashboard with Chart.js visualizations',
        'Spending insights and budget planning',
        'Export financial reports'
      ],
      tech: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'Express.js', 'Tailwind CSS'],
      liveLink: 'https://expense-tracker-7zjk93fah-muralis-projects-53a36327.vercel.app/',
      gitLink: 'https://github.com/murali-krishna-palla/Expense-Tracker'
    },
    {
      id: 3,
      title: 'Nyaya AI',
      icon: '<i class="fas fa-scale-balanced"></i>',
      date: 'Apr 2026',
      overview: 'AI-powered legal assistant that simplifies complex legal jargon and provides accessible legal guidance. Helps users understand laws and rights using advanced NLP.',
      features: [
        'Simple legal jargon translation',
        'AI-powered legal guidance',
        'Case law recommendations',
        'Legal rights explanations',
        'User-friendly interface'
      ],
      tech: ['React', 'Node.js', 'Firebase', 'Gemini API', 'Natural Language Processing'],
      liveLink: 'https://nyaya-ai-roan.vercel.app/',
      gitLink: 'https://github.com/murali-krishna-palla/Nyaya-AI'
    },
    {
      id: 4,
      title: 'GitScope',
      icon: '<i class="fas fa-code-branch"></i>',
      date: 'May 2026',
      overview: 'GitHub profile analyzer that provides deep insights into coding activity, repositories, and development performance. Transforms raw data into meaningful analytics.',
      features: [
        'GitHub profile data retrieval',
        'Coding activity analytics',
        'Repository performance metrics',
        'Contribution patterns analysis',
        'Real-time data visualization'
      ],
      tech: ['React', 'Node.js', 'GitHub API', 'Chart.js', 'Redux', 'Tailwind CSS'],
      liveLink: 'https://git-scope-seven.vercel.app/',
      gitLink: 'https://github.com/murali-krishna-palla/GitScope'
    },
    {
      id: 5,
      title: 'Auth System',
      icon: '<i class="fas fa-lock"></i>',
      date: 'Jun 2026',
      overview: 'Full-stack authentication application with user registration, JWT-based login, protected routes, and profile management. Built with best security practices.',
      features: [
        'User registration and email verification',
        'JWT-based secure authentication',
        'Protected API routes and middleware',
        'User profile management',
        'Password reset functionality',
        'Session management'
      ],
      tech: ['React', 'Node.js', 'Express', 'JWT', 'MongoDB', 'Tailwind CSS', 'Bcryptjs'],
      liveLink: '#',
      gitLink: 'https://github.com/murali-krishna-palla/auth_app'
    },
    {
      id: 6,
      title: 'Todo List',
      icon: '<i class="fas fa-list-check"></i>',
      date: 'Jul 2026',
      overview: 'Full-stack todo application with add, edit, delete, and mark complete features. Persistent storage with MongoDB and responsive UI.',
      features: [
        'Create, read, update, delete todos',
        'Mark todos as complete',
        'Persistent MongoDB storage',
        'Responsive design',
        'Real-time updates',
        'User authentication'
      ],
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Vite', 'Tailwind CSS'],
      liveLink: '#',
      gitLink: 'https://github.com/murali-krishna-palla/todo-_list'
    },
    {
      id: 7,
      title: 'VocalFlow Web',
      icon: '<i class="fas fa-microphone"></i>',
      date: 'Aug 2026',
      overview: 'Voice-first real-time transcription platform with hotkey-driven workflow, AI post-processing, and secure token management. Powered by Deepgram and Groq.',
      features: [
        'Real-time speech-to-text transcription',
        'Hotkey-driven workflow',
        'AI post-processing of transcripts',
        'WebSocket real-time communication',
        'Secure token management',
        'Multiple language support'
      ],
      tech: ['React', 'Node.js', 'WebSocket', 'Deepgram API', 'Groq AI', 'MongoDB', 'TypeScript'],
      liveLink: 'https://project-khaki-seven-50.vercel.app/',
      gitLink: 'https://github.com/murali-krishna-palla/project'
    }
  ];

  const projectModal = document.getElementById('projectModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const closeModal = document.getElementById('closeModal');
  const viewDetailsBtns = document.querySelectorAll('.view-details-btn');

  // Open modal
  viewDetailsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = parseInt(btn.getAttribute('data-project'));
      const project = projectData[projectId];

      if (project) {
        document.getElementById('modalIcon').innerHTML = project.icon;
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDate').textContent = `${project.date} · Ongoing`;
        document.getElementById('modalOverview').textContent = project.overview;

        // Features list
        const featuresList = document.getElementById('modalFeatures');
        featuresList.innerHTML = '';
        project.features.forEach(feature => {
          const li = document.createElement('li');
          li.textContent = feature;
          featuresList.appendChild(li);
        });

        // Tech tags
        const techContainer = document.getElementById('modalTechs');
        techContainer.innerHTML = '';
        project.tech.forEach(tech => {
          const tag = document.createElement('span');
          tag.className = 'modal-tech-tag';
          tag.textContent = tech;
          techContainer.appendChild(tag);
        });

        // Links
        const modalLiveLink = document.getElementById('modalLiveLink');
        const modalGitLink = document.getElementById('modalGitLink');

        if (project.liveLink === '#') {
          modalLiveLink.style.display = 'none';
        } else {
          modalLiveLink.style.display = 'inline-flex';
          modalLiveLink.href = project.liveLink;
          modalLiveLink.onclick = (e) => {
            e.preventDefault();
            window.open(project.liveLink, '_blank');
          };
        }

        modalGitLink.href = project.gitLink;
        modalGitLink.onclick = (e) => {
          e.preventDefault();
          window.open(project.gitLink, '_blank');
        };

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal
  function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Prevent closing modal when clicking inside modal-content
  const modalContent = document.querySelector('.modal-content');
  if (modalContent) {
    modalContent.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  closeModal.addEventListener('click', closeProjectModal);
  modalOverlay.addEventListener('click', closeProjectModal);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
      closeProjectModal();
    }
  });

  /* =============================================
     28. PORTFOLIO SHARE FUNCTIONALITY
     ============================================= */
  const portfolioLink = document.getElementById('portfolioLink');
  const copyBtn = document.getElementById('copyBtn');
  const shareLinkedin = document.getElementById('shareLinkedin');
  const shareEmail = document.getElementById('shareEmail');

  if (portfolioLink) {
    // Keep the portfolio URL from HTML (Vercel link)
    const portfolioUrl = 'https://murali-krishna-palla.github.io/portofolio/';
    portfolioLink.value = portfolioUrl;

    // Copy to clipboard
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        portfolioLink.select();
        document.execCommand('copy');
        const original = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';
        showToast('PORTFOLIO LINK COPIED ✓');
        setTimeout(() => {
          copyBtn.innerHTML = original;
        }, 2000);
      });
    }

    // Share on LinkedIn
    if (shareLinkedin) {
      shareLinkedin.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(portfolioUrl)}`, '_blank', 'width=600,height=400');
      });
    }

    // Share via Gmail
    if (shareEmail) {
      shareEmail.addEventListener('click', (e) => {
        e.preventDefault();
        const subject = encodeURIComponent('Check out my Portfolio!');
        const body = encodeURIComponent(`Hey! I'd like to share my portfolio with you:\n\n${portfolioUrl}\n\nBest regards,\nMurali Krishna`);
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=pmuralikrishna520@gmail.com&su=${subject}&body=${body}`, '_blank');
      });
    }
  }

});
