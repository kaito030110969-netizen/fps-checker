export type GpuBenchmarkSample = {
  normalizedScore: number | null;
  averageFps: number | null;
  sourceRelativePercent: number | null;
  sourceName: string | null;
  sourceUrl: string | null;
  benchmarkType: string | null;
  resolution: string | null;
  quality: string | null;
  rayTracing: boolean | null;
  upscaling: string | null;
  checkedAt: string | null;
  note: string | null;
};

export type CpuBenchmarkSample = {
  normalizedScore: number | null;
  sourceName: string | null;
  sourceUrl: string | null;
  benchmarkType: string | null;
  resolution: string | null;
  testGpu: string | null;
  checkedAt: string | null;
  note: string | null;
};

export const GPU_CALIBRATION_PROFILE = {
  sourceName: "Tom's Hardware GPU Benchmarks Hierarchy 2026",
  benchmarkType: "2026 raster gaming 11-game geometric mean",
  quality: "Ultra",
  rayTracing: false,
  upscaling: "none",
} as const;

export const GPU_CALIBRATION_BASELINE = {
  gpuId: "rtx4060",
  resolution: "1080p",
  averageFps: 71.5,
  normalizedScore: 100,
} as const;

const sourceName = "Tom's Hardware GPU Benchmarks Hierarchy 2026";
const sourceUrl = "https://www.tomshardware.com/reviews/gpu-hierarchy,4388.html";
const checkedAt = "2026-09-20";
const benchmarkType = "2026 raster gaming 11-game geometric mean";
const note = "Native resolution。DLSS・FSR・XeSS・Frame Generationなし。2026 Raster 11ゲームの幾何平均。";

function rasterSample(
  resolution: "1080p" | "1440p" | "4K",
  averageFps: number,
  sourceRelativePercent: number
): GpuBenchmarkSample {
  return {
    normalizedScore: null,
    averageFps,
    sourceRelativePercent,
    sourceName,
    sourceUrl,
    benchmarkType,
    resolution,
    quality: "Ultra",
    rayTracing: false,
    upscaling: "none",
    checkedAt,
    note,
  };
}

export const gpuBenchmarkCalibration: Partial<Record<string, GpuBenchmarkSample[]>> = {
  rtx4060: [
    rasterSample("1080p", 71.5, 35.1),
    rasterSample("1440p", 47.6, 28.4),
    rasterSample("4K", 17.4, 15.7),
  ],
  rtx4060ti: [
    rasterSample("1080p", 88.0, 43.2),
    rasterSample("1440p", 58.9, 35.2),
    rasterSample("4K", 23.9, 21.5),
  ],
  rtx4070: [
    rasterSample("1080p", 111.5, 54.7),
    rasterSample("1440p", 77.8, 46.5),
    rasterSample("4K", 41.3, 37.2),
  ],
  rtx4070super: [
    rasterSample("1080p", 126.7, 62.2),
    rasterSample("1440p", 91.2, 54.5),
    rasterSample("4K", 49.2, 44.4),
  ],
  rtx5060ti: [
    rasterSample("1080p", 100.4, 49.3),
    rasterSample("1440p", 68.6, 41.0),
    rasterSample("4K", 28.1, 25.4),
  ],
  rtx5070: [
    rasterSample("1080p", 132.6, 65.1),
    rasterSample("1440p", 96.4, 57.6),
    rasterSample("4K", 54.3, 49.0),
  ],
};

function matchesGpuCalibrationProfile(sample: GpuBenchmarkSample): boolean {
  return (
    sample.sourceName === GPU_CALIBRATION_PROFILE.sourceName &&
    sample.benchmarkType === GPU_CALIBRATION_PROFILE.benchmarkType &&
    sample.quality === GPU_CALIBRATION_PROFILE.quality &&
    sample.rayTracing === GPU_CALIBRATION_PROFILE.rayTracing &&
    sample.upscaling === GPU_CALIBRATION_PROFILE.upscaling
  );
}

function findGpuCalibrationSample(
  gpuId: string,
  resolution: string
): GpuBenchmarkSample | null {
  const samples = gpuBenchmarkCalibration[gpuId];
  return (
    samples?.find(
      (sample) =>
        sample.resolution === resolution &&
        matchesGpuCalibrationProfile(sample)
    ) ?? null
  );
}

export function getGpuNormalizedScore(
  gpuId: string,
  resolution: string
): number | null {
  const baselineSample = findGpuCalibrationSample(
    GPU_CALIBRATION_BASELINE.gpuId,
    GPU_CALIBRATION_BASELINE.resolution
  );
  const sample = findGpuCalibrationSample(gpuId, resolution);

  if (
    baselineSample?.averageFps !== GPU_CALIBRATION_BASELINE.averageFps ||
    sample?.averageFps === null ||
    sample?.averageFps === undefined
  ) {
    return null;
  }

  return (
    sample.averageFps /
    baselineSample.averageFps *
    GPU_CALIBRATION_BASELINE.normalizedScore
  );
}

export const cpuBenchmarkCalibration: Partial<Record<string, CpuBenchmarkSample[]>> = {};
