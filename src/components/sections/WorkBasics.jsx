function WorkBasics({ answers, updateAnswers, toggleArrayValue }) {
  const motivations = [
    'Financial security',
    'Intellectual stimulation',
    'Helping others',
    'Staying connected to medicine',
    'Building a legacy',
    'Social interaction',
    'Maintaining identity/purpose'
  ]

  const clinicalTypes = [
    'Direct patient care',
    'Telehealth/virtual care',
    'Consulting only (no patient contact)',
    'Chart review/utilization review',
    'Second opinions',
    'Concierge medicine'
  ]

  return (
    <div className="section">
      <h2>Work Basics</h2>
      <p className="section-intro">Let's understand your ideal work structure going forward.</p>

      <div className="question-group">
        <label className="question-label">How many hours per week would you ideally like to work?</label>
        <div className="radio-group">
          {['0 (fully retired)', '1-10', '11-20', '21-30', '30+'].map(option => (
            <label key={option} className="radio-option">
              <input
                type="radio"
                name="hoursPerWeek"
                value={option}
                checked={answers.hoursPerWeek === option}
                onChange={(e) => updateAnswers('hoursPerWeek', e.target.value)}
              />
              <span>{option} hours</span>
            </label>
          ))}
        </div>
      </div>

      <div className="question-group">
        <label className="question-label">What motivates you to continue some form of work? (Select all that apply)</label>
        <div className="checkbox-group">
          {motivations.map(motivation => (
            <label key={motivation} className="checkbox-option">
              <input
                type="checkbox"
                checked={answers.motivation.includes(motivation)}
                onChange={() => toggleArrayValue('motivation', motivation)}
              />
              <span>{motivation}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="question-group">
        <label className="question-label">What types of clinical work interest you? (Select all that apply)</label>
        <div className="checkbox-group">
          {clinicalTypes.map(type => (
            <label key={type} className="checkbox-option">
              <input
                type="checkbox"
                checked={answers.clinicalType.includes(type)}
                onChange={() => toggleArrayValue('clinicalType', type)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="question-group">
        <label className="question-label">How willing are you to travel for work?</label>
        <div className="radio-group">
          {[
            'No travel - work from home only',
            'Local only (within 30 miles)',
            'Regional travel occasionally',
            'Open to national travel',
            'International travel welcome'
          ].map(option => (
            <label key={option} className="radio-option">
              <input
                type="radio"
                name="travelWillingness"
                value={option}
                checked={answers.travelWillingness === option}
                onChange={(e) => updateAnswers('travelWillingness', e.target.value)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WorkBasics
