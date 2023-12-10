import Scrollbar from '../../core/scrollbar'
import SettingsContent from '../../settings'
import CloseIcon from '../../icons/Close'
import styles from './settings.module.scss'

export default function Settings({ open, controller }) {
	return (
        <Scrollbar className={open ? `${styles.sidenav} ${styles.open}` : styles.sidenav}>
            <span
                className={styles.close}
                onClick={controller(false)}
            >
                <CloseIcon />
            </span>

            <div className={styles.title}>
                <h2>Settings</h2>
                <h4>Change your app setting.</h4>
            </div>

            <div className={styles.content}>
                <SettingsContent />
            </div>
		</Scrollbar>
	)
}