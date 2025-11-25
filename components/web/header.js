import { useContext } from 'react'
import { SettingsContext } from '../../contexts/SettingsContext'
import Link from 'next/link'
import Image from 'next/image'
import IconButton from '@mui/material/IconButton'
import Container from '../core/container'
import SearchIcon from '../icons/Search'
import Brightness4Icon from '../icons/Brightness4'
import Brightness7Icon from '../icons/Brightness7'
import styles from './header.module.scss'
import { config } from '../../lib/config'

export default function HeaderWeb({ page, searchModalController }) {
    const { theme, changeTheme } = useContext(SettingsContext)

    const modeSwitcher = () => {
        const newTheme = (theme === 'light') ? 'dark' : 'light'
        changeTheme(newTheme)
    }
    return (
        <div className={`${styles.header} ${styles[page]}`}>
            <Container>
                <div className={styles.inner}>
                    <div className={styles.left}>
                        {theme === 'light' && (
                            <Link href="/" legacyBehavior>
                                <a className={styles.logo}>
                                    <Image
                                        src={`/img/logo/${config?.localizationCode}/logo.png`}
                                        alt=""
                                        width={182}
                                        height={28}
                                        loading="eager"
                                        objectFit="contain"
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
                                        width={138}
                                        height={28}
                                        loading="eager"
                                        objectFit="contain"
                                    />
                                </a>
                            </Link>
                        )}
                    </div>

                    <div className={styles.right}>
                        {/*<IconButton*/}
                        {/*    className={styles.btn}*/}
                        {/*    onClick={() => searchModalController(true)}*/}
                        {/*>*/}
                        {/*    <SearchIcon />*/}
                        {/*</IconButton>*/}

                        <IconButton
                            className={styles.btn}
                            onClick={() => modeSwitcher()}
                        >
                            {theme === 'light' && <Brightness4Icon />}
                            {theme !== 'light' && <Brightness7Icon />}
                        </IconButton>
                    </div>
                </div>
            </Container>
        </div>
    )
}
