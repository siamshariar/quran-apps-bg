import { useState } from "react";
import Link from "next/link";
import Sidenav from "../layout2/sidenav";
import styles from "./list.module.scss";

export default function SubjectiveContent({
  chapters,
  subjectives,
  contentTitle,
}) {
  const [subjectiveList, setSubjectiveList] = useState(subjectives);

  const filterSubjectives = (search) => {
    const filtered = subjectives.filter((subjective) => {
      return subjective.title.toLowerCase().includes(search.toLowerCase());
    });
    setSubjectiveList(filtered);
  };

  return (
    <div className={styles.content}>
      <div className={styles.title}>
        <h2>{contentTitle}</h2>
      </div>

      <input
        className={styles.search}
        type="text"
        name="search"
        placeholder="Search by title..."
        onChange={(e) => filterSubjectives(e.target.value)}
      />

      <div className={styles.list}>
        {subjectiveList &&
          subjectiveList.map((item, index) => (
            <Link
              href={
                item.totalChildVerse
                  ? `/subjective/${item.slug}`
                  : `/subjective/${item.slug}/verses`
              }
              key={index}
            >
              <a className={styles.item}>
                <span className={styles.left}>{item.title}</span>
                <span className={styles.right}>
                  {item.totalChildVerse
                    ? item.totalChildVerse
                    : item.totalVerse}{" "}
                  Ayahs
                </span>
              </a>
            </Link>
          ))}
      </div>

      {(!subjectiveList || !subjectiveList.length) && (
        <h2 className={styles.empty}>No records found!</h2>
      )}
    </div>
  );
}
