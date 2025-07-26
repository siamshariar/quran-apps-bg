import { useState, useEffect, useRef, useContext } from "react";
import { SidenavContext } from "../../../contexts/SidenavContext";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import ChapterList from "./chapter-list";
import Save from "./save";
import Settings from "./settings";
import FormatListBulletedIcon from "../../icons/FormatListBulleted";
import SubjectIcon from "../../icons/Subject";
import SaveIcon from "../../icons/Save";
import SettingsIcon from "../../icons/SettingsOutlined";
import styles from "./index.module.scss";
import { t } from "../../../lib/config";

export default function Sidenav({ chapters, headerVisible = true, scrollDirection = "up", marginTop = 24 }) {
  const { bookmarkOpen, changeBookmarkOpen } = useContext(SidenavContext);

  const [chapterListOpen, updateChapterListOpen] = useState(false);
  const [settingsOpen, updateSettingsOpen] = useState(false);
  const [expandedSetting, setExpandedSetting] = useState(null);
  // const [saveOpen, updateSaveOpen] = useState(false);
  const [sidenavStyle, setSidenavStyle] = useState({});

  const refChapters = useRef(null);
  const refSave = useRef(null);
  const refSettings = useRef(null);

  useEffect(() => {
    setSidenavStyle({
      top: `${marginTop}px`,
      transition: "top 0.3s ease-in-out",
    })
  }, [marginTop, headerVisible, scrollDirection])

  const handler = (event) => {
    if (
      !refChapters.current.contains(event.target) &&
      !refSettings.current.contains(event.target) &&
      !refSave.current.contains(event.target)
    ) {
      updateChapterListOpen(false);
      updateSettingsOpen(false);
      changeBookmarkOpen(false);
      setExpandedSetting(null);
    }
  };

  const escapeHandler = (event) => {
    if (event.key === "Escape") {
      updateChapterListOpen(false);
      updateSettingsOpen(false);
      changeBookmarkOpen(false);
      setExpandedSetting(null);
    }
  };

  useEffect(() => {
    const handleOpenSettings = (event) => {
      const { open, expandedSetting } = event.detail;
      if (open) {
        updateChapterListOpen(false);
        changeBookmarkOpen(false);
      }
      updateSettingsOpen(open);
      if (expandedSetting) {
        setExpandedSetting(expandedSetting);
      }
    };

    const handleOpenSidenavSettings = (event) => {
      console.log("handleOpenSidenavSettings event received:", event.detail)
      const { open, expandedSetting } = event.detail
      if (open) {
        updateChapterListOpen(false)
        changeBookmarkOpen(false)
      }
      updateSettingsOpen(open)
      if (expandedSetting) {
        setExpandedSetting(expandedSetting)
      }
    }

    if (typeof window !== 'undefined') {
      document.addEventListener("openSettings", handleOpenSettings);
      document.addEventListener("openSidenavSettings", handleOpenSidenavSettings);
      document.body.addEventListener("mousedown", handler);
      document.addEventListener("keydown", escapeHandler);
      return () => {
        document.removeEventListener("openSettings", handleOpenSettings);
        document.removeEventListener("openSidenavSettings", handleOpenSidenavSettings);
        document.body.removeEventListener("mousedown", handler);
        document.removeEventListener("keydown", escapeHandler);
      };
    }
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
      setExpandedSetting(null);
    }
    updateSettingsOpen(open);
    if (!open) {
      setExpandedSetting(null);
    }
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
    <div className={styles.sidenav} style={sidenavStyle}>
      <ul className={styles.menu}>
        <li className={chapterListOpen ? styles.open : ""} ref={refChapters}>
          <Tooltip
            title={t('Chapter List')}
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
            chapter={chapters}
            open={chapterListOpen}
            controller={controlChapterListNav}
          />
        </li>

        <li className={bookmarkOpen ? styles.open : ""} ref={refSave}>
          <Tooltip
            title={t('Bookmarks and Pin')}
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
            title={t('Subjective')}
            arrow
            placement="right"
            disableFocusListener={true}
          >
            <span className={styles.icon}>
              <Link href="/subjective" legacyBehavior>
                <a>
                  <SubjectIcon />
                </a>
              </Link>
            </span>
          </Tooltip>
        </li>

        <li className={settingsOpen ? styles.open : ""} ref={refSettings}>
          <Tooltip
            title={t('Settings')}
            arrow
            placement="right"
            disableFocusListener={true}
          >
            <span className={styles.icon} onClick={controlSettingsNav(true)}>
              <SettingsIcon />
            </span>
          </Tooltip>

          <Settings 
            open={settingsOpen} 
            controller={controlSettingsNav} 
            expandedSetting={expandedSetting}
          />
        </li>
      </ul>
    </div>
  );
}
