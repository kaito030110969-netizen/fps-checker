export type GameBenchmarkSample = {
  gpuId: string | null;
  cpuId: string | null;

  resolution: string | null;
  qualityPreset: string | null;
  gameVersion: string | null;
  graphicsApi: string | null;
  gpuDriver: string | null;
  memoryConfig: string | null;
  testScene: string | null;
  measurementMethod: string | null;

  rayTracing: boolean | null;
  upscaling: string | null;
  frameGeneration: boolean | null;
  vsync: boolean | null;
  fpsCap: number | null;

  averageFps: number | null;
  onePercentLowFps: number | null;

  sourceName: string | null;
  sourceUrl: string | null;

  benchmarkDate: string | null;
  checkedAt: string | null;

  note: string | null;
};

// 将来的にはRTX 4060・1080p・Native Rasterをゲーム別GPU基準FPSの候補とするが、
// 実データ確認前のため、現時点では正式採用しない。
export const gameBenchmarkCalibration: Partial<Record<string, GameBenchmarkSample[]>> = {
  cyberpunk2077: [
    {
      gpuId: "rtx4060",
      cpuId: "i9-13900k",
      resolution: "1080p",
      qualityPreset: "Highest quality setting",
      gameVersion: null,
      graphicsApi: "DirectX 12",
      gpuDriver: "NVIDIA 536.23 WHQL",
      memoryConfig: "32GB (2x16GB) DDR5-6000 36-38-38-76",
      testScene: "TechPowerUp custom in-game test scene",
      measurementMethod: "Average FPS measured in a custom in-game scene; not the integrated benchmark",
      rayTracing: false,
      upscaling: "none",
      frameGeneration: false,
      averageFps: 72.3,
      onePercentLowFps: null,
      sourceName: "TechPowerUp - GeForce RTX 4060 review / Cyberpunk 2077",
      sourceUrl: null,
      benchmarkDate: null,
      checkedAt: "2026-09-20",
      vsync: null,
      fpsCap: null,
      note: "TechPowerUpの比較チャート内の通常RTX 4060 8GBの値。カスタムゲーム内シーンによる平均FPS。ゲームバージョン、VSync、FPS上限、1% Lowは今回未確認。",
    },
    {
      gpuId: "rtx4060",
      cpuId: "i9-13900k",
      resolution: "1440p",
      qualityPreset: "Highest quality setting",
      gameVersion: null,
      graphicsApi: "DirectX 12",
      gpuDriver: "NVIDIA 536.23 WHQL",
      memoryConfig: "32GB (2x16GB) DDR5-6000 36-38-38-76",
      testScene: "TechPowerUp custom in-game test scene",
      measurementMethod: "Average FPS measured in a custom in-game scene; not the integrated benchmark",
      rayTracing: false,
      upscaling: "none",
      frameGeneration: false,
      averageFps: 42.0,
      onePercentLowFps: null,
      sourceName: "TechPowerUp - GeForce RTX 4060 review / Cyberpunk 2077",
      sourceUrl: null,
      benchmarkDate: null,
      checkedAt: "2026-09-20",
      vsync: null,
      fpsCap: null,
      note: "TechPowerUpの比較チャート内の通常RTX 4060 8GBの値。カスタムゲーム内シーンによる平均FPS。ゲームバージョン、VSync、FPS上限、1% Lowは今回未確認。",
    },
    {
      gpuId: "rtx4060",
      cpuId: "i9-13900k",
      resolution: "4K",
      qualityPreset: "Highest quality setting",
      gameVersion: null,
      graphicsApi: "DirectX 12",
      gpuDriver: "NVIDIA 536.23 WHQL",
      memoryConfig: "32GB (2x16GB) DDR5-6000 36-38-38-76",
      testScene: "TechPowerUp custom in-game test scene",
      measurementMethod: "Average FPS measured in a custom in-game scene; not the integrated benchmark",
      rayTracing: false,
      upscaling: "none",
      frameGeneration: false,
      averageFps: 18.0,
      onePercentLowFps: null,
      sourceName: "TechPowerUp - GeForce RTX 4060 review / Cyberpunk 2077",
      sourceUrl: null,
      benchmarkDate: null,
      checkedAt: "2026-09-20",
      vsync: null,
      fpsCap: null,
      note: "TechPowerUpの比較チャート内の通常RTX 4060 8GBの値。カスタムゲーム内シーンによる平均FPS。ゲームバージョン、VSync、FPS上限、1% Lowは今回未確認。",
    },
  ],
};
