import { useContext } from "react";
import { PinContext } from "../../../contexts/PinContext";
import { SettingsContext } from "../../../contexts/SettingsContext";
import Link from "next/link";
import PinIcon from "../../icons/PinOutline";
import styles from "../../bookmark/list.module.scss";

export default function PinList() {
  const { pin } = useContext(PinContext);
  const { verseMode } = useContext(SettingsContext);

  return (
    <div className={styles.content}>
      <div className={styles.lists}>
        {pin &&
          pin.length > 0 &&
          pin.map((item) => (
            <div key={item.chapter} className={styles.item}>
              <Link
                // href={
                //   verseMode === "scroll"
                //     ? `/chapters/${item.slug}#verse-${item.verse}`
                //     : verseMode === "slide"
                //     ? `/chapters/${item.slug}/verses/${item.verse}`
                //     : `/chapters/${item.slug}#verse-${item.verse}`
                // }
                href={`/chapters/${item.slug}#verse-${item.verse}`}
              legacyBehavior>
                <a className={styles.link}>
                  <span className={styles.left}>
                    <span className={styles.icon}>
                      <PinIcon />
                    </span>
                    <span className={styles.desc}>
                      <span>{item.name}</span>
                      <span>Verse No: {item.verse}</span>
                    </span>
                  </span>
                </a>
              </Link>
            </div>
          ))}
      </div>

      {pin && pin.length == 0 && (
        <h2 className={styles.no_record}>No records found</h2>
      )}
    </div>
  );
}
