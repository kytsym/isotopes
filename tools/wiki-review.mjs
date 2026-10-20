// Checks each genre's signature tracks against its Wikipedia article and writes a review sheet.
//
//   node tools/wiki-review.mjs          → review/genre-review.md (+ review/genre-review.json)
//
// For every element it finds the genre's article (the `wiki` option, else a search), then pulls
// out the tracks the article names: "Title" by Artist in the prose, and "Artist - Title" in the
// references. It flags picks whose artist isn't in the element's own artist list or the article.
// Wikipedia records what is notable, not what resonates, so the sheet suggests; a person decides.

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'data/elements.js'), 'utf8') + ';this.ELEMENTS=ELEMENTS;this.FAMILIES=FAMILIES', ctx);
const { ELEMENTS: elements, FAMILIES: families } = ctx;

const UA = 'IsotopesGenreReview/1.0 (https://github.com/kytsym/isotopes)';
const API = 'https://en.wikipedia.org/w/api.php';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(params) {
  const url = API + '?' + new URLSearchParams({ format: 'json', formatversion: '2', ...params });
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA } });
      if (res.ok) return res.json();
      if (attempt >= 4) throw new Error(`HTTP ${res.status}`);
    } catch (e) {
      if (attempt >= 4) throw e;
    }
    await sleep(1500 * attempt);
  }
}

async function wikitext(title) {
  const r = await api({ action: 'parse', page: title, prop: 'wikitext', redirects: '1' });
  return r.error ? null : { title: r.parse.title, text: r.parse.wikitext };
}

// Prefer an explicit title, then music-specific titles for the genre name, then a search hit whose
// title shares a word with the genre (a broad "List of ..." page doesn't count as the genre's article)
async function article(el) {
  const tries = el.wiki ? [el.wiki] : [`${el.name} (music)`, `${el.name} music`, `${el.name} (genre)`, el.name];
  for (const t of tries) {
    const a = await wikitext(t);
    if (a && !/\{\{\s*disambiguation/i.test(a.text) && !/may refer to:/.test(a.text)) return a;
  }
  const s = await api({ action: 'query', list: 'search', srsearch: `${el.name} electronic music genre`, srlimit: '1' });
  const hit = s.query?.search?.[0];
  const words = norm(el.name).split(' ').filter((w) => w.length > 2 && !['house', 'music'].includes(w));
  const ok = hit && !/^list of/i.test(hit.title) && words.some((w) => norm(hit.title).includes(w));
  return ok ? wikitext(hit.title) : null;
}

const norm = (s) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, ' ').trim();

// Wiki markup to roughly plain text: links become their label, formatting and templates go
function plain(text) {
  return text
    .replace(/<ref[^>]*\/>/g, '')
    .replace(/<ref[\s\S]*?<\/ref>/g, '')
    .replace(/\{\{[^{}]*\}\}/g, '')
    .replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, '$1')
    .replace(/'{2,}/g, '')
    .replace(/[“”]/g, '"');
}

const ARTIST = String.raw`([A-Z0-9][\w.&'!$ -]{1,40}?)`;
const TITLE = String.raw`"([^"\n]{2,60})"`;
const PROSE = [
  new RegExp(TITLE + String.raw`\s*(?:\(\d{4}\)\s*)?by\s+(?:the\s+)?` + ARTIST + String.raw`(?=[,.;)\n]| and | in | on | with | from | was | which)`, 'g'),
  new RegExp(ARTIST + String.raw`'s\s+(?:\d{4}\s+)?(?:single|track|song|record|hit|release)?\s*` + TITLE, 'g'),
  new RegExp(ARTIST + String.raw`\s+[-–—:]\s+` + TITLE, 'g'),
];

function candidates(text) {
  const found = new Map();
  const add = (artist, title, where) => {
    artist = artist.trim().replace(/^the\s+/i, '');
    title = title.trim();
    if (!artist || !title || artist.length > 40 || /^(and|the|a|in|by)$/i.test(artist)) return;
    const key = norm(artist) + '|' + norm(title);
    if (!found.has(key)) found.set(key, { artist, title, where });
  };
  const p = plain(text);
  for (const re of PROSE) for (const m of p.matchAll(re)) {
    if (re === PROSE[0]) add(m[2], m[1], 'text'); else add(m[1], m[2], 'text');
  }
  // References to a release (Discogs, Beatport, YouTube, liner notes): title=Artist - Title
  const releaseRefs = [...text.matchAll(/\{\{\s*cite[^{}]*\}\}/gi)].map((m) => m[0])
    .filter((c) => /discogs|beatport|youtube|bandcamp|cite (av media|album|single|song)/i.test(c)).join('\n');
  for (const m of releaseRefs.matchAll(/\|\s*title\s*=\s*([^|}\n]+)/g)) {
    const t = m[1].replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, '$1').trim();
    const parts = t.split(/\s+[-–—]\s+/);
    if (parts.length === 2 && parts[0].length < 40 && parts[1].length < 60) add(parts[0], parts[1].replace(/"/g, ''), 'ref');
  }
  return [...found.values()];
}

const results = [];
for (const el of elements) {
  let a = null;
  try { a = await article(el); } catch (e) { console.log(`${el.n}\t${el.name}\tERROR ${e.message}`); }
  const text = a ? a.text : '';
  const body = norm(plain(text));
  const mentioned = (name) => body.includes(norm(name));
  const trackArtists = el.track.artist.split(/\s*(?:&|,| x | vs\.? | feat\.? )\s*/i);
  const inList = trackArtists.some((t) => el.artists.some((x) => norm(x).includes(norm(t)) || norm(t).includes(norm(x))));
  const onWiki = trackArtists.some(mentioned);
  const cands = a ? candidates(text) : [];
  const flags = [];
  if (!a) flags.push('no article');
  else {
    if (!inList) flags.push('track artist not in artist list');
    if (!onWiki) flags.push('track artist not on Wikipedia');
    if (!cands.length) flags.push('article names no tracks');
  }
  results.push({
    n: el.n, name: el.name, family: el.family, article: a?.title || null,
    current: `${el.track.artist} — ${el.track.title}`, isotopes: el.tracks.slice(1).map((t) => t.key), artists: el.artists,
    artistsOnWiki: el.artists.filter(mentioned), flags, candidates: cands,
  });
  console.log(`${el.n}\t${el.name}\t${a?.title || '-'}\t${cands.length} tracks\t${flags.join('; ')}`);
  await sleep(150);
}

const dir = path.join(root, 'review');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'genre-review.json'), JSON.stringify(results, null, 2) + '\n');

