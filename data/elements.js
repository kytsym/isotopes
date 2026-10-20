/*
 * Periodic Table of Electronic Dance Music: element data.
 *
 * Each element: E(atomicNumber, symbol, name, family, bpm, era, artists, track, blurb, opts)
 *   - bpm:     typical range as a string; the first number is shown as the "atomic mass"
 *   - track:   "Artist — Title" (the YouTube id lives in data/tracks.js, keyed by atomic number)
 *   - opts:    { related: [atomicNumbers], suggested: true, wiki: "Page_title" }
 *
 * Grid position (period/group) is derived from the atomic number in app.js,
 * exactly like the real periodic table.
 * `suggested: true` marks genres added beyond the mixgraph reference taxonomy.
 */

const FAMILIES = {
  synth:   { name: 'Synth Pop / Electro',     chem: 'Alkali metals',          blurb: 'The machine-music origin point: drum machines, sequencers and synthesisers.' },
  disco:   { name: 'Disco / Funk roots',      chem: 'Alkaline earth metals',  blurb: 'The four-on-the-floor ancestors everything else is built on.' },
  house:   { name: 'House',                   chem: 'Transition metals',      blurb: 'Born in 1980s Chicago; the largest, most conductive block of dance music.' },
  trance:  { name: 'Trance',                  chem: 'Nonmetals & metalloids', blurb: 'Euphoric builds, arpeggios and long breakdowns.' },
  bass:    { name: 'Bass / Breaks',           chem: 'Post-transition metals', blurb: 'Breakbeats, sub-bass and UK soundsystem culture.' },
  hard:    { name: 'Hardcore / Hardstyle',    chem: 'Halogens',               blurb: 'The most reactive column: fast, distorted and loud.' },
  techno:  { name: 'Techno',                  chem: 'Noble gases',            blurb: 'Stable, hypnotic and foundational: the noble column.' },
  ambient: { name: 'Ambient / Downtempo',     chem: 'Lanthanides',            blurb: 'The rare-earth row: slow, textural music for headphones and comedowns.' },
  global:  { name: 'Global & Experimental',   chem: 'Actinides',              blurb: 'Radioactive, unstable, and where the future comes from.' },
};

const ELEMENTS = [];
function E(n, sym, name, family, bpm, era, artists, track, blurb, opts = {}) {
  const [trackArtist, trackTitle] = track.split(' — ');
  ELEMENTS.push({
    n, sym, name, family, bpm, era, blurb,
    artists: artists.split(', '),
    track: { artist: trackArtist, title: trackTitle },
    related: opts.related || [],
    suggested: !!opts.suggested,
    wiki: opts.wiki || null,
  });
}

/* ── Group 1 · Synth Pop / Electro ─────────────────────────────── */
E(1,  'Sy', 'Synth Pop / Electro', 'synth', '80–130', '1970s Düsseldorf — present', 'Kraftwerk, Daft Punk, The Midnight',
  'Kraftwerk — Tour De France',
  'Hydrogen: the first element. Kraftwerk built the template for every machine-made dance record that followed.',
  { related: [3, 11, 2, 4], wiki: 'Synth-pop' });
E(3,  'El', 'Electro', 'synth', '120–130', '1980s New York / Detroit — present', 'Afrika Bambaataa, Drexciya, Anthony Rother',
  'Afrika Bambaataa & The Soulsonic Force — Planet Rock',
  'TR-808 breakbeats, robotic vocals and funk. The bridge from Kraftwerk to hip-hop, techno and Miami bass.',
  { related: [1, 2, 18], wiki: 'Electro_(music)' });
E(11, 'Sw', 'Synthwave', 'synth', '80–110', '2000s France — present', 'Kavinsky, The Midnight, Carpenter Brut',
  'Kavinsky — Nightcall',
  'Retro-futurist nostalgia for 1980s film scores, neon and VHS. Gated drums, analog leads, night drives.',
  { related: [37, 55, 1] });
E(19, 'Ec', 'Electroclash', 'synth', '120–130', 'Late 1990s Munich / New York', 'Fischerspooner, Miss Kittin & The Hacker, Peaches',
  'Fischerspooner — Emerge',
  'Deadpan vocals, cheap synths and art-school attitude. Electro meets new wave and punk.',
  { suggested: true, related: [3, 1, 45] });
E(37, 'Dk', 'Darksynth', 'synth', '100–130', '2010s France — present', 'Carpenter Brut, Perturbator, Dance with the Dead',
  'Carpenter Brut — Turbo Killer',
  'Synthwave pushed into horror and metal territory: distorted bass, aggressive tempos.',
  { suggested: true, related: [11, 87] });
E(55, 'Vw', 'Vaporwave', 'synth', '60–90', '2010s internet', 'Macintosh Plus, Saint Pepsi, James Ferraro',
  'Macintosh Plus — リサフランク420 / 現代のコンピュー',
  'Slowed, chopped mall-muzak and 80s samples. An ironic, dreamy internet-age artefact.',
  { related: [11, 48] });
E(87, 'Eb', 'EBM', 'synth', '110–130', '1980s Belgium / Germany', 'Front 242, Nitzer Ebb, DAF',
  'Front 242 — Headhunter',
  'Electronic Body Music: marching sequencer bass and shouted vocals. Industrial techno\'s direct ancestor.',
  { suggested: true, related: [86, 37], wiki: 'Electronic_body_music' });

