function SocialSpiritual({ answers, updateAnswers, toggleArrayValue }) {
  const socialActivities = [
    'Regular gatherings with friends',
    'Joining clubs or groups',
    'Alumni associations',
    'Professional societies',
    'Community organizations',
    'Sports leagues',
    'Cultural events',
    'Dinner parties / entertaining',
    'Online communities'
  ]

  const travelTypes = [
    'Relaxing beach vacations',
    'Adventure travel (hiking, safaris)',
    'Cultural / historical tours',
    'Cruises',
    'Road trips',
    'Visiting family',
    'Medical mission trips',
    'Extended stays abroad (1+ months)',
    'RV / camper travel',
    'Luxury travel',
    'Bucket list destinations'
  ]

  return (
    <div className="section">
      <h2>Family, Social Life & Spiritual Connection</h2>
      <p className="section-intro">The relationships and connections that matter most.</p>

      <div className="question-group">
        <label className="question-label">How would you like to structure family time?</label>
        <div className="radio-group">
          {[
            'More time with spouse/partner as top priority',
            'Regular time with children/grandchildren',
            'Caregiving responsibilities for aging parents',
            'Rebuilding relationships that suffered during career',
            'Balanced across all family relationships',
            'Family relationships are not a major focus'
          ].map(option => (
            <label key={option} className="radio-option">
              <input
                type="radio"
                name="familyTime"
                value={option}
                checked={answers.familyTime === option}
                onChange={(e) => updateAnswers('familyTime', e.target.value)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="question-group">
        <label className="question-label">What social activities appeal to you? (Select all that apply)</label>
        <div className="checkbox-group">
          {socialActivities.map(activity => (
            <label key={activity} className="checkbox-option">
              <input
                type="checkbox"
                checked={answers.socialActivities.includes(activity)}
                onChange={() => toggleArrayValue('socialActivities', activity)}
              />
              <span>{activity}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="question-group">
        <label className="question-label">How important is spiritual or religious connection in your next chapter?</label>
        <div className="radio-group">
          {[
            'Central to my life - want to deepen practice',
            'Important - want to maintain current involvement',
            'Interested in exploring spirituality more',
            'Somewhat important - occasional involvement',
            'Not a significant factor for me'
          ].map(option => (
            <label key={option} className="radio-option">
              <input
                type="radio"
                name="spiritualConnection"
                value={option}
                checked={answers.spiritualConnection === option}
                onChange={(e) => updateAnswers('spiritualConnection', e.target.value)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="question-group">
        <label className="question-label">What types of travel interest you? (Select all that apply)</label>
        <div className="checkbox-grid">
          {travelTypes.map(type => (
            <label key={type} className="checkbox-option">
              <input
                type="checkbox"
                checked={answers.travelPlans.includes(type)}
                onChange={() => toggleArrayValue('travelPlans', type)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SocialSpiritual
