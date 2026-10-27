'use client';
import { useState } from 'react';
import Image from 'next/image';

interface CertificateData {
  certificate_id: string;
  roll_no: string;
  student_name: string;
  father_name: string;
  course: string;
  grade: string;
  marks_percentage: number;
  issue_date: string;
  status: string;
}

export default function VerifyCertificate() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [cert, setCert] = useState<CertificateData | null>(null);
  const [error, setError] = useState('');

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setCert(null);

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/certificates/verify/${encodeURIComponent(query.trim())}`);
      const json = await res.json();
      if (res.ok && json.success) {
        setCert(json.certificate);
      } else {
        setError(json.detail || 'Certificate not found. Please verify the ID or Roll No entered.');
      }
    } catch {
      setError('Unable to connect to verification server. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="pageHero" style={{
        background: 'linear-gradient(135deg, rgba(7, 14, 47, 0.95) 0%, rgba(13, 31, 102, 0.88) 100%), url(/lab.jpg) center/cover no-repeat',
        padding: '70px 0',
        color: '#fff'
      }}>
        <div className="container">
          <span className="badgePill">Official Credential Verification</span>
          <h1 style={{ fontSize: '42px', fontWeight: 900, margin: '14px 0 10px' }}>
            Verify Student Certificate & Diploma
          </h1>
          <p style={{ fontSize: '18px', color: '#cbd5e1', maxWidth: '640px', margin: 0 }}>
            Employers, academic institutions, and students can instantly authenticate the validity of credentials issued by Aspire Institute of Technology.
          </p>
        </div>
      </section>

      <main className="section" style={{ padding: '60px 0 80px' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          
          <div className="portalCard">
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--navy)', margin: '0 0 8px' }}>
              Certificate Authentication Portal
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
              Enter the unique Certificate Registration ID (printed on the certificate) or Student Roll Number.
            </p>

            <form onSubmit={handleVerify} className="searchBoxForm">
              <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="e.g. ASP-2025-CIT-0841 or ASP-1048"
                className="searchBoxInput"
                required
              />
              <button type="submit" className="btn" disabled={loading} style={{ whiteSpace: 'nowrap' }}>
                {loading ? 'Authenticating...' : 'Verify Credential 🛡️'}
              </button>
            </form>

            <div style={{ marginTop: '14px', fontSize: '13px', color: '#64748b' }}>
              💡 <em>Try sample IDs: <code>ASP-2025-CIT-0841</code>, <code>ASP-2025-DIT-0219</code>, or <code>ASP-1048</code></em>
            </div>

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
                ❌ {error}
              </div>
            )}
          </div>

          {/* Verified Credential Card */}
          {cert && (
            <div className="certCredential" style={{ marginTop: '30px' }} id="printableCert">
              <div className="certSealBadge">
                <span>OFFICIAL</span>
                <span style={{ fontSize: '13px' }}>VERIFIED</span>
                <span>SEAL</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <Image 
                  src="/aspire-logo.png" 
                  alt="Aspire Institute Crest" 
                  width={64} 
                  height={64} 
                  style={{ objectFit: 'contain' }}
                />
                <div>
                  <h3 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
                    ASPIRE INSTITUTE OF TECHNOLOGY
                  </h3>
                  <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: 'var(--blue)' }}>
                    CREDENTIAL AUTHENTICATION & RECORD VERIFICATION
                  </span>
                </div>
              </div>

              <div style={{
                background: '#ecfdf5',
                border: '1.5px solid #a7f3d0',
                padding: '12px 18px',
                borderRadius: '10px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{ fontSize: '18px' }}>✅</span>
                <span style={{ color: '#065f46', fontWeight: 800, fontSize: '14px' }}>
                  GENUINE & AUTHENTIC CREDENTIAL — VERIFIED FROM CENTRAL INSTITUTE DATABASE
                </span>
              </div>

              <div className="slipGrid" style={{ marginBottom: '24px' }}>
                <div className="slipField">
                  <span className="slipLabel">Student Full Name</span>
                  <span className="slipVal" style={{ fontSize: '18px', color: 'var(--navy)', fontWeight: 900 }}>
                    {cert.student_name}
                  </span>
                </div>
                <div className="slipField">
                  <span className="slipLabel">Father&apos;s Name</span>
                  <span className="slipVal">{cert.father_name}</span>
                </div>
                <div className="slipField">
                  <span className="slipLabel">Course Completed</span>
                  <span className="slipVal" style={{ color: 'var(--blue)', fontWeight: 800 }}>
                    {cert.course}
                  </span>
                </div>
                <div className="slipField">
                  <span className="slipLabel">Academic Grade</span>
                  <span className="slipVal" style={{ color: '#15803d', fontWeight: 800 }}>
                    {cert.grade}
                  </span>
                </div>
                <div className="slipField">
                  <span className="slipLabel">Examination Score</span>
                  <span className="slipVal">{cert.marks_percentage}%</span>
                </div>
                <div className="slipField">
                  <span className="slipLabel">Certificate Registration ID</span>
                  <span className="slipVal" style={{ fontFamily: 'monospace', fontWeight: 800 }}>
                    {cert.certificate_id}
                  </span>
                </div>
                <div className="slipField">
                  <span className="slipLabel">Institute Roll Number</span>
                  <span className="slipVal" style={{ fontFamily: 'monospace' }}>
                    {cert.roll_no}
                  </span>
                </div>
                <div className="slipField">
                  <span className="slipLabel">Issue Date</span>
                  <span className="slipVal">
                    {new Date(cert.issue_date).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>

              <div style={{
                borderTop: '1px solid var(--line)',
                paddingTop: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  Official Digital Record generated for employer/institutional verification.<br />
                  Aspire Institute Campus: Naval Colony, Karachi, Pakistan.
                </div>
                <button onClick={() => window.print()} className="btn" style={{ padding: '8px 20px', fontSize: '14px' }}>
                  🖨️ Print Verification Certificate
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