/* ── Group 2 · Disco / Funk roots ──────────────────────────────── */
E(4,  'Ds', 'Disco', 'disco', '110–130', '1970s New York — present', 'Chic, Donna Summer, Giorgio Moroder',
  'Donna Summer — I Feel Love',
  'The mother of dance music. "I Feel Love" took disco fully electronic and pointed straight at house and techno.',
  { related: [21, 40, 12] });
E(12, 'Bg', 'Boogie', 'disco', '100–120', 'Early 1980s US', 'D Train, Kashif, Yarbrough & Peoples',
  'D Train — You\'re the One for Me',
  'Post-disco electro-funk: synth bass, drum machines and R&B vocals.',
  { suggested: true, related: [4, 3] });
E(20, 'Hi', 'Hi-NRG', 'disco', '120–140', 'Late 1970s San Francisco / UK', 'Patrick Cowley, Sylvester, Evelyn Thomas',
  'Sylvester — You Make Me Feel (Mighty Real)',
  'Faster, harder, sequenced disco. A key sound of the queer club scene and a template for Eurodance.',
  { suggested: true, related: [4, 28] });
E(38, 'It', 'Italo Disco', 'disco', '110–130', '1980s Italy', 'Giorgio Moroder, Klein + M.B.O., Gazebo',
  'Kano — I\'m Ready',
  'Italian synth-disco with arpeggiated basslines. Huge influence on early Chicago house.',
  { suggested: true, related: [4, 21, 27] });
E(56, 'Sd', 'Space Disco', 'disco', '115–130', 'Late 1970s France / Italy', 'Cerrone, Space, Didier Marouani',
  'Cerrone — Supernature',
  'Cosmic, synth-heavy disco with sci-fi themes. A favourite of cosmic and Balearic DJs.',
  { suggested: true, related: [4, 65] });
E(88, 'Nd', 'Nu-Disco', 'disco', '110–125', '2000s — present', 'Purple Disco Machine, Aeroplane, Late Nite Tuff Guy',
  'Purple Disco Machine — Hypnotized',
  'Disco re-edited and rebuilt for modern dancefloors. Still radiating energy decades later.',
  { related: [4, 40, 39] });

/* ── Transition metals · House ─────────────────────────────────── */
// Period 4: the Chicago / New York foundations
E(21, 'Ch', 'Chicago House', 'house', '118–128', '1980s Chicago — present', 'Frankie Knuckles, Larry Heard, Marshall Jefferson',
  'Frankie Knuckles — Your Love',
  'Four-on-the-floor dance music born at the Warehouse club. The base layer of modern electronic dance music.',
  { related: [4, 22, 23, 2], wiki: 'Chicago_house' });
E(22, 'Ac', 'Acid House', 'house', '118–128', '1980s Chicago / UK — present', 'Phuture, A Guy Called Gerald, 808 State',
  'Phuture — Acid Tracks',
  'Built around the Roland TB-303 squelch. Hypnotic and repetitive: the sound of the second summer of love.',
  { related: [21, 67, 11] });
E(23, 'Dh', 'Deep House', 'house', '118–125', '1980s Chicago — present', 'Larry Heard, Kerri Chandler, Lane 8',
  'Mr. Fingers — Can You Feel It',
  'Atmospheric, bass-led and melodically rich: the introspective end of the house spectrum.',
  { related: [21, 29, 76, 79] });
E(24, 'Gh', 'Garage House', 'house', '124–130', '1980s New York / New Jersey', 'Larry Levan, Ten City, Todd Edwards',
  'Ten City — That\'s the Way Love Is',
  'Named after the Paradise Garage: gospel vocals, live-sounding grooves and soul.',
  { related: [21, 29, 81], wiki: 'Garage_house' });
E(25, 'Hh', 'Hip House', 'house', '120–128', 'Late 1980s Chicago / UK', 'Fast Eddie, Tyree Cooper, Jungle Brothers',
  'Fast Eddie — Yo Yo Get Funky!',
  'Rap vocals over jacking house beats. A short-lived but influential crossover.',
  { suggested: true, related: [21, 26] });
E(26, 'Gt', 'Ghetto House', 'house', '125–135', '1990s Chicago', 'DJ Funk, Paul Johnson, DJ Deeon',
  'Paul Johnson — Get Get Down',
  'Raw, sample-heavy and minimal Dance Mania records. The direct parent of juke and footwork.',
  { suggested: true, related: [21, 92] });
E(27, 'Ih', 'Italo House', 'house', '120–126', 'Late 1980s Italy', 'Black Box, Starlight, 49ers',
  'Black Box — Ride on Time',
  'Big piano riffs and diva samples. Italy\'s euphoric answer to Chicago.',
  { suggested: true, related: [38, 112] });
E(28, 'Dv', 'Diva House', 'house', '120–128', '1990s US / UK', 'Robin S, CeCe Peniston, Crystal Waters',
  'Robin S — Show Me Love',
  'Soaring female vocals over chart-ready house beats.',
  { suggested: true, related: [29, 20] });
E(29, 'Sl', 'Soulful House', 'house', '118–125', '1990s New York — present', 'Frankie Feliciano, Louie Vega, Joey Negro',
  'Barbara Tucker — Beautiful People',
  'Gospel and soul vocals, live instrumentation and warm chords: house at its most uplifting.',
  { related: [24, 23, 28] });
