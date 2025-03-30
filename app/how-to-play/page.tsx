import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HowToPlay() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">How To Play</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Game Setup</h3>
            <ul className="list-inside list-disc space-y-2 pl-4">
              <li>Enter names for both teams</li>
              <li>Select 2-6 categories for your game</li>
              <li>Click "Start Game" to begin</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Gameplay</h3>
            <ul className="list-inside list-disc space-y-2 pl-4">
              <li>Teams take turns selecting a question by clicking on a point value</li>
              <li>A 2-minute timer starts when the question appears</li>
              <li>
                The timer changes color as time passes:
                <ul className="list-inside list-disc pl-6">
                  <li>
                    <span className="text-green-500">Green</span> (0:00 – 1:00)
                  </li>
                  <li>
                    <span className="text-yellow-500">Yellow</span> (1:00 – 1:30)
                  </li>
                  <li>
                    <span className="text-red-500">Red</span> (1:30 – 2:00)
                  </li>
                </ul>
              </li>
              <li>The moderator reveals the answer and selects which team(s) answered correctly</li>
              <li>Points are awarded to teams with correct answers</li>
              <li>The game ends when all questions have been answered</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Scoring</h3>
            <ul className="list-inside list-disc space-y-2 pl-4">
              <li>Each question is worth the point value shown on its tile</li>
              <li>Only correct answers earn points</li>
              <li>The team with the highest score at the end wins</li>
            </ul>
          </div>
        </CardContent>
        <div className="flex justify-center p-6">
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700">Back to Home</Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}

