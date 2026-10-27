from fastapi import FastAPI, HTTPException, Query, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from pathlib import Path
import sqlite3, uuid, csv, io

DB = Path(__file__).resolve().parent.parent / 'aspire.db'
app = FastAPI(title='Aspire Institute API', version='2.0.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:8000', '*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

def conn():
    c = sqlite3.connect(DB)
    c.row_factory = sqlite3.Row
    return c

# Initialize Tables
with conn() as c:
    c.execute('''
    CREATE TABLE IF NOT EXISTS admissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        application_no TEXT UNIQUE NOT NULL,
        student_name TEXT NOT NULL,
        father_name TEXT NOT NULL,
        gender TEXT DEFAULT 'Male',
        cnic TEXT,
        dob TEXT,
        mobile TEXT NOT NULL,
        parent_mobile TEXT,
        email TEXT,
        program TEXT NOT NULL,
        course TEXT NOT NULL,
        timing TEXT,
        education TEXT,
        area TEXT,
        message TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        admin_notes TEXT,
        created_at TEXT NOT NULL
    )''')

    c.execute('''
    CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        course TEXT,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'unread',
        created_at TEXT NOT NULL
    )''')

    c.execute('''
    CREATE TABLE IF NOT EXISTS certificates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        certificate_id TEXT UNIQUE NOT NULL,
        roll_no TEXT NOT NULL,
        student_name TEXT NOT NULL,
        father_name TEXT NOT NULL,
        course TEXT NOT NULL,
        grade TEXT NOT NULL,
        marks_percentage REAL DEFAULT 85.0,
        issue_date TEXT NOT NULL,
        status TEXT DEFAULT 'verified'
    )''')

    c.execute('''
    CREATE TABLE IF NOT EXISTS results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        roll_no TEXT NOT NULL,
        student_name TEXT NOT NULL,
        father_name TEXT NOT NULL,
        exam_name TEXT NOT NULL,
        course TEXT NOT NULL,
        total_marks INTEGER NOT NULL,
        obtained_marks INTEGER NOT NULL,
        percentage REAL NOT NULL,
        grade TEXT NOT NULL,
        remarks TEXT,
        exam_date TEXT NOT NULL
    )''')

    c.execute('''
    CREATE TABLE IF NOT EXISTS announcements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        badge TEXT,
        badge_color TEXT DEFAULT '#2563eb',
        description TEXT NOT NULL,
        action_link TEXT,
        action_text TEXT,
        date TEXT NOT NULL,
        is_active INTEGER DEFAULT 1,
        created_at TEXT NOT NULL
    )''')

    # Seed initial certificates if empty
    cnt = c.execute('SELECT COUNT(*) FROM certificates').fetchone()[0]
    if cnt == 0:
        c.execute('''
        INSERT INTO certificates (certificate_id, roll_no, student_name, father_name, course, grade, marks_percentage, issue_date, status)
        VALUES 
        ('ASP-2025-CIT-0841', 'ASP-1048', 'Syed Hamza Ali', 'Syed Waqar Ali', 'CIT — Certificate in IT (6 Months)', 'A+ (Outstanding)', 92.5, '2025-11-20', 'verified'),
        ('ASP-2025-DIT-0219', 'ASP-1012', 'Muhammad Bilal', 'Muhammad Rashid', 'DIT — Diploma in IT (1 Year)', 'A (Excellent)', 88.0, '2025-12-15', 'verified'),
        ('ASP-2026-WD-0304', 'ASP-1090', 'Ayesha Siddiqui', 'Farhan Siddiqui', 'Web Development (4 Months)', 'A+ (Outstanding)', 95.0, '2026-02-10', 'verified'),
        ('ASP-2026-DS-0105', 'ASP-1065', 'Zubair Ahmed', 'Naveed Ahmed', 'Data Science & AI (1 Year)', 'A+ (Outstanding)', 94.0, '2026-03-01', 'verified')
        ''')

    # Seed initial results if empty
    rcnt = c.execute('SELECT COUNT(*) FROM results').fetchone()[0]
    if rcnt == 0:
        c.execute('''
        INSERT INTO results (roll_no, student_name, father_name, exam_name, course, total_marks, obtained_marks, percentage, grade, remarks, exam_date)
        VALUES
        ('ASP-1048', 'Syed Hamza Ali', 'Syed Waqar Ali', 'Mid-Term Evaluation 2026', 'CIT — Certificate in IT', 100, 94, 94.0, 'A+', 'Outstanding practical performance in MS Excel & Canva', '2026-03-15'),
        ('ASP-1012', 'Muhammad Bilal', 'Muhammad Rashid', 'Semester 1 Final Exam', 'DIT — Diploma in IT', 200, 178, 89.0, 'A', 'Strong database modeling & HTML/CSS layout skills', '2026-03-20'),
        ('ASP-1090', 'Ayesha Siddiqui', 'Farhan Siddiqui', 'Final Capstone Project Evaluation', 'Web Development (4 Months)', 100, 95, 95.0, 'A+', 'Exceptional responsive portfolio & JavaScript logic', '2026-02-10'),
        ('ASP-1065', 'Zubair Ahmed', 'Naveed Ahmed', 'Term 1 Machine Learning Exam', 'Data Science & AI', 100, 91, 91.0, 'A+', 'Demonstrated high competence in Pandas, NumPy & Scikit-Learn', '2026-03-05')
        ''')

    # Seed initial announcements if empty
    acnt = c.execute('SELECT COUNT(*) FROM announcements').fetchone()[0]
    if acnt == 0:
        c.execute('''
        INSERT INTO announcements (title, category, badge, badge_color, description, action_link, action_text, date, is_active, created_at)
        VALUES
        ('Admissions Open – Session 2026', 'Admissions', 'New', '#10b981', 'New admissions are now officially open for CIT, DIT, Web Development, Data Science, Python, and Academic Coaching. Limited seats per lab batch to guarantee individual PC workstation access.', '/admissions', 'Apply Online', 'October 2026', 1, datetime('now')),
        ('Summer Batch Timings & Lab Shifts Announced', 'Schedule', 'Updated', '#2563eb', 'Computer Lab shifts run from 4:00 PM to 8:00 PM daily. Evening flexible shifts are available for school, college, and university students.', '/courses', 'View Batch Timings', 'October 2026', 1, datetime('now')),
        ('Class 9 & 10 Board Exam Crash Program', 'Academic', 'Coaching', '#8b5cf6', 'Special intensive preparation program for Matric Class 9 and 10 covering Mathematics, Physics, Chemistry, Biology, and past 10-year Sindh board solutions.', '/admissions?program=Coaching%20Classes', 'Join Board Batch', 'October 2026', 1, datetime('now')),
        ('New Data Science & Python Programming Tracks', 'New Course', 'Featured', '#f59e0b', 'Aspire Institute is proud to introduce our 1-Year Data Science & AI Diploma and 3-Month Python Programming Mastery tracks with hands-on projects.', '/courses', 'Explore Syllabi', 'October 2026', 1, datetime('now'))
        ''')


# -------------------------------------------------------------
# Pydantic Schemas
# -------------------------------------------------------------
class AdmissionIn(BaseModel):
    student_name: str
    father_name: str
    gender: str = 'Male'
    cnic: str | None = None
    dob: str | None = None
    mobile: str
    parent_mobile: str | None = None
    email: str | None = None
    program: str
    course: str
    timing: str | None = None
    education: str | None = None
    area: str | None = None
    message: str | None = None

class StatusUpdate(BaseModel):
    status: str
    admin_notes: str | None = None

class ContactIn(BaseModel):
    name: str
    email: str | None = None
    phone: str | None = None
    course: str | None = None
    message: str

class CertificateIn(BaseModel):
    certificate_id: str
    roll_no: str
    student_name: str
    father_name: str
    course: str
    grade: str
    marks_percentage: float = 85.0
    issue_date: str
    status: str = 'verified'

class ResultIn(BaseModel):
    roll_no: str
    student_name: str
    father_name: str
    exam_name: str
    course: str
    total_marks: int
    obtained_marks: int
    percentage: float
    grade: str
    remarks: str | None = None
    exam_date: str

class AnnouncementIn(BaseModel):
    title: str
    category: str
    badge: str | None = None
    badge_color: str | None = '#2563eb'
    description: str
    action_link: str | None = '/courses'
    action_text: str | None = 'Learn More'
    date: str

class AdminLoginIn(BaseModel):
    username: str
    password: str


# -------------------------------------------------------------
# Public API Endpoints
# -------------------------------------------------------------
@app.get('/api/health')
def health():
    return {'status': 'ok', 'app': 'Aspire Institute API', 'timestamp': datetime.utcnow().isoformat()}

# 1. Admissions
@app.post('/api/admissions')
def create_admission(x: AdmissionIn):
    no = 'ASP-' + uuid.uuid4().hex[:8].upper()
    now = datetime.utcnow().isoformat()
    with conn() as c:
        c.execute('''
        INSERT INTO admissions (
            application_no, student_name, father_name, gender, cnic, dob,
            mobile, parent_mobile, email, program, course, timing,
            education, area, message, status, created_at
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, 'pending', ?)
        ''', (
            no, x.student_name, x.father_name, x.gender, x.cnic, x.dob,
            x.mobile, x.parent_mobile, x.email, x.program, x.course, x.timing,
            x.education, x.area, x.message, now
        ))
    return {'success': True, 'application_no': no, 'created_at': now}

@app.get('/api/admissions/status/{application_no}')
def check_admission_status(application_no: str):
    q = application_no.strip().upper()
    with conn() as c:
        row = c.execute('SELECT * FROM admissions WHERE UPPER(application_no)=?', (q,)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail='Application Number not found. Please verify your reference number.')
    return {'success': True, 'data': dict(row)}

# 2. Certificate Verification
@app.get('/api/certificates/verify/{query}')
def verify_certificate(query: str):
    q = query.strip().upper()
    with conn() as c:
        row = c.execute('''
        SELECT * FROM certificates 
        WHERE UPPER(certificate_id)=? OR UPPER(roll_no)=?
        ''', (q, q)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail='No official certificate found matching the provided ID or Roll No.')
    return {'success': True, 'certificate': dict(row)}

# 3. Student Results Lookup
@app.get('/api/results/{roll_no}')
def get_student_results(roll_no: str):
    q = roll_no.strip().upper()
    with conn() as c:
        rows = c.execute('''
        SELECT * FROM results WHERE UPPER(roll_no)=? ORDER BY exam_date DESC
        ''', (q,)).fetchall()
    if not rows:
        raise HTTPException(status_code=404, detail='No examination record found for this Roll Number.')
    return {'success': True, 'roll_no': q, 'results': [dict(r) for r in rows]}

# 4. Public Announcements
@app.get('/api/announcements')
def get_announcements():
    with conn() as c:
        rows = c.execute('SELECT * FROM announcements WHERE is_active=1 ORDER BY id DESC').fetchall()
    return {'success': True, 'announcements': [dict(r) for r in rows]}

# 5. Contact Inquiries
@app.post('/api/contact')
def contact(x: ContactIn):
    with conn() as c:
        c.execute('''
        INSERT INTO contact_messages (name, email, phone, course, message, created_at)
        VALUES (?,?,?,?,?,?)
        ''', (x.name, x.email, x.phone, x.course, x.message, datetime.utcnow().isoformat()))
    return {'success': True}


# -------------------------------------------------------------
# Admin API Endpoints
# -------------------------------------------------------------
@app.post('/api/admin/login')
def admin_login(x: AdminLoginIn):
    # Default admin credentials for management
    if x.username.strip().lower() == 'admin' and x.password == 'aspire@2026':
        return {
            'success': True,
            'token': 'aspire-jwt-admin-token-' + uuid.uuid4().hex[:12],
            'user': {'username': 'admin', 'role': 'Administrator', 'institute': 'Aspire Institute of Technology'}
        }
    raise HTTPException(status_code=401, detail='Invalid Admin Username or Password')

@app.get('/api/admin/stats')
def admin_stats():
    with conn() as c:
        total_admissions = c.execute('SELECT COUNT(*) FROM admissions').fetchone()[0]
        pending = c.execute("SELECT COUNT(*) FROM admissions WHERE status='pending'").fetchone()[0]
        approved = c.execute("SELECT COUNT(*) FROM admissions WHERE status='approved' OR status='enrolled'").fetchone()[0]
        rejected = c.execute("SELECT COUNT(*) FROM admissions WHERE status='rejected'").fetchone()[0]
        total_certs = c.execute('SELECT COUNT(*) FROM certificates').fetchone()[0]
        total_messages = c.execute('SELECT COUNT(*) FROM contact_messages').fetchone()[0]
        recent_admissions = [dict(r) for r in c.execute('SELECT * FROM admissions ORDER BY id DESC LIMIT 5').fetchall()]
    return {
        'total_admissions': total_admissions,
        'pending': pending,
        'approved': approved,
        'rejected': rejected,
        'total_certificates': total_certs,
        'total_messages': total_messages,
        'recent_admissions': recent_admissions
    }

@app.get('/api/admin/admissions')
def admin_get_admissions(status: str | None = None, search: str | None = None):
    sql = 'SELECT * FROM admissions WHERE 1=1'
    params = []
    if status and status != 'all':
        sql += ' AND status=?'
        params.append(status)
    if search:
        s = f'%{search.strip()}%'
        sql += ' AND (application_no LIKE ? OR student_name LIKE ? OR mobile LIKE ? OR course LIKE ?)'
        params.extend([s, s, s, s])
    sql += ' ORDER BY id DESC'
    with conn() as c:
        rows = c.execute(sql, params).fetchall()
    return {'success': True, 'count': len(rows), 'admissions': [dict(r) for r in rows]}

@app.patch('/api/admin/admissions/{admission_id}/status')
def admin_update_admission_status(admission_id: int, payload: StatusUpdate):
    with conn() as c:
        res = c.execute(
            'UPDATE admissions SET status=?, admin_notes=? WHERE id=?',
            (payload.status, payload.admin_notes, admission_id)
        )
        if res.rowcount == 0:
            raise HTTPException(status_code=404, detail='Application not found')
    return {'success': True, 'id': admission_id, 'new_status': payload.status}

@app.delete('/api/admin/admissions/{admission_id}')
def admin_delete_admission(admission_id: int):
    with conn() as c:
        res = c.execute('DELETE FROM admissions WHERE id=?', (admission_id,))
        if res.rowcount == 0:
            raise HTTPException(status_code=404, detail='Application not found')
    return {'success': True, 'deleted_id': admission_id}

@app.get('/api/admin/admissions/export-csv')
def admin_export_csv():
    with conn() as c:
        rows = c.execute('SELECT * FROM admissions ORDER BY id DESC').fetchall()
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow([
        'ID', 'Application No', 'Student Name', 'Father Name', 'Gender',
        'Mobile', 'Parent Mobile', 'Email', 'Program', 'Course',
        'Timing', 'Education', 'Area', 'Status', 'Applied Date'
    ])
    for r in rows:
        writer.writerow([
            r['id'], r['application_no'], r['student_name'], r['father_name'], r['gender'],
            r['mobile'], r['parent_mobile'], r['email'], r['program'], r['course'],
            r['timing'], r['education'], r['area'], r['status'], r['created_at']
        ])
    return Response(
        content=output.getvalue(),
        media_type='text/csv',
        headers={'Content-Disposition': 'attachment; filename=aspire_admissions_export.csv'}
    )

# Admin Certificates Management
@app.get('/api/admin/certificates')
def admin_get_certificates():
    with conn() as c:
        rows = c.execute('SELECT * FROM certificates ORDER BY id DESC').fetchall()
    return {'success': True, 'certificates': [dict(r) for r in rows]}

@app.post('/api/admin/certificates')
def admin_add_certificate(x: CertificateIn):
    try:
        with conn() as c:
            c.execute('''
            INSERT INTO certificates (certificate_id, roll_no, student_name, father_name, course, grade, marks_percentage, issue_date, status)
            VALUES (?,?,?,?,?,?,?,?,?)
            ''', (x.certificate_id.strip().upper(), x.roll_no.strip().upper(), x.student_name, x.father_name, x.course, x.grade, x.marks_percentage, x.issue_date, x.status))
        return {'success': True, 'certificate_id': x.certificate_id}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail='Certificate ID already exists in the system.')

