import { performSearch } from "../../lib/search"

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end()
    return
  }

  try {
    const { query, page = 1, limit = 10 } = req.query

    // Validate parameters
    const pageNum = Number.parseInt(page, 10)
    const limitNum = Number.parseInt(limit, 10)

    if (isNaN(pageNum) || pageNum < 1 || pageNum > 1000) {
      return res.status(400).json({
        message: "Invalid page number. Must be between 1 and 1000.",
      })
    }

    if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
      return res.status(400).json({
        message: "Invalid limit. Must be between 1 and 100.",
      })
    }

    if (query && query.length > 500) {
      return res.status(400).json({
        message: "Query too long. Maximum 500 characters allowed.",
      })
    }

    const results = performSearch(query || "", pageNum, limitNum)

    // Set caching headers
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600")
    res.setHeader("Content-Type", "application/json; charset=utf-8")

    res.status(200).json(results)
  } catch (error) {
    console.error("API Search Error:", error)
    res.status(500).json({
      message: "An error occurred during search.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    })
  }
}