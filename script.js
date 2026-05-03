/* SWAIN.LOVE — global script */

// ============ CURSOR ============
(function () {
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFinePointer) return;

  const cur = document.getElementById('cur');
  const dot = document.getElementById('cur-dot');
  if (!cur || !dot) return;

  let cx = -100, cy = -100;
  document.addEventListener('mousemove', (e) => {
    cx = e.clientX;
    cy = e.clientY;
    cur.style.left = cx + 'px';
    cur.style.top = cy + 'px';
    // mouse-reactive bg
    document.documentElement.style.setProperty('--gx', ((cx / window.innerWidth) * 100).toFixed(1) + '%');
    document.documentElement.style.setProperty('--gy', ((cy / window.innerHeight) * 100).toFixed(1) + '%');
    setTimeout(() => {
      dot.style.left = cx + 'px';
      dot.style.top = cy + 'px';
    }, 90);
  });

  // hover state
  const hoverTargets = 'a, button, .stamp, .tile, .friend-card, .fam-card, input, .raven, .bubble, .invest';
  document.querySelectorAll(hoverTargets).forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cur-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cur-hover'));
  });
})();

// ============ TOPBAR SHRINK ============
(function () {
  const topbar = document.getElementById('topbar');
  if (!topbar) return;
  window.addEventListener('scroll', () => {
    topbar.classList.toggle('small', window.scrollY > 60);
  }, { passive: true });
})();

// ============ HAMBURGER ============
(function () {
  const burger = document.getElementById('burger');
  const mmenu = document.getElementById('mmenu');
  if (!burger || !mmenu) return;
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mmenu.classList.toggle('open');
  });
  mmenu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      mmenu.classList.remove('open');
    });
  });
})();

// ============ FADE-UP REVEAL ============
(function () {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('vis');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((el) => io.observe(el));
})();

// ============ COUNTERS ============
(function () {
  const counters = [
    { id: 'cnt-hanged',    start: 1247389, step: () => Math.floor(Math.random() * 8) + 1, every: 600 },
    { id: 'cnt-souls',     start: 8472,    step: () => Math.floor(Math.random() * 3),     every: 1200 },
    { id: 'cnt-yasuo',     start: 91,      step: () => (Math.random() > 0.5 ? 1 : 0),      every: 2000 },
    { id: 'cnt-visitors',  start: 847291,  step: () => Math.floor(Math.random() * 3),     every: 2200 },
    { id: 'cnt-support',   start: 0,       step: () => 1,                                  every: 1000 },
    { id: 'cnt-kartus',    start: 14,      step: () => 0,                                  every: 999999 },
    { id: 'cnt-deduly',    start: 47,      step: () => (Math.random() > 0.7 ? 1 : 0),     every: 5000 },
    { id: 'cnt-aphelios',  start: 0,       step: () => 1,                                  every: 1500 },
    { id: 'cnt-letters',   start: 247,     step: () => 0,                                  every: 999999 },
    { id: 'cnt-beatrice',  start: 9999,    step: () => 0,                                  every: 999999 },
  ];
  counters.forEach((c) => {
    const el = document.getElementById(c.id);
    if (!el) return;
    let val = c.start;
    el.textContent = val.toLocaleString('ru-RU');
    setInterval(() => {
      val += c.step();
      el.textContent = val.toLocaleString('ru-RU');
    }, c.every);
  });

  // mood ticker
  const moods = [
    'РАЗДРАЖЁН', 'ГОТОВИТ УЛЬТ', 'ДУМАЕТ О БЕАТРИЧЕ', 'НАБЛЮДАЕТ',
    'СМОТРИТ НА ТЕБЯ', 'ПЛАНИРУЕТ ПЕРЕВОРОТ', 'КУШАЕТ', 'ИГНОРИРУЕТ КАРТУС',
    'ЗЛИТСЯ НА ТИМО', 'ИЩЕТ СЕТТА', 'ЧИТАЕТ ДОНОС', 'СВЕРГАЕТ КОГО-ТО',
    'НЕДОВОЛЕН ДЕМАСИЕЙ', 'КОРМИТ БЕАТРИЧЕ', 'РАЗОЧАРОВАН ТОБОЙ',
  ];
  const moodEl = document.getElementById('mood-now');
  if (moodEl) {
    moodEl.textContent = moods[Math.floor(Math.random() * moods.length)];
    setInterval(() => {
      moodEl.textContent = moods[Math.floor(Math.random() * moods.length)];
    }, 3500);
  }

  // irritation
  const irrEl = document.getElementById('irritation');
  if (irrEl) {
    let irr = 1;
    irrEl.textContent = irr + ' / 10';
    setInterval(() => {
      irr = Math.min(10, irr + (Math.random() > 0.6 ? 1 : 0));
      irrEl.textContent = irr === 10 ? '10 / 10 МАКС' : irr + ' / 10';
    }, 4000);
  }

  // coup countdown
  const coupEl = document.getElementById('coup-countdown');
  if (coupEl) {
    let secs = Math.floor(Math.random() * 200) + 50;
    setInterval(() => {
      if (secs <= 0) {
        coupEl.textContent = 'СЕЙЧАС';
        setTimeout(() => {
          secs = Math.floor(Math.random() * 200) + 50;
        }, 800);
      } else {
        secs--;
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        coupEl.textContent = m + ':' + (s < 10 ? '0' + s : s);
      }
    }, 1000);
  }
})();

