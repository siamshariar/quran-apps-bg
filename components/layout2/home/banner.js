import Link from 'next/link'
import Image from 'next/image'
import Container from '../../core/container'
import Grid from '@mui/material/Grid'
import EastIcon from '../../icons/East'
import styles from './banner.module.scss'
import { config } from "../../../lib/config"
import { useContext } from "react"
import { SettingsContext } from "../../../contexts/SettingsContext"

export default function Banner() {
    const { theme, isReady } = useContext(SettingsContext)

    if (!isReady) return null

    const backgroundColor = theme === "light"
        ? config.bannerBackground
        : "linear-gradient(90deg,#2b395d 0,#909090 50%,#909090 50%,#2b395d 100%)"

    return (
        <>
            <div style={{ background: backgroundColor }} className={styles.banner}>
                <Container>
                    <div className={styles.grid}>
                        <Grid container spacing={4}>
                            <GridItem
                                title={config.content.what_is_quran.title}
                                text="The Holy Quran is the Holy Book or the Scripture(holy book) of mankind. The Quran is a complete code of life for the human being."
                                url="/what-is-quran"
                            />
                            <GridItem
                                title={config.content.is_quran_god_word.title}
                                text="The Noble Quran is the eternal miracle of Prophet Muhammad (PBUH), because all the miracles of the prophets (PBUH) ended with their death, except our Prophet (PBUH), whose miracle is still preserved."
                                url="/is-quran-god-word"
                            />
                            <GridItem
                                title={config.content.why_should_read_quran.title}
                                text="The first revelation of the Holy Qur’an that was revealed to Prophet Muhammad (PBUH) was ‘Read’ ‘اقرا’ from (Al Quran - 96 : 01) which shows the importance of acquiring knowledge by reading."
                                url="/why-should-read-the-quran"
                            />
                        </Grid>
                    </div>
                </Container>
            </div>

            {/* Optional mobile banner */}
            {/* 
            <div className={styles.banner_mobile}>
                <Container>
                    <Link href="/about-quran" legacyBehavior>
                        <a className={styles.banner_link}>Know more about Quran</a>
                    </Link>
                </Container>
            </div>
            */}
        </>
    )
}

const GridItem = ({ title, text, url }) => {
    return (
        <Grid item xs={12} md={4}>
            <div className={styles.grid_item}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.text}>{text}</p>
                <Link href={url} legacyBehavior>
                    <a className={styles.link}>
                        <span className={styles.link_text}>Read more</span>
                        <span className={styles.link_icon}><EastIcon /></span>
                    </a>
                </Link>
            </div>
        </Grid>
    )
}
