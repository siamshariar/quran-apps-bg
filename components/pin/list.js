import { useContext } from "react";
import { PinContext } from "../../contexts/PinContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import { useRouter } from "next/router";
import PinIcon from "../icons/PinOutline";
import styles from "../bookmark/list.module.scss";

export default function PinList({ controller }) {
  const { pin } = useContext(PinContext);
  const { verseMode } = useContext(SettingsContext);
  const router = useRouter();

  const handleClick = (e, slug, verse) => {
    e.preventDefault();

    // const href =
    //   verseMode === "scroll"
    //     ? `/chapters/${slug}#verse-${verse}`
    //     : verseMode === "slide"
    //     ? `/chapters/${slug}/verses/${verse}`
    //     : `/chapters/${slug}#verse-${verse}`;
    const href = `/chapters/${slug}#verse-${verse}`;

    controller(false)(e);
    router.push(href);
  };

  return (
    <div className={styles.content}>
      <div className={styles.lists}>
        {pin &&
          pin.length > 0 &&
          pin.map((item) => (
            <div key={item.chapter} className={styles.item}>
              <div
                className={styles.link}
                onClick={(e) => handleClick(e, item.slug, item.verse)}
              >
                <div className={styles.left}>
                  <span className={styles.icon}>
                    <PinIcon />
                  </span>
                  <span className={styles.desc}>
                    <span>{item.name}</span>
                    <span>Verse No: {item.verse}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {pin && pin.length == 0 && (
        <h2 className={styles.no_record}>No records found</h2>
      )}
    </div>
  );
}
