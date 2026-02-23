import WorkBasics from './sections/WorkBasics'
import IndustryInterests from './sections/IndustryInterests'
import HealthLifestyle from './sections/HealthLifestyle'
import PurposePassions from './sections/PurposePassions'
import SocialSpiritual from './sections/SocialSpiritual'

function Survey({ currentSection, answers, updateAnswers, toggleArrayValue }) {
  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <WorkBasics
            answers={answers.workBasics}
            updateAnswers={(field, value) => updateAnswers('workBasics', field, value)}
            toggleArrayValue={(field, value) => toggleArrayValue('workBasics', field, value)}
          />
        )
      case 1:
        return (
          <IndustryInterests
            answers={answers.industryInterests}
            updateAnswers={(field, value) => updateAnswers('industryInterests', field, value)}
          />
        )
      case 2:
        return (
          <HealthLifestyle
            answers={answers.healthLifestyle}
            updateAnswers={(field, value) => updateAnswers('healthLifestyle', field, value)}
            toggleArrayValue={(field, value) => toggleArrayValue('healthLifestyle', field, value)}
          />
        )
      case 3:
        return (
          <PurposePassions
            answers={answers.purposePassions}
            updateAnswers={(field, value) => updateAnswers('purposePassions', field, value)}
            toggleArrayValue={(field, value) => toggleArrayValue('purposePassions', field, value)}
          />
        )
      case 4:
        return (
          <SocialSpiritual
            answers={answers.socialSpiritual}
            updateAnswers={(field, value) => updateAnswers('socialSpiritual', field, value)}
            toggleArrayValue={(field, value) => toggleArrayValue('socialSpiritual', field, value)}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="survey-container">
      {renderSection()}
    </div>
  )
}

export default Survey
