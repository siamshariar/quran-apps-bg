import css from './style.module.scss'
import styles from './about.module.scss'

export default function AboutContent() {
    return (
        <div className={css.wrapper}>
            <div className={css.page_title}>About App</div>
            <div className={css.page_item}>
                <div className={styles.quran_content}>
                    <p>Quran application in Vietnamese.</p>
                    <p>Powered by - <a href="http://deeniinfotech.com" target="_blank">Deeni Info Tech</a></p>
                    <p>
                        <a href="http://deeniinfotech.com" target="_blank">Deeni Info Tech</a>
                        : A non-profitable Islamic software development organization for Dawah.
                    </p>
                    <p>Email: deeniinfotech@gmail.com | quran.vn@gmail.com</p>
                </div>
            </div>
        </div>
    )
}
