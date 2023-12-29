import Link from 'next/link'
import Grid from '@material-ui/core/Grid'
import EastIcon from '../icons/East'
import css from './style.module.scss'
import styles from './about-quran.module.scss'

export default function AboutQuranContent() {
    return (
        <div className={css.wrapper}>
            <Grid container spacing={2}>
                <GridItem
                    title="Kinh Quran là gì?"
                    text="Quran đó là kinh sách được dành cho nhân loại. Nó là một quy tắc hoàn chỉnh của cuộc sống để cho con người áp dụng."
                    url="/what-is-quran"
                />
                <GridItem
                    title="Is the Quran God’s word?"
                    text="Không một điều giả dối nào có thể xâm nhập Nó (Qur'an) từ đằng trước hay đằng sau."
                    url="/is-quran-god-word"
                />
                <GridItem
                    title="Why should read the Quran?"
                    text="Tháng Ramadan là tháng trong đó (Kinh) Qur’an được ban xuống làm Chỉ Đạo cho nhân loại và mang bằng chứng rõ..."
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