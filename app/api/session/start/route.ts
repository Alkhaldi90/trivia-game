import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { team1Name, team2Name, categories } = body

    // Validate request
    if (!team1Name || !team2Name || !categories || categories.length < 2) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real application, this would:
    // 1. Create teams in the database if they don't exist
    // 2. Create a new game session
    // 3. Associate the selected categories with the session

    // Mock response for demonstration
    const sessionId = Math.floor(Math.random() * 1000)

    return NextResponse.json({
      success: true,
      sessionId,
      teams: [
        { id: 1, name: team1Name, score: 0 },
        { id: 2, name: team2Name, score: 0 },
      ],
    })
  } catch (error) {
    console.error("Error starting session:", error)
    return NextResponse.json({ error: "Failed to start game session" }, { status: 500 })
  }
}