E(30, 'Tr', 'Tribal House', 'house', '122–130', '1990s New York', 'Junior Vasquez, Danny Tenaglia, Erick Morillo',
  'Danny Tenaglia — Music Is the Answer',
  'Percussion-driven, hypnotic and dark. Built for long peak-time sets.',
  { related: [104, 108] });

// Period 5: the 1990s expansion
E(39, 'Fh', 'French House', 'house', '118–126', '1990s Paris', 'Daft Punk, Stardust, Cassius',
  'Stardust — Music Sounds Better with You',
  'Filtered disco samples, phasers and compression: the "French touch".',
  { related: [40, 88, 4] });
E(40, 'Dx', 'Disco House', 'house', '118–126', '1990s — present', 'Daft Punk, Spiller, Joey Negro',
  'Spiller — Groovejet (If This Ain\'t Love)',
  'Looped disco breaks and strings over a house kick.',
  { related: [4, 39, 88] });
E(41, 'Fk', 'Funky House', 'house', '124–128', '1990s US / UK', 'Armand Van Helden, Roger Sanchez, Bob Sinclar',
  'Armand Van Helden — You Don\'t Know Me',
  'Punchy, sample-driven and party-focused. A UK club staple of the late 90s.',
  { suggested: true, related: [39, 40] });
E(42, 'Ph', 'Progressive House', 'house', '122–130', '1990s UK — present', 'Sasha, Eric Prydz, Anjunadeep',
  'Eric Prydz — Opus',
  'Extended builds, emotional breakdowns and architected peaks: the long-form, melodic strain of house.',
  { related: [79, 6, 75] });
E(43, 'Tc', 'Tech House', 'house', '122–130', '1990s UK — present', 'Solomun, Patrick Topping, Sonny Fodera',
  'FISHER — Losing It',
  'Rolling percussion meets restrained techno energy. The dominant house style of the 2010s and 2020s.',
  { related: [2, 21, 80] });
E(44, 'Hd', 'Hard House', 'house', '135–150', '1990s UK', 'Tony De Vit, Lisa Lashes, BK',
  'Tony De Vit — Burning Up',
  'Pounding offbeat bass and hoover stabs. The fast, euphoric sound of UK clubs like Trade and Sundissential.',
  { suggested: true, related: [32, 9] });
E(45, 'Eh', 'Electro House', 'house', '125–130', '2000s — present', 'Benny Benassi, Justice, Deadmau5',
  'Benny Benassi — Satisfaction',
  'Distorted, buzzing synth basslines over house drums. The bridge to big-room EDM.',
  { suggested: true, related: [73, 74, 19] });
E(46, 'Mh', 'Microhouse', 'house', '118–125', 'Late 1990s Germany', 'Isolée, Akufen, Ricardo Villalobos',
  'Isolée — Beau Mot Plage',
  'Clicks, cuts and micro-samples. Minimal, detailed and quietly funky.',
  { suggested: true, related: [18, 47] });
E(47, 'Sg', 'Speed Garage', 'house', '130–138', 'Mid 1990s London', 'Double 99, Armand Van Helden, Tuff Jam',
  'Double 99 — RIP Groove',
  'Time-stretched vocals, rolling sub-bass and house kicks. The UK pirate-radio branch of house.',
  { suggested: true, related: [81, 116, 24] });
E(48, 'Lf', 'Lo-fi House', 'house', '115–125', '2010s internet', 'DJ Boring, Ross From Friends, DJ Seinfeld',
  'DJ Boring — Winona',
  'Tape hiss, nostalgic samples and wonky drums: deliberately dusty house.',
  { suggested: true, related: [23, 55] });

// Period 6: the EDM era
E(72, 'Fd', 'Fidget House', 'house', '126–132', '2000s UK / Italy', 'Crookers, Switch, Sinden',
  'Kid Cudi — Day \'n\' Nite (Crookers Remix)',
  'Chopped vocals, pitch-bent bass and twitchy grooves. Bloghouse at its most hyperactive.',
  { suggested: true, related: [45, 73] });
E(73, 'Cx', 'Complextro', 'house', '126–130', 'Late 2000s US', 'Wolfgang Gartner, Porter Robinson, Knife Party',
  'Wolfgang Gartner — Illmerica',
  'Rapid-fire synth switching and glitchy bass. Electro house at maximum complexity.',
  { suggested: true, related: [45, 113] });
E(74, 'Br', 'Big Room House', 'house', '126–130', '2010s Netherlands — present', 'Martin Garrix, Hardwell, W&W',
  'Martin Garrix — Animals',
  'Festival-mainstage drops built from kick, a pluck and a huge sound. Made to shake stadiums.',
  { suggested: true, related: [75, 45, 9] });
E(75, 'Du', 'Dutch House', 'house', '126–130', 'Late 2000s Netherlands', 'Afrojack, Chuckie, Laidback Luke',
  'Afrojack & Eva Simons — Take Over Control',
  'Squeaky, high-pitched leads and bouncing grooves.',
  { suggested: true, related: [74, 42] });
E(76,  'Dg', 'Deep Tech', 'house', '122–128', '2010s UK / Romania — present', 'Jamie Jones, Lee Foss, Chris Stussy',
  'Azari & III — Hungry for the Power (Jamie Jones Remix)',
  'Rubbery basslines, shuffled minimal grooves and late-night swing, from Hot Creations to the Romanian scene.',
  { suggested: true, related: [43, 46, 23] });
