function PurposePassions({ answers, updateAnswers, toggleArrayValue }) {
  const volunteeringOptions = [
    'Free clinics / medical missions',
    'Medical education in underserved areas',
    'Mentoring medical students/residents',
    'Hospice / palliative care volunteering',
    'Nonprofit board service',
    'Youth mentoring / Big Brothers Big Sisters',
    'Habitat for Humanity / building projects',
    'Food bank / hunger relief',
    'Environmental conservation',
    'Animal rescue / shelter work',
    'Literacy programs / tutoring',
    'Veterans organizations',
    'Faith-based service',
    'Arts / cultural organizations',
    'Disaster relief / emergency response'
  ]

  const hobbies = [
    'Writing / blogging',
    'Photography',
    'Music (playing instrument)',
    'Painting / art',
    'Woodworking / crafts',
    'Gardening',
    'Cooking / culinary arts',
    'Reading / book clubs',
    'Learning new languages',
    'History / genealogy',
    'Astronomy',
    'Bird watching / nature',
    'Collecting (art, wine, etc.)',
    'Podcasting / content creation',
    'Investing / financial markets'
  ]

  return (
    <div className="section">
      <h2>Purpose & Passions</h2>
      <p className="section-intro">What gives your life meaning beyond work?</p>

      <div className="question-group">
        <label className="question-label">What volunteer or service activities interest you? (Select all that apply)</label>
        <div className="checkbox-group">
          {volunteeringOptions.map(option => (
            <label key={option} className="checkbox-option">
              <input
                type="checkbox"
                checked={answers.volunteering.includes(option)}
                onChange={() => toggleArrayValue('volunteering', option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="question-group">
        <label className="question-label">What hobbies or interests would you like to pursue or deepen? (Select all that apply)</label>
        <div className="checkbox-grid">
          {hobbies.map(hobby => (
            <label key={hobby} className="checkbox-option">
              <input
                type="checkbox"
                checked={answers.hobbies.includes(hobby)}
                onChange={() => toggleArrayValue('hobbies', hobby)}
              />
              <span>{hobby}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="question-group">
        <label className="question-label">The "Someday" Question: What have you always wanted to do but never had time for?</label>
        <textarea
          className="text-input"
          value={answers.somedayDreams}
          onChange={(e) => updateAnswers('somedayDreams', e.target.value)}
          placeholder="Write a book, learn to sail, restore a classic car, climb a mountain, start a business, live abroad for a year..."
          rows={4}
        />
      </div>
    </div>
  )
}

export default PurposePassions
