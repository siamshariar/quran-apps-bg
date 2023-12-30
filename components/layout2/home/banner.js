import Link from 'next/link'
import Image from 'next/image'
import Container from '../../core/container'
import Grid from '@material-ui/core/Grid'
import EastIcon from '../../icons/East'
import styles from './banner.module.scss'
import {config} from "../../../lib/config";

export default function Banner() {
    return (
        <>
            <div style={{background: config.bannerBackground}} className={styles.banner}>
                <Container>
                    {/*<div className={styles.calligraphy}>*/}
                    {/*    <Image*/}
                    {/*        src="/img/quran.webp"*/}
                    {/*        alt=""*/}
                    {/*        width={300}*/}
                    {/*        height={170}*/}
                    {/*    />*/}
                    {/*</div>*/}

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

            {/*<div className={styles.banner_mobile}>*/}
            {/*    <Container>*/}
            {/*        <Link href="/about-quran">*/}
            {/*            <a className={styles.banner_link}>Know more about Quran</a>*/}
            {/*        </Link>*/}
            {/*    </Container>*/}
            {/*</div>*/}
        </>
    )
}


const GridItem = ({ title, text, url }) => {
    return (
        <Grid item xs={12} md={4}>
            <div className={styles.grid_item}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.text}>{text}</p>
                <Link href={url}>
                    <a className={styles.link}>
                        <span className={styles.link_text}>Read more</span>
                        <span className={styles.link_icon}><EastIcon /></span>
                    </a>
                </Link>
            </div>
        </Grid>
    )
}
