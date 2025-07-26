import { useState, useEffect, useRef } from "react"
import Scrollbar from '../../core/scrollbar'
import SettingsContent from '../../settings'
import CloseIcon from '../../icons/Close'
import { t } from '../../../lib/config'
import styles from './settings.module.scss'

export default function Settings({ open, controller, expandedSetting, showTranslationModal = false, onShowTranslationModal }) {
  const [internalShowTranslationModal, setInternalShowTranslationModal] = useState(false)
  const scrollbarRef = useRef(null);

  useEffect(() => {
    const handleOpenSidenavSettings = (event) => {
      if (event.detail?.open && event.detail?.expandedSetting === "translation") {
        setInternalShowTranslationModal(true);
      }
    };
    document.addEventListener("openSidenavSettings", handleOpenSidenavSettings);
    return () => {
      document.removeEventListener("openSidenavSettings", handleOpenSidenavSettings);
    };
  }, []);

  useEffect(() => {
    if (showTranslationModal !== internalShowTranslationModal) {
      setInternalShowTranslationModal(showTranslationModal);
    }
  }, [showTranslationModal]);

  useEffect(() => {
    if (onShowTranslationModal) {
      onShowTranslationModal(internalShowTranslationModal);
    }
  }, [internalShowTranslationModal, onShowTranslationModal]);

  useEffect(() => {
    if (!open) {
      setInternalShowTranslationModal(false)
    } else {
      if (scrollbarRef.current) {
        scrollbarRef.current.scrollToTop();
      }
    }
  }, [open])

  const getTitle = () => {
    if (internalShowTranslationModal) {
      return null
    }
    return (
      <div className={styles.title}>
        <h2>{t("Settings")}</h2>
        <h4>{t("Change your app setting.")}</h4>
      </div>
    )
  }

  return (
    <Scrollbar ref={scrollbarRef} className={open ? `${styles.sidenav} ${styles.open}` : styles.sidenav}>
      <span 
            className={styles.close}
             onClick={controller(false)}
             >
        <CloseIcon />
      </span>

      {getTitle()}

      <div className={styles.content}>
        <SettingsContent
          defaultExpanded={expandedSetting}
          showTranslationModal={internalShowTranslationModal}
          onShowTranslationModal={setInternalShowTranslationModal}
        />
      </div>
    </Scrollbar>
  )
}