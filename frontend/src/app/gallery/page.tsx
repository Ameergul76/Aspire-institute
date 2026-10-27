import Image from 'next/image';
import Link from 'next/link';

export default function Gallery() {
  const facilityItems = [
    {
      title: 'Modern Computer Lab',
      desc: 'High-speed desktop workstations, networking setups, and multimedia screens for CIT & DIT courses.',
      img: '/lab.jpg',
      tag: 'Lab Facility'
    },
    {
      title: 'Academic Classrooms',
      desc: 'Spacious, well-ventilated classrooms with wooden benches and whiteboards for focused conceptual learning.',
      img: '/classroom.jpg',
      tag: 'Learning Spaces'
    },
    {
      title: 'Student Activities & Group Study',
      desc: 'Interactive discussions, programming workshops, and peer collaboration sessions.',
      img: '/activities.jpg',
      tag: 'Campus Life'
    },
    {
      title: 'Institute Campus & Environment',
      desc: 'A secure, disciplined, and supportive educational atmosphere located at Naval Colony, Karachi.',
      img: '/campus.jpg',
      tag: 'Campus View'
    },
    {
      title: 'Student Guidance & Mentorship',
      desc: 'Dedicated instructors assisting students with hands-on projects, assignments, and test preparation.',
      img: '/hero_students.jpg',
      tag: 'Mentorship'
    },
    {
      title: 'Computer Lab Practical Sessions',
      desc: 'Students practicing real-world MS Office, Canva, Photoshop, and Web Development assignments.',
      img: '/courses_banner.jpg',
      tag: 'Practical Training'
    }
  ];

  return (
    <>
      <section className="pageHero" style={{
        background: 'linear-gradient(135deg, rgba(7, 14, 47, 0.95) 0%, rgba(13, 31, 102, 0.88) 100%), url(/lab.jpg) center/cover no-repeat',
        padding: '70px 0',
        color: '#fff'
      }}>
        <div className="container">
          <span className="badgePill">Aspire Campus Life</span>
          <h1 style={{ fontSize: '42px', fontWeight: 900, margin: '14px 0 10px' }}>
            Gallery & Campus Facilities
          </h1>
          <p style={{ fontSize: '18px', color: '#cbd5e1', maxWidth: '640px', margin: 0 }}>
            Take a visual tour of our modern computer labs, classrooms, student activities, and campus environment.
          </p>
        </div>
      </section>

      <main className="section" style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {facilityItems.map((item, idx) => (
              <div 
                key={idx}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--line)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                  <Image 
                    src={item.img} 
                    alt={item.title} 
                    width={400} 
                    height={220} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(7, 14, 47, 0.85)',
                    backdropFilter: 'blur(4px)',
                    color: '#93c5fd',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '6px'
                  }}>
                    {item.tag}
                  </span>
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy)', margin: '0 0 8px' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
                Visit Aspire Institute in Person
              </h3>
              <p style={{ margin: 0, color: '#cbd5e1', fontSize: '15px' }}>
                Come and explore our computer labs and meet our faculty at Naval Campus, Karachi.
              </p>
            </div>
            <Link href="/contact" className="btnWhite">
              Get Campus Directions →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
