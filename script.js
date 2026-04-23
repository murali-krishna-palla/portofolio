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
     1. CINEMATIC BOOT LOADER
     ============================================= */
  const loader = document.getElementById('loader');
  const loaderStatus = document.getElementById('loaderStatus');

  if (loader) {
    let progress = 0;
    const messages = [
      'Initializing...',
      'Loading projects...',
      'Compiling code...',
      'Optimizing...',
      'Ready!'
    ];

    const interval = setInterval(() => {
      progress += Math.random() * 12 + 5;
      if (progress > 100) progress = 100;

      const msgIdx = Math.floor((progress / 100) * (messages.length - 1));
      loaderStatus.textContent = messages[msgIdx];

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          loader.classList.add('hidden');
          document.body.style.overflow = '';
          spawnHeroDecorations();
        }, 300);
      }
    }, 80);

    document.body.style.overflow = 'hidden';
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
     3. INTERACTIVE PARTICLE CANVAS (RED/BLUE)
     ============================================= */
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    const mouse = { x: -999, y: -999 };
    const PARTICLE_COUNT  = 90;
    const CONNECT_DISTANCE = 140;
    const MOUSE_REPEL     = 120;

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', () => { resize(); initParticles(); });
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

    class Particle {
      constructor() { this.reset(true); }
      reset(init) {
        this.x     = Math.random() * W;
        this.y     = init ? Math.random() * H : -10;
        this.vx    = (Math.random() - 0.5) * 0.4;
        this.vy    = Math.random() * 0.4 + 0.15;
        this.r     = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.2;
        this.pulse = Math.random() * Math.PI * 2;
      }
      update() {
        this.pulse += 0.02;
        this.alpha = 0.2 + Math.sin(this.pulse) * 0.15;

        const dx   = this.x - mouse.x;
        const dy   = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_REPEL) {
          const force = (MOUSE_REPEL - dist) / MOUSE_REPEL * 0.8;
          this.vx += (dx / dist) * force;
          this.vy += (dy / dist) * force;
        }

        this.vx *= 0.97;
        this.vy *= 0.97;
        this.x  += this.vx;
        this.y  += this.vy;

        if (this.y > H + 10) this.reset(false);
        if (this.x < -10)    this.x = W + 10;
        if (this.x > W + 10) this.x = -10;
      }
      draw() {
        const isLightMode = document.body.classList.contains('light-mode');
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        
        if (isLightMode) {
          // Dark teal color for light mode background
          ctx.fillStyle  = `rgba(12, 76, 90, ${this.alpha * 2})`;
          ctx.shadowColor = '#0c4c5a';
          ctx.shadowBlur  = 6;
        } else {
          // Red neon for dark mode
          ctx.fillStyle  = `rgba(255, 0, 64, ${this.alpha})`;
          ctx.shadowColor = '#ff0040';
          ctx.shadowBlur  = 8;
        }
        
        ctx.fill();
        ctx.shadowBlur  = 0;
      }
    }

    function initParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    }
    initParticles();

    function connectParticles() {
      const isLightMode = document.body.classList.contains('light-mode');
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DISTANCE) {
            const baseAlpha = (1 - dist / CONNECT_DISTANCE) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            if (isLightMode) {
              // Dark teal lines for light mode
              ctx.strokeStyle = `rgba(12, 76, 90, ${baseAlpha * 1.5})`;
              ctx.lineWidth   = 0.9;
            } else {
              // Red neon lines for dark mode
              ctx.strokeStyle = `rgba(255, 0, 64, ${baseAlpha})`;
              ctx.lineWidth   = 0.6;
            }
            
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      connectParticles();
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }


  /* =============================================
     4. SCROLL PROGRESS BAR
     ============================================= */
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = total > 0 ? (window.scrollY / total * 100) + '%' : '0%';
    });
  }


  /* =============================================
     5. CUSTOM CURSOR
     ============================================= */
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursorTrail');

  if (window.matchMedia('(pointer: fine)').matches && cursor && trail) {
    let mx = 0, my = 0, cx = 0, cy = 0, tx = 0, ty = 0;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    function animateCursor() {
      cx += (mx - cx) * 0.25;
      cy += (my - cy) * 0.25;
      cursor.style.left = cx + 'px';
      cursor.style.top  = cy + 'px';

      tx += (mx - tx) * 0.1;
      ty += (my - ty) * 0.1;
      trail.style.left = tx + 'px';
      trail.style.top  = ty + 'px';

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .tech-icon, .project-card, .social-icon, .section-dot, .cert-card, .exp-card, .achieve-card').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); trail.classList.add('hover'); });
      el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); trail.classList.remove('hover'); });
    });
  }


  /* =============================================
     6. NAV SCROLL + HAMBURGER
     ============================================= */
  const nav       = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const links     = document.querySelectorAll('.nav-link');

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

  // Active section highlight
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 200;
    sections.forEach(sec => {
      const id   = sec.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        const active = scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight;
        link.classList.toggle('active', active);
        if (active) moveNavPill(link);
      }
    });
  });


  /* =============================================
     7. GLIDING NAV PILL
     ============================================= */
  const navPill = document.getElementById('navPill');

  function moveNavPill(activeLink) {
    if (!navPill || !activeLink || !navLinks) return;
    const parentRect = navLinks.getBoundingClientRect();
    const linkRect   = activeLink.getBoundingClientRect();
    navPill.style.left  = (linkRect.left - parentRect.left) + 'px';
    navPill.style.width = linkRect.width + 'px';
    navPill.style.top   = ((navLinks.offsetHeight - 32) / 2) + 'px';
  }

  const initActive = document.querySelector('.nav-link.active');
  if (initActive) setTimeout(() => moveNavPill(initActive), 150);

  links.forEach(link => {
    link.addEventListener('mouseenter', () => moveNavPill(link));
    link.addEventListener('mouseleave', () => {
      const current = document.querySelector('.nav-link.active');
      if (current) moveNavPill(current);
    });
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
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));


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
     13. COUNTER ANIMATION
     ============================================= */
  let countersDone = false;

  function animateCounters() {
    document.querySelectorAll('.num[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      const start  = performance.now();
      const tick   = now => {
        const p = Math.min((now - start) / 1800, 1);
        el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
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
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `perspective(700px) rotateY(${x*rx}deg) rotateX(${-y*ry}deg) translateY(-${ty}px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  addTilt('.tech-icon',    12, 12, 6);
  addTilt('.project-card',  6,  6, 8);
  addTilt('.cert-card',     8,  8, 6);
  addTilt('.exp-card',      5,  5, 4);
  addTilt('.achieve-card',  8,  8, 6);


  /* =============================================
     15. CONTACT FORM
     ============================================= */
  // Handled by EmailJS in emailjs-config.js

  /* =============================================
     16. PARALLAX GLOWS ON SCROLL
     ============================================= */
  const glows = document.querySelectorAll('.glow');
  let scrollTick = false;
  window.addEventListener('scroll', () => {
    if (!scrollTick) {
      requestAnimationFrame(() => {
        glows.forEach((g, i) => { g.style.transform = `translateY(${window.scrollY * (i+1) * 0.018}px)`; });
        scrollTick = false;
      });
      scrollTick = true;
    }
  });


  /* =============================================
     17. MAGNETIC SOCIAL ICONS
     ============================================= */
  document.querySelectorAll('.social-icon, .contact-socials a, .back-top').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - rect.left - rect.width/2)*0.28}px, ${(e.clientY - rect.top - rect.height/2)*0.28}px)`;
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
    { id: 'home',         label: 'Home' },
    { id: 'about',        label: 'About' },
    { id: 'skills',       label: 'Skills' },
    { id: 'softskills',   label: 'Soft Skills' },
    { id: 'experience',   label: 'Experience' },
    { id: 'education',    label: 'Education' },
    { id: 'projects',     label: 'Projects' },
    { id: 'certs',        label: 'Certs' },
    { id: 'achievements', label: 'Awards' },
    { id: 'contact',      label: 'Contact' },
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
      const rect   = card.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position:absolute;
        width:${size}px;height:${size}px;
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY - rect.top - size/2}px;
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
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
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

    matrixCanvas.width  = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    const mCtx  = matrixCanvas.getContext('2d');
    const cols  = Math.floor(window.innerWidth / 16);
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
        mCtx.shadowBlur  = 4;
        mCtx.fillText(ch, i * 16, y * 16);
        mCtx.shadowBlur  = 0;
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
     23. 3D TILT CARD EFFECT
     ============================================= */
  const tiltCards = document.querySelectorAll('.project-card, .exp-card');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateY = (x - centerX) / 10;
      const rotateX = (centerY - y) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });

  /* =============================================
     24. FLOATING ANIMATION FOR ELEMENTS
     ============================================= */
  const floatElements = document.querySelectorAll('.project-card, .exp-card');
  floatElements.forEach(el => {
    el.style.animation = 'float-bounce 8s ease-in-out infinite';
  });

  /* =============================================
     25. ENHANCED PARALLAX EFFECT
     ============================================= */
  let parallaxTicking = false;
  
  window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
      requestAnimationFrame(() => {
        // Parallax for background glows
        const scrollY = window.scrollY;
        glows.forEach((g, i) => {
          g.style.transform = `translateY(${scrollY * (i + 1) * 0.03}px) scale(${1 + scrollY * 0.0001})`;
        });

        // Parallax for cards
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, i) => {
          const cardTop = card.getBoundingClientRect().top;
          const offset = (window.innerHeight - cardTop) * 0.015;
          card.style.transform = `translateY(${offset}px)`;
        });

        parallaxTicking = false;
      });
      parallaxTicking = true;
    }
  });

  /* =============================================
     26. GRADIENT TEXT ANIMATION ON TITLES
     ============================================= */
  const gradientTexts = document.querySelectorAll('.gradient-text, h1, h2, h3');
  gradientTexts.forEach((text, i) => {
    if (Math.random() > 0.5) {
      text.classList.add('gradient-text');
    }
  });

  /* =============================================
     27. STAGGERED ELEMENT ENTRANCE
     ============================================= */
  const staggerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.querySelectorAll('.exp-card, .project-card, li');
        children.forEach((child, i) => {
          setTimeout(() => {
            child.style.animation = 'fadeInUp 1s ease-out forwards';
          }, i * 100);
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.experience-list, .projects-container, .skills-list').forEach(el => {
    staggerObserver.observe(el);
  });

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
      title: 'PathForge AI',
      icon: '<i class="fas fa-robot"></i>',
      date: 'Jan 2026',
      overview: 'AI-powered career roadmap platform that generates personalized guidance based on user skills and goals. The platform uses machine learning to analyze career paths and recommend learning resources.',
      features: [
        'AI-powered skill gap analysis using LLM recommendations',
        'Personalized career roadmap generation',
        'Learning resource recommendations',
        'Progress tracking and milestone achievements',
        'Integration with multiple AI models'
      ],
      tech: ['React', 'Node.js', 'MongoDB', 'Gemini API', 'Express.js', 'JWT Auth'],
      liveLink: '#',
      gitLink: 'https://github.com/murali-krishna-palla/path-finder'
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
    const portfolioUrl = 'https://portofolio-six-mu-45.vercel.app/';
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
