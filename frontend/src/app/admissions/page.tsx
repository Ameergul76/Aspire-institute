'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface FormDataState {
  student_name: string;
  father_name: string;
  gender: string;
  cnic: string;
  dob: string;
  program: string;
  course: string;
  timing: string;
  education: string;
  mobile: string;
  parent_mobile: string;
  email: string;
  area: string;
  message: string;
}

const INITIAL_FORM: FormDataState = {
  student_name: '',
  father_name: '',
  gender: 'Male',
  cnic: '',
  dob: '',
  program: 'Computer Courses',
  course: 'CIT — Certificate in IT (6 Months)',
  timing: '5:00 PM – 6:00 PM',
  education: 'Matric',
  mobile: '',
  parent_mobile: '',
  email: '',
  area: 'Naval Colony, Karachi',
  message: '',
};

function AdmissionsPortal() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState<FormDataState>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [appNumber, setAppNumber] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Sync URL params if user arrived by clicking "Apply" on a course
  useEffect(() => {
    const courseParam = searchParams.get('course');
    const progParam = searchParams.get('program');

    if (courseParam || progParam) {
      setFormData((prev) => {
        let matchedProg = prev.program;
        if (progParam) {
          if (progParam.includes('Computer')) matchedProg = 'Computer Courses';
          else if (progParam.includes('English')) matchedProg = 'English Language';
          else if (progParam.includes('Coaching')) matchedProg = 'Coaching Classes';
        }
        return {
          ...prev,
          course: courseParam || prev.course,
          program: matchedProg,
        };
      });
      setStep(2); // take directly to program step to confirm choice
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProgramSelect = (prog: string) => {
    let defaultCourse = 'CIT — Certificate in IT (6 Months)';
    if (prog === 'English Language') defaultCourse = 'Spoken English & Communication Skills';
    if (prog === 'Coaching Classes') defaultCourse = 'Secondary Coaching (Class 9 & 10)';

    setFormData((prev) => ({
      ...prev,
      program: prog,
      course: defaultCourse,
    }));
  };

  // Submit to Backend
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      student_name: formData.student_name,
      father_name: formData.father_name,
      mobile: formData.mobile,
      email: formData.email || null,
      program: formData.program,
      course: formData.course,
      message: `Shift: ${formData.timing} | Gender: ${formData.gender} | Education: ${formData.education} | Area: ${formData.area} | Parent Phone: ${formData.parent_mobile || 'N/A'} | Notes: ${formData.message || 'None'}`,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/admissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const resData = await res.json();
        setAppNumber(resData.application_no || 'ASP-' + Math.floor(100000 + Math.random() * 900000));
        setSubmitted(true);
      } else {
        alert('Could not submit application. Please check fields or WhatsApp us directly.');
      }
    } catch {
      // Fallback offline mock ID
      setAppNumber('ASP-' + Math.floor(100000 + Math.random() * 900000));
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const faqs = [
    {
      q: 'What are the daily lab timings for Computer and Language courses?',
      a: 'Aspire Institute operates computer and skills batches daily between 4:00 PM and 8:00 PM. Shifts are 1 hour each (e.g. 4-5 PM, 5-6 PM, 6-7 PM, 7-8 PM) with individual workstation access for every student.',
    },
    {
      q: 'Can I pay the admission and course fee in easy monthly installments?',
      a: 'Yes, absolutely! Aspire Institute offers convenient installment packages so that every student can learn without financial pressure. Speak with our admission desk during confirmation.',
    },
    {
      q: 'Is the Course Completion Certificate officially recognized?',
      a: 'Yes. Upon passing practical evaluations and completing the final capstone project, students receive an official, verifiable Certificate issued by Aspire Institute of Technology, accepted for employment and job applications.',
    },
    {
      q: 'What documents should I bring when visiting the campus?',
      a: 'You should bring a copy of your CNIC or B-Form, 2 recent passport-size photographs, and a copy of your most recent academic marksheet/certificate.',
    },
    {
      q: 'Are coaching classes available for all school levels?',
      a: 'Yes, we conduct structured coaching classes from Class 1 up to Class 10 (Sindh Board and Federal Board) with subject specialists for Science, Mathematics, English, and Urdu.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pageHero" style={{
        background: 'linear-gradient(135deg, rgba(7, 14, 47, 0.96) 0%, rgba(13, 31, 102, 0.88) 100%), url(/hero_students.jpg) center/cover no-repeat',
        padding: '75px 0 65px',
        color: '#fff'
      }}>
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', padding: '6px 16px', borderRadius: '50px', fontSize: '13px', fontWeight: 700, border: '1px solid rgba(255,255,255,0.2)', marginBottom: '16px' }}>
            <span style={{ color: '#fde047' }}>★</span>
            <span style={{ color: '#93c5fd' }}>Admissions Open — Academic Session 2025/2026</span>
          </div>

          <h1 style={{ fontSize: 'clamp(34px, 4.5vw, 50px)', fontWeight: 900, margin: '0 0 14px', lineHeight: 1.15 }}>
            Online Admission Portal
          </h1>
          <p style={{ fontSize: '17px', color: '#cbd5e1', maxWidth: '720px', margin: '0 0 24px', lineHeight: 1.7 }}>
            Apply online for <strong>CIT (6 Months)</strong>, <strong>DIT (1 Year)</strong>, <strong>Graphic Designing</strong>, <strong>Web Development</strong>, <strong>Spoken English</strong>, and <strong>Class 1 to 10 Coaching</strong>. Reserve your individual lab seat in under 2 minutes.
          </p>

          <div className="admissionStatsGrid">
            <div className="admissionStatCard">
              <span className="admissionStatIcon">🖥️</span>
              <div>
                <strong>100% Practical Labs</strong>
                <span>Individual workstation</span>
              </div>
            </div>
            <div className="admissionStatCard">
              <span className="admissionStatIcon">🕒</span>
              <div>
                <strong>4:00 PM – 8:00 PM</strong>
                <span>Flexible evening shifts</span>
              </div>
            </div>
            <div className="admissionStatCard">
              <span className="admissionStatIcon">📜</span>
              <div>
                <strong>Official Certificate</strong>
                <span>Job-ready verification</span>
              </div>
            </div>
            <div className="admissionStatCard">
              <span className="admissionStatIcon">💳</span>
              <div>
                <strong>Easy Installments</strong>
                <span>Affordable student fee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Portal Content */}
      <main className="section" style={{ padding: '60px 0 80px' }}>
        <div className="container">

          {/* If Application Submitted -> Show Official Digital Slip */}
          {submitted ? (
            <div style={{ maxWidth: '820px', margin: '0 auto' }}>
              <div className="digitalSlip" id="admissionReceipt">
                {/* Slip Header */}
                <div className="slipHeader">
                  <div className="slipLogoCol">
                    <Image 
                      src="/aspire-logo.png" 
                      alt="Aspire Institute Logo" 
                      width={52} 
                      height={52} 
                      style={{ objectFit: 'contain' }}
                    />
                    <div>
                      <strong>ASPIRE INSTITUTE</strong>
                      <span>ONLINE ADMISSION CONFIRMATION SLIP</span>
                    </div>
                  </div>
                  <div className="slipIdBox">
                    <small>Application Reference No.</small>
                    <strong>{appNumber}</strong>
                  </div>
                </div>

                {/* Slip Body */}
                <div className="slipBody">
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                    paddingBottom: '14px',
                    borderBottom: '1px solid var(--line)'
                  }}>
                    <div>
                      <span style={{
                        background: '#ecfdf5',
                        color: '#065f46',
                        border: '1px solid #a7f3d0',
                        fontSize: '12px',
                        fontWeight: 800,
                        padding: '4px 12px',
                        borderRadius: '20px'
                      }}>
                        ✓ Seat Reserved (Status: Pending Campus Verification)
                      </span>
                    </div>
                    <span style={{ fontSize: '13px', color: '#64748b' }}>
                      Date: {new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <div className="slipGrid">
                    <div className="slipField">
                      <small>Student Full Name</small>
                      <strong>{formData.student_name}</strong>
                    </div>
                    <div className="slipField">
                      <small>Father / Guardian Name</small>
                      <strong>{formData.father_name}</strong>
                    </div>
                    <div className="slipField">
                      <small>Selected Program</small>
                      <strong style={{ color: 'var(--blue)' }}>{formData.program}</strong>
                    </div>
                    <div className="slipField">
                      <small>Enrolled Course / Class</small>
                      <strong>{formData.course}</strong>
                    </div>
                    <div className="slipField">
                      <small>Preferred Shift Timing</small>
                      <strong>{formData.timing} (Daily Lab)</strong>
                    </div>
                    <div className="slipField">
                      <small>Contact / WhatsApp</small>
                      <strong>{formData.mobile}</strong>
                    </div>
                    <div className="slipField">
                      <small>Previous Education</small>
                      <strong>{formData.education}</strong>
                    </div>
                    <div className="slipField">
                      <small>Residential Area</small>
                      <strong>{formData.area}</strong>
                    </div>
                  </div>

                  {/* Reporting Instructions */}
                  <div className="slipReportingInstructions">
                    <h5>🏫 Next Steps & Campus Verification Instructions:</h5>
                    <p>
                      1. Please bring a printout or screenshot of this slip to the Aspire Institute Admission Office.<br />
                      2. Submit <strong>2 Passport Size Photographs</strong> and <strong>1 Copy of CNIC / B-Form</strong>.<br />
                      3. Campus Address: <strong>The Graceful Grammar High School, Naval Campus, near Asifa Bhutto Park, Naval Colony, Karachi</strong>.<br />
                      4. Visiting Timings: <strong>Monday to Saturday (4:00 PM to 8:00 PM)</strong>.
                    </p>
                  </div>

                  <div className="slipActions">
                    <button onClick={handlePrint} className="btn">
                      🖨️ Print / Save as PDF
                    </button>
                    <a 
                      href={`https://wa.me/923213693881?text=${encodeURIComponent(
                        `Assalam-o-Alaikum! I have submitted my online admission for Aspire Institute.\n\nApplication No: ${appNumber}\nStudent Name: ${formData.student_name}\nCourse: ${formData.course}\nTiming: ${formData.timing}\nMobile: ${formData.mobile}\n\nPlease verify my application.`
                      )}`}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="whatsappBtn"
                    >
                      💬 Send Slip to Admissions WhatsApp
                    </a>
                    <button 
                      onClick={() => {
                        setSubmitted(false);
                        setStep(1);
                        setFormData(INITIAL_FORM);
                      }} 
                      className="btn outlineNavy"
                    >
                      Apply for Another Student
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Multi-Step Admission Form */
            <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '36px', alignItems: 'start' }}>
              
              {/* Left Column: The Form */}
              <div style={{
                background: '#ffffff',
                border: '1px solid var(--line)',
                borderRadius: '20px',
                padding: '36px',
                boxShadow: 'var(--shadow-md)'
              }}>
                {/* Stepper Progress */}
                <div className="stepperContainer">
                  <div 
                    className={`stepItem ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}
                    onClick={() => setStep(1)}
                  >
                    <div className="stepCircle">{step > 1 ? '✓' : '1'}</div>
                    <div className="stepLabel">
                      <small>Step 1</small>
                      <span>Personal Info</span>
                    </div>
                  </div>

                  <div className="stepDividerLine" />

                  <div 
                    className={`stepItem ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}
                    onClick={() => formData.student_name && formData.father_name && setStep(2)}
                  >
                    <div className="stepCircle">{step > 2 ? '✓' : '2'}</div>
                    <div className="stepLabel">
                      <small>Step 2</small>
                      <span>Program & Course</span>
                    </div>
                  </div>

                  <div className="stepDividerLine" />

                  <div 
                    className={`stepItem ${step === 3 ? 'active' : step > 3 ? 'completed' : ''}`}
                    onClick={() => formData.student_name && setStep(3)}
                  >
                    <div className="stepCircle">{step > 3 ? '✓' : '3'}</div>
                    <div className="stepLabel">
                      <small>Step 3</small>
                      <span>Contact & Submit</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* STEP 1: Personal Details */}
                  {step === 1 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div>
                        <h3 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--navy)', margin: '0 0 6px' }}>
                          Step 1: Student Personal Information
                        </h3>
                        <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                          Please enter your official details as written on your B-form or educational documents.
                        </p>
                      </div>

                      <div className="formGrid">
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
                            Student Full Name *
                          </label>
                          <input 
                            type="text" 
                            name="student_name"
                            value={formData.student_name}
                            onChange={handleChange}
                            className="formInput" 
                            placeholder="e.g. Muhammad Ali Khan" 
                            required 
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
                            Father / Guardian Name *
                          </label>
                          <input 
                            type="text" 
                            name="father_name"
                            value={formData.father_name}
                            onChange={handleChange}
                            className="formInput" 
                            placeholder="e.g. Tariq Mehmood" 
                            required 
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
                              Gender *
                            </label>
                            <select 
                              name="gender" 
                              value={formData.gender} 
                              onChange={handleChange} 
                              className="formInput"
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
                              Date of Birth (Optional)
                            </label>
                            <input 
                              type="date" 
                              name="dob"
                              value={formData.dob}
                              onChange={handleChange}
                              className="formInput" 
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
                            CNIC or B-Form Number (Optional)
                          </label>
                          <input 
                            type="text" 
                            name="cnic"
                            value={formData.cnic}
                            onChange={handleChange}
                            className="formInput" 
                            placeholder="42101-XXXXXXX-X" 
                          />
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                        <button 
                          type="button" 
                          className="btn" 
                          disabled={!formData.student_name || !formData.father_name}
                          onClick={() => setStep(2)}
                        >
                          Continue to Step 2 (Select Course) →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Program & Course Selection */}
                  {step === 2 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div>
                        <h3 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--navy)', margin: '0 0 6px' }}>
                          Step 2: Select Program & Batch Timing
                        </h3>
                        <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                          Select the program category and preferred shift for your daily classes.
                        </p>
                      </div>

                      {/* Visual Program Selection Cards */}
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '10px' }}>
                          Choose Program Category *
                        </label>
                        <div className="programCardsGrid">
                          <div 
                            className={`programCardSelect ${formData.program === 'Computer Courses' ? 'selected' : ''}`}
                            onClick={() => handleProgramSelect('Computer Courses')}
                          >
                            <div className="programCardSelectTop">
                              <span className="programCardIcon">🖥️</span>
                              <div className="programCardRadio" />
                            </div>
                            <strong>Computer Courses</strong>
                            <p>CIT (6M), DIT (1Y), Graphic Design, Web Development & AI</p>
                          </div>

                          <div 
                            className={`programCardSelect ${formData.program === 'English Language' ? 'selected' : ''}`}
                            onClick={() => handleProgramSelect('English Language')}
                          >
                            <div className="programCardSelectTop">
                              <span className="programCardIcon">🗣️</span>
                              <div className="programCardRadio" />
                            </div>
                            <strong>English Language</strong>
                            <p>Spoken English, Grammar, Fluency & Public Speaking</p>
                          </div>

                          <div 
                            className={`programCardSelect ${formData.program === 'Coaching Classes' ? 'selected' : ''}`}
                            onClick={() => handleProgramSelect('Coaching Classes')}
                          >
                            <div className="programCardSelectTop">
                              <span className="programCardIcon">📚</span>
                              <div className="programCardRadio" />
                            </div>
                            <strong>Coaching Classes</strong>
                            <p>Class 1 to 10 conceptual coaching & Board preparation</p>
                          </div>
                        </div>
                      </div>

                      {/* Course Dropdown depending on category */}
                      <div className="formGrid">
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
                            Select Specific Course *
                          </label>
                          {formData.program === 'Computer Courses' && (
                            <select 
                              name="course" 
                              value={formData.course} 
                              onChange={handleChange} 
                              className="formInput"
                            >
                              <option value="CIT — Certificate in IT (6 Months)">CIT — Certificate in IT (6 Months)</option>
                              <option value="DIT — Diploma in IT (1 Year)">DIT — Diploma in IT (1 Year Program)</option>
                              <option value="Web Development (4 Months)">Web Development (HTML, CSS, JavaScript — 4 Months)</option>
                              <option value="Data Science & Artificial Intelligence (1 Year)">Data Science & AI (1 Year Diploma)</option>
                              <option value="Python Programming Mastery (3 Months)">Python Programming Mastery (3 Months)</option>
                              <option value="Data Analytics & Business Intelligence (4 Months)">Data Analytics & Power BI (4 Months)</option>
                              <option value="Graphic Designing Professional (3 Months)">Graphic Designing Professional (3 Months)</option>
                            </select>
                          )}

                          {formData.program === 'English Language' && (
                            <select 
                              name="course" 
                              value={formData.course} 
                              onChange={handleChange} 
                              className="formInput"
                            >
                              <option value="Spoken English & Communication Skills">Spoken English & Communication Skills (Fluency Track)</option>
                              <option value="English Grammar & Writing Mastery">English Grammar & Formal Writing Mastery</option>
                              <option value="Complete English Combo (Spoken + Grammar)">Complete English Combo (Spoken + Grammar)</option>
                            </select>
                          )}

                          {formData.program === 'Coaching Classes' && (
                            <select 
                              name="course" 
                              value={formData.course} 
                              onChange={handleChange} 
                              className="formInput"
                            >
                              <option value="Secondary Coaching (Class 9 & 10 Board)">Class 9 & 10 Matric Board Exam Prep (Sindh / Federal)</option>
                              <option value="Middle Section (Class 6, 7 & 8)">Middle Section (Class 6, 7 & 8 All Subjects)</option>
                              <option value="Primary Section (Class 1 to 5)">Primary Section (Class 1 to 5 Conceptual Coaching)</option>
                            </select>
                          )}
                        </div>

                        {/* Batch Timing Selection */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
                              Preferred Shift Timing (4 PM to 8 PM) *
                            </label>
                            <select 
                              name="timing" 
                              value={formData.timing} 
                              onChange={handleChange} 
                              className="formInput"
                            >
                              <option value="4:00 PM – 5:00 PM">4:00 PM – 5:00 PM (Shift 1)</option>
                              <option value="5:00 PM – 6:00 PM">5:00 PM – 6:00 PM (Shift 2)</option>
                              <option value="6:00 PM – 7:00 PM">6:00 PM – 7:00 PM (Shift 3)</option>
                              <option value="7:00 PM – 8:00 PM">7:00 PM – 8:00 PM (Shift 4)</option>
                              <option value="Weekend Special Shift">Weekend Special Batch</option>
                            </select>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
                              Current Qualification *
                            </label>
                            <select 
                              name="education" 
                              value={formData.education} 
                              onChange={handleChange} 
                              className="formInput"
                            >
                              <option value="Under Matric (School Student)">Under Matric (School Student)</option>
                              <option value="Matric (Science / General)">Matric (Science / Arts)</option>
                              <option value="Intermediate (FSc / ICS / ICom / FA)">Intermediate (FSc / ICS / ICom)</option>
                              <option value="Graduation / Ongoing">Graduation / University</option>
                              <option value="Job Holder / Professional">Job Holder / Professional</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                        <button type="button" className="btn outlineNavy" onClick={() => setStep(1)}>
                          ← Back to Step 1
                        </button>
                        <button type="button" className="btn" onClick={() => setStep(3)}>
                          Continue to Step 3 (Contact & Address) →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Contact & Submit */}
                  {step === 3 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div>
                        <h3 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--navy)', margin: '0 0 6px' }}>
                          Step 3: Contact Details & Residence
                        </h3>
                        <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                          Provide your WhatsApp and active phone number so our administration can confirm your seat.
                        </p>
                      </div>

                      <div className="formGrid">
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
                            Student Mobile / WhatsApp Number *
                          </label>
                          <input 
                            type="tel" 
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="formInput" 
                            placeholder="0321XXXXXXX or 0314XXXXXXX" 
                            required 
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
                              Parent / Guardian Phone (Optional)
                            </label>
                            <input 
                              type="tel" 
                              name="parent_mobile"
                              value={formData.parent_mobile}
                              onChange={handleChange}
                              className="formInput" 
                              placeholder="03XXXXXXXXX" 
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
                              Email Address (Optional)
                            </label>
                            <input 
                              type="email" 
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="formInput" 
                              placeholder="student@example.com" 
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
                            Residential Area / Address in Karachi *
                          </label>
                          <select 
                            name="area" 
                            value={formData.area} 
                            onChange={handleChange} 
                            className="formInput"
                          >
                            <option value="Naval Colony, Karachi">Naval Colony, Karachi</option>
                            <option value="Baldia Town, Karachi">Baldia Town, Karachi</option>
                            <option value="Hub Chowki / Balochistan Border">Hub Chowki</option>
                            <option value="Maripur / Hawksbay Area">Maripur / Hawksbay Area</option>
                            <option value="Gulshan-e-Mazdoor / Saeedabad">Gulshan-e-Mazdoor / Saeedabad</option>
                            <option value="Other Area in Karachi">Other Area in Karachi</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
                            Special Remarks or Questions (Optional)
                          </label>
                          <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="formInput" 
                            rows={3}
                            placeholder="Any questions about fees, installment, or computer experience..." 
                          />
                        </div>
                      </div>

                      {/* Application Summary Box before submit */}
                      <div style={{
                        background: '#eff6ff',
                        border: '1px solid #bfdbfe',
                        borderRadius: '12px',
                        padding: '16px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        fontSize: '13.5px',
                        color: '#1e3a8a'
                      }}>
                        <strong>📝 Review Summary:</strong>
                        <span>Candidate: <strong>{formData.student_name}</strong> s/o <strong>{formData.father_name}</strong></span>
                        <span>Course: <strong>{formData.course}</strong> ({formData.timing})</span>
                        <span>Phone: <strong>{formData.mobile || 'Not filled yet'}</strong></span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                        <button type="button" className="btn outlineNavy" onClick={() => setStep(2)}>
                          ← Back to Step 2
                        </button>
                        <button 
                          type="submit" 
                          className="btn" 
                          disabled={loading || !formData.mobile}
                          style={{ padding: '14px 28px', fontSize: '15px' }}
                        >
                          {loading ? 'Submitting Application...' : 'Confirm & Generate Admission Slip 🎓'}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>

              {/* Right Column: Guidelines, Required Documents & Support */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Documents Required Box */}
                <div style={{
                  background: '#ffffff',
                  border: '1px solid var(--line)',
                  borderRadius: '18px',
                  padding: '28px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <h4 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--navy)', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>📁</span> Required Documents for Physical Verification
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13.5px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <li>
                      <strong>1 Copy of CNIC or B-Form</strong> (Student or Guardian)
                    </li>
                    <li>
                      <strong>2 Recent Passport Size Photographs</strong> (with blue or white background)
                    </li>
                    <li>
                      <strong>1 Copy of Previous Certificate / Marksheet</strong> (Matric/Inter/School)
                    </li>
                    <li>
                      <strong>Online Admission Slip Print / Screenshot</strong>
                    </li>
                  </ul>
                </div>

                {/* Lab Timings & Shifts Box */}
                <div style={{
                  background: '#ffffff',
                  border: '1px solid var(--line)',
                  borderRadius: '18px',
                  padding: '28px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <h4 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--navy)', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>🕒</span> Daily Lab Batches (Monday to Saturday)
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontSize: '13px' }}>
                    <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--line)' }}>
                      <strong>Batch 1:</strong><br />4:00 PM – 5:00 PM
                    </div>
                    <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--line)' }}>
                      <strong>Batch 2:</strong><br />5:00 PM – 6:00 PM
                    </div>
                    <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--line)' }}>
                      <strong>Batch 3:</strong><br />6:00 PM – 7:00 PM
                    </div>
                    <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--line)' }}>
                      <strong>Batch 4:</strong><br />7:00 PM – 8:00 PM
                    </div>
                  </div>
                </div>

                {/* Instant Helpline Box */}
                <div style={{
                  background: 'linear-gradient(135deg, #070e2f 0%, #102166 100%)',
                  borderRadius: '18px',
                  padding: '28px',
                  color: '#fff'
                }}>
                  <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#93c5fd', fontWeight: 700 }}>
                    Admissions Desk Helpline
                  </span>
                  <h4 style={{ margin: '6px 0 10px', fontSize: '18px', fontWeight: 800 }}>Need Help with Admission?</h4>
                  <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#cbd5e1', lineHeight: 1.6 }}>
                    Visit our campus at Naval Colony or contact our admission counselors directly:
                  </p>
                  <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px' }}>
                    📞 03213693881 / 03147189947
                  </div>
                  <a 
                    href="https://wa.me/923213693881?text=Hello%20Aspire%20Institute,%20I%20have%20a%20question%20regarding%20online%20admission"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsappBtn"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Chat on WhatsApp
                  </a>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================
              FREQUENTLY ASKED QUESTIONS (FAQ) SECTION
              ======================================================== */}
          <div style={{ marginTop: '80px' }}>
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
              <span className="sectionEyebrow">Got Questions?</span>
              <h2 className="sectionTitle">Frequently Asked Questions</h2>
              <p className="sectionDesc">
                Common questions about admission eligibility, course certificates, batch timings, and fee structure.
              </p>
            </div>

            <div style={{ maxWidth: '840px', margin: 'auto' }} className="faqAccordion">
              {faqs.map((faq, idx) => (
                <div key={idx} className="faqItem">
                  <button 
                    className="faqQuestion" 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    type="button"
                  >
                    <span>{faq.q}</span>
                    <span style={{ fontSize: '18px', color: 'var(--blue)' }}>
                      {openFaq === idx ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === idx && (
                    <div className="faqAnswer">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Location & Directions Card */}
          <div style={{
            marginTop: '60px',
            background: '#ffffff',
            border: '1px solid var(--line)',
            borderRadius: '18px',
            padding: '36px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <span className="sectionEyebrow">Campus Visit</span>
              <h3 style={{ margin: '4px 0 8px', fontSize: '22px', fontWeight: 800, color: 'var(--navy)' }}>
                Aspire Institute of Technology — Naval Campus
              </h3>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14.5px' }}>
                The Graceful Grammar High School, Naval Campus, near Asifa Bhutto Park, Naval Colony, Karachi, Pakistan.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a 
                href="https://maps.google.com/?q=Naval+Colony+Karachi" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn outlineNavy"
              >
                📍 View on Google Maps
              </a>
              <Link href="/contact" className="btn">
                Contact Office →
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}

export default function Admissions() {
  return (
    <Suspense fallback={
      <div style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h3>Loading Aspire Admission Portal...</h3>
      </div>
    }>
      <AdmissionsPortal />
    </Suspense>
  );
}
