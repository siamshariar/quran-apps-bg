import { useState, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Drawer from '@material-ui/core/Drawer'
import GoToVerse from './go-to-verse'
import SettingsModal from './settings-modal'
import MenuBookIcon from '../icons/MenuBook'
import NearMeIcon from '../icons/NearMeOutlined'
import SubtitlesIcon from '../icons/SubtitlesOutlined'
import DownloadIcon from '../icons/FileDownload'
import SettingsIcon from '../icons/SettingsOutlined'
import FeedbackIcon from '../icons/Feedback'
import ShareIcon from '../icons/ShareOutlined'
import CreateIcon from '../icons/Create'
import AttachMoneyIcon from '../icons/AttachMoney'
import FavoriteBorderIcon from '../icons/FavoriteBorder'
import InfoIcon from '../icons/Info'
import ContactIcon from '../icons/ContactSupport'
import SecurityIcon from '../icons/Security'
import AdminIcon from '../icons/AdminPanelSettings'
import Names99Icon from '../icons/Names99'
import PinIcon from '../icons/PinOutline'
import AutoStoriesIcon from '../icons/AutoStories'
import { SidenavContext } from '../../contexts/SidenavContext'
import { useRouter } from 'next/router'

// import PinModal from './pin-modal'
// import PinIcon from '../icons/PinOutline'

// import BookmarkModal from './bookmark-modal'
// import BookmarkBorderIcon from '../icons/BookmarkBorder'

import styles from './mobile-nav.module.scss'
import { config } from '../../lib/config'
import {SettingsContext} from "../../contexts/SettingsContext";

export default function MobileNav({ navOpen, navControl, chapters }) {
	// go to verse modal
	const [goToVerseOpen, setGoToVerseOpen] = useState(false)
	// const [goToVerseInit, setGoToVerseInit] = useState(false)
	// const [goToVerseData, setGoToVerseData] = useState([])
	const { theme } = useContext(SettingsContext);
	const backgroundColor = theme === "light"
		? config.bannerBackground
		: "linear-gradient(90deg,#2b395d 0,#909090 50%,#909090 50%,#2b395d 100%)"

	const handleGoToVerseModal = open => event => {
		event.preventDefault()

		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return
		}

		navControl(false)(event)
		setGoToVerseOpen(open)

		// if (!goToVerseInit) {
		// 	getChaptersInfo().then(res => {
		// 		setGoToVerseData(res)

		// 		setTimeout(() => {
		// 			setGoToVerseInit(true)
		// 		}, 0)
		// 	})
		// }
	}

	// settings modal
	const [settingsOpen, setSettingsOpen] = useState(false)

	const handleSettingsModal = open => event => {
		event.preventDefault()
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return
		}
		setSettingsOpen(open)
		setTimeout(() => {
			navControl(false)(event)
		}, 300)
	}

	// // pin modal
	// const [pinOpen, setPinOpen] = useState(false)

	// const handlePinModal = open => event => {
	// 	event.preventDefault()
	// 	if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
	// 		return
	// 	}
	// 	setPinOpen(open)
	// 	setTimeout(() => {
	// 		navControl(false)(event)
	// 	}, 300)
	// }

  // // bookmark modal
	// const [bookmarkOpen, setBookmarkOpen] = useState(false)

	// const handleBookmarkModal = open => event => {
	// 	event.preventDefault()
	// 	if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
	// 		return
	// 	}
	// 	setBookmarkOpen(open)
	// 	setTimeout(() => {
	// 		navControl(false)(event)
	// 	}, 300)
	// }

  // handle bookmark page
  const { bookmarkOpen, changeBookmarkOpen } = useContext(SidenavContext);
  const router = useRouter()

  const handleBookmarkPage = (e, tab) => {
    e.preventDefault()
    changeBookmarkOpen(tab)
    router.push(`/bookmarks`)
    return
  }

	return (
		<>
			<Drawer
				anchor="left"
				open={navOpen}
				onClose={navControl(false)}
        classes={{
          root: styles.menu_root,
          paper: styles.paper
        }}
			>
				<div className={styles.wrapper}>
					<div className={styles.menu_ctn}>
						<div style={{background: backgroundColor}} className={styles.menu_top}>
							<Link href="/">
								<a className={styles.logo}>
                  <Image
					src={`/img/logo/${config?.localizationCode}/logo_full_white.png`}
                    alt=""
                    width={142}
                    height={26}
                    loading="eager"
					objectFit="contain"
                  />
									<span>{config.domain}<br/>v1.0.1</span>
								</a>
							</Link>
						</div>

						<ul className={styles.menu}>
							{/*<li>*/}
							{/*	<Link href="/">*/}
							{/*		<a>*/}
							{/*			<span className={styles.icon}><MenuBookIcon /></span>*/}
							{/*			<span className={styles.text}>Learn Quran</span>*/}
							{/*		</a>*/}
							{/*	</Link>*/}
							{/*</li>*/}
							<li>
								<Link href="/">
									<a onClick={handleGoToVerseModal(true)}>
										<span className={styles.icon}><NearMeIcon /></span>
										<span className={styles.text}>Go to verse</span>
									</a>
								</Link>
							</li>
							<li>
								<Link href="/names-of-allah">
									<a>
										<span className={styles.icon}><Names99Icon /></span>
										<span className={styles.text}>Names of Allah</span>
									</a>
								</Link>
							</li>
							<li>
								<Link href="/bookmarks">
									<a onClick={e => handleBookmarkPage(e, 2)}>
										<span className={styles.icon}><PinIcon /></span>
										<span className={styles.text}>Pin</span>
									</a>
								</Link>
							</li>
              				<li>
								<Link href="/bookmarks">
									<a onClick={e => handleBookmarkPage(e, 3)}>
										<span className={styles.icon}><AutoStoriesIcon /></span>
										<span className={styles.text}>Last Read</span>
									</a>
								</Link>
							</li>
							<li>
								<Link href="/download">
									<a>
										<span className={styles.icon}><DownloadIcon /></span>
										<span className={styles.text}>Download</span>
									</a>
								</Link>
							</li>

							<li>
								<Link href="/settings">
									<a onClick={handleSettingsModal(true)}>
										<span className={styles.icon}><SettingsIcon /></span>
										<span className={styles.text}>Settings</span>
									</a>
								</Link>
							</li>
              {/* <li>
								<Link href="/pin">
									<a onClick={handlePinModal(true)}>
										<span className={styles.icon}><PinIcon /></span>
										<span className={styles.text}>Pinned verses</span>
									</a>
								</Link>
							</li> */}
              {/* <li>
								<Link href="/bookmark">
									<a onClick={handleBookmarkModal(true)}>
										<span className={styles.icon}><BookmarkBorderIcon /></span>
										<span className={styles.text}>Bookmarks</span>
									</a>
								</Link>
							</li> */}
						</ul>

						<hr className={styles.menu_hr} />

						<ul className={styles.menu}>
							{/*<li>*/}
							{/*	<Link href="/">*/}
							{/*		<a>*/}
							{/*			<span className={styles.icon}><FeedbackIcon /></span>*/}
							{/*			<span className={styles.text}>Rating & Review</span>*/}
							{/*		</a>*/}
							{/*	</Link>*/}
							{/*</li>*/}
							{/*<li>*/}
							{/*	<Link href="/">*/}
							{/*		<a>*/}
							{/*			<span className={styles.icon}><ShareIcon /></span>*/}
							{/*			<span className={styles.text}>Share</span>*/}
							{/*		</a>*/}
							{/*	</Link>*/}
							{/*</li>*/}
							{/*<li>*/}
							{/*	<Link href="/">*/}
							{/*		<a>*/}
							{/*			<span className={styles.icon}><CreateIcon /></span>*/}
							{/*			<span className={styles.text}>Writer</span>*/}
							{/*		</a>*/}
							{/*	</Link>*/}
							{/*</li>*/}
							<li>
								<Link href="/support">
									<a>
										<span className={styles.icon}><ContactIcon /></span>
										<span className={styles.text}>Support</span>
									</a>
								</Link>
							</li>
							<li>
								<Link href="/grateful">
									<a>
										<span className={styles.icon}><FavoriteBorderIcon /></span>
										<span className={styles.text}>Grateful</span>
									</a>
								</Link>
							</li>
						</ul>

						<hr className={styles.menu_hr} />

						<ul className={styles.menu}>
							<li>
								<Link href="/about">
									<a>
										<span className={styles.icon}><InfoIcon /></span>
										<span className={styles.text}>About</span>
									</a>
								</Link>
							</li>
							<li>
								<Link href="/contact">
									<a>
										<span className={styles.icon}><ContactIcon /></span>
										<span className={styles.text}>Contact</span>
									</a>
								</Link>
							</li>
							<li>
								<Link href="/deeniinfotech">
									<a>
										<span className={styles.icon}><InfoIcon /></span>
										<span className={styles.text}>Deeni Info Tech</span>
									</a>
								</Link>
							</li>
							<li>
								<Link href="/privacy-policy">
									<a>
										<span className={styles.icon}><SecurityIcon /></span>
										<span className={styles.text}>Privacy Policy</span>
									</a>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</Drawer>

			<GoToVerse
				open={goToVerseOpen}
				controller={handleGoToVerseModal}
        chapters={chapters}
			/>

			<SettingsModal
				open={settingsOpen}
				controller={handleSettingsModal}
			/>

      {/* <PinModal
				open={pinOpen}
				controller={handlePinModal}
			/> */}

      {/* <BookmarkModal
				open={bookmarkOpen}
				controller={handleBookmarkModal}
			/> */}
		</>
	)
}
