"use client";

import { useState } from "react";
import { checkPsu, type PsuCheck } from "./data/psu";
import { gpus, type GPU } from "./data/gpus";
import { cpus, type CPU } from "./data/cpus";
import { games, type Game } from "./data/games";
import {
  gpuPrices,
  cpuPrices,
  getComparablePrice,
  calculateYenPerFps,
  pickBestValue,
  type PriceInfo,
} from "./data/prices";

type Result = {
  avg: number;
  low: number;
  min: number;
  max: number;
  cpuLimit: number;
  gpuLimit: number;
  bottleneck: string;
};

const resolutionFactors: Record<string, number> = {
  "1080p": 1,
  "1440p": 0.73,
  "4K": 0.43,
};

const qualityFactors: Record<string, number> = {
  Competitive: 1.35,
  Low: 1.25,
  Medium: 1.12,
  High: 1,
  Ultra: 0.82,
};

function calculatePerformance(
  cpu: CPU,
  gpu: GPU,
  game: Game,
  resolution: string,
  quality: string,
  ram: string
): Result {
  const cpuLimit = game.cpuBaseFps * (cpu.score / 100);

  const gpuLimit =
    game.gpuBaseFps *
    (gpu.score / 100) *
    resolutionFactors[resolution] *
    qualityFactors[quality];

  const average = Math.min(cpuLimit, gpuLimit);

  let ramFactor = 1;

  if (ram === "8") ramFactor = 0.76;
  if (ram === "16") ramFactor = 0.9;
  if (ram === "32") ramFactor = 1;
  if (ram === "64") ramFactor = 1.02;

  const low = average * game.lowRatio * ramFactor;

  const difference =
    Math.abs(cpuLimit - gpuLimit) / Math.max(cpuLimit, gpuLimit);

  let bottleneck = "バランス型";

  if (difference >= 0.1) {
    bottleneck = cpuLimit < gpuLimit ? "CPU側" : "GPU側";
  }

  return {
    avg: Math.round(average),
    low: Math.round(low),
    min: Math.round(average * 0.92),
    max: Math.round(average * 1.08),
    cpuLimit: Math.round(cpuLimit),
    gpuLimit: Math.round(gpuLimit),
    bottleneck,
  };
}

function getRequiredVram(
  resolution: string,
  quality: string
) {
  let required = 6;

  // 解像度による基準
  if (resolution === "1080p") {
    required = 6;
  }

  if (resolution === "1440p") {
    required = 8;
  }

  if (resolution === "4K") {
    required = 12;
  }

  // 画質による補正
  if (quality === "Competitive") {
    required -= 2;
  }

  if (quality === "Low") {
    required -= 1;
  }

  if (quality === "Ultra") {
    required += 2;
  }

  // 最低4GB
  return Math.max(required, 4);
}

