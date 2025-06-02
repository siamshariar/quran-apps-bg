import Link from 'next/link'
import Image from 'next/image'
import Grid from '@mui/material/Grid'
import Container from '../core/container'
import FacebookIcon from '../icons/Facebook'
import TwitterIcon from '../icons/Twitter'
import LinkedinIcon from '../icons/Linkedin'
import styles from './footer.module.scss'
import { config, t } from '../../lib/config'

export default function FooterWeb() {
    return (
        <div className={styles.footer}>
            <Container>
                {/*<div className={styles.top}>*/}
                {/*    <Grid container spacing={4}>*/}
                {/*        <Grid item xs={12} lg={5}>*/}
                {/*            <p className={styles.about}>Kinh Quran - Quran.vn</p>*/}
                {/*            <p className={styles.about}>Quran đó là kinh sách được dành cho nhân loại. Nó là một quy tắc hoàn chỉnh của cuộc sống để cho con người áp dụng.</p>*/}
                {/*            <div className={styles.social}>*/}
                {/*                <a href="https://www.facebook.com/quran.vn" target="_blank"><FacebookIcon /></a>*/}
                {/*                <a href="#" target="_blank"><TwitterIcon /></a>*/}
                {/*                /!*<a href="#" target="_blank"><LinkedinIcon /></a>*!/*/}
                {/*            </div>*/}
                {/*        </Grid>*/}
                {/*        <Grid item xs={12} lg={4}>*/}
                {/*            <h2 className={styles.title}>Download App</h2>*/}
                {/*            <div className={styles.app}>*/}
                {/*                <a href="#" target="_blank">*/}
                {/*                    <Image*/}
                {/*                        src="/img/play_store.png"*/}
                {/*                        alt=""*/}
                {/*                        width={130}*/}
                {/*                        height={44}*/}
                {/*                    />*/}
                {/*                </a>*/}
                {/*                <a href="#" target="_blank">*/}
                {/*                    <Image*/}
                {/*                        src="/img/app_store.webp"*/}
                {/*                        alt=""*/}
                {/*                        width={130}*/}
                {/*                        height={44}*/}
                {/*                    />*/}
                {/*                </a>*/}
                {/*            </div>*/}
                {/*        </Grid>*/}
                {/*        <Grid item xs={12} lg={3}>*/}
                {/*            <h2 className={styles.title}>Useful links</h2>*/}
                {/*            <ul className={styles.links}>*/}
                {/*                <li>*/}
                {/*                    <Link href="/sadaqa">*/}
                {/*                        <a>Sadaqa</a>*/}
                {/*                    </Link>*/}
                {/*                </li>*/}
                {/*                <li>*/}
                {/*                    <Link href="/learn">*/}
                {/*                        <a>Learn Quran</a>*/}
                {/*                    </Link>*/}
                {/*                </li>*/}
                {/*                <li>*/}
                {/*                    <Link href="/rating">*/}
                {/*                        <a>Rating & Review</a>*/}
                {/*                    </Link>*/}
                {/*                </li>*/}
                {/*                <li>*/}
                {/*                    <Link href="/thanks">*/}
                {/*                        <a>Kritoggota</a>*/}
                {/*                    </Link>*/}
                {/*                </li>*/}
                {/*            </ul>*/}
                {/*        </Grid>*/}
                {/*    </Grid>*/}
                {/*</div>*/}

                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        <span>&copy; { new Date().getFullYear() } </span>
                        <Link href="/about" legacyBehavior>
                            <a>{config.domain}</a>
                        </Link>
                        <span> {t('All Rights Reserved')}</span>
                    </p>

                    <ul className={styles.menu}>
                        <li>
                            <Link href="/install-app" legacyBehavior>
                                <a>{t('Install App')}</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/grateful" legacyBehavior>
                                <a>{t('Grateful')}</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" legacyBehavior>
                                <a>{t('Contact')}</a>
                            </Link>
                        </li>
                    </ul>

                    <p className={styles.credit}>{t('Powered By')} - <a href="https://deeniinfotech.com/" target="_blank">Deeni Info Tech</a></p>
                </div>
            </Container>
        </div>
    )
}
