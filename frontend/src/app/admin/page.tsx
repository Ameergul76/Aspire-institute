'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface AdmissionRow {
  id: number;
  application_no: string;
  student_name: string;
  father_name: string;
  gender: string;
  mobile: string;
  email?: string;
  program: string;
  course: string;
  timing?: string;
  education?: string;
  status: string;
  admin_notes?: string;
  created_at: string;
}

interface CertRow {
  id: number;
  certificate_id: string;
  roll_no: string;
  student_name: string;
  course: string;
  grade: string;
  issue_date: string;
}

interface ResultRow {
  id: number;
  roll_no: string;
  student_name: string;
  exam_name: string;
  course: string;
  obtained_marks: number;
  total_marks: number;
  grade: string;
}

interface AnnouncementRow {
  id: number;
  title: string;
  category: string;
  badge?: string;
  description: string;
  date: string;
}

interface ContactRow {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  message: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'admissions' | 'certificates' | 'results' | 'announcements' | 'messages'>('overview');

  // Stats
  const [stats, setStats] = useState({
    total_admissions: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    total_certificates: 0,
    total_messages: 0,
  });

  // Data states
  const [admissions, setAdmissions] = useState<AdmissionRow[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [certs, setCerts] = useState<CertRow[]>([]);
  const [results, setResults] = useState<ResultRow[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementRow[]>([]);
  const [messages, setMessages] = useState<ContactRow[]>([]);
  const [loading, setLoading] = useState(false);

  // Form states for creating new items
  const [newCert, setNewCert] = useState({
    certificate_id: '',
    roll_no: '',
    student_name: '',
    father_name: '',
    course: 'CIT — Certificate in IT (6 Months)',
    grade: 'A+ (Outstanding)',
    marks_percentage: 90,
    issue_date: new Date().toISOString().split('T')[0]
  });

  const [newResult, setNewResult] = useState({
    roll_no: '',
    student_name: '',
    father_name: '',
    exam_name: 'Monthly Practical Evaluation',
    course: 'CIT — Certificate in IT',
    total_marks: 100,
    obtained_marks: 85,
    percentage: 85,
    grade: 'A',
    remarks: 'Good progress in practical lab exercises',
    exam_date: new Date().toISOString().split('T')[0]
  });

  const [newNotice, setNewNotice] = useState({
    title: '',
    category: 'Admissions',
    badge: 'New',
    badge_color: '#10b981',
    description: '',
    action_link: '/admissions',
    action_text: 'Apply Online',
    date: 'October 2026'
  });

  // Check login session on mount
  useEffect(() => {
    const token = localStorage.getItem('aspire_admin_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch functions wrapped with useCallback
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/admin/stats');
      if (res.ok) {
        const json = await res.json();
        setStats(json);
      }
    } catch {
      // Handled silently
    }
  }, []);

  const fetchAdmissions = useCallback(async () => {
    setLoading(true);
    try {
      let url = 'http://127.0.0.1:8000/api/admin/admissions?';
      if (filterStatus !== 'all') url += `status=${filterStatus}&`;
      if (searchQuery.trim()) url += `search=${encodeURIComponent(searchQuery.trim())}&`;
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        setAdmissions(json.admissions || []);
      }
    } catch {
      // Handled silently
    } finally {
      setLoading(false);
    }
  }, [filterStatus, searchQuery]);

  const fetchCertificates = useCallback(async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/admin/certificates');
      if (res.ok) {
        const json = await res.json();
        setCerts(json.certificates || []);
      }
    } catch {
      // Handled silently
    }
  }, []);

  const fetchResults = useCallback(async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/admin/results');
      if (res.ok) {
        const json = await res.json();
        setResults(json.results || []);
      }
    } catch {
      // Handled silently
    }
  }, []);

  const fetchAnnouncements = useCallback(async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/announcements');
      if (res.ok) {
        const json = await res.json();
        setAnnouncements(json.announcements || []);
      }
    } catch {
      // Handled silently
    }
  }, []);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/admin/contact-messages');
      if (res.ok) {
        const json = await res.json();
        setMessages(json.messages || []);
      }
    } catch {
      // Handled silently
    }
  }, []);

  // Reload data when logged in or when active tab changes
  useEffect(() => {
    if (isLoggedIn) {
      fetchStats();
      if (activeTab === 'admissions' || activeTab === 'overview') fetchAdmissions();
      if (activeTab === 'certificates') fetchCertificates();
      if (activeTab === 'results') fetchResults();
      if (activeTab === 'announcements') fetchAnnouncements();
      if (activeTab === 'messages') fetchMessages();
    }
  }, [isLoggedIn, activeTab, fetchStats, fetchAdmissions, fetchCertificates, fetchResults, fetchAnnouncements, fetchMessages]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const json = await res.json();
      if (res.ok && json.success) {
        localStorage.setItem('aspire_admin_token', json.token);
        setIsLoggedIn(true);
      } else {
        setLoginError(json.detail || 'Invalid username or password.');
      }
    } catch {
      // Fallback for offline/local simulation
      if (username === 'admin' && (password === 'aspire@2026' || password === 'admin')) {
        localStorage.setItem('aspire_admin_token', 'local-admin-token');
        setIsLoggedIn(true);
      } else {
        setLoginError('Invalid credentials. Default: admin / aspire@2026');
      }
    }
  }

  function handleLogout() {
    localStorage.removeItem('aspire_admin_token');
    setIsLoggedIn(false);
  }

  async function updateStatus(id: number, newStatus: string) {
    try {
      await fetch(`http://127.0.0.1:8000/api/admin/admissions/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, admin_notes: `Status changed to ${newStatus} by admin.` })
      });
      fetchAdmissions();
      fetchStats();
    } catch {
      alert('Could not update status. Please verify backend connection.');
    }
  }

  async function deleteAdmission(id: number) {
    if (!confirm('Are you sure you want to delete this application record?')) return;
    try {
      await fetch(`http://127.0.0.1:8000/api/admin/admissions/${id}`, { method: 'DELETE' });
      fetchAdmissions();
      fetchStats();
    } catch {
      alert('Error deleting application.');
    }
  }

  async function handleCreateCert(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:8000/api/admin/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCert)
      });
      if (res.ok) {
        alert('Certificate issued successfully!');
        setNewCert({
          certificate_id: '',
          roll_no: '',
          student_name: '',
          father_name: '',
          course: 'CIT — Certificate in IT (6 Months)',
          grade: 'A+ (Outstanding)',
          marks_percentage: 90,
          issue_date: new Date().toISOString().split('T')[0]
        });
        fetchCertificates();
        fetchStats();
      } else {
        const j = await res.json();
        alert(j.detail || 'Could not issue certificate.');
      }
    } catch {
      alert('Error connecting to backend.');
    }
  }

  async function handleDeleteCert(id: number) {
    if (!confirm('Delete this certificate record?')) return;
    await fetch(`http://127.0.0.1:8000/api/admin/certificates/${id}`, { method: 'DELETE' });
    fetchCertificates();
    fetchStats();
  }

  async function handleCreateResult(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:8000/api/admin/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newResult)
      });
      if (res.ok) {
        alert('Result record added successfully!');
        setNewResult({
          roll_no: '',
          student_name: '',
          father_name: '',
          exam_name: 'Monthly Practical Evaluation',
          course: 'CIT — Certificate in IT',
          total_marks: 100,
          obtained_marks: 85,
          percentage: 85,
          grade: 'A',
          remarks: 'Good progress in practical lab exercises',
          exam_date: new Date().toISOString().split('T')[0]
        });
        fetchResults();
      }
    } catch {
      alert('Error saving result.');
    }
  }

  async function handleDeleteResult(id: number) {
    if (!confirm('Delete this result record?')) return;
    await fetch(`http://127.0.0.1:8000/api/admin/results/${id}`, { method: 'DELETE' });
    fetchResults();
  }

  async function handleCreateNotice(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:8000/api/admin/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNotice)
      });
      if (res.ok) {
        alert('Notice published to website!');
        setNewNotice({
          title: '',
          category: 'Admissions',
          badge: 'New',
          badge_color: '#10b981',
          description: '',
          action_link: '/admissions',
          action_text: 'Apply Online',
          date: 'October 2026'
        });
        fetchAnnouncements();
      }
    } catch {
      alert('Error creating announcement.');
    }
  }

  async function handleDeleteNotice(id: number) {
    if (!confirm('Delete this notice?')) return;
    await fetch(`http://127.0.0.1:8000/api/admin/announcements/${id}`, { method: 'DELETE' });
    fetchAnnouncements();
  }

  async function handleDeleteMessage(id: number) {
    if (!confirm('Delete this message?')) return;
    await fetch(`http://127.0.0.1:8000/api/admin/contact-messages/${id}`, { method: 'DELETE' });
    fetchMessages();
  }

  // If not logged in -> Show Login Card
  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: '#0a1128' }}>
        <div style={{ background: '#fff', borderRadius: '20px', padding: '40px', maxWidth: '420px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', textAlign: 'center' }}>
          <Image 
            src="/aspire-logo.png" 
            alt="Aspire Logo" 
            width={64} 
            height={64} 
            style={{ objectFit: 'contain', margin: '0 auto 16px' }}
          />
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--navy)', margin: '0 0 6px' }}>
            Aspire Admin Portal
          </h1>
          <p style={{ fontSize: '13.5px', color: '#64748b', margin: '0 0 24px' }}>
            Enter management credentials to access central dashboard.
          </p>

          {loginError && (
            <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' }}>
              ⚠️ {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--navy)', marginBottom: '5px' }}>
                Username
              </label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="searchBoxInput" 
                placeholder="admin" 
                required 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--navy)', marginBottom: '5px' }}>
                Password
              </label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="searchBoxInput" 
                placeholder="••••••••" 
                required 
              />
            </div>
            <button type="submit" className="btn" style={{ marginTop: '10px', width: '100%' }}>
              Sign In to Admin Portal →
            </button>
          </form>

          <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '20px' }}>
            Authorized campus administration only.<br />Default credentials: <code>admin</code> / <code>aspire@2026</code>
          </p>
        </div>
      </div>
    );
  }

  // Logged In Dashboard View
  return (
    <div className="adminWrap">
      {/* Sidebar */}
      <aside className="adminSidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 8px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Image src="/aspire-logo.png" alt="Logo" width={38} height={38} style={{ objectFit: 'contain' }} />
          <div>
            <strong style={{ display: 'block', fontSize: '14px', color: '#fff' }}>ASPIRE ADMIN</strong>
            <span style={{ fontSize: '11px', color: '#60a5fa', letterSpacing: '1px' }}>CONTROL PANEL</span>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '16px' }}>
          <button 
            className={`adminTabBtn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Dashboard Overview
          </button>
          <button 
            className={`adminTabBtn ${activeTab === 'admissions' ? 'active' : ''}`}
            onClick={() => setActiveTab('admissions')}
          >
            📝 Applications ({stats.total_admissions})
          </button>
          <button 
            className={`adminTabBtn ${activeTab === 'certificates' ? 'active' : ''}`}
            onClick={() => setActiveTab('certificates')}
          >
            📜 Certificates ({stats.total_certificates})
          </button>
          <button 
            className={`adminTabBtn ${activeTab === 'results' ? 'active' : ''}`}
            onClick={() => setActiveTab('results')}
          >
            🎓 Student Results
          </button>
          <button 
            className={`adminTabBtn ${activeTab === 'announcements' ? 'active' : ''}`}
            onClick={() => setActiveTab('announcements')}
          >
            📢 Announcements
          </button>
          <button 
            className={`adminTabBtn ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            💬 Inquiries ({stats.total_messages})
          </button>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button onClick={handleLogout} className="adminTabBtn" style={{ color: '#f87171' }}>
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="adminMain">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--navy)', margin: '0 0 4px' }}>
                  Administrative Dashboard Overview
                </h1>
                <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                  Real-time admissions metrics and operational status.
                </p>
              </div>
              <a 
                href="http://127.0.0.1:8000/api/admin/admissions/export-csv" 
                className="btn" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                📥 Export Admissions (Excel / CSV)
              </a>
            </div>

            {/* Stat Cards Grid */}
            <div className="adminStatsRow">
              <div className="adminStatBox">
                <small>Total Applications</small>
                <strong>{stats.total_admissions}</strong>
              </div>
              <div className="adminStatBox" style={{ borderLeft: '4px solid #f59e0b' }}>
                <small>Pending Verification</small>
                <strong style={{ color: '#d97706' }}>{stats.pending}</strong>
              </div>
              <div className="adminStatBox" style={{ borderLeft: '4px solid #10b981' }}>
                <small>Approved / Enrolled</small>
                <strong style={{ color: '#059669' }}>{stats.approved}</strong>
              </div>
              <div className="adminStatBox" style={{ borderLeft: '4px solid #ef4444' }}>
                <small>Rejected</small>
                <strong style={{ color: '#dc2626' }}>{stats.rejected}</strong>
              </div>
              <div className="adminStatBox" style={{ borderLeft: '4px solid var(--blue)' }}>
                <small>Verified Certificates</small>
                <strong style={{ color: 'var(--blue)' }}>{stats.total_certificates}</strong>
              </div>
            </div>

            {/* Recent Applications Quick Table */}
            <div className="portalCard" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                  Recent Applications
                </h3>
                <button onClick={() => setActiveTab('admissions')} className="moreLink">
                  View All ({stats.total_admissions}) →
                </button>
              </div>

              <table className="adminDataTable">
                <thead>
                  <tr>
                    <th>Ref #</th>
                    <th>Student Name</th>
                    <th>Course</th>
                    <th>Mobile</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admissions.slice(0, 5).map((a) => (
                    <tr key={a.id}>
                      <td style={{ fontWeight: 800, fontFamily: 'monospace' }}>{a.application_no}</td>
                      <td><strong>{a.student_name}</strong><br /><small style={{ color: '#64748b' }}>S/D of {a.father_name}</small></td>
                      <td style={{ color: 'var(--blue)', fontWeight: 600 }}>{a.course}</td>
                      <td>{a.mobile}</td>
                      <td>
                        <span className={`statusPill ${a.status === 'approved' || a.status === 'enrolled' ? 'statusApproved' : a.status === 'rejected' ? 'statusRejected' : 'statusPending'}`}>
                          {a.status}
                        </span>
                      </td>
                      <td>
                        <button onClick={() => updateStatus(a.id, 'enrolled')} style={{ padding: '4px 8px', fontSize: '11px', background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', borderRadius: '4px', cursor: 'pointer', marginRight: '6px' }}>
                          Approve
                        </button>
                        <button onClick={() => updateStatus(a.id, 'rejected')} style={{ padding: '4px 8px', fontSize: '11px', background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: '4px', cursor: 'pointer' }}>
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                  {admissions.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                        No admissions received yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: ADMISSIONS MANAGER */}
        {activeTab === 'admissions' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--navy)', margin: '0 0 4px' }}>
                  Admission Applications Manager
                </h1>
                <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                  Manage student enrollment, schedule interviews, and update application status.
                </p>
              </div>
              <a 
                href="http://127.0.0.1:8000/api/admin/admissions/export-csv" 
                className="btn" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                📥 Download Excel CSV
              </a>
            </div>

            {/* Filters Row */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Search by student name, ref #, or mobile..." 
                className="searchBoxInput" 
                style={{ maxWidth: '360px', padding: '10px 14px' }}
              />
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)} 
                className="searchBoxInput" 
                style={{ maxWidth: '200px', padding: '10px 14px' }}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="interview_scheduled">Interview Scheduled</option>
                <option value="enrolled">Enrolled / Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <button onClick={fetchAdmissions} className="btn" style={{ padding: '10px 18px', fontSize: '13px' }}>
                Search / Refresh
              </button>
            </div>

            {/* Applications Table */}
            <table className="adminDataTable">
              <thead>
                <tr>
                  <th>Ref #</th>
                  <th>Student Info</th>
                  <th>Program & Course</th>
                  <th>Contact</th>
                  <th>Shift</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admissions.map((a) => (
                  <tr key={a.id}>
                    <td style={{ fontWeight: 800, fontFamily: 'monospace' }}>{a.application_no}</td>
                    <td>
                      <strong>{a.student_name}</strong>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>S/D of {a.father_name} ({a.gender})</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>Edu: {a.education || 'N/A'}</div>
                    </td>
                    <td>
                      <strong style={{ color: 'var(--blue)', fontSize: '13.5px' }}>{a.course}</strong>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{a.program}</div>
                    </td>
                    <td>
                      <div>📱 {a.mobile}</div>
                      {a.email && <div style={{ fontSize: '11px', color: '#64748b' }}>✉️ {a.email}</div>}
                    </td>
                    <td style={{ fontSize: '12px' }}>{a.timing || '5-6 PM'}</td>
                    <td>
                      <span className={`statusPill ${a.status === 'enrolled' || a.status === 'approved' ? 'statusApproved' : a.status === 'rejected' ? 'statusRejected' : a.status === 'interview_scheduled' ? 'statusInterview' : 'statusPending'}`}>
                        {a.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        <button onClick={() => updateStatus(a.id, 'enrolled')} title="Mark Enrolled / Approved" style={{ padding: '4px 6px', fontSize: '11px', background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', borderRadius: '4px', cursor: 'pointer' }}>
                          ✓ Approve
                        </button>
                        <button onClick={() => updateStatus(a.id, 'interview_scheduled')} title="Schedule Interview" style={{ padding: '4px 6px', fontSize: '11px', background: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe', borderRadius: '4px', cursor: 'pointer' }}>
                          📅 Interview
                        </button>
                        <button onClick={() => updateStatus(a.id, 'rejected')} title="Reject" style={{ padding: '4px 6px', fontSize: '11px', background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: '4px', cursor: 'pointer' }}>
                          ✕ Reject
                        </button>
                        <button onClick={() => deleteAdmission(a.id)} title="Delete record" style={{ padding: '4px 6px', fontSize: '11px', background: '#f1f5f9', color: '#64748b', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }}>
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {admissions.length === 0 && !loading && (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                      No applications found matching the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: CERTIFICATES MANAGER */}
        {activeTab === 'certificates' && (
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--navy)', margin: '0 0 4px' }}>
              Certificate Management & Issuance
            </h1>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 24px' }}>
              Issue verifiable digital certificates for passed-out students.
            </p>

            {/* Issue Form */}
            <div className="portalCard" style={{ padding: '24px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy)', margin: '0 0 14px' }}>
                + Issue New Official Certificate
              </h3>
              <form onSubmit={handleCreateCert} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', display: 'block', marginBottom: '4px' }}>Certificate ID *</label>
                  <input type="text" value={newCert.certificate_id} onChange={(e) => setNewCert({ ...newCert, certificate_id: e.target.value })} placeholder="e.g. ASP-2026-CIT-0901" className="searchBoxInput" required />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', display: 'block', marginBottom: '4px' }}>Student Roll No *</label>
                  <input type="text" value={newCert.roll_no} onChange={(e) => setNewCert({ ...newCert, roll_no: e.target.value })} placeholder="e.g. ASP-1095" className="searchBoxInput" required />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', display: 'block', marginBottom: '4px' }}>Student Name *</label>
                  <input type="text" value={newCert.student_name} onChange={(e) => setNewCert({ ...newCert, student_name: e.target.value })} placeholder="Student Full Name" className="searchBoxInput" required />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', display: 'block', marginBottom: '4px' }}>Father Name *</label>
                  <input type="text" value={newCert.father_name} onChange={(e) => setNewCert({ ...newCert, father_name: e.target.value })} placeholder="Father Name" className="searchBoxInput" required />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', display: 'block', marginBottom: '4px' }}>Course *</label>
                  <select value={newCert.course} onChange={(e) => setNewCert({ ...newCert, course: e.target.value })} className="searchBoxInput">
                    <option value="CIT — Certificate in IT (6 Months)">CIT (6 Months)</option>
                    <option value="DIT — Diploma in IT (1 Year)">DIT (1 Year)</option>
                    <option value="Web Development (4 Months)">Web Development (4 Months)</option>
                    <option value="Data Science & AI (1 Year)">Data Science & AI (1 Year)</option>
                    <option value="Python Programming (3 Months)">Python Programming (3 Months)</option>
                    <option value="Graphic Designing Professional (3 Months)">Graphic Designing (3 Months)</option>
                    <option value="Spoken English & Communication Skills">Spoken English (3 Months)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', display: 'block', marginBottom: '4px' }}>Grade *</label>
                  <select value={newCert.grade} onChange={(e) => setNewCert({ ...newCert, grade: e.target.value })} className="searchBoxInput">
                    <option value="A+ (Outstanding)">A+ (Outstanding)</option>
                    <option value="A (Excellent)">A (Excellent)</option>
                    <option value="B (Good)">B (Good)</option>
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button type="submit" className="btn" style={{ width: '100%' }}>
                    Save & Issue Certificate
                  </button>
                </div>
              </form>
            </div>

            {/* Certificates Table */}
            <table className="adminDataTable">
              <thead>
                <tr>
                  <th>Cert ID</th>
                  <th>Roll No</th>
                  <th>Student Name</th>
                  <th>Course</th>
                  <th>Grade</th>
                  <th>Issue Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {certs.map((c) => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 800, fontFamily: 'monospace', color: 'var(--blue)' }}>{c.certificate_id}</td>
                    <td style={{ fontFamily: 'monospace' }}>{c.roll_no}</td>
                    <td><strong>{c.student_name}</strong></td>
                    <td>{c.course}</td>
                    <td><span className="statusPill statusApproved">{c.grade}</span></td>
                    <td>{c.issue_date}</td>
                    <td>
                      <button onClick={() => handleDeleteCert(c.id)} style={{ padding: '4px 8px', fontSize: '11px', background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: '4px', cursor: 'pointer' }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: RESULTS MANAGER */}
        {activeTab === 'results' && (
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--navy)', margin: '0 0 4px' }}>
              Student Examination & Marksheet Manager
            </h1>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 24px' }}>
              Upload test and examination marks for student lookup portal.
            </p>

            <div className="portalCard" style={{ padding: '24px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy)', margin: '0 0 14px' }}>
                + Add Exam Marksheet Entry
              </h3>
              <form onSubmit={handleCreateResult} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', display: 'block', marginBottom: '4px' }}>Roll Number *</label>
                  <input type="text" value={newResult.roll_no} onChange={(e) => setNewResult({ ...newResult, roll_no: e.target.value })} placeholder="e.g. ASP-1048" className="searchBoxInput" required />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', display: 'block', marginBottom: '4px' }}>Student Name *</label>
                  <input type="text" value={newResult.student_name} onChange={(e) => setNewResult({ ...newResult, student_name: e.target.value })} placeholder="Student Name" className="searchBoxInput" required />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', display: 'block', marginBottom: '4px' }}>Exam Title *</label>
                  <input type="text" value={newResult.exam_name} onChange={(e) => setNewResult({ ...newResult, exam_name: e.target.value })} placeholder="e.g. Mid-Term 2026" className="searchBoxInput" required />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', display: 'block', marginBottom: '4px' }}>Course</label>
                  <input type="text" value={newResult.course} onChange={(e) => setNewResult({ ...newResult, course: e.target.value })} placeholder="Course Name" className="searchBoxInput" required />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', display: 'block', marginBottom: '4px' }}>Obtained / Total Marks</label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input type="number" value={newResult.obtained_marks} onChange={(e) => setNewResult({ ...newResult, obtained_marks: Number(e.target.value), percentage: Math.round((Number(e.target.value) / newResult.total_marks) * 100) })} className="searchBoxInput" placeholder="Obtained" required />
                    <input type="number" value={newResult.total_marks} onChange={(e) => setNewResult({ ...newResult, total_marks: Number(e.target.value) })} className="searchBoxInput" placeholder="Total" required />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', display: 'block', marginBottom: '4px' }}>Grade & Remarks</label>
                  <input type="text" value={newResult.remarks} onChange={(e) => setNewResult({ ...newResult, remarks: e.target.value })} placeholder="Remarks" className="searchBoxInput" />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button type="submit" className="btn" style={{ width: '100%' }}>
                    Save Result Record
                  </button>
                </div>
              </form>
            </div>

            <table className="adminDataTable">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Student Name</th>
                  <th>Exam Title</th>
                  <th>Course</th>
                  <th>Marks</th>
                  <th>Grade</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 800 }}>{r.roll_no}</td>
                    <td><strong>{r.student_name}</strong></td>
                    <td>{r.exam_name}</td>
                    <td>{r.course}</td>
                    <td><strong>{r.obtained_marks}</strong> / {r.total_marks}</td>
                    <td><span className="statusPill statusApproved">{r.grade}</span></td>
                    <td>
                      <button onClick={() => handleDeleteResult(r.id)} style={{ padding: '4px 8px', fontSize: '11px', background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: '4px', cursor: 'pointer' }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 5: ANNOUNCEMENTS MANAGER */}
        {activeTab === 'announcements' && (
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--navy)', margin: '0 0 4px' }}>
              Dynamic Announcements & Notice Board
            </h1>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 24px' }}>
              Notices added here instantly appear on the public website and homepage notice ticker.
            </p>

            <div className="portalCard" style={{ padding: '24px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy)', margin: '0 0 14px' }}>
                + Post New Notice
              </h3>
              <form onSubmit={handleCreateNotice} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', display: 'block', marginBottom: '4px' }}>Notice Title *</label>
                    <input type="text" value={newNotice.title} onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })} placeholder="e.g. Eid-ul-Fitr Holidays Announcement" className="searchBoxInput" required />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', display: 'block', marginBottom: '4px' }}>Category *</label>
                    <input type="text" value={newNotice.category} onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })} placeholder="e.g. Holiday, Admissions, Schedule" className="searchBoxInput" required />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', display: 'block', marginBottom: '4px' }}>Badge (Optional)</label>
                    <input type="text" value={newNotice.badge} onChange={(e) => setNewNotice({ ...newNotice, badge: e.target.value })} placeholder="e.g. New, Urgent" className="searchBoxInput" />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', display: 'block', marginBottom: '4px' }}>Description *</label>
                  <textarea rows={3} value={newNotice.description} onChange={(e) => setNewNotice({ ...newNotice, description: e.target.value })} placeholder="Notice details..." className="searchBoxInput" required />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="btn">
                    📢 Publish Notice Live
                  </button>
                </div>
              </form>
            </div>

            <table className="adminDataTable">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((an) => (
                  <tr key={an.id}>
                    <td><strong>{an.title}</strong></td>
                    <td><span className="statusPill statusInterview">{an.category}</span></td>
                    <td style={{ fontSize: '13px', color: '#475569', maxWidth: '300px' }}>{an.description}</td>
                    <td>{an.date}</td>
                    <td>
                      <button onClick={() => handleDeleteNotice(an.id)} style={{ padding: '4px 8px', fontSize: '11px', background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: '4px', cursor: 'pointer' }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 6: MESSAGES INBOX */}
        {activeTab === 'messages' && (
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--navy)', margin: '0 0 4px' }}>
              Website Inquiries & Contact Messages
            </h1>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 24px' }}>
              Messages submitted by visitors through the Contact page form.
            </p>

            <table className="adminDataTable">
              <thead>
                <tr>
                  <th>Sender Name</th>
                  <th>Contact</th>
                  <th>Message</th>
                  <th>Received Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((m) => (
                  <tr key={m.id}>
                    <td><strong>{m.name}</strong></td>
                    <td>
                      {m.email && <div>✉️ {m.email}</div>}
                      {m.phone && <div>📱 {m.phone}</div>}
                    </td>
                    <td style={{ fontSize: '13.5px', color: '#334155', maxWidth: '320px' }}>{m.message}</td>
                    <td style={{ fontSize: '12px', color: '#64748b' }}>
                      {new Date(m.created_at).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td>
                      <button onClick={() => handleDeleteMessage(m.id)} style={{ padding: '4px 8px', fontSize: '11px', background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: '4px', cursor: 'pointer' }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {messages.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                      No contact messages received yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </main>
    </div>
  );
}