E(77, 'Tp', 'Tropical House', 'house', '100–115', '2010s Norway — present', 'Kygo, Thomas Jack, Felix Jaehn',
  'Kygo — Firestone',
  'Marimbas, pan flutes and a relaxed tempo: sunset house.',
  { suggested: true, related: [23, 106] });
E(78, 'Fu', 'Future House', 'house', '120–128', '2010s France / Netherlands', 'Tchami, Oliver Heldens, Don Diablo',
  'Oliver Heldens — Gecko (Overdrive)',
  'Metallic, wobbling basslines over deep-house grooves.',
  { suggested: true, related: [80, 76] });
E(79, 'Me', 'Melodic House', 'house', '118–126', '2010s — present', 'Tale Of Us, Ben Böhmer, Rampue',
  'Ben Böhmer — Beyond Beliefs',
  'Cinematic synths, restrained groove and festival-friendly emotional peaks.',
  { related: [42, 54, 105] });
E(80, 'Bh', 'Bass House', 'house', '124–132', '2010s — present', 'AC Slater, Chris Lake, Jauz',
  'Jauz — Feel the Volume',
  'House structure with dubstep-influenced bass. Aggressive, drop-driven and festival-stage friendly.',
  { related: [43, 78, 82] });

// Period 7: the newest, heaviest house
E(104, 'Af', 'Afro House', 'house', '118–126', '2000s South Africa — present', 'Black Coffee, &ME, Keinemusik',
  'Black Coffee — Superman',
  'Tribal percussion, organic rhythms and vocal samples. Commercially dominant in the 2020s.',
  { related: [89, 108, 105, 30] });
E(105, 'Og', 'Organic House', 'house', '115–122', '2010s — present', 'Monolink, Bedouin, Sabo',
  'Monolink — Return to Oz (ARTBAT Remix)',
  'Hand percussion, ethnic instruments and slow, swaying grooves.',
  { suggested: true, related: [79, 104] });
E(106, 'Sp', 'Slap House', 'house', '120–126', '2020s Kazakhstan / Brazil', 'Imanbek, Alok, Topic',
  'SAINt JHN — Roses (Imanbek Remix)',
  'Pitched-down vocals and slap-bass plucks. TikTok-era chart house.',
  { suggested: true, related: [107, 77] });
E(107, 'Bz', 'Brazilian Bass', 'house', '120–126', '2010s Brazil', 'Alok, Dubdogz, Vintage Culture',
  'Alok — Hear Me Now',
  'Deep, growling, pitch-bent basslines over house rhythms.',
  { suggested: true, related: [106, 78] });
E(108, 'At', 'Afro Tech', 'house', '120–126', '2020s Berlin / Johannesburg', 'Keinemusik, Adam Port, Rampa',
  '&ME, Rampa, Adam Port — The Rapture Pt.III',
  'Afro-house percussion meets deep-tech minimalism. The Keinemusik sound.',
  { suggested: true, related: [104, 43] });
E(109, 'Lh', 'Latin House', 'house', '122–128', '1990s New York', 'Erick Morillo, Masters At Work, Kenny Dope',
  'Reel 2 Real — I Like to Move It',
  'Latin percussion and ragga-style hooks.',
  { suggested: true, related: [30, 110] });
E(110, 'Vg', 'Ballroom / Vogue House', 'house', '120–130', '1980s New York — present', 'Masters At Work, MikeQ, Kevin Aviance',
  'Masters At Work — The Ha Dance',
  'Built for New York\'s ballroom scene: the "Ha" crash, snappy rhythms and voguing energy.',
  { suggested: true, related: [109, 24] });
E(111, 'Jh', 'Jackin\' House', 'house', '122–128', '2000s Chicago / UK — present', 'Green Velvet, Riva Starr, Gene Farris',
  'Green Velvet — Flash',
  'Chicago\'s "jack" energy updated: swung drums, chopped vocals and party attitude.',
  { suggested: true, related: [21, 26, 43] });
E(112, 'Pi', 'Piano House', 'house', '120–128', '1990s Italy / UK', 'Livin\' Joy, Alison Limerick, Robert Miles',
  'Livin\' Joy — Dreamer',
  'Big piano chord stabs: hands-in-the-air house.',
  { suggested: true, related: [27, 28] });

/* ── Nonmetals & metalloids · Trance ───────────────────────────── */
E(5,  'Tn', 'Trance', 'trance', '128–148', 'Early 1990s Germany — present', 'Paul van Dyk, Tiësto, Above & Beyond',
  'Paul van Dyk — For an Angel',
  'Euphoric melodies, arpeggios and epic breakdowns. Built for the moment the whole room lifts.',
  { related: [6, 8, 14] });
E(6,  'Pt', 'Progressive Trance', 'trance', '128–138', '1990s UK — present', 'Above & Beyond, Ferry Corsten, Sasha',
  'Sasha — Xpander',
  'Slower-burning trance with house-like grooves and long arrangements.',
  { related: [5, 42] });
E(7,  'Vt', 'Vocal Trance', 'trance', '132–138', '1990s — present', 'Tiësto, Armin van Buuren, ATB',
  'Delerium — Silence (Sanctuary Mix)',
  'Trance built around a song and a singer: big choruses and soaring vocals.',
  { related: [5, 33] });
