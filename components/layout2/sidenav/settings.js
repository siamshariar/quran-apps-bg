import { useState, useEffect } from "react"
import Scrollbar from '../../core/scrollbar'
import SettingsContent from '../../settings'
import CloseIcon from '../../icons/Close'
import { t } from '../../../lib/config'
import styles from './settings.module.scss'

export default function Settings({ open, controller, expandedSetting }) {
  const [showTranslationModal, setShowTranslationModal] = useState(false)

  useEffect(() => {
    if (!open) {
      setShowTranslationModal(false)
    }
  }, [open])

  const getTitle = () => {
    if (showTranslationModal) {
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
        <Scrollbar className={open ? `${styles.sidenav} ${styles.open}` : styles.sidenav}>
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
                showTranslationModal={showTranslationModal}
                onShowTranslationModal={setShowTranslationModal}
              />
            </div>
		</Scrollbar>
	)
}