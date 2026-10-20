// src/content/experience.js
// Work Experience Schema conforming to PRD §5 F2
// Edit data here to update the Experience timeline.

export default [
  {
    id: 'lentera-nusantara',
    role: 'Unity Game Programmer',
    company: 'Lentera Nusantara',
    companyUrl: 'https://lenteranusantara.com',
    type: 'Studio Project',
    location: 'Bandung, Indonesia (Hybrid)',
    start: '2024-06',
    end: null, // null = "PRESENT"
    summary: 'Engineered core gameplay loops, physics systems, and mobile optimizations for production commercial titles.',
    highlights: [
      'Developed 2D arcade physics, flipper mechanics, and table triggers for Ghost Pinball: Tuyul Adventure.',
      'Programmed enemy behaviors, obstacle distribution, and brick health systems for Ghost Breaker: Suri Adventure.',
      'Optimized draw calls, asset bundles, and memory usage for smooth 60 FPS performance on Android devices.',
      'Collaborated closely with game designers and 2D/3D artists to translate design requirements into modular C# systems.'
    ],
    tags: ['C#', 'Unity Engine', '2D Physics', 'Mobile Optimization', 'Git']
  },
  {
    id: 'iota-kids',
    role: 'Unity Programmer & AR Developer',
    company: 'IOTA Kids',
    companyUrl: 'https://www.instagram.com/iotakids',
    type: 'Contract',
    location: 'Surabaya, Indonesia',
    start: '2023-08',
    end: '2024-05',
    summary: 'Built interactive educational games and AR experiences aimed at children and early education learners.',
    highlights: [
      'Implemented maze exploration logic and alphabet collection mechanics for Labirin Alfabet.',
      'Engineered flight controls, targeting systems, and stage management for aerial shooter Skuadron Garuda.',
      'Developed motion-reactive AR filter arcade games (Tangkap Bintang, Mendaki Puncak) using Meta Spark AR.',
      'Conducted playtesting and performance tuning across various low-to-mid range mobile target devices.'
    ],
    tags: ['C#', 'Unity Engine', 'Meta Spark AR', 'JavaScript', 'Game Design']
  },
  {
    id: 'freelance-game-dev',
    role: 'Independent Game Programmer',
    company: 'Tsukuyomi Studios & Game Jams',
    companyUrl: null,
    type: 'Personal & Indie Projects',
    location: 'Surabaya, Indonesia',
    start: '2022-01',
    end: '2023-07',
    summary: 'Prototyped and shipped various indie titles, game jam submissions, and multiplayer experiments.',
    highlights: [
      'Engineered stealth infiltration mechanics and terminal puzzles for ELKER 2043.',
      'Built online casual multiplayer networking using Photon PUN for Ohh No My Egg!',
      'Created endless runner procedural generation and touch controls for Mager 1: Belum Produktif.',
      'Completed rapid game jam prototypes under tight deadlines including Live2Dev Gamejam 2025.'
    ],
    tags: ['C#', 'Unity Engine', 'Photon Multiplayer', 'Itch.io', 'Git']
  }
]
