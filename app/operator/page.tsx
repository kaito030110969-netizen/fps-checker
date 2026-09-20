import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "../site-config";

export const metadata: Metadata = {
  title: "運営者情報 | PC FPS診断",
  description: "PC FPS診断の運営者情報です。",
  alternates: {
    canonical: "/operator",
  },
};

export default function OperatorPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <Link className="text-sm text-green-400 hover:text-green-300" href="/">
          ← PC FPS診断に戻る
        </Link>

        <article className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 leading-8 text-zinc-300 sm:p-10">
          <p className="text-sm font-semibold text-green-400">ABOUT</p>
          <h1 className="mt-2 text-3xl font-bold text-white">運営者情報</h1>

          <dl className="mt-8 divide-y divide-zinc-800 border-y border-zinc-800">
            <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="font-semibold text-zinc-400">サイト名</dt>
              <dd>{siteConfig.name}</dd>
            </div>
            <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="font-semibold text-zinc-400">運営者</dt>
              <dd>{siteConfig.operatorName}</dd>
            </div>
            <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="font-semibold text-zinc-400">連絡先</dt>
              <dd>
                <a className="break-all text-green-400 underline" href={`mailto:${siteConfig.contactEmail}`}>
                  {siteConfig.contactEmail}
                </a>
              </dd>
            </div>
          </dl>

          <p className="mt-8">
            当サイトでは、CPU・GPU・ゲームなどの情報をもとに、PCゲームの推定FPSやアップグレードの目安を確認できます。掲載情報についてのお問い合わせやご意見は、上記メールアドレスまでお寄せください。
          </p>
        </article>
      </div>
    </main>
  );
}
