import Link from 'next/link';

export default function Announcements() {
  const announcements = [
    {
      title: 'Admissions Open – Session 2025',
      date: 'April 25, 2025',
      badge: 'New',
      badgeColor: '#10b981',
      category: 'Admissions',
      desc: 'New admissions are now officially open for CIT (6 Months), DIT (1 Year), Graphic Designing, Web Development, Spoken English, and Academic Coaching Classes (Class 1 to 10). Limited seats per batch to ensure individual workstation access.',
      actionLink: '/admissions',
      actionText: 'Apply Online'
    },
    {
      title: 'Summer Batch Timings & Schedule Announced',
      date: 'April 20, 2025',
      category: 'Schedule',
      desc: 'Computer Lab batches will run from 4:00 PM to 8:00 PM daily. Evening flexible shifts are available for school and college students. Early registration is advised.',
      actionLink: '/courses',
      actionText: 'View Batch Timings'
    },
    {
      title: 'Class 10 Result Preparation & Board Exam Crash Program',
      date: 'April 15, 2025',
      badge: 'Coaching',
      badgeColor: '#8b5cf6',
      category: 'Academic',
      desc: 'Special intensive preparation program for Matric Class 9 and 10 students covering Mathematics, Physics, Chemistry, Biology, and past 10-year board paper solutions.',
      actionLink: '/admissions?program=Coaching%20Classes&course=Class%2010',
      actionText: 'Join Board Batch'
    },
    {
      title: 'Hands-on AI Tools & Freelancing Workshops',
      date: 'April 10, 2025',
      category: 'Workshop',
      desc: 'Aspire Institute is introducing practical modules on AI for Office Automation, ChatGPT Prompt Engineering, and Canva freelancing within our updated CIT curriculum.',
      actionLink: '/courses',
      actionText: 'Explore CIT Syllabus'
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
          <span className="badgePill">Institute Notices</span>
          <h1 style={{ fontSize: '42px', fontWeight: 900, margin: '14px 0 10px' }}>
            Latest Announcements & Notices
          </h1>
          <p style={{ fontSize: '18px', color: '#cbd5e1', maxWidth: '640px', margin: 0 }}>
            Stay updated with admissions, batch schedules, exam dates, and academic events at Aspire Institute.
          </p>
        </div>
      </section>

      <main className="section" style={{ padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {announcements.map((item, idx) => (
              <div 
                key={idx}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--line)',
                  borderRadius: '16px',
                  padding: '28px 32px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      background: '#eff6ff',
                      color: 'var(--blue)',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase'
                    }}>
                      {item.category}
                    </span>
                    {item.badge && (
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        background: item.badgeColor,
                        color: '#fff',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        textTransform: 'uppercase'
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>
                    📅 {item.date}
                  </span>
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: '1.7', margin: 0 }}>
                  {item.desc}
                </p>

                <div style={{ paddingTop: '10px', marginTop: '4px' }}>
                  <Link href={item.actionLink} className="btn" style={{ padding: '8px 18px', fontSize: '13.5px' }}>
                    {item.actionText} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
