import { useContext } from "react";
import { BookmarkContext } from "../../contexts/BookmarkContext";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import CloseIcon from "../icons/Close";
import styles from "./modal.module.scss";

export default function DeleteBookmark({ open, closer, bookmarkKey }) {
  const { bookmarks, changeBookmarks } = useContext(BookmarkContext);

  const checkKeyExists = (obj, key) => {
    return Object.keys(obj).some((el) => {
      return el === key;
    });
  };

  const elementRemove = (obj, key) => {
    delete obj[key];
    return obj;
  };

  const handleDeleteBookmark = (e) => {
    if (checkKeyExists(bookmarks, bookmarkKey)) {
      let newBookmarks = bookmarks;
      newBookmarks = elementRemove(newBookmarks, bookmarkKey);
      changeBookmarks(newBookmarks);
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

          <h2 className={styles.title}>Delete bookmark?</h2>
          <div className={styles.title_desc}>
            Are you sure you want to delete the bookmark?
          </div>

          <div className={styles.buttons}>
            <button
              className={`${styles.btn} ${styles.btn_remove}`}
              onClick={handleDeleteBookmark}
            >
              Delete
            </button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
