/*
 * Periodic Table of Electronic Dance Music: element data.
 *
 * Each element: E(atomicNumber, symbol, name, family, bpm, era, artists, tracks, blurb, opts)
 *   - bpm:     typical range as a string; the first number is shown as the "atomic mass"
 *   - tracks:  list of "Artist — Title", signature track first. The others are the genre's "isotopes":
 *              each visit to the genre plays the next one. YouTube ids live in data/tracks.js, keyed by "Artist — Title".
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
function E(n, sym, name, family, bpm, era, artists, tracks, blurb, opts = {}) {
  tracks = [].concat(tracks).map((t) => {
    const [artist, title] = t.split(' — ');
    return { artist, title, key: t };
  });
  ELEMENTS.push({
    n, sym, name, family, bpm, era, blurb,
    artists: artists.split(', '),
    tracks,
    track: tracks[0],
    related: opts.related || [],
    suggested: !!opts.suggested,
    wiki: opts.wiki || null,
  });
}

/* ── Group 1 · Synth Pop / Electro ─────────────────────────────── */
E(1,  'Sy', 'Synth Pop / Electro', 'synth', '80–130', '1970s Düsseldorf — present', 'Kraftwerk, Daft Punk, The Midnight',
  [
    'Kraftwerk — Tour De France',
    'Kraftwerk — The Model',
    'The Human League — Don\'t You Want Me',
    'Yazoo — Don\'t Go',
  ],
  'Hydrogen: the first element. Kraftwerk built the template for every machine-made dance record that followed.',
  { related: [3, 11, 2, 4], wiki: 'Synth-pop' });
E(3,  'El', 'Electro', 'synth', '120–130', '1980s New York / Detroit — present', 'Afrika Bambaataa, Drexciya, Anthony Rother',
  [
    'Afrika Bambaataa & The Soulsonic Force — Planet Rock',
    'Cybotron — Clear',
    'Man Parrish — Hip Hop, Be Bop (Don\'t Stop)',
    'Drexciya — Bubble Metropolis',
  ],
  'TR-808 breakbeats, robotic vocals and funk. The bridge from Kraftwerk to hip-hop, techno and Miami bass.',
  { related: [1, 2, 18], wiki: 'Electro_(music)' });
E(11, 'Sw', 'Synthwave', 'synth', '80–110', '2000s France — present', 'Kavinsky, The Midnight, Carpenter Brut',
  [
    'Kavinsky — Nightcall',
    'College & Electric Youth — A Real Hero',
    'The Midnight — Sunset',
    'FM-84 — Running in the Night',
  ],
  'Retro-futurist nostalgia for 1980s film scores, neon and VHS. Gated drums, analog leads, night drives.',
  { related: [37, 55, 1] });
E(19, 'Ec', 'Electroclash', 'synth', '120–130', 'Late 1990s Munich / New York', 'Fischerspooner, Miss Kittin & The Hacker, Peaches',
  [
    'Fischerspooner — Emerge',
    'Miss Kittin & The Hacker — Frank Sinatra',
    'Tiga & Zyntherius — Sunglasses at Night',
    'Peaches — Fuck the Pain Away',
  ],
  'Deadpan vocals, cheap synths and art-school attitude. Electro meets new wave and punk.',
  { suggested: true, related: [3, 1, 45] });
E(37, 'Dk', 'Darksynth', 'synth', '100–130', '2010s France — present', 'Carpenter Brut, Perturbator, Dance with the Dead',
  [
    'Carpenter Brut — Turbo Killer',
    'Perturbator — Future Club',
    'Dance with the Dead — Robeast',
  ],
  'Synthwave pushed into horror and metal territory: distorted bass, aggressive tempos.',
  { suggested: true, related: [11, 87] });
E(55, 'Vw', 'Vaporwave', 'synth', '60–90', '2010s internet', 'Macintosh Plus, Saint Pepsi, James Ferraro',
  [
    'Macintosh Plus — リサフランク420 / 現代のコンピュー',
    'Saint Pepsi — Private Caller',
  ],
  'Slowed, chopped mall-muzak and 80s samples. An ironic, dreamy internet-age artefact.',
  { related: [11, 48] });
E(87, 'Eb', 'EBM', 'synth', '110–130', '1980s Belgium / Germany', 'Front 242, Nitzer Ebb, DAF',
  [
    'Front 242 — Headhunter',
    'Nitzer Ebb — Join in the Chant',
    'DAF — Der Mussolini',
  ],
  'Electronic Body Music: marching sequencer bass and shouted vocals. Industrial techno\'s direct ancestor.',
  { suggested: true, related: [86, 37], wiki: 'Electronic_body_music' });

/* ── Group 2 · Disco / Funk roots ──────────────────────────────── */
E(4,  'Ds', 'Disco', 'disco', '110–130', '1970s New York — present', 'Chic, Donna Summer, Giorgio Moroder',
  [
    'Donna Summer — I Feel Love',
    'Chic — Le Freak',
    'Sister Sledge — Lost in Music',
    'Gloria Gaynor — I Will Survive',
  ],
  'The mother of dance music. "I Feel Love" took disco fully electronic and pointed straight at house and techno.',
  { related: [21, 40, 12] });
E(12, 'Bg', 'Boogie', 'disco', '100–120', 'Early 1980s US', 'D Train, Kashif, Yarbrough & Peoples',
  [
    'D Train — You\'re the One for Me',
    'Yarbrough & Peoples — Don\'t Stop the Music',
    'Peech Boys — Don\'t Make Me Wait',
    'Kashif — I Just Gotta Have You',
  ],
  'Post-disco electro-funk: synth bass, drum machines and R&B vocals.',
  { suggested: true, related: [4, 3] });
E(20, 'Hi', 'Hi-NRG', 'disco', '120–140', 'Late 1970s San Francisco / UK', 'Patrick Cowley, Sylvester, Evelyn Thomas',
  [
    'Sylvester — You Make Me Feel (Mighty Real)',
    'Evelyn Thomas — High Energy',
    'Hazell Dean — Searchin\' (I Gotta Find a Man)',
    'Dead or Alive — You Spin Me Round (Like a Record)',
  ],
  'Faster, harder, sequenced disco. A key sound of the queer club scene and a template for Eurodance.',
  { suggested: true, related: [4, 28] });
E(38, 'It', 'Italo Disco', 'disco', '110–130', '1980s Italy', 'Giorgio Moroder, Klein + M.B.O., Gazebo',
  [
    'Kano — I\'m Ready',
    'Gazebo — I Like Chopin',
    'Ryan Paris — Dolce Vita',
    'Giorgio Moroder — Chase',
  ],
  'Italian synth-disco with arpeggiated basslines. Huge influence on early Chicago house.',
  { suggested: true, related: [4, 21, 27] });
