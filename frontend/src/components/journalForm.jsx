import { useState } from "react"
import { createJournal } from "../services/services"

function JournalForm({ refresh, userId }) {

  const [text, setText] = useState("")
  const [ambience, setAmbience] = useState("forest")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const data = {
        userId: userId,
        text: text,
        ambience: ambience
      }

      console.log("Sending:", data)

      await createJournal(data)

      setText("")
      refresh()

    } catch (error) {

      console.error("Error saving journal:", error.response?.data || error)

    }
  }

  return (
    <div>

      <h2>Write Journal Entry</h2>

      <form onSubmit={handleSubmit}>

        <textarea
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your journal..."
        />

        <br /><br />

        <label>Select Ambience:</label>

        <select
          value={ambience}
          onChange={(e) => setAmbience(e.target.value)}
        >

          <option value="forest">Forest</option>
          <option value="ocean">Ocean</option>
          <option value="mountain">Mountain</option>

        </select>

        <br /><br />

        <button type="submit">Save Entry</button>

      </form>

    </div>
  )
}

export default JournalForm
