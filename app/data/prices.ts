export type PriceInfo = {
  priceYen: number | null;
  updatedAt: string | null;
  availability: "listed" | "unavailable" | "unverified";
  sourceName: string | null;
  sourceUrl: string | null;
  productUrl: string | null;
  productName: string | null;
  note: string;
};

// 国内新品・税込の掲載価格。送料・ポイント・クーポンは含めない。
// 自動取得ではなく、下記確認日時点の販売例。最安値・現在の在庫を保証しない。
const checkedAt = "2026-09-20";
const dosparaGpu = "https://www.dospara.co.jp/BR31";
const dosparaAmd = "https://www.dospara.co.jp/BR10";
const dosparaIntel = "https://www.dospara.co.jp/BR11?includeNotInventory=false&srule=01";

function listed(priceYen: number, productName: string, sourceUrl: string, productUrl: string): PriceInfo {
  return { priceYen, updatedAt: checkedAt, availability: "listed", sourceName: "ドスパラ", sourceUrl, productUrl, productName, note: "確認時は出荷可能の表示。掲載モデル1商品の参考価格です。" };
}

function unavailable(productName: string, sourceUrl: string, note: string, sourceName = "ツクモ"): PriceInfo {
  return { priceYen: null, updatedAt: checkedAt, availability: "unavailable", sourceName, sourceUrl, productUrl: sourceUrl, productName, note };
}

export const gpuPrices: Partial<Record<string, PriceInfo>> = {
  rtx3060: listed(55800, "GIGABYTE GV-N3060WF2OC-12GD rev.2.0 / 12GB", dosparaGpu, "https://www.dospara.co.jp/SBR1487/IC494310.html"),
  rtx4060: unavailable("玄人志向 GG-RTX4060-E8GB/SF / 8GB", "https://shop.tsukumo.co.jp/goods/4988755066600/", "調査先は在庫なし。購入可能な新品価格は未確認です。"),
  rtx4060ti: { priceYen: null, updatedAt: checkedAt, availability: "unverified", sourceName: "ツクモ", sourceUrl: "https://shop.tsukumo.co.jp/goods/0824142325667/", productUrl: "https://shop.tsukumo.co.jp/goods/0824142325667/", productName: "MSI RTX 4060 Ti VENTUS 2X BLACK 8G OC", note: "8GB版の新品在庫と価格を確認できていません。16GB版の価格は流用しません。" },
  rtx4070: unavailable("MSI RTX 4070 GAMING SLIM 12G", "https://shop.tsukumo.co.jp/goods/0824142329436/", "調査先は完売。購入可能な新品価格は未確認です。"),
  rtx4070super: unavailable("MSI RTX 4070 SUPER 12G VENTUS 2X OC", "https://shop.tsukumo.co.jp/goods/0824142346785/", "調査先は在庫なし。購入可能な新品価格は未確認です。"),
  rtx5070: listed(138000, "Palit NE75070U19K9-GB2050W / RTX 5070 White OC 12GB", dosparaGpu, "https://www.dospara.co.jp/SBR1892/IC548695.html"),
  rtx5070ti: listed(207700, "PNY VCG5070T16TFXXPB1-O / RTX 5070 Ti 16GB", dosparaGpu, "https://www.dospara.co.jp/SBR1892/IC634895.html"),
  rtx5080: listed(267700, "Palit NE75080019T2-GB2031A / RTX 5080 GamingPro 16GB", dosparaGpu, "https://www.dospara.co.jp/SBR1892/IC518916.html"),
  rx7600: listed(39800, "GIGABYTE GV-R76GAMING OC-8GD / RX 7600 8GB", dosparaGpu, "https://www.dospara.co.jp/SBR1770/IC490235.html"),
  rx7700xt: unavailable("GIGABYTE RX 7700 XT GAMING OC 12G", "https://shop.tsukumo.co.jp/goods/4988755067010/", "調査先は在庫なし。購入可能な新品価格は未確認です。"),
  rx7800xt: unavailable("ASUS DUAL-RX7800XT-O16G", "https://shop.tsukumo.co.jp/goods/0197105436169/", "調査先は在庫なし。購入可能な新品価格は未確認です。"),
  rx7900xt: unavailable("PowerColor RX7900XT 20G-L/OC", "https://shop.tsukumo.co.jp/goods/4713436174653", "調査先は在庫なし。購入可能な新品価格は未確認です。"),
  arcb570: unavailable("ASRock Arc B570 Challenger 10GB OC", "https://shop.tsukumo.co.jp/goods/4711581490048/", "調査先は在庫なし。購入可能な新品価格は未確認です。"),
  arcb580: listed(56800, "ASRock Arc B580 Challenger 12GB OC / B580 CL 12GO", "https://www.dospara.co.jp/BR31?prefn1=txChipFilter&prefv1=Intel+Arc+B580", "https://www.dospara.co.jp/SBR1750/IC518575.html"),
};

