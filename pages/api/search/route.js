import { NextResponse } from "next/server"
import { performSearch } from "../../../lib/search"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query") || ""
    const page = Number.parseInt(searchParams.get("page") || "1", 10)
    const limit = Number.parseInt(searchParams.get("limit") || "10", 10)

    if (page < 1 || page > 1000) {
      return NextResponse.json({ message: "Invalid page number. Must be between 1 and 1000." }, { status: 400 })
    }

    if (limit < 1 || limit > 100) {
      return NextResponse.json({ message: "Invalid limit. Must be between 1 and 100." }, { status: 400 })
    }

    if (query.length > 500) {
      return NextResponse.json({ message: "Query too long. Maximum 500 characters allowed." }, { status: 400 })
    }

    const results = performSearch(query, page, limit)

    const response = NextResponse.json(results)
    response.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600")
    response.headers.set("Content-Type", "application/json; charset=utf-8")

    return response
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred during search.",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { query, page = 1, limit = 10, filters = {} } = body

    if (!query || typeof query !== "string") {
      return NextResponse.json({ message: "Query is required and must be a string." }, { status: 400 })
    }

    const results = performSearch(query, page, limit)

    const response = NextResponse.json(results)
    response.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600")

    return response
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred during search.",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}
