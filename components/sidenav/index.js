import { useState } from 'react'
import Link from 'next/link'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'

import MenuBookIcon from '../icons/MenuBook'
import NearMeIcon from '../icons/NearMe'
import FavoriteIcon from '../icons/Favorite'
import SubtitlesIcon from '../icons/Subtitles'
import DownloadIcon from '../icons/GetApp'
import SettingsIcon from '../icons/Settings'

import ChapterList from './chapter-list'
import GoToVerse from './go-to-verse'
import Favorite from './favorite'
import Settings from './settings'

import styles from './index.module.scss'

export default function Sidenav({ chapters }) {
    const [goToVerseNavOpen, updateGoToVerseNavOpen] = useState(false)
    // const [goToVerseInit, updateGoToVerseInit] = useState(false)
    // const [goToVerseData, updateGoToVerseData] = useState([])

    const controlGoToVerseNav = open => event => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return
		}

		updateGoToVerseNavOpen(open)

        // if (!goToVerseInit) {
        //     getChaptersInfo().then(res => {
        //         updateGoToVerseData(res)

        //         setTimeout(() => {
        //             updateGoToVerseInit(true)
        //         }, 0)
        //     })
        // }
	}


    const [chapterListOpen, updateChapterListOpen] = useState(false)
    const [favoriteOpen, updateFavoriteOpen] = useState(false)
    const [settingsOpen, updateSettingsOpen] = useState(false)


    const controlChapterList = open => event => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return
		}
		updateChapterListOpen(open)
	}



    const controlFavoriteNav = open => event => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return
		}
		updateFavoriteOpen(open)
	}

    const controlSettingsNav = open => event => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return
		}
		updateSettingsOpen(open)
	}

    return (
        <>
            <ChapterList
                chapterList={chapters}
                open={chapterListOpen}
                controller={controlChapterList}
            />

            <GoToVerse
                open={goToVerseNavOpen}
                controller={controlGoToVerseNav}
                chapters={chapters}
            />

            <Favorite
                open={favoriteOpen}
                controller={controlFavoriteNav}
            />

            <Settings
                open={settingsOpen}
                controller={controlSettingsNav}
            />

            <div className={styles.side_nav}>
                <ul className={styles.side_menu}>
                    <li>
                        <Tooltip
                            title="Chapter List"
                            arrow
                            placement="right"
                            disableFocusListener={true}
                        >
                            <Button
                                onClick={controlChapterList(true)}
                                focusRipple={false}
                            >
                                <MenuBookIcon />
                            </Button>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip
                            title="Go to verse"
                            arrow
                            placement="right"
                            disableFocusListener={true}
                        >
                            <Button
                                onClick={controlGoToVerseNav(true)}
                                focusRipple={false}
                            >
                                <NearMeIcon />
                            </Button>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip
                            title="Favorite"
                            arrow
                            placement="right"
                            disableFocusListener={true}
                        >
                            <Button
                                onClick={controlFavoriteNav(true)}
                                focusRipple={false}
                            >
                                <FavoriteIcon />
                            </Button>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip
                            title="Subjective"
                            arrow
                            placement="right"
                            disableFocusListener={true}
                        >
                            <Button
                                focusRipple={false}
                            >
                                <Link href="/subjective">
                                    <a><SubtitlesIcon /></a>
                                </Link>
                            </Button>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip
                            title="Download"
                            arrow
                            placement="right"
                            disableFocusListener={true}
                        >
                            <Button
                                focusRipple={false}
                            >
                                <Link href="/download">
                                    <a><DownloadIcon /></a>
                                </Link>
                            </Button>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip
                            title="Settings"
                            arrow
                            placement="right"
                            disableFocusListener={true}
                        >
                            <Button
                                onClick={controlSettingsNav(true)}
                                focusRipple={false}
                            >
                                <SettingsIcon />
                            </Button>
                        </Tooltip>
                    </li>
                </ul>
            </div>
        </>
    )
}