E(56, 'Sd', 'Space Disco', 'disco', '115–130', 'Late 1970s France / Italy', 'Cerrone, Space, Didier Marouani',
  [
    'Cerrone — Supernature',
    'Space — Magic Fly',
    'Lindstrøm — I Feel Space',
  ],
  'Cosmic, synth-heavy disco with sci-fi themes. A favourite of cosmic and Balearic DJs.',
  { suggested: true, related: [4, 65] });
E(88, 'Nd', 'Nu-Disco', 'disco', '110–125', '2000s — present', 'Purple Disco Machine, Aeroplane, Late Nite Tuff Guy',
  [
    'Purple Disco Machine — Hypnotized',
    'Breakbot — Baby I\'m Yours',
    'Aeroplane — We Can\'t Fly',
    'Classixx — Holding On',
  ],
  'Disco re-edited and rebuilt for modern dancefloors. Still radiating energy decades later.',
  { related: [4, 40, 39] });

/* ── Transition metals · House ─────────────────────────────────── */
// Period 4: the Chicago / New York foundations
E(21, 'Ch', 'Chicago House', 'house', '118–128', '1980s Chicago — present', 'Frankie Knuckles, Larry Heard, Marshall Jefferson',
  [
    'Frankie Knuckles — Your Love',
    'Marshall Jefferson — Move Your Body',
    'Jesse Saunders — On and On',
    'Farley Jackmaster Funk — Love Can\'t Turn Around',
  ],
  'Four-on-the-floor dance music born at the Warehouse club. The base layer of modern electronic dance music.',
  { related: [4, 22, 23, 2], wiki: 'Chicago_house' });
E(22, 'Ac', 'Acid House', 'house', '118–128', '1980s Chicago / UK — present', 'Phuture, A Guy Called Gerald, 808 State',
  [
    'Phuture — Acid Tracks',
    'A Guy Called Gerald — Voodoo Ray',
    'Sleezy D — I\'ve Lost Control',
    'D-Mob — We Call It Acieed',
  ],
  'Built around the Roland TB-303 squelch. Hypnotic and repetitive: the sound of the second summer of love.',
  { related: [21, 67, 11] });
E(23, 'Dh', 'Deep House', 'house', '118–125', '1980s Chicago — present', 'Larry Heard, Kerri Chandler, Lane 8',
  [
    'Mr. Fingers — Can You Feel It',
    'Kerri Chandler — Rain',
    'Moodymann — I Can\'t Kick This Feeling When It Hits',
    'Lane 8 — Fingerprint',
  ],
  'Atmospheric, bass-led and melodically rich: the introspective end of the house spectrum.',
  { related: [21, 29, 76, 79] });
E(24, 'Gh', 'Garage House', 'house', '124–130', '1980s New York / New Jersey', 'Larry Levan, Ten City, Todd Edwards',
  [
    'Ten City — That\'s the Way Love Is',
    'Adeva — Respect',
    'Gwen Guthrie — Ain\'t Nothin\' Goin\' On but the Rent',
    'Todd Edwards — Saved My Life',
  ],
  'Named after the Paradise Garage: gospel vocals, live-sounding grooves and soul.',
  { related: [21, 29, 81], wiki: 'Garage_house' });
E(25, 'Hh', 'Hip House', 'house', '120–128', 'Late 1980s Chicago / UK', 'Fast Eddie, Tyree Cooper, Jungle Brothers',
  [
    'Fast Eddie — Yo Yo Get Funky!',
    'Tyree Cooper — Turn Up the Bass',
    'Jungle Brothers — I\'ll House You',
    'Technotronic — Pump Up the Jam',
  ],
  'Rap vocals over jacking house beats. A short-lived but influential crossover.',
  { suggested: true, related: [21, 26] });
E(26, 'Gt', 'Ghetto House', 'house', '125–135', '1990s Chicago', 'DJ Funk, Paul Johnson, DJ Deeon',
  [
    'Paul Johnson — Get Get Down',
    'Cajmere — Percolator',
    'Paul Johnson — Feel My M.F. Bass',
  ],
  'Raw, sample-heavy and minimal Dance Mania records. The direct parent of juke and footwork.',
  { suggested: true, related: [21, 92] });
E(27, 'Ih', 'Italo House', 'house', '120–126', 'Late 1980s Italy', 'Black Box, Starlight, 49ers',
  [
    'Black Box — Ride on Time',
    'Starlight — Numero Uno',
    '49ers — Touch Me',
    'DJ H feat. Stefy — Think About',
  ],
  'Big piano riffs and diva samples. Italy\'s euphoric answer to Chicago.',
  { suggested: true, related: [38, 112] });
E(28, 'Dv', 'Diva House', 'house', '120–128', '1990s US / UK', 'Robin S, CeCe Peniston, Crystal Waters',
  [
    'Robin S — Show Me Love',
    'CeCe Peniston — Finally',
    'Crystal Waters — Gypsy Woman',
    'Ultra Naté — Free',
  ],
  'Soaring female vocals over chart-ready house beats.',
  { suggested: true, related: [29, 20] });
E(29, 'Sl', 'Soulful House', 'house', '118–125', '1990s New York — present', 'Frankie Feliciano, Louie Vega, Joey Negro',
  [
    'Barbara Tucker — Beautiful People',
    'Joey Negro — Make a Move on Me',
    'Masters At Work feat. India — To Be in Love',
    'Dennis Ferrer — Hey Hey',
  ],
  'Gospel and soul vocals, live instrumentation and warm chords: house at its most uplifting.',
  { related: [24, 23, 28] });
E(30, 'Tr', 'Tribal House', 'house', '122–130', '1990s New York', 'Junior Vasquez, Danny Tenaglia, Erick Morillo',
  [
    'Danny Tenaglia — Music Is the Answer',
    'Junior Vasquez — If Madonna Calls',
    'Danny Tenaglia — Elements',
  ],
  'Percussion-driven, hypnotic and dark. Built for long peak-time sets.',
  { related: [104, 108] });

// Period 5: the 1990s expansion
E(39, 'Fh', 'French House', 'house', '118–126', '1990s Paris', 'Daft Punk, Stardust, Cassius',
  [
    'Stardust — Music Sounds Better with You',
    'Daft Punk — Around the World',
    'Cassius — 1999',
    'Modjo — Lady (Hear Me Tonight)',
  ],
  'Filtered disco samples, phasers and compression: the "French touch".',
  { related: [40, 88, 4] });
E(40, 'Dx', 'Disco House', 'house', '118–126', '1990s — present', 'Daft Punk, Spiller, Joey Negro',
  [
    'Spiller — Groovejet (If This Ain\'t Love)',
    'Room 5 feat. Oliver Cheatham — Make Luv',
    'Joey Negro — Must Be the Music',
  ],
  'Looped disco breaks and strings over a house kick.',
  { related: [4, 39, 88] });
E(41, 'Fk', 'Funky House', 'house', '124–128', '1990s US / UK', 'Armand Van Helden, Roger Sanchez, Bob Sinclar',
  [
    'Armand Van Helden — You Don\'t Know Me',
    'Roger Sanchez — Another Chance',
    'Bob Sinclar — I Feel for You',
  ],
  'Punchy, sample-driven and party-focused. A UK club staple of the late 90s.',
  { suggested: true, related: [39, 40] });
