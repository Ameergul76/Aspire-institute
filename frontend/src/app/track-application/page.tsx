'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ApplicationData {
  application_no: string;
  student_name: string;
  father_name: string;
  gender: string;
  mobile: string;
  program: string;
  course: string;
  timing?: string;
  education?: string;
  area?: string;
  status: string;
  admin_notes?: string;
  created_at: string;
}

export default function TrackApplication() {
  const [appNo, setAppNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApplicationData | null>(null);
  const [error, setError] = useState('');

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!appNo.trim()) return;

    setLoading(true);
    setError('');
    setData(null);

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/admissions/status/${encodeURIComponent(appNo.trim())}`);
      const json = await res.json();
      if (res.ok && json.success) {
        setData(json.data);
      } else {
        setError(json.detail || 'Application Number not found. Please double check your reference number.');
      }
    } catch {
      setError('Unable to reach server. Please ensure backend is running or contact campus.');
    } finally {
      setLoading(false);
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
      case 'enrolled':
        return <span className="statusPill statusApproved">✓ Enrolled / Approved</span>;
      case 'interview_scheduled':
        return <span className="statusPill statusInterview">📅 Interview / Test Scheduled</span>;
      case 'rejected':
        return <span className="statusPill statusRejected">✕ Application Not Approved</span>;
      default:
        return <span className="statusPill statusPending">⏳ Pending Campus Review</span>;
    }
  };

  return (
    <>
      <section className="pageHero" style={{
        background: 'linear-gradient(135deg, rgba(7, 14, 47, 0.95) 0%, rgba(13, 31, 102, 0.88) 100%), url(/campus.jpg) center/cover no-repeat',
        padding: '70px 0',
        color: '#fff'
      }}>
        <div className="container">
          <span className="badgePill">Student Self-Service Portal</span>
          <h1 style={{ fontSize: '42px', fontWeight: 900, margin: '14px 0 10px' }}>
            Track Admission Application Status
          </h1>
          <p style={{ fontSize: '18px', color: '#cbd5e1', maxWidth: '640px', margin: 0 }}>
            Enter your official Aspire Application Reference Number (e.g. ASP-XXXXXXXX) to view your real-time admission verification and enrollment status.
          </p>
        </div>
      </section>

      <main className="section" style={{ padding: '60px 0 80px' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          
          {/* Search Card */}
          <div className="portalCard">
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--navy)', margin: '0 0 8px' }}>
              Search Application
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
              Your Application Number was generated when you submitted the online admission form.
            </p>

            <form onSubmit={handleSearch} className="searchBoxForm">
              <input 
                type="text" 
                value={appNo} 
                onChange={(e) => setAppNo(e.target.value)} 
                placeholder="Enter Application Reference No. (e.g. ASP-81498321)"
                className="searchBoxInput"
                required
              />
              <button type="submit" className="btn" disabled={loading} style={{ whiteSpace: 'nowrap' }}>
                {loading ? 'Verifying...' : 'Track Application →'}
              </button>
            </form>

            {error && (
              <div style={{
                background: '#fee2e2',
                color: '#991b1b',
                padding: '14px 18px',
                borderRadius: '10px',
                marginTop: '20px',
                fontSize: '14px',
                fontWeight: 600,
                border: '1px solid #fecaca'
              }}>
                ⚠️ {error}
              </div>
            )}
          </div>

          {/* Results Display */}
          {data && (
            <div className="digitalSlip" style={{ marginTop: '30px' }}>
              <div className="slipHeader">
                <div className="slipLogoCol">
                  <Image 
                    src="/aspire-logo.png" 
                    alt="Aspire Institute Emblem" 
                    width={52} 
                    height={52} 
                    style={{ objectFit: 'contain' }}
                  />
                  <div>
                    <strong>ASPIRE INSTITUTE</strong>
                    <span>OFFICIAL APPLICATION STATUS RECORD</span>
                  </div>
                </div>
                <div className="slipIdBox">
                  <small>Reference Number</small>
                  <strong>{data.application_no}</strong>
                </div>
              </div>

              <div className="slipBody">
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                  paddingBottom: '16px',
                  marginBottom: '20px',
                  borderBottom: '1px solid var(--line)'
                }}>
                  <div>
                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                      Current Admission Status:
                    </span>
                    {getStatusBadge(data.status)}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <small style={{ color: '#64748b', display: 'block' }}>Submission Date</small>
                    <strong style={{ color: 'var(--navy)', fontSize: '14px' }}>
                      {new Date(data.created_at).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </strong>
                  </div>
                </div>

                {data.admin_notes && (
                  <div style={{
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    padding: '14px 18px',
                    borderRadius: '10px',
                    marginBottom: '20px',
                    fontSize: '14px',
                    color: '#1e40af'
                  }}>
                    <strong>📢 Campus Admissions Note:</strong> {data.admin_notes}
                  </div>
                )}

                <div className="slipGrid">
                  <div className="slipField">
                    <span className="slipLabel">Student Full Name</span>
                    <span className="slipVal">{data.student_name}</span>
                  </div>
                  <div className="slipField">
                    <span className="slipLabel">Father / Guardian Name</span>
                    <span className="slipVal">{data.father_name}</span>
                  </div>
                  <div className="slipField">
                    <span className="slipLabel">Selected Program</span>
                    <span className="slipVal">{data.program}</span>
                  </div>
                  <div className="slipField">
                    <span className="slipLabel">Course Enrolled</span>
                    <span className="slipVal" style={{ color: 'var(--blue)', fontWeight: 800 }}>{data.course}</span>
                  </div>
                  <div className="slipField">
                    <span className="slipLabel">Registered Mobile</span>
                    <span className="slipVal">{data.mobile}</span>
                  </div>
                  <div className="slipField">
                    <span className="slipLabel">Preferred Shift / Timing</span>
                    <span className="slipVal">{data.timing || '5:00 PM – 6:00 PM'}</span>
                  </div>
                </div>

                <div style={{
                  background: '#f8fafc',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  marginTop: '24px',
                  border: '1px solid var(--line)',
                  fontSize: '13.5px',
                  color: '#475569'
                }}>
                  <strong>📍 Campus Next Steps:</strong>
                  <ul style={{ margin: '8px 0 0', paddingLeft: '20px', lineHeight: 1.6 }}>
                    <li>Please bring your original B-Form/CNIC and 2 passport photos to the Aspire Institute Admissions Office (Naval Colony, Karachi).</li>
                    <li>For interview scheduling or batch queries, contact admissions at <strong>0336-3294326</strong>.</li>
                  </ul>
                </div>

                <div className="slipActions" style={{ marginTop: '24px' }}>
                  <button onClick={() => window.print()} className="btn">
                    🖨️ Print Status Document
                  </button>
                  <a 
                    href={`https://wa.me/923363294326?text=${encodeURIComponent(`Hello Aspire Institute, I am following up on my application ${data.application_no} for ${data.course}.`)}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn outline"
                  >
                    💬 WhatsApp Admissions Officer
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Quick Apply CTA */}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <p style={{ color: '#64748b', fontSize: '15px' }}>
              Haven&apos;t applied for admission yet?
            </p>
            <Link href="/admissions" className="btn outlineNavy" style={{ marginTop: '8px' }}>
              Apply for New Admission 2026 →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
