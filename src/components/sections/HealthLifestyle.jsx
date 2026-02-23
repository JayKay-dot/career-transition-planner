function HealthLifestyle({ answers, updateAnswers, toggleArrayValue }) {
  const fitnessGoals = [
    'Maintain current fitness level',
    'Lose weight',
    'Build strength',
    'Improve cardiovascular health',
    'Increase flexibility/mobility',
    'Train for a specific event (marathon, triathlon, etc.)',
    'Recovery from injury/surgery'
  ]

  const activities = [
    'Walking/hiking',
    'Running/jogging',
    'Swimming',
    'Cycling',
    'Golf',
    'Tennis/pickleball',
    'Yoga/Pilates',
    'Weight training',
    'Group fitness classes',
    'Dancing',
    'Martial arts',
    'Water sports',
    'Skiing/snowboarding'
  ]

  return (
    <div className="section">
      <h2>Health & Lifestyle</h2>
      <p className="section-intro">Your physical wellness goals for this next chapter.</p>

      <div className="question-group">
        <label className="question-label">What are your fitness goals? (Select all that apply)</label>
        <div className="checkbox-group">
          {fitnessGoals.map(goal => (
            <label key={goal} className="checkbox-option">
              <input
                type="checkbox"
                checked={answers.fitnessGoals.includes(goal)}
                onChange={() => toggleArrayValue('fitnessGoals', goal)}
              />
              <span>{goal}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="question-group">
        <label className="question-label">What physical activities do you enjoy or want to pursue? (Select all that apply)</label>
        <div className="checkbox-grid">
          {activities.map(activity => (
            <label key={activity} className="checkbox-option">
              <input
                type="checkbox"
                checked={answers.activities.includes(activity)}
                onChange={() => toggleArrayValue('activities', activity)}
              />
              <span>{activity}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="question-group">
        <label className="question-label">When do you have the most energy?</label>
        <div className="radio-group">
          {[
            'Early morning (5-8 AM)',
            'Mid-morning (8-11 AM)',
            'Midday (11 AM-2 PM)',
            'Afternoon (2-5 PM)',
            'Evening (5-8 PM)'
          ].map(option => (
            <label key={option} className="radio-option">
              <input
                type="radio"
                name="energyPreference"
                value={option}
                checked={answers.energyPreference === option}
                onChange={(e) => updateAnswers('energyPreference', e.target.value)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

    </div>
  )
}

export default HealthLifestyle
