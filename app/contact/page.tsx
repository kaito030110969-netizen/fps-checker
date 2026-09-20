import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "../site-config";

export const metadata: Metadata = {
  title: "お問い合わせ | PC FPS診断",
  description: "PC FPS診断へのお問い合わせ方法です。",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <Link className="text-sm text-green-400 hover:text-green-300" href="/">
          ← PC FPS診断に戻る
        </Link>

        <article className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 leading-8 text-zinc-300 sm:p-10">
          <p className="text-sm font-semibold text-green-400">CONTACT</p>
          <h1 className="mt-2 text-3xl font-bold text-white">お問い合わせ</h1>
          <p className="mt-6">
            サイト内容へのご質問、掲載情報の訂正、広告・アフィリエイトに関するご連絡などは、以下のメールアドレスまでお願いいたします。
          </p>

          <a
            className="mt-8 block break-all rounded-xl border border-green-800 bg-green-950/30 px-5 py-4 text-lg font-semibold text-green-300 hover:bg-green-950/60"
            href={`mailto:${siteConfig.contactEmail}`}
          >
            {siteConfig.contactEmail}
          </a>

          <p className="mt-6 text-sm text-zinc-500">
            お問い合わせの内容によっては、回答まで数日いただく場合があります。営業目的のご連絡には回答できないことがありますので、ご了承ください。
          </p>
        </article>
      </div>
    </main>
  );
}