E(42, 'Ph', 'Progressive House', 'house', '122–130', '1990s UK — present', 'Sasha, Eric Prydz, Anjunadeep',
  [
    'Eric Prydz — Opus',
    'deadmau5 — Strobe',
    'Leftfield — Not Forgotten',
    'Gat Decor — Passion',
  ],
  'Extended builds, emotional breakdowns and architected peaks: the long-form, melodic strain of house.',
  { related: [79, 6, 75] });
E(43, 'Tc', 'Tech House', 'house', '122–130', '1990s UK — present', 'Solomun, Patrick Topping, Sonny Fodera',
  [
    'FISHER — Losing It',
    'Solomun — Customer Is King',
    'Patrick Topping — Be Sharp Say Nowt',
  ],
  'Rolling percussion meets restrained techno energy. The dominant house style of the 2010s and 2020s.',
  { related: [2, 21, 80] });
E(44, 'Hd', 'Hard House', 'house', '135–150', '1990s UK', 'Tony De Vit, Lisa Lashes, BK',
  [
    'Tony De Vit — Burning Up',
    'Interactive — Amok',
    'Klubbheads — Discohopping',
  ],
  'Pounding offbeat bass and hoover stabs. The fast, euphoric sound of UK clubs like Trade and Sundissential.',
  { suggested: true, related: [32, 9] });
E(45, 'Eh', 'Electro House', 'house', '125–130', '2000s — present', 'Benny Benassi, Justice, Deadmau5',
  [
    'Benny Benassi — Satisfaction',
    'Fedde Le Grand — Put Your Hands Up for Detroit',
    'deadmau5 — Ghosts \'n\' Stuff',
    'Justice — Waters of Nazareth',
  ],
  'Distorted, buzzing synth basslines over house drums. The bridge to big-room EDM.',
  { suggested: true, related: [73, 74, 19] });
E(46, 'Mh', 'Microhouse', 'house', '118–125', 'Late 1990s Germany', 'Isolée, Akufen, Ricardo Villalobos',
  [
    'Isolée — Beau Mot Plage',
    'Akufen — Deck the House',
    'Luomo — Tessio',
  ],
  'Clicks, cuts and micro-samples. Minimal, detailed and quietly funky.',
  { suggested: true, related: [18, 47] });
E(47, 'Sg', 'Speed Garage', 'house', '130–138', 'Mid 1990s London', 'Double 99, Armand Van Helden, Tuff Jam',
  [
    'Double 99 — RIP Groove',
    'Tina Moore — Never Gonna Let You Go (Kelly G Remix)',
    'CJ Bolland — Sugar Is Sweeter (Armand Van Helden Remix)',
    'Serious Danger — Deeper',
  ],
  'Time-stretched vocals, rolling sub-bass and house kicks. The UK pirate-radio branch of house.',
  { suggested: true, related: [81, 116, 24] });
E(48, 'Lf', 'Lo-fi House', 'house', '115–125', '2010s internet', 'DJ Boring, Ross From Friends, DJ Seinfeld',
  [
    'DJ Boring — Winona',
    'Ross From Friends — Talk to Me You\'ll Understand',
    'DJ Seinfeld — U',
  ],
  'Tape hiss, nostalgic samples and wonky drums: deliberately dusty house.',
  { suggested: true, related: [23, 55] });

// Period 6: the EDM era
E(72, 'Fd', 'Fidget House', 'house', '126–132', '2000s UK / Italy', 'Crookers, Switch, Sinden',
  [
    'Kid Cudi — Day \'n\' Nite (Crookers Remix)',
    'Switch — A Bit Patchy',
    'Jack Beats — Get Down',
  ],
  'Chopped vocals, pitch-bent bass and twitchy grooves. Bloghouse at its most hyperactive.',
  { suggested: true, related: [45, 73] });
E(73, 'Cx', 'Complextro', 'house', '126–130', 'Late 2000s US', 'Wolfgang Gartner, Porter Robinson, Knife Party',
  [
    'Wolfgang Gartner — Illmerica',
    'Knife Party — Internet Friends',
    'Porter Robinson — Unison',
  ],
  'Rapid-fire synth switching and glitchy bass. Electro house at maximum complexity.',
  { suggested: true, related: [45, 113] });
E(74, 'Br', 'Big Room House', 'house', '126–130', '2010s Netherlands — present', 'Martin Garrix, Hardwell, W&W',
  [
    'Martin Garrix — Animals',
    'Hardwell — Spaceman',
    'Showtek & Justin Prime — Cannonball',
  ],
  'Festival-mainstage drops built from kick, a pluck and a huge sound. Made to shake stadiums.',
  { suggested: true, related: [75, 45, 9] });
E(75, 'Du', 'Dutch House', 'house', '126–130', 'Late 2000s Netherlands', 'Afrojack, Chuckie, Laidback Luke',
  [
    'Afrojack & Eva Simons — Take Over Control',
    'Sidney Samson — Riverside',
    'Afrojack — Rock the House',
  ],
  'Squeaky, high-pitched leads and bouncing grooves.',
  { suggested: true, related: [74, 42] });
E(76,  'Dg', 'Deep Tech', 'house', '122–128', '2010s UK / Romania — present', 'Jamie Jones, Lee Foss, Chris Stussy',
  [
    'Azari & III — Hungry for the Power (Jamie Jones Remix)',
    'Jamie Jones — My Paradise',
    'Hot Natured — Benediction',
  ],
  'Rubbery basslines, shuffled minimal grooves and late-night swing, from Hot Creations to the Romanian scene.',
  { suggested: true, related: [43, 46, 23] });
E(77, 'Tp', 'Tropical House', 'house', '100–115', '2010s Norway — present', 'Kygo, Thomas Jack, Felix Jaehn',
  [
    'Kygo — Firestone',
    'Felix Jaehn — Ain\'t Nobody (Loves Me Better)',
    'Robin Schulz — Prayer in C',
  ],
  'Marimbas, pan flutes and a relaxed tempo: sunset house.',
  { suggested: true, related: [23, 106] });
E(78, 'Fu', 'Future House', 'house', '120–128', '2010s France / Netherlands', 'Tchami, Oliver Heldens, Don Diablo',
  [
    'Oliver Heldens — Gecko (Overdrive)',
    'Tchami — Promesses',
    'Don Diablo — Cutting Shapes',
  ],
  'Metallic, wobbling basslines over deep-house grooves.',
  { suggested: true, related: [80, 76] });
E(79, 'Me', 'Melodic House', 'house', '118–126', '2010s — present', 'Tale Of Us, Ben Böhmer, Rampue',
  [
    'Ben Böhmer — Beyond Beliefs',
    'RÜFÜS DU SOL — Innerbloom',
    'Ben Böhmer — Breathing',
  ],
  'Cinematic synths, restrained groove and festival-friendly emotional peaks.',
  { related: [42, 54, 105] });
