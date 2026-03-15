function Insights({ insights }) {

  if(!insights) return null

  return(

    <div>

      <h2>Insights</h2>

      <div className="insight-box">

        <p><b>Emotion:</b> {insights.emotion}</p>

        <p><b>Summary:</b> {insights.summary}</p>

        <p><b>Keywords:</b> {insights.keywords?.join(", ")}</p>

      </div>

    </div>

  )

}

export default Insights
