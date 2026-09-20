"use client";

import { useState } from "react";
import AdSlot from "./components/AdSlot";
import styles from "./page.module.css";
import { checkPsu, type PsuCheck } from "./data/psu";
import { gpus, type GPU } from "./data/gpus";
import { cpus, type CPU } from "./data/cpus";
import { games, type Game } from "./data/games";
import { rakutenAffiliateLinks } from "./data/affiliate";
import {
  gpuPrices,
  cpuPrices,
  getComparablePriceInfo,
  calculateYenPerFps,
  pickBestValue,
  type PriceInfo,
  type UsedPriceInfo,
  type MercariMarketInfo,
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
  "1440p": 0.67,
  "4K": 0.24,
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
  const [includeUsed, setIncludeUsed] = useState(false);
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

    const comparablePrice =
      getComparablePriceInfo(priceInfo, includeUsed);
    const priceYen = comparablePrice?.priceYen ?? null;

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
      priceInfo: comparablePrice?.info,
      priceType: comparablePrice?.type ?? null,
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

    const comparablePrice =
      getComparablePriceInfo(priceInfo, includeUsed);
    const priceYen = comparablePrice?.priceYen ?? null;

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
      priceInfo: comparablePrice?.info,
      priceType: comparablePrice?.type ?? null,
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
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <a href="#" className={styles.brand} aria-label="PC FPS診断 トップ">
            <span className={styles.brandMark} aria-hidden="true">F<span>↗</span></span>
            <span>FPS<span className={styles.brandLight}> CHECKER</span></span>
          </a>
          <a href="#configure" className={styles.headerLink}>PCの性能をチェック <span aria-hidden="true">↗</span></a>
        </header>

        <section className={styles.hero} aria-labelledby="hero-title">
          <div>
            <p className={styles.eyebrow}><span className={styles.statusDot} /> GAMING PC PERFORMANCE</p>
            <h1 id="hero-title" className={styles.heroTitle}>そのPCの、<br /><span>実力を知ろう。</span></h1>
            <p className={styles.heroSubtitle}>ゲーミングPC FPS診断</p>
            <p className={styles.heroDescription}>いつものゲームは、どこまで快適になる？<br />推定FPSからボトルネック、次のアップグレードまで。<br className={styles.desktopBreak} />あなたの構成に合った選択を、数字で見つけよう。</p>
            <a href="#configure" className={styles.heroCta}>自分のPCを診断する <span aria-hidden="true">↗</span></a>
            <div className={styles.heroTags}><span>無料・登録不要</span><span>CPU / GPU 対応</span><span>参考価格で比較</span></div>
          </div>
          <div className={styles.rigPreview}>
            <div className={styles.previewHeading}><span>YOUR BUILD</span><span className={styles.previewBadge}>選択中の構成</span></div>
            <div className={styles.chipArt} aria-hidden="true"><div className={styles.chip}><span>FPS</span><small>PERFORMANCE CHECK</small></div></div>
            <dl className={styles.buildSpecs}>
              <div><dt>CPU</dt><dd>{cpu.name}</dd></div>
              <div><dt>GPU</dt><dd>{gpu.name}</dd></div>
              <div><dt>GAME</dt><dd>{game.name}</dd></div>
            </dl>
            <div className={styles.previewBottom}><span>{resolution} <span aria-hidden="true">/</span> {quality}</span><span>{ram} GB RAM</span></div>
          </div>
        </section>

        <AdSlot placement="home-middle" />
        <section id="configure" className={styles.configSection} aria-labelledby="config-title">
          <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>01 / CONFIGURATION</p><h2 id="config-title">あなたのPC構成</h2></div><p>パーツとプレイ環境を選択</p></div>
        <div className={styles.configGrid}>
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

          <div className={styles.panel}>
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
          </div>

          <div className={styles.panel}>
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
          </div>

          <div className={styles.panel}>
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
          </div>

          <div className={`${styles.panel} ${styles.panelWide}`}>
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
            <p className={styles.hint}>
              PCの仕様書や電源のラベルにある定格容量を選択してください。一覧にない場合は「不明」を選んでください。
            </p>
          </div>

          <label className={styles.usedToggle}>
            <input
              type="checkbox"
              checked={includeUsed}
              onChange={(event) => setIncludeUsed(event.target.checked)}
            />
            <span>
              <span className={styles.usedTitle}>中古も含める</span>
              <span className={styles.usedCopy}>
                新品価格が確認できない候補だけ、中古参考価格をコスパ計算に使用します。中古価格が未登録の候補は計算対象になりません。
              </span>
            </span>
          </label>

          <button
            onClick={calculate}
            className={styles.calculateButton}
          >
            FPSを診断する <span aria-hidden="true">↗</span>
          </button>
          <p className={styles.estimateNote}>診断結果はベンチマーク傾向をもとにした推定値です。</p>
        </div>
        </section>

        {result && (
          <>
            <section className={styles.resultSection} aria-labelledby="result-title">
              <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>02 / PERFORMANCE REPORT</p><h2 id="result-title">現在の構成の診断結果</h2></div><span className={styles.previewBadge}>推定値</span></div>
              <p className={styles.resultContext}>{game.name} · {resolution} · {quality} / {cpu.name} + {gpu.name}</p>

              <div className={styles.resultGrid}>
                <ResultCard
                  title="推定平均FPS"
                  value={`${result.avg} FPS`}
                  variant="primary"
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
                  variant="bottleneck"
                  tone={result.bottleneck === "バランス型" ? "ok" : "warn"}
                />
              </div>

              <div className={styles.resultGridSplit}>
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
            <AdSlot placement="result-bottom" />
            <section className={styles.statusBlock} aria-label="現在の構成の電源チェック">
              <h2>現在の構成の電源チェック</h2>
              <p className={styles.statusCopy}>選択中GPU：{gpu.name}</p>
              <PsuStatus check={currentPsu} />
              <p className={styles.statusCopy}>
                GPUメーカーの標準構成向け推奨容量との比較です。CPU別の消費電力・補助電源端子・電源の劣化は判定に含みません。
                実際のCPU構成とグラフィックボード製品の指定条件も確認してください。
              </p>
            </section>
            <section className={styles.statusBlock}>
  {!vramShortage ? (
    <div className={`${styles.statusCard} ${styles.statusOk}`}>
      <p className={styles.statusKicker}>
        VRAM
      </p>

      <p className={styles.statusTitle}>
        VRAM容量は十分な目安です
      </p>

      <p className={styles.statusMeta}>
        選択中GPU：{gpu.vram}GB
        {" / "}
        推定必要量：約{requiredVram}GB
      </p>
    </div>
  ) : (
    <div className={`${styles.statusCard} ${styles.statusWarn}`}>
      <p className={styles.statusKicker}>
        VRAM注意
      </p>

      <p className={styles.statusTitle}>
        VRAM容量が不足する可能性があります
      </p>

      <p className={styles.statusMeta}>
        選択中GPU：{gpu.vram}GB
      </p>

      <p className={styles.statusMeta}>
        推定必要量：約{requiredVram}GB
      </p>

      <p className={styles.statusMeta}>
        約{vramDifference}GB不足する可能性があります。
        テクスチャ品質の低下、カクつき、
        1% Lowの悪化が起こる場合があります。
      </p>
    </div>
  )}
</section>

            <section className={styles.upgradeSection}>
            <section className={styles.verdict}>
  <p className={styles.verdictKicker}>
    UPGRADE VERDICT
  </p>

  <h2 className={styles.verdictTitle}>
    {upgradeVerdict}
  </h2>

  <p className={styles.verdictReason}>
    {upgradeReason}
  </p>

  <div className={styles.verdictStats}>
    <div className={styles.miniStat}>
      <p className={styles.miniStatLabel}>
        GPU交換時 最大
      </p>

      <p className={styles.miniStatValue}>
        +{bestGPUGain}%
      </p>
    </div>

    <div className={styles.miniStat}>
      <p className={styles.miniStatLabel}>
        CPU交換時 最大
      </p>

      <p className={styles.miniStatValue}>
        +{bestCPUGain}%
      </p>
    </div>
  </div>

  <div className={styles.bottleneckInline}>
    <p className={styles.miniStatLabel}>
      現在のボトルネック傾向
    </p>

    <p className={`${styles.bottleneckValue} ${currentPerformance.bottleneck === "バランス型" ? "" : styles.bottleneckWarn}`}>
      {currentPerformance.bottleneck}
    </p>
  </div>
</section>
  <div className={styles.sectionIntro}>
    <p className={styles.cardKicker}>
      UPGRADE CHECK
    </p>

    <h2>
      アップグレード診断
    </h2>

    <p>
      現在の構成とゲーム設定から、交換効果の高い候補を表示します。
    </p>
  </div>

  <div className={styles.priceNote}>
    <p>新品参考価格は国内新品・税込の掲載モデル1商品の販売例です。最安値ではなく、自動更新でもありません。確認日と販売店リンクをご覧ください。</p>
    <p>1FPS向上あたり＝交換パーツの参考価格 ÷ 推定平均FPSの増加量。送料・ポイント・売却額・電源などの追加費用は含みません。新品価格がある場合は新品を優先し、中古を含める設定では新品価格がない候補だけ中古参考価格を使用します。</p>
    <p>現在、中古価格を確認できた商品は登録していません。価格未確認の商品に架空の価格は設定していません。</p>
  </div>

  <div className={styles.recommendGrid}>

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

            <section className={styles.compareSection}>
              <h2>
                GPU交換時の性能比較
              </h2>

              <p>
                現在のGPUから交換した場合の推定値です。
              </p>

              <div className={styles.compareList}>
                {gpuUpgrades.map((upgrade) => (
                  <UpgradeCard
                    key={upgrade.name}
                    {...upgrade}
                  />
                ))}
              </div>
            </section>

            <section className={styles.compareSection}>
              <h2>
                CPU交換時の性能比較
              </h2>

              <p>
                同一プラットフォームのCPUのみ表示しています。
                現在のCPUは {cpu.platform} です。
              </p>

              <div className={styles.compareList}>
                {cpuUpgrades.length > 0 ? (
                  cpuUpgrades.map((upgrade) => (
                    <UpgradeCard
                      key={upgrade.name}
                      {...upgrade}
                    />
                  ))
                ) : (
                  <div className={styles.emptyState}>
                    同一プラットフォームで有効なCPUアップグレード候補がありません。
                  </div>
                )}
              </div>
            </section>

            <div className={styles.disclaimer}>
              表示FPSはベンチマーク傾向をもとにした目安です。
              実際のFPSはゲームバージョン、ドライバー、設定、冷却などにより変動します。
            </div>
          </>
        )}
      </div>
    </main>
  );
}
function formatPrice(price: number | null | undefined) {
  if (!price) {
    return "価格未確認";
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
    <div className={styles.panel}>
      <span className={styles.panelTitle}>
        CPU
      </span>

        <div className="grid gap-3 sm:grid-cols-2">

        <label>
          <span className={styles.fieldLabel}>
            メーカー
          </span>

          <select
            value={vendor}
            onChange={(event) =>
              changeVendor(event.target.value)
            }
            className={styles.control}
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
          <span className={styles.fieldLabel}>
            世代
          </span>

          <select
            value={generation}
            onChange={(event) =>
              changeGeneration(
                event.target.value
              )
            }
            className={styles.control}
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
          <span className={styles.fieldLabel}>
            型番
          </span>

          <select
            value={value}
            onChange={(event) =>
              onChange(event.target.value)
            }
            className={styles.control}
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
    <div className={styles.panel}>
      <span className={styles.panelTitle}>
        GPU
      </span>

      <div className="grid gap-3 sm:grid-cols-2">
  <label>
    <span className={styles.fieldLabel}>
      メーカー
    </span>

    <select
      value={vendor}
      onChange={(event) =>
        changeVendor(event.target.value as GPU["vendor"])
      }
      className={styles.control}
    >
      {vendors.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  </label>

  <label>
    <span className={styles.fieldLabel}>
      シリーズ
    </span>

    <select
      value={family}
      onChange={(event) =>
        changeFamily(event.target.value)
      }
      className={styles.control}
    >
      {families.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  </label>

  <label>
    <span className={styles.fieldLabel}>
      型番
    </span>

    <select
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      className={styles.control}
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

  const selectedGame = games.find((game) => game.id === value);
  const isSelectedGameVisible = filteredGames.some((game) => game.id === value);

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
    <div className={`${styles.panel} ${styles.panelWide}`}>
      <span className={styles.panelTitle}>
        ゲーム
      </span>

      <input
        type="text"
        aria-label="ゲーム名を検索"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="ゲーム名を検索..."
        className={styles.control}
      />

      <select
        aria-label="ゲーム"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setSearch("");
        }}
        className={`${styles.control} ${styles.stackedControl}`}
      >
        {selectedGame && !isSelectedGameVisible && (
          <option value={selectedGame.id}>
            {selectedGame.name}（選択中）
          </option>
        )}
        {Object.keys(groupedGames).length > 0 ? (
          Object.entries(groupedGames).map(
            ([category, categoryGames]) => (
              <optgroup
                key={category}
                label={category}
              >
                {categoryGames.map((game) => (
                  <option
                    key={game.id}
                    value={game.id}
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
        <p className={styles.searchHint}>
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
      <span className={styles.fieldLabel}>
        {label}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={styles.control}
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
  variant = "default",
  tone = "ok",
}: {
  title: string;
  value: string;
  variant?: "default" | "primary" | "bottleneck";
  tone?: "ok" | "warn";
}) {
  return (
    <div
      className={`${styles.resultCard} ${
        variant === "primary" ? styles.resultCardPrimary : ""
      }`}
    >
      <p className={styles.metricLabel}>{title}</p>
      {variant === "bottleneck" ? (
        <p className={`${styles.bottleneckValue} ${tone === "warn" ? styles.bottleneckWarn : ""}`}>
          {value}
        </p>
      ) : (
        <p className={styles.metricValue}>{value}</p>
      )}
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
          id: string;
        avg: number;
        low: number;
        avgGain: number;
        lowGain: number;
        priceYen: number | null;
        priceInfo: PriceInfo | UsedPriceInfo | undefined;
        priceType: "新品" | "中古" | null;
        yenPerFps: number | null;
        bottleneck: string;
        psuCheck: PsuCheck;
      }
    | null;
}) {
  if (!item) {
    return (
      <div className={styles.recommendationCard}>
        <p className={styles.cardKicker}>
          {title}
        </p>

        <p className={styles.statusMeta}>
          条件に合う候補がありません。
        </p>
      </div>
    );
  }

  return (
    <div className={styles.recommendationCard}>
      <p className={styles.cardKicker}>
        {title}
      </p>

      <h3>
        {item.name}
      </h3>

      <RakutenLinkButton rakutenUrl={rakutenAffiliateLinks[item.id]?.rakutenUrl} />

      <div className={styles.specList}>

        <div className={styles.specRow}>
          <span>
            平均FPS
          </span>

          <span>
            {item.avg} FPS
          </span>
        </div>

        <div className={styles.specRow}>
          <span>
            FPS向上
          </span>

          <span className={styles.gain}>
            +{item.avgGain}%
          </span>
        </div>

        <div className={styles.specRow}>
          <span>
            1% Low向上
          </span>

          <span className={styles.gain}>
            +{item.lowGain}%
          </span>
        </div>

        <div className={styles.specRow}>
          <span>
            {item.priceType === "中古"
              ? "中古参考価格"
              : item.priceType === "新品"
                ? "新品参考価格（税込）"
                : "価格未確認"}
          </span>

          <span className={styles.priceValue}>
            {formatPrice(item.priceYen)}
          </span>
        </div>

        <PriceDetails info={item.priceInfo} type={item.priceType} />

        {item.yenPerFps !== null && (
          <div className={styles.specRow}>
            <span>
              1FPS向上あたり
            </span>

            <span className={styles.priceValue}>
              ¥
              {item.yenPerFps.toLocaleString(
                "ja-JP"
              )}
            </span>
          </div>
        )}

        <div className={styles.specRow}>
          <span>
            交換後
          </span>

          <span>
            {item.bottleneck}
          </span>
        </div>

        <PsuStatus check={item.psuCheck} />

      </div>
    </div>
  );
}

function UpgradeCard({
  id,
  type,
  name,
  avg,
  low,
  avgGain,
  lowGain,
  fpsGain,
  priceYen,
  priceInfo,
  priceType,
  yenPerFps,
  bottleneck,
  effect,
  warning,
  psuCheck,
}: {
  id: string;
  type: string;
  name: string;
  avg: number;
  low: number;
  avgGain: number;
  lowGain: number;
  fpsGain: number;
  priceYen: number | null;
  priceInfo: PriceInfo | UsedPriceInfo | undefined;
  priceType: "新品" | "中古" | null;
  updatedAt: string | null;
  yenPerFps: number | null;
  bottleneck: string;
  effect: string;
  warning: string;
  psuCheck: PsuCheck;
}) {
  return (
    <div className={styles.upgradeCard}>
      <div className="flex flex-col gap-6">

        <div>
          <p className={styles.cardKicker}>
            {type} UPGRADE
          </p>

          <h3>
            {name}
          </h3>

          <p className={styles.statusMeta}>
            {effect}
          </p>

          <RakutenLinkButton rakutenUrl={rakutenAffiliateLinks[id]?.rakutenUrl} />
        </div>

        <div className={styles.upgradeGrid}>

          <div className={styles.miniStat}>
            <p className={styles.miniStatLabel}>
              平均FPS
            </p>

            <p className={styles.metricValue}>
              {avg} FPS
            </p>

            <p className={styles.gain}>
              +{avgGain}%
            </p>
          </div>

          <div className={styles.miniStat}>
            <p className={styles.miniStatLabel}>
              1% Low
            </p>

            <p className={styles.metricValue}>
              {low} FPS
            </p>

            <p className={styles.gain}>
              +{lowGain}%
            </p>
          </div>

          <div className={styles.miniStat}>
            <p className={styles.miniStatLabel}>
              {priceType === "中古"
                ? "中古参考価格"
                : priceType === "新品"
                  ? "新品参考価格（税込）"
                  : "価格未確認"}
            </p>

            <p className={`${styles.metricValue} ${styles.priceValue}`}>
              {formatPrice(priceYen)}
            </p>

            <PriceDetails info={priceInfo} type={priceType} />
          </div>

          <div className={styles.miniStat}>
            <p className={styles.miniStatLabel}>
              1FPS向上あたり
            </p>

            <p className={`${styles.metricValue} ${styles.priceValue}`}>
              {yenPerFps !== null
                ? `¥${yenPerFps.toLocaleString(
                    "ja-JP"
                  )}`
                : "計算不可"}
            </p>
          </div>

        </div>

        <div className={styles.bottleneckInline}>
          <div className={styles.upgradeGrid}>

            <div>
              <p className={styles.miniStatLabel}>
                FPS増加
              </p>

              <p className={styles.gain}>
                +{fpsGain} FPS
              </p>
            </div>

            <div>
              <p className={styles.miniStatLabel}>
                交換後
              </p>

              <p>
                {bottleneck}
              </p>
            </div>

            <div>
              <p className={styles.miniStatLabel}>
                診断
              </p>

              <p>
                {effect}
              </p>
            </div>

          </div>
        </div>

        <PsuStatus check={psuCheck} />

        {warning && (
  <div className={`${styles.statusCard} ${styles.statusWarn}`}>
    <p className={styles.statusKicker}>
      注意
    </p>

    <p className={styles.statusMeta}>
      {warning}
    </p>
  </div>
)}

      </div>
    </div>
  );
}

function RakutenLinkButton({ rakutenUrl }: { rakutenUrl: string | null | undefined }) {
  if (!rakutenUrl) return null;

  return (
    <a
      className={styles.affiliateLink}
      href={rakutenUrl}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
    >
      楽天市場で探す <span className={styles.affiliateMark}>広告・PR</span>
    </a>
  );
}

function PsuStatus({ check }: { check: PsuCheck }) {
  const tone = {
    sufficient: styles.statusOk,
    review: styles.statusWarn,
    replace: styles.statusBad,
  };
  return (
    <div className={`${styles.statusCard} ${tone[check.status]}`}>
      <p className={styles.statusKicker}>電源容量（GPU推奨値基準）</p>
      <p className={styles.statusTitle}>{check.label}</p>
      <p className={styles.statusMeta}>
        使用電源：{check.psuW === null ? "不明" : check.psuW + "W"}
        {" / "}推奨：{check.recommendedPsuW === null ? "未確認" : check.recommendedPsuW + "W以上"}
      </p>
      <p className={styles.statusMeta}>{check.reason}</p>
      {check.sourceUrl && (
        <a className={styles.statusLink} href={check.sourceUrl} target="_blank" rel="noreferrer">
          メーカーの推奨値を確認
        </a>
      )}
    </div>
  );
}

function PriceDetails({
  info,
  type,
}: {
  info: PriceInfo | UsedPriceInfo | undefined;
  type: "新品" | "中古" | null;
}) {
  if (!info) {
    return (
      <p className={styles.priceDetails}>
        {type === "中古"
          ? "中古参考価格は未確認です。"
          : type === "新品"
            ? "新品参考価格は未確認です。"
            : "価格未確認です。"}
      </p>
    );
  }

  const usedInfo = "condition" in info ? info : null;
  const mercariMarket = "mercariMarket" in info
    ? info.mercariMarket
    : null;

  return (
    <div className={styles.priceDetails}>
      <p>
        {type === "中古"
          ? "中古参考価格"
          : type === "新品"
            ? "新品参考価格（税込）"
            : "価格未確認"}
      </p>
      {info.updatedAt && <p>価格確認日：{info.updatedAt}</p>}
      {usedInfo?.condition && <p>状態：{usedInfo.condition}</p>}
      {usedInfo?.warranty && <p>保証：{usedInfo.warranty}</p>}
      <p>{info.note}</p>
      {mercariMarket?.medianPriceYen !== null && mercariMarket?.medianPriceYen !== undefined && (
        <MercariMarketDetails market={mercariMarket} />
      )}
      <details>
        <summary>価格の確認元・対象モデル</summary>
        <p>{info.productName}</p>
        {info.sourceUrl && (
          <a className={styles.statusLink} href={info.sourceUrl} target="_blank" rel="noreferrer">
            {info.sourceName}の掲載確認元
          </a>
        )}
        {info.productUrl && info.productUrl !== info.sourceUrl && (
          <a className={styles.statusLink} href={info.productUrl} target="_blank" rel="noreferrer">
            商品ページで現在の価格・在庫を確認
          </a>
        )}
        {"historical" in info && info.historical && info.historical.length > 0 && (
          <div>
            <p>過去の参考価格（現在のコスパ計算には不使用）</p>
            {info.historical.map((historical) => (
              <p key={`${historical.checkedAt}-${historical.priceYen}`}>
                ¥{historical.priceYen.toLocaleString("ja-JP")} / {historical.checkedAt}
              </p>
            ))}
          </div>
        )}
      </details>
    </div>
  );
}

function MercariMarketDetails({ market }: { market: MercariMarketInfo }) {
  if (market.medianPriceYen === null) return null;

  return (
    <div className={styles.priceDetails}>
      <p>メルカリ中古相場</p>
      <p className={styles.priceValue}>
        ¥{market.medianPriceYen.toLocaleString("ja-JP")}
      </p>
      {market.sampleCount !== null && <p>サンプル数：{market.sampleCount}件</p>}
      {market.updatedAt && <p>更新日：{market.updatedAt}</p>}
      {market.condition && <p>条件：{market.condition}</p>}
      {market.note && <p>{market.note}</p>}
    </div>
  );
}
