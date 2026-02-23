import { useState } from 'react'

function PrioritySummary({ priorities, removePriority, answers }) {
  const { workBasics, healthLifestyle } = answers
  const [expandedResources, setExpandedResources] = useState({})

  const handlePrint = () => {
    window.print()
  }

  const toggleResources = (id) => {
    setExpandedResources(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const getHoursDescription = () => {
    if (!workBasics.hoursPerWeek) return null
    const hours = workBasics.hoursPerWeek
    if (hours === '0 (fully retired)') return 'full retirement from paid work'
    if (hours === '1-10') return 'minimal engagement (1-10 hours weekly)'
    if (hours === '11-20') return 'part-time involvement (11-20 hours weekly)'
    if (hours === '21-30') return 'substantial part-time work (21-30 hours weekly)'
    return 'near full-time engagement (30+ hours weekly)'
  }

  const hasTransitionProfile = workBasics.hoursPerWeek ||
    workBasics.motivation?.includes('Maintaining identity/purpose') ||
    workBasics.motivation?.includes('Social interaction') ||
    healthLifestyle.energyPreference

  const highPriorities = priorities.filter(p => p.priorityLevel === 'high')
  const mediumPriorities = priorities.filter(p => p.priorityLevel === 'medium')
  const lowPriorities = priorities.filter(p => p.priorityLevel === 'low')

  if (priorities.length === 0) {
    return (
      <div className="priority-summary empty">
        <h3>Your Focused Action Plan</h3>
        <p className="empty-message">
          Assign priority levels (High, Medium, or Low) to sections above to build your focused action plan.
        </p>
      </div>
    )
  }

  const ResourcesSection = ({ resources, id }) => {
    if (!resources) return null
    const isExpanded = expandedResources[id]

    return (
      <div className="resources-wrapper">
        <button
          className={`learn-more-btn ${isExpanded ? 'expanded' : ''}`}
          onClick={() => toggleResources(id)}
        >
          {isExpanded ? '− Hide Resources' : '+ Learn More & Resources'}
        </button>

        {isExpanded && (
          <div className="resources-content">
            {resources.guide && (
              <div className="resources-guide">
                <strong>Getting Started:</strong>
                <p>{resources.guide}</p>
              </div>
            )}

            {resources.links && resources.links.length > 0 && (
              <div className="resources-links">
                <strong>Key Resources:</strong>
                <ul>
                  {resources.links.map((link, idx) => (
                    <li key={idx}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.name}
                      </a>
                      {link.description && <span className="link-desc"> - {link.description}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {resources.specialtyLinks && resources.specialtyLinks.length > 0 && (
              <div className="resources-links specialty-links">
                <strong>Specialty-Specific Platforms:</strong>
                <ul>
                  {resources.specialtyLinks.map((link, idx) => (
                    <li key={idx}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.name}
                      </a>
                      {link.description && <span className="link-desc"> - {link.description}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  const PrioritySection = ({ title, items, level }) => {
    if (items.length === 0) return null

    return (
      <div className={`priority-section priority-${level}`}>
        <h4 className="priority-section-title">
          <span className={`priority-badge ${level}`}>{title}</span>
          <span className="priority-count">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
        </h4>
        <div className="priority-items">
          {items.map((priority) => (
            <div key={priority.id} className={`priority-item ${level}`}>
              <div className="priority-content">
                <h5>{priority.title}</h5>
                {priority.actionItems && priority.actionItems.length > 0 && (
                  <div className="priority-actions">
                    <strong>Next Steps:</strong>
                    <ul>
                      {priority.actionItems.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <ResourcesSection resources={priority.resources} id={priority.id} />
              </div>
              <button
                className="remove-priority"
                onClick={() => removePriority(priority.id)}
                aria-label="Remove from priorities"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="priority-summary" id="priority-summary">
      <div className="summary-header">
        <h3>Your Career Transition Action Plan</h3>
        <div className="summary-actions">
          <button className="print-button" onClick={handlePrint}>
            Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Transition Profile */}
      {hasTransitionProfile && (
        <div className="transition-profile">
          <h4>Your Transition Profile</h4>
          <div className="profile-narrative">
            {workBasics.hoursPerWeek && (
              <p>
                You're targeting <strong>{getHoursDescription()}</strong>.
                {workBasics.hoursPerWeek === '0 (fully retired)' && (
                  <> This is a significant transition that benefits from intentional planning. Your identity has been shaped by decades of practice, and stepping away entirely requires building new sources of purpose, structure, and social connection.</>
                )}
                {workBasics.hoursPerWeek === '1-10' && (
                  <> This "portfolio" approach lets you stay connected to medicine while prioritizing other life areas. The key is finding flexible arrangements that don't create ongoing obligations you'll resent.</>
                )}
                {(workBasics.hoursPerWeek === '11-20' || workBasics.hoursPerWeek === '21-30') && (
                  <> This level of engagement keeps you clinically active and professionally connected while leaving substantial time for other priorities.</>
                )}
                {workBasics.hoursPerWeek === '30+' && (
                  <> You're looking to remain substantially engaged in professional work. The key is ensuring this level of commitment aligns with your other life goals.</>
                )}
              </p>
            )}

            {workBasics.motivation?.includes('Maintaining identity/purpose') && (
              <p>
                Your identity has been closely tied to being a physician. This transition is an opportunity to expand that identity while honoring what medicine has meant to you.
              </p>
            )}

            {workBasics.motivation?.includes('Social interaction') && (
              <p>
                You value the social interaction that work provides. Building social structure into your week will be essential through activities, clubs, or volunteer commitments.
              </p>
            )}

            {healthLifestyle.energyPreference && (
              <p>
                Your peak energy time is <strong>{healthLifestyle.energyPreference.toLowerCase()}</strong>. Design your schedule to put important activities during this window.
              </p>
            )}
          </div>
        </div>
      )}

      <p className="summary-intro">
        Here are your prioritized focus areas with specific next steps.
        Work through high-priority items first, then medium and low as time allows.
      </p>

      <PrioritySection title="High Priority" items={highPriorities} level="high" />
      <PrioritySection title="Medium Priority" items={mediumPriorities} level="medium" />
      <PrioritySection title="Low Priority" items={lowPriorities} level="low" />

      <div className="summary-footer">
        <p>
          {highPriorities.length > 0 && <span className="count-high">{highPriorities.length} High</span>}
          {mediumPriorities.length > 0 && <span className="count-medium">{mediumPriorities.length} Medium</span>}
          {lowPriorities.length > 0 && <span className="count-low">{lowPriorities.length} Low</span>}
        </p>
      </div>
    </div>
  )
}

export default PrioritySummary
