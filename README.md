# Aspire Institute of Technology — Next.js + Python

This starter implements the approved visual direction as a real responsive website with:
- Next.js App Router + TypeScript frontend
- Python FastAPI backend
- SQLite development database
- Home, About, Courses, Admissions, Gallery, Announcements, Contact and Admin pages
- Online admission and contact APIs
- Responsive desktop/mobile layout

## Run backend
```bash
cd backend
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Run frontend
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:3000

If backend is not on localhost:8000, create `frontend/.env.local`:
`NEXT_PUBLIC_API_URL=http://YOUR-BACKEND:8000`

## Production next steps
Replace SQLite with Supabase PostgreSQL, add Supabase Auth + RLS for admin, move editable courses/fees/announcements/gallery into database tables, add secure application tracking, image storage, server-side validation, rate limiting and deployment secrets.

The current sample photos are temporary Unsplash images and the text logo is a placeholder until the original Aspire logo is supplied.
