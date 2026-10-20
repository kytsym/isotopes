# Progress: updated 2026-10-21

## Done
- [x] `data/elements.js`: all 118 genres mapped to their periodic-table positions (validated: no gaps, unique symbols, every related link resolves)
- [x] `data/tracks.js`: **118/118 YouTube tracks**, each unique and confirmed embeddable through YouTube oEmbed
  - Italo Disco (38): changed from Klein + M.B.O. "Dirty Talk" (not embeddable anywhere on YouTube) to Kano "I'm Ready"
  - Gabber (35): changed to Rotterdam Terror Corps "Gabberen", which is the upload YouTube has
  - Tycho "Awake" (70): set by hand to the Ghostly International upload (the search had found a full-album video)
- [x] Page: table view (desktop), families view (mobile default), search, legend highlight, modal with the YouTube player
- [x] Checked in the browser: one element per family plays the right track, related-genre buttons jump to their genre,
  closing the card pauses the music, no console errors, no sideways page scroll on a phone

- [x] Review pass on the suggested genres. Replaced 7 weak picks and re-sourced one track; each new track plays in the browser:
  - 51 Full-on Psy → **Progressive Psy** (Liquid Soul, "Global Illumination")
  - 63 Lo-fi Beats → **Ambient Techno** (Biosphere, "Novelty Waves")
  - 64 Chillwave → **Downtempo House** (Kiasmos, "Looped")
  - 76 UK Deep House → **Deep Tech** (Azari & III, "Hungry for the Power", Jamie Jones Remix)
  - 97 Witch House → **UK Funky** (Kyla, "Do You Mind", Crazy Cousinz Remix)
  - 100 Hyperpop → **Grime** (Wiley, "Eskimo")
  - 111 Gospel House → **Jackin' House** (Green Velvet, "Flash")
  - 96 Moombahton: the track changed from "Lean On" to Dillon Francis & Diplo, "Que Que"

- [x] Published as a private Artifact: https://claude.ai/artifact/32hpyUPbAQToyW6cpd2RqU
  - Artifacts can't embed YouTube, so that version links out to YouTube (a "Play on YouTube" button on each card).
    The local site still plays tracks inline.
  - To update it: `node tools/build-artifact.mjs`, then republish `dist/periodic-table-of-edm.html` to the same URL.

- [x] Git repo on `main`, pushed to GitHub.

- [x] **Live on GitHub Pages** (2026-10-21): https://kytsym.github.io/isotopes/ (was edm-periodic-table; repo renamed)
  - Repo: https://github.com/kytsym/isotopes (public, Pages serves `main` / root, no build step)
  - Checked on the live site: tracks play inside the card (Kraftwerk, Frankie Knuckles, Headhunterz, Uncle Waffles),
    switching genres changes the track, and the phone layout opens in families view with no sideways scroll
  - To update it: commit to `main` and `git push`. Pages rebuilds in about 30 seconds.

## Isotopes release (2026-10-21)
Plan: `~/.claude/plans/i-think-the-site-cozy-metcalfe.md`
- [x] Renamed to "Isotopes: a periodic table of electronic music" (page, README, build output `dist/isotopes.html`); GitHub repo renamed to `isotopes`
- [x] `data/elements.js`: each genre has a track list (signature first + isotopes), 388 tracks; Hard Trance leads with Jones & Stephenson, Scooter removed from Happy Hardcore
- [x] `data/tracks.js` now keyed by "Artist — Title"; `tools/find-tracks.mjs` handles lists and flags title mismatches with "?"
- [x] `app.js`: isotope rotation (remembered per browser), "Next isotope ›", playlist button, My Table view (star, note, reorder, family split, connections, where-next, share link `#my=`)
- [x] `tools/wiki-review.mjs` → `review/genre-review.md`; `tools/find-playlists.mjs` → `data/playlists.js`
- [x] Tested locally: rotation, star/note, share link round-trip, no console errors
- [x] 386/386 tracks have YouTube ids. Fixed wrong matches by hand (Marshall Jefferson original, Thievery Corporation, London Elektricity, Hooverphonic, Tapp, Farley Jackmaster Funk, DJ Seduction, Donae'o); dropped Neelix and Ansome picks; Dubdogz → "Infinity"
- [x] 117/118 genres have playlists (Electronic Dub has none: the only match was off-genre)
- [x] `review/genre-review.md` regenerated with every isotope
- [x] Tested locally: playlist plays in the card, phone width (fixed a card overflow from long playlist titles), light and dark mode
- [ ] **User:** go through `review/genre-review.md` and choose track swaps
- [ ] Republish the Artifact from `dist/isotopes.html` (built; not yet republished)

## Open
1. Some tracks are fan uploads rather than official ones (for example Acid Tracks, Strings of Life, Quadrant Dub). They may get taken down later;
   rerun `node tools/find-tracks.mjs <number>` if one stops playing.
2. Optional: more genre or track changes from the user.