export const cpuPrices: Partial<Record<string, PriceInfo>> = {
  "r5-5600": listed(22980, "AMD Ryzen 5 5600 BOX", dosparaAmd, "https://www.dospara.co.jp/SBR1883/IC479653.html"),
  "r7-5700x": listed(34800, "AMD Ryzen 7 5700X BOX", dosparaAmd, "https://www.dospara.co.jp/SBR1882/IC479652.html"),
  "r7-5700x3d": unavailable("AMD Ryzen 7 5700X3D BOX", "https://shop.tsukumo.co.jp/goods/2030010033529/", "調査先は完売。購入可能な新品価格は未確認です。"),
  "r7-5800x3d": unavailable("AMD Ryzen 7 5800X3D / 100-100000651WOF", "https://shop.tsukumo.co.jp/goods/0730143313797/", "調査先は在庫なし。購入可能な新品価格は未確認です。"),
  "r5-7600": unavailable("AMD Ryzen 5 7600 BOX", "https://shop.tsukumo.co.jp/goods/2030010015310/", "調査先は完売。購入可能な新品価格は未確認です。"),
  "r7-7800x3d": listed(54800, "AMD Ryzen 7 7800X3D BOX", dosparaAmd, "https://www.dospara.co.jp/SBR1882/IC488570.html"),
  "r7-9700x": listed(47320, "AMD Ryzen 7 9700X BOX", dosparaAmd, "https://www.dospara.co.jp/SBR1882/IC509913.html"),
  "r7-9800x3d": listed(72800, "AMD Ryzen 7 9800X3D BOX", dosparaAmd, "https://www.dospara.co.jp/SBR1882/IC516296.html"),
  "i5-12400f": listed(25980, "Intel Core i5-12400F BOX", dosparaIntel, "https://www.dospara.co.jp/SBR1481/IC477503.html"),
  "i5-13600k": unavailable("Intel Core i5-13600K BOX", "https://shop.tsukumo.co.jp/goods/0735858526715/", "調査先は販売終了。購入可能な新品価格は未確認です。"),
  "i5-14600k": unavailable("Intel Core i5-14600K BOX", "https://www.ark-pc.co.jp/i/10150657/", "調査先は在庫なし。購入可能な新品価格は未確認です。", "パソコンSHOPアーク"),
  "i7-14700k": listed(69800, "Intel Core i7-14700K BOX", dosparaIntel, "https://www.dospara.co.jp/SBR1328/IC494973.html"),
};

export function getComparablePrice(info: PriceInfo | undefined): number | null {
  const price = info?.priceYen;
  if (info?.availability !== "listed" || !info.updatedAt || !info.sourceUrl ||
      typeof price !== "number" || !Number.isFinite(price) || price <= 0) return null;
  return price;
}

export function calculateYenPerFps(price: number | null, fpsGain: number): number | null {
  if (price === null || !Number.isFinite(price) || price <= 0 || !Number.isFinite(fpsGain) || fpsGain <= 0) return null;
  return Math.round(price / fpsGain);
}

export function pickBestValue<T extends { yenPerFps: number | null; avgGain: number }>(items: readonly T[]): T | null {
  return [...items]
    .filter(item => item.yenPerFps !== null && item.avgGain >= 10)
    .sort((a, b) => (a.yenPerFps! - b.yenPerFps!) || b.avgGain - a.avgGain)[0] ?? null;
}
