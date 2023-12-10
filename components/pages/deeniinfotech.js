import css from './style.module.scss'
import styles from './about.module.scss'

export default function DeeniinfotechContent() {
    return (
        <div className={css.wrapper}>
            <div className={css.page_title}>About Deeni Info Tech</div>
            <div className={css.page_item}>
                <div className={styles.quran_content}>
                    <p>
                        <a href="http://deeniinfotech.com" target="_blank">Deeni Info Tech</a>
                        : A non-profitable software development organization to spread Dawah all over the world.
                    </p>
                    <p>Website: <a href="http://deeniinfotech.com" target="_blank">www.DeeniInfoTech.com</a></p>
                    <p>Email: deeniinfotech@gmail.com</p>
                </div>
            </div>
        </div>
    )
}
