import css from './style.module.scss'
import styles from './about.module.scss'
import { config } from '../../lib/config'

export default function AboutContent() {
    return (
        <div className={css.wrapper}>
            <div className={css.page_title}>About</div>
            <div className={css.page_item}>
                <div className={styles.quran_content}>
                    <p>Quran application in {config?.language}.</p>
                    <p>Powered by - <a href="https://deeniinfotech.com" target="_blank">Deeni Info Tech</a></p>
                    <p>
                        Deeni Info Tech is a non-profit Software Development organization to spread the message of Islam worldwide.
                    </p>
                    <p>
                        Deeni Info Tech working for the following three sets of goals:
                        {/*TODO: Improve design and content*/}
                        <ol style={{marginLeft: `35px`}}>
                            <li style={{listStyleType: `unset`, lineHeight: `1.8`}}>
                                Applications for Scholars & Da'wah organizations
                            </li>
                            <li style={{listStyleType: `unset`, lineHeight: `1.8`}}>
                                Applications for Non-Muslim Countries
                            </li>
                            <li style={{listStyleType: `unset`, lineHeight: `1.8`}}>
                                Develop Islamic applications
                            </li>
                        </ol>
                    </p>
                    <p>
                        Website: <a href="https://deeniinfotech.com" target="_blank">www.DeeniInfoTech.com</a>
                    </p>
                    <p>Email: <a href="mailto:info@deeniinfotech.com">info@deeniinfotech.com</a></p>
                </div>
            </div>
        </div>
    )
}
