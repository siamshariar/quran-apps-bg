"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import NavigateBefore from "../icons/NavigateBefore"
import NavigateNext from "../icons/NavigateNext"
import styles from "./search-pagination.module.scss"

export default function SearchPagination({ currentPage, totalPages, searchQuery, totalResults }) {
  const router = useRouter()

  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      }
    }
    return pages
  }

  const createPageUrl = (page) => {
    return `/search?query=${encodeURIComponent(searchQuery)}&page=${page}`
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className={styles.wrapper}>
      <div className={styles.pagination_container}>
        <div className={styles.pagination_controls}>
          {/* Previous button */}
          <div className={styles.prev}>
            {currentPage > 1 ? (
              <Link href={createPageUrl(currentPage - 1)} legacyBehavior>
                <a className={styles.link}>
                  <span className={styles.icon}>
                    <NavigateBefore />
                  </span>
                  <span className={styles.text}>Previous</span>
                </a>
              </Link>
            ) : (
              <span className={`${styles.link} ${styles.disabled}`}>
                <span className={styles.icon}>
                  <NavigateBefore />
                </span>
                <span className={styles.text}>Previous</span>
              </span>
            )}
          </div>
          {/* Page numbers */}
          <div className={styles.page_numbers}>
            {pageNumbers.map((page, index) => (
              <div key={index} className={styles.page_item}>
                {page === "..." ? (
                  <span className={styles.ellipsis}>...</span>
                ) : (
                  <Link href={createPageUrl(page)} legacyBehavior>
                    <a className={`${styles.page_link} ${page === currentPage ? styles.active : ""}`}>{page}</a>
                  </Link>
                )}
              </div>
            ))}
          </div>
          {/* Next button */}
          <div className={styles.next}>
            {currentPage < totalPages ? (
              <Link href={createPageUrl(currentPage + 1)} legacyBehavior>
                <a className={styles.link}>
                  <span className={styles.text}>Next</span>
                  <span className={styles.icon}>
                    <NavigateNext />
                  </span>
                </a>
              </Link>
            ) : (
              <span className={`${styles.link} ${styles.disabled}`}>
                <span className={styles.text}>Next</span>
                <span className={styles.icon}>
                  <NavigateNext />
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
