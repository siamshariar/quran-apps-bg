"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { getChaptersInfo } from "../../lib/fetch"
import { getLastMultiTranslationChapter } from "../../lib/multi-translation-storage"

export default function MultiTranslationIndex({ chapters }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (chapters && chapters.length > 0) {
      const lastSelectedChapter = getLastMultiTranslationChapter(chapters)

      if (lastSelectedChapter) {
        router.replace(`/multi-translation/chapters/${lastSelectedChapter.slug}`).finally(() => setIsLoading(false))
      } else {
        router.replace(`/multi-translation/chapters/${chapters[0].slug}`).finally(() => setIsLoading(false))
      }
    } else {
      setIsLoading(false)
    }
  }, [chapters, router])

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "18px",
        color: "#666",
      }}
    >
      {isLoading ? "Loading..." : "Redirecting..."}
    </div>
  )
}

export async function getStaticProps() {
  try {
    const chapters = await getChaptersInfo()
    return {
      props: {
        chapters: chapters || [],
      },
      revalidate: 3600,
    }
  } catch (error) {
    return {
      props: {
        chapters: [],
      },
      revalidate: 3600,
    }
  }
}
