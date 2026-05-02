/* SWAIN.LOVE — global script */

// ============ COUNTERS ============
(function () {
  const counters = [
    { id: 'cnt-hanged',  start: 1247389, step: () => Math.floor(Math.random()*8)+1, every: 600 },
    { id: 'cnt-souls',   start: 8472,    step: () => Math.floor(Math.random()*3),   every: 1200 },
    { id: 'cnt-yasuo',   start: 91,      step: () => Math.random() > 0.5 ? 1 : 0,   every: 2000 },
    { id: 'cnt-visitors',start: 847291,  step: () => Math.floor(Math.random()*3),   every: 2200 },
    { id: 'cnt-support', start: 0,       step: () => 1,                              every: 1000 },
  ];
  counters.forEach(c => {
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
    'раздражён', 'готовит ульт', 'думает о Беатриче', 'наблюдает',
    'смотрит на тебя', 'планирует переворот', 'кушает', 'допрашивает Афелия',
    'игнорирует Картус', 'злится на Тимо', 'ищет Энни', 'читает донос',
    'свергает кого-то', 'просто свергает', 'недоволен Демасией',
    'обдумывает мерч', 'кормит Беатриче', 'мечтает о войне', 'разочарован тобой',
  ];
  const moodEl = document.getElementById('mood-now');
  if (moodEl) {
    moodEl.textContent = moods[Math.floor(Math.random()*moods.length)];
    setInterval(() => {
      moodEl.textContent = moods[Math.floor(Math.random()*moods.length)];
    }, 3500);
  }

  // irritation gauge — растёт пока ты тут
  const irrEl = document.getElementById('irritation');
  if (irrEl) {
    let irr = 1;
    irrEl.textContent = irr + ' / 10';
    setInterval(() => {
      irr = Math.min(10, irr + (Math.random() > 0.6 ? 1 : 0));
      irrEl.textContent = irr + ' / 10';
      if (irr >= 10) irrEl.textContent = '10 / 10 (МАКС)';
    }, 4000);
  }

  // coup countdown
  const coupEl = document.getElementById('coup-countdown');
  if (coupEl) {
    let secs = Math.floor(Math.random()*200) + 50;
    setInterval(() => {
      if (secs <= 0) {
        coupEl.textContent = 'СЕЙЧАС';
        setTimeout(() => { secs = Math.floor(Math.random()*200) + 50; }, 800);
      } else {
        secs--;
        const m = Math.floor(secs/60), s = secs % 60;
        coupEl.textContent = m + ':' + (s < 10 ? '0'+s : s);
      }
    }, 1000);
  }
})();

// ============ RANDOM QUOTE ============
(function () {
  const quotes = [
    'Не моё. Но будет.',
    'Беатриче лучше.',
    'Демасия пошла нахуй.',
    'Я великий. Это не обсуждается.',
    'Тимо мне не внук. Уточняю.',
    'Ясуо это ошибка. Исправляется.',
    'Картус ждёт. Пусть ждёт.',
    'Энни не моя. Уточняю.',
    'Афелий приёмный. Уточняю.',
    'Сетт. Я знаю кто ты.',
    'Война это лучшее что есть. После Беатриче.',
    'Я не молчу. Я обдумываю.',
    'Я отрезал руку. Окупилось.',
    'Если ты это читаешь — я уже знаю.',
  ];
  const q = document.getElementById('random-quote');
  if (q) q.textContent = quotes[Math.floor(Math.random()*quotes.length)];
})();

// ============ RANDOM ADVICE ============
(function () {
  const advices = [
    'не доверяй никому. особенно мне.',
    'всегда смотри по сторонам. я где-то рядом.',
    'купи мерч.',
    'отрежь руку. результат не гарантирован.',
    'игнорируй Картус. как я.',
    'не предлагай мне печенье. я Тимо ещё не простил.',
    'если видишь Сетта — беги.',
    'Беатриче знает всё. ничего не скрывай.',
    'не пиши Энни. её нет.',
    'не играй за Демасию. я заметил.',
    'я тебя сейчас вижу. помаши.',
  ];
  const btn = document.getElementById('advice-btn');
  const out = document.getElementById('advice-out');
  if (btn && out) {
    btn.addEventListener('click', () => {
      out.textContent = '« ' + advices[Math.floor(Math.random()*advices.length)] + ' »';
      out.classList.add('show');
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
    'ирелия': '⚠️ ОБНАРУЖЕНО: ИРЕЛИЯ. наблюдение усилено в 9999 раз. Беатриче уже летит. бегите.',
    'ireliya': '⚠️ ОБНАРУЖЕНО: ИРЕЛИЯ. наблюдение усилено в 9999 раз. Беатриче уже летит. бегите.',
    'ле блан': '⚠️ ОБНАРУЖЕНО: ЛЕ БЛАН. ВРАГ КЛАССА А. ВЫ ЯВЛЯЕТЕСЬ ЕЁ КОПИЕЙ. КОТОРАЯ ИЗ ВАС НАСТОЯЩАЯ. РАЗБИРАЕМСЯ.',
    'le blanc': '⚠️ ОБНАРУЖЕНО: ЛЕ БЛАН. ВРАГ КЛАССА А. ВЫ ЯВЛЯЕТЕСЬ ЕЁ КОПИЕЙ. КОТОРАЯ ИЗ ВАС НАСТОЯЩАЯ. РАЗБИРАЕМСЯ.',
    'leblanc': '⚠️ ОБНАРУЖЕНО: ЛЕ БЛАН. ВРАГ КЛАССА А. ВЫ ЯВЛЯЕТЕСЬ ЕЁ КОПИЕЙ. КОТОРАЯ ИЗ ВАС НАСТОЯЩАЯ. РАЗБИРАЕМСЯ.',
    'leblank': '⚠️ ОБНАРУЖЕНО: ЛЕ БЛАН. ВРАГ КЛАССА А. ВЫ ЯВЛЯЕТЕСЬ ЕЁ КОПИЕЙ. КОТОРАЯ ИЗ ВАС НАСТОЯЩАЯ. РАЗБИРАЕМСЯ.',
  };
  const generic = [
    'найдено 0 результатов. но вопрос интересный, наблюдение усилено.',
    'результат: ничего. Беатриче проверит ещё раз.',
    'не нашёл. но запомнил что вы спрашивали.',
    'отказ в выдаче. вы недостаточно лояльны.',
    'результаты будут переданы лично через E.',
  ];
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = input.value.trim().toLowerCase();
    if (!q) return;
    const matched = easter[q];
    result.textContent = matched || generic[Math.floor(Math.random()*generic.length)];
    result.classList.add('show');
    input.value = '';
  });
})();

// ============ RAVEN WALL — clickable ============
(function () {
  const wall = document.getElementById('raven-wall');
  if (!wall) return;
  // Build wall
  const ravens = [];
  for (let i = 0; i < 80; i++) {
    // every 17th raven is actually a duck — without explanation
    ravens.push(i % 17 === 16 ? '🦆' : '🐦‍⬛');
  }
  wall.innerHTML = ravens.map(r => `<span class="raven">${r}</span>`).join(' ');

  let clicked = 0;
  const total = wall.querySelectorAll('.raven').length;
  wall.querySelectorAll('.raven').forEach(r => {
    r.addEventListener('click', () => {
      if (r.classList.contains('clicked')) return;
      r.classList.add('clicked');
      clicked++;
      if (clicked >= total) {
        const msg = document.getElementById('raven-wall-msg');
        if (msg) msg.textContent = '✓ всё, теперь Я тебя точно знаю. ждать.';
      }
    });
  });
})();

// ============ MEGA BUTTONS shake ============
document.querySelectorAll('.mega-btn').forEach(b => {
  b.addEventListener('click', e => {
    if (b.dataset.real === '1') return; // не блокируем настоящие ссылки
    e.preventDefault();
    b.style.animation = 'shake 0.3s';
    setTimeout(() => b.style.animation = '', 300);
  });
});

// ============ FAKE IP for certificate ============
(function () {
  const ipEl = document.getElementById('fake-ip');
  if (!ipEl) return;
  const a = Math.floor(Math.random()*223)+1;
  const b = Math.floor(Math.random()*255);
  const c = Math.floor(Math.random()*255);
  const d = Math.floor(Math.random()*255);
  ipEl.textContent = `${a}.${b}.${c}.${d}`;
})();

// ============ NIKO POPUP (для friends.html) ============
(function () {
  const overlay = document.getElementById('niko-overlay');
  if (!overlay) return;

  function showPopup() {
    overlay.classList.add('show');
    const sound = document.getElementById('niko-sound');
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
    const sound = document.getElementById('niko-sound');
    if (sound) { sound.pause(); sound.currentTime = 0; }
  }

  // показываем сразу
  showPopup();

  // закрытие
  overlay.querySelectorAll('[data-close]').forEach(b => {
    b.addEventListener('click', hidePopup);
  });
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) hidePopup();
  });
})();