const md = s => String(s).replace(/\|/g, '\\|');
const link = (t) => `[${md(t)}](https://en.wikipedia.org/wiki/${encodeURIComponent(t.replace(/ /g, '_'))})`;
let out = `# Genre track review\n\nGenerated by \`node tools/wiki-review.mjs\`. ⚠️ marks a pick worth a second look.\n` +
  `Wikipedia shows what is notable or historically first, not what resonates: use it as a prompt, not a verdict.\n` +
  `To change a pick, edit the genre's track list in data/elements.js (signature first), then run \`node tools/find-tracks.mjs <number>\`.\n`;
for (const [key, fam] of Object.entries(families)) {
  out += `\n## ${fam.name}\n\n| # | Genre | Signature track | Other isotopes | Wikipedia names | Notes |\n|---|---|---|---|---|---|\n`;
  for (const r of results.filter((x) => x.family === key).sort((a, b) => a.n - b.n)) {
    const cands = r.candidates.slice(0, 8).map((c) => `${md(c.artist)} — ${md(c.title)}`).join('<br>') || '–';
    const notes = [...r.flags.map((f) => '⚠️ ' + f), r.artistsOnWiki.length ? 'on Wikipedia: ' + r.artistsOnWiki.join(', ') : '']
      .filter(Boolean).join('<br>');
    const isotopes = r.isotopes.map(md).join('<br>') || '–';
    out += `| ${r.n} | ${r.article ? link(r.article) : md(r.name)}${r.article && r.article !== r.name ? ` (${md(r.name)})` : ''} | ${md(r.current)} | ${isotopes} | ${cands} | ${md(notes)} |\n`;
  }
}
fs.writeFileSync(path.join(dir, 'genre-review.md'), out);
const flagged = results.filter((r) => r.flags.length).length;
console.log(`\nWrote review/genre-review.md: ${results.length} genres, ${flagged} flagged.`);