E(8,  'Ut', 'Uplifting Trance', 'trance', '138–145', 'Late 1990s — present', 'Aly & Fila, Bryan Kearney, Ferry Corsten',
  'Energy 52 — Café Del Mar',
  'Maximum euphoria: rolling basslines, huge supersaw chords and very long breakdowns.',
  { related: [5, 7] });
E(14, 'Ps', 'Psytrance', 'trance', '138–148', 'Early 1990s Goa / Israel — present', 'Infected Mushroom, Astrix, Vini Vici',
  'Infected Mushroom — Becoming Insane',
  'Rolling 16th-note basslines, psychedelic FX and outdoor-festival culture.',
  { related: [15, 51, 67] });
E(15, 'Ga', 'Goa Trance', 'trance', '135–150', 'Early 1990s Goa, India', 'Astral Projection, Hallucinogen, Juno Reactor',
  'Astral Projection — Mahadeva',
  'Born on Goa\'s beach parties: acid lines, Eastern scales and all-night psychedelia.',
  { related: [14, 67] });
E(16, 'Tt', 'Tech Trance', 'trance', '138–145', 'Late 1990s — present', 'Sean Tyas, Simon Patterson, Marco V',
  'Marco V — Godd',
  'Trance with a harder, techno-driven backbone and fewer vocals.',
  { related: [5, 2, 32] });
E(32, 'Ht', 'Hard Trance', 'trance', '140–150', 'Mid 1990s Germany / UK', 'Mauro Picotto, Yoji Biomehanika, Lisa Lashes',
  'Mauro Picotto — Komodo',
  'Fast, pounding and relentless, with acid lines and hoover stabs.',
  { suggested: true, related: [44, 9] });
E(33, 'Eu', 'Euro Trance', 'trance', '135–140', 'Late 1990s Germany', 'ATB, Kai Tracid, Cascada',
  'ATB — 9 PM (Till I Come)',
  'Pop-structured trance: catchy hooks and radio-friendly drops.',
  { suggested: true, related: [7, 34] });
E(34, 'Dr', 'Dream Trance', 'trance', '128–138', 'Mid 1990s Italy', 'Robert Miles, Nylon Moon, Alex Gold',
  'Robert Miles — Children',
  'Piano-led, emotional and gentle: trance for after the club.',
  { suggested: true, related: [33, 112] });
E(51,  'Pp', 'Progressive Psy', 'trance', '134–140', '2000s Europe — present', 'Ace Ventura, Liquid Soul, Captain Hook',
  'Liquid Soul — Global Illumination',
  'Psytrance with its tempo and intensity rolled back: hypnotic, groovy and built for long builds.',
  { suggested: true, related: [14, 6] });
E(52, 'Ax', 'Acid Trance', 'trance', '130–140', 'Early 1990s Germany', 'Hardfloor, Jam & Spoon, Union Jack',
  'Hardfloor — Acperience 1',
  'Layered TB-303 lines twisting over trance drums.',
  { suggested: true, related: [22, 67, 15] });

/* ── Post-transition metals · Bass / Breaks ────────────────────── */
E(13, 'Db', 'Drum & Bass', 'bass', '170–180', 'Early 1990s UK — present', 'Goldie, Andy C, Sub Focus',
  'Goldie — Inner City Life',
  'Fast breakbeats and heavy sub-bass. One of the UK\'s defining contributions to dance music.',
  { related: [31, 49, 84] });
E(31, 'Jg', 'Jungle', 'bass', '160–180', 'Early 1990s London', 'Shy FX, Aphrodite, Congo Natty',
  'Shy FX & UK Apachi — Original Nuttah',
  'Chopped Amen breaks, reggae basslines and MC culture. The root of drum & bass.',
  { related: [13, 50] });
E(49, 'Lq', 'Liquid DnB', 'bass', '170–176', 'Early 2000s UK — present', 'High Contrast, London Elektricity, Hospital Records',
  'High Contrast — If We Ever',
  'Soulful, musical drum & bass: rolling breaks under warm chords and vocals.',
  { related: [13] });
E(50, 'Bb', 'Breakbeat', 'bass', '130–150', 'Late 1980s UK — present', 'The Prodigy, The Chemical Brothers, Hybrid',
  'The Chemical Brothers — Hey Boy Hey Girl',
  'Sampled funk breaks instead of a straight kick. Includes big beat and nu-skool breaks.',
  { related: [31, 3] });
E(81, 'Ug', 'UK Garage', 'bass', '130–138', 'Mid 1990s London', 'MJ Cole, Todd Edwards, El-B',
  'MJ Cole — Sincere',
  'Shuffled, swung rhythms, chopped vocals and sub-bass. The UK remix of US garage house.',
  { related: [24, 83, 47, 82] });
E(82, 'Dp', 'Dubstep', 'bass', '138–142', 'Early 2000s Croydon — present', 'Skream, Benga, Mala',
  'Skream — Midnight Request Line',
  'Half-time grooves at 140 BPM, wobbling sub-bass and lots of space.',
  { related: [81, 113, 80] });
E(83, 'Ts', '2-Step', 'bass', '130–138', 'Late 1990s London', 'Artful Dodger, Craig David, Wookie',
  'Artful Dodger ft. Craig David — Re-Rewind',
  'UK garage with the kick taken off the beat: skippy, syncopated and soulful.',
  { related: [81] });
