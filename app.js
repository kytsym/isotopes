/* global ELEMENTS, FAMILIES, TRACKS, YT */
(() => {
  const byN = new Map(ELEMENTS.map((el) => [el.n, el]));
  const FAMILY_ORDER = ['synth', 'disco', 'house', 'trance', 'bass', 'hard', 'techno', 'ambient', 'global'];
  const $ = (sel) => document.querySelector(sel);
  // Hosts that can't embed YouTube (such as Claude Artifacts) set window.EDM_LINK_OUT,
  // and each genre card then links out to YouTube instead of playing inline.
  const LINK_OUT = !!window.EDM_LINK_OUT;

  /* ── Position on the real periodic table ───────────────────────── */
  // Returns { row, col }. Rows 9 and 10 are the lanthanide and actinide rows (row 8 is a spacer).
  function position(n) {
    if (n === 1) return { row: 1, col: 1 };
    if (n === 2) return { row: 1, col: 18 };
    if (n <= 4) return { row: 2, col: n - 2 };
    if (n <= 10) return { row: 2, col: n + 8 };
    if (n <= 12) return { row: 3, col: n - 10 };
    if (n <= 18) return { row: 3, col: n };
    if (n <= 36) return { row: 4, col: n - 18 };
    if (n <= 54) return { row: 5, col: n - 36 };
    if (n <= 56) return { row: 6, col: n - 54 };
    if (n <= 71) return { row: 9, col: n - 53 };
    if (n <= 86) return { row: 6, col: n - 68 };
    if (n <= 88) return { row: 7, col: n - 86 };
    if (n <= 103) return { row: 10, col: n - 85 };
    return { row: 7, col: n - 100 };
  }

  const bpmMass = (el) => el.bpm.split('–')[0];
  const ytId = (el) => (typeof TRACKS !== 'undefined' && TRACKS[el.n]) || null;
  const trackLabel = (el) => `${el.track.artist} – ${el.track.title}`;

  function cellHTML(el) {
    return `<span class="row1"><span class="num">${el.n}</span><span class="mass">${bpmMass(el)}</span></span>
      <span class="sym">${el.sym}</span>
      <span class="name">${el.name}</span>`;
  }

  function makeCell(el) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'cell' + (el.suggested ? ' suggested' : '');
    b.dataset.family = el.family;
    b.dataset.n = el.n;
    b.setAttribute('aria-label', `${el.n}, ${el.sym}, ${el.name}, ${FAMILIES[el.family].name}, ${el.bpm} BPM`);
    b.innerHTML = cellHTML(el);
    return b;
  }

  /* ── Table view ────────────────────────────────────────────────── */
  const grid = $('#grid');
  const cellAt = new Map(); // "row,col" -> element number

  function buildTable() {
    const frag = document.createDocumentFragment();

    // Centre panel in the empty top-middle area: hover preview and legend
    const center = document.createElement('div');
    center.className = 'center';
    center.innerHTML = `
      <div class="preview" id="preview"></div>
      <div class="preview-side">
        <p class="p-fam" id="p-fam"></p>
        <p class="p-track" id="p-track"></p>
        <div class="legend" id="legend"></div>
      </div>`;
    frag.appendChild(center);

    for (const el of ELEMENTS) {
      const { row, col } = position(el.n);
      const c = makeCell(el);
      c.style.gridRow = row;
      c.style.gridColumn = col;
      c.tabIndex = el.n === 1 ? 0 : -1;
      cellAt.set(`${row},${col}`, el.n);
      frag.appendChild(c);
    }

    // Lanthanide/actinide placeholders in group 3, plus labels for the f-block rows
    [[6, '57–71', 'ambient'], [7, '89–103', 'global']].forEach(([row, label, fam]) => {
      const p = document.createElement('div');
      p.className = 'placeholder';
      p.dataset.family = fam;
      p.style.gridRow = row;
      p.style.gridColumn = 3;
      p.textContent = label;
      frag.appendChild(p);
    });
    [[9, 'ambient'], [10, 'global']].forEach(([row, fam]) => {
      const l = document.createElement('div');
      l.className = 'f-label';
      l.style.gridRow = row;
      l.style.gridColumn = '1 / 4';
      l.textContent = `${FAMILIES[fam].name} →`;
      frag.appendChild(l);
    });

    grid.appendChild(frag);

    const legend = $('#legend');
    FAMILY_ORDER.forEach((key) => {
      const count = ELEMENTS.filter((e) => e.family === key).length;
      const b = document.createElement('button');
      b.type = 'button';
      b.dataset.family = key;
      b.setAttribute('aria-pressed', 'false');
      b.title = `${FAMILIES[key].chem}: ${FAMILIES[key].blurb}`;
      b.innerHTML = `<i></i>${FAMILIES[key].name} <small>${count}</small>`;
      legend.appendChild(b);
    });

    setPreview(byN.get(1));
  }

  function setPreview(el) {
    const p = $('#preview');
    p.dataset.family = el.family;
    p.closest('.center').dataset.family = el.family;
    p.innerHTML = `<span class="row1"><span>${el.n}</span><span>${el.bpm}</span></span>
      <span class="sym">${el.sym}</span><span class="name">${el.name}</span>`;
    $('#p-fam').textContent = `${FAMILIES[el.family].name} · ${FAMILIES[el.family].chem}`;
    $('#p-track').textContent = `♪ ${trackLabel(el)}`;
  }

  /* ── Families view ─────────────────────────────────────────────── */
  function buildFamilies() {
    const root = $('#families-view');
    FAMILY_ORDER.forEach((key) => {
      const f = FAMILIES[key];
      const sec = document.createElement('section');
      sec.className = 'family';
      sec.dataset.family = key;
      sec.innerHTML = `<div class="family-head"><h2><i></i>${f.name}</h2><span class="chem">${f.chem}</span></div><p>${f.blurb}</p>`;
      const tiles = document.createElement('div');
      tiles.className = 'tiles';
      ELEMENTS.filter((e) => e.family === key).sort((a, b) => a.n - b.n).forEach((el) => tiles.appendChild(makeCell(el)));
      sec.appendChild(tiles);
      root.appendChild(sec);
    });
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.hidden = true;
    empty.textContent = 'No genres match that search.';
    root.appendChild(empty);
  }

  /* ── View toggle ───────────────────────────────────────────────── */
  function setView(view, remember = true) {
    $('#table-view').hidden = view !== 'table';
    $('#families-view').hidden = view !== 'families';
    document.querySelectorAll('.view-toggle button').forEach((b) =>
      b.setAttribute('aria-pressed', String(b.dataset.view === view)));
    if (remember) try { localStorage.setItem('edm-view', view); } catch { /* storage unavailable */ }
  }
  document.querySelectorAll('.view-toggle button').forEach((b) =>
    b.addEventListener('click', () => setView(b.dataset.view)));

  /* ── Highlight: legend + search ────────────────────────────────── */
  let lockedFamily = null;
  let query = '';

  function matches(el) {
    if (!query) return true;
    const q = query.toLowerCase();
    if (/^\d{2,3}$/.test(q)) {
      const [lo, hi] = el.bpm.split('–').map(Number);
      return +q >= lo && +q <= (hi || lo);
    }
    return [el.name, el.sym, FAMILIES[el.family].name, el.track.artist, el.track.title, ...el.artists]
      .some((s) => s.toLowerCase().includes(q));
  }

  function applyHighlight(hoverFamily = null) {
    const fam = hoverFamily || lockedFamily;
    const active = fam || query;
    grid.classList.toggle('dim', !!active);
    grid.querySelectorAll('.cell').forEach((c) => {
      const el = byN.get(+c.dataset.n);
      c.classList.toggle('lit', (!fam || el.family === fam) && matches(el));
    });
    let visible = 0;
    document.querySelectorAll('#families-view .cell').forEach((c) => {
      const show = matches(byN.get(+c.dataset.n));
      c.classList.toggle('hidden-by-search', !show);
      if (show) visible++;
    });
    document.querySelectorAll('#families-view .family').forEach((s) => {
      s.hidden = !s.querySelector('.cell:not(.hidden-by-search)');
    });
    $('#families-view .empty').hidden = visible > 0;
  }

  /* ── Modal + YouTube player ────────────────────────────────────── */
  const modal = $('#modal');
  const sheet = modal.querySelector('.sheet');
  let current = null;
  let player = null;
  let playerReady = false;
  let pendingId = null;

  function loadYouTubeAPI() {
    if (window.YT || document.getElementById('yt-api')) return;
    const s = document.createElement('script');
    s.id = 'yt-api';
    s.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(s);
  }

  window.onYouTubeIframeAPIReady = () => {
    const vars = { autoplay: 1, rel: 0, modestbranding: 1, playsinline: 1 };
    if (location.protocol.startsWith('http')) vars.origin = location.origin;
    player = new YT.Player('yt-player', {
      videoId: pendingId || undefined,
      playerVars: vars,
      events: {
        onReady: () => { playerReady = true; if (pendingId) player.loadVideoById(pendingId); },
        onStateChange: (e) => {
          const playing = e.data === YT.PlayerState.PLAYING;
          sheet.classList.toggle('is-playing', playing);
          document.querySelectorAll('.cell.playing').forEach((c) => c.classList.remove('playing'));
          if (playing && current) document.querySelectorAll(`.cell[data-n="${current.n}"]`).forEach((c) => c.classList.add('playing'));
        },
        onError: () => showPlayerMsg(current),
      },
    });
  };

  function showPlayerMsg(el, text) {
    const msg = $('#player-msg');
    const url = ytUrl(el);
    msg.innerHTML = text || `This video can't be played here. <br><a href="${url}" target="_blank" rel="noopener">Listen on YouTube ↗</a>`;
    msg.hidden = false;
  }

  function ytUrl(el) {
    const id = ytId(el);
    return id ? `https://www.youtube.com/watch?v=${id}`
      : `https://www.youtube.com/results?search_query=${encodeURIComponent(el.track.artist + ' ' + el.track.title)}`;
  }

  function play(el) {
    $('#player-msg').hidden = true;
    if (LINK_OUT) {
      const out = $('#play-out');
      out.href = ytUrl(el);
      out.innerHTML = `<span class="play-icon" aria-hidden="true">▶</span>
        <span class="play-text"><b>Play on YouTube</b><span>${trackLabel(el)}</span></span>`;
      out.setAttribute('aria-label', `Play ${trackLabel(el)} on YouTube (opens in a new tab)`);
      return;
    }
    const id = ytId(el);
    if (!id) { showPlayerMsg(el); if (playerReady) player.stopVideo(); return; }
    if (location.protocol === 'file:') {
      showPlayerMsg(el, 'YouTube won\'t play videos on pages opened straight from a file. Run <code>node tools/serve.mjs</code> and open <b>http://localhost:5173</b>,'
        + ` or <a href="${ytUrl(el)}" target="_blank" rel="noopener">listen on YouTube ↗</a>`);
      return;
    }
    pendingId = id;
    if (playerReady) player.loadVideoById(id);
    else loadYouTubeAPI();
  }

  function chip(el) {
    const a = document.createElement('button');
    a.type = 'button';
    a.className = 'chip';
    a.dataset.family = el.family;
    a.innerHTML = `<b>${el.sym}</b>${el.name}`;
    a.addEventListener('click', () => open(el.n));
    return a;
  }

  function open(n) {
    const el = byN.get(n);
    if (!el) return;
    current = el;
    const fam = FAMILIES[el.family];
    sheet.dataset.family = el.family;
    $('#m-tile').innerHTML = `<span class="row1"><span>${el.n}</span><span>${bpmMass(el)}</span></span><span class="sym">${el.sym}</span>`;
    $('#m-family').textContent = `${fam.name} · ${fam.chem}`;
    $('#m-name').textContent = el.name;
    $('#m-meta').textContent = `${el.bpm} BPM · ${el.era}`;
    $('#m-track').textContent = trackLabel(el);
    $('#m-yt').href = ytUrl(el);
    $('#m-blurb').textContent = el.blurb;
    $('#m-wiki').href = 'https://en.wikipedia.org/wiki/Special:Search?go=Go&search=' + encodeURIComponent(el.wiki || el.name);
    $('#m-sug').hidden = !el.suggested;

    const artists = $('#m-artists');
    artists.replaceChildren(...el.artists.map((name) => {
      const a = document.createElement('a');
      a.className = 'chip artist';
      a.href = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(name);
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = name;
      return a;
    }));
    $('#m-related').replaceChildren(...el.related.map((r) => chip(byN.get(r))));
    $('#m-related').previousElementSibling.hidden = el.related.length === 0;
    const same = ELEMENTS.filter((e) => e.family === el.family && e.n !== el.n && !el.related.includes(e.n));
    $('#m-same').replaceChildren(...same.map(chip));
    $('#m-fam-h').textContent = `More ${fam.name}`;

    if (!modal.open) modal.showModal();
    sheet.scrollTop = 0;
    setPreview(el);
    play(el);
    try { history.replaceState(null, '', '#' + el.n); } catch { /* sandboxed */ }
  }

  function close() {
    if (playerReady) player.pauseVideo();
    sheet.classList.remove('is-playing');
    if (modal.open) modal.close();
    try { history.replaceState(null, '', location.pathname + location.search); } catch { /* sandboxed */ }
    const c = grid.querySelector(`.cell[data-n="${current?.n}"]`);
    if (c && !$('#table-view').hidden) focusCell(c);
  }

  const step = (d) => open(((current.n - 1 + d + 118) % 118) + 1);
  $('#m-close').addEventListener('click', close);
  $('#m-prev').addEventListener('click', () => step(-1));
  $('#m-next').addEventListener('click', () => step(1));
  modal.addEventListener('cancel', (e) => { e.preventDefault(); close(); });
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  modal.addEventListener('keydown', (e) => {
    if (e.target.closest('input')) return;
    if (e.key === ']') step(1);
    if (e.key === '[') step(-1);
  });

  /* ── Events: open, hover, keyboard grid navigation ─────────────── */
  document.addEventListener('click', (e) => {
    const c = e.target.closest('.cell');
    if (c) open(+c.dataset.n);
  });

  grid.addEventListener('mouseover', (e) => {
    const c = e.target.closest('.cell');
    if (c) setPreview(byN.get(+c.dataset.n));
  });

  function focusCell(c) {
    grid.querySelectorAll('.cell[tabindex="0"]').forEach((x) => { x.tabIndex = -1; });
    c.tabIndex = 0;
    c.focus();
    setPreview(byN.get(+c.dataset.n));
  }

  grid.addEventListener('keydown', (e) => {
    const c = e.target.closest('.cell');
    if (!c) return;
    const dirs = { ArrowLeft: [0, -1], ArrowRight: [0, 1], ArrowUp: [-1, 0], ArrowDown: [1, 0] };
    if (!dirs[e.key]) return;
    e.preventDefault();
    let { row, col } = position(+c.dataset.n);
    const [dr, dc] = dirs[e.key];
    for (let i = 0; i < 18; i++) {
      row += dr; col += dc;
      if (row === 8) row += dr;
      if (row < 1 || row > 10 || col < 1 || col > 18) return;
      const n = cellAt.get(`${row},${col}`);
      if (n) { focusCell(grid.querySelector(`.cell[data-n="${n}"]`)); return; }
    }
  });

  const legend = () => $('#legend');

  /* ── Init ──────────────────────────────────────────────────────── */
  buildTable();
  buildFamilies();

  if (LINK_OUT) {
    document.body.classList.add('link-out');
    $('#yt-player').hidden = true;
    $('#play-out').hidden = false;
    $('#m-yt').hidden = true;
    $('.now-label').textContent = 'Signature track';
    $('#stream-note').textContent = 'Tracks open on YouTube.';
    $('.sub').textContent = '118 genres arranged like the elements. Tap one to find its signature track.';
  }

  legend().addEventListener('mouseover', (e) => {
    const b = e.target.closest('button');
    if (b) applyHighlight(b.dataset.family);
  });
  legend().addEventListener('mouseleave', () => applyHighlight());
  legend().addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    lockedFamily = lockedFamily === b.dataset.family ? null : b.dataset.family;
    legend().querySelectorAll('button').forEach((x) =>
      x.setAttribute('aria-pressed', String(x.dataset.family === lockedFamily)));
    applyHighlight();
  });

  $('#search').addEventListener('input', (e) => { query = e.target.value.trim(); applyHighlight(); });

  let saved = null;
  try { saved = localStorage.getItem('edm-view'); } catch { /* storage unavailable */ }
  setView(saved || (matchMedia('(min-width: 900px)').matches ? 'table' : 'families'), false);

  const hashN = parseInt(location.hash.slice(1), 10);
  if (byN.has(hashN)) open(hashN);
})();
