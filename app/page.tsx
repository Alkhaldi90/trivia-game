import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-4xl font-bold text-blue-800">Trivia Challenge</h1>
        <p className="mb-8 text-center text-lg text-gray-600">
          Test your knowledge with our interactive team-based trivia game!
        </p>

        <div className="flex flex-col items-center justify-center space-y-4">
          <Link href="/new-game" className="w-full max-w-md">
            <Button className="w-full bg-blue-600 py-6 text-lg hover:bg-blue-700">Start New Game</Button>
          </Link>

          <Link href="/how-to-play" className="w-full max-w-md">
            <Button variant="outline" className="w-full border-blue-300 py-6 text-lg text-blue-600 hover:bg-blue-50">
              How To Play
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

