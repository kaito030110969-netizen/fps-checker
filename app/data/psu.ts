import type { GPU } from "./gpus";

export type PsuCheck = {
  status: "sufficient" | "review" | "replace";
  label: "電源容量十分" | "要確認" | "交換推奨";
  psuW: number | null;
  recommendedPsuW: number | null;
  sourceUrl: string | null;
  reason: string;
};

// 推奨値はPC全体の値なので、CPU分を二重加算しない。
export function checkPsu(psuW: number | null, gpu: GPU, cpuChanged = false): PsuCheck {
  const validWatts = (value: number | null) =>
    typeof value === "number" && Number.isFinite(value) && value > 0;
  const installed = validWatts(psuW) ? psuW : null;
  const recommended = validWatts(gpu.recommendedPsuW) ? gpu.recommendedPsuW : null;
  const base = { psuW: installed, recommendedPsuW: recommended, sourceUrl: gpu.psuSourceUrl };

  if (installed === null) {
    return { ...base, status: "review", label: "要確認", reason: "使用している電源容量を確認して選択してください。" };
  }
  if (recommended === null) {
    return { ...base, status: "review", label: "要確認", reason: "このGPUの推奨電源容量は未確認です。製品メーカーの仕様を確認してください。" };
  }
  if (installed < recommended) {
    return { ...base, status: "replace", label: "交換推奨", reason: `GPUメーカーの推奨値を${recommended - installed}W下回っています。${recommended}W以上を目安に電源の見直しを推奨します。` };
  }
  if (cpuChanged) {
    return { ...base, status: "review", label: "要確認", reason: "GPUの推奨容量は満たしていますが、交換先CPUの消費電力は未評価です。交換後の構成全体で確認してください。" };
  }
  return { ...base, status: "sufficient", label: "電源容量十分", reason: "GPUメーカーの推奨容量を満たしています。構成全体の動作を保証する判定ではありません。" };
}
