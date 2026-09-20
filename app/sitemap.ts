import type { MetadataRoute } from "next";

const siteUrl = "https://fps-checker-gamma.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/` },
    { url: `${siteUrl}/privacy-policy` },
    { url: `${siteUrl}/operator` },
    { url: `${siteUrl}/contact` },
  ];
}
