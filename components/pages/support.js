import css from './style.module.scss'
import styles from './about.module.scss'

export default function SupportContent() {
    return (
        <div className={css.wrapper}>
            <div className={css.page_title}>Support</div>

            <div className={css.page_item}>
                <div className={styles.quran_content}>
                    <p>Please mail us if you want to support. Any kind of support is highly appreciable.</p>
                    <p>Email: info@deeniinfotech.com</p>
                </div>
            </div>
        </div>
    )
}
