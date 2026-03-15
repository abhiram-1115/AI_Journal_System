import { analyzeJournal } from "../services/services"

function JournalList({ journals, setInsights }) {

  const handleAnalyze = async (text) => {

    try {

      const res = await analyzeJournal({ text })

      setInsights(res.data)

    } catch (error) {

      console.error("Analyze error:", error)

    }

  }

  return (

    <div>

      <h2>Previous Entries</h2>

      {journals.map((j,index)=>(
        
        <div key={index} className="entry">

          <p>{j.text}</p>

          <p><b>Ambience:</b> {j.ambience}</p>

          <button onClick={()=>handleAnalyze(j.text)}>
            Analyze
          </button>

        </div>

      ))}

    </div>

  )

}

export default JournalList
