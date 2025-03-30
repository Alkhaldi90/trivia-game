import { NextResponse } from "next/server"

// In a real application, this would fetch data from your MySQL database
export async function GET() {
  // Mock data for demonstration
  const categories = [
    { id: 1, name: "History" },
    { id: 2, name: "Science" },
    { id: 3, name: "Geography" },
    { id: 4, name: "Entertainment" },
    { id: 5, name: "Sports" },
    { id: 6, name: "Art & Literature" },
  ]

  return NextResponse.json({ categories })
}

