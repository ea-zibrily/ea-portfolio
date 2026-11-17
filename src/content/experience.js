// src/content/experience.js
// Work Experience Schema conforming to PRD §5 F2
// Edit data here to update the Experience timeline.

export default [
  {
    id: 'bumi-studio',
    role: 'Game Programmer',
    company: 'Bumi Studio',
    companyUrl: 'https://bumistudio.co.id/',
    type: 'Full-time',
    location: 'Kota Malang, Indonesia (On-site)',
    start: '2025-10',
    end: null,
    summary: 'Developing and maintaining a cozy, turn-based game while improving system scalability, maintainability, and team workflows through configurable tools.',
    highlights: [
      'Architected gameplay systems using MVP and event-driven patterns.',
      'Enabled designers to independently manage game content through configurable systems.',
      'Improved code quality through refactoring, optimization, and sprint-based reviews.',
      'Analyzed and optimized system performance using Unity Profiler and debugging tools to identify bottlenecks and improve runtime efficiency.',
      'Partnered with QA teams to ensure reliable bug verification and release stability.',
      'Delivered gameplay features and content updates for ongoing product development.',
    ],
    tags: ['C#', 'Unity Engine', 'Cinemachine', 'PrimeTween', 'Steam', 'Git/GitHub', 'Antigravity']
  },
  {
    id: 'lentera-nusantara',
    role: 'Game Programmer',
    company: 'Lentera Nusantara',
    companyUrl: 'https://lentera-nusantara.com/',
    type: 'Contract',
    location: 'Kota Bandung, Indonesia (Hybrid)',
    start: '2025-07',
    end: '2025-09',
    summary: 'Developed and maintained gameplay systems for a live mobile game while supporting ongoing feature development, cloud service integration, and operational activities.',
    highlights: [
      'Developed and enhanced gameplay systems, game mechanics, and core gameplay features.',
      'Continued development of handover projects by maintaining existing codebases.',
      'Integrated cloud-based services including PlayFab, Firebase, and Balancy to support authentication, player data management, analytics, and monetization.',
      'Managed LiveOps and DevOps activities, including game deployment, maintenance, updates, and release management on Google Play Console.',
      'Performed debugging, bug fixing, refactoring, and optimization to improve game stability and performance.',
      'Coordinated with interns by providing technical guidance, task support, and development assistance throughout project execution.'
    ],
    tags: ['C#', 'Unity Engine', 'Unity IAP', '2D Physics', 'Google Play Console', 'Firebase', 'Git/Source Tree']
  },
  {
    id: 'iota-kreatif-media',
    role: 'Game Programmer',
    company: 'IOTA Kreatif Media',
    companyUrl: 'https://iota.co.id/',
    type: 'Internship',
    location: 'Jakarta Pusat, Indonesia (Hybrid)',
    start: '2024-01',
    end: '2025-02',
    summary: 'Built interactive educational games and AR experiences aimed at children and early education learners.',
    highlights: [
      'Implemented gameplay systems, mechanics, and interactive features based on project requirements.',
      'Developed prototypes and proof-of-concept builds for product validation and project presentations.',
      'Supported B2B project delivery through content configuration, asset validation, feature setup, and quality assurance activities.',
      'Contributed to B2C game development by implementing gameplay features and content updates.',
      'Conducted research on game mechanics, user experiences, and industry trends to support development decisions.',
      'Improved game system quality through debugging, refactoring, optimization, and ongoing maintenance.'
    ],
    tags: ['C#', 'JavaScript', 'Unity Engine', 'DOTween', 'Cinemachine', 'Meta Spark AR', 'Git/GitHub', 'Git/GitLab']
  },
  {
    id: 'freelance-game-dev',
    role: 'Game Developer',
    company: 'tsukuyomi.',
    companyUrl: 'https://tsukuyomi-std.itch.io/',
    type: 'Freelance',
    location: 'Surabaya, Indonesia (Remote)',
    start: '2022-07',
    end: '2024-01',
    summary: 'Prototyped and shipped various indie titles, game jam submissions, and multiplayer experiments.',
    highlights: [
      'Developed and implemented gameplay mechanics, including player controllers, coin collection, boss behaviors, and game management systems.', 
      'Designed game systems and mechanics by creating Game Design Documents (GDD), conducting research, and defining gameplay rules and level designs.', 
      'Developed boss systems featuring unique behaviors, basic attacks, HP management, and skill mechanics.', 
      'Configured and customized VR learning application templates, integrating educational content such as questions, images, and videos.', 
      'Optimized user interface flows and collaborated with multidisciplinary teams to improve application usability and asset integration.', 
      'Developed visual programming features using Unity uBlockly package, including undo/redo functionality, multiple workspaces, and block acceleration.', 
      'Supported application building, debugging, and deployment, including exporting VR applications to Oculus devices.'
    ],
    tags: ['C#', 'Unity Engine', 'Cinemachine', 'Photon Multiplayer', 'Prime Tween', 'Ink', 'Git/GitHub']
  }
]