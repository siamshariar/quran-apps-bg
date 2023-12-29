import { server, config } from '../lib/config'
import SettingsContextProvider from '../contexts/SettingsContext'
import SettingsContent from '../components/settings'
import Meta from '../components/core/meta'
//import Viewport from '../components/core/viewport'
import HeaderMobile from '../components/mobile/header-settings'
// import FooterMobile from '../components/mobile/footer-home'

export default function SettingsPage() {
    return (
        <SettingsContextProvider>
            <Meta
                title={`Settings | ${config?.metaTitle}`}
	            description={config?.metaDescription}
                url={`${server}/settings`}
                image={`${server}/img/logo/${config?.localizationCode}/s_logo.png`}
                type="website"
            />

            <HeaderMobile />

            <main id="viewport" className="viewport viewport_no_footer">
                <div className="settings_page">
					<SettingsContent />
				</div>
            </main>

            {/*<FooterMobile />*/}
        </SettingsContextProvider>
    )
}