E(84, 'Nf', 'Neurofunk', 'bass', '174–180', 'Late 1990s UK — present', 'Noisia, Phace, Mefjus',
  'Noisia — Stigma',
  'Dark, technical drum & bass with surgically designed basslines.',
  { related: [13, 113] });
E(113, 'Bs', 'Brostep', 'bass', '140–150', '2010s US', 'Skrillex, Excision, Zomboy',
  'Skrillex — Scary Monsters and Nice Sprites',
  'Dubstep made for arenas: screeching mid-range bass and massive drops.',
  { related: [82, 73, 115] });
E(114, 'Fb', 'Future Bass', 'bass', '140–160', '2010s Australia / US', 'Flume, Marshmello, Illenium',
  'Flume — Never Be Like You',
  'Wobbling supersaw chords, vocal chops and emotional drops.',
  { related: [115, 77] });
E(115, 'Ed', 'Trap (EDM)', 'bass', '140–150', '2010s US', 'Flosstradamus, RL Grime, Baauer',
  'RL Grime — Core',
  'Hip-hop trap drums, 808s and brass stabs, built for festival drops.',
  { related: [113, 114] });
E(116, 'Bl', 'Bassline', 'bass', '135–142', '2000s Sheffield / Leeds', 'T2, DJ Q, H & Claire',
  'T2 ft. Jodie Aysha — Heartbroken',
  'Organ-like wobbling bass on top of speed-garage rhythms. A Northern English club sound.',
  { suggested: true, related: [47, 81] });

/* ── Halogens · Hardcore / Hardstyle ───────────────────────────── */
E(9,  'Hs', 'Hardstyle', 'hard', '148–155', 'Early 2000s Netherlands — present', 'Headhunterz, Brennan Heart, Coone',
  'Headhunterz — Dragonborn',
  'Distorted, pitched "reverse bass" kicks, epic melodies and Dutch festival culture.',
  { related: [17, 35, 74] });
E(17, 'Rw', 'Rawstyle', 'hard', '150–160', '2010s Netherlands', 'Radical Redemption, Crypsis, Warface',
  'Radical Redemption — Brutal 4.0',
  'Hardstyle\'s darker, rougher, more aggressive side.',
  { related: [9, 35] });
E(35, 'Gb', 'Gabber', 'hard', '160–200', 'Early 1990s Rotterdam', 'Angerfist, DJ Promo, Rotterdam Terror Corps',
  'Rotterdam Terror Corps — Gabberen',
  'Hardcore at its rawest: distorted 909 kicks at punishing tempos.',
  { related: [9, 117, 86], wiki: 'Gabber' });
E(53, 'Hc', 'Happy Hardcore', 'hard', '160–175', 'Early 1990s UK', 'Hixxy, Sy, Scott Brown',
  'Scooter — Hyper Hyper',
  'Hardcore with major-key piano, pitched-up vocals and rave optimism.',
  { related: [85, 35] });
E(85, 'Uh', 'UK Hardcore', 'hard', '165–175', '2000s UK', 'Darren Styles, Gammer, Re-Con',
  'Darren Styles — Save Me',
  'Happy hardcore\'s grown-up offspring: trance-like supersaws over hardcore kicks.',
  { related: [53, 5] });
E(117, 'Fc', 'Frenchcore', 'hard', '200–220', '2000s France / Netherlands', 'Dr. Peacock, Sefa, Billx',
  'Dr. Peacock & Sefa — Incoming',
  'The heaviest element: overdriven kicks above 200 BPM, often with violins and folk samples.',
  { related: [35] });

/* ── Noble gases · Techno ──────────────────────────────────────── */
E(2,  'Te', 'Techno', 'techno', '120–160', 'Mid 1980s Detroit — present', 'Juan Atkins, Derrick May, Kevin Saunderson',
  'Joey Beltram — Energy Flash',
  'Helium: the second element. Futurist, machine-driven and hypnotic, from the Belleville Three to Berghain.',
  { related: [10, 18, 1, 3] });
E(10, 'Dt', 'Detroit Techno', 'techno', '125–135', 'Mid 1980s Detroit', 'Carl Craig, Jeff Mills, Underground Resistance',
  'Rhythim Is Rhythim — Strings of Life',
  'The original: soulful, futurist machine funk from Detroit\'s Black electronic pioneers.',
  { related: [2, 21, 3] });
E(18, 'Mi', 'Minimal Techno', 'techno', '124–130', 'Mid 1990s Detroit / Berlin', 'Ricardo Villalobos, Richie Hawtin, Pan-Pot',
  'Plastikman — Spastik',
  'Stripped to the bone: repetition, space and micro-variation.',
  { related: [2, 46, 36] });
E(36, 'Dq', 'Dub Techno', 'techno', '118–128', 'Early 1990s Berlin', 'Basic Channel, Deepchord, Yagya',
  'Basic Channel — Quadrant Dub I',
  'Techno filtered through dub delays and reverbs: hazy, deep and endlessly rolling.',
  { related: [18, 57] });
E(54, 'Mt', 'Melodic Techno', 'techno', '120–128', '2010s — present', 'Tale Of Us, Mind Against, Stephan Bodzin',
  'Stephan Bodzin — Singularity',
  'Driving techno with dramatic arpeggios and cinematic emotion.',
  { related: [79, 2] });
