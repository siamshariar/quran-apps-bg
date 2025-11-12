import { server, config, t, getFirstAvailableTranslation, getAvailableTranslations, translationData, buildChapterUrl, isFirstTranslation } from "../../../lib/config"
import { getChaptersInfo, getChapterDetails, getChapterTransliteration } from "../../../lib/fetch"
import Layout from "../../../components/layouts/layout-chapter"
import Meta from "../../../components/core/meta"
import ChapterContent from "../../../components/layout2/surah/content"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function Chapter({
  chapters,
  chapterNo,
  chapterName,
  chapterSlug,
  chapterMp3Url,
  verses: initialVerses,
  allTranslations: initialAllTranslations,
  contentTitle,
  mode,
  loading: initialLoading = false,
  translationCode: initialTranslationCode,
  availableTranslations: initialAvailableTranslations,
}) {
  const router = useRouter()
  const [verses, setVerses] = useState(initialVerses)
  const [allTranslations, setAllTranslations] = useState(initialAllTranslations)
  const [translationCode, setTranslationCode] = useState(initialTranslationCode)
  const [availableTranslations, setAvailableTranslations] = useState(initialAvailableTranslations)
  const [loading, setLoading] = useState(initialLoading)
  const [currentSlug, setCurrentSlug] = useState(chapterSlug)
  const [currentChapterNo, setCurrentChapterNo] = useState(chapterNo)
  const [currentChapterName, setCurrentChapterName] = useState(chapterName)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  // Detect when URL slug changes (navigating to different chapter)
  useEffect(() => {
    if (router.query.slug && router.query.slug !== currentSlug) {
      console.log(`🔄 Base route: Chapter changed from ${currentSlug} to ${router.query.slug}`)
      
      // Find the new chapter info
      const newChapter = chapters.find(ch => ch.slug === router.query.slug)
      if (newChapter) {
        setCurrentSlug(router.query.slug)
        setCurrentChapterNo(newChapter.id || newChapter.chapterNo)
        setCurrentChapterName(newChapter.name)
        setIsInitialLoad(false)
      }
    }
  }, [router.query.slug, currentSlug, chapters])

  // Fetch data when chapter changes
  useEffect(() => {
    // Skip initial load - we already have data from getStaticProps
    if (isInitialLoad) {
      setIsInitialLoad(false)
      return
    }

    // Skip if no chapter number
    if (!currentChapterNo) return

    const fetchChapterData = async () => {
      console.log(`🔄 Base route: Fetching chapter ${currentChapterNo} (${currentSlug}) with translation: ${translationCode}`)
      setLoading(true)

      try {
        // Fetch ONLY the translation data (verses contain both Arabic and translation)
        const chapterDetails = await getChapterDetails(currentChapterNo, translationCode)
        
        if (chapterDetails && chapterDetails.verses) {
          setVerses(chapterDetails.verses)

          // Update allTranslations - no need to fetch additional translations
          // Just update the current translation
          const newAllTranslations = {
            ...allTranslations,
            [translationCode]: chapterDetails.verses,
          }

          setAllTranslations(newAllTranslations)
          
          console.log(`✅ Base route: Updated chapter ${currentChapterNo} with translation ${translationCode}`)
        } else {
          console.error(`No data returned for chapter ${currentChapterNo}`)
        }
      } catch (error) {
        console.error('Error fetching chapter data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchChapterData()
  }, [currentChapterNo]) // Only re-fetch when chapter changes (NOT translation, as that redirects)

  // Check if we should redirect to a translation-specific URL
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    try {
      const savedSettings = localStorage.getItem('settings')
      if (savedSettings) {
        const settings = JSON.parse(savedSettings)
        const savedTranslation = settings.translation
        
        // If saved translation is different from first translation, redirect
        if (savedTranslation && !isFirstTranslation(savedTranslation)) {
          const newUrl = buildChapterUrl(savedTranslation, chapterSlug)
          console.log(`Base route: Redirecting to saved translation URL: ${newUrl}`)
          router.replace(newUrl)
        }
      }
    } catch (error) {
      console.error('Error checking saved translation:', error)
    }
  }, [chapterSlug, router])

  // Handle router loading state
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  // Debug: Log the props
  useEffect(() => {
    console.log('=== BASE ROUTE COMPONENT DEBUG ===')
    console.log('Chapter No:', chapterNo)
    console.log('Chapter Name:', chapterName)
    console.log('Translation Code:', translationCode)
    console.log('Verses:', verses ? `${verses.length} verses` : 'NO VERSES')
    console.log('All Translations:', allTranslations ? Object.keys(allTranslations) : 'NO TRANSLATIONS')
    console.log('Chapters:', chapters ? `${chapters.length} chapters` : 'NO CHAPTERS')
    console.log('Loading:', loading)
    console.log('================================')
  }, [chapterNo, verses, allTranslations, chapters])

  // Listen for translation changes from settings
  useEffect(() => {
    const handleTranslationChange = async (event) => {
      const newTranslation = event.detail.translation
      
      if (newTranslation === translationCode) {
        return // Already showing this translation
      }

      console.log(`Base route: Translation changed from ${translationCode} to ${newTranslation}`)
      
      setLoading(true)
      setTranslationCode(newTranslation)

      try {
        // Fetch new translation data
        const chapterDetails = await getChapterDetails(chapterNo, newTranslation)
        
        if (chapterDetails && chapterDetails.verses) {
          setVerses(chapterDetails.verses)

          // Get available translations for the new translation's language
          const currentLanguage = Object.keys(translationData).find(lang => 
            translationData[lang].some(t => t.code === newTranslation)
          )
          
          const newAvailableTranslations = currentLanguage 
            ? translationData[currentLanguage] 
            : [{ code: newTranslation, name: newTranslation }]
          
          setAvailableTranslations(newAvailableTranslations)

          // Update allTranslations object
          const newAllTranslations = {
            [newTranslation]: chapterDetails.verses,
          }

          // Fetch additional translations for this language
          const otherTranslations = newAvailableTranslations.filter(t => t.code !== newTranslation)
          
          if (otherTranslations.length > 0) {
            try {
              const otherTranslationData = await Promise.all(
                otherTranslations.slice(0, 2).map(t =>
                  getChapterDetails(chapterNo, t.code).catch(() => null)
                )
              )

              otherTranslations.slice(0, 2).forEach((trans, index) => {
                if (otherTranslationData[index] && otherTranslationData[index].verses) {
                  newAllTranslations[trans.code] = otherTranslationData[index].verses
                }
              })
            } catch (error) {
              console.error('Error loading additional translations:', error)
            }
          }

          setAllTranslations(newAllTranslations)
        }
      } catch (error) {
        console.error('Error fetching new translation:', error)
      } finally {
        setLoading(false)
      }
    }

    window.addEventListener('translationChanged', handleTranslationChange)
    
    return () => {
      window.removeEventListener('translationChanged', handleTranslationChange)
    }
  }, [translationCode, chapterNo])

  // Safeguard: Show error if critical data is missing
  if (!verses || !allTranslations || !chapters) {
    console.error('=== CRITICAL DATA MISSING ===')
    console.error('Verses:', !!verses, verses?.length)
    console.error('AllTranslations:', !!allTranslations, allTranslations ? Object.keys(allTranslations) : 'null')
    console.error('Chapters:', !!chapters, chapters?.length)
    console.error('============================')
    
    return (
      <Layout>
        <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#fff', minHeight: '100vh' }}>
          <h2 style={{ color: 'red' }}>Error: Critical data missing</h2>
          <p>Some required data is not available:</p>
          <pre style={{ textAlign: 'left', backgroundColor: '#f5f5f5', padding: '1rem' }}>
{`Verses: ${!!verses} (${verses?.length || 0} items)
All Translations: ${!!allTranslations} (keys: ${allTranslations ? Object.keys(allTranslations).join(', ') : 'none'})
Chapters: ${!!chapters} (${chapters?.length || 0} items)
Translation Code: ${translationCode}
Chapter No: ${chapterNo}`}
          </pre>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', fontSize: '16px' }}>
            Reload Page
          </button>
        </div>
      </Layout>
    )
  }

  console.log('=== RENDERING CHAPTER CONTENT ===')

  return (
    <>
      <Meta
        title={`${t("Chapter")} ${chapterName} | ${config?.metaTitle}`}
        description={`Chapter ${chapterName}. ${config?.metaDescription}`}
        url={`${server}/chapters/${chapterSlug}`}
        image={`${server}/img/logo/${config?.localizationCode}/s_logo.png`}
        type="website"
      />
      <ChapterContent
        contentType={mode}
        contentTitle={contentTitle}
        chapterNo={chapterNo}
        chapterName={chapterName}
        chapterSlug={chapterSlug}
        chapterMp3Url={chapterMp3Url}
        verses={verses}
        allTranslations={allTranslations}
        chapters={chapters}
        loading={loading}
        currentTranslation={translationCode}
        availableTranslations={availableTranslations}
      />
    </>
  )
}

Chapter.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export async function getStaticProps(context) {
  const slug = context.params.slug
  
  // Use the first available translation for base route
  const translationCode = getFirstAvailableTranslation()
  const availableTranslations = getAvailableTranslations()

  try {
    const decodedSlug = decodeURIComponent(slug)
    const chaptersInfo = await getChaptersInfo()
    const chapter = chaptersInfo.find((ch) => ch.slug === decodedSlug)
    
    if (!chapter) {
      return { notFound: true }
    }

    const chapterNo = chapter.id || chapter.chapterNo
    
    console.log(`Base route: Fetching chapter ${chapterNo} (${chapter.slug}) with first translation: ${translationCode}`)

    // Fetch the primary (first) translation
    const chapterDetails = await getChapterDetails(chapterNo, translationCode)
    
    if (!chapterDetails || !chapterDetails.verses) {
      console.error(`Failed to load first translation ${translationCode} for chapter ${chapterNo}`)
      return { notFound: true }
    }

    // Prepare allTranslations object
    const allTranslationsObj = {
      [translationCode]: chapterDetails.verses,
    }

    // Fetch other available translations for this language (up to 2 more)
    const otherTranslations = availableTranslations.filter(t => t.code !== translationCode)
    
    if (otherTranslations.length > 0) {
      try {
        const otherTranslationData = await Promise.all(
          otherTranslations.slice(0, 2).map(t =>
            getChapterDetails(chapterNo, t.code).catch(() => null)
          )
        )

        otherTranslations.slice(0, 2).forEach((trans, index) => {
          if (otherTranslationData[index] && otherTranslationData[index].verses) {
            allTranslationsObj[trans.code] = otherTranslationData[index].verses
          }
        })
      } catch (error) {
        console.error('Error loading additional translations:', error)
      }
    }

    console.log(`Base route loaded translations:`, Object.keys(allTranslationsObj))

    return {
      props: {
        chapterNo,
        chapterName: chapter.name,
        chapterSlug: chapter.slug,
        chapterMp3Url: chapterDetails.mp3Url,
        verses: chapterDetails.verses,
        allTranslations: allTranslationsObj,
        chapters: chaptersInfo,
        contentTitle: chapter.name,
        mode: "chapter",
        loading: false,
        translationCode,
        availableTranslations,
      },
      revalidate: 86400,
    }
  } catch (error) {
    console.error("Error in getStaticProps:", error)
    return {
      notFound: true,
    }
  }
}

export async function getStaticPaths() {
  try {
    const chapters = await getChaptersInfo()
    
    if (!chapters || !Array.isArray(chapters)) {
      console.error('Failed to load chapters info for static paths')
      return {
        paths: [],
        fallback: 'blocking',
      }
    }

    const paths = chapters.map((chapter) => ({
      params: {
        slug: chapter.slug,
      },
    }))

    return {
      paths,
      fallback: 'blocking',
    }
  } catch (error) {
    console.error('Error in getStaticPaths:', error)
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
}