E(80, 'Bh', 'Bass House', 'house', '124–132', '2010s — present', 'AC Slater, Chris Lake, Jauz',
  [
    'Jauz — Feel the Volume',
    'Chris Lake — Turn Off the Lights',
    'Joyryde — Hot Drum',
  ],
  'House structure with dubstep-influenced bass. Aggressive, drop-driven and festival-stage friendly.',
  { related: [43, 78, 82] });

// Period 7: the newest, heaviest house
E(104, 'Af', 'Afro House', 'house', '118–126', '2000s South Africa — present', 'Black Coffee, &ME, Keinemusik',
  [
    'Black Coffee — Superman',
    'Mafikizolo ft. Uhuru — Khona',
    'Culoe De Song — The Bright Forest',
  ],
  'Tribal percussion, organic rhythms and vocal samples. Commercially dominant in the 2020s.',
  { related: [89, 108, 105, 30] });
E(105, 'Og', 'Organic House', 'house', '115–122', '2010s — present', 'Monolink, Bedouin, Sabo',
  [
    'Monolink — Return to Oz (ARTBAT Remix)',
    'Bedouin — Up in Flames',
  ],
  'Hand percussion, ethnic instruments and slow, swaying grooves.',
  { suggested: true, related: [79, 104] });
E(106, 'Sp', 'Slap House', 'house', '120–126', '2020s Kazakhstan / Brazil', 'Imanbek, Alok, Topic',
  [
    'SAINt JHN — Roses (Imanbek Remix)',
    'Topic & A7S — Breaking Me',
    'Imanbek & Byor — Belly Dancer',
  ],
  'Pitched-down vocals and slap-bass plucks. TikTok-era chart house.',
  { suggested: true, related: [107, 77] });
E(107, 'Bz', 'Brazilian Bass', 'house', '120–126', '2010s Brazil', 'Alok, Dubdogz, Vintage Culture',
  [
    'Alok — Hear Me Now',
    'Vintage Culture — Wild Kidz',
    'Dubdogz & Bhaskar — Infinity',
  ],
  'Deep, growling, pitch-bent basslines over house rhythms.',
  { suggested: true, related: [106, 78] });
E(108, 'At', 'Afro Tech', 'house', '120–126', '2020s Berlin / Johannesburg', 'Keinemusik, Adam Port, Rampa',
  [
    '&ME, Rampa, Adam Port — The Rapture Pt.III',
    'Adam Port & Stryv — Move',
    'Black Coffee — We Dance Again',
  ],
  'Afro-house percussion meets deep-tech minimalism. The Keinemusik sound.',
  { suggested: true, related: [104, 43] });
E(109, 'Lh', 'Latin House', 'house', '122–128', '1990s New York', 'Erick Morillo, Masters At Work, Kenny Dope',
  [
    'Reel 2 Real — I Like to Move It',
    'Nuyorican Soul — Runaway',
    'Kenny Dope — Bomb Drop',
  ],
  'Latin percussion and ragga-style hooks.',
  { suggested: true, related: [30, 110] });
E(110, 'Vg', 'Ballroom / Vogue House', 'house', '120–130', '1980s New York — present', 'Masters At Work, MikeQ, Kevin Aviance',
  [
    'Masters At Work — The Ha Dance',
    'Kevin Aviance — Cunty',
  ],
  'Built for New York\'s ballroom scene: the "Ha" crash, snappy rhythms and voguing energy.',
  { suggested: true, related: [109, 24] });
E(111, 'Jh', 'Jackin\' House', 'house', '122–128', '2000s Chicago / UK — present', 'Green Velvet, Riva Starr, Gene Farris',
  [
    'Green Velvet — Flash',
    'Green Velvet — La La Land',
    'Riva Starr — I Was Drunk',
  ],
  'Chicago\'s "jack" energy updated: swung drums, chopped vocals and party attitude.',
  { suggested: true, related: [21, 26, 43] });
E(112, 'Pi', 'Piano House', 'house', '120–128', '1990s Italy / UK', 'Livin\' Joy, Alison Limerick, Robert Miles',
  [
    'Livin\' Joy — Dreamer',
    'Alison Limerick — Where Love Lives',
    'Felix — Don\'t You Want Me',
  ],
  'Big piano chord stabs: hands-in-the-air house.',
  { suggested: true, related: [27, 28] });

/* ── Nonmetals & metalloids · Trance ───────────────────────────── */
E(5,  'Tn', 'Trance', 'trance', '128–148', 'Early 1990s Germany — present', 'Paul van Dyk, Tiësto, Above & Beyond',
  [
    'Paul van Dyk — For an Angel',
    'The Age of Love — The Age of Love (Jam & Spoon Watch Out for Stella Mix)',
    'Binary Finary — 1998',
    'Tiësto — Adagio for Strings',
  ],
  'Euphoric melodies, arpeggios and epic breakdowns. Built for the moment the whole room lifts.',
  { related: [6, 8, 14] });
E(6,  'Pt', 'Progressive Trance', 'trance', '128–138', '1990s UK — present', 'Above & Beyond, Ferry Corsten, Sasha',
  [
    'Sasha — Xpander',
    'BT — Flaming June',
    'Way Out West — The Gift',
    'Gouryella — Gouryella',
  ],
  'Slower-burning trance with house-like grooves and long arrangements.',
  { related: [5, 42] });
E(7,  'Vt', 'Vocal Trance', 'trance', '132–138', '1990s — present', 'Tiësto, Armin van Buuren, ATB',
  [
    'Delerium — Silence (Sanctuary Mix)',
    'OceanLab — Satellite',
    'Tiësto feat. BT — Love Comes Again',
    'Armin van Buuren — Shivers',
  ],
  'Trance built around a song and a singer: big choruses and soaring vocals.',
  { related: [5, 33] });
E(8,  'Ut', 'Uplifting Trance', 'trance', '138–145', 'Late 1990s — present', 'Aly & Fila, Bryan Kearney, Ferry Corsten',
  [
    'Energy 52 — Café Del Mar',
    'System F — Out of the Blue',
    'Rank 1 — Airwave',
    'Aly & Fila — We Control the Sunlight',
  ],
  'Maximum euphoria: rolling basslines, huge supersaw chords and very long breakdowns.',
  { related: [5, 7] });
E(14, 'Ps', 'Psytrance', 'trance', '138–148', 'Early 1990s Goa / Israel — present', 'Infected Mushroom, Astrix, Vini Vici',
  [
    'Infected Mushroom — Becoming Insane',
    'Astrix — Deep Jungle Walk',
    'Vini Vici — The Tribe',
  ],
  'Rolling 16th-note basslines, psychedelic FX and outdoor-festival culture.',
  { related: [15, 51, 67] });
