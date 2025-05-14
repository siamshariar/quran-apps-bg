import { useState, useRef, useContext } from 'react'
import { SettingsContext } from '../../../contexts/SettingsContext'
import Link from 'next/link'
import Scrollbar from '../../core/scrollbar'
import CloseIcon from '../../icons/Close'
import SearchIcon from '../../icons/Search'
import styles from './chapter-list.module.scss'

export default function ChapterList({ chapterList, open, controller }) {
  const { verseMode } = useContext(SettingsContext)

	const [chapters, setChapters] = useState(chapterList)
	const filterChapters = search => {
		const filtered = chapterList.filter(chapter => {
			return (chapter.name.toLowerCase().includes(search.toLowerCase()) || chapter.chapterNo.toString().includes(search))
		})
		setChapters(filtered)
	}

    const input = useRef(null)
    const [searchOpen, setSearchOpen] = useState(false)

    const handleSearchOpen = open => event => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return
		}
        if (open) {
            input.current.focus()
        }
        else {
            setChapters(chapterList)
            input.current.value = ''
        }
		setSearchOpen(open)
	}

	return (
        <Scrollbar className={open ? `${styles.sidenav} ${styles.open}` : styles.sidenav}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <div className={styles.left}>
                        <div className={styles.title}>
                            <h2>Chapters</h2>
                        </div>
                    </div>

                    <div className={styles.right}>
                        <span
                            className={styles.icon}
                            onClick={handleSearchOpen(true)}
                        >
                            <SearchIcon />
                        </span>
                        <span
                            className={styles.icon}
                            onClick={controller(false)}
                        >
                            <CloseIcon />
                        </span>
                    </div>

                    <div className={searchOpen ? `${styles.search} ${styles.open}` : styles.search}>
                        <input
                            type="text"
                            name="chapter-search"
                            placeholder="Search Chapter"
                            onChange={e => filterChapters(e.target.value)}
                            ref={input}
                        />
                        <span onClick={handleSearchOpen(false)}>
                            <CloseIcon />
                        </span>
                    </div>
                </div>

                <div className={styles.lists}>
                {chapters.map(chapter =>
                    <Link
                        key={chapter.chapterNo}
                        // href={verseMode === "scroll" ? `/chapters/${chapter.slug}` : verseMode === "slide" ? `/chapters/${chapter.slug}/verses/1` : `/chapters/${chapter.slug}`}
                        href={`/chapters/${chapter.slug}`}
                    legacyBehavior>
                        <a
                            className={styles.list}
                            onClick={controller(false)}
                        >
                            <span className={styles.number}>{chapter.chapterNo}</span>

                            <div className={styles.name}>
                                <span>{chapter.name}</span>
                                <span>{chapter.meaning}</span>
                            </div>
                        </a>
                    </Link>
                )}
                </div>
            </div>
        </Scrollbar>
	)
}
