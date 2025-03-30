import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const sessionId = params.id

    // In a real application, this would fetch the current game state from your MySQL database

    // Mock data for demonstration
    const gameStatus = {
      id: sessionId,
      isActive: true,
      teams: [
        { id: 1, name: "Team 1", score: 300 },
        { id: 2, name: "Team 2", score: 200 },
      ],
      answeredQuestions: ["1-100", "2-200", "3-300"],
      remainingQuestions: 13, // Total questions - answered questions
    }

    return NextResponse.json(gameStatus)
  } catch (error) {
    console.error("Error fetching session status:", error)
    return NextResponse.json({ error: "Failed to fetch session status" }, { status: 500 })
  }
}

