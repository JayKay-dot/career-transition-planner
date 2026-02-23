function Report({ answers, priorities, setPriorityLevel, getPriorityLevel, showActionItems = true }) {
  const { workBasics, industryInterests, healthLifestyle, purposePassions, socialSpiritual } = answers

  const PrioritySelector = ({ item }) => {
    const currentLevel = getPriorityLevel(item.id)

    return (
      <div className="priority-selector">
        <span className="priority-label">Priority:</span>
        <div className="priority-buttons">
          <button
            className={`priority-btn high ${currentLevel === 'high' ? 'active' : ''}`}
            onClick={() => setPriorityLevel(item, currentLevel === 'high' ? null : 'high')}
          >
            High
          </button>
          <button
            className={`priority-btn medium ${currentLevel === 'medium' ? 'active' : ''}`}
            onClick={() => setPriorityLevel(item, currentLevel === 'medium' ? null : 'medium')}
          >
            Medium
          </button>
          <button
            className={`priority-btn low ${currentLevel === 'low' ? 'active' : ''}`}
            onClick={() => setPriorityLevel(item, currentLevel === 'low' ? null : 'low')}
          >
            Low
          </button>
        </div>
      </div>
    )
  }

  const NarrativeSection = ({ id, title, children, actionItems = [] }) => {
    const item = { id, title, content: children, actionItems }

    return (
      <div className="narrative-section">
        <div className="narrative-content">
          <h4>{title}</h4>
          <div className="narrative-text">{children}</div>
        </div>
        <PrioritySelector item={item} />
      </div>
    )
  }

  // Summary section without priority selector (for Work Basics)
  const SummarySection = ({ children }) => {
    return (
      <div className="summary-section">
        <div className="summary-content">
          {children}
        </div>
      </div>
    )
  }

  // Helper to get hours description
  const getHoursDescription = () => {
    if (!workBasics.hoursPerWeek) return null
    const hours = workBasics.hoursPerWeek
    if (hours === '0 (fully retired)') return 'full retirement from paid work'
    if (hours === '1-10') return 'minimal engagement (1-10 hours weekly)'
    if (hours === '11-20') return 'part-time involvement (11-20 hours weekly)'
    if (hours === '21-30') return 'substantial part-time work (21-30 hours weekly)'
    return 'near full-time engagement (30+ hours weekly)'
  }

  // Check what content we have to show
  const hasWorkContent = workBasics.hoursPerWeek || workBasics.motivation?.length > 0
  const hasIndustryContent = Object.values(industryInterests).some(v => v)
  const hasHealthContent = healthLifestyle.fitnessGoals?.length > 0 || healthLifestyle.activities?.length > 0
  const hasPurposeContent = purposePassions.volunteering?.length > 0 || purposePassions.hobbies?.length > 0 || purposePassions.somedayDreams
  const hasSocialContent = socialSpiritual.familyTime || socialSpiritual.travelPlans?.length > 0 || socialSpiritual.spiritualConnection

  const hasAnyContent = hasWorkContent || hasIndustryContent || hasHealthContent || hasPurposeContent || hasSocialContent

  return (
    <div className="report narrative-report">
      <h2>Step 6: Prioritize Your Focus Areas</h2>
      <p className="report-intro">
        Review each section below and assign a priority level (High, Medium, or Low).
        This will create your focused action plan with specific next steps.
      </p>

      {!hasAnyContent && (
        <div className="no-recommendations">
          <p>Complete the survey sections to generate your personalized report.</p>
        </div>
      )}

      {/* Instructions Banner */}
      {hasAnyContent && (
        <div className="prioritize-instructions">
          <p>Review each area below and click <strong>High</strong>, <strong>Medium</strong>, or <strong>Low</strong> to set your priority level. When finished, click "View My Action Plan" to see your personalized next steps.</p>
        </div>
      )}

      {/* PROFESSIONAL OPPORTUNITIES */}
      {hasIndustryContent && (
        <div className="narrative-category">
          <h3>Professional Opportunities</h3>

          {industryInterests.locumTenens && (
            <NarrativeSection
              id="locum-tenens"
              title="Part-Time Clinical Work & Locum Tenens"
              actionItems={[
                'Connect with locum tenens agencies in your specialty',
                'Update your CV and ensure licenses are current',
                'Consider geographic preferences and travel requirements',
                'Negotiate rates - your experience commands premium compensation',
                'Review malpractice coverage options (occurrence vs. claims-made)'
              ]}
            >
              <p>
                Locum tenens and part-time clinical positions offer the best of both worlds: continued patient care with built-in flexibility. You can work when you want, where you want, and maintain clinical skills without the administrative burden of running a practice. Many retiring physicians find this arrangement ideal - it keeps them connected to medicine while allowing extended time off for travel, family, or other pursuits. Compensation is typically excellent, and you can scale up or down based on your preferences.
              </p>
            </NarrativeSection>
          )}

          {industryInterests.telehealth && (
            <NarrativeSection
              id="telehealth"
              title="Telehealth Practice"
              actionItems={[
                'Explore major platforms (Teladoc, MDLive, Amwell)',
                'Look into specialty-specific telehealth opportunities',
                'Review multi-state licensing requirements',
                'Set up a professional home office environment',
                'Consider platforms with strong physician onboarding support'
              ]}
            >
              <p>
                Telehealth is an excellent fit for your transition. You can see patients from anywhere, set your own hours, and maintain clinical skills without the overhead of a physical practice. The pandemic dramatically expanded telehealth acceptance, and patients now expect virtual care options. Your years of clinical experience translate directly - the medicine is the same, just delivered differently. Many platforms offer comprehensive onboarding and technical support for physicians.
              </p>
            </NarrativeSection>
          )}

          {industryInterests.expertWitness && (
            <NarrativeSection
              id="expert-witness"
              title="Medical-Legal Consulting"
              actionItems={[
                'Register with expert witness referral services (SEAK, ExpertWitness.com)',
                'Take an expert witness training course to understand legal procedures',
                'Review your malpractice insurance for expert work coverage',
                'Prepare a CV highlighting specific expertise areas',
                'Set your hourly rate (experienced experts command $500-1000+/hour)'
              ]}
            >
              <p>
                Expert witness work leverages your decades of clinical experience in a completely different arena. Attorneys and courts need physicians who can explain complex medical issues clearly and credibly. The work involves reviewing medical records, writing opinions, giving depositions, and occasionally testifying at trial. Compensation is excellent - experienced experts typically charge $500-1000+ per hour. The work is intellectually stimulating and can be done entirely on your own schedule. Many physicians find it deeply satisfying to help the legal system understand medical nuance.
              </p>
            </NarrativeSection>
          )}

          {industryInterests.pharma && (
            <NarrativeSection
              id="pharma"
              title="Pharmaceutical & Biotech Advisory Work"
              actionItems={[
                'Update LinkedIn to highlight your therapeutic expertise',
                'Network with Medical Science Liaisons (MSLs) at conferences',
                'Register with physician consulting networks (GLG, Guidepoint)',
                'Consider Key Opinion Leader (KOL) development programs',
                'Review conflict-of-interest policies if maintaining academic ties'
              ]}
            >
              <p>
                Pharmaceutical and biotech companies actively seek experienced clinicians for advisory boards, speaker programs, and consulting engagements. Your real-world clinical experience is invaluable - you understand how drugs work in actual practice, not just clinical trials. This work typically involves quarterly advisory board meetings, reviewing clinical data, and providing input on drug development and marketing. Compensation is substantial, often $2,000-5,000+ per day for advisory boards, with relatively limited time commitment.
              </p>
            </NarrativeSection>
          )}

          {industryInterests.payer && (
            <NarrativeSection
              id="payer"
              title="Insurance & Utilization Review"
              actionItems={[
                'Explore part-time medical director positions',
                'Look into remote utilization review opportunities',
                'Consider health plan quality improvement roles',
                'Review requirements for insurance medicine certification',
                'Network with physicians already in payer roles'
              ]}
            >
              <p>
                Payer-side work offers predictable, often remote positions that leverage your clinical judgment in a completely different way. Instead of treating patients, you're ensuring appropriate care by reviewing treatment requests and developing coverage policies. Medical director and utilization review roles are well-compensated and typically offer regular hours without on-call obligations. Many physicians appreciate the intellectual challenge of applying evidence to coverage decisions, and the work directly impacts healthcare quality at a population level.
              </p>
            </NarrativeSection>
          )}

          {industryInterests.teaching && (
            <NarrativeSection
              id="teaching"
              title="Medical Education"
              actionItems={[
                'Contact local medical schools about adjunct faculty positions',
                'Explore CME content development opportunities',
                'Consider simulation center instruction roles',
                'Look into preceptor programs for students and residents',
                'Investigate online teaching platforms for broader reach'
              ]}
            >
              <p>
                Your interest in teaching can be fulfilled through many channels. Academic medical centers need clinical faculty for bedside teaching, small groups, and lectures. CME companies seek experienced physicians to develop and deliver educational content. Simulation centers value clinicians who can facilitate realistic training scenarios. The time commitment is flexible - from occasional guest lectures to regular precepting sessions. Teaching keeps you connected to medicine's future while sharing the wisdom you've accumulated over your career.
              </p>
            </NarrativeSection>
          )}

          {industryInterests.medTech && (
            <NarrativeSection
              id="medtech"
              title="Healthcare Technology & Startups"
              actionItems={[
                'Attend health tech conferences and startup demo days',
                'Join physician advisory networks for health tech companies',
                'Consider angel investing in health tech startups',
                'Update LinkedIn with health innovation keywords',
                'Connect with physician entrepreneurs in your network'
              ]}
            >
              <p>
                The health tech sector actively seeks physician advisors who understand both clinical workflows and patient needs. Startups building healthcare products need your perspective on what actually works in practice. Advisory roles typically involve monthly calls, product feedback sessions, and occasionally connecting companies with other clinicians. Compensation often includes equity, which can be valuable if the company succeeds. This work keeps you at the cutting edge of healthcare innovation while contributing to products that may improve care for millions.
              </p>
            </NarrativeSection>
          )}

          {industryInterests.consulting && (
            <NarrativeSection
              id="consulting"
              title="Healthcare Consulting"
              actionItems={[
                'Define your specific consulting niche and expertise',
                'Develop case studies from your experience (anonymized)',
                'Network with healthcare consulting firms',
                'Consider practice management and quality improvement focus',
                'Build a professional website showcasing your expertise'
              ]}
            >
              <p>
                Healthcare consulting encompasses everything from practice management to quality improvement to strategic planning. Your decades of experience give you insights that newer physicians and MBA consultants simply don't have. You've seen what works and what doesn't. Consulting can be project-based, allowing you to engage intensively for periods and then step back. Many physicians build consulting practices around specific expertise - credentialing, compliance, clinical program development, or practice turnarounds.
              </p>
            </NarrativeSection>
          )}

          {industryInterests.boardPositions && (
            <NarrativeSection
              id="boards"
              title="Healthcare Board Service"
              actionItems={[
                'Take a healthcare governance course (ACHE, Governance Institute)',
                'Network with hospital administrators and current board members',
                'Start with nonprofit health organization boards for experience',
                'Update your bio to highlight leadership experience',
                'Consider community health center or clinic boards'
              ]}
            >
              <p>
                Board service offers meaningful engagement with lower time commitment than clinical work. Hospital boards, nonprofit healthcare organizations, and medical societies all seek experienced physicians for governance roles. Board members typically meet monthly or quarterly, with additional committee work. The role involves strategic oversight, fiduciary responsibility, and policy guidance. Your clinical perspective is essential for boards making decisions that affect patient care. Many physicians find board service deeply satisfying - it's a way to shape healthcare at an institutional level.
              </p>
            </NarrativeSection>
          )}
        </div>
      )}

      {/* HEALTH & WELLNESS */}
      {hasHealthContent && (
        <div className="narrative-category">
          <h3>Health & Wellness</h3>

          {healthLifestyle.fitnessGoals?.length > 0 && (
            <NarrativeSection
              id="fitness"
              title="Your Fitness Roadmap"
              actionItems={[
                healthLifestyle.fitnessGoals.includes('Improve cardiovascular health') ? 'Aim for 150 minutes of moderate cardio weekly' : null,
                healthLifestyle.fitnessGoals.includes('Build strength') ? 'Include resistance training 2-3 times per week' : null,
                healthLifestyle.fitnessGoals.includes('Lose weight') ? 'Consider working with a registered dietitian' : null,
                'Get a baseline fitness assessment',
                'Consider a personal trainer for initial program design'
              ].filter(Boolean)}
            >
              <p>
                You've identified {healthLifestyle.fitnessGoals.length === 1 ? 'a clear fitness goal' : 'several fitness goals'}: {healthLifestyle.fitnessGoals.join(', ').toLowerCase()}.
                This transition is an ideal time to prioritize your health - you finally have the time that was always squeezed by practice demands. The key is building sustainable habits rather than dramatic short-term efforts.
                {healthLifestyle.fitnessGoals.includes('Lose weight') && ' Sustainable weight loss comes from consistent, moderate changes rather than extreme diets.'}
                {healthLifestyle.fitnessGoals.includes('Build strength') && ' Strength training becomes increasingly important with age for maintaining bone density, metabolism, and functional independence.'}
                {healthLifestyle.fitnessGoals.includes('Improve cardiovascular health') && ' Cardiovascular fitness is foundational - it affects energy, mood, cognitive function, and longevity.'}
              </p>
            </NarrativeSection>
          )}

          {healthLifestyle.activities?.length > 0 && (
            <NarrativeSection
              id="activities"
              title="Active Lifestyle"
              actionItems={[
                'Schedule activities like appointments - put them on the calendar',
                'Find partners or groups for accountability and social connection',
                'Invest in proper equipment and instruction',
                'Build variety to maintain interest and work different muscle groups'
              ]}
            >
              <p>
                You're drawn to {healthLifestyle.activities.slice(0, 3).join(', ').toLowerCase()}{healthLifestyle.activities.length > 3 ? ` and ${healthLifestyle.activities.length - 3} other activities` : ''}.
                Having multiple activities you enjoy is valuable - it builds variety into your routine and provides options when weather, travel, or injury affects one activity.
                {healthLifestyle.activities.includes('Golf') && ' Golf offers an excellent combination of physical activity, mental engagement, and social connection - consider making it more central to your lifestyle through club membership or regular playing partners.'}
                {healthLifestyle.activities.includes('Tennis/pickleball') && ' Racquet sports are excellent for cardiovascular fitness and social connection - leagues and regular playing groups provide structure and community.'}
                The key is transitioning from "exercise when I have time" to "activities that structure my week."
              </p>
            </NarrativeSection>
          )}

        </div>
      )}

      {/* PURPOSE & PASSIONS */}
      {hasPurposeContent && (
        <div className="narrative-category">
          <h3>Purpose & Passions</h3>

          {(purposePassions.volunteering?.includes('Free clinics / medical missions') ||
            purposePassions.volunteering?.includes('Medical education in underserved areas')) && (
            <NarrativeSection
              id="medical-service"
              title="Medical Service & Mission Work"
              actionItems={[
                'Research established medical mission organizations in your specialty',
                'Start with local free clinics to build experience',
                'Consider short trips (1-2 weeks) before longer commitments',
                'Review liability coverage for volunteer medical work',
                'Connect with colleagues who have done mission work'
              ]}
            >
              <p>
                Your interest in serving underserved populations can be deeply fulfilling. Medical mission work - whether local free clinics or international trips - offers the purest form of medicine: helping people who truly need it, without insurance hassles or administrative burden. There are many well-organized programs that make it easy to contribute your skills. Many physicians describe mission work as recapturing why they went into medicine in the first place.
              </p>
            </NarrativeSection>
          )}

          {purposePassions.volunteering?.includes('Mentoring medical students/residents') && (
            <NarrativeSection
              id="mentoring"
              title="Mentorship & Legacy"
              actionItems={[
                'Contact your medical school about alumni mentorship programs',
                'Join specialty society mentorship initiatives',
                'Consider physician coaching certification',
                'Explore medical student advising through AAMC programs'
              ]}
            >
              <p>
                Your experience is invaluable to those earlier in their careers. Mentoring offers deep satisfaction and keeps you connected to medicine's future. You've navigated challenges that current trainees are facing - work-life balance, career decisions, burnout, specialty choice. Your perspective, earned through decades of practice, can make a real difference in someone's trajectory. Mentoring also keeps you engaged with the evolving field and builds meaningful relationships across generations.
              </p>
            </NarrativeSection>
          )}

          {purposePassions.hobbies?.length > 0 && (
            <NarrativeSection
              id="hobbies"
              title="Pursuing Your Interests"
              actionItems={[
                'Block dedicated time for hobbies - treat them as commitments',
                'Find communities around your interests (clubs, classes, groups)',
                'Consider taking formal instruction to deepen skills',
                'Connect hobbies to social opportunities'
              ]}
            >
              <p>
                You're interested in {purposePassions.hobbies.slice(0, 3).join(', ').toLowerCase()}{purposePassions.hobbies.length > 3 ? ` and ${purposePassions.hobbies.length - 3} other pursuits` : ''}.
                These interests, likely squeezed to the margins during your practice years, can now move to the center.
                {purposePassions.hobbies.includes('Writing / blogging') && ' Your medical experience provides unique material for writing - consider memoir, medical journalism, or even fiction drawing on your clinical observations.'}
                {purposePassions.hobbies.includes('Photography') && ' Photography pairs beautifully with travel and provides a way to document this new chapter of life.'}
                {purposePassions.hobbies.includes('Music (playing instrument)') && ' Music is cognitively demanding in the best way - it\'s associated with brain health and provides deep satisfaction.'}
                The key is moving from "hobby when I have time" to "committed pursuit that structures my week."
              </p>
            </NarrativeSection>
          )}

          {purposePassions.somedayDreams && (
            <NarrativeSection
              id="someday"
              title="Making 'Someday' Today"
              actionItems={[
                'Break this dream into concrete first steps',
                'Set a deadline for taking the first action',
                'Find others who have pursued similar dreams',
                'Identify what\'s really been holding you back',
                'Allocate specific time and resources to this pursuit'
              ]}
            >
              <p>
                You mentioned: <em>"{purposePassions.somedayDreams}"</em>
              </p>
              <p>
                "Someday" has arrived. The transition out of full-time practice is your opportunity to pursue the dreams that got deferred by training, practice building, and professional demands. The question isn't whether you have time now - you do. The question is whether you'll structure your transition to make these dreams happen, or let them remain in the "someday" category indefinitely. What's the smallest first step you could take this week?
              </p>
            </NarrativeSection>
          )}
        </div>
      )}

      {/* RELATIONSHIPS & MEANING */}
      {hasSocialContent && (
        <div className="narrative-category">
          <h3>Relationships & Meaning</h3>

          {socialSpiritual.familyTime === 'More time with spouse/partner as top priority' && (
            <NarrativeSection
              id="spouse"
              title="Reconnecting with Your Partner"
              actionItems={[
                'Discuss retirement visions together - they may differ significantly',
                'Plan regular date activities, not just being home together',
                'Consider couples activities or travel you\'ve postponed',
                'Establish boundaries around individual space and time',
                'Address any issues put on hold during busy career years'
              ]}
            >
              <p>
                Prioritizing your relationship after years of demanding practice is wonderful - and requires intention. Many couples discover that being home together all day is different from the relationship they had when work provided structure. You may have different visions for retirement. One partner may want constant togetherness while the other needs space. Having explicit conversations about expectations, schedules, and boundaries is essential. Plan active together-time, not just passive coexistence.
              </p>
            </NarrativeSection>
          )}

          {socialSpiritual.familyTime === 'Regular time with children/grandchildren' && (
            <NarrativeSection
              id="grandchildren"
              title="Family Investment"
              actionItems={[
                'Establish regular scheduled time (weekly calls, monthly visits)',
                'Plan special one-on-one time with each grandchild',
                'Consider how work schedule can accommodate school events',
                'Create traditions that become meaningful over time',
                'Document family stories and history to pass down'
              ]}
            >
              <p>
                Investing in relationships with children and grandchildren creates lasting bonds and legacy. Your career likely meant missing events, being distracted when present, or living far from family. This transition offers a chance to be more present and available. Regular, scheduled time often works better than vague intentions to "see them more." Consider what role you want to play - active caregiver, special-occasion grandparent, teacher of skills and values, or some combination.
              </p>
            </NarrativeSection>
          )}

          {(socialSpiritual.spiritualConnection?.includes('Central to my life') ||
            socialSpiritual.spiritualConnection?.includes('Interested in exploring')) && (
            <NarrativeSection
              id="spiritual"
              title="Spiritual Life"
              actionItems={[
                'Establish daily spiritual practices (meditation, prayer, reading)',
                'Deepen involvement in a faith community',
                'Consider a retreat or pilgrimage',
                'Explore integrating faith with service and volunteering',
                'Find a spiritual director or guide for this transition'
              ]}
            >
              <p>
                {socialSpiritual.spiritualConnection?.includes('Central to my life')
                  ? 'Spirituality is central to your life, and this transition offers space for deeper practice that may have been crowded out by practice demands. The questions that arise in career transition - about purpose, meaning, legacy, mortality - are fundamentally spiritual questions.'
                  : 'You\'re interested in exploring spirituality more deeply. Many physicians find that the transition out of practice raises questions that medicine doesn\'t answer - about meaning, purpose, what matters, and what comes next. This can be a time of rich spiritual exploration.'}
                {' '}Consider how your spiritual life can inform the other decisions you're making about work, service, and relationships.
              </p>
            </NarrativeSection>
          )}

          {socialSpiritual.travelPlans?.length > 0 && (
            <NarrativeSection
              id="travel"
              title="Travel & Adventure"
              actionItems={[
                'Prioritize physically demanding trips while you\'re able',
                'Research ideal seasons and booking timelines',
                'Consider how travel fits with work commitments',
                'Build travel into annual planning rather than as afterthought',
                socialSpiritual.travelPlans.includes('Extended stays abroad (1+ months)') ? 'Research visa requirements and healthcare coverage abroad' : null
              ].filter(Boolean)}
            >
              <p>
                You're interested in {socialSpiritual.travelPlans.slice(0, 2).join(' and ').toLowerCase()}{socialSpiritual.travelPlans.length > 2 ? ` and ${socialSpiritual.travelPlans.length - 2} other types of travel` : ''}.
                {socialSpiritual.travelPlans.includes('Extended stays abroad (1+ months)') && ' Extended stays abroad - living somewhere rather than just visiting - offers deeper cultural immersion and a completely different experience than typical vacations.'}
                {socialSpiritual.travelPlans.includes('Bucket list destinations') && ' Now is the time for those bucket list trips. Consider which destinations require more physical fitness and prioritize them accordingly.'}
                {socialSpiritual.travelPlans.includes('Medical mission trips') && ' Medical mission travel combines service with adventure - using your skills while experiencing new cultures.'}
                {' '}The key is making travel a priority rather than something that happens with "leftover" time.
              </p>
            </NarrativeSection>
          )}
        </div>
      )}
    </div>
  )
}

export default Report
