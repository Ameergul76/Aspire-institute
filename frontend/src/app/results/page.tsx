'use client';
import { useState } from 'react';
import Image from 'next/image';

interface ResultRecord {
  id: number;
  roll_no: string;
  student_name: string;
  father_name: string;
  exam_name: string;
  course: string;
  total_marks: number;
  obtained_marks: number;
  percentage: number;
  grade: string;
  remarks?: string;
  exam_date: string;
}

export default function StudentResults() {
  const [rollNo, setRollNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ResultRecord[]>([]);
  const [error, setError] = useState('');

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!rollNo.trim()) return;

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/results/${encodeURIComponent(rollNo.trim())}`);
      const json = await res.json();
      if (res.ok && json.success) {
        setResults(json.results);
      } else {
        setError(json.detail || 'No examination records found for this Roll Number.');
      }
    } catch {
      setError('Unable to fetch results. Please ensure the server is connected.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="pageHero" style={{
        background: 'linear-gradient(135deg, rgba(7, 14, 47, 0.95) 0%, rgba(13, 31, 102, 0.88) 100%), url(/classroom.jpg) center/cover no-repeat',
        padding: '70px 0',
        color: '#fff'
      }}>
        <div className="container">
          <span className="badgePill">Student Examination System</span>
          <h1 style={{ fontSize: '42px', fontWeight: 900, margin: '14px 0 10px' }}>
            Check Student Results & Marksheet
          </h1>
          <p style={{ fontSize: '18px', color: '#cbd5e1', maxWidth: '640px', margin: 0 }}>
            Enter your Aspire Institute Roll Number to view detailed assessment marks, percentage, and faculty remarks for monthly tests and term examinations.
          </p>
        </div>
      </section>

      <main className="section" style={{ padding: '60px 0 80px' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          
          <div className="portalCard">
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--navy)', margin: '0 0 8px' }}>
              Student Marksheet Search
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
              Enter your Roll Number assigned by the institute (e.g. ASP-1048, ASP-1012).
            </p>

            <form onSubmit={handleSearch} className="searchBoxForm">
              <input 
                type="text" 
                value={rollNo} 
                onChange={(e) => setRollNo(e.target.value)} 
                placeholder="Enter Roll Number (e.g. ASP-1048)"
                className="searchBoxInput"
                required
              />
              <button type="submit" className="btn" disabled={loading} style={{ whiteSpace: 'nowrap' }}>
                {loading ? 'Searching...' : 'View Marksheet →'}
              </button>
            </form>

            <div style={{ marginTop: '14px', fontSize: '13px', color: '#64748b' }}>
              💡 <em>Try sample Roll Numbers: <code>ASP-1048</code>, <code>ASP-1012</code>, <code>ASP-1090</code>, or <code>ASP-1065</code></em>
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
                ⚠️ {error}
              </div>
            )}
          </div>

          {/* Results List */}
          {results.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {results.map((r) => (
                <div key={r.id} className="digitalSlip">
                  <div className="slipHeader">
                    <div className="slipLogoCol">
                      <Image 
                        src="/aspire-logo.png" 
                        alt="Aspire Logo" 
                        width={48} 
                        height={48} 
                        style={{ objectFit: 'contain' }}
                      />
                      <div>
                        <strong>ASPIRE INSTITUTE OF TECHNOLOGY</strong>
                        <span>OFFICIAL ACADEMIC EVALUATION & MARKSHEET</span>
                      </div>
                    </div>
                    <div className="slipIdBox">
                      <small>Student Roll No.</small>
                      <strong>{r.roll_no}</strong>
                    </div>
                  </div>

                  <div className="slipBody">
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '12px',
                      marginBottom: '20px',
                      paddingBottom: '16px',
                      borderBottom: '1px solid var(--line)'
                    }}>
                      <div>
                        <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy)', margin: '0 0 4px' }}>
                          {r.exam_name}
                        </h3>
                        <span style={{ fontSize: '14px', color: 'var(--blue)', fontWeight: 700 }}>
                          {r.course}
                        </span>
                      </div>
                      <div style={{
                        background: '#ecfdf5',
                        border: '1px solid #a7f3d0',
                        color: '#065f46',
                        padding: '8px 16px',
                        borderRadius: '12px',
                        textAlign: 'center'
                      }}>
                        <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>Grade</span>
                        <strong style={{ fontSize: '22px', fontWeight: 900 }}>{r.grade}</strong>
                      </div>
                    </div>

                    <div className="slipGrid" style={{ marginBottom: '20px' }}>
                      <div className="slipField">
                        <span className="slipLabel">Student Name</span>
                        <span className="slipVal">{r.student_name}</span>
                      </div>
                      <div className="slipField">
                        <span className="slipLabel">Father Name</span>
                        <span className="slipVal">{r.father_name}</span>
                      </div>
                      <div className="slipField">
                        <span className="slipLabel">Marks Obtained</span>
                        <span className="slipVal" style={{ fontWeight: 800, color: 'var(--navy)' }}>
                          {r.obtained_marks} / {r.total_marks}
                        </span>
                      </div>
                      <div className="slipField">
                        <span className="slipLabel">Percentage</span>
                        <span className="slipVal" style={{ fontWeight: 800, color: '#15803d' }}>
                          {r.percentage}%
                        </span>
                      </div>
                      <div className="slipField">
                        <span className="slipLabel">Exam Date</span>
                        <span className="slipVal">
                          {new Date(r.exam_date).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </div>

                    {r.remarks && (
                      <div style={{
                        background: '#f8fafc',
                        padding: '14px 18px',
                        borderRadius: '10px',
                        border: '1px solid var(--line)',
                        fontSize: '13.5px',
                        color: '#475569',
                        marginBottom: '20px'
                      }}>
                        <strong>📝 Instructor Evaluation Remarks:</strong> {r.remarks}
                      </div>
                    )}

                    <div className="slipActions">
                      <button onClick={() => window.print()} className="btn" style={{ padding: '8px 18px', fontSize: '13.5px' }}>
                        🖨️ Print Marksheet
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
    </>
  );
}
