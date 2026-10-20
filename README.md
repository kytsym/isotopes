# The Periodic Table of Electronic Dance Music

118 EDM genres and subgenres laid out like the periodic table. Click (or tap) an element to open its
card and play a track that represents the genre.

## Run it

YouTube embeds won't play on a page opened straight from a file, so serve it locally:

```bash
node tools/serve.mjs
```

Then open <http://localhost:5173>. Any static host (GitHub Pages, Netlify, …) works too, because it's plain HTML, CSS and JS
with no build step.

## Shareable version

```bash
node tools/build-artifact.mjs
```

This bundles everything into `dist/periodic-table-of-edm.html`, one self-contained page published as a Claude Artifact.
Artifacts can't embed YouTube, so in that build each genre card has a "Play on YouTube" button instead of the inline player.

## How the table maps

| Chemical block | EDM family |
|---|---|
| Group 1, alkali metals (H) | Synth Pop / Electro (H = Kraftwerk, "Tour De France") |
| Group 2, alkaline earth | Disco / Funk roots |
| Transition metals | House: Chicago foundations (period 4) → 90s (5) → EDM era (6) → newest (7) |
| Nonmetals & metalloids | Trance |
| Post-transition metals | Bass / Breaks |
| Group 17, halogens | Hardcore / Hardstyle |
| Group 18, noble gases | Techno (He = Techno) |
| Lanthanides | Ambient / Downtempo |
| Actinides | Global & Experimental |

The number in each cell's top-right corner (where the atomic mass would be) is the genre's typical BPM.
A small dot marks genres I suggested beyond the reference taxonomy, so they're worth reviewing.

## Editing

- **Genres:** `data/elements.js`. Each `E(...)` line is one element: number, symbol, name, family, BPM, era,
  artists, `"Artist — Title"` track, description, and options (`related`, `suggested`, `wiki`).
- **Tracks:** `data/tracks.js` maps atomic number → YouTube video id. To swap a song, either paste a new id there,
  or change the track in `elements.js` and run:

  ```bash
  node tools/find-tracks.mjs 43        # re-search element 43 (several numbers allowed)
  node tools/find-tracks.mjs --all     # re-search everything
  ```

  The finder only keeps videos that YouTube allows to be embedded, and prints the matched titles so you can check them.

## Files

```
index.html          page shell and modal
styles.css          layout, colours, mobile bottom sheet
app.js              table/families rendering, search, legend, modal, YouTube player
data/elements.js    the 118 genres
data/tracks.js      YouTube ids
tools/find-tracks.mjs  YouTube id finder/verifier
tools/serve.mjs     local static server
```

Genre taxonomy adapted from mixgraph's genre tree, Ozgy's electronic music family tree and Pulse Roots.
