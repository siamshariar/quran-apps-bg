import { useState } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
// import useLoader from "../../hooks/useLoader";
import Sidenav from "../layout2/sidenav";
import styles from "./list.module.scss";

export default function SubjectiveContent({
  chapters,
  subjectives,
  contentTitle,
  loading
}) {
  // const loading = useLoader();
  const [subjectiveList, setSubjectiveList] = useState(subjectives);

  const filterSubjectives = (search) => {
    const filtered = subjectives.filter((subjective) => {
      return subjective.title.toLowerCase().includes(search.toLowerCase());
    });
    setSubjectiveList(filtered);
  };

  return (
    <div className={styles.content}>
      {loading && (
        <>
          <Skeleton
            style={{marginBottom: "24px"}} //
            count={1}
            height={49}
            width={`100%`}
            className="skeleton"
          />
          <Skeleton
            count={16}
            height={49}
            width={`100%`}
            className="skeleton"
          />
        </>
      )}

      {!loading && (
      <>
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
      </>
      )}
    </div>
  );
}
