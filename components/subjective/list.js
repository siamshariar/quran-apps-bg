import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Virtuoso } from 'react-virtuoso';
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

  const virtuoso = useRef(null);

  const scrollToIndex = (index) => {
    virtuoso.current.scrollToIndex({
      index: index,
      align: "start",
      behavior: "auto"
    });
  };

  // TODO: Save click index and scroll to index on browser back. Fix mobile height
  // useEffect(() => {
  //   if (virtuoso.current && !loading) {
  //     scrollToIndex(50);
  //   }
  // }, []);

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
        {/*<Virtuoso*/}
        {/*    // ref={virtuoso}*/}
        {/*    useWindowScroll*/}
        {/*    totalCount={subjectiveList.length} // Total number of items*/}
        {/*    itemContent={(index) => (*/}
        {/*        <Link*/}
        {/*            href={*/}
        {/*              subjectiveList[index].totalChildVerse*/}
        {/*                  ? `/subjective/${subjectiveList[index].slug}`*/}
        {/*                  : `/subjective/${subjectiveList[index].slug}/verses`*/}
        {/*            }*/}
        {/*            key={index}*/}
        {/*        >*/}
        {/*          <a className={styles.item}>*/}
        {/*            <span className={styles.left}>{subjectiveList[index].title}</span>*/}
        {/*            <span className={styles.right}>*/}
        {/*              {subjectiveList[index].totalChildVerse*/}
        {/*                  ? subjectiveList[index].totalChildVerse*/}
        {/*                  : subjectiveList[index].totalVerse}{" "}*/}
        {/*                  Ayahs*/}
        {/*            </span>*/}
        {/*          </a>*/}
        {/*        </Link>*/}
        {/*    )}*/}
        {/*/>*/}

        {subjectiveList &&
          subjectiveList.map((item, index) => (
            <Link
              href={
                item.totalChildVerse
                  ? `/subjective/${item.slug}`
                  : `/subjective/${item.slug}/verses`
              }
              key={index}
            legacyBehavior>
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