E(86, 'In', 'Industrial Techno', 'techno', '130–145', '1990s UK / 2010s Berlin', 'Surgeon, Perc, Ansome',
  'Perc — Look What Your Love Has Done to Me',
  'Noisy, distorted and mechanical: techno that sounds like a factory floor.',
  { related: [87, 118] });
E(118, 'Hx', 'Hard Techno', 'techno', '140–160', '2020s Europe — present', 'I Hate Models, Sara Landry, 999999999',
  'I Hate Models — Daydream',
  'The heaviest noble gas: fast, distorted kicks, rave stabs and post-pandemic intensity.',
  { related: [86, 35, 2] });

/* ── Lanthanides · Ambient / Downtempo ─────────────────────────── */
E(57, 'Am', 'Ambient', 'ambient', '60–100', '1970s UK — present', 'Brian Eno, Stars of the Lid, Aphex Twin',
  'Brian Eno — An Ending (Ascent)',
  'Music as atmosphere: "as ignorable as it is interesting".',
  { related: [58, 61, 62], wiki: 'Ambient_music' });
E(58, 'Dw', 'Downtempo', 'ambient', '70–100', '1990s — present', 'Bonobo, Tycho, Nightmares on Wax',
  'Bonobo — Kiara',
  'Slow, groove-led electronica for after-hours listening.',
  { related: [57, 59, 60] });
E(59, 'Th', 'Trip-Hop', 'ambient', '80–100', 'Early 1990s Bristol', 'Massive Attack, Portishead, Tricky',
  'Massive Attack — Teardrop',
  'Hip-hop beats slowed and darkened with dub, soul and cinematic noir.',
  { related: [58, 66] });
E(60, 'Co', 'Chillout', 'ambient', '70–100', '1990s Ibiza — present', 'Café del Mar, Zero 7, Hooverphonic',
  'Zero 7 — Destiny',
  'Sunset-terrace electronica: lush, warm and horizontal.',
  { related: [58, 65] });
E(61, 'Id', 'IDM', 'ambient', '80–160', 'Early 1990s UK', 'Aphex Twin, Autechre, Boards of Canada',
  'Aphex Twin — Xtal',
  '"Intelligent dance music": electronica for listening, intricate and experimental.',
  { suggested: true, related: [57, 98], wiki: 'Intelligent_dance_music' });
E(62, 'Ab', 'Ambient House', 'ambient', '90–120', 'Late 1980s UK', 'The Orb, The KLF, Global Communication',
  'The Orb — Little Fluffy Clouds',
  'The chill-out room\'s own genre: house rhythms dissolved into ambient textures.',
  { suggested: true, related: [57, 21] });
E(63,  'Ak', 'Ambient Techno', 'ambient', '90–130', 'Early 1990s UK / Germany', 'Biosphere, GAS, The Black Dog',
  'Biosphere — Novelty Waves',
  'Techno pulses dissolved into fog: weightless pads over a distant, steady beat.',
  { suggested: true, related: [57, 36, 62] });
E(64,  'Dn', 'Downtempo House', 'ambient', '100–118', '2010s Europe — present', 'Kiasmos, Rodriguez Jr., Christian Löffler',
  'Kiasmos — Looped',
  'House structures slowed and softened, with piano, strings and minimal electronics.',
  { suggested: true, related: [58, 23, 71] });
E(65, 'Ba', 'Balearic', 'ambient', '90–118', '1980s Ibiza', 'José Padilla, Alfredo, A Man Called Adam',
  'José Padilla — Agua',
  'Eclectic, sun-drenched sounds from Ibiza\'s sunset sessions.',
  { suggested: true, related: [60, 56], wiki: 'Balearic_beat' });
E(66, 'Dd', 'Electronic Dub', 'ambient', '70–100', '1990s Vienna / UK', 'Kruder & Dorfmeister, Thievery Corporation, Mad Professor',
  'Kruder & Dorfmeister — High Noon',
  'Reggae\'s dub science reinterpreted with downtempo beats.',
  { suggested: true, related: [59, 36] });
E(67, 'Pb', 'Psybient', 'ambient', '60–110', '1990s UK — present', 'Shpongle, Ott, Carbon Based Lifeforms',
  'Shpongle — Dorset Perception',
  'Psychedelic chill-out: psytrance textures, world music and ambient space.',
  { suggested: true, related: [14, 57] });
E(68, 'Nj', 'Nu Jazz', 'ambient', '90–125', 'Late 1990s Paris / Europe', 'St Germain, Jazzanova, The Cinematic Orchestra',
  'St Germain — Rose Rouge',
  'Jazz instrumentation over electronic and house grooves.',
  { suggested: true, related: [39, 58] });
E(69, 'Fn', 'French Downtempo', 'ambient', '80–100', 'Late 1990s France', 'Air, Télépopmusik, Saint-Germain',
  'Air — La Femme d\'Argent',
  'Moog, Fender Rhodes and velvet cool.',
  { suggested: true, related: [39, 60] });
E(70, 'Ae', 'Ambient Electronica', 'ambient', '90–120', '2000s — present', 'Tycho, Boards of Canada, Helios',
  'Tycho — Awake',
  'Widescreen, guitar-tinged electronica: warm, nostalgic and propulsive.',
  { suggested: true, related: [58, 64] });
E(71, 'Nc', 'Neoclassical Electronic', 'ambient', '60–120', '2000s Berlin / Iceland — present', 'Nils Frahm, Ólafur Arnalds, Jon Hopkins',
  'Nils Frahm — Says',
  'Piano and strings fused with synths and electronic processing.',
  { suggested: true, related: [57, 70] });