E(15, 'Ga', 'Goa Trance', 'trance', '135–150', 'Early 1990s Goa, India', 'Astral Projection, Hallucinogen, Juno Reactor',
  [
    'Astral Projection — Mahadeva',
    'Hallucinogen — LSD',
    'Juno Reactor — Pistolero',
    'Man With No Name — Teleport',
  ],
  'Born on Goa\'s beach parties: acid lines, Eastern scales and all-night psychedelia.',
  { related: [14, 67] });
E(16, 'Tt', 'Tech Trance', 'trance', '138–145', 'Late 1990s — present', 'Sean Tyas, Simon Patterson, Marco V',
  [
    'Marco V — Godd',
    'Sean Tyas — Lift',
    'Simon Patterson — Different Feeling',
  ],
  'Trance with a harder, techno-driven backbone and fewer vocals.',
  { related: [5, 2, 32] });
E(32, 'Ht', 'Hard Trance', 'trance', '140–150', 'Mid 1990s Germany / UK', 'Mauro Picotto, Yoji Biomehanika, Lisa Lashes',
  [
    'Jones & Stephenson — The First Rebirth',
    'Mauro Picotto — Komodo',
    'Yves Deruyter — Rave City',
    'Cherry Moon Trax — The House of House',
  ],
  'Fast, pounding and relentless, with acid lines and hoover stabs.',
  { suggested: true, related: [44, 9] });
E(33, 'Eu', 'Euro Trance', 'trance', '135–140', 'Late 1990s Germany', 'ATB, Kai Tracid, Cascada',
  [
    'ATB — 9 PM (Till I Come)',
    'Kai Tracid — Your Own Reality',
    'Alice Deejay — Better Off Alone',
    'Cascada — Everytime We Touch',
  ],
  'Pop-structured trance: catchy hooks and radio-friendly drops.',
  { suggested: true, related: [7, 34] });
E(34, 'Dr', 'Dream Trance', 'trance', '128–138', 'Mid 1990s Italy', 'Robert Miles, Nylon Moon, Alex Gold',
  [
    'Robert Miles — Children',
    'Nylon Moon — Sky Plus',
    'Robert Miles — Fable',
  ],
  'Piano-led, emotional and gentle: trance for after the club.',
  { suggested: true, related: [33, 112] });
E(51,  'Pp', 'Progressive Psy', 'trance', '134–140', '2000s Europe — present', 'Ace Ventura, Liquid Soul, Captain Hook',
  [
    'Liquid Soul — Global Illumination',
    'Ace Ventura — Presence',
  ],
  'Psytrance with its tempo and intensity rolled back: hypnotic, groovy and built for long builds.',
  { suggested: true, related: [14, 6] });
E(52, 'Ax', 'Acid Trance', 'trance', '130–140', 'Early 1990s Germany', 'Hardfloor, Jam & Spoon, Union Jack',
  [
    'Hardfloor — Acperience 1',
    'Jam & Spoon — Stella',
    'Union Jack — Two Full Moons and a Trout',
    'Emmanuel Top — Acid Phase',
  ],
  'Layered TB-303 lines twisting over trance drums.',
  { suggested: true, related: [22, 67, 15] });

/* ── Post-transition metals · Bass / Breaks ────────────────────── */
E(13, 'Db', 'Drum & Bass', 'bass', '170–180', 'Early 1990s UK — present', 'Goldie, Andy C, Sub Focus',
  [
    'Goldie — Inner City Life',
    'Roni Size & Reprazent — Brown Paper Bag',
    'Shimon & Andy C — Bodyrock',
    'Chase & Status — Eastern Jam',
  ],
  'Fast breakbeats and heavy sub-bass. One of the UK\'s defining contributions to dance music.',
  { related: [31, 49, 84] });
E(31, 'Jg', 'Jungle', 'bass', '160–180', 'Early 1990s London', 'Shy FX, Aphrodite, Congo Natty',
  [
    'Shy FX & UK Apachi — Original Nuttah',
    'M-Beat feat. General Levy — Incredible',
    'Origin Unknown — Valley of the Shadows',
    'Rebel MC — Wickedest Sound',
  ],
  'Chopped Amen breaks, reggae basslines and MC culture. The root of drum & bass.',
  { related: [13, 50] });
E(49, 'Lq', 'Liquid DnB', 'bass', '170–176', 'Early 2000s UK — present', 'High Contrast, London Elektricity, Hospital Records',
  [
    'High Contrast — If We Ever',
    'London Elektricity — Just One Second',
    'Netsky — Memory Lane',
  ],
  'Soulful, musical drum & bass: rolling breaks under warm chords and vocals.',
  { related: [13] });
E(50, 'Bb', 'Breakbeat', 'bass', '130–150', 'Late 1980s UK — present', 'The Prodigy, The Chemical Brothers, Hybrid',
  [
    'The Chemical Brothers — Hey Boy Hey Girl',
    'Hybrid — Finished Symphony',
    'Freestylers — Push Up',
    'The Prodigy — Firestarter',
  ],
  'Sampled funk breaks instead of a straight kick. Includes big beat and nu-skool breaks.',
  { related: [31, 3] });
E(81, 'Ug', 'UK Garage', 'bass', '130–138', 'Mid 1990s London', 'MJ Cole, Todd Edwards, El-B',
  [
    'MJ Cole — Sincere',
    'Sweet Female Attitude — Flowers',
    'Shanks & Bigfoot — Sweet Like Chocolate',
    'DJ Luck & MC Neat — A Little Bit of Luck',
  ],
  'Shuffled, swung rhythms, chopped vocals and sub-bass. The UK remix of US garage house.',
  { related: [24, 83, 47, 82] });
E(82, 'Dp', 'Dubstep', 'bass', '138–142', 'Early 2000s Croydon — present', 'Skream, Benga, Mala',
  [
    'Skream — Midnight Request Line',
    'Mala — Anti-War Dub',
    'Benga & Coki — Night',
    'Burial — Archangel',
  ],
  'Half-time grooves at 140 BPM, wobbling sub-bass and lots of space.',
  { related: [81, 113, 80] });
E(83, 'Ts', '2-Step', 'bass', '130–138', 'Late 1990s London', 'Artful Dodger, Craig David, Wookie',
  [
    'Artful Dodger ft. Craig David — Re-Rewind',
    'Wookie — Battle',
    'Craig David — Fill Me In',
  ],
  'UK garage with the kick taken off the beat: skippy, syncopated and soulful.',
  { related: [81] });
E(84, 'Nf', 'Neurofunk', 'bass', '174–180', 'Late 1990s UK — present', 'Noisia, Phace, Mefjus',
  [
    'Noisia — Stigma',
    'Ed Rush & Optical — Pacman',
    'Mefjus — Sinkhole',
  ],
  'Dark, technical drum & bass with surgically designed basslines.',
  { related: [13, 113] });
