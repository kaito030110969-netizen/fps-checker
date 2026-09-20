import type { ReactNode } from "react";
import styles from "./ad-slot.module.css";

type AdSlotProps = {
  placement: "home-middle" | "result-bottom" | "before-footer";
  children?: ReactNode;
};

/** 将来広告を差し込むための枠。children がないときは余白も通信も出さない。 */
export default function AdSlot({ placement, children }: AdSlotProps) {
  if (!children) return null;

  return (
    <aside aria-label="広告" data-ad-placement={placement} className={styles.slot}>
      <p className={styles.label}>ADVERTISEMENT / 広告</p>
      <div className={styles.content}>{children}</div>
    </aside>
  );
}
