"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import Timer from "@/components/timer"
import Scoreboard from "@/components/scoreboard"

// Mock data - in a real app, this would be fetched from the API
const mockCategories = [
  { id: 1, name: "History" },
  { id: 2, name: "Science" },
  { id: 3, name: "Geography" },
  { id: 4, name: "Entertainment" },
]

const mockQuestions = {
  "1-100": { id: 1, question: "Who was the first president of the United States?", answer: "George Washington" },
  "1-200": { id: 2, question: "In what year did World War II end?", answer: "1945" },
  "1-300": { id: 3, question: "Which empire was ruled by Genghis Khan?", answer: "Mongol Empire" },
  "1-400": { id: 4, question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
  "2-100": { id: 5, question: "What is the chemical symbol for gold?", answer: "Au" },
  "2-200": { id: 6, question: "What is the closest planet to the Sun?", answer: "Mercury" },
  "2-300": { id: 7, question: "What is the hardest natural substance on Earth?", answer: "Diamond" },
  "2-400": { id: 8, question: "What is the largest organ in the human body?", answer: "Skin" },
  "3-100": { id: 9, question: "What is the capital of Japan?", answer: "Tokyo" },
  "3-200": { id: 10, question: "Which is the largest ocean on Earth?", answer: "Pacific Ocean" },
  "3-300": { id: 11, question: "Which country is known as the Land of Fire and Ice?", answer: "Iceland" },
  "3-400": { id: 12, question: "What is the longest river in the world?", answer: "Nile" },
  "4-100": { id: 13, question: "Who played Iron Man in the Marvel Cinematic Universe?", answer: "Robert Downey Jr." },
  "4-200": { id: 14, question: "Which band performed the song 'Bohemian Rhapsody'?", answer: "Queen" },
  "4-300": {
    id: 15,
    question: "What was the highest-grossing film of all time before adjusting for inflation?",
    answer: "Avatar",
  },
  "4-400": { id: 16, question: "Who wrote the Harry Potter series?", answer: "J.K. Rowling" },
}

const pointValues = [100, 200, 300, 400]

export default function GameBoard({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const team1Name = searchParams.get("team1") || "Team 1"
  const team2Name = searchParams.get("team2") || "Team 2"

  const [team1Score, setTeam1Score] = useState(0)
  const [team2Score, setTeam2Score] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)

  const handleSelectQuestion = (categoryId: number, points: number) => {
    const questionKey = `${categoryId}-${points}`

    if (answeredQuestions.includes(questionKey)) {
      return
    }

    const question = mockQuestions[questionKey]
    setCurrentQuestion({ ...question, points, categoryId, key: questionKey })
    setShowAnswer(false)
    setIsDialogOpen(true)
    setIsTimerRunning(true)
  }

  const handleShowAnswer = () => {
    setShowAnswer(true)
    setIsTimerRunning(false)
  }

  const handleTeamAnswer = (team: "team1" | "team2" | "neither") => {
    if (!currentQuestion) return

    if (team === "team1") {
      setTeam1Score((prev) => prev + currentQuestion.points)
    } else if (team === "team2") {
      setTeam2Score((prev) => prev + currentQuestion.points)
    }

    setAnsweredQuestions((prev) => [...prev, currentQuestion.key])
    setIsDialogOpen(false)

    // Check if game is over
    if (answeredQuestions.length + 1 >= Object.keys(mockQuestions).length) {
      setIsGameOver(true)
    }
  }

  const handleTimeUp = () => {
    setIsTimerRunning(false)
    toast({
      title: "Time's up!",
      description: "The 2-minute timer has expired.",
    })
  }

  const handleEndGame = () => {
    router.push("/")
  }

  return (
    <div className="container mx-auto flex min-h-screen flex-col p-4">
      <Scoreboard team1Name={team1Name} team2Name={team2Name} team1Score={team1Score} team2Score={team2Score} />

      <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* Category Headers */}
        {mockCategories.map((category) => (
          <div key={category.id} className="rounded bg-blue-600 p-3 text-center font-bold text-white">
            {category.name}
          </div>
        ))}

        {/* Question Grid */}
        {pointValues.map((points) =>
          mockCategories.map((category) => {
            const questionKey = `${category.id}-${points}`
            const isAnswered = answeredQuestions.includes(questionKey)

            return (
              <Button
                key={`${category.id}-${points}`}
                variant={isAnswered ? "ghost" : "outline"}
                className={`h-24 text-xl font-bold ${isAnswered ? "cursor-default opacity-50" : "hover:bg-blue-50"}`}
                onClick={() => handleSelectQuestion(category.id, points)}
                disabled={isAnswered}
              >
                {isAnswered ? "" : points}
              </Button>
            )
          }),
        )}
      </div>

      {/* Question Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{currentQuestion?.points} Points</DialogTitle>
          </DialogHeader>

          {isTimerRunning && (
            <div className="mb-4">
              <Timer onTimeUp={handleTimeUp} />
            </div>
          )}

          <div className="my-4 text-center text-xl">{currentQuestion?.question}</div>

          {showAnswer && (
            <div className="my-4 rounded-lg bg-blue-50 p-4 text-center text-xl font-bold">
              {currentQuestion?.answer}
            </div>
          )}

          <DialogFooter className="flex-col space-y-2 sm:space-y-0">
            {!showAnswer ? (
              <Button onClick={handleShowAnswer} className="w-full">
                Show Answer
              </Button>
            ) : (
              <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3">
                <Button onClick={() => handleTeamAnswer("team1")} className="bg-green-600 hover:bg-green-700">
                  {team1Name} Correct
                </Button>
                <Button onClick={() => handleTeamAnswer("team2")} className="bg-green-600 hover:bg-green-700">
                  {team2Name} Correct
                </Button>
                <Button onClick={() => handleTeamAnswer("neither")} variant="outline">
                  Neither Correct
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Game Over Dialog */}
      <Dialog open={isGameOver} onOpenChange={setIsGameOver}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Game Over!</DialogTitle>
          </DialogHeader>

          <div className="my-6 space-y-4 text-center">
            <h3 className="text-xl font-semibold">Final Scores</h3>
            <div className="grid grid-cols-2 gap-4 text-lg">
              <div>
                <p className="font-medium">{team1Name}</p>
                <p className="text-2xl font-bold">{team1Score}</p>
              </div>
              <div>
                <p className="font-medium">{team2Name}</p>
                <p className="text-2xl font-bold">{team2Score}</p>
              </div>
            </div>

            <div className="pt-4 text-xl font-bold">
              {team1Score > team2Score
                ? `${team1Name} Wins!`
                : team2Score > team1Score
                  ? `${team2Name} Wins!`
                  : "It's a Tie!"}
            </div>
          </div>

          <Button onClick={handleEndGame} className="w-full">
            Return to Home
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

