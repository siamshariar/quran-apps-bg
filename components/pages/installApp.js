import css from './style.module.scss'
import styles from './about.module.scss'
import {config, t} from "../../lib/config";
import Grid from "@mui/material/Grid";

export default function InstallAppContent() {
    return (
        <div className={css.wrapper}>
            <div className={css.page_title}>Install App</div>

            <div className={css.page_item}>
                <div className={styles.quran_content}>
                    <p>
                        {t('App installation process for')} <a className={styles.mobile_app_link} href="#android">Android</a> & <a className={styles.mobile_app_link} href="#iphone">iPhone</a>.
                    </p>

                    <div id="android" className={styles.mobile_app_title}>
                        <a href="#android">Android</a>
                    </div>
                    <div className={styles.mobile_app_des}>
                        <div>
                            <p>
                                1. {t('Open Google Chrome browser and visit')} <span style={{fontWeight: `bold`}}>www.{config.domain}. </span>
                                {t('Click on top-right "three dots" icon. (If you see popup "Add')} {config.domain} {t('to Home Screen" then click on it.')}
                            </p>
                            {/*<Grid container spacing={2}>*/}
                            {/*    <Grid item xs={6} sm={6} md={4} lg={4}>*/}
                            {/*        <img loading="lazy" src={`/app/${config.localizationCode}/install/Android_1.webp`}*/}
                            {/*             style={{width: `100%`, height:`auto`}} />*/}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}
                        </div>
                        <div>
                            <p>
                                2. {t('Click on "Install app". (If you don’t see "Install app" then wait a few seconds and try again.)')}

                            </p>
                            {/*<Grid container spacing={2}>*/}
                            {/*    <Grid item xs={6} sm={6} md={4} lg={4}>*/}
                            {/*        <img loading="lazy" src={`/app/${config.localizationCode}/install/Android_2.webp`}*/}
                            {/*             style={{width: `100%`, height:`auto`}} />*/}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}
                        </div>
                        <div>
                            <p>
                                3. {t('Click on "Install" to confirm.')}
                            </p>
                            {/*<Grid container spacing={2}>*/}
                            {/*    <Grid item xs={6} sm={6} md={4} lg={4}>*/}
                            {/*        <img loading="lazy" src={`/app/${config.localizationCode}/install/Android_3.webp`}*/}
                            {/*             style={{width: `100%`, height:`auto`}} />*/}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}
                        </div>
                    </div>

                    <div id="iphone" className={styles.mobile_app_title}>
                        <a href="#iphone">iPhone</a>
                    </div>
                    <div className={styles.mobile_app_des}>
                        <div>
                            <p>
                                1. {t('Open Safari browser and visit')} <span style={{fontWeight: `bold`}}>www.{config.domain}</span>.
                                {t('Click on "Share" icon.')}
                            </p>
                            {/*<Grid container spacing={2}>*/}
                            {/*    <Grid item xs={6} sm={6} md={4} lg={4}>*/}
                            {/*        <img loading="lazy" src={`/app/${config.localizationCode}/install/iPhone_1.webp`}*/}
                            {/*             style={{width: `100%`, height:`auto`}} />*/}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}
                        </div>
                        <div>
                            <p>
                                2. {t('Scroll to bottom and click on "Add to Home Screen".')}
                            </p>
                            {/*<Grid container spacing={2}>*/}
                            {/*    <Grid item xs={6} sm={6} md={4} lg={4}>*/}
                            {/*        <img loading="lazy" src={`/app/${config.localizationCode}/install/iPhone_2.webp`}*/}
                            {/*             style={{width: `100%`, height:`auto`}} />*/}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}
                        </div>
                        <div>
                            <p>
                                3. {t('Click on "Add" to confirm.')}
                            </p>
                            {/*<Grid container spacing={2}>*/}
                            {/*    <Grid item xs={6} sm={6} md={4} lg={4}>*/}
                            {/*        <img loading="lazy" src={`/app/${config.localizationCode}/install/iPhone_3.webp`}*/}
                            {/*             style={{width: `100%`, height:`auto`}} />*/}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
