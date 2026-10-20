# Progress: updated 2026-10-20

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

- [x] Local git repo on `main` with everything committed (no remote yet).

## Next: resume on the MacBook (paused 2026-10-20)
The user's GitHub account and setup live on their MacBook, so the GitHub Pages deploy happens there.

**Goal:** a public site at `https://kytsym.github.io/edm-periodic-table/` where the built-in YouTube player plays tracks
in the page. The Artifact can't do this because it links out. The site needs nothing beyond static files (no build step, no Supabase).

1. Unzip `edm-periodic-table.zip` on the Mac. It includes the `.git` history.
2. Open the folder in the Claude app (Code tab) and say "resume".
3. Create a **public** repo named `edm-periodic-table` on GitHub (free Pages requires public), with no README so it stays empty.
   With the GitHub CLI: `gh repo create edm-periodic-table --public --source . --push`
   Otherwise: `git remote add origin https://github.com/kytsym/edm-periodic-table.git && git push -u origin main`
4. Turn on Pages: repo Settings → Pages → Source "Deploy from a branch" → `main` / root.
   With the CLI: `gh api repos/kytsym/edm-periodic-table/pages -X POST -f "source[branch]=main" -f "source[path]=/"`
5. Verify: open the Pages URL, click H, and confirm Kraftwerk "Tour De France" plays inside the card.
   Then spot-check one element per family on desktop and at phone width.

## Open
1. Some tracks are fan uploads rather than official ones (for example Acid Tracks, Strings of Life, Quadrant Dub). They may get taken down later;
   rerun `node tools/find-tracks.mjs <number>` if one stops playing.
2. Optional: more genre or track changes from the user.
