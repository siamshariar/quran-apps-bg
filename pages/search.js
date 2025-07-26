import React from "react"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/router"
import Layout from "../components/layouts/layout-chapter"
import Meta from "../components/core/meta"
import { getChaptersInfo, searchQuran } from "../lib/fetch"
import SearchContent from "../components/layout2/search/content"

export default function SearchPage({ chapters, query: initialQuery, page: initialPage, mode }) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(initialQuery || "")
  const [currentPage, setCurrentPage] = useState(Number.parseInt(initialPage) || 1)
  const [searchResults, setSearchResults] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const newQuery = router.query.query || ""
    const newPage = Number.parseInt(router.query.page) || 1
    setSearchQuery(newQuery)
    setCurrentPage(newPage)

    if (newQuery.trim()) {
      setLoading(true)
    }
  }, [router.query.query, router.query.page])

  const fetchSearchResults = useCallback(async (query, page) => {
    if (!query || query.trim().length < 1) {
      setSearchResults([])
      setTotalResults(0)
      setTotalPages(0)
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const results = await searchQuran(query, page, 10)
      setSearchResults(results.verses || [])
      setTotalResults(results.total || 0)
      setTotalPages(Math.ceil((results.total || 0) / 10))
    } catch (error) {
      setSearchResults([])
      setTotalResults(0)
      setTotalPages(0)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      fetchSearchResults(searchQuery, currentPage)
    } else {
      setLoading(false)
    }
  }, [searchQuery, currentPage, fetchSearchResults])

  return (
    <>
      <Meta
        title={searchQuery ? `Search results for "${searchQuery}"` : "Search"}
        description={
          searchQuery
            ? `Search for verses in the Quran containing "${searchQuery}".`
            : "Search for verses in the Quran."
        }
      />
      <SearchContent
        searchQuery={searchQuery}
        searchResults={searchResults}
        totalResults={totalResults}
        totalPages={totalPages}
        currentPage={currentPage}
        chapters={chapters}
        loading={loading}
        hasInstantResults={false}
        backgroundLoading={false}
        mode={mode}
      />
    </>
  )
}

SearchPage.getLayout = function getLayout(page) {
  return <Layout searchQuery={page.props.query}>{React.cloneElement(page, { mode: "search" })}</Layout>
}

export async function getServerSideProps(context) {
  const { query, page = "1" } = context.query

  try {
    const chaptersInfo = await getChaptersInfo()
    return {
      props: {
        chapters: chaptersInfo || [],
        chapterName: chaptersInfo?.[0]?.name || "Al-Fātihah",
        query: query || "",
        page: Number.parseInt(page),
        mode: "search",
      },
    }
  } catch (error) {
    return {
      props: {
        chapters: [],
        chapterName: "Al-Fātihah",
        query: query || "",
        page: 1,
        mode: "search",
      },
    }
  }
}