export default function Home() {
  const [cpuId, setCpuId] = useState("r7-5700x");
  const [gpuId, setGpuId] = useState("rtx4060");
  const [gameId, setGameId] = useState("apex");
  const [resolution, setResolution] = useState("1080p");
  const [quality, setQuality] = useState("High");
  const [ram, setRam] = useState("16");
  const [psu, setPsu] = useState("unknown");
  const [hasCalculated, setHasCalculated] = useState(false);

  const cpu = cpus.find((item) => item.id === cpuId)!;
  const gpu = gpus.find((item) => item.id === gpuId)!;
  const game = games.find((item) => item.id === gameId)!;

  function calculate() {
    setHasCalculated(true);
  }
const currentPerformance = calculatePerformance(
  cpu,
  gpu,
  game,
  resolution,
  quality,
  ram
);
const result = hasCalculated ? currentPerformance : null;
const psuW = psu === "unknown" ? null : Number(psu);
const currentPsu = checkPsu(psuW, gpu);

const requiredVram = getRequiredVram(
  resolution,
  quality
);

const vramShortage =
  gpu.vram < requiredVram;

const vramDifference =
  requiredVram - gpu.vram;

  const cpuUpgrades = cpus
  .filter(
    (candidate) =>
      candidate.platform === cpu.platform &&
      candidate.score > cpu.score
  )
  .map((candidate) => {
    const newResult = calculatePerformance(
      candidate,
      gpu,
      game,
      resolution,
      quality,
      ram
    );

    const avgGain = Math.round(
      ((newResult.avg - currentPerformance.avg) /
        currentPerformance.avg) *
        100
    );

    const lowGain = Math.round(
      ((newResult.low - currentPerformance.low) /
        currentPerformance.low) *
        100
    );

    const priceInfo =
      cpuPrices[candidate.id];

    const priceYen =
      getComparablePrice(priceInfo);

    const fpsGain =
      newResult.avg -
      currentPerformance.avg;

    const yenPerFps = calculateYenPerFps(priceYen, fpsGain);

    let effect = "交換効果：小";

    if (avgGain >= 30) {
      effect = "交換効果：大";
    } else if (avgGain >= 15) {
      effect = "交換効果：中";
    } else if (avgGain >= 5) {
      effect = "交換効果：小";
    } else {
      effect = "交換効果：ほぼなし";
    }

    let warning = "";

if (avgGain < 5) {
  warning =
    "このゲーム設定では性能向上が小さいため、交換効果は限定的です。";
} else if (newResult.bottleneck === "GPU側") {
  warning =
    "CPU交換後もGPU側が性能上限になりやすい構成です。";
}

    return {
      type: "CPU",
      psuCheck: checkPsu(psuW, gpu, true),
      id: candidate.id,
      name: candidate.name,

      avg: newResult.avg,
      low: newResult.low,

      avgGain,
      lowGain,

      fpsGain,

      priceYen,
      priceInfo,
      updatedAt:
        priceInfo?.updatedAt ?? null,

      yenPerFps,

      bottleneck:
        newResult.bottleneck,

      effect,
      warning,
    };
  })
  .filter(
    (item) =>
      item.avgGain > 0
  )
  .sort(
    (a, b) =>
      b.avgGain - a.avgGain
  )
  .slice(0, 5);

  

const allGpuUpgrades = gpus
  .filter((candidate) => candidate.score > gpu.score)
  .map((candidate) => {
    const newResult = calculatePerformance(
      cpu,
      candidate,
      game,
      resolution,
      quality,
      ram
    );

    const avgGain = Math.round(
      ((newResult.avg - currentPerformance.avg) /
        currentPerformance.avg) *
        100
    );

    const lowGain = Math.round(
      ((newResult.low - currentPerformance.low) /
        currentPerformance.low) *
        100
    );

    const priceInfo = gpuPrices[candidate.id];

    const priceYen =
      getComparablePrice(priceInfo);

    const fpsGain =
      newResult.avg - currentPerformance.avg;

    const yenPerFps = calculateYenPerFps(priceYen, fpsGain);

    let effect = "交換効果：小";

    if (avgGain >= 30) {
      effect = "交換効果：大";
    } else if (avgGain >= 15) {
      effect = "交換効果：中";
    } else if (avgGain >= 5) {
      effect = "交換効果：小";
    } else {
      effect = "交換効果：ほぼなし";
    }

    let warning = "";

if (avgGain < 5) {
  warning =
    "このゲーム設定では性能向上が小さいため、交換効果は限定的です。";
} else if (newResult.bottleneck === "CPU側") {
  warning =
    "GPU交換後はCPU側がボトルネックになりやすくなります。";
}

    return {
      type: "GPU",
      psuCheck: checkPsu(psuW, candidate),
      id: candidate.id,
      name: candidate.name,

      avg: newResult.avg,
      low: newResult.low,

      avgGain,
      lowGain,

      fpsGain,

      priceYen,
      priceInfo,
      updatedAt:
        priceInfo?.updatedAt ?? null,

      yenPerFps,

      bottleneck:
        newResult.bottleneck,

      effect,
      warning,
    };
  })
  .filter(
    (item) =>
      item.avgGain > 0
  )
  .sort(
    (a, b) =>
      b.avgGain - a.avgGain
  )
;

  const gpuUpgrades = allGpuUpgrades.slice(0, 8);
  // 表示件数で絞る前の全GPU候補から価格効率を比較する。
  const bestValueGPU = pickBestValue(allGpuUpgrades);

const bestPerformanceGPU =
  [...gpuUpgrades]
    .sort(
      (a, b) =>
        b.avgGain - a.avgGain
    )[0] ?? null;

const bestCPUUpgrade =
  [...cpuUpgrades]
    .filter(
      (item) =>
        item.avgGain >= 5
    )
    .sort(
      (a, b) =>
        b.avgGain - a.avgGain
    )[0] ?? null;

    const bestGPUGain =
  bestPerformanceGPU?.avgGain ?? 0;

const bestCPUGain =
  bestCPUUpgrade?.avgGain ?? 0;

let upgradeVerdict = "";
let upgradeReason = "";
let verdictType:
  | "GPU"
  | "CPU"
  | "BALANCED"
  | "KEEP" = "KEEP";

if (
  bestGPUGain < 5 &&
  bestCPUGain < 5
) {
  verdictType = "KEEP";

  upgradeVerdict =
    "現状の構成で十分";

  upgradeReason =
    "CPU・GPUを交換しても、このゲーム設定では大きなFPS向上が見込めません。";
} else if (
  bestGPUGain >= bestCPUGain + 10
) {
  verdictType = "GPU";

  upgradeVerdict =
    "GPU交換を優先";

  upgradeReason =
    `GPU交換では最大約${bestGPUGain}%、CPU交換では最大約${bestCPUGain}%の平均FPS向上が見込まれます。`;
} else if (
  bestCPUGain >= bestGPUGain + 10
) {
  verdictType = "CPU";

  upgradeVerdict =
    "CPU交換を優先";

  upgradeReason =
    `CPU交換では最大約${bestCPUGain}%、GPU交換では最大約${bestGPUGain}%の平均FPS向上が見込まれます。`;
} else {
  verdictType = "BALANCED";

  upgradeVerdict =
    "CPU・GPU両方を検討";

  upgradeReason =
    `GPU交換は最大約${bestGPUGain}%、CPU交換は最大約${bestCPUGain}%の向上が見込まれます。`;
}

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold text-green-400">
            GAMING PC CHECKER
          </p>

          <h1 className="text-4xl font-bold">
            ゲーミングPC FPS診断
          </h1>

          <p className="mt-4 max-w-3xl text-zinc-400">
            CPU・GPU・ゲーム・解像度を選択すると、
            推定FPS、1% Low、ボトルネック傾向、
            アップグレード後の性能向上率を確認できます。
          </p>
        </div>

        <div className="grid gap-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:grid-cols-2">
          <CPUSelect
           value={cpuId}
           onChange={setCpuId}
          />

          <GPUSelect
            value={gpuId}
            onChange={setGpuId}
          />

          <GameSelect
            value={gameId}
            onChange={setGameId}
          />

          <SelectBox
            label="解像度"
            value={resolution}
            onChange={setResolution}
            options={[
              { id: "1080p", name: "1920 × 1080" },
              { id: "1440p", name: "2560 × 1440" },
              { id: "4K", name: "3840 × 2160" },
            ]}
          />

          <SelectBox
            label="画質"
            value={quality}
            onChange={setQuality}
            options={[
              { id: "Competitive", name: "競技設定" },
              { id: "Low", name: "Low" },
              { id: "Medium", name: "Medium" },
              { id: "High", name: "High" },
              { id: "Ultra", name: "Ultra" },
            ]}
          />

          <SelectBox
            label="RAM"
            value={ram}
            onChange={setRam}
            options={[
              { id: "8", name: "8GB" },
              { id: "16", name: "16GB" },
              { id: "32", name: "32GB" },
              { id: "64", name: "64GB" },
            ]}
          />

          <div className="md:col-span-2">
            <SelectBox
              label="電源容量（PSU）"
              value={psu}
              onChange={setPsu}
              options={[
                { id: "unknown", name: "不明・まだ確認していない" },
                ...[300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 1000, 1200, 1300, 1500, 1600, 2000].map((watts) => ({
                  id: String(watts), name: String(watts) + "W",
                })),
              ]}
            />
            <p className="mt-2 text-sm text-zinc-400">
              PCの仕様書や電源のラベルにある定格容量を選択してください。一覧にない場合は「不明」を選んでください。
            </p>
          </div>

          <button
            onClick={calculate}
            className="md:col-span-2 rounded-xl bg-green-500 px-6 py-4 text-lg font-bold text-black hover:bg-green-400"
          >
            FPSを診断する
          </button>
        </div>

        {result && (
          <>
            <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h2 className="mb-6 text-2xl font-bold">
                現在の構成
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <ResultCard
                  title="推定平均FPS"
                  value={`${result.avg} FPS`}
                />

                <ResultCard
                  title="推定1% Low"
                  value={`${result.low} FPS`}
                />

                <ResultCard
                  title="推定範囲"
                  value={`${result.min}〜${result.max}`}
                />

                <ResultCard
                  title="ボトルネック傾向"
                  value={result.bottleneck}
                />
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <ResultCard
                  title="CPU側 推定上限"
                  value={`${result.cpuLimit} FPS`}
                />

                <ResultCard
                  title="GPU側 推定上限"
                  value={`${result.gpuLimit} FPS`}
                />
              </div>
            </section>
            <section className="mt-6" aria-label="現在の構成の電源チェック">
              <h2 className="mb-3 text-xl font-bold">現在の構成の電源チェック</h2>
              <p className="mb-3 text-sm text-zinc-400">選択中GPU：{gpu.name}</p>
              <PsuStatus check={currentPsu} />
              <p className="mt-3 text-sm text-zinc-400">
                GPUメーカーの標準構成向け推奨容量との比較です。CPU別の消費電力・補助電源端子・電源の劣化は判定に含みません。
                実際のCPU構成とグラフィックボード製品の指定条件も確認してください。
              </p>
            </section>
            <section className="mt-6">
  {!vramShortage ? (
    <div className="rounded-xl border border-green-900 bg-green-950/20 p-5">
      <p className="text-sm font-bold text-green-400">
        VRAM
      </p>

      <p className="mt-1 text-lg font-bold">
        VRAM容量は十分な目安です
      </p>

      <p className="mt-2 text-sm text-zinc-400">
        選択中GPU：{gpu.vram}GB
        {" / "}
        推定必要量：約{requiredVram}GB
      </p>
    </div>
  ) : (
    <div className="rounded-xl border border-yellow-800 bg-yellow-950/30 p-5">
      <p className="text-sm font-bold text-yellow-300">
        VRAM注意
      </p>

      <p className="mt-1 text-lg font-bold text-yellow-100">
        VRAM容量が不足する可能性があります
      </p>

      <p className="mt-3 text-sm text-yellow-100">
        選択中GPU：{gpu.vram}GB
      </p>

      <p className="mt-1 text-sm text-yellow-100">
        推定必要量：約{requiredVram}GB
      </p>

      <p className="mt-3 text-sm text-zinc-400">
        約{vramDifference}GB不足する可能性があります。
        テクスチャ品質の低下、カクつき、
        1% Lowの悪化が起こる場合があります。
      </p>
    </div>
  )}
</section>

            <section className="mt-8 rounded-2xl border border-green-900 bg-green-950/20 p-6">
            <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
  <p className="text-sm font-bold text-green-400">
    UPGRADE VERDICT
  </p>

  <h2 className="mt-2 text-3xl font-bold">
    {upgradeVerdict}
  </h2>

  <p className="mt-3 max-w-3xl text-zinc-400">
    {upgradeReason}
  </p>

  <div className="mt-6 grid gap-4 sm:grid-cols-2">
    <div className="rounded-xl bg-zinc-950 p-5">
      <p className="text-sm text-zinc-500">
        GPU交換時 最大
      </p>

      <p className="mt-1 text-2xl font-bold">
        +{bestGPUGain}%
      </p>
    </div>

    <div className="rounded-xl bg-zinc-950 p-5">
      <p className="text-sm text-zinc-500">
        CPU交換時 最大
      </p>

      <p className="mt-1 text-2xl font-bold">
        +{bestCPUGain}%
      </p>
    </div>
  </div>

  <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
    <p className="text-sm text-zinc-400">
      現在のボトルネック傾向
    </p>

    <p className="mt-1 text-lg font-bold">
      {currentPerformance.bottleneck}
    </p>
  </div>
</section>
  <div className="mb-6">
    <p className="text-sm font-bold text-green-400">
      UPGRADE CHECK
    </p>

    <h2 className="mt-1 text-2xl font-bold">
      アップグレード診断
    </h2>

    <p className="mt-2 text-zinc-400">
      現在の構成とゲーム設定から、交換効果の高い候補を表示します。
    </p>
  </div>

  <div className="mb-5 rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-400">
    <p>参考価格は国内新品・税込の掲載モデル1商品の販売例です。最安値ではなく、自動更新でもありません。確認日と販売店リンクをご覧ください。</p>
    <p className="mt-2">1FPS向上あたり＝交換パーツの参考価格 ÷ 推定平均FPSの増加量。送料・ポイント・売却額・電源などの追加費用は含みません。新品価格を確認できない候補は価格比較から除外します。</p>
  </div>

  <div className="grid gap-4 lg:grid-cols-3">

    <RecommendationCard
      title="コスパ候補（価格確認済み）"
      item={bestValueGPU}
    />

    <RecommendationCard
      title="性能重視候補"
      item={bestPerformanceGPU}
    />

    <RecommendationCard
      title="CPU候補"
      item={bestCPUUpgrade}
    />

  </div>
</section>

            <section className="mt-8">
              <h2 className="text-2xl font-bold">
                GPU交換時の性能比較
              </h2>

              <p className="mt-2 text-zinc-400">
                現在のGPUから交換した場合の推定値です。
              </p>

              <div className="mt-5 grid gap-4">
                {gpuUpgrades.map((upgrade) => (
                  <UpgradeCard
                    key={upgrade.name}
                    {...upgrade}
                  />
                ))}
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-bold">
                CPU交換時の性能比較
              </h2>

              <p className="mt-2 text-zinc-400">
                同一プラットフォームのCPUのみ表示しています。
                現在のCPUは {cpu.platform} です。
              </p>

              <div className="mt-5 grid gap-4">
                {cpuUpgrades.length > 0 ? (
                  cpuUpgrades.map((upgrade) => (
                    <UpgradeCard
                      key={upgrade.name}
                      {...upgrade}
                    />
                  ))
                ) : (
                  <div className="rounded-xl bg-zinc-900 p-5 text-zinc-400">
                    同一プラットフォームで有効なCPUアップグレード候補がありません。
                  </div>
                )}
              </div>
            </section>

            <div className="mt-8 rounded-xl border border-yellow-900 bg-yellow-950/30 p-5 text-sm text-yellow-200">
              現在の数値は開発用の性能指数から計算した推定値です。
              公開版では実測ベンチマークデータを使って精度を改善します。
            </div>
          </>
        )}
      </div>
    </main>
  );
}
function formatPrice(price: number | null | undefined) {
  if (!price) {
    return "新品価格未確認";
  }

  return `¥${price.toLocaleString("ja-JP")}`;
}

