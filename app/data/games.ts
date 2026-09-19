export type Game = {
  id: string;
  name: string;
  category: string;
  cpuBaseFps: number;
  gpuBaseFps: number;
  lowRatio: number;
};

export const games: Game[] = [
  // =========================
  // FPS / TPS / BATTLE ROYALE
  // =========================
  {
    id: "apex",
    name: "Apex Legends",
    category: "FPS / TPS",
    cpuBaseFps: 240,
    gpuBaseFps: 165,
    lowRatio: 0.72,
  },
  {
    id: "valorant",
    name: "VALORANT",
    category: "FPS / TPS",
    cpuBaseFps: 420,
    gpuBaseFps: 350,
    lowRatio: 0.78,
  },
  {
    id: "cs2",
    name: "Counter-Strike 2",
    category: "FPS / TPS",
    cpuBaseFps: 350,
    gpuBaseFps: 300,
    lowRatio: 0.70,
  },
  {
    id: "fortnite",
    name: "Fortnite",
    category: "FPS / TPS",
    cpuBaseFps: 260,
    gpuBaseFps: 180,
    lowRatio: 0.70,
  },
  {
    id: "warzone",
    name: "Call of Duty: Warzone",
    category: "FPS / TPS",
    cpuBaseFps: 210,
    gpuBaseFps: 140,
    lowRatio: 0.68,
  },
  {
    id: "overwatch2",
    name: "Overwatch 2",
    category: "FPS / TPS",
    cpuBaseFps: 300,
    gpuBaseFps: 230,
    lowRatio: 0.74,
  },
  {
    id: "r6siege",
    name: "Rainbow Six Siege",
    category: "FPS / TPS",
    cpuBaseFps: 360,
    gpuBaseFps: 300,
    lowRatio: 0.75,
  },
  {
    id: "pubg",
    name: "PUBG: BATTLEGROUNDS",
    category: "FPS / TPS",
    cpuBaseFps: 240,
    gpuBaseFps: 175,
    lowRatio: 0.66,
  },
  {
    id: "thefinals",
    name: "THE FINALS",
    category: "FPS / TPS",
    cpuBaseFps: 195,
    gpuBaseFps: 130,
    lowRatio: 0.66,
  },
  {
    id: "marvelrivals",
    name: "Marvel Rivals",
    category: "FPS / TPS",
    cpuBaseFps: 220,
    gpuBaseFps: 145,
    lowRatio: 0.67,
  },

  // =========================
  // ACTION / RPG
  // =========================
  {
    id: "cyberpunk2077",
    name: "Cyberpunk 2077",
    category: "Action / RPG",
    cpuBaseFps: 180,
    gpuBaseFps: 85,
    lowRatio: 0.68,
  },
  {
    id: "eldenring",
    name: "ELDEN RING",
    category: "Action / RPG",
    cpuBaseFps: 160,
    gpuBaseFps: 125,
    lowRatio: 0.72,
  },
  {
    id: "hogwarts",
    name: "Hogwarts Legacy",
    category: "Action / RPG",
    cpuBaseFps: 185,
    gpuBaseFps: 105,
    lowRatio: 0.66,
  },
  {
    id: "blackmyth",
    name: "Black Myth: Wukong",
    category: "Action / RPG",
    cpuBaseFps: 180,
    gpuBaseFps: 78,
    lowRatio: 0.66,
  },
  {
    id: "starfield",
    name: "Starfield",
    category: "Action / RPG",
    cpuBaseFps: 150,
    gpuBaseFps: 82,
    lowRatio: 0.64,
  },
  {
    id: "diablo4",
    name: "Diablo IV",
    category: "Action / RPG",
    cpuBaseFps: 230,
    gpuBaseFps: 165,
    lowRatio: 0.72,
  },
  {
    id: "baldursgate3",
    name: "Baldur's Gate 3",
    category: "Action / RPG",
    cpuBaseFps: 205,
    gpuBaseFps: 145,
    lowRatio: 0.69,
  },
  {
    id: "dragonsdogma2",
    name: "Dragon's Dogma 2",
    category: "Action / RPG",
    cpuBaseFps: 135,
    gpuBaseFps: 90,
    lowRatio: 0.60,
  },

  // =========================
  // MONSTER HUNTER
  // =========================
  {
    id: "mhwilds",
    name: "Monster Hunter Wilds",
    category: "Monster Hunter",
    cpuBaseFps: 155,
    gpuBaseFps: 78,
    lowRatio: 0.65,
  },
  {
    id: "mhworld",
    name: "Monster Hunter: World",
    category: "Monster Hunter",
    cpuBaseFps: 220,
    gpuBaseFps: 150,
    lowRatio: 0.70,
  },
  {
    id: "mhrise",
    name: "Monster Hunter Rise",
    category: "Monster Hunter",
    cpuBaseFps: 300,
    gpuBaseFps: 240,
    lowRatio: 0.75,
  },

  // =========================
  // OPEN WORLD
  // =========================
  {
    id: "gtav",
    name: "Grand Theft Auto V",
    category: "Open World",
    cpuBaseFps: 260,
    gpuBaseFps: 210,
    lowRatio: 0.73,
  },
  {
    id: "rdr2",
    name: "Red Dead Redemption 2",
    category: "Open World",
    cpuBaseFps: 190,
    gpuBaseFps: 110,
    lowRatio: 0.69,
  },
  {
    id: "forzahorizon5",
    name: "Forza Horizon 5",
    category: "Open World / Racing",
    cpuBaseFps: 235,
    gpuBaseFps: 165,
    lowRatio: 0.74,
  },
  {
    id: "watchdogslegion",
    name: "Watch Dogs: Legion",
    category: "Open World",
    cpuBaseFps: 170,
    gpuBaseFps: 100,
    lowRatio: 0.65,
  },

  // =========================
  // SURVIVAL / SANDBOX
  // =========================
  {
    id: "minecraftjava",
    name: "Minecraft Java Edition",
    category: "Sandbox",
    cpuBaseFps: 420,
    gpuBaseFps: 350,
    lowRatio: 0.70,
  },
  {
    id: "palworld",
    name: "Palworld",
    category: "Survival",
    cpuBaseFps: 190,
    gpuBaseFps: 125,
    lowRatio: 0.65,
  },
  {
    id: "rust",
    name: "Rust",
    category: "Survival",
    cpuBaseFps: 190,
    gpuBaseFps: 145,
    lowRatio: 0.62,
  },
  {
    id: "arksa",
    name: "ARK: Survival Ascended",
    category: "Survival",
    cpuBaseFps: 150,
    gpuBaseFps: 65,
    lowRatio: 0.61,
  },

  // =========================
  // CO-OP / ACTION
  // =========================
  {
    id: "helldivers2",
    name: "Helldivers 2",
    category: "Co-op Action",
    cpuBaseFps: 180,
    gpuBaseFps: 115,
    lowRatio: 0.67,
  },
  {
    id: "destiny2",
    name: "Destiny 2",
    category: "Co-op Action",
    cpuBaseFps: 270,
    gpuBaseFps: 210,
    lowRatio: 0.72,
  },
  {
    id: "warframe",
    name: "Warframe",
    category: "Co-op Action",
    cpuBaseFps: 310,
    gpuBaseFps: 260,
    lowRatio: 0.76,
  },

  // =========================
  // JAPANESE / ONLINE
  // =========================
  {
    id: "ffxiv",
    name: "FINAL FANTASY XIV",
    category: "MMORPG",
    cpuBaseFps: 240,
    gpuBaseFps: 180,
    lowRatio: 0.70,
  },
  {
    id: "ff16",
    name: "FINAL FANTASY XVI",
    category: "Action / RPG",
    cpuBaseFps: 160,
    gpuBaseFps: 82,
    lowRatio: 0.64,
  },
  {
    id: "tekken8",
    name: "TEKKEN 8",
    category: "Fighting",
    cpuBaseFps: 180,
    gpuBaseFps: 140,
    lowRatio: 0.75,
  },
  {
    id: "streetfighter6",
    name: "Street Fighter 6",
    category: "Fighting",
    cpuBaseFps: 220,
    gpuBaseFps: 170,
    lowRatio: 0.76,
  },

  // =========================
  // FREE TO PLAY / ASIA
  // =========================
  {
    id: "genshin",
    name: "原神",
    category: "Action / RPG",
    cpuBaseFps: 220,
    gpuBaseFps: 180,
    lowRatio: 0.74,
  },
  {
    id: "zzz",
    name: "Zenless Zone Zero",
    category: "Action / RPG",
    cpuBaseFps: 220,
    gpuBaseFps: 165,
    lowRatio: 0.72,
  },
  {
    id: "wutheringwaves",
    name: "Wuthering Waves",
    category: "Action / RPG",
    cpuBaseFps: 185,
    gpuBaseFps: 120,
    lowRatio: 0.66,
  },

  // =========================
  // SIM / STRATEGY
  // =========================
  {
    id: "cities2",
    name: "Cities: Skylines II",
    category: "Simulation",
    cpuBaseFps: 125,
    gpuBaseFps: 70,
    lowRatio: 0.58,
  },
  {
    id: "msfs",
    name: "Microsoft Flight Simulator",
    category: "Simulation",
    cpuBaseFps: 135,
    gpuBaseFps: 95,
    lowRatio: 0.62,
  },

  // =========================
  // SPORTS / RACING
  // =========================
  {
    id: "eaFC",
    name: "EA SPORTS FC",
    category: "Sports",
    cpuBaseFps: 260,
    gpuBaseFps: 210,
    lowRatio: 0.76,
  },
  {
    id: "assetto",
    name: "Assetto Corsa Competizione",
    category: "Racing",
    cpuBaseFps: 195,
    gpuBaseFps: 130,
    lowRatio: 0.69,
  },
];