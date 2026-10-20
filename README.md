# Isotopes: a periodic table of electronic music

Live at <https://kytsym.github.io/isotopes/>.

A love letter to electronic music fans: 118 genres and subgenres laid out like the periodic table.

- **Isotopes.** Each genre has a signature track plus a few alternates. Every time you open a genre it plays the next one,
  and "Next isotope ›" skips ahead. Your browser remembers where you got to.
- **Playlists.** Most genres have a "Play the full playlist" button that plays a YouTube playlist of the genre in the card.
- **My table.** Star the genres that made you, in the order you found them, and note the track that got you into each one.
  The My table view turns that into your story: how it splits across families, how your genres connect, and where to go next.
  "Copy share link" puts the whole table in the link (nothing is stored on a server), so anyone who opens it sees your table
  and can add it to their own.

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

This bundles everything into `dist/isotopes.html`, one self-contained page published as a Claude Artifact.
Artifacts can't embed YouTube, so in that build each genre card has a "Play on YouTube" button instead of the inline player.

## How the table maps

| Chemical block | EDM family |
|---|---|
| Group 1, alkali metals | Synth Pop / Electro (element 1, Sy = Kraftwerk, "Tour De France") |
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
  artists, a list of `"Artist — Title"` tracks (signature first, then the isotopes), description, and options
  (`related`, `suggested`, `wiki`).
- **Tracks:** `data/tracks.js` maps `"Artist — Title"` → YouTube video id. To swap a song, either paste a new id there,
  or change the track list in `elements.js` and run:

  ```bash
  node tools/find-tracks.mjs           # find ids for any tracks that don't have one
  node tools/find-tracks.mjs 43        # re-search every track of element 43 (several numbers allowed)
  ```

  The finder only keeps videos that YouTube allows to be embedded, and prints the matched titles so you can check them.
  A `?` marks a video whose title doesn't share a word with the track title.
- **Playlists:** `data/playlists.js`, filled by `node tools/find-playlists.mjs` (same arguments). Playlists belong to other
  YouTube users, so check the printed titles and re-run a genre if its playlist disappears.
- **Track review:** `node tools/wiki-review.mjs` writes `review/genre-review.md`, which compares each genre's tracks with
  the tracks its Wikipedia article names and flags picks worth a second look.

## Files

```
index.html          page shell and modal
styles.css          layout, colours, mobile bottom sheet
app.js              table/families rendering, search, legend, modal, YouTube player
data/elements.js    the 118 genres
data/tracks.js      YouTube ids, keyed by "Artist — Title"
data/playlists.js   YouTube playlist per genre
review/             Wikipedia track review (generated)
tools/find-tracks.mjs     YouTube id finder/verifier
tools/find-playlists.mjs  YouTube playlist finder
tools/wiki-review.mjs     Wikipedia track review
tools/serve.mjs     local static server
```

Genre taxonomy adapted from mixgraph's genre tree, Ozgy's electronic music family tree and Pulse Roots.
