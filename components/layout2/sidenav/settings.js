import Scrollbar from '../../core/scrollbar'
import SettingsContent from '../../settings'
import CloseIcon from '../../icons/Close'
import { t } from '../../../lib/config'
import styles from './settings.module.scss'

export default function Settings({ open, controller, expandedSetting }) {
	return (
        <Scrollbar className={open ? `${styles.sidenav} ${styles.open}` : styles.sidenav}>
            <span
                className={styles.close}
                onClick={controller(false)}
            >
                <CloseIcon />
            </span>

            <div className={styles.title}>
                <h2>{t('Settings')}</h2>
                <h4>{t('Change your app setting.')}</h4>
            </div>

            <div className={styles.content}>
                <SettingsContent defaultExpanded={expandedSetting}/>
            </div>
		</Scrollbar>
	)
}