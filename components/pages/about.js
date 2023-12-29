import css from './style.module.scss'
import styles from './about.module.scss'
import { config } from '../../lib/config'

export default function AboutContent() {
    return (
        <div className={css.wrapper}>
            <div className={css.page_title}>About App</div>
            <div className={css.page_item}>
                <div className={styles.quran_content}>
                    <p>Quran application in {config?.language}.</p>
                    <p>Powered by - <a href="https://deeniinfotech.com" target="_blank">Deeni Info Tech</a></p>
                    <p>
                        <a href="https://deeniinfotech.com" target="_blank">Deeni Info Tech</a>
                        : A non-profit Software Development organization to spread the message of Islam worldwide.
                    </p>
                    <p>Email: info@deeniinfotech.com</p>
                </div>
            </div>
        </div>
    )
}