E(113, 'Bs', 'Brostep', 'bass', '140–150', '2010s US', 'Skrillex, Excision, Zomboy',
  [
    'Skrillex — Scary Monsters and Nice Sprites',
    'Skrillex — Bangarang',
    'Zomboy — Nuclear (Hands Up)',
  ],
  'Dubstep made for arenas: screeching mid-range bass and massive drops.',
  { related: [82, 73, 115] });
E(114, 'Fb', 'Future Bass', 'bass', '140–160', '2010s Australia / US', 'Flume, Marshmello, Illenium',
  [
    'Flume — Never Be Like You',
    'Louis The Child — It\'s Strange',
    'Marshmello — Alone',
  ],
  'Wobbling supersaw chords, vocal chops and emotional drops.',
  { related: [115, 77] });
E(115, 'Ed', 'Trap (EDM)', 'bass', '140–150', '2010s US', 'Flosstradamus, RL Grime, Baauer',
  [
    'RL Grime — Core',
    'Baauer — Harlem Shake',
    'TNGHT — Higher Ground',
  ],
  'Hip-hop trap drums, 808s and brass stabs, built for festival drops.',
  { related: [113, 114] });
E(116, 'Bl', 'Bassline', 'bass', '135–142', '2000s Sheffield / Leeds', 'T2, DJ Q, H & Claire',
  [
    'T2 ft. Jodie Aysha — Heartbroken',
    'DJ Q ft. MC Bonez — You Wot!',
  ],
  'Organ-like wobbling bass on top of speed-garage rhythms. A Northern English club sound.',
  { suggested: true, related: [47, 81] });

/* ── Halogens · Hardcore / Hardstyle ───────────────────────────── */
E(9,  'Hs', 'Hardstyle', 'hard', '148–155', 'Early 2000s Netherlands — present', 'Headhunterz, Brennan Heart, Coone',
  [
    'Headhunterz — Dragonborn',
    'Showtek — FTS',
    'Coone — Global Dedication',
    'Brennan Heart — Imaginary',
  ],
  'Distorted, pitched "reverse bass" kicks, epic melodies and Dutch festival culture.',
  { related: [17, 35, 74] });
E(17, 'Rw', 'Rawstyle', 'hard', '150–160', '2010s Netherlands', 'Radical Redemption, Crypsis, Warface',
  [
    'Radical Redemption — Brutal 4.0',
    'Ran-D — Zombie',
    'Crypsis — Break Ya Neck',
  ],
  'Hardstyle\'s darker, rougher, more aggressive side.',
  { related: [9, 35] });
E(35, 'Gb', 'Gabber', 'hard', '160–200', 'Early 1990s Rotterdam', 'Angerfist, DJ Promo, Rotterdam Terror Corps',
  [
    'Rotterdam Terror Corps — Gabberen',
    'Party Animals — Have You Ever Been Mellow',
    'DJ Chosen Few — Chosen Anthem',
    'Euromasters — Alles Naar De Klote',
  ],
  'Hardcore at its rawest: distorted 909 kicks at punishing tempos.',
  { related: [9, 117, 86], wiki: 'Gabber' });
E(53, 'Hc', 'Happy Hardcore', 'hard', '160–175', 'Early 1990s UK', 'Hixxy, Sy, Scott Brown',
  [
    'Hixxy & Sharkey — Toytown',
    'Force & Styles — Heart of Gold',
    'DJ Seduction — Hardcore Heaven',
  ],
  'Hardcore with major-key piano, pitched-up vocals and rave optimism.',
  { related: [85, 35] });
E(85, 'Uh', 'UK Hardcore', 'hard', '165–175', '2000s UK', 'Darren Styles, Gammer, Re-Con',
  [
    'Darren Styles — Save Me',
    'Gammer — The Drop',
    'Breeze & Styles — You\'re Shining',
  ],
  'Happy hardcore\'s grown-up offspring: trance-like supersaws over hardcore kicks.',
  { related: [53, 5] });
E(117, 'Fc', 'Frenchcore', 'hard', '200–220', '2000s France / Netherlands', 'Dr. Peacock, Sefa, Billx',
  [
    'Dr. Peacock & Sefa — Incoming',
    'Dr. Peacock — Trip to Iran',
  ],
  'The heaviest element: overdriven kicks above 200 BPM, often with violins and folk samples.',
  { related: [35] });

/* ── Noble gases · Techno ──────────────────────────────────────── */
E(2,  'Te', 'Techno', 'techno', '120–160', 'Mid 1980s Detroit — present', 'Juan Atkins, Derrick May, Kevin Saunderson',
  [
    'Joey Beltram — Energy Flash',
    'Jeff Mills — The Bells',
    'Laurent Garnier — Crispy Bacon',
    'Dave Clarke — Red 2',
  ],
  'Helium: the second element. Futurist, machine-driven and hypnotic, from the Belleville Three to Berghain.',
  { related: [10, 18, 1, 3] });
E(10, 'Dt', 'Detroit Techno', 'techno', '125–135', 'Mid 1980s Detroit', 'Carl Craig, Jeff Mills, Underground Resistance',
  [
    'Rhythim Is Rhythim — Strings of Life',
    'Model 500 — No UFO\'s',
    'Inner City — Good Life',
    'Galaxy 2 Galaxy — Hi-Tech Jazz',
  ],
  'The original: soulful, futurist machine funk from Detroit\'s Black electronic pioneers.',
  { related: [2, 21, 3] });
E(18, 'Mi', 'Minimal Techno', 'techno', '124–130', 'Mid 1990s Detroit / Berlin', 'Ricardo Villalobos, Richie Hawtin, Pan-Pot',
  [
    'Plastikman — Spastik',
    'Ricardo Villalobos — Easy Lee',
    'Robert Hood — The Pace',
    'Daniel Bell — Losing Control',
  ],
  'Stripped to the bone: repetition, space and micro-variation.',
  { related: [2, 46, 36] });
E(36, 'Dq', 'Dub Techno', 'techno', '118–128', 'Early 1990s Berlin', 'Basic Channel, Deepchord, Yagya',
  [
    'Basic Channel — Quadrant Dub I',
    'Rhythm & Sound — Mango Drive',
    'Monolake — Cyan',
  ],
  'Techno filtered through dub delays and reverbs: hazy, deep and endlessly rolling.',
  { related: [18, 57] });
E(54, 'Mt', 'Melodic Techno', 'techno', '120–128', '2010s — present', 'Tale Of Us, Mind Against, Stephan Bodzin',
  [
    'Stephan Bodzin — Singularity',
    'Tale Of Us & Vaal — Monument',
    'Mind Against — Atlant',
  ],
  'Driving techno with dramatic arpeggios and cinematic emotion.',
  { related: [79, 2] });
E(86, 'In', 'Industrial Techno', 'techno', '130–145', '1990s UK / 2010s Berlin', 'Surgeon, Perc, Ansome',
  [
    'Perc — Look What Your Love Has Done to Me',
    'Surgeon — Floorshow',
  ],
  'Noisy, distorted and mechanical: techno that sounds like a factory floor.',
  { related: [87, 118] });
