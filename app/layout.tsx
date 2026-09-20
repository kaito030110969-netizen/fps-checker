import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PC FPS診断",
  description:
    "CPU・GPU・ゲームからFPS、ボトルネック、アップグレード候補を確認できるPC性能診断サイト",
    verification: {
    google: "FZALjOel-8qrhuLP2D6A1WA6jQkiw93DYKd_rYwetGw",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
  <Script
    src="https://www.googletagmanager.com/gtag/js?id=G-KR91B23H1P"
    strategy="afterInteractive"
  />

  <Script id="google-analytics" strategy="afterInteractive">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-KR91B23H1P');
    `}
  </Script>

  {children}
</body>
    </html>
  );
}
