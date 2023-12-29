import { useState } from 'react'
import SettingsContextProvider from '../../contexts/SettingsContext'
import Meta from '../../components/core/meta'
import SearchModal from '../../components/core/search-modal'
import HeaderWeb from '../../components/web/header'
import HeaderMobile from '../../components/mobile/header-content'
import FooterWeb from '../../components/web/footer'
//import FooterMobile from '../../components/mobile/footer-home'
//import Sidenav from '../../components/sidenav'
import Container from '../../components/core/container'
import SampleContent from '../../components/pages/sample-content'
import { config } from '../../lib/config'

export default function ContentPage() {
    const [searchModalOpen, updateSearchModalOpen] = useState(false)

    const searchModalController = open => {
        updateSearchModalOpen(open)
    }

    return (
        <SettingsContextProvider>
            <Meta
                title={config?.metaTitle}
                description={config?.metaDescription}
                url="http://quran.vn/"
                image="/img/web_image.jpg"
                type="website"
            />

            <SearchModal
                open={searchModalOpen}
                searchModalController={searchModalController}
            />

            {/* <Sidenav chapters={chapters} /> */}

            <HeaderWeb
                page="home"
                searchModalController={searchModalController}
            />

            <HeaderMobile
                //searchModalController={searchModalController}
                title="Content"
            />

            <main id="viewport" className="viewport viewport_no_footer">
                <div className="content">
                    <Container>
                        <div className="content_wrapper">
                            <SampleContent />
                        </div>
                    </Container>
                </div>
            </main>

            <FooterWeb />

            {/* <FooterMobile /> */}
        </SettingsContextProvider>
    )
}