/* ── Actinides · Global & Experimental ─────────────────────────── */
E(89, 'Ap', 'Amapiano', 'global', '108–115', '2010s South Africa — present', 'Kabza De Small, DJ Maphorisa, Uncle Waffles',
  'Uncle Waffles — Tanzania',
  'Log-drum basslines, jazzy keys and slow-rolling grooves from Gauteng.',
  { related: [104, 91, 90] });
E(90, 'Gq', 'Gqom', 'global', '120–130', '2010s Durban', 'DJ Lag, Babes Wodumo, Distruction Boyz',
  'Babes Wodumo ft. Mampintsha — Wololo',
  'Raw, broken, bass-heavy rhythms from Durban\'s townships.',
  { suggested: true, related: [89, 91] });
E(91, 'Kw', 'Kwaito', 'global', '100–115', 'Early 1990s South Africa', 'Boom Shaka, Mandoza, Trompies',
  'Mandoza — Nkalakatha',
  'Slowed-down house with chanted vocals: the post-apartheid sound of Soweto.',
  { related: [89, 104] });
E(92, 'Fw', 'Footwork / Juke', 'global', '155–165', '2000s Chicago', 'DJ Rashad, RP Boo, DJ Spinn',
  'DJ Rashad — Let It Go',
  'Ghetto house sped up and fractured for dance battles: stuttering vocals, triplet rhythms.',
  { suggested: true, related: [26, 93] });
E(93, 'Jc', 'Jersey Club', 'global', '130–140', '2000s Newark', 'DJ Tameil, DJ Sliink, UNIIQU3',
  'DJ Sliink — Vibrate',
  'Bouncing kick patterns, bedsqueak samples and chopped vocal loops.',
  { suggested: true, related: [92, 94] });
E(94, 'Bf', 'Baile Funk', 'global', '125–135', '1990s Rio de Janeiro', 'DJ Marlboro, Tati Quebra Barraco, MC Fioti',
  'MC Fioti — Bum Bum Tam Tam',
  'Miami-bass drums reworked in Rio\'s favelas: tamborzão rhythms and call-and-response MCs.',
  { suggested: true, related: [3, 95], wiki: 'Funk_carioca' });
E(95, 'Ku', 'Kuduro', 'global', '130–140', 'Late 1980s Angola', 'Buraka Som Sistema, Os Lambas, DJ Znobia',
  'Buraka Som Sistema — Kalemba (Wegue Wegue)',
  'Hyperactive Angolan dance music: frenetic percussion and Lisbon-club crossovers.',
  { suggested: true, related: [94, 89] });
E(96, 'Mb', 'Moombahton', 'global', '108–112', '2009 Washington, D.C.', 'Dave Nada, Diplo, Major Lazer',
  'Dillon Francis & Diplo — Que Que',
  'Dutch house slowed to reggaeton tempo. Invented by accident at a house party.',
  { suggested: true, related: [75, 94] });
E(97,  'Uf', 'UK Funky', 'global', '128–132', 'Late 2000s London', 'Crazy Cousinz, Roska, Donae\'o',
  'Kyla — Do You Mind (Crazy Cousinz Remix)',
  'London\'s Afro-Caribbean twist on house: syncopated soca and kuduro-style drums at 130 BPM.',
  { suggested: true, related: [81, 95, 104] });
E(98, 'Gl', 'Glitch', 'global', '80–160', '1990s Germany / UK', 'Autechre, Oval, Alva Noto',
  'Autechre — Gantz Graf',
  'Errors, skips and digital artefacts turned into rhythm.',
  { suggested: true, related: [61, 99] });
E(99, 'Bc', 'Breakcore', 'global', '160–300', 'Late 1990s Europe', 'Venetian Snares, Aaron Spectre, Machine Girl',
  'Venetian Snares — Hajnal',
  'Shredded amen breaks at absurd tempos: chaos as composition.',
  { suggested: true, related: [31, 98, 117] });
E(100, 'Gr', 'Grime', 'global', '138–142', 'Early 2000s East London', 'Wiley, Dizzee Rascal, Skepta',
  'Wiley — Eskimo',
  'Cold, square-wave beats at 140 BPM with rapid-fire MCing, born on London pirate radio.',
  { suggested: true, related: [81, 82, 101] });
E(101, 'Dc', 'Deconstructed Club', 'global', '90–140', '2010s internet / London', 'SOPHIE, Arca, Lotic',
  'SOPHIE — Faceshopping',
  'Club music taken apart: hyperreal textures, abrupt edits and no fixed grid.',
  { suggested: true, related: [100, 98] });
E(102, 'Pk', 'Drift Phonk', 'global', '120–150', '2020s Russia / internet', 'Kordhell, PlayaPhonk, DVRST',
  'Kordhell — Murder In My Mind',
  'Cowbell melodies, Memphis-rap samples and distorted 808s: TikTok\'s car-edit soundtrack.',
  { suggested: true, related: [115, 100] });
E(103, 'Sn', 'Singeli', 'global', '200–300', '2000s Dar es Salaam', 'Jay Mitta, Duke, Sisso',
  'Jay Mitta — Tatizo Pesa',
  'Tanzanian hyper-speed dance music: rapid-fire MCing over frantic, looping percussion.',
  { suggested: true, related: [95, 99] });
