import { useEffect, useState } from "react"
import JournalForm from "./components/journalForm"
import JournalList from "./components/journalList"
import Insights from "./components/insights"
import { getJournals } from "./services/services"
import "./index.css"

function App() {

  const userId = "user1"

  const [journals, setJournals] = useState([])
  const [insights, setInsights] = useState(null)

  const fetchJournals = async () => {
    try {
      const res = await getJournals(userId)
      setJournals(res.data)
    } catch (error) {
      console.error("Error fetching journals:", error)
    }
  }

  useEffect(() => {
    fetchJournals()
  }, [])

  return (
    <div className="container">

      <h1 className="title">AI Journal System</h1>

      <div className="card">
        <JournalForm refresh={fetchJournals} userId={userId} />
      </div>

      <div className="card">
        <JournalList journals={journals} setInsights={setInsights} />
      </div>

      <div className="card">
        <Insights insights={insights} />
      </div>

    </div>
  )
}

export default App
