import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "../site-config";

export const metadata: Metadata = {
  title: "プライバシーポリシー | PC FPS診断",
  description: "PC FPS診断のプライバシーポリシーです。",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <Link className="text-sm text-green-400 hover:text-green-300" href="/">
          ← PC FPS診断に戻る
        </Link>

        <article className="mt-8 space-y-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 leading-8 text-zinc-300 sm:p-10">
          <div>
            <p className="text-sm font-semibold text-green-400">LEGAL</p>
            <h1 className="mt-2 text-3xl font-bold text-white">プライバシーポリシー</h1>
          </div>

          <section>
            <h2 className="text-xl font-bold text-white">1. 取得する情報</h2>
            <p className="mt-3">
              当サイトでは、お問い合わせの際にメールアドレスやお問い合わせ内容をご提供いただく場合があります。また、サイトの利用状況を把握するため、Google Analyticsを利用しています。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">2. Google Analyticsについて</h2>
            <p className="mt-3">
              当サイトでは、アクセス状況の解析とサービス改善のためにGoogle Analyticsを利用しています。Google AnalyticsはCookieを使用して利用状況を収集しますが、個人を特定する情報は収集しません。詳細はGoogleのサービスおよびポリシーをご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">3. 広告・アフィリエイトについて</h2>
            <p className="mt-3">
              当サイトはアフィリエイト広告を利用しています。将来的に、Google AdSense、楽天アフィリエイト、Amazonアソシエイト等の広告・アフィリエイトサービスを導入する可能性があります。導入した場合は、広告配信事業者がCookie等を使用して閲覧情報を取得することがあります。現在、これらのサービスはまだ導入していません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">4. 情報の利用目的</h2>
            <p className="mt-3">
              取得した情報は、お問い合わせへの回答、サイトの運営・改善、不正利用の防止、必要に応じた広告やアフィリエイトの効果測定のために利用します。取得した情報を、法令に基づく場合を除き、本人の同意なく第三者へ提供することはありません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">5. 免責事項</h2>
            <p className="mt-3">
              当サイトのFPSやパーツ性能、価格などの情報は参考値です。掲載内容の正確性・完全性や、診断結果による機器の動作を保証するものではありません。購入や設定変更は、ご自身の責任でご判断ください。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">6. お問い合わせ・ポリシーの変更</h2>
            <p className="mt-3">
              本ポリシーに関するお問い合わせは、<a className="text-green-400 underline" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>までご連絡ください。本ポリシーは、法令やサービス内容の変更に応じて更新することがあります。
            </p>
          </section>

          <p className="text-right text-sm text-zinc-500">制定日：2026年9月20日</p>
        </article>
      </div>
    </main>
  );
}
