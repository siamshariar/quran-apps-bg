import { Suspense } from "react"
import { getChaptersInfo, searchQuran } from "../../lib/fetch" // Import searchQuran
import SearchContent from "../../components/layout2/search/content"
import Layout from "../../components/layouts/layout-chapter"
import Meta from "../../components/core/meta"

async function SearchPageContent({ searchParams }) {
  const params = await searchParams
  const query = params.query || ""
  const page = Number.parseInt(params.page || "1", 10)

  let chapters = []
  let chapterName = "Al-Fātihah"
  let searchResults = []
  let totalResults = 0
  let totalPages = 0
  let initialLoading = true
  try {
    const chaptersInfo = await getChaptersInfo()
    chapters = chaptersInfo || []
    chapterName = chaptersInfo?.[0]?.name || "Al-Fātihah"

    if (query.trim()) {
      const results = await searchQuran(query, page, 10)
      searchResults = results.verses || []
      totalResults = results.total || 0
      totalPages = Math.ceil((results.total || 0) / 10)
      initialLoading = false 
    } else {
      initialLoading = false 
    }
  } catch (error) {
    initialLoading = false 
  }

  return (
    <>
      <Meta
        title={query ? `Search results for "${query}"` : "Search"}
        description={
          query ? `Search for verses in the Quran containing "${query}".` : "Search for verses in the Quran."
        }
      />
      <Layout searchQuery={query}>
        <SearchContent
          key={query + page} 
          searchQuery={query}
          searchResults={searchResults}
          totalResults={totalResults} 
          totalPages={totalPages}
          currentPage={page}
          chapters={chapters}
          loading={initialLoading} 
          hasInstantResults={true} 
          backgroundLoading={false}
          mode="search"
        />
      </Layout>
    </>
  )
}

export default function SearchPage({ searchParams }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent searchParams={searchParams} />
    </Suspense>
  )
}