E(118, 'Hx', 'Hard Techno', 'techno', '140–160', '2020s Europe — present', 'I Hate Models, Sara Landry, 999999999',
  [
    'I Hate Models — Daydream',
    'Charlotte de Witte — Doppler',
    'Sara Landry — Legacy',
  ],
  'The heaviest noble gas: fast, distorted kicks, rave stabs and post-pandemic intensity.',
  { related: [86, 35, 2] });

/* ── Lanthanides · Ambient / Downtempo ─────────────────────────── */
E(57, 'Am', 'Ambient', 'ambient', '60–100', '1970s UK — present', 'Brian Eno, Stars of the Lid, Aphex Twin',
  [
    'Brian Eno — An Ending (Ascent)',
    'Brian Eno — 1/1',
    'Global Communication — 14:31',
  ],
  'Music as atmosphere: "as ignorable as it is interesting".',
  { related: [58, 61, 62], wiki: 'Ambient_music' });
E(58, 'Dw', 'Downtempo', 'ambient', '70–100', '1990s — present', 'Bonobo, Tycho, Nightmares on Wax',
  [
    'Bonobo — Kiara',
    'Nightmares on Wax — You Wish',
    'Thievery Corporation — Lebanese Blonde',
  ],
  'Slow, groove-led electronica for after-hours listening.',
  { related: [57, 59, 60] });
E(59, 'Th', 'Trip-Hop', 'ambient', '80–100', 'Early 1990s Bristol', 'Massive Attack, Portishead, Tricky',
  [
    'Massive Attack — Teardrop',
    'Portishead — Glory Box',
    'Massive Attack — Unfinished Sympathy',
    'Tricky — Hell Is Round the Corner',
  ],
  'Hip-hop beats slowed and darkened with dub, soul and cinematic noir.',
  { related: [58, 66] });
E(60, 'Co', 'Chillout', 'ambient', '70–100', '1990s Ibiza — present', 'Café del Mar, Zero 7, Hooverphonic',
  [
    'Zero 7 — Destiny',
    'Moby — Porcelain',
    'Groove Armada — At the River',
    'Hooverphonic — Mad About You',
  ],
  'Sunset-terrace electronica: lush, warm and horizontal.',
  { related: [58, 65] });
E(61, 'Id', 'IDM', 'ambient', '80–160', 'Early 1990s UK', 'Aphex Twin, Autechre, Boards of Canada',
  [
    'Aphex Twin — Xtal',
    'Boards of Canada — Roygbiv',
    'Autechre — Nine',
  ],
  '"Intelligent dance music": electronica for listening, intricate and experimental.',
  { suggested: true, related: [57, 98], wiki: 'Intelligent_dance_music' });
E(62, 'Ab', 'Ambient House', 'ambient', '90–120', 'Late 1980s UK', 'The Orb, The KLF, Global Communication',
  [
    'The Orb — Little Fluffy Clouds',
    '808 State — Pacific State',
    'The Grid — Floatation',
    'Global Communication — Ob-Selon Mi-Nos',
  ],
  'The chill-out room\'s own genre: house rhythms dissolved into ambient textures.',
  { suggested: true, related: [57, 21] });
E(63,  'Ak', 'Ambient Techno', 'ambient', '90–130', 'Early 1990s UK / Germany', 'Biosphere, GAS, The Black Dog',
  [
    'Biosphere — Novelty Waves',
    'The Black Dog — Raxmus',
    'Speedy J — Pepper',
  ],
  'Techno pulses dissolved into fog: weightless pads over a distant, steady beat.',
  { suggested: true, related: [57, 36, 62] });
E(64,  'Dn', 'Downtempo House', 'ambient', '100–118', '2010s Europe — present', 'Kiasmos, Rodriguez Jr., Christian Löffler',
  [
    'Kiasmos — Looped',
    'Christian Löffler — Haul',
  ],
  'House structures slowed and softened, with piano, strings and minimal electronics.',
  { suggested: true, related: [58, 23, 71] });
E(65, 'Ba', 'Balearic', 'ambient', '90–118', '1980s Ibiza', 'José Padilla, Alfredo, A Man Called Adam',
  [
    'José Padilla — Agua',
    'A Man Called Adam — Estelle',
    'Sueño Latino — Sueño Latino',
  ],
  'Eclectic, sun-drenched sounds from Ibiza\'s sunset sessions.',
  { suggested: true, related: [60, 56], wiki: 'Balearic_beat' });
E(66, 'Dd', 'Electronic Dub', 'ambient', '70–100', '1990s Vienna / UK', 'Kruder & Dorfmeister, Thievery Corporation, Mad Professor',
  [
    'Kruder & Dorfmeister — High Noon',
    'Dreadzone — Little Britain',
    'Thievery Corporation — The Richest Man in Babylon',
  ],
  'Reggae\'s dub science reinterpreted with downtempo beats.',
  { suggested: true, related: [59, 36] });
E(67, 'Pb', 'Psybient', 'ambient', '60–110', '1990s UK — present', 'Shpongle, Ott, Carbon Based Lifeforms',
  [
    'Shpongle — Dorset Perception',
    'Ott — The Queen of All Everything',
    'Carbon Based Lifeforms — Photosynthesis',
  ],
  'Psychedelic chill-out: psytrance textures, world music and ambient space.',
  { suggested: true, related: [14, 57] });
E(68, 'Nj', 'Nu Jazz', 'ambient', '90–125', 'Late 1990s Paris / Europe', 'St Germain, Jazzanova, The Cinematic Orchestra',
  [
    'St Germain — Rose Rouge',
    'The Cinematic Orchestra — All That You Give',
    'Jazzanova — Fedime\'s Flight',
  ],
  'Jazz instrumentation over electronic and house grooves.',
  { suggested: true, related: [39, 58] });
E(69, 'Fn', 'French Downtempo', 'ambient', '80–100', 'Late 1990s France', 'Air, Télépopmusik, Saint-Germain',
  [
    'Air — La Femme d\'Argent',
    'Télépopmusik — Breathe',
    'Air — Playground Love',
  ],
  'Moog, Fender Rhodes and velvet cool.',
  { suggested: true, related: [39, 60] });
E(70, 'Ae', 'Ambient Electronica', 'ambient', '90–120', '2000s — present', 'Tycho, Boards of Canada, Helios',
  [
    'Tycho — Awake',
    'Boards of Canada — Dayvan Cowboy',
    'Helios — Halving the Compass',
  ],
  'Widescreen, guitar-tinged electronica: warm, nostalgic and propulsive.',
  { suggested: true, related: [58, 64] });
E(71, 'Nc', 'Neoclassical Electronic', 'ambient', '60–120', '2000s Berlin / Iceland — present', 'Nils Frahm, Ólafur Arnalds, Jon Hopkins',
  [
    'Nils Frahm — Says',
    'Ólafur Arnalds — Near Light',
    'Jon Hopkins — Open Eye Signal',
  ],
  'Piano and strings fused with synths and electronic processing.',
  { suggested: true, related: [57, 70] });

