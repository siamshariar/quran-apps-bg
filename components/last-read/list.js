import { useContext } from "react";
import { PinContext } from "../../contexts/PinContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import { useRouter } from "next/router";
import AutoStoriesIcon from "../icons/AutoStories";
import styles from "../bookmark/list.module.scss";
import { t } from "../../lib/config";

function formatToEnglishName(name) {
  return name
    .replace(/(chương|chuong|surah|surat|chapter|āl|'imran|‘imrān)\s*/gi, '')
    .replace(/[āăâáàä]/gi, 'a')
    .replace(/[éèêëē]/gi, 'e')
    .replace(/[īîïíì]/gi, 'i')
    .replace(/[ōôöóò]/gi, 'o')
    .replace(/[ūûüúù]/gi, 'u')
    .replace(/[‘’'",.]/g, '')
    .replace(/\s+/g, '-') 
    .replace(/-{2,}/g, '-') 
    .replace(/^-+/, '') 
    .replace(/-+$/, '') 
    .toLowerCase()
    .trim();
}

export default function LastReadList({ controller }) {
  const { lastRead } = useContext(PinContext);
  const { verseMode } = useContext(SettingsContext);
  const router = useRouter();

  const handleClick = (e, slug, verse) => {
    e.preventDefault();
    const englishSlug = formatToEnglishName(slug).replace(/\s+/g, '-').toLowerCase();
    
    // const href =
    //   verseMode === "scroll"
    //     ? `/chapters/${slug}#verse-${verse}`
    //     : verseMode === "slide"
    //     ? `/chapters/${slug}/verses/${verse}`
    //     : `/chapters/${slug}#verse-${verse}`;

    router.push(`/chapters/${englishSlug}#verse-${verse}`);
    controller(false)(e);
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
        <h2 className={styles.no_record}>{t("No records found")}</h2>
      )}
    </div>
  );
}
