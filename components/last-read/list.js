import { useContext } from "react";
import { PinContext } from "../../contexts/PinContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import { useRouter } from "next/router";
import AutoStoriesIcon from "../icons/AutoStories";
import styles from "../bookmark/list.module.scss";

export default function LastReadList({ controller }) {
  const { lastRead } = useContext(PinContext);
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

  const formatDate = (date) => {
    const lastReadDate = new Date(date);
    const currentDate = new Date();
    const lastReadDay = lastReadDate.getDate();
    const currentDay = currentDate.getDate();

    let options, formatted;

    if (lastReadDay == currentDay) {
      options = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
    } else {
      options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour12: true,
      };
    }
    formatted = lastReadDate.toLocaleString("en-US", options);
    return formatted;
  };

  return (
    <div className={styles.content}>
      <div className={styles.lists}>
        {lastRead &&
          lastRead.length > 0 &&
          lastRead.map((item) => (
            <div key={item.chapter} className={styles.item}>
              <div
                className={styles.link}
                onClick={(e) => handleClick(e, item.slug, item.verse)}
              >
                <div className={styles.left}>
                  <span className={styles.icon}>
                    <AutoStoriesIcon />
                  </span>
                  <span className={styles.desc}>
                    <span>{item.name}</span>
                    <span>Verse No: {item.verse}</span>
                  </span>
                </div>

                <div className={styles.right}>
                  <span className={styles.time}>{formatDate(item.date)}</span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {lastRead && lastRead.length == 0 && (
        <h2 className={styles.no_record}>No records found</h2>
      )}
    </div>
  );
}
