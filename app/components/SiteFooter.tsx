import Link from "next/link";
import { siteConfig } from "../site-config";

export default function SiteFooter() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <p className="rounded-xl border border-green-900/80 bg-green-950/30 px-4 py-3 text-sm leading-6 text-green-100">
          このサイトはアフィリエイト広告を利用しています。
        </p>

        <div className="mt-6 flex flex-col gap-5 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}</p>

          <nav aria-label="フッターナビゲーション" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link className="transition hover:text-green-400" href="/privacy-policy">
              プライバシーポリシー
            </Link>
            <Link className="transition hover:text-green-400" href="/operator">
              運営者情報
            </Link>
            <Link className="transition hover:text-green-400" href="/contact">
              お問い合わせ
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
