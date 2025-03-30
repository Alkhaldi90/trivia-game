interface ScoreboardProps {
  team1Name: string
  team2Name: string
  team1Score: number
  team2Score: number
}

export default function Scoreboard({ team1Name, team2Name, team1Score, team2Score }: ScoreboardProps) {
  return (
    <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-100 p-4 shadow-md">
      <div className={`rounded-lg p-4 text-center ${team1Score >= team2Score ? "bg-blue-100" : ""}`}>
        <h3 className="text-lg font-medium">{team1Name}</h3>
        <p className="text-3xl font-bold">{team1Score}</p>
      </div>
      <div className={`rounded-lg p-4 text-center ${team2Score >= team1Score ? "bg-blue-100" : ""}`}>
        <h3 className="text-lg font-medium">{team2Name}</h3>
        <p className="text-3xl font-bold">{team2Score}</p>
      </div>
    </div>
  )
}

