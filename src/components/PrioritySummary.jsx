function PrioritySummary({ priorities, removePriority }) {
  const handlePrint = () => {
    window.print()
  }

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
                    <ul>
                      {priority.actionItems.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
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
        <h3>Your Focused Action Plan</h3>
        <div className="summary-actions">
          <button className="print-button" onClick={handlePrint}>
            Print / Save as PDF
          </button>
        </div>
      </div>

      <p className="summary-intro">
        Focus your energy on high-priority items first, then work through medium and low priorities as time allows.
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
