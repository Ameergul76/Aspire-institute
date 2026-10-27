import Link from 'next/link';

export default function Blog() {
  const posts = [
    {
      title: 'CIT vs DIT: Which IT Course is Best for Your Career in 2026?',
      date: 'April 2026',
      category: 'Career Advice',
      readTime: '5 min read',
      excerpt: 'Struggling to decide between a 6-month Certificate in IT (CIT) and a 1-year Diploma in IT (DIT)? Here is a clear breakdown of the syllabus, job opportunities, and salary expectations for both.',
      contentPreview: 'CIT focuses on rapid office productivity, MS Office mastery, and typing, making it perfect for office administration and data entry jobs. On the other hand, DIT provides an in-depth computer science foundation including relational databases, web development, and Python programming.',
      link: '/courses'
    },
    {
      title: 'How to Start Freelancing on Upwork & Fiverr After Learning Web Development',
      date: 'April 2026',
      category: 'Freelancing',
      readTime: '6 min read',
      excerpt: 'Building your first 5 websites in HTML, CSS, and JavaScript is only half the battle. Here is how our students create winning freelance profiles, write proposals, and get paid in USD.',
      contentPreview: 'Focus on niche client problems rather than generic web development. Offer business landing pages, restaurant websites, or mobile responsiveness fixes. Build a live portfolio on GitHub or Vercel so clients can see your actual live projects.',
      link: '/courses'
    },
    {
      title: 'Sindh Board Class 9 & 10 Exam Strategy: How to Score an A-One Grade',
      date: 'March 2026',
      category: 'Board Exams',
      readTime: '4 min read',
      excerpt: 'Proven tips from Aspire Institute academic faculty on solving past 10-year papers, time management during examinations, and presentation techniques for Karachi board examiners.',
      contentPreview: 'Karachi Board examiners look for neat headings, clean diagrams in Physics and Biology, and structured step-by-step theorem proofs in Mathematics. Practicing full 3-hour model tests under exam conditions is the single best predictor of board exam success.',
      link: '/admissions?program=Coaching%20Classes'
    },
    {
      title: 'Why Python is the #1 Programming Language to Learn for Absolute Beginners',
      date: 'March 2026',
      category: 'Programming & AI',
      readTime: '5 min read',
      excerpt: 'Clean syntax, massive industry demand, and easy entry into Artificial Intelligence and Data Science make Python the ideal first language for students and professionals.',
      contentPreview: 'Unlike languages with verbose syntax, Python reads almost like plain English. In our 3-month Python course, students learn logic building, file handling, automation, and basic web scraping without getting bogged down by complicated boilerplate.',
      link: '/courses'
    }
  ];

  return (
    <>
      <section className="pageHero" style={{
        background: 'linear-gradient(135deg, rgba(7, 14, 47, 0.95) 0%, rgba(13, 31, 102, 0.88) 100%), url(/campus.jpg) center/cover no-repeat',
        padding: '70px 0',
        color: '#fff'
      }}>
        <div className="container">
          <span className="badgePill">Aspire Educational Insights</span>
          <h1 style={{ fontSize: '42px', fontWeight: 900, margin: '14px 0 10px' }}>
            Blog & Career Guidance Articles
          </h1>
          <p style={{ fontSize: '18px', color: '#cbd5e1', maxWidth: '640px', margin: 0 }}>
            Practical career advice, IT learning guides, freelance roadmap tips, and board examination strategies written by Aspire Institute faculty.
          </p>
        </div>
      </section>

      <main className="section" style={{ padding: '60px 0 80px' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {posts.map((post, idx) => (
              <article 
                key={idx}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--line)',
                  borderRadius: '20px',
                  padding: '36px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      background: '#eff6ff',
                      color: 'var(--blue)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      textTransform: 'uppercase'
                    }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: '13px', color: '#64748b' }}>• {post.readTime}</span>
                  </div>
                  <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>
                    📅 {post.date}
                  </span>
                </div>

                <h2 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
                  {post.title}
                </h2>

                <p style={{ fontSize: '15.5px', color: '#334155', lineHeight: 1.7, margin: 0, fontWeight: 600 }}>
                  {post.excerpt}
                </p>

                <p style={{ fontSize: '14.5px', color: '#64748b', lineHeight: 1.7, margin: 0 }}>
                  {post.contentPreview}
                </p>

                <div style={{ paddingTop: '10px' }}>
                  <Link href={post.link} className="btn outline" style={{ padding: '8px 18px', fontSize: '13.5px' }}>
                    Explore Related Program →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
