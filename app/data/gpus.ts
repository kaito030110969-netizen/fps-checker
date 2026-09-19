export type GPU = {
  id: string;
  name: string;
  vendor: "NVIDIA" | "AMD" | "Intel";
  family: string;
  score: number;
  vram: number;
  // PC全体の推奨電源容量。未確認はnull（GPU単体の消費電力ではない）。
  recommendedPsuW: number | null;
  psuSourceUrl: string | null;
};

// 推奨電源の確認日: 2026-09-20。メーカー標準構成での基準。製品別仕様を優先。
export const gpus: GPU[] = [  
  // NVIDIA GTX 600 SERIES
  
  { id: "gtx650", name: "GeForce GTX 650", vendor: "NVIDIA", family: "GTX 600", score: 12, vram: 1, recommendedPsuW: null, psuSourceUrl: null },
  { id: "gtx650ti", name: "GeForce GTX 650 Ti", vendor: "NVIDIA", family: "GTX 600", score: 16, vram: 1, recommendedPsuW: null, psuSourceUrl: null },
  { id: "gtx660", name: "GeForce GTX 660", vendor: "NVIDIA", family: "GTX 600", score: 22, vram: 2, recommendedPsuW: null, psuSourceUrl: null },
  { id: "gtx660ti", name: "GeForce GTX 660 Ti", vendor: "NVIDIA", family: "GTX 600", score: 26, vram: 2, recommendedPsuW: null, psuSourceUrl: null },
  { id: "gtx670", name: "GeForce GTX 670", vendor: "NVIDIA", family: "GTX 600", score: 29, vram: 2, recommendedPsuW: null, psuSourceUrl: null },
  { id: "gtx680", name: "GeForce GTX 680", vendor: "NVIDIA", family: "GTX 600", score: 32, vram: 2, recommendedPsuW: null, psuSourceUrl: null },

  // NVIDIA GTX 700 SERIES
  
  { id: "gtx750", name: "GeForce GTX 750", vendor: "NVIDIA", family: "GTX 700", score: 20, vram: 1, recommendedPsuW: null, psuSourceUrl: null },
  { id: "gtx750ti", name: "GeForce GTX 750 Ti", vendor: "NVIDIA", family: "GTX 700", score: 25, vram: 2, recommendedPsuW: null, psuSourceUrl: null },
  { id: "gtx760", name: "GeForce GTX 760", vendor: "NVIDIA", family: "GTX 700", score: 30, vram: 2, recommendedPsuW: null, psuSourceUrl: null },
  { id: "gtx770", name: "GeForce GTX 770", vendor: "NVIDIA", family: "GTX 700", score: 35, vram: 2, recommendedPsuW: null, psuSourceUrl: null },
  { id: "gtx780", name: "GeForce GTX 780", vendor: "NVIDIA", family: "GTX 700", score: 41, vram: 3, recommendedPsuW: null, psuSourceUrl: null },
  { id: "gtx780ti", name: "GeForce GTX 780 Ti", vendor: "NVIDIA", family: "GTX 700", score: 46, vram: 3, recommendedPsuW: null, psuSourceUrl: null },

  // NVIDIA GTX 900 SERIES
 
  { id: "gtx950", name: "GeForce GTX 950", vendor: "NVIDIA", family: "GTX 900", score: 30, vram: 2, recommendedPsuW: null, psuSourceUrl: null },
  { id: "gtx960", name: "GeForce GTX 960", vendor: "NVIDIA", family: "GTX 900", score: 38, vram: 4, recommendedPsuW: null, psuSourceUrl: null },
  { id: "gtx970", name: "GeForce GTX 970", vendor: "NVIDIA", family: "GTX 900", score: 48, vram: 4, recommendedPsuW: null, psuSourceUrl: null },
  { id: "gtx980", name: "GeForce GTX 980", vendor: "NVIDIA", family: "GTX 900", score: 55, vram: 4, recommendedPsuW: null, psuSourceUrl: null },
  { id: "gtx980ti", name: "GeForce GTX 980 Ti", vendor: "NVIDIA", family: "GTX 900", score: 66, vram: 6, recommendedPsuW: null, psuSourceUrl: null },
  // NVIDIA GTX 10
  { id: "gtx1050ti", name: "GeForce GTX 1050 Ti", vendor: "NVIDIA", family: "GTX 10", score: 28, vram: 4, recommendedPsuW: null, psuSourceUrl: null },
  { id: "gtx1060", name: "GeForce GTX 1060 6GB", vendor: "NVIDIA", family: "GTX 10", score: 42, vram: 6, recommendedPsuW: null, psuSourceUrl: null },
  { id: "gtx1070", name: "GeForce GTX 1070", vendor: "NVIDIA", family: "GTX 10", score: 52, vram: 8, recommendedPsuW: null, psuSourceUrl: null },
  { id: "gtx1070ti", name: "GeForce GTX 1070 Ti", vendor: "NVIDIA", family: "GTX 10", score: 58, vram: 8, recommendedPsuW: null, psuSourceUrl: null },
  { id: "gtx1080", name: "GeForce GTX 1080", vendor: "NVIDIA", family: "GTX 10", score: 64, vram: 8, recommendedPsuW: null, psuSourceUrl: null },
  { id: "gtx1080ti", name: "GeForce GTX 1080 Ti", vendor: "NVIDIA", family: "GTX 10", score: 78, vram: 11, recommendedPsuW: null, psuSourceUrl: null },

  // NVIDIA GTX 16
  { id: "gtx1650", name: "GeForce GTX 1650", vendor: "NVIDIA", family: "GTX 16", score: 36, vram: 4, recommendedPsuW: null, psuSourceUrl: null },
  { id: "gtx1650super", name: "GeForce GTX 1650 SUPER", vendor: "NVIDIA", family: "GTX 16", score: 45, vram: 4, recommendedPsuW: null, psuSourceUrl: null },
  { id: "gtx1660", name: "GeForce GTX 1660", vendor: "NVIDIA", family: "GTX 16", score: 50, vram: 6, recommendedPsuW: null, psuSourceUrl: null },
  { id: "gtx1660super", name: "GeForce GTX 1660 SUPER", vendor: "NVIDIA", family: "GTX 16", score: 56, vram: 6, recommendedPsuW: null, psuSourceUrl: null },
  { id: "gtx1660ti", name: "GeForce GTX 1660 Ti", vendor: "NVIDIA", family: "GTX 16", score: 59, vram: 6, recommendedPsuW: null, psuSourceUrl: null },

  // NVIDIA RTX 20
  { id: "rtx2060", name: "GeForce RTX 2060", vendor: "NVIDIA", family: "RTX 20", score: 62, vram: 6, recommendedPsuW: null, psuSourceUrl: null },
  { id: "rtx2060super", name: "GeForce RTX 2060 SUPER", vendor: "NVIDIA", family: "RTX 20", score: 70, vram: 8, recommendedPsuW: null, psuSourceUrl: null },
  { id: "rtx2070", name: "GeForce RTX 2070", vendor: "NVIDIA", family: "RTX 20", score: 74, vram: 8, recommendedPsuW: null, psuSourceUrl: null },
  { id: "rtx2070super", name: "GeForce RTX 2070 SUPER", vendor: "NVIDIA", family: "RTX 20", score: 81, vram: 8, recommendedPsuW: null, psuSourceUrl: null },
  { id: "rtx2080", name: "GeForce RTX 2080", vendor: "NVIDIA", family: "RTX 20", score: 86, vram: 8, recommendedPsuW: null, psuSourceUrl: null },
  { id: "rtx2080ti", name: "GeForce RTX 2080 Ti", vendor: "NVIDIA", family: "RTX 20", score: 105, vram: 11, recommendedPsuW: null, psuSourceUrl: null },

  // NVIDIA RTX 30
  { id: "rtx3050", name: "GeForce RTX 3050", vendor: "NVIDIA", family: "RTX 30", score: 55, vram: 8, recommendedPsuW: 550, psuSourceUrl: "https://www.nvidia.com/en-us/geforce/graphics-cards/compare/" },
  { id: "rtx3060", name: "GeForce RTX 3060", vendor: "NVIDIA", family: "RTX 30", score: 70, vram: 12, recommendedPsuW: 550, psuSourceUrl: "https://www.nvidia.com/en-us/geforce/graphics-cards/compare/" },
  { id: "rtx3060ti", name: "GeForce RTX 3060 Ti", vendor: "NVIDIA", family: "RTX 30", score: 85, vram: 8, recommendedPsuW: 600, psuSourceUrl: "https://www.nvidia.com/en-us/geforce/graphics-cards/compare/" },
  { id: "rtx3070", name: "GeForce RTX 3070", vendor: "NVIDIA", family: "RTX 30", score: 94, vram: 8, recommendedPsuW: 650, psuSourceUrl: "https://www.nvidia.com/en-us/geforce/graphics-cards/compare/" },
  { id: "rtx3070ti", name: "GeForce RTX 3070 Ti", vendor: "NVIDIA", family: "RTX 30", score: 103, vram: 8, recommendedPsuW: 750, psuSourceUrl: "https://www.nvidia.com/en-us/geforce/graphics-cards/compare/" },
  { id: "rtx3080", name: "GeForce RTX 3080", vendor: "NVIDIA", family: "RTX 30", score: 125, vram: 10, recommendedPsuW: 750, psuSourceUrl: "https://www.nvidia.com/en-us/geforce/graphics-cards/compare/" },
  { id: "rtx3090", name: "GeForce RTX 3090", vendor: "NVIDIA", family: "RTX 30", score: 145, vram: 24, recommendedPsuW: 750, psuSourceUrl: "https://www.nvidia.com/en-us/geforce/graphics-cards/compare/" },

  // NVIDIA RTX 40
  { id: "rtx4060", name: "GeForce RTX 4060", vendor: "NVIDIA", family: "RTX 40", score: 100, vram: 8, recommendedPsuW: 550, psuSourceUrl: "https://www.nvidia.com/en-us/geforce/graphics-cards/compare/" },
  { id: "rtx4060ti", name: "GeForce RTX 4060 Ti", vendor: "NVIDIA", family: "RTX 40", score: 120, vram: 8, recommendedPsuW: 550, psuSourceUrl: "https://www.nvidia.com/en-us/geforce/graphics-cards/compare/" },
  { id: "rtx4070", name: "GeForce RTX 4070", vendor: "NVIDIA", family: "RTX 40", score: 150, vram: 12, recommendedPsuW: 650, psuSourceUrl: "https://www.nvidia.com/en-us/geforce/graphics-cards/compare/" },
  { id: "rtx4070super", name: "GeForce RTX 4070 SUPER", vendor: "NVIDIA", family: "RTX 40", score: 170, vram: 12, recommendedPsuW: 650, psuSourceUrl: "https://www.nvidia.com/en-us/geforce/graphics-cards/compare/" },
  { id: "rtx4070tisuper", name: "GeForce RTX 4070 Ti SUPER", vendor: "NVIDIA", family: "RTX 40", score: 195, vram: 16, recommendedPsuW: 700, psuSourceUrl: "https://www.nvidia.com/en-us/geforce/graphics-cards/compare/" },
  { id: "rtx4080super", name: "GeForce RTX 4080 SUPER", vendor: "NVIDIA", family: "RTX 40", score: 225, vram: 16, recommendedPsuW: 750, psuSourceUrl: "https://www.nvidia.com/en-us/geforce/graphics-cards/compare/" },
  { id: "rtx4090", name: "GeForce RTX 4090", vendor: "NVIDIA", family: "RTX 40", score: 285, vram: 24, recommendedPsuW: 850, psuSourceUrl: "https://www.nvidia.com/en-us/geforce/graphics-cards/compare/" },

  // NVIDIA RTX 50
  { id: "rtx5070", name: "GeForce RTX 5070", vendor: "NVIDIA", family: "RTX 50", score: 190, vram: 12, recommendedPsuW: 650, psuSourceUrl: "https://www.nvidia.com/en-us/geforce/graphics-cards/compare/" },
  { id: "rtx5070ti", name: "GeForce RTX 5070 Ti", vendor: "NVIDIA", family: "RTX 50", score: 225, vram: 16, recommendedPsuW: 750, psuSourceUrl: "https://www.nvidia.com/en-us/geforce/graphics-cards/compare/" },
  { id: "rtx5080", name: "GeForce RTX 5080", vendor: "NVIDIA", family: "RTX 50", score: 270, vram: 16, recommendedPsuW: 850, psuSourceUrl: "https://www.nvidia.com/en-us/geforce/graphics-cards/compare/" },
  { id: "rtx5090", name: "GeForce RTX 5090", vendor: "NVIDIA", family: "RTX 50", score: 370, vram: 32, recommendedPsuW: 1000, psuSourceUrl: "https://www.nvidia.com/en-us/geforce/graphics-cards/compare/" },
  // =========================
  // AMD RX 400 SERIES
  // =========================
  { id: "rx460", name: "Radeon RX 460", vendor: "AMD", family: "RX 400", score: 22, vram: 4, recommendedPsuW: null, psuSourceUrl: null },
  { id: "rx470", name: "Radeon RX 470", vendor: "AMD", family: "RX 400", score: 38, vram: 4, recommendedPsuW: null, psuSourceUrl: null },
  { id: "rx480", name: "Radeon RX 480", vendor: "AMD", family: "RX 400", score: 44, vram: 8, recommendedPsuW: null, psuSourceUrl: null },

  // =========================
  // AMD RX 500 SERIES
  // =========================
  { id: "rx550", name: "Radeon RX 550", vendor: "AMD", family: "RX 500", score: 18, vram: 4, recommendedPsuW: null, psuSourceUrl: null },
  { id: "rx560", name: "Radeon RX 560", vendor: "AMD", family: "RX 500", score: 25, vram: 4, recommendedPsuW: null, psuSourceUrl: null },
  { id: "rx570", name: "Radeon RX 570", vendor: "AMD", family: "RX 500", score: 40, vram: 4, recommendedPsuW: null, psuSourceUrl: null },
  { id: "rx580", name: "Radeon RX 580 8GB", vendor: "AMD", family: "RX 500", score: 47, vram: 8, recommendedPsuW: null, psuSourceUrl: null },
  { id: "rx590", name: "Radeon RX 590", vendor: "AMD", family: "RX 500", score: 52, vram: 8, recommendedPsuW: null, psuSourceUrl: null },

  // =========================
  // AMD VEGA
  // =========================
  { id: "vega56", name: "Radeon RX Vega 56", vendor: "AMD", family: "Vega", score: 58, vram: 8, recommendedPsuW: null, psuSourceUrl: null },
  { id: "vega64", name: "Radeon RX Vega 64", vendor: "AMD", family: "Vega", score: 64, vram: 8, recommendedPsuW: null, psuSourceUrl: null },
  { id: "radeonvii", name: "Radeon VII", vendor: "AMD", family: "Vega", score: 78, vram: 16, recommendedPsuW: null, psuSourceUrl: null },

  // =========================
  // AMD RX 5000 SERIES
  // =========================
  { id: "rx5500xt", name: "Radeon RX 5500 XT", vendor: "AMD", family: "RX 5000", score: 52, vram: 8, recommendedPsuW: null, psuSourceUrl: null },
  { id: "rx5600xt", name: "Radeon RX 5600 XT", vendor: "AMD", family: "RX 5000", score: 68, vram: 6, recommendedPsuW: null, psuSourceUrl: null },
  { id: "rx5700", name: "Radeon RX 5700", vendor: "AMD", family: "RX 5000", score: 78, vram: 8, recommendedPsuW: null, psuSourceUrl: null },
  { id: "rx5700xt", name: "Radeon RX 5700 XT", vendor: "AMD", family: "RX 5000", score: 86, vram: 8, recommendedPsuW: null, psuSourceUrl: null },
  // AMD Radeon
  { id: "rx6600", name: "Radeon RX 6600", vendor: "AMD", family: "RX 6000", score: 67, vram: 8, recommendedPsuW: null, psuSourceUrl: null },
  { id: "rx6700xt", name: "Radeon RX 6700 XT", vendor: "AMD", family: "RX 6000", score: 100, vram: 12, recommendedPsuW: null, psuSourceUrl: null },
  { id: "rx6800", name: "Radeon RX 6800", vendor: "AMD", family: "RX 6000", score: 125, vram: 16, recommendedPsuW: null, psuSourceUrl: null },
  { id: "rx6800xt", name: "Radeon RX 6800 XT", vendor: "AMD", family: "RX 6000", score: 145, vram: 16, recommendedPsuW: null, psuSourceUrl: null },
  { id: "rx6900xt", name: "Radeon RX 6900 XT", vendor: "AMD", family: "RX 6000", score: 160, vram: 16, recommendedPsuW: null, psuSourceUrl: null },

  { id: "rx7600", name: "Radeon RX 7600", vendor: "AMD", family: "RX 7000", score: 92, vram: 8, recommendedPsuW: null, psuSourceUrl: null },
  { id: "rx7700xt", name: "Radeon RX 7700 XT", vendor: "AMD", family: "RX 7000", score: 135, vram: 12, recommendedPsuW: 700, psuSourceUrl: "https://www.amd.com/en/products/graphics/desktops/radeon/7000-series/amd-radeon-rx-7700-xt.html" },
  { id: "rx7800xt", name: "Radeon RX 7800 XT", vendor: "AMD", family: "RX 7000", score: 160, vram: 16, recommendedPsuW: 700, psuSourceUrl: "https://www.amd.com/content/dam/amd/en/documents/radeon-tech-docs/user-guides/quick-start-guide-amd-radeon-7800xt.pdf" },
  { id: "rx7900xt", name: "Radeon RX 7900 XT", vendor: "AMD", family: "RX 7000", score: 205, vram: 20, recommendedPsuW: 750, psuSourceUrl: "https://www.amd.com/en/products/graphics/desktops/radeon/7000-series/amd-radeon-rx-7900xt.html" },
  { id: "rx7900xtx", name: "Radeon RX 7900 XTX", vendor: "AMD", family: "RX 7000", score: 235, vram: 24, recommendedPsuW: 800, psuSourceUrl: "https://www.amd.com/en/support/downloads/drivers.html/graphics/radeon-rx/radeon-rx-7000-series/amd-radeon-rx-7900-xtx.html" },

  // Intel Arc
  { id: "arca380", name: "Intel Arc A380", vendor: "Intel", family: "Arc A", score: 38, vram: 6, recommendedPsuW: null, psuSourceUrl: null },
  { id: "arca580", name: "Intel Arc A580", vendor: "Intel", family: "Arc A", score: 70, vram: 8, recommendedPsuW: null, psuSourceUrl: null },
  { id: "arca750", name: "Intel Arc A750", vendor: "Intel", family: "Arc A", score: 82, vram: 8, recommendedPsuW: null, psuSourceUrl: null },
  { id: "arca770", name: "Intel Arc A770 16GB", vendor: "Intel", family: "Arc A", score: 90, vram: 16, recommendedPsuW: null, psuSourceUrl: null },

  { id: "arcb570", name: "Intel Arc B570", vendor: "Intel", family: "Arc B", score: 96, vram: 10, recommendedPsuW: null, psuSourceUrl: null },
  { id: "arcb580", name: "Intel Arc B580", vendor: "Intel", family: "Arc B", score: 112, vram: 12, recommendedPsuW: null, psuSourceUrl: null },
];
