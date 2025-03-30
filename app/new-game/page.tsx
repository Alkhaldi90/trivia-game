"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

export default function NewGame() {
  const router = useRouter()
  const [team1Name, setTeam1Name] = useState("Team 1")
  const [team2Name, setTeam2Name] = useState("Team 2")
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock categories - in a real app, these would be fetched from the API
  const categories = [
    { id: 1, name: "History" },
    { id: 2, name: "Science" },
    { id: 3, name: "Geography" },
    { id: 4, name: "Entertainment" },
    { id: 5, name: "Sports" },
    { id: 6, name: "Art & Literature" },
  ]

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const handleStartGame = async () => {
    if (selectedCategories.length < 2) {
      toast({
        title: "Not enough categories",
        description: "Please select at least 2 categories to play.",
        variant: "destructive",
      })
      return
    }

    if (!team1Name.trim() || !team2Name.trim()) {
      toast({
        title: "Team names required",
        description: "Please provide names for both teams.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would be an API call to create a new game session
      // const response = await fetch('/api/session/start', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     team1Name,
      //     team2Name,
      //     categories: selectedCategories
      //   })
      // })
      // const data = await response.json()

      // Mock response
      const sessionId = Math.floor(Math.random() * 1000)

      // Redirect to the game board
      router.push(`/game/${sessionId}?team1=${encodeURIComponent(team1Name)}&team2=${encodeURIComponent(team2Name)}`)
    } catch (error) {
      console.error("Failed to start game:", error)
      toast({
        title: "Error",
        description: "Failed to start the game. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">New Trivia Game</CardTitle>
          <CardDescription>Set up your teams and select categories</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="team1">Team 1 Name</Label>
              <Input
                id="team1"
                value={team1Name}
                onChange={(e) => setTeam1Name(e.target.value)}
                placeholder="Enter team name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="team2">Team 2 Name</Label>
              <Input
                id="team2"
                value={team2Name}
                onChange={(e) => setTeam2Name(e.target.value)}
                placeholder="Enter team name"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Select Categories (2-6)</Label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
                    disabled={selectedCategories.length >= 6 && !selectedCategories.includes(category.id)}
                  />
                  <Label htmlFor={`category-${category.id}`} className="cursor-pointer">
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleStartGame} className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
            {isLoading ? "Setting up game..." : "Start Game"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