/* ── Actinides · Global & Experimental ─────────────────────────── */
E(89, 'Ap', 'Amapiano', 'global', '108–115', '2010s South Africa — present', 'Kabza De Small, DJ Maphorisa, Uncle Waffles',
  [
    'Uncle Waffles — Tanzania',
    'Focalistic — Ke Star',
    'Tyla — Water',
  ],
  'Log-drum basslines, jazzy keys and slow-rolling grooves from Gauteng.',
  { related: [104, 91, 90] });
E(90, 'Gq', 'Gqom', 'global', '120–130', '2010s Durban', 'DJ Lag, Babes Wodumo, Distruction Boyz',
  [
    'Babes Wodumo ft. Mampintsha — Wololo',
    'Distruction Boyz — Omunye',
    'DJ Lag — Ice Drop',
  ],
  'Raw, broken, bass-heavy rhythms from Durban\'s townships.',
  { suggested: true, related: [89, 91] });
E(91, 'Kw', 'Kwaito', 'global', '100–115', 'Early 1990s South Africa', 'Boom Shaka, Mandoza, Trompies',
  [
    'Mandoza — Nkalakatha',
    'Boom Shaka — It\'s About Time',
    'Trompies — Sigiya Ngengoma',
  ],
  'Slowed-down house with chanted vocals: the post-apartheid sound of Soweto.',
  { related: [89, 104] });
E(92, 'Fw', 'Footwork / Juke', 'global', '155–165', '2000s Chicago', 'DJ Rashad, RP Boo, DJ Spinn',
  [
    'DJ Rashad — Let It Go',
    'DJ Rashad — Feelin',
    'RP Boo — Baby Come On',
  ],
  'Ghetto house sped up and fractured for dance battles: stuttering vocals, triplet rhythms.',
  { suggested: true, related: [26, 93] });
E(93, 'Jc', 'Jersey Club', 'global', '130–140', '2000s Newark', 'DJ Tameil, DJ Sliink, UNIIQU3',
  [
    'DJ Sliink — Vibrate',
    'Cookiee Kawaii — Vibe (If I Back It Up)',
    'Tapp — Dikkontrol',
  ],
  'Bouncing kick patterns, bedsqueak samples and chopped vocal loops.',
  { suggested: true, related: [92, 94] });
E(94, 'Bf', 'Baile Funk', 'global', '125–135', '1990s Rio de Janeiro', 'DJ Marlboro, Tati Quebra Barraco, MC Fioti',
  [
    'MC Fioti — Bum Bum Tam Tam',
    'Tati Quebra Barraco — Boladona',
    'Kevinho — Olha a Explosão',
  ],
  'Miami-bass drums reworked in Rio\'s favelas: tamborzão rhythms and call-and-response MCs.',
  { suggested: true, related: [3, 95], wiki: 'Funk_carioca' });
E(95, 'Ku', 'Kuduro', 'global', '130–140', 'Late 1980s Angola', 'Buraka Som Sistema, Os Lambas, DJ Znobia',
  [
    'Buraka Som Sistema — Kalemba (Wegue Wegue)',
    'Buraka Som Sistema — Sound of Kuduro',
  ],
  'Hyperactive Angolan dance music: frenetic percussion and Lisbon-club crossovers.',
  { suggested: true, related: [94, 89] });
E(96, 'Mb', 'Moombahton', 'global', '108–112', '2009 Washington, D.C.', 'Dave Nada, Diplo, Major Lazer',
  [
    'Dillon Francis & Diplo — Que Que',
    'Silvio Ecomo & Chuckie — Moombah!',
    'Major Lazer & DJ Snake — Lean On',
  ],
  'Dutch house slowed to reggaeton tempo. Invented by accident at a house party.',
  { suggested: true, related: [75, 94] });
E(97,  'Uf', 'UK Funky', 'global', '128–132', 'Late 2000s London', 'Crazy Cousinz, Roska, Donae\'o',
  [
    'Kyla — Do You Mind (Crazy Cousinz Remix)',
    'Fuzzy Logik ft. Egypt — In the Morning',
    'Donae\'o — Party Hard',
    'Funky Dee — Are You Gonna Bang Doe',
  ],
  'London\'s Afro-Caribbean twist on house: syncopated soca and kuduro-style drums at 130 BPM.',
  { suggested: true, related: [81, 95, 104] });
E(98, 'Gl', 'Glitch', 'global', '80–160', '1990s Germany / UK', 'Autechre, Oval, Alva Noto',
  [
    'Autechre — Gantz Graf',
    'Oval — Do While',
    'Alva Noto & Ryuichi Sakamoto — Vrioon',
  ],
  'Errors, skips and digital artefacts turned into rhythm.',
  { suggested: true, related: [61, 99] });
E(99, 'Bc', 'Breakcore', 'global', '160–300', 'Late 1990s Europe', 'Venetian Snares, Aaron Spectre, Machine Girl',
  [
    'Venetian Snares — Hajnal',
    'Machine Girl — Ghost',
    'Venetian Snares — Szamár Madár',
  ],
  'Shredded amen breaks at absurd tempos: chaos as composition.',
  { suggested: true, related: [31, 98, 117] });
E(100, 'Gr', 'Grime', 'global', '138–142', 'Early 2000s East London', 'Wiley, Dizzee Rascal, Skepta',
  [
    'Wiley — Eskimo',
    'Dizzee Rascal — I Luv U',
    'Skepta — That\'s Not Me',
    'Lethal Bizzle — Pow!',
  ],
  'Cold, square-wave beats at 140 BPM with rapid-fire MCing, born on London pirate radio.',
  { suggested: true, related: [81, 82, 101] });
E(101, 'Dc', 'Deconstructed Club', 'global', '90–140', '2010s internet / London', 'SOPHIE, Arca, Lotic',
  [
    'SOPHIE — Faceshopping',
    'Arca — Nonbinary',
  ],
  'Club music taken apart: hyperreal textures, abrupt edits and no fixed grid.',
  { suggested: true, related: [100, 98] });
E(102, 'Pk', 'Drift Phonk', 'global', '120–150', '2020s Russia / internet', 'Kordhell, PlayaPhonk, DVRST',
  [
    'Kordhell — Murder In My Mind',
    'PlayaPhonk — PHONKY TOWN',
    'DVRST — Close Eyes',
  ],
  'Cowbell melodies, Memphis-rap samples and distorted 808s: TikTok\'s car-edit soundtrack.',
  { suggested: true, related: [115, 100] });
E(103, 'Sn', 'Singeli', 'global', '200–300', '2000s Dar es Salaam', 'Jay Mitta, Duke, Sisso',
  [
    'Jay Mitta — Tatizo Pesa',
  ],
  'Tanzanian hyper-speed dance music: rapid-fire MCing over frantic, looping percussion.',
  { suggested: true, related: [95, 99] });
