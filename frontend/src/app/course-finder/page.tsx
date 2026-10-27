'use client';
import { useState } from 'react';
import Link from 'next/link';

interface Recommendation {
  courseId: string;
  courseTitle: string;
  duration: string;
  category: string;
  reason: string;
  highlights: string[];
}

export default function CourseFinder() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [education, setEducation] = useState('Matric');
  const [goal, setGoal] = useState('freelancing');
  const [time, setTime] = useState('medium');
  const [result, setResult] = useState<Recommendation | null>(null);

  function calculateRecommendation() {
    let rec: Recommendation;

    if (goal === 'coding' || (education === 'Inter' && goal === 'career')) {
      if (time === 'long') {
        rec = {
          courseId: 'data-science',
          courseTitle: 'Data Science & Artificial Intelligence (1 Year Diploma)',
          duration: '1 Year',
          category: 'Computer Courses',
          reason: 'You want high-level software & AI skills with maximum industry earning potential.',
          highlights: ['Python, Pandas, NumPy, Machine Learning', 'Deep Learning & GenAI APIs', 'High career placement']
        };
      } else if (time === 'short') {
        rec = {
          courseId: 'python-programming',
          courseTitle: 'Python Programming Mastery (3 Months)',
          duration: '3 Months',
          category: 'Computer Courses',
          reason: 'A fast-paced coding track focused on Python fundamentals, automation scripts, and database projects.',
          highlights: ['Core Python & OOP', 'Web Scraping & Automation', 'Portfolio Projects']
        };
      } else {
        rec = {
          courseId: 'web-development',
          courseTitle: 'Web Development — HTML, CSS & JavaScript (4 Months)',
          duration: '4 Months',
          category: 'Computer Courses',
          reason: 'Best balance of learning speed, frontend engineering, and building real websites from scratch.',
          highlights: ['HTML5, CSS3, JavaScript', '5 Production Websites', 'Freelance & Job Ready']
        };
      }
    } else if (goal === 'freelancing') {
      if (time === 'short') {
        rec = {
          courseId: 'graphic-designing',
          courseTitle: 'Graphic Designing Professional (3 Months)',
          duration: '3 Months',
          category: 'Computer Courses',
          reason: 'Quickest route to selling digital designs (logos, flyers, social media kits) on Fiverr, Upwork, and local Pakistani businesses.',
          highlights: ['Adobe Photoshop & Illustrator', 'Canva Pro techniques', 'Freelance client briefs']
        };
      } else {
        rec = {
          courseId: 'web-development',
          courseTitle: 'Web Development (4 Months)',
          duration: '4 Months',
          category: 'Computer Courses',
          reason: 'High freelance demand: clients worldwide look for responsive web developers to design and fix websites.',
          highlights: ['Custom portfolio websites', 'Responsive landing pages', 'Real freelance client projects']
        };
      }
    } else if (goal === 'office') {
      if (time === 'long') {
        rec = {
          courseId: 'dit',
          courseTitle: 'DIT — Diploma in Information Technology (1 Year Program)',
          duration: '1 Year',
          category: 'Computer Courses',
          reason: 'Comprehensive 1-year diploma covering full MS Office automation, databases, web, graphics, and networking.',
          highlights: ['12 In-depth monthly modules', 'Recognized 1-year diploma', 'Dual-term evaluation']
        };
      } else {
        rec = {
          courseId: 'cit',
          courseTitle: 'CIT — Certificate in Information Technology (6 Months)',
          duration: '6 Months',
          category: 'Computer Courses',
          reason: 'The ultimate all-rounder course for office jobs, computer fundamentals, typing, MS Office, and AI tools.',
          highlights: ['11 Full practical modules', 'Computer basics to AI tools', 'Recognized completion certificate']
        };
      }
    } else if (goal === 'english') {
      rec = {
        courseId: 'spoken-english',
        courseTitle: 'Spoken English & Communication Skills (3 Months)',
        duration: '3 Months',
        category: 'English Language',
        reason: 'Build natural fluency, eliminate hesitation, and speak English with confidence in interviews and daily life.',
        highlights: ['Daily speaking practice', 'Interview preparation', 'Audio-visual phonetics lab']
      };
    } else {
      rec = {
        courseId: 'coaching-classes',
        courseTitle: 'Coaching Classes (Class 1 to 10)',
        duration: 'Full Academic Year',
        category: 'Coaching Classes',
        reason: 'Focused conceptual preparation, past papers practice, and test series for school and board examinations.',
        highlights: ['Subject specialists for Math, Science & English', 'Board exam test series', 'Regular parent meetings']
      };
    }

    setResult(rec);
    setStep(4);
  }

  return (
    <>
      <section className="pageHero" style={{
        background: 'linear-gradient(135deg, rgba(7, 14, 47, 0.95) 0%, rgba(13, 31, 102, 0.88) 100%), url(/activities.jpg) center/cover no-repeat',
        padding: '70px 0',
        color: '#fff'
      }}>
        <div className="container">
          <span className="badgePill">Smart Career Advisory</span>
          <h1 style={{ fontSize: '42px', fontWeight: 900, margin: '14px 0 10px' }}>
            Course Finder & Eligibility Quiz
          </h1>
          <p style={{ fontSize: '18px', color: '#cbd5e1', maxWidth: '640px', margin: 0 }}>
            Answer 3 quick questions about your education, target goals, and available time, and our system will recommend the ideal course for you at Aspire Institute.
          </p>
        </div>
      </section>

      <main className="section" style={{ padding: '60px 0 80px' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          
          <div className="portalCard">
            {step < 4 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--line)', paddingBottom: '16px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--blue)' }}>
                  Question {step} of 3
                </span>
                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
                  Personalized Course Matcher
                </span>
              </div>
            )}

            {/* Question 1: Education */}
            {step === 1 && (
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--navy)', margin: '0 0 8px' }}>
                  What is your current education level?
                </h2>
                <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 20px' }}>
                  This helps us assess the right technical depth for your batch.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { val: 'School', title: 'School Student (Class 1 to 10)', desc: 'Currently studying in school or preparing for matric board exams.' },
                    { val: 'Matric', title: 'Matric Passed / Intermediate', desc: 'Completed 9th/10th or currently in College (FA, FSc, ICS, I.Com).' },
                    { val: 'Grad', title: 'Graduate / Job Seeker', desc: 'Completed Bachelor’s or looking to upskill for corporate career opportunities.' },
                    { val: 'Beginner', title: 'Absolute Beginner / No Prior Computer Knowledge', desc: 'Want to start from the absolute ground level.' }
                  ].map((item) => (
                    <div 
                      key={item.val}
                      onClick={() => setEducation(item.val)}
                      style={{
                        padding: '16px 20px',
                        borderRadius: '12px',
                        border: '2px solid',
                        borderColor: education === item.val ? 'var(--blue)' : 'var(--line)',
                        background: education === item.val ? '#eff6ff' : '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <strong style={{ display: 'block', fontSize: '15px', color: 'var(--navy)', marginBottom: '3px' }}>
                        {item.title}
                      </strong>
                      <span style={{ fontSize: '13px', color: '#64748b' }}>{item.desc}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                  <button onClick={() => setStep(2)} className="btn">
                    Next: Your Goal →
                  </button>
                </div>
              </div>
            )}

            {/* Question 2: Goal */}
            {step === 2 && (
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--navy)', margin: '0 0 8px' }}>
                  What is your primary goal right now?
                </h2>
                <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 20px' }}>
                  Tell us what you want to achieve through this training.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { val: 'freelancing', title: '💰 Start Freelancing & Make Money Online', desc: 'Learn skills like Web Development or Graphic Design to sell on Fiverr/Upwork.' },
                    { val: 'office', title: '💼 Get an Office / Administrative Job', desc: 'Master Word, Excel, Email, and practical computer skills required in offices.' },
                    { val: 'coding', title: '💻 Learn Software Programming & AI', desc: 'Learn real coding languages like Python, JavaScript, and Data Science.' },
                    { val: 'english', title: '🗣️ Speak English Fluently with Confidence', desc: 'Remove hesitation and improve spoken communication for job interviews.' },
                    { val: 'coaching', title: '📚 Ace School & Board Examinations', desc: 'Conceptual coaching for Class 1 to 10 in Math, Science & English.' }
                  ].map((item) => (
                    <div 
                      key={item.val}
                      onClick={() => setGoal(item.val)}
                      style={{
                        padding: '16px 20px',
                        borderRadius: '12px',
                        border: '2px solid',
                        borderColor: goal === item.val ? 'var(--blue)' : 'var(--line)',
                        background: goal === item.val ? '#eff6ff' : '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <strong style={{ display: 'block', fontSize: '15px', color: 'var(--navy)', marginBottom: '3px' }}>
                        {item.title}
                      </strong>
                      <span style={{ fontSize: '13px', color: '#64748b' }}>{item.desc}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
                  <button onClick={() => setStep(1)} className="btn outline">
                    ← Back
                  </button>
                  <button onClick={() => setStep(3)} className="btn">
                    Next: Duration →
                  </button>
                </div>
              </div>
            )}

            {/* Question 3: Time Duration */}
            {step === 3 && (
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--navy)', margin: '0 0 8px' }}>
                  How much duration can you dedicate?
                </h2>
                <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 20px' }}>
                  Select the program length that fits your daily schedule.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { val: 'short', title: '⚡ Fast Track (3 Months)', desc: 'Intensive short courses to acquire a specific skill quickly.' },
                    { val: 'medium', title: '⭐ Standard Track (4 to 6 Months)', desc: 'Ideal comprehensive courses like CIT or Web Development.' },
                    { val: 'long', title: '🎓 Professional Track (1 Year Diploma)', desc: 'In-depth professional diplomas like DIT or Data Science for full expertise.' }
                  ].map((item) => (
                    <div 
                      key={item.val}
                      onClick={() => setTime(item.val)}
                      style={{
                        padding: '16px 20px',
                        borderRadius: '12px',
                        border: '2px solid',
                        borderColor: time === item.val ? 'var(--blue)' : 'var(--line)',
                        background: time === item.val ? '#eff6ff' : '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <strong style={{ display: 'block', fontSize: '15px', color: 'var(--navy)', marginBottom: '3px' }}>
                        {item.title}
                      </strong>
                      <span style={{ fontSize: '13px', color: '#64748b' }}>{item.desc}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
                  <button onClick={() => setStep(2)} className="btn outline">
                    ← Back
                  </button>
                  <button onClick={calculateRecommendation} className="btn">
                    Get My Recommended Course 🎯
                  </button>
                </div>
              </div>
            )}

            {/* Recommendation Result */}
            {step === 4 && result && (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  background: '#ecfdf5',
                  color: '#065f46',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  textTransform: 'uppercase'
                }}>
                  ✨ 98% Match for Your Profile
                </span>

                <h2 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--navy)', margin: '16px 0 8px' }}>
                  {result.courseTitle}
                </h2>

                <div style={{
                  display: 'inline-flex',
                  gap: '12px',
                  background: '#f1f5f9',
                  padding: '6px 16px',
                  borderRadius: '10px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  color: '#334155',
                  margin: '10px 0 20px'
                }}>
                  <span>⏱ Duration: {result.duration}</span>
                  <span>•</span>
                  <span>📁 Category: {result.category}</span>
                </div>

                <div style={{
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: '14px',
                  padding: '20px',
                  textAlign: 'left',
                  margin: '0 auto 24px',
                  maxWidth: '580px'
                }}>
                  <strong style={{ display: 'block', color: 'var(--navy)', fontSize: '15px', marginBottom: '6px' }}>
                    💡 Why this is your best fit:
                  </strong>
                  <p style={{ color: '#334155', fontSize: '14px', lineHeight: 1.6, margin: '0 0 14px' }}>
                    {result.reason}
                  </p>
                  <strong style={{ display: 'block', color: 'var(--navy)', fontSize: '14px', marginBottom: '6px' }}>
                    Key Program Highlights:
                  </strong>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13.5px', color: '#475569', lineHeight: 1.6 }}>
                    {result.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                  <Link 
                    href={`/admissions?course=${encodeURIComponent(result.courseTitle)}&program=${encodeURIComponent(result.category)}`}
                    className="btn"
                    style={{ padding: '12px 28px', fontSize: '15px' }}
                  >
                    Apply for {result.duration} Batch Now →
                  </Link>
                  <button onClick={() => setStep(1)} className="btn outline">
                    Retake Quiz ↺
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </main>
    </>
  );
}
