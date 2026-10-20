// Bundles the site into one self-contained page for publishing as a Claude Artifact.
//
//   node tools/build-artifact.mjs      → dist/periodic-table-of-edm.html
//
// Artifacts can't embed YouTube, so the bundle sets window.EDM_LINK_OUT and each genre
// card links out to YouTube instead of playing inline. The local site is unchanged.
// The output has no <html>/<head>/<body> tags because the Artifact host adds its own skeleton.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const html = read('index.html');

const pick = (re, label) => {
  const m = html.match(re);
  if (!m) throw new Error(`index.html: couldn't find ${label}`);
  return m[1];
};
const title = pick(/<title>([\s\S]*?)<\/title>/, '<title>');
const description = pick(/<meta name="description" content="([^"]*)">/, 'meta description');
const fontLinks = [...html.matchAll(/<link [^>]*fonts\.(?:googleapis|gstatic)\.com[^>]*>/g)].map((m) => m[0]).join('\n');
let body = pick(/<body>([\s\S]*?)<\/body>/, '<body>');

// Inline each local script, with the link-out flag first
const inlineJs = (src) => {
  const js = read(src);
  if (/<\/script/i.test(js)) throw new Error(`${src} contains "</script", which would break inlining`);
  return `<script>\n${js}\n</script>`;
};
let first = true;
body = body.replace(/<script src="([^"]+)"><\/script>/g, (_, src) => {
  const flag = first ? '<script>window.EDM_LINK_OUT = true;</script>\n' : '';
  first = false;
  return flag + inlineJs(src);
});

const out = `<title>${title}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="${description}">
${fontLinks}
<style>
${read('styles.css')}
</style>
${body.trim()}
`;

fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
const dest = path.join(root, 'dist/periodic-table-of-edm.html');
fs.writeFileSync(dest, out);
console.log(`Wrote ${path.relative(root, dest)} (${(out.length / 1024).toFixed(1)} KB)`);
