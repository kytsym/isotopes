/* global ELEMENTS, FAMILIES, TRACKS, PLAYLISTS, YT */
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
  const ytId = (track) => (typeof TRACKS !== 'undefined' && TRACKS[track.key]) || null;
  const trackLabel = (track) => `${track.artist} – ${track.title}`;
  const playlistOf = (el) => (typeof PLAYLISTS !== 'undefined' && PLAYLISTS[el.n]) || null;

  // Browser storage can be missing or blocked (private windows, sandboxed hosts): fall back to memory
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
    },
  };

  /* ── Isotopes: each visit to a genre plays its next track ──────── */
  const rotation = store.get('isotopes-rotation', {}); // atomic number -> index of the track last played
  function nextIsotope(el) {
    const last = rotation[el.n];
    const i = last === undefined ? 0 : (last + 1) % el.tracks.length;
    rotation[el.n] = i;
    store.set('isotopes-rotation', rotation);
    return i;
  }

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
    $('#p-track').textContent = `♪ ${trackLabel(el.track)}` + (el.tracks.length > 1 ? ` · ${el.tracks.length} isotopes` : '');
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
    $('#mine-view').hidden = view !== 'mine';
    if (view === 'mine') renderMine();
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
    return [el.name, el.sym, FAMILIES[el.family].name, ...el.tracks.flatMap((t) => [t.artist, t.title]), ...el.artists]
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
  let currentTrack = null;
  let currentIndex = 0;
  let player = null;
  let playerReady = false;
  let pending = null; // the latest request for the player: { video } or { list }

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
      playerVars: vars,
      events: {
        onReady: () => { playerReady = true; startPending(); },
        onStateChange: (e) => {
          const playing = e.data === YT.PlayerState.PLAYING;
          sheet.classList.toggle('is-playing', playing);
          document.querySelectorAll('.cell.playing').forEach((c) => c.classList.remove('playing'));
          if (playing && current) document.querySelectorAll(`.cell[data-n="${current.n}"]`).forEach((c) => c.classList.add('playing'));
        },
        onError: () => showPlayerMsg(ytUrl(currentTrack)),
      },
    });
  };

  function showPlayerMsg(url, text) {
    const msg = $('#player-msg');
    msg.innerHTML = text || `This video can't be played here. <br><a href="${url}" target="_blank" rel="noopener">Listen on YouTube ↗</a>`;
    msg.hidden = false;
  }

  function ytUrl(track) {
    const id = ytId(track);
    return id ? `https://www.youtube.com/watch?v=${id}`
      : `https://www.youtube.com/results?search_query=${encodeURIComponent(track.artist + ' ' + track.title)}`;
  }
  const playlistUrl = (pl) => `https://www.youtube.com/playlist?list=${pl.id}`;

  // Queues a request for the player, loading the YouTube API on first use.
  // `pending` is { video } or { list }, replayed once the player is ready.
  function cue(req) {
    if (location.protocol === 'file:') {
      showPlayerMsg('', 'YouTube won\'t play videos on pages opened straight from a file. Run <code>node tools/serve.mjs</code> and open <b>http://localhost:5173</b>,'
        + ` or <a href="${req.url}" target="_blank" rel="noopener">listen on YouTube ↗</a>`);
      return;
    }
    pending = req;
    if (playerReady) startPending();
    else loadYouTubeAPI();
  }
  function startPending() {
    if (!pending) return;
    if (pending.list) player.loadPlaylist({ list: pending.list, listType: 'playlist' });
    else player.loadVideoById(pending.video);
  }

  function showTrack(el, i) {
    currentIndex = i;
    currentTrack = el.tracks[i];
    const t = currentTrack;
    $('#m-track').textContent = trackLabel(t);
    $('.now-label').textContent = LINK_OUT ? (i ? 'Isotope' : 'Signature track') : 'Now playing';
    $('#m-yt').href = ytUrl(t);
    $('#m-iso').textContent = el.tracks.length > 1 ? `Isotope ${i + 1} of ${el.tracks.length}` : 'Signature track';
    $('#m-iso-next').hidden = el.tracks.length < 2;
    $('#player-msg').hidden = true;
    if (LINK_OUT) {
      const out = $('#play-out');
      out.href = ytUrl(t);
      out.innerHTML = `<span class="play-icon" aria-hidden="true">▶</span>
        <span class="play-text"><b>Play on YouTube</b><span>${trackLabel(t)}</span></span>`;
      out.setAttribute('aria-label', `Play ${trackLabel(t)} on YouTube (opens in a new tab)`);
      return;
    }
    const id = ytId(t);
    if (!id) { showPlayerMsg(ytUrl(t)); if (playerReady) player.stopVideo(); return; }
    cue({ video: id, url: ytUrl(t) });
  }

  function playPlaylist(el) {
    const pl = playlistOf(el);
    if (!pl) return;
    $('.now-label').textContent = 'Playing a playlist';
    $('#m-track').textContent = pl.title;
    $('#m-yt').href = playlistUrl(pl);
    $('#player-msg').hidden = true;
    cue({ list: pl.id, url: playlistUrl(pl) });
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
    $('#m-blurb').textContent = el.blurb;
    const pl = playlistOf(el);
    $('#m-playlist').hidden = !pl;
    if (pl) {
      $('#m-playlist').href = playlistUrl(pl);
      $('#m-playlist').title = `${pl.title}${pl.count ? ` · ${pl.count} videos` : ''}`;
    }
    syncStar(el);
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
    showTrack(el, nextIsotope(el));
    try { history.replaceState(null, '', '#' + el.n); } catch { /* sandboxed */ }
  }

  function close() {
    if (playerReady) player.pauseVideo();
    sheet.classList.remove('is-playing');
    if (modal.open) modal.close();
    try { history.replaceState(null, '', location.pathname + location.search + (shared ? '#my=' + shared.code : '')); } catch { /* sandboxed */ }
    const c = grid.querySelector(`.cell[data-n="${current?.n}"]`);
    if (c && !$('#table-view').hidden) focusCell(c);
  }

  const step = (d) => open(((current.n - 1 + d + 118) % 118) + 1);
  $('#m-iso-next').addEventListener('click', () => current && showTrack(current, nextIsotope(current)));
  $('#m-playlist').addEventListener('click', (e) => {
    if (LINK_OUT || !current) return; // link-out hosts follow the link to YouTube
    e.preventDefault();
    playPlaylist(current);
  });
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

  /* ── My table: the genres that made you, shareable as a link ───── */
  // { name, items: [{ n, note }] } in the order the person added them, so the list reads as their story
  const mine = store.get('isotopes-mine', { name: '', items: [] });
  let shared = null; // a table opened from someone's link: { name, items, code }

  const inMine = (n) => mine.items.find((x) => x.n === n);
  function saveMine() {
    store.set('isotopes-mine', mine);
    document.querySelectorAll('.cell').forEach((c) => c.classList.toggle('mine', !!inMine(+c.dataset.n)));
    $('#mine-count').textContent = mine.items.length || '';
  }

  // The table travels in the URL as base64url JSON, so sharing needs no server
  function encodeTable(t) {
    const json = JSON.stringify({ v: 1, name: t.name, items: t.items.map((x) => (x.note ? [x.n, x.note] : x.n)) });
    let bin = '';
    new TextEncoder().encode(json).forEach((b) => { bin += String.fromCharCode(b); });
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function decodeTable(code) {
    try {
      const bin = atob(code.replace(/-/g, '+').replace(/_/g, '/'));
      const data = JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0))));
      const seen = new Set();
      const items = (data.items || [])
        .map((x) => (Array.isArray(x) ? { n: +x[0], note: String(x[1] || '').slice(0, 140) } : { n: +x, note: '' }))
        .filter((x) => byN.has(x.n) && !seen.has(x.n) && seen.add(x.n));
      return { name: String(data.name || '').slice(0, 40), items, code };
    } catch {
      return null;
    }
  }
  // Hosts that can't embed YouTube are sandboxed too, so their share links point at the public site
  const SITE_URL = 'https://kytsym.github.io/isotopes/';
  const shareUrl = () => `${LINK_OUT ? SITE_URL : location.origin + location.pathname}#my=${encodeTable(mine)}`;

  function syncStar(el) {
    const item = inMine(el.n);
    const star = $('#m-star');
    star.setAttribute('aria-pressed', String(!!item));
    star.textContent = item ? '★ In my table' : '☆ Add to my table';
    $('#m-note-wrap').hidden = !item;
    $('#m-note').value = item ? item.note : '';
  }

  const mineVisible = () => !$('#mine-view').hidden;
  $('#m-star').addEventListener('click', () => {
    if (!current) return;
    const item = inMine(current.n);
    if (item) mine.items.splice(mine.items.indexOf(item), 1);
    else mine.items.push({ n: current.n, note: '' });
    saveMine();
    syncStar(current);
    if (mineVisible()) renderMine();
  });
  $('#m-note').addEventListener('input', (e) => {
    const item = current && inMine(current.n);
    if (!item) return;
    item.note = e.target.value;
    saveMine();
    if (mineVisible()) renderMine();
  });
  $('#m-note-use').addEventListener('click', () => {
    if (!currentTrack) return;
    $('#m-note').value = trackLabel(currentTrack);
    $('#m-note').dispatchEvent(new Event('input'));
  });

  const make = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  };
  function button(text, onClick, cls = 'pill') {
    const b = make('button', cls, text);
    b.type = 'button';
    b.addEventListener('click', onClick);
    return b;
  }

  function renderMine() {
    const root = $('#mine-view');
    const t = shared || mine;
    const readOnly = !!shared;
    const chosen = new Set(t.items.map((x) => x.n));
    root.replaceChildren();

    const head = make('div', 'mine-head');
    if (readOnly) {
      const banner = make('div', 'mine-banner');
      banner.append(make('p', '', `You\u2019re looking at ${t.name ? t.name + '’s' : 'someone’s'} table: ${t.items.length} genres that made them.`));
      const acts = make('div', 'mine-actions');
      acts.append(
        button('Add these to my table', () => {
          t.items.forEach((x) => { if (!inMine(x.n)) mine.items.push({ n: x.n, note: '' }); });
          leaveShared();
        }),
        button('Back to my table', leaveShared, 'pill ghost'),
      );
      banner.append(acts);
      head.append(banner);
    }
    head.append(make('h2', 'mine-title', t.name ? `${t.name}’s isotopes` : readOnly ? 'Their isotopes' : 'My isotopes'));
    if (!readOnly) {
      const label = make('label', 'mine-name');
      label.append(make('span', '', 'Whose table is this?'));
      const input = make('input');
      input.type = 'text';
      input.maxLength = 40;
      input.placeholder = 'Your name';
      input.value = mine.name;
      input.addEventListener('change', () => { mine.name = input.value.trim(); saveMine(); renderMine(); });
      label.append(input);
      head.append(label);
    }
    root.append(head);

    if (!t.items.length) {
      const empty = make('div', 'mine-empty');
      empty.append(
        make('p', '', 'Your table is empty. Open any genre and tap ☆ Add to my table.'),
        make('p', '', 'Add them in the order you found them and it becomes your story: the genre that hooked you first, and everything it led to. Then share it as a link.'),
      );
      root.append(empty);
      return;
    }

    // Chemistry: how the table splits across families
    const chem = make('div', 'mine-chem');
    FAMILY_ORDER.forEach((key) => {
      const count = t.items.filter((x) => byN.get(x.n).family === key).length;
      if (!count) return;
      const bar = make('span', 'chem-bar');
      bar.dataset.family = key;
      bar.style.flexGrow = count;
      bar.title = `${FAMILIES[key].name}: ${count}`;
      bar.append(make('span', '', `${FAMILIES[key].name} ${Math.round((count / t.items.length) * 100)}%`));
      chem.append(bar);
    });
    root.append(chem);

    // The journey: one row per genre, linked to the genres in this table it connects to
    const list = make('ol', 'journey');
    t.items.forEach((item, i) => {
      const el = byN.get(item.n);
      const li = make('li', 'journey-row');
      li.dataset.family = el.family;
      li.append(makeCell(el));
      const text = make('div', 'journey-text');
      text.append(make('p', 'journey-step', i === 0 ? 'Where it started' : `Then ${FAMILIES[el.family].name}`));
      text.append(make('h3', '', el.name));
      if (item.note) text.append(make('p', 'journey-note', `“${item.note}”`));
      // Linked by the genre data's `related` lists, or by sharing a family
      const links = t.items.filter((x) => {
        const o = byN.get(x.n);
        return o !== el && (el.related.includes(o.n) || o.related.includes(el.n) || o.family === el.family);
      });
      if (links.length) {
        const c = make('div', 'chips');
        c.append(make('span', 'chips-label', 'Connects to'), ...links.map((x) => chip(byN.get(x.n))));
        text.append(c);
      }
      li.append(text);
      if (!readOnly) {
        const ctl = make('div', 'journey-ctl');
        const move = (d) => () => {
          const j = i + d;
          if (j < 0 || j >= mine.items.length) return;
          [mine.items[i], mine.items[j]] = [mine.items[j], mine.items[i]];
          saveMine();
          renderMine();
        };
        const up = button('↑', move(-1), 'icon-btn');
        up.setAttribute('aria-label', `Move ${el.name} earlier`);
        up.disabled = i === 0;
        const down = button('↓', move(1), 'icon-btn');
        down.setAttribute('aria-label', `Move ${el.name} later`);
        down.disabled = i === t.items.length - 1;
        const del = button('✕', () => { mine.items.splice(i, 1); saveMine(); renderMine(); }, 'icon-btn');
        del.setAttribute('aria-label', `Remove ${el.name} from my table`);
        ctl.append(up, down, del);
        li.append(ctl);
      }
      list.append(li);
    });
    root.append(list);

    // Where to next: related genres this table doesn't have yet, most connected first
    const score = new Map();
    t.items.forEach((x) => byN.get(x.n).related.forEach((r) => { if (!chosen.has(r)) score.set(r, (score.get(r) || 0) + 1); }));
    const next = [...score].sort((a, b) => b[1] - a[1] || a[0] - b[0]).slice(0, 8);
    if (next.length) {
      const sec = make('div', 'mine-next');
      sec.append(make('h3', '', readOnly ? 'Where they could go next' : 'Where to next'));
      const c = make('div', 'chips');
      c.append(...next.map(([n]) => chip(byN.get(n))));
      sec.append(c);
      root.append(sec);
    }

    if (!readOnly) {
      const acts = make('div', 'mine-actions');
      const status = make('span', 'mine-status');
      status.setAttribute('role', 'status');
      acts.append(
        button('Copy share link', async () => {
          const url = shareUrl();
          try {
            await navigator.clipboard.writeText(url);
            status.textContent = 'Link copied. Anyone who opens it sees your table.';
          } catch {
            const field = make('input', 'share-field');
            field.readOnly = true;
            field.value = url;
            status.replaceChildren(field);
            field.select();
          }
        }),
        button('Clear table', () => {
          if (!confirm('Remove every genre from your table?')) return;
          mine.items.length = 0;
          saveMine();
          renderMine();
        }, 'pill ghost'),
        status,
      );
      root.append(acts);
    }
  }

  function leaveShared() {
    shared = null;
    saveMine();
    try { history.replaceState(null, '', location.pathname + location.search); } catch { /* sandboxed */ }
    renderMine();
  }

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
    $('#stream-note').textContent = 'Tracks open on YouTube.';
    $('.sub').textContent = '118 genres arranged like the elements, each with its own isotopes: open one again to find another track. Star the ones that made you, and build your own table.';
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

  saveMine();
  if (location.hash.startsWith('#my=')) shared = decodeTable(location.hash.slice(4));
  if (shared) setView('mine', false);
  else {
    let saved = null;
    try { saved = localStorage.getItem('edm-view'); } catch { /* storage unavailable */ }
    setView(saved || (matchMedia('(min-width: 900px)').matches ? 'table' : 'families'), false);
  }

  const hashN = parseInt(location.hash.slice(1), 10);
  if (byN.has(hashN)) open(hashN);
})();
