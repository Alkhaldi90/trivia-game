"use client"

import { useState, useEffect } from "react"

interface TimerProps {
  onTimeUp: () => void
}

export default function Timer({ onTimeUp }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeUp])

  // Get color based on remaining time
  const getTimerColor = () => {
    if (timeLeft > 90) return "bg-green-500" // 0:00 - 1:00
    if (timeLeft > 60) return "bg-yellow-500" // 1:00 - 1:30
    return "bg-red-500" // 1:30 - 2:00
  }

  // Format time as MM:SS
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Calculate progress percentage
  const progressPercentage = (timeLeft / 120) * 100

  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between text-sm">
        <span>Time Remaining</span>
        <span className="font-medium">{formatTime()}</span>
      </div>
      <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full ${getTimerColor()} transition-all duration-1000`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  )
}

