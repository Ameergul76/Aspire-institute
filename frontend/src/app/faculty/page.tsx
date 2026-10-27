import Link from 'next/link';
import Image from 'next/image';

export default function Faculty() {
  const leadership = [
    {
      name: 'Sir Daniyal',
      role: 'Head of Aspire Institute | Mathematics Specialist',
      badge: 'Institute Head & Leadership',
      badgeColor: '#1e3a8a',
      qualification: 'M.Sc in Mathematics | Senior Board Specialist',
      experience: '10+ Years Academic Leadership & Math Coaching',
      subjects: [
        'Class 9 & 10 Mathematics',
        'Algebra & Trigonometry',
        'Sindh & Federal Board Paper Techniques',
        'Past 10-Year Papers Solutions',
        'Conceptual Geometry & Matrices'
      ],
      bio: 'Visionary academic leader and renowned mathematics specialist at Aspire Institute. Known for simplifying difficult mathematical proofs, breaking down complex formulas into easy logical steps, and mentoring students to secure top board examination percentages and A-One grades.',
      quote: 'Mathematics is not about memorizing numbers; it is about training your mind to solve real problems logically.',
      initials: 'SD'
    },
    {
      name: 'Sir Ameer Gul',
      role: 'Head / Director of Aspire Institute | AI & Tech Lead',
      badge: 'Director & AI Specialist',
      badgeColor: '#059669',
      qualification: 'BS in Artificial Intelligence (AI)',
      experience: 'Specialist in Artificial Intelligence, Machine Learning & Modern IT',
      subjects: [
        'Artificial Intelligence & GenAI',
        'Data Science & Analytics',
        'Python Programming Mastery',
        'Machine Learning Fundamentals',
        'Prompt Engineering & Tech Leadership'
      ],
      bio: 'Holds a specialized BS in Artificial Intelligence and drives the cutting-edge technological roadmap for Aspire Institute. Dedicated to equipping students in Karachi with high-income global skills in Python, AI productivity, and modern software development to build high-trajectory IT careers.',
      quote: 'Artificial Intelligence is not the future — it is the present. Our students learn to build, code, and lead with AI.',
      initials: 'AG'
    }
  ];

  const facultyMembers = [
    {
      name: 'Sir Sufyan',
      role: 'Lead Computer Instructor & Lab Coordinator',
      badge: 'IT & Software Lead',
      badgeColor: '#2563eb',
      qualification: 'BS Computer Science | Certified IT Professional',
      experience: '6+ Years Practical IT, Lab & Web Training',
      subjects: [
        'CIT (6-Month Certificate in IT)',
        'DIT (1-Year Diploma in IT)',
        'Web Development (HTML5, CSS3, JavaScript)',
        'Graphic Designing (Canva & Photoshop)',
        'Advanced MS Office & Data Automation',
        'Hardware Diagnostics & Networking'
      ],
      bio: 'Energetic, practical-oriented IT trainer who leads daily computer lab shifts. Believes in 100% individual workstation practice, ensuring students graduate with solid, job-ready computer skills, fast typing speed, and professional portfolio projects.',
      initials: 'SS'
    },
    {
      name: 'Sir Bahar Shah',
      role: 'Senior English Language Specialist & Communication Coach',
      badge: 'Language & Fluency Expert',
      badgeColor: '#7c3aed',
      qualification: 'Master in English Linguistics & Applied Communication',
      experience: '8+ Years English Language & Spoken Training',
      subjects: [
        'Spoken English & Natural Fluency',
        'English Grammar & Sentence Building',
        'Accent Improvement & Phonetics',
        'Public Speaking & Debates',
        'Hesitation Removal Techniques',
        'Job Interview Communication Skills'
      ],
      bio: 'Charismatic language mentor specializing in removing hesitations and building stage confidence. Through daily interactive dialogues, group discussions, and roleplays, Sir Bahar Shah transforms shy learners into articulate, fluent English speakers.',
      initials: 'BS'
    }
  ];

  return (
    <>
      {/* Page Hero */}
      <section className="pageHero" style={{
        background: 'linear-gradient(135deg, rgba(7, 14, 47, 0.95) 0%, rgba(13, 31, 102, 0.88) 100%), url(/classroom.jpg) center/cover no-repeat',
        padding: '70px 0',
        color: '#fff'
      }}>
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Image src="/aspire-logo.png" alt="Aspire Crest" width={28} height={28} style={{ objectFit: 'contain' }} />
            <span className="badgePill">Aspire Academic & Tech Leadership</span>
          </div>
          <h1 style={{ fontSize: '42px', fontWeight: 900, margin: '10px 0' }}>
            Meet Our Respected Faculty & Leadership
          </h1>
          <p style={{ fontSize: '18px', color: '#cbd5e1', maxWidth: '680px', margin: 0, lineHeight: 1.7 }}>
            Meet the experienced educators, AI specialists, and computer mentors driving educational excellence and career empowerment at Aspire Institute of Technology.
          </p>
        </div>
      </section>

      <main className="section" style={{ padding: '60px 0 80px' }}>
        <div className="container">

          {/* Section 1: Executive Leadership */}
          <div style={{ marginBottom: '50px' }}>
            <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 36px' }}>
              <span className="sectionEyebrow">Visionary Leadership</span>
              <h2 className="sectionTitle">Heads of Aspire Institute</h2>
              <p className="sectionDesc">
                Providing guidance, academic excellence, and modern artificial intelligence vision to elevate student capabilities.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '28px'
            }}>
              {leadership.map((leader, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid var(--line)',
                    borderRadius: '20px',
                    padding: '36px',
                    boxShadow: 'var(--shadow-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #0a1128, #1e3a8a)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        fontWeight: 900,
                        boxShadow: '0 8px 20px rgba(10, 17, 40, 0.3)',
                        border: '3px solid #fff'
                      }}>
                        {leader.initials}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--navy)', margin: '0 0 4px' }}>
                          {leader.name}
                        </h3>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--blue)' }}>
                          {leader.role}
                        </span>
                      </div>
                    </div>

                    <span style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      background: leader.badgeColor,
                      color: '#fff',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {leader.badge}
                    </span>
                  </div>

                  <div style={{
                    background: '#f8fafc',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--line)',
                    fontSize: '13px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    color: '#334155'
                  }}>
                    <div>🎓 <strong>Qualification:</strong> {leader.qualification}</div>
                    <div>⏳ <strong>Experience:</strong> {leader.experience}</div>
                  </div>

                  <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.7, margin: 0 }}>
                    {leader.bio}
                  </p>

                  <div style={{
                    background: '#eff6ff',
                    borderLeft: '4px solid var(--blue)',
                    padding: '12px 16px',
                    borderRadius: '0 8px 8px 0',
                    fontStyle: 'italic',
                    fontSize: '13.5px',
                    color: '#1e40af'
                  }}>
                    &ldquo;{leader.quote}&rdquo;
                  </div>

                  <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid var(--line)' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
                      Key Focus Areas & Subjects:
                    </span>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {leader.subjects.map((sub, sIdx) => (
                        <span 
                          key={sIdx}
                          style={{
                            background: '#eff6ff',
                            color: '#1e40af',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 700
                          }}
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Department Heads & Specialist Teachers */}
          <div>
            <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 36px' }}>
              <span className="sectionEyebrow">Expert Teachers</span>
              <h2 className="sectionTitle">Computer & Language Faculty</h2>
              <p className="sectionDesc">
                Practical, supportive mentors dedicated to hands-on lab training and personal student attention.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '28px'
            }}>
              {facultyMembers.map((member, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--line)',
                    borderRadius: '20px',
                    padding: '32px',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--blue), var(--navy))',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '22px',
                        fontWeight: 900,
                        boxShadow: '0 6px 16px rgba(37, 99, 235, 0.3)'
                      }}>
                        {member.initials}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '21px', fontWeight: 900, color: 'var(--navy)', margin: '0 0 4px' }}>
                          {member.name}
                        </h3>
                        <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--blue)' }}>
                          {member.role}
                        </span>
                      </div>
                    </div>

                    <span style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      background: member.badgeColor,
                      color: '#fff',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      textTransform: 'uppercase'
                    }}>
                      {member.badge}
                    </span>
                  </div>

                  <div style={{
                    background: '#f8fafc',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--line)',
                    fontSize: '13px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    color: '#334155'
                  }}>
                    <div>🎓 <strong>Qualification:</strong> {member.qualification}</div>
                    <div>⏳ <strong>Experience:</strong> {member.experience}</div>
                  </div>

                  <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.7, margin: 0 }}>
                    {member.bio}
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid var(--line)' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
                      Courses & Modules Taught:
                    </span>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {member.subjects.map((sub, sIdx) => (
                        <span 
                          key={sIdx}
                          style={{
                            background: '#eff6ff',
                            color: '#1e40af',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 700
                          }}
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #070e2f 0%, #0d1f66 100%)',
            borderRadius: '20px',
            padding: '40px',
            color: '#fff',
            marginTop: '60px',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '28px', fontWeight: 900, margin: '0 0 10px' }}>
              Learn Directly from Sir Daniyal, Sir Ameer Gul & Our Expert Faculty
            </h2>
            <p style={{ fontSize: '16px', color: '#cbd5e1', maxWidth: '640px', margin: '0 auto 24px', lineHeight: 1.6 }}>
              Whether you want to master Mathematics, enter the world of Artificial Intelligence, learn Web Development, or speak fluent English, our teachers are here to guide you step-by-step.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <Link href="/admissions" className="btn" style={{ padding: '12px 32px' }}>
                Apply for New Batch 2026 →
              </Link>
              <a 
                href="https://wa.me/923363294326?text=Assalam-o-Alaikum!%20I%20want%20to%20know%20more%20about%20faculty%20and%20courses%20at%20Aspire%20Institute." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn outline"
                style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
