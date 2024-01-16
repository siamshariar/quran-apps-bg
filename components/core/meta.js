import { server, config } from "../../lib/config"
import Head from 'next/head'
import {useContext} from "react";
import {SettingsContext} from "../../contexts/SettingsContext";

export default function Meta(props) {
    const { theme } = useContext(SettingsContext);
    const themedColor = theme === "light"
        ? "#ffffff"
        : "#232a3b"
    return (
        <Head>
            <meta charSet="utf-8" />
            {/*<meta*/}
            {/*    name="viewport"*/}
            {/*    content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, uc-fitscreen=yes, viewport-fit=cover"*/}
            {/*/>*/}
            <meta
                name='viewport'
                content='minimum-scale=1, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
            />

            <meta name="mobile-wep-app-capable" content="yes" />
            <meta name="apple-mobile-wep-app-capable" content="yes" />

            <meta name="description" content={props.description || ""} />
            <meta name="author" content="" />
            <meta name="keywords" content="" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

            {/* Android phone */}
            <meta name="theme-color" content={themedColor} />
            <meta name="mobile-web-app-capable" content="yes" />

            {/* iOS phone */}
            <meta name="apple-mobile-web-app-title" content="" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content={themedColor} />

            {/* Windows phone */}
            <meta name="msapplication-navbutton-color" content={themedColor} />
            <meta name="msapplication-TileColor" content={themedColor} />
            {/* <meta name="msapplication-TileImage" content="ms-icon-144x144.png`} /> */}
            {/* <meta name="msapplication-config" content="browserconfig.xml" /> */}

            {/* Pinned Sites */}
            <meta name="application-name" content={config.metaTitle} />
            <meta name="msapplication-tooltip" content="Tooltip Text" />
            <meta name="msapplication-starturl" content={props.url || ""} />

            {/* Tap highlighting */}
            <meta name="msapplication-tap-highlight" content="no" />

            {/* UC Mobile Browser */}
            <meta name="full-screen" content="yes" />
            <meta name="browsermode" content="application" />

            {/* Disable night mode for this page */}
            <meta name="nightmode" content="disable" />

            {/* Layout mode - content="fitscreen/standard" */}
            <meta name="layoutmode" content="fitscreen" />

            {/* imagemode - show image even in text only mode */}
            <meta name="imagemode" content="force" />

            {/* Orientation */}
            <meta name="screen-orientation" content="portrait" />

            {/* format-detection */}
            <meta name="format-detection" content="telephone=no" />

            {/* meta information for facebook */}
            <meta
                property="og:title"
                content={props.title || ""}
                key="ogtitle"
            />
            <meta
                property="og:url"
                content={props.url || ""}
                key="ogurl"
            />
            <meta
                property="og:image"
                content={props.image || ""}
                key="ogimage"
            />
            <meta
                property="og:type"
                content={props.type || "website"}
                key="ogtype"
            />
            <meta
                property="og:description"
                content={props.description || ""}
                key="ogdesc"
            />
            <meta
                property="og:locale"
                content="en"
                key="oglocale"
            />
            <meta
                property="og:site_name"
                content={config.metaTitle}
                key="ogsitename"
            />

            {/* meta information for twitter */}
            <meta
                name="twitter:card"
                content="summary"
                key="twcard"
            />
            <meta
                name="twitter:site"
                content={`@${config.domain}`}
                key="twsite"
            />
            <meta
                name="twitter:url"
                content={props.url || ""}
                key="twurl"
            />
            <meta
                name="twitter:title"
                content={props.title || ""}
                key="twtitle"
            />
            <meta
                name="twitter:description"
                content={props.description || ""}
                key="twdesc"
            />
            <meta
                name="twitter:image"
                content={props.image || ""}
                key="twimage"
            />

            {/* favicon */}
            {/* Main Link Tags */}
            <link href={`${server}/img/favicon/${config.localizationCode}/favicon-16x16.png`} rel="icon" type="image/png" sizes="16x16" />
            <link href={`${server}/img/favicon/${config.localizationCode}/favicon-32x32.png`} rel="icon" type="image/png" sizes="32x32" />
            <link href={`${server}/img/favicon/${config.localizationCode}/favicon-48x48.png`} rel="icon" type="image/png" sizes="48x48" />

            {/* iOS */}
            <link href={`${server}/app/${config.localizationCode}/logo/App_Logo_384.png`} rel="apple-touch-icon" />
            <link href={`${server}/app/${config.localizationCode}/logo/App_Logo_192.png`} rel="apple-touch-icon" sizes="76x76" />
            <link href={`${server}/app/${config.localizationCode}/logo/App_Logo_192.png`} rel="apple-touch-icon" sizes="120x120" />
            <link href={`${server}/app/${config.localizationCode}/logo/App_Logo_192.png`} rel="apple-touch-icon" sizes="152x152" />
            <link href={`${server}/app/${config.localizationCode}/logo/App_Logo_192.png`} rel="apple-touch-icon" sizes="180x180" />

            {/* Startup Image */}
            <link href={`${server}/app/${config.localizationCode}/logo/App_Logo_384.png`} rel="apple-touch-startup-image" />

            {/* Pinned Tab */}
            <link href={`${server}/app/${config.localizationCode}/logo/App_Logo_384.png`} rel="mask-icon" size="any" color="#5bbad5" />

            {/* Android */}
            <link href={`${server}/app/${config.localizationCode}/logo/App_Logo_192.png`} rel="icon" sizes="192x192" />
            <link href={`${server}/app/${config.localizationCode}/logo/App_Logo_192.png`} rel="icon" sizes="128x128" />

            {/* UC Browser */}
            <link href={`${server}/img/favicon/${config.localizationCode}/favicon.ico`} rel="apple-touch-icon-precomposed" sizes="57x57" />
            <link href={`${server}/img/favicon/${config.localizationCode}/favicon.ico`} rel="apple-touch-icon" sizes="72x72" />

            {/* Others */}
            <link href={`${server}/img/favicon/${config.localizationCode}/favicon.png`} rel="shortcut icon" type="image/x-icon" />

            <link rel="manifest" href={`${server}/app/${config.localizationCode}/manifest/manifest.webmanifest`} />
            <script async src="https://cdn.jsdelivr.net/npm/pwacompat" crossOrigin="anonymous"></script>

            {/*Manifest.json*/}
            <link href={`${server}/app/${config.localizationCode}/manifest/manifest.json`} rel="manifest" />

            {/* page title */}
            {/* <title>{props.title != "" ? props.title + " | " : ""} {"Kinh Quran | Quran in Vietnamese | Quran.vn"}</title> */}
            <title>{`${props?.title || config.metaTitle || ""} | ${config.metaDescription || ''}`}</title>
        </Head>
    )
}
