import { useState, useEffect, useRef, useContext } from "react";
import { SidenavContext } from "../../../contexts/SidenavContext";
import Link from "next/link";
import Tooltip from "@material-ui/core/Tooltip";
import ChapterList from "./chapter-list";
import Save from "./save";
import Settings from "./settings";
import FormatListBulletedIcon from "../../icons/FormatListBulleted";
import SubjectIcon from "../../icons/Subject";
import SaveIcon from "../../icons/Save";
import SettingsIcon from "../../icons/SettingsOutlined";
import styles from "./index.module.scss";

export default function Sidenav({ chapters }) {
  const { bookmarkOpen, changeBookmarkOpen } = useContext(SidenavContext);

  const [chapterListOpen, updateChapterListOpen] = useState(false);
  const [settingsOpen, updateSettingsOpen] = useState(false);
  // const [saveOpen, updateSaveOpen] = useState(false);

  const refChapters = useRef(null);
  const refSave = useRef(null);
  const refSettings = useRef(null);

  const handler = (event) => {
    if (
      !refChapters.current.contains(event.target) &&
      !refSettings.current.contains(event.target) &&
      !refSave.current.contains(event.target)
    ) {
      updateChapterListOpen(false);
      updateSettingsOpen(false);
      changeBookmarkOpen(false);
    }
  };

  const escapeHandler = (event) => {
    if (event.key === "Escape") {
      updateChapterListOpen(false);
      updateSettingsOpen(false);
      changeBookmarkOpen(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("mousedown", handler);
    document.addEventListener("keydown", escapeHandler);
    return () => {
      document.body.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", escapeHandler);
    };
  }, [refChapters, refSettings, refSave]);

  const controlChapterListNav = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (open) {
      updateSettingsOpen(false);
      changeBookmarkOpen(false);
    }
    updateChapterListOpen(open);
  };

  const controlSettingsNav = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (open) {
      updateChapterListOpen(false);
      changeBookmarkOpen(false);
    }
    updateSettingsOpen(open);
  };

  const controlSaveNav = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (open) {
      updateChapterListOpen(false);
      updateSettingsOpen(false);
    }
    changeBookmarkOpen(open);
  };

  return (
    <div className={styles.sidenav}>
      <ul className={styles.menu}>
        <li className={chapterListOpen ? styles.open : ""} ref={refChapters}>
          <Tooltip
            title="Chapter List"
            arrow
            placement="right"
            disableFocusListener={true}
          >
            <span className={styles.icon} onClick={controlChapterListNav(true)}>
              <FormatListBulletedIcon />
            </span>
          </Tooltip>

          <ChapterList
            chapterList={chapters}
            open={chapterListOpen}
            controller={controlChapterListNav}
          />
        </li>

        <li className={bookmarkOpen ? styles.open : ""} ref={refSave}>
          <Tooltip
            title="Bookmarks and Pin"
            arrow
            placement="right"
            disableFocusListener={true}
          >
            <span className={styles.icon} onClick={controlSaveNav(true)}>
              <SaveIcon />
            </span>
          </Tooltip>

          <Save open={bookmarkOpen} controller={controlSaveNav} />
        </li>

        <li>
          <Tooltip
            title="Subjective"
            arrow
            placement="right"
            disableFocusListener={true}
          >
            <span className={styles.icon}>
              <Link href="/subjective">
                <a>
                  <SubjectIcon />
                </a>
              </Link>
            </span>
          </Tooltip>
        </li>

        <li className={settingsOpen ? styles.open : ""} ref={refSettings}>
          <Tooltip
            title="Settings"
            arrow
            placement="right"
            disableFocusListener={true}
          >
            <span className={styles.icon} onClick={controlSettingsNav(true)}>
              <SettingsIcon />
            </span>
          </Tooltip>

          <Settings open={settingsOpen} controller={controlSettingsNav} />
        </li>
      </ul>
    </div>
  );
}
