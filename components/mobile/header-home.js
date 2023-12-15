import { useContext } from 'react'
import { SettingsContext } from '../../contexts/SettingsContext'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Container from '../core/container'
import IconButton from '@material-ui/core/IconButton'
import MobileNav from './mobile-nav'
import MenuIcon from '../icons/Menu'
//import SearchIcon from '../icons/Search'
import Brightness4Icon from '../icons/Brightness4'
import Brightness7Icon from '../icons/Brightness7'
import styles from './header.module.scss'
import { config } from '../../lib/config'

export default function HeaderMobile({ chapters }) {
    const { theme, changeTheme } = useContext(SettingsContext)

    const modeSwitcher = () => {
        const newTheme = (theme === 'light') ? 'dark' : 'light'
        changeTheme(newTheme)
    }

    const [mobileNavOpen, setMobileNavOpen] = useState(false)

    const controlMobileNav = (open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return
		}
		setMobileNavOpen(open)
	}

    return (
        <>
            <div className={styles.header}>
                <Container>
                    <div className={styles.wrapper}>
                        <div className={styles.left}>
                            <IconButton
                                className={styles.icon}
                                onClick={controlMobileNav(true)}
                                focusRipple={false}
                            >
                                <MenuIcon />
                            </IconButton>
                        </div>

                        <div className={styles.center}>
                            {theme === 'light' && (
                                <Link href="/">
                                    <a className={styles.logo}>
                                        <Image
                                            src={`/img/logo/${config?.localizationCode}/logo.png`}
                                            alt=""
                                            width={122}
                                            height={26}
                                            loading="eager"
                                        />
                                    </a>
                                </Link>
                            )}

                            {theme !== 'light' && (
                                <Link href="/">
                                    <a className={styles.logo}>
                                        <Image
                                            src={`/img/logo/${config?.localizationCode}/logo_full_white.png`}
                                            alt=""
                                            width={122}
                                            height={26}
                                            loading="eager"
                                        />
                                    </a>
                                </Link>
                            )}
                        </div>


                        <div className={styles.right}>
                            {/* <IconButton
                                className={styles.icon}
                                onClick={() => searchModalController(true)}
                                focusRipple={false}
                            >
                                <SearchIcon />
                            </IconButton> */}

                            <IconButton
                                className={styles.icon}
                                onClick={() => modeSwitcher()}
                                focusRipple={false}
                            >
                                {theme === 'light' && <Brightness4Icon />}
                                {theme !== 'light' && <Brightness7Icon />}
                            </IconButton>
                        </div>
                    </div>
                </Container>
            </div>

            <MobileNav
                navOpen={mobileNavOpen}
                navControl={controlMobileNav}
                chapters={chapters}
            />
        </>
    )
}