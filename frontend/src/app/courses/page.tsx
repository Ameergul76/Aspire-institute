'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { COURSES_DATA, Course } from '@/data/courses';
import CourseModal from '@/components/CourseModal';
import { Clock, Award } from 'lucide-react';

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);

  const categories = ['All', 'Computer Courses', 'English Language', 'Coaching Classes'];

  const filteredCourses = selectedCategory === 'All'
    ? COURSES_DATA
    : COURSES_DATA.filter((c) => c.category === selectedCategory);

  return (
    <>
      {/* Header Banner */}
      <section className="pageHero" style={{
        background: 'linear-gradient(135deg, rgba(7, 14, 47, 0.95) 0%, rgba(13, 31, 102, 0.88) 100%), url(/lab.jpg) center/cover no-repeat',
        padding: '70px 0',
        color: '#fff'
      }}>
        <div className="container">
          <span className="badgePill">Aspire Academic & Skills Programs</span>
          <h1 style={{ fontSize: '42px', fontWeight: 900, margin: '14px 0 10px' }}>
            Explore Our Learning Programs
          </h1>
          <p style={{ fontSize: '18px', color: '#cbd5e1', maxWidth: '700px', margin: 0, lineHeight: 1.7 }}>
            At Aspire Institute of Technology, we offer learning opportunities designed for students with different educational goals and skill levels. Our programs include computer courses, English language training, and academic coaching for students from Class 1 to Class 10.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="section" style={{ padding: '60px 0' }}>
        <div className="container">

          {/* Banner Spotlight */}
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--line)',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: 'var(--shadow-sm)',
            display: 'grid',
            gridTemplateColumns: '320px 1fr',
            gap: '30px',
            alignItems: 'center',
            marginBottom: '48px'
          }}>
            <div style={{ borderRadius: '14px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '3px solid #fff' }}>
              <Image 
                src="/courses_banner.jpg" 
                alt="Aspire Computer Courses Poster" 
                width={320} 
                height={400} 
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <div>
              <span className="sectionEyebrow">Featured IT Program</span>
              <h2 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--navy)', margin: '4px 0 10px' }}>
                CIT — Certificate in Information Technology (6 Months)
              </h2>
              <div style={{
                background: '#eff6ff',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: 700,
                color: 'var(--blue)',
                fontSize: '13.5px',
                marginBottom: '16px',
                flexWrap: 'wrap'
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <Clock size={15} /> Lab Timing: 4:00 PM to 8:00 PM
                </span>
                <span style={{ opacity: 0.4 }}>|</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <Award size={15} /> Official Certificate Included
                </span>
              </div>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.7', margin: '0 0 20px' }}>
                Course Objective: To provide students with practical skills ranging from basic computer knowledge to MS Office, Graphic Designing, Web Development, Programming, AI Tools, and the Internet. Includes 11 comprehensive modules with hands-on lab projects.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button 
                  className="btn" 
                  onClick={() => setActiveCourse(COURSES_DATA.find((c) => c.id === 'cit') || null)}
                >
                  View Complete 11-Module Syllabus →
                </button>
                <Link href="/admissions?course=CIT&program=Computer%20Course" className="btn outlineNavy">
                  Apply for CIT Course
                </Link>
              </div>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: '1.5px solid',
                  borderColor: selectedCategory === cat ? 'var(--blue)' : 'var(--line)',
                  background: selectedCategory === cat ? 'var(--blue)' : '#ffffff',
                  color: selectedCategory === cat ? '#ffffff' : 'var(--navy)',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: selectedCategory === cat ? '0 4px 12px rgba(37, 99, 235, 0.25)' : 'none'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Courses Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {filteredCourses.map((c) => (
              <div 
                key={c.id} 
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--line)',
                  borderRadius: '18px',
                  padding: '28px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      background: '#eff6ff',
                      color: 'var(--blue)',
                      padding: '4px 10px',
                      borderRadius: '6px'
                    }}>
                      {c.category}
                    </span>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#64748b',
                      background: '#f1f5f9',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Clock size={12} /> {c.duration}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy)', margin: '0 0 10px', lineHeight: 1.3 }}>
                    {c.title}
                  </h3>

                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', margin: '0 0 16px' }}>
                    {c.objective}
                  </p>

                  <div style={{
                    background: '#f8fafc',
                    border: '1px solid var(--line)',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    marginBottom: '20px'
                  }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Key Modules / Topics ({c.modules.length} Modules):
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: '#475569' }}>
                      {c.modules.slice(0, 3).map((m, i) => (
                        <li key={i} style={{ marginBottom: '4px' }}>
                          {m.title}
                        </li>
                      ))}
                      {c.modules.length > 3 && (
                        <li style={{ color: 'var(--blue)', fontWeight: 600 }}>
                          + {c.modules.length - 3} more modules...
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
                  <button 
                    type="button" 
                    className="btn" 
                    style={{ flex: 1, fontSize: '13.5px', padding: '10px 16px' }}
                    onClick={() => setActiveCourse(c)}
                  >
                    View Syllabus →
                  </button>
                  <Link 
                    href={`/admissions?course=${encodeURIComponent(c.title)}&program=${encodeURIComponent(c.category)}`}
                    className="btn outlineNavy"
                    style={{ fontSize: '13.5px', padding: '10px 16px' }}
                  >
                    Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Admission Prompt */}
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
                Need Help Choosing the Right Course?
              </h3>
              <p style={{ margin: 0, color: '#cbd5e1', fontSize: '15px' }}>
                Contact our career counseling team at Naval Campus, Karachi or WhatsApp us at 03213693881.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a 
                href="https://wa.me/923213693881?text=Hello%20Aspire%20Institute,%20I%20want%20guidance%20regarding%20courses" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="whatsappBtn"
                style={{ padding: '12px 22px' }}
              >
                Chat on WhatsApp
              </a>
              <Link href="/admissions" className="btnWhite">
                Online Admission →
              </Link>
            </div>
          </div>

        </div>
      </main>

      {/* Course Outline Modal */}
      <CourseModal 
        course={activeCourse} 
        onClose={() => setActiveCourse(null)} 
      />
    </>
  );
}
