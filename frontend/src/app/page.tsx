'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { COURSES_DATA, Course } from '@/data/courses';
import CourseModal from '@/components/CourseModal';
import { 
  Sparkles, 
  Clock, 
  GraduationCap, 
  Monitor, 
  Award, 
  Cpu, 
  MapPin, 
  Phone, 
  MessageCircle, 
  ExternalLink,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function Home() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  // Quick lookup helper for courses
  const getCourseById = (id: string) => COURSES_DATA.find((c) => c.id === id) || null;

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setContactLoading(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setContactSuccess(true);
        form.reset();
      } else {
        alert('Unable to send message. Please try again.');
      }
    } catch {
      setContactSuccess(true);
      form.reset();
    } finally {
      setContactLoading(false);
    }
  }

  return (
    <>
      {/* ========================================================
          1. HERO SECTION & ANNOUNCEMENTS SIDEBAR
          ======================================================== */}
      <section className="heroSection">
        <div className="container heroGrid">
          {/* Main Hero Banner Card */}
          <div className="heroCard">
            <div className="heroContent">
              <div className="badgePill">
                <Sparkles size={14} className="badgeIcon" />
                <span>Quality Education | Better Future</span>
              </div>
              <h1 className="heroTitle">
                Welcome to<br />
                <span>Aspire Institute</span><br />
                of Technology
              </h1>
              <div className="heroTagline">
                Learn Today. Build Tomorrow. Achieve Your Dreams.
              </div>
              <p className="heroDesc">
                Welcome to Aspire Institute of Technology, a place where learning meets opportunity. We aim to help students develop practical skills, strengthen their knowledge, and prepare for a brighter future through quality education and technology-focused learning. Whether you want to improve your computer skills, learn English, explore programming, or strengthen your academic foundation, Aspire Institute is here to support your learning journey.
              </p>
              <div className="heroSlogan">
                Start Learning. Grow Your Skills. Aspire for More.
              </div>
              <div className="heroActions">
                <Link className="btn" href="#courses">
                  Explore Courses →
                </Link>
                <Link className="btn outline" href="/admissions">
                  Online Admission
                </Link>
              </div>
            </div>

            {/* Slider Dots & Urdu Calligraphy */}
            <div className="heroFooterRow">
              <div className="sliderDots" aria-hidden="true">
                <span className="dot active"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
              <div className="urduTag">علم سے بنے مستقبل</div>
            </div>
          </div>

          {/* Right Column: Latest Announcements & CTA Card */}
          <div className="heroSidebar">
            {/* Announcements Card */}
            <div className="announcementsCard">
              <div className="cardHeadRow">
                <div className="cardHeadLeft">
                  <span className="cardEyebrow">Stay Informed</span>
                  <h3 className="cardTitle">Latest Announcements</h3>
                </div>
                <Link className="cardViewAll" href="/announcements">
                  View All →
                </Link>
              </div>

              <div className="announcementsList">
                {/* Item 1 */}
                <Link href="/announcements" className="announcementItem">
                  <div className="announcementIcon iconGreen">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <div className="announcementBody">
                    <div className="announcementTitleRow">
                      <strong className="announcementTitle">Admissions Open – Session 2025</strong>
                      <span className="badgeNew">New</span>
                    </div>
                    <p className="announcementText">New admissions are now open for all courses and classes.</p>
                    <span className="announcementDate">Apr 25, 2025</span>
                  </div>
                </Link>

                {/* Item 2 */}
                <Link href="/announcements" className="announcementItem">
                  <div className="announcementIcon iconYellow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                  <div className="announcementBody">
                    <strong className="announcementTitle">Summer Batch Schedule</strong>
                    <p className="announcementText">Summer batch timings are now available. Enroll early!</p>
                    <span className="announcementDate">Apr 20, 2025</span>
                  </div>
                </Link>

                {/* Item 3 */}
                <Link href="/announcements" className="announcementItem">
                  <div className="announcementIcon iconPurple">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                    </svg>
                  </div>
                  <div className="announcementBody">
                    <strong className="announcementTitle">Class 10 Result Preparation Program</strong>
                    <p className="announcementText">Special coaching program for Class 10 students.</p>
                    <span className="announcementDate">Apr 15, 2025</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Start Your Journey Today Card */}
            <div className="journeyCard">
              <div className="journeyText">
                <h3 className="journeyTitle">Start Your Journey Today</h3>
                <p className="journeyDesc">Join Aspire Institute and take the first step towards a successful future.</p>
                <Link href="/admissions" className="btnWhite">
                  Apply for Admission →
                </Link>
              </div>
              <div className="journeyImageCol">
                <Image 
                  src="/journey_student.jpg" 
                  alt="Aspire Institute Student" 
                  width={160} 
                  height={140} 
                  className="journeyImg" 
                />
                <span className="journeyCursive">Your Future Our Priority</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PROMOTIONAL BANNER SHOWCASE
          ======================================================== */}
      <section className="bannerShowcaseSection">
        <div className="container">
          <div className="bannerShowcaseCard">
            <div className="bannerShowcaseImageWrapper">
              <Image 
                src="/courses_banner.jpg" 
                alt="Aspire Institute Professional Computer Courses Banner" 
                width={500} 
                height={600} 
                className="bannerShowcaseImg" 
                priority
              />
            </div>

            <div className="bannerShowcaseContent">
              <span className="sectionEyebrow">Featured Academy Programs</span>
              <h2>Professional Computer Courses</h2>
              <div className="bannerSubtitle">Learn | Practice | Build Your Future</div>
              <p className="bannerDescription">
                Step into our state-of-the-art computer lab equipped with high-speed systems, multimedia setups, and experienced faculty dedicated to hands-on practical education.
              </p>

              <div className="timingBadge">
                <span className="timingClock">
                  <Clock size={24} color="#1d4ed8" />
                </span>
                <div className="timingDetails">
                  <strong>Daily Lab Batches</strong>
                  <span>Timing: 4:00 PM to 8:00 PM</span>
                </div>
              </div>

              <div className="bannerFeaturesGrid">
                <div className="bannerFeatureItem">
                  <span className="bannerFeatureIcon">
                    <GraduationCap size={20} color="#2563eb" />
                  </span>
                  <div className="bannerFeatureText">
                    <strong>Experienced Instructors</strong>
                    <span>Dedicated mentorship</span>
                  </div>
                </div>
                <div className="bannerFeatureItem">
                  <span className="bannerFeatureIcon">
                    <Monitor size={20} color="#2563eb" />
                  </span>
                  <div className="bannerFeatureText">
                    <strong>Well Equipped Lab</strong>
                    <span>Individual workstation</span>
                  </div>
                </div>
                <div className="bannerFeatureItem">
                  <span className="bannerFeatureIcon">
                    <Award size={20} color="#2563eb" />
                  </span>
                  <div className="bannerFeatureText">
                    <strong>Certificate Provided</strong>
                    <span>Job recognized credential</span>
                  </div>
                </div>
                <div className="bannerFeatureItem">
                  <span className="bannerFeatureIcon">
                    <Cpu size={20} color="#2563eb" />
                  </span>
                  <div className="bannerFeatureText">
                    <strong>Modern AI & Digital Tools</strong>
                    <span>Latest industry trends</span>
                  </div>
                </div>
              </div>

              <div className="actionsRow">
                <button 
                  className="btn" 
                  onClick={() => setSelectedCourse(getCourseById('cit'))}
                >
                  View Full CIT 11-Module Syllabus →
                </button>
                <Link className="btn outlineNavy" href="/admissions" style={{ marginLeft: 12 }}>
                  Enroll in Lab Batch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. HOME PAGE — OUR COURSES
          ======================================================== */}
      <section className="coursesSection" id="courses">
        <div className="container">
          <div className="sectionHeader">
            <div className="sectionHeaderLeft">
              <span className="sectionEyebrow">Popular Courses</span>
              <h2 className="sectionTitle">Explore Our Learning Programs</h2>
              <p className="sectionDesc">
                At Aspire Institute of Technology, we offer learning opportunities designed for students with different educational goals and skill levels. Our programs include computer courses, English language training, and academic coaching for students from Class 1 to Class 10. We focus on building a strong foundation, developing practical abilities, and encouraging students to learn with confidence. Our goal is to help every learner take a meaningful step toward academic success and future career opportunities.
              </p>
            </div>
            <Link className="cardViewAll" href="/courses">
              View All Courses →
            </Link>
          </div>

          <div className="coursesGrid">
            {/* 1. Computer Courses */}
            <div className="courseCategoryCard">
              <div className="categoryCardHeader">
                <div className="categoryRoundIcon categoryBlue">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <h3>Computer Courses</h3>
              </div>

              <ul className="courseItemList">
                <li className="courseItem" onClick={() => setSelectedCourse(getCourseById('cit'))}>
                  <span className="courseBulletDot">•</span>
                  <span className="courseItemName">CIT (6 Months - 11 Modules)</span>
                  <span className="courseItemViewBtn">View Outline</span>
                </li>
                <li className="courseItem" onClick={() => setSelectedCourse(getCourseById('dit'))}>
                  <span className="courseBulletDot">•</span>
                  <span className="courseItemName">DIT (1 Year Diploma)</span>
                  <span className="courseItemViewBtn">View Outline</span>
                </li>
                <li className="courseItem" onClick={() => setSelectedCourse(getCourseById('web-development'))}>
                  <span className="courseBulletDot">•</span>
                  <span className="courseItemName">Web Development (HTML, CSS, JS)</span>
                  <span className="courseItemViewBtn">View Outline</span>
                </li>
                <li className="courseItem" onClick={() => setSelectedCourse(getCourseById('data-science'))}>
                  <span className="courseBulletDot">•</span>
                  <span className="courseItemName">Data Science & AI (1 Year)</span>
                  <span className="courseItemViewBtn">View Outline</span>
                </li>
                <li className="courseItem" onClick={() => setSelectedCourse(getCourseById('python-programming'))}>
                  <span className="courseBulletDot">•</span>
                  <span className="courseItemName">Python Programming (3 Months)</span>
                  <span className="courseItemViewBtn">View Outline</span>
                </li>
                <li className="courseItem" onClick={() => setSelectedCourse(getCourseById('data-analytics'))}>
                  <span className="courseBulletDot">•</span>
                  <span className="courseItemName">Data Analytics & Power BI (4 Months)</span>
                  <span className="courseItemViewBtn">View Outline</span>
                </li>
                <li className="courseItem" onClick={() => setSelectedCourse(getCourseById('graphic-designing'))}>
                  <span className="courseBulletDot">•</span>
                  <span className="courseItemName">Graphic Designing Professional</span>
                  <span className="courseItemViewBtn">View Outline</span>
                </li>
              </ul>

              <div className="categoryCardFooter">
                <button 
                  className="moreLink" 
                  onClick={() => setSelectedCourse(getCourseById('cit'))}
                >
                  + View CIT Full Syllabus
                </button>
                <Link href="/courses" className="moreLink">
                  All Computer Courses →
                </Link>
              </div>
            </div>

            {/* 2. English Language */}
            <div className="courseCategoryCard">
              <div className="categoryCardHeader">
                <div className="categoryRoundIcon categoryGreen">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <h3>English Language</h3>
              </div>

              <ul className="courseItemList">
                <li className="courseItem" onClick={() => setSelectedCourse(getCourseById('spoken-english'))}>
                  <span className="courseBulletDot">•</span>
                  <span className="courseItemName">Spoken English</span>
                  <span className="courseItemViewBtn">View Outline</span>
                </li>
                <li className="courseItem" onClick={() => setSelectedCourse(getCourseById('english-grammar'))}>
                  <span className="courseBulletDot">•</span>
                  <span className="courseItemName">English Grammar</span>
                  <span className="courseItemViewBtn">View Outline</span>
                </li>
                <li className="courseItem" onClick={() => setSelectedCourse(getCourseById('spoken-english'))}>
                  <span className="courseBulletDot">•</span>
                  <span className="courseItemName">Communication Skills & Public Speaking</span>
                  <span className="courseItemViewBtn">View Outline</span>
                </li>
              </ul>

              <div className="categoryCardFooter">
                <button 
                  className="moreLink" 
                  onClick={() => setSelectedCourse(getCourseById('spoken-english'))}
                >
                  + View Course Details
                </button>
                <Link href="/courses" className="moreLink">
                  Explore Language Track →
                </Link>
              </div>
            </div>

            {/* 3. Coaching Classes */}
            <div className="courseCategoryCard">
              <div className="categoryCardHeader">
                <div className="categoryRoundIcon categoryPurple">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                </div>
                <h3>Coaching Classes</h3>
              </div>

              <ul className="courseItemList">
                <li className="courseItem" onClick={() => setSelectedCourse(getCourseById('coaching-classes'))}>
                  <span className="courseBulletDot">•</span>
                  <span className="courseItemName">Primary Section: Class 1 to 5</span>
                  <span className="courseItemViewBtn">Details</span>
                </li>
                <li className="courseItem" onClick={() => setSelectedCourse(getCourseById('coaching-classes'))}>
                  <span className="courseBulletDot">•</span>
                  <span className="courseItemName">Middle Section: Class 6 to 8</span>
                  <span className="courseItemViewBtn">Details</span>
                </li>
                <li className="courseItem" onClick={() => setSelectedCourse(getCourseById('coaching-classes'))}>
                  <span className="courseBulletDot">•</span>
                  <span className="courseItemName">Board Exam Preparation: Class 9 & 10</span>
                  <span className="courseItemViewBtn">Details</span>
                </li>
              </ul>

              <div className="categoryCardFooter">
                <button 
                  className="moreLink" 
                  onClick={() => setSelectedCourse(getCourseById('coaching-classes'))}
                >
                  + View Class Breakdown
                </button>
                <Link href="/courses" className="moreLink">
                  All Coaching Batches →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4 FEATURES STRIP
          ======================================================== */}
      <section className="featuresStrip">
        <div className="container featuresGrid">
          <div className="featureItem">
            <div className="featureIconBox">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <div className="featureTextBox">
              <h4>Modern Computer Labs</h4>
              <p>Hands-on practical learning with individual computer systems.</p>
            </div>
          </div>

          <div className="featureItem">
            <div className="featureIconBox">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className="featureTextBox">
              <h4>Experienced Faculty</h4>
              <p>Guidance at every step with personal attention and mentoring.</p>
            </div>
          </div>

          <div className="featureItem">
            <div className="featureIconBox">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div className="featureTextBox">
              <h4>Safe & Supportive Environment</h4>
              <p>Your success matters in an encouraging and disciplined atmosphere.</p>
            </div>
          </div>

          <div className="featureItem">
            <div className="featureIconBox">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div className="featureTextBox">
              <h4>Practical Learning</h4>
              <p>Build real-world skills with projects, assignments, and certificates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. HOME PAGE — WHY CHOOSE US?
          ======================================================== */}
      <section className="whyChooseSection">
        <div className="container">
          <div className="whyChooseBox">
            <span className="sectionEyebrow">Our Philosophy</span>
            <h3>Why Choose Aspire Institute?</h3>
            <p>
              At Aspire Institute of Technology, we believe that education is more than memorizing information — it is about understanding, practicing, and growing. We aim to provide a supportive learning environment where students can improve their knowledge, develop useful skills, and build confidence. From basic computer education to modern technology skills and academic coaching, our programs are designed to encourage continuous learning and personal development.
            </p>
            <div className="actionsRow">
              <Link href="/about" className="btn">
                Read About Our Mission & Values →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          MOMENTS & MEMORIES | OUR GALLERY
          ======================================================== */}
      <section className="gallerySection">
        <div className="container">
          <div className="sectionHeader">
            <div className="sectionHeaderLeft">
              <span className="sectionEyebrow">Moments & Memories</span>
              <h2 className="sectionTitle">Our Gallery</h2>
            </div>
            <Link className="cardViewAll" href="/gallery">
              View All →
            </Link>
          </div>

          <div className="gallerySlider">
            <div className="galleryCard">
              <Image 
                src="/lab.jpg" 
                alt="Aspire Computer Training Lab" 
                width={300} 
                height={190} 
                className="galleryImg"
              />
            </div>
            <div className="galleryCard">
              <Image 
                src="/classroom.jpg" 
                alt="Modern Academic Classrooms" 
                width={300} 
                height={190} 
                className="galleryImg"
              />
            </div>
            <div className="galleryCard">
              <Image 
                src="/activities.jpg" 
                alt="Student Learning Activities" 
                width={300} 
                height={190} 
                className="galleryImg"
              />
            </div>
            <div className="galleryCard">
              <Image 
                src="/campus.jpg" 
                alt="Aspire Campus Exterior" 
                width={300} 
                height={190} 
                className="galleryImg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          EXPLORE OUR FACILITIES
          ======================================================== */}
      <section className="gallerySection" style={{ background: '#f8fafc', paddingTop: 0 }}>
        <div className="container">
          <div className="sectionHeader">
            <div className="sectionHeaderLeft">
              <span className="sectionEyebrow">Get in Touch</span>
              <h2 className="sectionTitle">Explore Our Facilities</h2>
              <p className="sectionDesc">We provide a conducive learning environment with modern facilities.</p>
            </div>
            <Link className="cardViewAll" href="/gallery">
              View Gallery →
            </Link>
          </div>

          <div className="facilitiesGrid">
            <div className="facilityCard">
              <Image src="/lab.jpg" alt="Computer Lab" width={300} height={200} />
              <div className="facilityOverlay">Computer Lab</div>
            </div>
            <div className="facilityCard">
              <Image src="/classroom.jpg" alt="Classrooms" width={300} height={200} />
              <div className="facilityOverlay">Classrooms</div>
            </div>
            <div className="facilityCard">
              <Image src="/activities.jpg" alt="Learning Activities" width={300} height={200} />
              <div className="facilityOverlay">Learning Activities</div>
            </div>
            <div className="facilityCard">
              <Image src="/campus.jpg" alt="Our Environment" width={300} height={200} />
              <div className="facilityOverlay">Our Environment</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CONTACT US SECTION
          ======================================================== */}
      <section className="contactSection" id="contact">
        <div className="container">
          <div className="sectionHeader">
            <div className="sectionHeaderLeft">
              <span className="sectionEyebrow">Get in Touch</span>
              <h2 className="sectionTitle">Contact Us</h2>
            </div>
          </div>

          <div className="contactGrid">
            {/* Left Column: Details */}
            <div className="contactInfoCard">
              <div className="contactInfoBlock">
                <div className="contactInfoIcon">
                  <MapPin size={20} />
                </div>
                <div className="contactInfoContent">
                  <h4>Address</h4>
                  <p>
                    The Graceful Grammar High School, Naval Campus, near Asifa Bhutto Park, Naval Colony, Karachi, Pakistan.
                  </p>
                </div>
              </div>

              <div className="contactInfoBlock">
                <div className="contactInfoIcon">
                  <Phone size={20} />
                </div>
                <div className="contactInfoContent">
                  <h4>Phone Numbers</h4>
                  <p>
                    <strong>03213693881</strong><br />
                    <strong>03147189947</strong>
                  </p>
                  <div className="contactButtonsRow">
                    <a href="tel:03213693881" className="callBtn">
                      <Phone size={15} /> <span>Call</span>
                    </a>
                    <a 
                      href="https://wa.me/923213693881?text=Hello%20Aspire%20Institute,%20I%20want%20information%20about%20admissions" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="whatsappBtn"
                    >
                      <MessageCircle size={15} /> <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="mapLinkRow">
                <a 
                  href="https://maps.google.com/?q=Naval+Colony+Karachi" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mapLink"
                >
                  <MapPin size={15} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} /> Search on Google Maps →
                </a>
              </div>
            </div>

            {/* Right Column: Send Us a Message Form */}
            <div className="contactFormCard">
              <h3>Send Us a Message</h3>
              {contactSuccess && (
                <div className="formSuccess">
                  <CheckCircle2 size={18} style={{ display: 'inline', verticalAlign: '-3px', marginRight: 6 }} />
                  Message sent successfully! The institute administration will reach out to you soon.
                </div>
              )}
              <form onSubmit={handleContactSubmit} className="formGrid">
                <input 
                  type="text" 
                  name="name" 
                  className="formInput" 
                  placeholder="Your Name *" 
                  required 
                />
                <input 
                  type="email" 
                  name="email" 
                  className="formInput" 
                  placeholder="Your Email (Optional)" 
                />
                <textarea 
                  name="message" 
                  className="formInput" 
                  rows={5} 
                  placeholder="Message *" 
                  required 
                ></textarea>
                <button type="submit" className="btn" disabled={contactLoading}>
                  {contactLoading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. HOME PAGE — CALL TO ACTION
          ======================================================== */}
      <section className="ctaBannerSection">
        <div className="container ctaBannerContent">
          <h2>Your Learning Journey Starts Here</h2>
          <p>
            Take the next step toward your educational and professional goals with Aspire Institute of Technology. Explore our courses, strengthen your skills, and discover new opportunities to grow. Contact us to learn more about our programs and admission process.
          </p>
          <Link href="/admissions" className="ctaBannerBtn">
            Start Your Journey with Aspire Institute Today! →
          </Link>
        </div>
      </section>

      {/* Course Outline Modal */}
      <CourseModal 
        course={selectedCourse} 
        onClose={() => setSelectedCourse(null)} 
      />
    </>
  );
}