function getCPUVendor(cpu: CPU) {
  if (cpu.name.startsWith("Ryzen")) {
    return "AMD";
  }

  return "Intel";
}

function getCPUGeneration(cpu: CPU) {
  // AMD Ryzen
  if (cpu.name.startsWith("Ryzen")) {
    const match = cpu.name.match(/Ryzen \d (\d)/);

    if (match) {
      return `Ryzen ${match[1]}000`;
    }

    return "Ryzen その他";
  }

  // Intel Core Ultra
  if (cpu.name.startsWith("Core Ultra")) {
    return "Core Ultra";
  }

  // Intel Core i3 / i5 / i7 / i9
  const match = cpu.name.match(/Core i\d-(\d+)/);

  if (!match) {
    return "Intel その他";
  }

  const model = match[1];

  if (model.startsWith("14")) return "第14世代";
  if (model.startsWith("13")) return "第13世代";
  if (model.startsWith("12")) return "第12世代";
  if (model.startsWith("11")) return "第11世代";
  if (model.startsWith("10")) return "第10世代";

  if (model.startsWith("9")) return "第9世代";
  if (model.startsWith("8")) return "第8世代";
  if (model.startsWith("7")) return "第7世代";
  if (model.startsWith("6")) return "第6世代";
  if (model.startsWith("4")) return "第4世代";

  return "Intel その他";
}

function CPUSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const selectedCPU =
    cpus.find((cpu) => cpu.id === value) ?? cpus[0];

  const [vendor, setVendor] = useState(
    getCPUVendor(selectedCPU)
  );

  const [generation, setGeneration] = useState(
    getCPUGeneration(selectedCPU)
  );

  const vendors = Array.from(
    new Set(cpus.map((cpu) => getCPUVendor(cpu)))
  );

  const generations = Array.from(
    new Set(
      cpus
        .filter(
          (cpu) => getCPUVendor(cpu) === vendor
        )
        .map((cpu) => getCPUGeneration(cpu))
    )
  );

  const filteredCPUs = cpus.filter(
    (cpu) =>
      getCPUVendor(cpu) === vendor &&
      getCPUGeneration(cpu) === generation
  );

  function changeVendor(newVendor: string) {
    setVendor(newVendor);

    const firstCPU = cpus.find(
      (cpu) => getCPUVendor(cpu) === newVendor
    );

    if (!firstCPU) return;

    const firstGeneration =
      getCPUGeneration(firstCPU);

    setGeneration(firstGeneration);
    onChange(firstCPU.id);
  }

  function changeGeneration(
    newGeneration: string
  ) {
    setGeneration(newGeneration);

    const firstCPU = cpus.find(
      (cpu) =>
        getCPUVendor(cpu) === vendor &&
        getCPUGeneration(cpu) === newGeneration
    );

    if (firstCPU) {
      onChange(firstCPU.id);
    }
  }

  return (
    <div>
      <span className="mb-2 block text-sm font-semibold text-zinc-300">
        CPU
      </span>

      <div className="grid gap-3 sm:grid-cols-3">

        <label>
          <span className="mb-2 block text-sm font-semibold text-zinc-400">
            メーカー
          </span>

          <select
            value={vendor}
            onChange={(event) =>
              changeVendor(event.target.value)
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
          >
            {vendors.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="mb-2 block text-sm font-semibold text-zinc-400">
            世代
          </span>

          <select
            value={generation}
            onChange={(event) =>
              changeGeneration(
                event.target.value
              )
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
          >
            {generations.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="mb-2 block text-sm font-semibold text-zinc-400">
            型番
          </span>

          <select
            value={value}
            onChange={(event) =>
              onChange(event.target.value)
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
          >
            {filteredCPUs.map((cpu) => (
              <option
                key={cpu.id}
                value={cpu.id}
              >
                {cpu.name}
              </option>
            ))}
          </select>
        </label>

      </div>
    </div>
  );
}

function GPUSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const selectedGPU =
    gpus.find((gpu) => gpu.id === value) ?? gpus[0];

  const [vendor, setVendor] = useState(selectedGPU.vendor);
  const [family, setFamily] = useState(selectedGPU.family);

  const vendors = Array.from(
    new Set(gpus.map((gpu) => gpu.vendor))
  );

  const families = Array.from(
    new Set(
      gpus
        .filter((gpu) => gpu.vendor === vendor)
        .map((gpu) => gpu.family)
    )
  );

  const filteredGPUs = gpus.filter(
    (gpu) =>
      gpu.vendor === vendor &&
      gpu.family === family
  );

  function changeVendor(newVendor: GPU["vendor"]) {
    setVendor(newVendor);

    const firstFamily = gpus.find(
      (gpu) => gpu.vendor === newVendor
    )?.family;

    if (!firstFamily) return;

    setFamily(firstFamily);

    const firstGPU = gpus.find(
      (gpu) =>
        gpu.vendor === newVendor &&
        gpu.family === firstFamily
    );

    if (firstGPU) {
      onChange(firstGPU.id);
    }
  }

  function changeFamily(newFamily: string) {
    setFamily(newFamily);

    const firstGPU = gpus.find(
      (gpu) =>
        gpu.vendor === vendor &&
        gpu.family === newFamily
    );

    if (firstGPU) {
      onChange(firstGPU.id);
    }
  }

  return (
    <div>
      <span className="mb-2 block text-sm font-semibold text-zinc-300">
        GPU
      </span>

      <div className="grid gap-3 sm:grid-cols-3">
  <label>
    <span className="mb-2 block text-sm font-semibold text-zinc-400">
      メーカー
    </span>

    <select
      value={vendor}
      onChange={(event) =>
        changeVendor(event.target.value as GPU["vendor"])
      }
      className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
    >
      {vendors.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  </label>

  <label>
    <span className="mb-2 block text-sm font-semibold text-zinc-400">
      シリーズ
    </span>

    <select
      value={family}
      onChange={(event) =>
        changeFamily(event.target.value)
      }
      className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
    >
      {families.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  </label>

  <label>
    <span className="mb-2 block text-sm font-semibold text-zinc-400">
      型番
    </span>

    <select
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
    >
      {filteredGPUs.map((gpu) => (
        <option key={gpu.id} value={gpu.id}>
          {gpu.name}
        </option>
      ))}
    </select>
  </label>
</div>
    </div>
  );
}
function GameSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [search, setSearch] = useState("");

  const filteredGames = games.filter((game) => {
    const keyword = search.toLowerCase();

    return (
      game.name.toLowerCase().includes(keyword) ||
      game.category.toLowerCase().includes(keyword)
    );
  });

  const groupedGames = filteredGames.reduce<Record<string, Game[]>>(
    (groups, game) => {
      if (!groups[game.category]) {
        groups[game.category] = [];
      }

      groups[game.category].push(game);

      return groups;
    },
    {}
  );

  return (
    <div>
      <span className="mb-2 block text-sm font-semibold text-zinc-300">
        ゲーム
      </span>

      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="ゲーム名を検索..."
        className="mb-3 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-green-500"
      />

      <select
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setSearch("");
        }}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-green-500"
      >
        {Object.keys(groupedGames).length > 0 ? (
          Object.entries(groupedGames).map(
            ([category, categoryGames]) => (
              <optgroup
                key={category}
                label={category}
                className="bg-zinc-900 font-bold text-green-400"
              >
                {categoryGames.map((game) => (
                  <option
                    key={game.id}
                    value={game.id}
                    className="bg-zinc-950 font-normal text-white"
                  >
                    {game.name}
                  </option>
                ))}
              </optgroup>
            )
          )
        ) : (
          <option disabled>
            ゲームが見つかりません
          </option>
        )}
      </select>

      {search && (
        <p className="mt-2 text-xs text-zinc-500">
          {filteredGames.length}件のゲームが見つかりました
        </p>
      )}
    </div>
  );
}

function SelectBox({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { id: string; name: string }[];
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-semibold text-zinc-300">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function ResultCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-zinc-950 p-5">
      <p className="text-sm text-zinc-400">{title}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

function RecommendationCard({
  title,
  item,
}: {
  title: string;
  item:
    | {
        name: string;
        avg: number;
        low: number;
        avgGain: number;
        lowGain: number;
        priceYen: number | null;
        priceInfo: PriceInfo | undefined;
        yenPerFps: number | null;
        bottleneck: string;
        psuCheck: PsuCheck;
      }
    | null;
}) {
  if (!item) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm font-bold text-zinc-400">
          {title}
        </p>

        <p className="mt-4 text-zinc-500">
          条件に合う候補がありません。
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-5">
      <p className="text-sm font-bold text-green-400">
        {title}
      </p>

      <h3 className="mt-2 text-xl font-bold">
        {item.name}
      </h3>

      <div className="mt-5 space-y-3">

        <div className="flex justify-between">
          <span className="text-zinc-400">
            平均FPS
          </span>

          <span className="font-bold">
            {item.avg} FPS
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">
            FPS向上
          </span>

          <span className="font-bold text-green-400">
            +{item.avgGain}%
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">
            1% Low向上
          </span>

          <span className="font-bold text-green-400">
            +{item.lowGain}%
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">
            参考価格（税込）
          </span>

          <span className="font-bold">
            {formatPrice(item.priceYen)}
          </span>
        </div>

        <PriceDetails info={item.priceInfo} />

        {item.yenPerFps !== null && (
          <div className="flex justify-between">
            <span className="text-zinc-400">
              1FPS向上あたり
            </span>

            <span className="font-bold">
              ¥
              {item.yenPerFps.toLocaleString(
                "ja-JP"
              )}
            </span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-zinc-400">
            交換後
          </span>

          <span className="font-bold">
            {item.bottleneck}
          </span>
        </div>

        <PsuStatus check={item.psuCheck} />

      </div>
    </div>
  );
}

function UpgradeCard({
  type,
  name,
  avg,
  low,
  avgGain,
  lowGain,
  fpsGain,
  priceYen,
  priceInfo,
  yenPerFps,
  bottleneck,
  effect,
  warning,
  psuCheck,
}: {
  type: string;
  name: string;
  avg: number;
  low: number;
  avgGain: number;
  lowGain: number;
  fpsGain: number;
  priceYen: number | null;
  priceInfo: PriceInfo | undefined;
  updatedAt: string | null;
  yenPerFps: number | null;
  bottleneck: string;
  effect: string;
  warning: string;
  psuCheck: PsuCheck;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex flex-col gap-6">

        <div>
          <p className="text-xs font-bold text-green-400">
            {type} UPGRADE
          </p>

          <h3 className="mt-1 text-xl font-bold">
            {name}
          </h3>

          <p className="mt-2 text-sm text-zinc-400">
            {effect}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl bg-zinc-950 p-4">
            <p className="text-xs text-zinc-500">
              平均FPS
            </p>

            <p className="mt-1 text-xl font-bold">
              {avg} FPS
            </p>

            <p className="mt-1 text-sm font-bold text-green-400">
              +{avgGain}%
            </p>
          </div>

          <div className="rounded-xl bg-zinc-950 p-4">
            <p className="text-xs text-zinc-500">
              1% Low
            </p>

            <p className="mt-1 text-xl font-bold">
              {low} FPS
            </p>

            <p className="mt-1 text-sm font-bold text-green-400">
              +{lowGain}%
            </p>
          </div>

          <div className="rounded-xl bg-zinc-950 p-4">
            <p className="text-xs text-zinc-500">
              参考価格（税込）
            </p>

            <p className="mt-1 text-xl font-bold">
              {formatPrice(priceYen)}
            </p>

            <PriceDetails info={priceInfo} />
          </div>

          <div className="rounded-xl bg-zinc-950 p-4">
            <p className="text-xs text-zinc-500">
              1FPS向上あたり
            </p>

            <p className="mt-1 text-xl font-bold">
              {yenPerFps !== null
                ? `¥${yenPerFps.toLocaleString(
                    "ja-JP"
                  )}`
                : "計算不可"}
            </p>
          </div>

        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
          <div className="grid gap-3 md:grid-cols-3">

            <div>
              <p className="text-xs text-zinc-500">
                FPS増加
              </p>

              <p className="font-bold text-green-400">
                +{fpsGain} FPS
              </p>
            </div>

            <div>
              <p className="text-xs text-zinc-500">
                交換後
              </p>

              <p className="font-bold">
                {bottleneck}
              </p>
            </div>

            <div>
              <p className="text-xs text-zinc-500">
                診断
              </p>

              <p className="font-bold">
                {effect}
              </p>
            </div>

          </div>
        </div>

        <PsuStatus check={psuCheck} />

        {warning && (
  <div className="rounded-xl border border-yellow-800 bg-yellow-950/30 p-4">
    <p className="text-sm font-bold text-yellow-300">
      注意
    </p>

    <p className="mt-1 text-sm text-yellow-100">
      {warning}
    </p>
  </div>
)}

      </div>
    </div>
  );
}

function PsuStatus({ check }: { check: PsuCheck }) {
  const styles = {
    sufficient: "border-green-900 bg-green-950/20 text-green-200",
    review: "border-yellow-800 bg-yellow-950/30 text-yellow-200",
    replace: "border-red-900 bg-red-950/30 text-red-200",
  };
  return (
    <div className={"rounded-xl border p-4 " + styles[check.status]}>
      <p className="text-xs font-semibold">電源容量（GPU推奨値基準）</p>
      <p className="mt-1 font-bold">{check.label}</p>
      <p className="mt-2 text-sm">
        使用電源：{check.psuW === null ? "不明" : check.psuW + "W"}
        {" / "}推奨：{check.recommendedPsuW === null ? "未確認" : check.recommendedPsuW + "W以上"}
      </p>
      <p className="mt-2 text-sm">{check.reason}</p>
      {check.sourceUrl && (
        <a className="mt-2 inline-block text-sm underline" href={check.sourceUrl} target="_blank" rel="noreferrer">
          メーカーの推奨値を確認
        </a>
      )}
    </div>
  );
}

function PriceDetails({ info }: { info: PriceInfo | undefined }) {
  if (!info) return <p className="mt-2 text-xs text-zinc-400">新品の参考価格は未調査です。</p>;
  return (
    <div className="mt-2 space-y-2 text-xs text-zinc-400">
      {info.updatedAt && <p>掲載確認日：{info.updatedAt}</p>}
      <p>{info.note}</p>
      <details>
        <summary className="cursor-pointer text-zinc-300">価格の確認元・対象モデル</summary>
        <p className="mt-2 break-words">{info.productName}</p>
        {info.sourceUrl && (
          <a className="mt-2 block underline" href={info.sourceUrl} target="_blank" rel="noreferrer">
            {info.sourceName}の掲載確認元
          </a>
        )}
        {info.productUrl && info.productUrl !== info.sourceUrl && (
          <a className="mt-2 block underline" href={info.productUrl} target="_blank" rel="noreferrer">
            商品ページで現在の価格・在庫を確認
          </a>
        )}
      </details>
    </div>
  );
}