// ============ RANDOM QUOTE ============
(function () {
  const quotes = [
    'Это ещё не моё, но скоро таковым станет.',
    'Беатриче лучшая.',
    'Ирелия иди нахуй.',
    'Я великий и это не обсуждается.',
    'Тимо мне не внук.',
    'Союзный Ясуо это ошибка. В процессе ликвидации.',
    'Картус ждёт меня дома. Пусть ждёт.',
    'Энни ТОЧНО не моя внучка. Уточняю обстоятельства подмены.',
    'Афелий приёмный. Уточняю список измен от Картуса.',
    'Сетт. Я знаю про вас с Афелием.',
    'Доминировать над кем-то — это лучшее что есть. После Беатриче.',
    'Я не молчу, а обдумываю происходящее.',
    'Я лишился руки и не жалею об этом.',
    'Если ты это читаешь — я уже обо всём знаю.',
  ];
  const q = document.getElementById('random-quote');
  if (q) q.textContent = quotes[Math.floor(Math.random() * quotes.length)];
})();

// ============ ADVICE BUTTON ============
(function () {
  const advices = [
    'не доверяй никому. особенно демасийцам.',
    'всегда оглядывайся. я уже рядом.',
    'мой мерч самый лучший.',
    'при отрезании руки результат не гарантирован.',
    'не игнорируй Картуса. так можно только мне.',
    'Тимо, я не буду есть твоё печенье, ты прекрасно знаешь про мои больные зубы.',
    'если видишь меня в лесу - беги.',
    'Беатриче знает всё. не пытайся что-то от меня скрыть.',
    'не пикай Энни. её не существует.',
    'не играй за саппортов. я всё вижу.',
    'помаши.',
  ];
  const btn = document.getElementById('advice-btn');
  const out = document.getElementById('advice-out');
  if (btn && out) {
    btn.addEventListener('click', () => {
      out.textContent = '« ' + advices[Math.floor(Math.random() * advices.length)] + ' »';
    });
  }
})();

// ============ FAKE SEARCH ============
(function () {
  const form = document.getElementById('fake-search');
  if (!form) return;
  const input = form.querySelector('input');
  const result = document.getElementById('search-result');
  const easter = {
    'ирелия': 'ОБНАРУЖЕНО: ИРЕЛИЯ. наблюдение за тобой усилено в 9999 раз. Беатриче уже летит. беги.',
    'ireliya': 'ОБНАРУЖЕНО: ИРЕЛИЯ. наблюдение за тобой усилено в 9999 раз. Беатриче уже летит. беги.',
    'irelia': 'ОБНАРУЖЕНО: ИРЕЛИЯ. наблюдение за тобой усилено в 9999 раз. Беатриче уже летит. беги.',
    'ле блан': 'ОБНАРУЖЕНО: ЛЕ БЛАН. ВРАГ КЛАССА А. ВЫ ЯВЛЯЕТЕСЬ ЕЁ КОПИЕЙ. РАЗБИРАЕМСЯ, КТО ИЗ ВАС НАСТОЯЩАЯ. ДУШЕЧКА, Я ТЕБЯ НЕНАВИЖУ.',
    'leblanc': 'ОБНАРУЖЕНО: ЛЕ БЛАН. ВРАГ КЛАССА А. ВЫ ЯВЛЯЕТЕСЬ ЕЁ КОПИЕЙ. РАЗБИРАЕМСЯ, КТО ИЗ ВАС НАСТОЯЩАЯ. ДУШЕЧКА, Я ТЕБЯ НЕНАВИЖУ.',
    'le blanc': 'ОБНАРУЖЕНО: ЛЕ БЛАН. ВРАГ КЛАССА А. ВЫ ЯВЛЯЕТЕСЬ ЕЁ КОПИЕЙ. РАЗБИРАЕМСЯ, КТО ИЗ ВАС НАСТОЯЩАЯ. ДУШЕЧКА, Я ТЕБЯ НЕНАВИЖУ.',
    'leblank': 'ОБНАРУЖЕНО: ЛЕ БЛАН. ВРАГ КЛАССА А. ВЫ ЯВЛЯЕТЕСЬ ЕЁ КОПИЕЙ. РАЗБИРАЕМСЯ, КТО ИЗ ВАС НАСТОЯЩАЯ. ДУШЕЧКА, Я ТЕБЯ НЕНАВИЖУ.',
  };
  const generic = [
    'найдено 0 результатов. но вопрос интересный, наблюдение за тобой усилено.',
    'результат: ничего. Беатриче проверит ещё раз.',
    'не нашёл. но запомнил твой вопрос.',
    'отказ в выдаче. ты недостаточно лоялен.',
    'результаты будут переданы лично через Око Империи.',
  ];
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = input.value.trim().toLowerCase();
    if (!q) return;
    const matched = easter[q];
    result.textContent = matched || generic[Math.floor(Math.random() * generic.length)];
    result.classList.add('show');
    input.value = '';
  });
})();

