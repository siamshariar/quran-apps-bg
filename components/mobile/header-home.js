import { useContext, useState } from 'react'
import { SettingsContext } from '../../contexts/SettingsContext'
import Link from 'next/link'
import Image from 'next/image'
import Container from '../core/container'
import IconButton from '@mui/material/IconButton'
import MobileNav from './mobile-nav'
import SearchModal from '../core/search-modal'
import MenuIcon from '../icons/Menu'
//import SearchIcon from '../icons/Search'
import styles from './header.module.scss'
import { config } from '../../lib/config'

export default function HeaderMobile({ chapters }) {
    const { theme } = useContext(SettingsContext)
    
    const [mobileNavOpen, setMobileNavOpen] = useState(false)
    
    const [searchModalOpen, setSearchModalOpen] = useState(false)

    const handleSearchModal = (open) => (event) => {
        if (event) {
            event.preventDefault()
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return
            }
        }
        setSearchModalOpen(open)
    }

    const controlMobileNav = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
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
                                <Link href="/" legacyBehavior>
                                    <a className={styles.logo}>
                                        <Image
                                            src={`/img/logo/${config?.localizationCode}/logo.png`}
                                            alt=""
                                            width={122}
                                            height={26}
                                            loading="eager"
                                            objectFit='contain'
                                        />
                                    </a>
                                </Link>
                            )}

                            {theme !== 'light' && (
                                <Link href="/" legacyBehavior>
                                    <a className={styles.logo}>
                                        <Image
                                            src={`/img/logo/${config?.localizationCode}/logo_full_white.png`}
                                            alt=""
                                            width={122}
                                            height={26}
                                            loading="eager"
                                            objectFit='contain'
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
                            <span className={styles.icon} onClick={handleSearchModal(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="m23.5 21.466-7.01-7.01a9.07 9.07 0 0 0 1.736-5.343C18.226 4.088 14.138 0 9.113 0S0 4.088 0 9.113s4.088 9.113 9.113 9.113a9.07 9.07 0 0 0 5.343-1.735l7.01 7.009zM9.113 15.348a6.236 6.236 0 1 1 6.235-6.235 6.243 6.243 0 0 1-6.235 6.235"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </Container>
            </div>

            <MobileNav
                navOpen={mobileNavOpen}
                navControl={controlMobileNav}
                chapters={chapters}
            />

            <SearchModal
                open={searchModalOpen}
                searchModalController={handleSearchModal}
                chapters={chapters}
            />
        </>
    )
}
