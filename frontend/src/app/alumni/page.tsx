import Link from 'next/link';

export default function Alumni() {
  const stories = [
    {
      name: 'Syed Hamza Ali',
      course: 'CIT (6 Months) — Session 2025',
      currentRole: 'Computer Operator & Accounts Assistant at Maritime Logistics',
      quote: 'Before joining Aspire Institute, I struggled with basic Excel formulas and professional typing. The 6-month CIT course gave me 100% practical lab practice. Within 2 weeks of completing my certificate, I secured a full-time office position.',
      achievement: 'Increased typing speed to 52 WPM & mastered financial Excel reports.',
      tag: 'Office Placement'
    },
    {
      name: 'Ayesha Siddiqui',
      course: 'Web Development (4 Months) — Session 2025',
      currentRole: 'Junior Frontend Developer & Upwork Freelancer',
      quote: 'The HTML, CSS, and JavaScript projects were directly aligned with what international clients ask for. By Month 4, I had built 5 live portfolio websites. Now I earn consistently in USD doing freelance web design.',
      achievement: 'Completed 18 freelance projects with a 5.0 Star rating.',
      tag: 'Freelance Success'
    },
    {
      name: 'Muhammad Bilal',
      course: 'DIT 1-Year Diploma — Session 2025',
      currentRole: 'Database & IT Support Executive at TechVentures Karachi',
      quote: 'The 1-year DIT diploma covered everything from networking and operating systems to database design and Python coding. Aspire’s teachers don’t just teach theory — they make you practice on real servers and lab machines.',
      achievement: 'Promoted to Lead IT Support Specialist in his first year.',
      tag: 'IT Career'
    },
    {
      name: 'Zubair Ahmed',
      course: 'Python & Data Science — Session 2025',
      currentRole: 'Associate Data Analyst',
      quote: 'Aspire Institute helped me bridge the gap between academic theory and practical data analysis. Working with Pandas, SQL, and interactive dashboards opened up corporate analytics opportunities.',
      achievement: 'Built an automated sales predictive model used by retail clients.',
      tag: 'Data Science'
    },
    {
      name: 'Kashif Mehmood',
      course: 'Spoken English & Communication Skills',
      currentRole: 'Customer Support Executive at BPO International',
      quote: 'I had severe hesitation speaking English in public or during interviews. The daily conversational sessions, roleplays, and mock interviews at Aspire gave me natural confidence to clear my MNC interview.',
      achievement: 'Successfully cleared multi-round international English assessment.',
      tag: 'Language & Fluency'
    },
    {
      name: 'Fatima Noor',
      course: 'Matric Board Exam Coaching (Class 10)',
      currentRole: 'A-One Grade in Karachi Secondary Board Examination',
      quote: 'The past 10-year paper solutions, weekly test series, and personalized attention from math and science teachers at Aspire transformed my exam scores. I achieved an A-One grade with 89% in matriculation!',
      achievement: 'Secured 89% overall in SSC Part-II Sindh Board.',
      tag: 'Academic Topper'
    }
  ];

  return (
    <>
      <section className="pageHero" style={{
        background: 'linear-gradient(135deg, rgba(7, 14, 47, 0.95) 0%, rgba(13, 31, 102, 0.88) 100%), url(/hero_students.jpg) center/cover no-repeat',
        padding: '70px 0',
        color: '#fff'
      }}>
        <div className="container">
          <span className="badgePill">Student Achievements</span>
          <h1 style={{ fontSize: '42px', fontWeight: 900, margin: '14px 0 10px' }}>
            Student Success Stories & Alumni
          </h1>
          <p style={{ fontSize: '18px', color: '#cbd5e1', maxWidth: '640px', margin: 0 }}>
            Read how practical IT education, personalized coaching, and hands-on lab training at Aspire Institute helped our alumni achieve fulfilling careers and top academic results.
          </p>
        </div>
      </section>

      <main className="section" style={{ padding: '60px 0 80px' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {stories.map((s, idx) => (
              <div 
                key={idx}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--line)',
                  borderRadius: '20px',
                  padding: '30px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    background: '#eff6ff',
                    color: 'var(--blue)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    textTransform: 'uppercase'
                  }}>
                    {s.tag}
                  </span>
                  <span style={{ fontSize: '16px' }}>⭐ 5.0</span>
                </div>

                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--navy)', margin: '0 0 3px' }}>
                    {s.name}
                  </h3>
                  <span style={{ fontSize: '12.5px', color: '#64748b', fontWeight: 600 }}>
                    {s.course}
                  </span>
                </div>

                <div style={{
                  background: '#f8fafc',
                  border: '1px solid var(--line)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'var(--navy)'
                }}>
                  💼 {s.currentRole}
                </div>

                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
                  &ldquo;{s.quote}&rdquo;
                </p>

                <div style={{
                  marginTop: 'auto',
                  paddingTop: '14px',
                  borderTop: '1px solid var(--line)',
                  fontSize: '12.5px',
                  color: '#15803d',
                  fontWeight: 700
                }}>
                  🎯 <strong>Milestone:</strong> {s.achievement}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--navy)', margin: '0 0 10px' }}>
              Your Journey to a Successful Career Starts Here
            </h2>
            <p style={{ fontSize: '16px', color: '#64748b', margin: '0 0 24px' }}>
              Join thousands of students who built real practical skills at Aspire Institute.
            </p>
            <Link href="/admissions" className="btn" style={{ padding: '12px 32px' }}>
              Enroll in Upcoming Lab Batch →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
