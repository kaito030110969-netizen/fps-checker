import Link from "next/link";
import { siteConfig } from "../site-config";
import AdSlot from "./AdSlot";
import styles from "./site-footer.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <AdSlot placement="before-footer" />
        <div className={styles.top}>
          <div>
            <Link href="/" className={styles.brand} aria-label="PC FPS診断 トップ">
              <span className={styles.brandMark} aria-hidden="true">F</span>
              <span>FPS<span className={styles.brandLight}> CHECKER</span></span>
            </Link>
            <p className={styles.tagline}>次のアップグレードに、確かな目安を。</p>
          </div>
          <p className={styles.motto}>KNOW YOUR BUILD. FIND YOUR NEXT.</p>
        </div>
        <p className={styles.notice}>
          このサイトはアフィリエイト広告を利用しています。
        </p>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} {siteConfig.name}</p>

          <nav aria-label="フッターナビゲーション" className={styles.nav}>
            <Link href="/privacy-policy">
              プライバシーポリシー
            </Link>
            <Link href="/operator">
              運営者情報
            </Link>
            <Link href="/contact">
              お問い合わせ
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
