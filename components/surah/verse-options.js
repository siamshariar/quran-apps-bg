import { useState, useEffect, useContext } from "react";
import { AudioPlayerContext } from "../../contexts/AudioPlayerContext";
import { PinContext } from "../../contexts/PinContext";
import { BookmarkContext } from "../../contexts/BookmarkContext";
import { config, server } from "../../lib/config";
import Popover from "@mui/material/Popover";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import AddBookmark from "../bookmark/add";
import RemoveBookmark from "../bookmark/remove";
import BookmarkIcon from "../icons/Bookmark";
import BookmarkBorder from "../icons/BookmarkBorder";
import MoreIcon from "../icons/MoreVert";
import PlayIcon from "../icons/PlayArrow";
import PauseIcon from "../icons/Pause";
import FileCopyIcon from "../icons/FileCopy";
import ShareIcon from "../icons/Share";
import LinkIcon from "../icons/Link";
import PrintIcon from "../icons/Print";
import UnpinIcon from "../icons/Pin";
import PinIcon from "../icons/PinOutline";
import Share from "../core/share";
import { useReactToPrint } from 'react-to-print';
import styles from "./verse-options.module.scss";

export default function VerseOptions({
  index,
  chapterNumber,
  chapterName,
  chapterSlug,
  verseNumber,
  ayaArabic,
  translation,
  footnotes,
  printRef,
  updateBookmarksData,
  isBookmarkPage
}) {
  const { playing, currentIndex, play, pause, audioType } =
    useContext(AudioPlayerContext);

  const playingThisVerse =
    playing && audioType === "verse" && currentIndex === index;

  const controlPlay = () => {
    play(index, "verse");
    handlePopoverClose();
  };

  const controlPause = () => {
    pause();
    handlePopoverClose();
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  //snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      let path = window.location.pathname;
      // let parts = path.split("/");
      let url = `${server}/chapters/${chapterSlug}/verses/${verseNumber}`;

      // if (parts.length === 3 && parts[1] === "chapters") {
      //   url = `${server}/chapters/${chapterSlug}#verse-${verseNumber}`;
      // } else if (
      //   parts.length === 5 &&
      //   parts[1] === "chapters" &&
      //   parts[3] === "verses"
      // ) {
      //   url = `${server}/chapters/${chapterSlug}/verses/${verseNumber}`;
      // } else {
      //   url = `${server}/chapters/${chapterSlug}/verses/${verseNumber}`;
      // }

      navigator.clipboard.writeText(url);
      handlePopoverClose();
      setSnackbarOpen(true);
    }
  };

  const handleCopyFile = () => {
    if (typeof window !== "undefined") {
      let path = window.location.pathname;
      // let parts = path.split("/");
      let url = `${server}/chapters/${chapterSlug}/verses/${verseNumber}`;

      // if (parts.length === 3 && parts[1] === "chapters") {
      //   url = `${server}/chapters/${chapterSlug}#verse-${verseNumber}`;
      // } else if (
      //   parts.length === 5 &&
      //   parts[1] === "chapters" &&
      //   parts[3] === "verses"
      // ) {
      //   url = `${server}/chapters/${chapterSlug}/verses/${verseNumber}`;
      // } else {
      //   url = `${server}/chapters/${chapterSlug}/verses/${verseNumber}`;
      // }

      let file = `[Chapter ${chapterName} : Verse ${verseNumber}]\n\n${ayaArabic}\n\n${translation}\n\n${footnotes}\n\n${url}`;

      navigator.clipboard.writeText(file);
      handlePopoverClose();
      setSnackbarOpen(true);
    }
  };

  // share option
  const [shareOpen, setShareOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [shareTitle, setShareTitle] = useState("");

  const handleShareClose = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setShareOpen(open);
  };

  const handleWebShare = () => {
    handlePopoverClose();

    const url = `${server}/chapters/${chapterSlug}/verses/${verseNumber}`;
    const title = "Chapter " + chapterName + " : Verse " + verseNumber + ` | ${config?.quranInLocal} | ${config?.metaDescription} | ${config?.metaTitle}`;

    setShareUrl(url);
    setShareTitle(title);
    setShareOpen(true);
  };

  const handleMobileShare = () => {
    handlePopoverClose();

    const url = `${server}/chapters/${chapterSlug}/verses/${verseNumber}`;
    const title = "Chapter " + chapterName + " : Verse " + verseNumber + ` | ${config?.quranInLocal} | ${config?.metaDescription} | ${config?.metaTitle}`;

    if (navigator.share) {
      navigator.share({
        title: title,
        url: url,
      });
      // .then(() => {
      //     console.log('thanks for sharing')
      // })
      // .catch(console.error)
    } else {
      //console.log('not supported')
      setShareUrl(url);
      setShareTitle(title);
      setShareOpen(true);
    }
  };

  // bookmarks
  const { bookmarks } = useContext(BookmarkContext);
  const [isBookmarked, setIsBookmarked] = useState(true);
  const [bookmarkKey, setBookmarkKey] = useState("");

  const checkVerseBookmarked = (arr, chapter, verse) => {
    return arr.some((el) => {
      return el.chapter == chapter && el.verse == verse;
    });
  };

  useEffect(() => {
    for (let [key, value] of Object.entries(bookmarks)) {
      if (checkVerseBookmarked(value.entry, chapterNumber, verseNumber)) {
        setIsBookmarked(true);
        setBookmarkKey(key)
        break;
      } else {
        setIsBookmarked(false);
      }
    }
  }, [bookmarks, anchorEl]);

  const [addBookmarkOpen, setAddBookmarkOpen] = useState(false);
  const [removeBookmarkOpen, setRemoveBookmarkOpen] = useState(false);

  const handleAddBookmark = () => {
    handlePopoverClose();
    setAddBookmarkOpen(true);
  };

  const handleRemoveBookmark = () => {
    handlePopoverClose();
    setRemoveBookmarkOpen(true);
  };

  const handleBookmarkClose = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setAddBookmarkOpen(open);
    setRemoveBookmarkOpen(open);
  };

  // pin options
  const checkPinnedThisVerse = (arr, chapter, verse) => {
    return arr.some((el) => el.chapter == chapter && el.verse == verse);
  };

  const { pin, addPin, removePin } = useContext(PinContext);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    checkPinnedThisVerse(pin, chapterNumber, verseNumber)
      ? setIsPinned(true)
      : setIsPinned(false);
  }, [pin, verseNumber]);

  const handleAddPin = () => {
    addPin(chapterNumber, chapterName, chapterSlug, verseNumber);
    handlePopoverClose();
  };

  const handleRemovePin = () => {
    removePin(chapterNumber, verseNumber);
    handlePopoverClose();
  };

  // print option
  const pageStyle = `
    @page {
      size: auto;
      margin: 20mm;
    }
  `;

  const handlePrint = useReactToPrint({
    content: () => printRef,
    documentTitle: chapterName,
    pageStyle: pageStyle,
    onBeforeGetContent: () => handlePopoverClose(),
    removeAfterPrint: true
  });

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.id}>
            {chapterNumber}
            <span> : </span>
            {verseNumber}
          </div>
          {isPinned && (
            <span className={styles.pinned}>
              <UnpinIcon />
            </span>
          )}
        </div>

        <div className={styles.right}>
          <div className={styles.action}>
            <IconButton
              className={styles.more_icon}
              onClick={handlePopoverOpen}
              focusRipple={false}
            >
              <MoreIcon />
            </IconButton>

            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              disableScrollLock={true}
              classes={{ paper: styles.custom_paper }}
            >
              <MenuList>
                {playingThisVerse && (
                  <MenuItem onClick={controlPause}>
                    <span className={styles.icon}>
                      <PauseIcon />
                    </span>
                    <span className={styles.text}>Pause</span>
                  </MenuItem>
                )}

                {!playingThisVerse && (
                  <MenuItem onClick={controlPlay}>
                    <span className={styles.icon}>
                      <PlayIcon />
                    </span>
                    <span className={styles.text}>Play</span>
                  </MenuItem>
                )}

                <MenuItem
                  classes={{
                    root: styles.mobile_share,
                  }}
                  onClick={() => handleMobileShare()}
                >
                  <span className={styles.icon}>
                    <ShareIcon />
                  </span>
                  <span className={styles.text}>Share</span>
                </MenuItem>

                <MenuItem
                  classes={{
                    root: styles.web_share,
                  }}
                  onClick={() => handleWebShare()}
                >
                  <span className={styles.icon}>
                    <ShareIcon />
                  </span>
                  <span className={styles.text}>Share</span>
                </MenuItem>

                {isBookmarked && (
                  <MenuItem onClick={handleRemoveBookmark}>
                    <span className={styles.icon}>
                      <BookmarkIcon />
                    </span>
                    <span className={styles.text}>Remove bookmark</span>
                  </MenuItem>
                )}

                {!isBookmarked && (
                  <MenuItem onClick={handleAddBookmark}>
                    <span className={styles.icon}>
                      <BookmarkBorder />
                    </span>
                    <span className={styles.text}>Bookmark</span>
                  </MenuItem>
                )}

                {!isPinned && (
                  <MenuItem onClick={() => handleAddPin()}>
                    <span className={styles.icon}>
                      <PinIcon />
                    </span>
                    <span className={styles.text}>Pin</span>
                  </MenuItem>
                )}

                {isPinned && (
                  <MenuItem onClick={() => handleRemovePin()}>
                    <span className={styles.icon}>
                      <UnpinIcon />
                    </span>
                    <span className={styles.text}>Unpin</span>
                  </MenuItem>
                )}

                <MenuItem onClick={handleCopyFile}>
                  <span className={styles.icon}>
                    <FileCopyIcon />
                  </span>
                  <span className={styles.text}>Copy Verse</span>
                </MenuItem>

                <MenuItem onClick={handleCopyLink}>
                  <span className={styles.icon}>
                    <LinkIcon />
                  </span>
                  <span className={styles.text}>Copy Link</span>
                </MenuItem>

                {/*<MenuItem onClick={handlePrint}>*/}
                {/*  <span className={styles.icon}>*/}
                {/*    <PrintIcon />*/}
                {/*  </span>*/}
                {/*  <span className={styles.text}>Print</span>*/}
                {/*</MenuItem>*/}
              </MenuList>
            </Popover>
          </div>
        </div>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Đã được copy"
        classes={{
          root: styles.snackbar
        }}
      />

      <Share
        open={shareOpen}
        closer={handleShareClose}
        url={shareUrl}
        title={shareTitle}
      />

      <AddBookmark
        open={addBookmarkOpen}
        closer={handleBookmarkClose}
        chapter={chapterNumber}
        verse={verseNumber}
      />

      <RemoveBookmark
        open={removeBookmarkOpen}
        closer={handleBookmarkClose}
        chapter={chapterNumber}
        verse={verseNumber}
        updateBookmarksData={updateBookmarksData}
        bookmarkKey={bookmarkKey}
        isBookmarkPage={isBookmarkPage}
      />
    </>
  );
}
