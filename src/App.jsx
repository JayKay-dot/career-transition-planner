import { useState } from 'react'
import Survey from './components/Survey'
import Report from './components/Report'
import PrioritySummary from './components/PrioritySummary'
import './App.css'

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [answers, setAnswers] = useState({
    workBasics: {
      hoursPerWeek: '',
      motivation: [],
      clinicalType: [],
      travelWillingness: ''
    },
    industryInterests: {
      locumTenens: false,
      pharma: false,
      expertWitness: false,
      payer: false,
      teaching: false,
      medTech: false,
      telehealth: false,
      consulting: false,
      boardPositions: false
    },
    healthLifestyle: {
      fitnessGoals: [],
      activities: [],
      energyPreference: ''
    },
    purposePassions: {
      volunteering: [],
      hobbies: [],
      somedayDreams: ''
    },
    socialSpiritual: {
      familyTime: '',
      socialActivities: [],
      spiritualConnection: '',
      travelPlans: []
    }
  })
  const [showReport, setShowReport] = useState(false)
  const [priorities, setPriorities] = useState([])

  const updateAnswers = (section, field, value) => {
    setAnswers(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const toggleArrayValue = (section, field, value) => {
    setAnswers(prev => {
      const currentArray = prev[section][field] || []
      const newArray = currentArray.includes(value)
        ? currentArray.filter(v => v !== value)
        : [...currentArray, value]
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newArray
        }
      }
    })
  }

  const setPriorityLevel = (item, level) => {
    // Remove from any existing level first
    setPriorities(prev => {
      const filtered = prev.filter(p => p.id !== item.id)
      if (level === null) {
        return filtered // Just remove
      }
      return [...filtered, { ...item, priorityLevel: level }]
    })
  }

  const removePriority = (priorityId) => {
    setPriorities(prev => prev.filter(p => p.id !== priorityId))
  }

  const getPriorityLevel = (itemId) => {
    const found = priorities.find(p => p.id === itemId)
    return found ? found.priorityLevel : null
  }

  const sections = [
    'Work Basics',
    'Industry & Advisory Interests',
    'Health & Lifestyle',
    'Purpose & Passions',
    'Family, Social & Spiritual'
  ]

  return (
    <div className="app">
      <header className="app-header">
        <h1>Career Transition Planner</h1>
        <p className="subtitle">Your personalized guide to a fulfilling next chapter</p>
      </header>

      {!showReport ? (
        <>
          <nav className="section-nav">
            {sections.map((section, index) => (
              <button
                key={index}
                className={`nav-btn ${currentSection === index ? 'active' : ''} ${index < currentSection ? 'completed' : ''}`}
                onClick={() => setCurrentSection(index)}
              >
                <span className="nav-number">{index + 1}</span>
                <span className="nav-label">{section}</span>
              </button>
            ))}
          </nav>

          <Survey
            currentSection={currentSection}
            answers={answers}
            updateAnswers={updateAnswers}
            toggleArrayValue={toggleArrayValue}
          />

          <div className="survey-navigation">
            {currentSection > 0 && (
              <button
                className="nav-button prev"
                onClick={() => setCurrentSection(prev => prev - 1)}
              >
                Previous
              </button>
            )}
            {currentSection < 4 ? (
              <button
                className="nav-button next"
                onClick={() => setCurrentSection(prev => prev + 1)}
              >
                Next
              </button>
            ) : (
              <button
                className="nav-button generate"
                onClick={() => setShowReport(true)}
              >
                Generate My Report
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <button
            className="back-button"
            onClick={() => setShowReport(false)}
          >
            Back to Survey
          </button>
          <Report
            answers={answers}
            priorities={priorities}
            setPriorityLevel={setPriorityLevel}
            getPriorityLevel={getPriorityLevel}
          />
          <PrioritySummary
            priorities={priorities}
            removePriority={removePriority}
          />
        </>
      )}
    </div>
  )
}

export default App
