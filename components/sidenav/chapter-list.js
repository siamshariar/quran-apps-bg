import { useState } from 'react'
import Link from 'next/link'
import Drawer from '@material-ui/core/Drawer'
import Scrollbar from '../core/scrollbar'
import Close from '../icons/Close'
import Search from '../icons/Search'

import styles from './chapter-list.module.scss'
import css from './style.module.scss'

export default function ChapterList({ chapterList, open, controller }) {
	const [chapters, setChapters] = useState(chapterList)

	const filterChapters = search => {
		const filtered = chapterList.filter(chapter => {
			return (chapter.name.toLowerCase().includes(search.toLowerCase()) || chapter.chapterNo.toString().includes(search))
		})
		setChapters(filtered)
	}

	return (
		<Drawer
			anchor="left"
			open={open}
			onClose={controller(false)}
		>
			<div className={css.sidenav}>
				<span
					className={css.close}
					onClick={controller(false)}
				>
					<Close />
				</span>

				<div className={css.title}>
					<h2>Chapters</h2>
				</div>

				<form className={styles.search}>
					<input
						type="text"
						name="chapter-search"
						placeholder="Search Chapter"
						onChange={e => filterChapters(e.target.value)}
					/>
					<Search />
				</form>

				<Scrollbar className={styles.lists}>
				{chapters.map(chapter =>
					<div
						key={chapter.chapterNo}
						className={styles.list}
					>
            {/* To Do: update link with verse mode */}
						<Link href={"/chapters/" + chapter.slug}>
							<a onClick={controller(false)}>
								<span className={styles.number}>{chapter.chapterNo}</span>

								<div className={styles.name}>
									<span>{chapter.name}</span>
									<span>{chapter.meaning}</span>
								</div>
							</a>
						</Link>
					</div>
				)}
				</Scrollbar>
			</div>
		</Drawer>
	)
}
