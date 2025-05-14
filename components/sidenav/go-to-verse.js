import { useState, useContext } from 'react'
import { SettingsContext } from '../../contexts/SettingsContext'
import Link from 'next/link'
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
// import Loader from '../core/loader'
import CloseIcon from '../icons/Close'
import SendIcon from '../icons/Send'
import styles from './go-to-verse.module.scss'
import css from './style.module.scss'

export default function GoToVerse({ open, controller, chapters }) {
  const { verseMode } = useContext(SettingsContext)

    const [chapterNumber, setChapterNumber] = useState(1)
    const [numberOfVerses, setNumberOfVerses] = useState(7)
    const [verseNumber, setVerseNumber] = useState(1)

    const handleChapterChange = event => {
        setChapterNumber(event.target.value)
        setNumberOfVerses(chapters[event.target.value - 1].totalVerse)
        setVerseNumber(1)
    }

    const handleVerseChange = event => {
        setVerseNumber(event.target.value)
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
					<CloseIcon />
				</span>

                <div className={`${css.title} ${styles.title}`}>
					<h2>Go To Verse</h2>
					<h4>Select chapter and verse</h4>
				</div>

				<div className={styles.wrapper}>

                    {/* <div className={!init ? css.loader : css.none}><Loader /></div> */}

                    <div className={styles.content}>

                        <div className={styles.item}>
                          {chapters &&
                            <Select
                                className={styles.inner}
                                value={chapterNumber}
                                onChange={handleChapterChange}
                                MenuProps={{
                                    classes: {
                                        paper: styles.custom_select
                                    }
                                }}
                            >
                            {chapters && chapters.map(chapter =>
                                <li key={chapter.chapterNo} value={chapter.chapterNo}>
                                    {chapter.chapterNo}. {chapter.name}
                                </li>
                            )}
                            </Select>
                          }
                        </div>

                        <div className={styles.item}>
                          {chapters &&
                            <Select
                                className={styles.inner}
                                value={verseNumber}
                                onChange={handleVerseChange}
                                MenuProps={{
                                    classes: {
                                        paper: styles.custom_select
                                    }
                                }}
                            >
                            {[...Array(numberOfVerses)].map((x, i) =>
                                <li key={i} value={i + 1}>Verse {i + 1}</li>
                            )}
                            </Select>
                          }
                        </div>

                        {/* To Do: update link */}
                        <Link href={"/chapters/" + chapters[chapterNumber - 1].slug + "#verse-" + verseNumber} legacyBehavior>
                            <Button
                                className={styles.btn}
                                variant="contained"
                                focusRipple={false}
                                endIcon={<SendIcon />}
                                disableElevation
                            >
                                <a>Go to verse</a>
                            </Button>
                        </Link>

                    </div>
				</div>
			</div>
		</Drawer>
    )
}