import css from './style.module.scss'
import styles from './about.module.scss'
import { config, t } from '../../lib/config'

export default function AboutContent() {
    return (
        <div className={css.wrapper}>
            <div className={css.page_title}>About</div>
            <div className={css.page_item}>
                <div className={styles.quran_content}>
                    <p>{t('Quran application in')} {config?.language}.</p>
                    <p>{t('Developed and maintain by')} <a href="https://deeniinfotech.com" target="_blank">{t('Deeni Info Tech.')}</a></p>
                    <p>
                        {t('Deeni Info Tech is a non-profit Software Development organization to spread the message of Islam worldwide.')}
                    </p>
                    <p>
                        {t('Deeni Info Tech working for the following three sets of goals:')}
                        {/*TODO: Improve design and content*/}
                        <ol style={{marginLeft: `35px`}}>
                            <li style={{listStyleType: `unset`, lineHeight: `1.8`}}>
                                {t('Applications for Scholars & Da\'wah organizations')}
                            </li>
                            <li style={{listStyleType: `unset`, lineHeight: `1.8`}}>
                                {t('Applications for Non-Muslim Countries')}
                            </li>
                            <li style={{listStyleType: `unset`, lineHeight: `1.8`}}>
                                {t('Develop Islamic applications')}
                            </li>
                        </ol>
                    </p>
                    <p>
                        {t('The primary goal of Deeni Info Tech is to create more promising Islamic applications. All our applications is/will be free of charge and entirely ad-free.')}
                    </p>
                    <p>
                        {t('Website')}: <a href="https://deeniinfotech.com" target="_blank">www.DeeniInfoTech.com</a>
                    </p>
                    <p>{t('Email')}: <a href="mailto:info@deeniinfotech.com">info@deeniinfotech.com</a></p>
                    <p>{t('Please mail us if you want to support. Any kind of support is highly appreciable.')}</p>
                </div>
            </div>
        </div>
    )
}