@app.delete('/api/admin/certificates/{cert_id}')
def admin_delete_certificate(cert_id: int):
    with conn() as c:
        c.execute('DELETE FROM certificates WHERE id=?', (cert_id,))
    return {'success': True}

# Admin Results Management
@app.get('/api/admin/results')
def admin_get_results():
    with conn() as c:
        rows = c.execute('SELECT * FROM results ORDER BY id DESC').fetchall()
    return {'success': True, 'results': [dict(r) for r in rows]}

@app.post('/api/admin/results')
def admin_add_result(x: ResultIn):
    with conn() as c:
        c.execute('''
        INSERT INTO results (roll_no, student_name, father_name, exam_name, course, total_marks, obtained_marks, percentage, grade, remarks, exam_date)
        VALUES (?,?,?,?,?,?,?,?,?,?,?)
        ''', (x.roll_no.strip().upper(), x.student_name, x.father_name, x.exam_name, x.course, x.total_marks, x.obtained_marks, x.percentage, x.grade, x.remarks, x.exam_date))
    return {'success': True}

@app.delete('/api/admin/results/{res_id}')
def admin_delete_result(res_id: int):
    with conn() as c:
        c.execute('DELETE FROM results WHERE id=?', (res_id,))
    return {'success': True}

# Admin Announcements Management
@app.post('/api/admin/announcements')
def admin_add_announcement(x: AnnouncementIn):
    with conn() as c:
        c.execute('''
        INSERT INTO announcements (title, category, badge, badge_color, description, action_link, action_text, date, is_active, created_at)
        VALUES (?,?,?,?,?,?,?,?,1,datetime('now'))
        ''', (x.title, x.category, x.badge, x.badge_color or '#2563eb', x.description, x.action_link or '/courses', x.action_text or 'View Details', x.date))
    return {'success': True}

@app.delete('/api/admin/announcements/{ann_id}')
def admin_delete_announcement(ann_id: int):
    with conn() as c:
        c.execute('DELETE FROM announcements WHERE id=?', (ann_id,))
    return {'success': True}

# Admin Contact Inquiries
@app.get('/api/admin/contact-messages')
def admin_get_messages():
    with conn() as c:
        rows = c.execute('SELECT * FROM contact_messages ORDER BY id DESC').fetchall()
    return {'success': True, 'messages': [dict(r) for r in rows]}

@app.delete('/api/admin/contact-messages/{msg_id}')
def admin_delete_message(msg_id: int):
    with conn() as c:
        c.execute('DELETE FROM contact_messages WHERE id=?', (msg_id,))
    return {'success': True}
