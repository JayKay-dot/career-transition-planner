function IndustryInterests({ answers, updateAnswers }) {
  const industries = [
    {
      key: 'locumTenens',
      label: 'Part-Time Office Work / Locum Tenens',
      description: 'Flexible clinical coverage, fill-in work, part-time practice positions'
    },
    {
      key: 'pharma',
      label: 'Pharmaceutical/Biotech',
      description: 'Medical advisory boards, clinical trial consulting, drug safety monitoring'
    },
    {
      key: 'expertWitness',
      label: 'Expert Witness / Legal Consulting',
      description: 'Medical-legal cases, depositions, case reviews, trial testimony'
    },
    {
      key: 'payer',
      label: 'Payer / Insurance',
      description: 'Utilization review, medical director roles, policy development'
    },
    {
      key: 'teaching',
      label: 'Teaching / Academic',
      description: 'Medical school faculty, CME development, mentoring residents'
    },
    {
      key: 'medTech',
      label: 'Medical Technology / Startups',
      description: 'Advisory roles, product development, healthcare innovation'
    },
    {
      key: 'telehealth',
      label: 'Telehealth / Virtual Care',
      description: 'Remote patient consultations, virtual second opinions'
    },
    {
      key: 'consulting',
      label: 'Healthcare Consulting',
      description: 'Strategic consulting, practice management, quality improvement'
    },
    {
      key: 'boardPositions',
      label: 'Board Positions',
      description: 'Hospital boards, nonprofit healthcare organizations, medical societies'
    }
  ]

  return (
    <div className="section">
      <h2>Industry & Advisory Interests</h2>
      <p className="section-intro">Select the areas that interest you for potential involvement.</p>

      <div className="industry-grid">
        {industries.map(industry => (
          <div
            key={industry.key}
            className={`industry-card ${answers[industry.key] ? 'selected' : ''}`}
            onClick={() => updateAnswers(industry.key, !answers[industry.key])}
          >
            <div className="industry-header">
              <input
                type="checkbox"
                checked={answers[industry.key]}
                onChange={() => updateAnswers(industry.key, !answers[industry.key])}
                onClick={(e) => e.stopPropagation()}
              />
              <h3>{industry.label}</h3>
            </div>
            <p>{industry.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IndustryInterests
