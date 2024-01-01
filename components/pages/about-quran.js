import Link from 'next/link'
import Grid from '@material-ui/core/Grid'
import EastIcon from '../icons/East'
import css from './style.module.scss'
import styles from './about-quran.module.scss'
import { config } from "../../lib/config"

export default function AboutQuranContent() {
    return (
        <div className={css.wrapper}>
            <Grid container spacing={2}>
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
    )
}


const GridItem = ({ title, text, url }) => {
    return (
        <Grid item xs={12} md={4}>
            <div className={styles.item}>
                <h2>{title}</h2>
                <p>{text}</p>
                <Link href={url}>
                    <a>
                        <span>Read more</span>
                        <span><EastIcon /></span>
                    </a>
                </Link>
            </div>
        </Grid>
    )
}
