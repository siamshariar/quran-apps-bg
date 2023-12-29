import GoToVerse from "../../mobile/go-to-verse";
import { useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { SidenavContext } from "../../../contexts/SidenavContext";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "../../core/container";
import Brightness4Icon from "../../icons/Brightness4";
import Brightness7Icon from "../../icons/Brightness7";
import MoreVertIcon from "../../icons/MoreVert";
import NearMeIcon from "../../icons/NearMeOutlined";
import SubtitlesIcon from "../../icons/SubtitlesOutlined";
import FavoriteBorderIcon from "../../icons/FavoriteBorder";
import BookmarkBorderIcon from "../../icons/BookmarkBorder";
import DownloadIcon from "../../icons/FileDownload";
import InfoIcon from "../../icons/Info";
import PinOutlineIcon from "../../icons/PinOutline";
import AutoStoriesIcon from "../../icons/AutoStories";
import FormatListBulletedIcon from "../../icons/FormatListBulleted";
import SettingsIcon from "../../icons/SettingsOutlined";
import styles from "./header.module.scss";
import Names99Icon from "../../icons/Names99";
import Modal from "../../utils/ModalPrimary";
import ChapterList from "./chapter-list";
import Settings from "../../settings";
import BookmarkList from "../../bookmark/list";
import PinList from "../../pin/list";
import LastReadList from "../../last-read/list";
import { config } from "../../../lib/config";

export default function HeaderWeb({
  page,
  chapters,
  isChapterPage,
  hasSidenav,
}) {
  const { bookmarkOpen, changeBookmarkOpen } = useContext(SidenavContext);
  // const router = useRouter();

  const handleSidenav = (e, tab) => {
    e.preventDefault();
    handleClose();
    if (!hasSidenav) {
      // changeBookmarkOpen(tab);
      // router.push(`/chapters/1-al-fatihah`);
      return;
    }
    changeBookmarkOpen(tab);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalContent, setModalContent] = useState(null);

  const handleModalClose = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setModalOpen(open);
  };

  const handleItem = (e, item, title) => {
    e.preventDefault();
    handleClose();
    setModalTitle(title);
    setModalContent(item);
    setModalOpen(true);
  };

  const { theme, changeTheme } = useContext(SettingsContext);

  const modeSwitcher = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    changeTheme(newTheme);
  };

  const header = useRef(null);
  const [offset, setOffset] = useState(0);
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);

    window.onscroll = () => {
      setOffset(window.pageYOffset);
    };
    if (offset > 5) {
      header.current.classList.add(styles.scrolled);
    } else {
      header.current.classList.remove(styles.scrolled);
    }

    return () => setDidMount(false);
  }, [offset]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // go to verse option
  const [goToVerseOpen, setGoToVerseOpen] = useState(false);
  // const [goToVerseInit, setGoToVerseInit] = useState(false)
  // const [goToVerseData, setGoToVerseData] = useState([])

  const handleGoToVerseModal = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    handleClose();

    setGoToVerseOpen(open);

    // if (!goToVerseInit) {
    //     getChaptersInfo().then(res => {
    //         setGoToVerseData(res)

    //         setTimeout(() => {
    //             setGoToVerseInit(true)
    //         }, 0)
    //     })
    // }
  };

  return (
    <>
      <div className={`${styles.header} ${styles[page]}`} ref={header}>
        <Container>
          <div className={styles.inner}>
            <div className={styles.left}>
              {theme === "light" && (
                <Link href="/">
                  <a className={`${styles.logo} ${styles.logo_normal}`}>
                    <Image
                      src={`/img/logo/${config?.localizationCode}/logo.png`}
                      alt=""
                      width={122}
                      height={26}
                      loading="eager"
                      objectFit="contain"
                    />
                  </a>
                </Link>
              )}

              {theme === "light" && (
                <Link href="/">
                  <a className={`${styles.logo} ${styles.logo_white}`}>
                    <Image
                      src={`/img/logo/${config?.localizationCode}/logo_full_white.png`}
                      alt=""
                      width={122}
                      height={26}
                      loading="eager"
                      objectFit="contain"
                    />
                  </a>
                </Link>
              )}

              {theme !== "light" && (
                <Link href="/">
                  <a className={`${styles.logo} ${styles.logo_full_white}`}>
                    <Image
                      src={`/img/logo/${config?.localizationCode}/logo_full_white.png`}
                      alt=""
                      width={122}
                      height={26}
                      loading="eager"
                      objectFit="contain"
                    />
                  </a>
                </Link>
              )}
            </div>

            <div className={styles.right}>
              <IconButton className={styles.btn} onClick={() => modeSwitcher()}>
                {theme === "light" && <Brightness4Icon />}
                {theme !== "light" && <Brightness7Icon />}
              </IconButton>

              <IconButton className={styles.btn} onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>

              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                disableScrollLock={true}
              >
                <MenuList className={styles.menu}>
                  <MenuItem onClick={handleGoToVerseModal(true)}>
                    <span className={styles.icon}>
                      <NearMeIcon />
                    </span>
                    <span className={styles.text}>Go To Verse</span>
                  </MenuItem>
                  <Link href="/names-of-allah">
                    <MenuItem onClick={handleClose}>
                      <a className={styles.link}>
                        <span className={styles.icon}>
                          <Names99Icon />
                        </span>
                        <span className={styles.text}>Names of Allah</span>
                      </a>
                    </MenuItem>
                  </Link>
                  <Link href="/subjective">
                    <MenuItem onClick={handleClose}>
                      <a className={styles.link}>
                        <span className={styles.icon}>
                          <SubtitlesIcon />
                        </span>
                        <span className={styles.text}>Subjective</span>
                      </a>
                    </MenuItem>
                  </Link>

                  {!hasSidenav && (
                    <MenuItem
                      onClick={(e) =>
                        handleItem(
                          e,
                          <ChapterList
                            chapterList={chapters}
                            controller={handleModalClose}
                          />,
                          "Chapters"
                        )
                      }
                    >
                      <span className={styles.icon}>
                        <FormatListBulletedIcon />
                      </span>
                      <span className={styles.text}>Chapters</span>
                    </MenuItem>
                  )}

                  {hasSidenav ? (
                    <MenuItem onClick={(e) => handleSidenav(e, 1)}>
                      <a className={styles.link}>
                        <span className={styles.icon}>
                          <BookmarkBorderIcon />
                        </span>
                        <span className={styles.text}>Bookmarks</span>
                      </a>
                    </MenuItem>
                  ) : (
                    <MenuItem
                      onClick={(e) =>
                        handleItem(
                          e,
                          <BookmarkList controller={handleModalClose} />,
                          "Bookmarks"
                        )
                      }
                    >
                      <span className={styles.icon}>
                        <BookmarkBorderIcon />
                      </span>
                      <span className={styles.text}>Bookmarks</span>
                    </MenuItem>
                  )}

                  {hasSidenav ? (
                    <MenuItem onClick={(e) => handleSidenav(e, 2)}>
                      <a className={styles.link}>
                        <span className={styles.icon}>
                          <PinOutlineIcon />
                        </span>
                        <span className={styles.text}>Pin</span>
                      </a>
                    </MenuItem>
                  ) : (
                    <MenuItem
                      onClick={(e) =>
                        handleItem(
                          e,
                          <PinList controller={handleModalClose} />,
                          "Pin"
                        )
                      }
                    >
                      <span className={styles.icon}>
                        <PinOutlineIcon />
                      </span>
                      <span className={styles.text}>Pin</span>
                    </MenuItem>
                  )}

                  {hasSidenav ? (
                    <MenuItem onClick={(e) => handleSidenav(e, 3)}>
                      <a className={styles.link}>
                        <span className={styles.icon}>
                          <AutoStoriesIcon />
                        </span>
                        <span className={styles.text}>Last Read</span>
                      </a>
                    </MenuItem>
                  ) : (
                    <MenuItem
                      onClick={(e) =>
                        handleItem(
                          e,
                          <LastReadList controller={handleModalClose} />,
                          "Last Read"
                        )
                      }
                    >
                      <span className={styles.icon}>
                        <AutoStoriesIcon />
                      </span>
                      <span className={styles.text}>Last Read</span>
                    </MenuItem>
                  )}

                  {/* <Link href="/bookmark"></Link> */}

                  <Link href="/download">
                    <MenuItem onClick={handleClose}>
                      <a className={styles.link}>
                        <span className={styles.icon}>
                          <DownloadIcon />
                        </span>
                        <span className={styles.text}>Download</span>
                      </a>
                    </MenuItem>
                  </Link>
                  <Link href="/about">
                    <MenuItem onClick={handleClose}>
                      <a className={styles.link}>
                        <span className={styles.icon}>
                          <InfoIcon />
                        </span>
                        <span className={styles.text}>About</span>
                      </a>
                    </MenuItem>
                  </Link>
                  {!hasSidenav && (
                    <MenuItem
                      onClick={(e) => handleItem(e, <Settings />, "Settings")}
                    >
                      <span className={styles.icon}>
                        <SettingsIcon />
                      </span>
                      <span className={styles.text}>Settings</span>
                    </MenuItem>
                  )}
                </MenuList>
              </Popover>
            </div>
          </div>
        </Container>
      </div>

      <GoToVerse
        open={goToVerseOpen}
        controller={handleGoToVerseModal}
        chapters={chapters}
      />
      <Modal
        open={modalOpen}
        closer={handleModalClose}
        title={modalTitle}
        content={modalContent}
      />
    </>
  );
}
