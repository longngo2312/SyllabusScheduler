import { useState } from 'react' // Add use state



export default function App(){
  const [upload, setUploads] = useState(0); //add state
  return(
    <div className="first-div">
      <div className="second-div">
        <h1 className="project-header">Syllabus Scheduler</h1>
        <p className="motto-sentence">Upload syllabus -{">"} Get study plan</p>
        <button 
          className="button"
          onClick={() => setUploads(upload + 1)}
        >
        Syllabi: {upload} 
        </button>
      </div>
    </div>
  )
}