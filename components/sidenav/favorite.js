import { useState } from 'react'
import Link from 'next/link'
import Drawer from '@mui/material/Drawer'
import Close from '../icons/Close'
import Search from '../icons/Search'
import styles from './favorite.module.scss'
import css from './style.module.scss'

export default function Favorite({ open, controller }) {
	return (
		<Drawer
			anchor="left"
			open={open}
			onClose={controller(false)}
		>
			<div className={css.sidenav}>
				<span
					className={styles.close}
					onClick={controller(false)}
				>
					<Close />
				</span>

				<div className={css.title}>
					<h3 className="heading-b">Favorite</h3>
				</div>

				<div className={css.scroller}>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod enim, ipsa tempora hic distinctio in et? Assumenda ducimus cum autem, illo, veniam sequi fugiat, aperiam odio laudantium labore perspiciatis pariatur?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod enim, ipsa tempora
				</div>
			</div>
		</Drawer>
	)
}