import Drawer from '@mui/material/Drawer'
import Scrollbar from '../core/scrollbar'
import SettingsContent from '../settings'
import Close from '../icons/Close'
import styles from './settings.module.scss'
import css from './style.module.scss'

export default function Settings({ open, controller }) {
	return (
		<Drawer
			anchor="left"
			open={open}
			onClose={controller(false)}
		>
			<Scrollbar className={css.sidenav}>
				<span
					className={css.close}
					onClick={controller(false)}
				>
					<Close />
				</span>

				<div className={`${css.title} ${styles.title}`}>
					<h2>Settings</h2>
					<h4>Change your app setting.</h4>
				</div>

				<div className={styles.content}>
					<SettingsContent />
				</div>
			</Scrollbar>
		</Drawer>
	)
}