// ============ RAVEN WALL ============
(function () {
  const wall = document.getElementById('raven-wall');
  if (!wall) return;
  const ravens = [];
  for (let i = 0; i < 80; i++) {
    ravens.push(i % 17 === 16 ? '🦆' : '🐦');
  }
  wall.innerHTML = ravens.map((r) => `<span class="raven">${r}</span>`).join(' ');

  let clicked = 0;
  const total = wall.querySelectorAll('.raven').length;
  wall.querySelectorAll('.raven').forEach((r) => {
    r.addEventListener('click', () => {
      if (r.classList.contains('clicked')) return;
      r.classList.add('clicked');
      clicked++;
      if (clicked >= total) {
        const msg = document.getElementById('raven-wall-msg');
        if (msg) msg.textContent = 'Сожалею, но вакансия Беатриче уже занята. Желаю счастливых последних минут жизни!';
      }
    });
  });
})();

// ============ FAKE IP ============
(function () {
  const ipEl = document.getElementById('fake-ip');
  if (!ipEl) return;
  const a = Math.floor(Math.random() * 223) + 1;
  const b = Math.floor(Math.random() * 255);
  const c = Math.floor(Math.random() * 255);
  const d = Math.floor(Math.random() * 255);
  ipEl.textContent = `${a}.${b}.${c}.${d}`;
})();

// ============ VIDEO POPUP (patchnotes) ============
(function () {
  const trigger = document.getElementById('video-popup-trigger');
  const overlay = document.getElementById('video-popup-overlay');
  if (!trigger || !overlay) return;
  const video = overlay.querySelector('video');

  function showPopup() {
    overlay.classList.add('show');
    if (video) {
      video.currentTime = 0;
      video.muted = false;
      video.volume = 1;
      video.play().catch(() => {
        // fallback: если браузер всё равно заблочил — попробовать ещё раз с muted и потом размьютить
        video.muted = true;
        video.play().then(() => {
          // после первого фрейма размьютим
          setTimeout(() => { video.muted = false; }, 50);
        }).catch(() => {});
      });
    }
  }
  function hidePopup() {
    overlay.classList.remove('show');
    if (video) {
      video.pause();
    }
  }

  trigger.addEventListener('click', showPopup);
  overlay.querySelectorAll('[data-close]').forEach((b) => {
    b.addEventListener('click', hidePopup);
  });
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) hidePopup();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('show')) hidePopup();
  });
})();

// ============ DONOS FORM (contacts) ============
(function () {
  const form = document.getElementById('donos-form');
  if (!form) return;
  const result = document.getElementById('donos-result');
  const responses = [
    'донос принят. ваш номер в очереди: №48 291. ответа не ждите. ответа не будет.',
    'передано через Беатриче. она задумалась. это плохой знак. для кого — узнаете позже.',
    'обращение зарегистрировано. ваше имя добавлено в реестр. реестр чего — не уточняется.',
    'спасибо за бдительность. вашу бдительность мы тоже отметили. наблюдение усилено.',
    'ваше сообщение прочитано. два раза. третий раз — со скептицизмом. четвёртый — с раздражением.',
  ];
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    result.textContent = responses[Math.floor(Math.random() * responses.length)];
    result.classList.add('show');
    form.reset();
  });
})();

// ============ NIKO POPUP ============
(function () {
  const overlay = document.getElementById('niko-overlay');
  if (!overlay) return;

  const sound = document.getElementById('niko-sound');

  function showPopup() {
    overlay.classList.add('show');
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {
        // browser blocked autoplay — fallback: будет звучать после первого клика
        const playOnClick = () => {
          sound.play().catch(() => {});
          document.removeEventListener('click', playOnClick);
        };
        document.addEventListener('click', playOnClick);
      });
    }
  }

  function hidePopup() {
    overlay.classList.remove('show');
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  showPopup();

  overlay.querySelectorAll('[data-close]').forEach((b) => {
    b.addEventListener('click', hidePopup);
  });
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) hidePopup();
  });
})();
