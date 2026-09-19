export type CPU = {
  id: string;
  name: string;
  score: number;
  platform: string;
};

export const cpus: CPU[] = [
  // =========================
  // AMD Ryzen 1000 / AM4
  // =========================
  { id: "r3-1200", name: "Ryzen 3 1200", score: 35, platform: "AM4" },
  { id: "r3-1300x", name: "Ryzen 3 1300X", score: 39, platform: "AM4" },
  { id: "r5-1400", name: "Ryzen 5 1400", score: 43, platform: "AM4" },
  { id: "r5-1500x", name: "Ryzen 5 1500X", score: 47, platform: "AM4" },
  { id: "r5-1600", name: "Ryzen 5 1600", score: 50, platform: "AM4" },
  { id: "r5-1600x", name: "Ryzen 5 1600X", score: 53, platform: "AM4" },
  { id: "r7-1700", name: "Ryzen 7 1700", score: 51, platform: "AM4" },
  { id: "r7-1700x", name: "Ryzen 7 1700X", score: 53, platform: "AM4" },
  { id: "r7-1800x", name: "Ryzen 7 1800X", score: 56, platform: "AM4" },

  // =========================
  // AMD Ryzen 2000 / AM4
  // =========================
  { id: "r3-2200g", name: "Ryzen 3 2200G", score: 43, platform: "AM4" },
  { id: "r5-2400g", name: "Ryzen 5 2400G", score: 48, platform: "AM4" },
  { id: "r5-2600", name: "Ryzen 5 2600", score: 58, platform: "AM4" },
  { id: "r5-2600x", name: "Ryzen 5 2600X", score: 62, platform: "AM4" },
  { id: "r7-2700", name: "Ryzen 7 2700", score: 61, platform: "AM4" },
  { id: "r7-2700x", name: "Ryzen 7 2700X", score: 66, platform: "AM4" },

  // =========================
  // AMD Ryzen 3000 / AM4
  // =========================
  { id: "r3-3100", name: "Ryzen 3 3100", score: 66, platform: "AM4" },
  { id: "r3-3300x", name: "Ryzen 3 3300X", score: 75, platform: "AM4" },
  { id: "r5-3500", name: "Ryzen 5 3500", score: 68, platform: "AM4" },
  { id: "r5-3500x", name: "Ryzen 5 3500X", score: 70, platform: "AM4" },
  { id: "r5-3600", name: "Ryzen 5 3600", score: 72, platform: "AM4" },
  { id: "r5-3600x", name: "Ryzen 5 3600X", score: 75, platform: "AM4" },
  { id: "r5-3600xt", name: "Ryzen 5 3600XT", score: 77, platform: "AM4" },
  { id: "r7-3700x", name: "Ryzen 7 3700X", score: 79, platform: "AM4" },
  { id: "r7-3800x", name: "Ryzen 7 3800X", score: 82, platform: "AM4" },
  { id: "r7-3800xt", name: "Ryzen 7 3800XT", score: 84, platform: "AM4" },
  { id: "r9-3900x", name: "Ryzen 9 3900X", score: 84, platform: "AM4" },
  { id: "r9-3950x", name: "Ryzen 9 3950X", score: 87, platform: "AM4" },

  // =========================
  // AMD Ryzen 5000 / AM4
  // =========================
  { id: "r5-5500", name: "Ryzen 5 5500", score: 82, platform: "AM4" },
  { id: "r5-5600", name: "Ryzen 5 5600", score: 90, platform: "AM4" },
  { id: "r5-5600x", name: "Ryzen 5 5600X", score: 94, platform: "AM4" },
  { id: "r7-5700x", name: "Ryzen 7 5700X", score: 100, platform: "AM4" },
  { id: "r7-5700x3d", name: "Ryzen 7 5700X3D", score: 120, platform: "AM4" },
  { id: "r7-5800x", name: "Ryzen 7 5800X", score: 105, platform: "AM4" },
  { id: "r7-5800x3d", name: "Ryzen 7 5800X3D", score: 128, platform: "AM4" },
  { id: "r9-5900x", name: "Ryzen 9 5900X", score: 111, platform: "AM4" },
  { id: "r9-5950x", name: "Ryzen 9 5950X", score: 115, platform: "AM4" },

  // =========================
  // AMD Ryzen 7000 / AM5
  // =========================
  { id: "r5-7500f", name: "Ryzen 5 7500F", score: 114, platform: "AM5" },
  { id: "r5-7600", name: "Ryzen 5 7600", score: 120, platform: "AM5" },
  { id: "r5-7600x", name: "Ryzen 5 7600X", score: 125, platform: "AM5" },
  { id: "r7-7700", name: "Ryzen 7 7700", score: 128, platform: "AM5" },
  { id: "r7-7700x", name: "Ryzen 7 7700X", score: 132, platform: "AM5" },
  { id: "r7-7800x3d", name: "Ryzen 7 7800X3D", score: 158, platform: "AM5" },
  { id: "r9-7900", name: "Ryzen 9 7900", score: 136, platform: "AM5" },
  { id: "r9-7900x", name: "Ryzen 9 7900X", score: 140, platform: "AM5" },
  { id: "r9-7950x", name: "Ryzen 9 7950X", score: 146, platform: "AM5" },
  { id: "r9-7950x3d", name: "Ryzen 9 7950X3D", score: 160, platform: "AM5" },

  // =========================
  // AMD Ryzen 9000 / AM5
  // =========================
  { id: "r5-9600x", name: "Ryzen 5 9600X", score: 137, platform: "AM5" },
  { id: "r7-9700x", name: "Ryzen 7 9700X", score: 148, platform: "AM5" },
  { id: "r7-9800x3d", name: "Ryzen 7 9800X3D", score: 178, platform: "AM5" },
  { id: "r9-9900x", name: "Ryzen 9 9900X", score: 154, platform: "AM5" },
  { id: "r9-9950x", name: "Ryzen 9 9950X", score: 162, platform: "AM5" },

  // =========================
  // Intel 4th Gen / LGA1150
  // =========================
  { id: "i3-4130", name: "Core i3-4130", score: 31, platform: "LGA1150" },
  { id: "i3-4160", name: "Core i3-4160", score: 33, platform: "LGA1150" },
  { id: "i5-4460", name: "Core i5-4460", score: 40, platform: "LGA1150" },
  { id: "i5-4590", name: "Core i5-4590", score: 43, platform: "LGA1150" },
  { id: "i5-4690k", name: "Core i5-4690K", score: 47, platform: "LGA1150" },
  { id: "i7-4770", name: "Core i7-4770", score: 50, platform: "LGA1150" },
  { id: "i7-4770k", name: "Core i7-4770K", score: 52, platform: "LGA1150" },
  { id: "i7-4790k", name: "Core i7-4790K", score: 56, platform: "LGA1150" },

  // =========================
  // Intel 6th Gen / LGA1151
  // =========================
  { id: "i3-6100", name: "Core i3-6100", score: 38, platform: "LGA1151-6/7" },
  { id: "i5-6400", name: "Core i5-6400", score: 44, platform: "LGA1151-6/7" },
  { id: "i5-6500", name: "Core i5-6500", score: 47, platform: "LGA1151-6/7" },
  { id: "i5-6600k", name: "Core i5-6600K", score: 52, platform: "LGA1151-6/7" },
  { id: "i7-6700", name: "Core i7-6700", score: 58, platform: "LGA1151-6/7" },
  { id: "i7-6700k", name: "Core i7-6700K", score: 61, platform: "LGA1151-6/7" },

  // =========================
  // Intel 7th Gen / LGA1151
  // =========================
  { id: "i3-7100", name: "Core i3-7100", score: 41, platform: "LGA1151-6/7" },
  { id: "i5-7400", name: "Core i5-7400", score: 48, platform: "LGA1151-6/7" },
  { id: "i5-7500", name: "Core i5-7500", score: 51, platform: "LGA1151-6/7" },
  { id: "i5-7600k", name: "Core i5-7600K", score: 56, platform: "LGA1151-6/7" },
  { id: "i7-7700", name: "Core i7-7700", score: 63, platform: "LGA1151-6/7" },
  { id: "i7-7700k", name: "Core i7-7700K", score: 66, platform: "LGA1151-6/7" },

  // =========================
  // Intel 8th / 9th Gen
  // =========================
  { id: "i3-8100", name: "Core i3-8100", score: 49, platform: "LGA1151-8/9" },
  { id: "i5-8400", name: "Core i5-8400", score: 60, platform: "LGA1151-8/9" },
  { id: "i5-8600k", name: "Core i5-8600K", score: 67, platform: "LGA1151-8/9" },
  { id: "i7-8700", name: "Core i7-8700", score: 71, platform: "LGA1151-8/9" },
  { id: "i7-8700k", name: "Core i7-8700K", score: 74, platform: "LGA1151-8/9" },

  { id: "i3-9100f", name: "Core i3-9100F", score: 52, platform: "LGA1151-8/9" },
  { id: "i5-9400f", name: "Core i5-9400F", score: 62, platform: "LGA1151-8/9" },
  { id: "i5-9600k", name: "Core i5-9600K", score: 69, platform: "LGA1151-8/9" },
  { id: "i7-9700", name: "Core i7-9700", score: 75, platform: "LGA1151-8/9" },
  { id: "i7-9700k", name: "Core i7-9700K", score: 78, platform: "LGA1151-8/9" },
  { id: "i9-9900k", name: "Core i9-9900K", score: 84, platform: "LGA1151-8/9" },

  // =========================
  // Intel 10th / 11th Gen / LGA1200
  // =========================
  { id: "i3-10100f", name: "Core i3-10100F", score: 59, platform: "LGA1200" },
  { id: "i5-10400f", name: "Core i5-10400F", score: 67, platform: "LGA1200" },
  { id: "i5-10600k", name: "Core i5-10600K", score: 76, platform: "LGA1200" },
  { id: "i7-10700", name: "Core i7-10700", score: 80, platform: "LGA1200" },
  { id: "i7-10700k", name: "Core i7-10700K", score: 84, platform: "LGA1200" },
  { id: "i9-10900k", name: "Core i9-10900K", score: 90, platform: "LGA1200" },

  { id: "i5-11400f", name: "Core i5-11400F", score: 73, platform: "LGA1200" },
  { id: "i5-11600k", name: "Core i5-11600K", score: 82, platform: "LGA1200" },
  { id: "i7-11700k", name: "Core i7-11700K", score: 89, platform: "LGA1200" },
  { id: "i9-11900k", name: "Core i9-11900K", score: 92, platform: "LGA1200" },

  // =========================
  // Intel 12th Gen / LGA1700
  // =========================
  { id: "i3-12100f", name: "Core i3-12100F", score: 78, platform: "LGA1700" },
  { id: "i5-12400f", name: "Core i5-12400F", score: 86, platform: "LGA1700" },
  { id: "i5-12600k", name: "Core i5-12600K", score: 104, platform: "LGA1700" },
  { id: "i7-12700", name: "Core i7-12700", score: 108, platform: "LGA1700" },
  { id: "i7-12700k", name: "Core i7-12700K", score: 113, platform: "LGA1700" },
  { id: "i9-12900k", name: "Core i9-12900K", score: 119, platform: "LGA1700" },

  // =========================
  // Intel 13th Gen / LGA1700
  // =========================
  { id: "i3-13100f", name: "Core i3-13100F", score: 84, platform: "LGA1700" },
  { id: "i5-13400f", name: "Core i5-13400F", score: 103, platform: "LGA1700" },
  { id: "i5-13600k", name: "Core i5-13600K", score: 126, platform: "LGA1700" },
  { id: "i7-13700k", name: "Core i7-13700K", score: 138, platform: "LGA1700" },
  { id: "i9-13900k", name: "Core i9-13900K", score: 148, platform: "LGA1700" },

  // =========================
  // Intel 14th Gen / LGA1700
  // =========================
  { id: "i3-14100f", name: "Core i3-14100F", score: 88, platform: "LGA1700" },
  { id: "i5-14400f", name: "Core i5-14400F", score: 107, platform: "LGA1700" },
  { id: "i5-14600k", name: "Core i5-14600K", score: 133, platform: "LGA1700" },
  { id: "i7-14700k", name: "Core i7-14700K", score: 145, platform: "LGA1700" },
  { id: "i9-14900k", name: "Core i9-14900K", score: 153, platform: "LGA1700" },

  // =========================
  // Intel Core Ultra / LGA1851
  // =========================
  { id: "ultra5-245k", name: "Core Ultra 5 245K", score: 135, platform: "LGA1851" },
  { id: "ultra7-265k", name: "Core Ultra 7 265K", score: 145, platform: "LGA1851" },
  { id: "ultra9-285k", name: "Core Ultra 9 285K", score: 153, platform: "LGA1851" },
];