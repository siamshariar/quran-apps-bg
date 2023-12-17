import css from './style.module.scss'
import styles from './about.module.scss'

export default function ContactContent() {
    return (
        <div className={css.wrapper}>
            <div className={css.page_title}>Contact</div>

            <div className={css.page_item}>
                <div className={styles.quran_content}>
                    <p>For all inquiries, please email us. We'll get back to you as soon as we can In Sha Allah.</p>
                    <p>Email: info@deeniinfotech.com</p>
                </div>
            </div>
        </div>
    )
}
