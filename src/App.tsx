import { useState } from 'react'
import './App.css'
import FeedbackForm from './Components/FeedbackForm'
import FeaturesGrid from './Components/FeaturesGrid'

function App() {
  const [showFeatures, setShowFeatures] = useState(true);

  return (
    <div className="app-container">
      {showFeatures ? (
        <FeaturesGrid onClose={() => setShowFeatures(false)} />
      ) : (
        <FeedbackForm />
      )}
    </div>
  )
}

export default App