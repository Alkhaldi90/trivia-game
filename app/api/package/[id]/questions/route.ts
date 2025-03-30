import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const packageId = params.id

    // In a real application, this would fetch questions from your MySQL database
    // based on the package ID

    // Mock data for demonstration
    const questions = [
      {
        id: 1,
        question: "Who was the first president of the United States?",
        answer: "George Washington",
        points: 100,
      },
      {
        id: 2,
        question: "What is the chemical symbol for gold?",
        answer: "Au",
        points: 200,
      },
      // More questions would be here
    ]

    return NextResponse.json({ questions })
  } catch (error) {
    console.error("Error fetching questions:", error)
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 })
  }
}

