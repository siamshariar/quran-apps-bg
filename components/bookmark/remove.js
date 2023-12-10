import { useContext } from "react";
import { BookmarkContext } from "../../contexts/BookmarkContext";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "../icons/Close";
import styles from "./modal.module.scss";

export default function RemoveBookmark({ open, closer, chapter, verse, updateBookmarksData, bookmarkKey, isBookmarkPage }) {
  const { bookmarks, changeBookmarks } = useContext(BookmarkContext);

  const checkVerseBookmarked = (arr, chapter, verse) => {
    return arr.some((el) => {
      return el.chapter == chapter && el.verse == verse;
    });
  };

  const elementRemove = (arr, elem) => {
    return arr.filter(
      (item) => !(item.chapter == elem.chapter && item.verse == elem.verse)
    );
  };

  const handleRemoveBookmark = (e) => {
    let entry = bookmarks[bookmarkKey].entry;

    if (entry !== null && checkVerseBookmarked(entry, chapter, verse)) {
      let newBookmarks = bookmarks;
      entry = elementRemove(entry, { chapter: chapter, verse: verse });
      newBookmarks[bookmarkKey] = {
        name: bookmarks[bookmarkKey].name,
        entry: entry,
      };
      changeBookmarks(newBookmarks);

      if (typeof isBookmarkPage !== 'undefined' && isBookmarkPage === true) {
        updateBookmarksData(chapter, verse);
      }

      closer(false)(e);
    }
  };

  return (
    <Modal
      open={open}
      onClose={closer(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open} timeout={250}>
        <div className={styles.content}>
          <button className={styles.close} onClick={closer(false)}>
            <CloseIcon />
          </button>

          <h2 className={styles.title}>Remove bookmark?</h2>
          <div className={styles.title_desc}>
            Are you sure want to remove the verse from bookmark?
          </div>

          <div className={styles.buttons}>
            <button
              className={`${styles.btn} ${styles.btn_remove}`}
              onClick={handleRemoveBookmark}
            >
              Remove
            </button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
