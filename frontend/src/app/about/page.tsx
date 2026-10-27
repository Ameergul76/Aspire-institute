import Link from 'next/link';
import Image from 'next/image';
import { 
  GraduationCap, 
  Laptop, 
  TrendingUp, 
  ShieldCheck, 
  Rocket, 
  Target, 
  Compass 
} from 'lucide-react';

export default function About() {
  const coreValues = [
    {
      title: 'Quality Education',
      desc: 'We encourage meaningful learning and a strong understanding of every subject.',
      icon: <GraduationCap size={26} color="#2563eb" />
    },
    {
      title: 'Practical Skills',
      desc: 'We value hands-on practice that helps students apply what they learn.',
      icon: <Laptop size={26} color="#059669" />
    },
    {
      title: 'Student Development',
      desc: 'We encourage confidence, curiosity, creativity, and continuous improvement.',
      icon: <TrendingUp size={26} color="#d97706" />
    },
    {
      title: 'Integrity and Responsibility',
      desc: 'We believe in honesty, respect, discipline, and responsible learning.',
      icon: <ShieldCheck size={26} color="#7c3aed" />
    },
    {
      title: 'Growth Through Technology',
      desc: 'We encourage students to explore digital tools and develop skills that can support their future.',
      icon: <Rocket size={26} color="#2563eb" />
    }
  ];

  return (
    <>
      {/* Header Banner */}
      <section className="pageHero" style={{
        background: 'linear-gradient(135deg, rgba(7, 14, 47, 0.95) 0%, rgba(13, 31, 102, 0.88) 100%), url(/campus.jpg) center/cover no-repeat',
        padding: '70px 0',
        color: '#fff'
      }}>
        <div className="container">
          <span className="badgePill">Aspire Institute of Technology</span>
          <h1 style={{ fontSize: '42px', fontWeight: 900, margin: '14px 0 10px' }}>
            About Aspire Institute of Technology
          </h1>
          <p style={{ fontSize: '18px', color: '#cbd5e1', maxWidth: '640px', margin: 0 }}>
            Empowering students with practical education, modern technology, and life-changing skills.
          </p>
        </div>
      </section>

      {/* 4. About Us — Main Paragraph */}
      <main className="section" style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: '40px',
            alignItems: 'center',
            marginBottom: '60px'
          }}>
            <div>
              <span className="sectionEyebrow">Our Story & Purpose</span>
              <h2 className="sectionTitle">Building Skills for Educational & Professional Journeys</h2>
              
              <div style={{ color: '#334155', fontSize: '16px', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ margin: 0 }}>
                  Aspire Institute of Technology is an educational and skills-development institute based in Naval Colony, Karachi, Pakistan. Our aim is to make learning accessible and help students build the knowledge and practical skills they need for their educational and professional journeys.
                </p>
                <p style={{ margin: 0 }}>
                  We offer learning opportunities in computer education, English language development, and academic coaching for students from Class 1 to Class 10. We believe every student has the potential to achieve something meaningful when given the right guidance, opportunities, and encouragement.
                </p>
                <p style={{ margin: 0 }}>
                  At Aspire Institute, our vision is to support learners in developing confidence, improving their abilities, and preparing for a future shaped by education, technology, and lifelong learning.
                </p>
              </div>

              <div style={{ marginTop: '28px', display: 'flex', gap: '12px' }}>
                <Link href="/courses" className="btn">
                  Explore Programs →
                </Link>
                <Link href="/contact" className="btn outlineNavy">
                  Visit Naval Campus
                </Link>
              </div>
            </div>

            <div style={{ borderRadius: '18px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '4px solid #fff' }}>
              <Image 
                src="/activities.jpg" 
                alt="Aspire Institute Students Learning" 
                width={500} 
                height={350} 
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>

          {/* 5. About Us — Our Mission & Vision */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
            marginBottom: '60px'
          }}>
            {/* Mission Card */}
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--line)',
              borderTop: '5px solid var(--blue)',
              borderRadius: '16px',
              padding: '36px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Target size={28} color="#2563eb" />
                <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: 'var(--navy)' }}>
                  Our Mission
                </h3>
              </div>
              <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#475569', margin: 0 }}>
                Our mission is to provide accessible, practical, and meaningful learning opportunities that help students strengthen their academic knowledge, improve their communication skills, and develop digital competencies for the future.
              </p>
            </div>

            {/* Vision Card */}
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--line)',
              borderTop: '5px solid #10b981',
              borderRadius: '16px',
              padding: '36px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Compass size={28} color="#10b981" />
                <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: 'var(--navy)' }}>
                  Our Vision
                </h3>
              </div>
              <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#475569', margin: 0 }}>
                Our vision is to become a trusted local learning center where students can access quality education, explore modern technology, discover their potential, and prepare themselves for future academic and professional opportunities.
              </p>
            </div>
          </div>

          {/* 6. About Us — Our Core Values */}
          <div>
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px' }}>
              <span className="sectionEyebrow">What Guides Us</span>
              <h2 className="sectionTitle">Our Core Values</h2>
              <p className="sectionDesc">
                The core principles that shape our teaching methodology and daily student interactions.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px'
            }}>
              {coreValues.map((v, i) => (
                <div key={i} style={{
                  background: '#ffffff',
                  border: '1px solid var(--line)',
                  borderRadius: '14px',
                  padding: '26px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: '#eff6ff',
                    display: 'grid',
                    placeItems: 'center',
                    marginBottom: '6px'
                  }}>
                    {v.icon}
                  </div>
                  <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: 'var(--navy)' }}>
                    {v.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#64748b' }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Leadership & Faculty Spotlight */}
          <div style={{ marginTop: '64px' }}>
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 36px' }}>
              <span className="sectionEyebrow">Our Leadership & Faculty</span>
              <h2 className="sectionTitle">Guiding Minds at Aspire</h2>
              <p className="sectionDesc">
                Experienced educators, artificial intelligence specialists, and mentors shaping the future of our students.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px'
            }}>
              <div style={{
                background: '#ffffff',
                border: '1px solid var(--line)',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <span style={{ fontSize: '11px', fontWeight: 800, background: '#1e3a8a', color: '#fff', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                  Head of Institute
                </span>
                <h4 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--navy)', margin: '10px 0 4px' }}>
                  Sir Daniyal
                </h4>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--blue)', marginBottom: '8px' }}>
                  Mathematics Specialist
                </div>
                <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                  Renowned mathematics educator specializing in conceptual board coaching, Sindh board past papers, and academic leadership.
                </p>
              </div>

              <div style={{
                background: '#ffffff',
                border: '1px solid var(--line)',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <span style={{ fontSize: '11px', fontWeight: 800, background: '#059669', color: '#fff', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                  Director & AI Lead
                </span>
                <h4 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--navy)', margin: '10px 0 4px' }}>
                  Sir Ameer Gul
                </h4>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#059669', marginBottom: '8px' }}>
                  BS in Artificial Intelligence (AI)
                </div>
                <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                  Leading Aspire&apos;s technological roadmap, AI innovations, Python programming tracks, and career empowerment for youth.
                </p>
              </div>

              <div style={{
                background: '#ffffff',
                border: '1px solid var(--line)',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <span style={{ fontSize: '11px', fontWeight: 800, background: 'var(--blue)', color: '#fff', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                  IT & Software Lead
                </span>
                <h4 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--navy)', margin: '10px 0 4px' }}>
                  Sir Sufyan
                </h4>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--blue)', marginBottom: '8px' }}>
                  Computer Courses Instructor
                </div>
                <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                  Hands-on trainer for CIT, DIT, Web Development, Graphic Design, and modern lab practical sessions.
                </p>
              </div>

              <div style={{
                background: '#ffffff',
                border: '1px solid var(--line)',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <span style={{ fontSize: '11px', fontWeight: 800, background: '#7c3aed', color: '#fff', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                  Language Coach
                </span>
                <h4 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--navy)', margin: '10px 0 4px' }}>
                  Sir Bahar Shah
                </h4>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#7c3aed', marginBottom: '8px' }}>
                  English Language Specialist
                </div>
                <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                  Expert in Spoken English fluency, public speaking, grammar mastery, and hesitation removal.
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <Link href="/faculty" className="btn outlineNavy">
                View Full Faculty Profiles & Credentials →
              </Link>
            </div>
          </div>

          {/* Call to action bar at bottom of About page */}
          <div style={{
            marginTop: '60px',
            background: 'linear-gradient(135deg, #070e2f 0%, #102166 100%)',
            borderRadius: '18px',
            padding: '36px 40px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <h3 style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: 800 }}>
                Start Your Journey with Aspire Institute Today!
              </h3>
              <p style={{ margin: 0, color: '#cbd5e1', fontSize: '15px' }}>
                Admissions open for computer courses, language classes, and school coaching batches.
              </p>
            </div>
            <Link href="/admissions" className="btnWhite">
              Apply for Admission →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
