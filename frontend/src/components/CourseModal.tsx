'use client';
import { Course } from '@/data/courses';
import Link from 'next/link';
import { Clock, Target, Check, Award, Printer, X } from 'lucide-react';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
}

export default function CourseModal({ course, onClose }: CourseModalProps) {
  if (!course) return null;

  return (
    <div className="modalOverlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modalHeader">
          <div className="modalHeaderBadges">
            <span className="badge badgeCategory">{course.category}</span>
            {course.badge && <span className="badge badgeHighlight">{course.badge}</span>}
            <span className="badge badgeDuration">
              <Clock size={13} style={{ display: 'inline', verticalAlign: '-1px', marginRight: 4 }} />
              {course.duration}
            </span>
          </div>
          <button className="modalCloseBtn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modalBody">
          <h2 className="modalTitle">{course.title}</h2>
          
          <div className="modalObjectiveBox">
            <strong style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <Target size={16} color="#2563eb" /> Course Objective:
            </strong>
            <p>{course.objective}</p>
          </div>

          <div className="modalHighlights">
            {course.highlights.map((h, i) => (
              <div key={i} className="highlightPill">
                <Check size={14} className="checkIcon" />
                <span>{h}</span>
              </div>
            ))}
          </div>

          <div className="outlineSection">
            <div className="outlineHead">
              <h3>Complete Course Outline</h3>
              <span className="modulesCount">{course.modules.length} Detailed Modules</span>
            </div>

            <div className="modulesGrid">
              {course.modules.map((m, idx) => (
                <div key={idx} className="moduleCard">
                  <div className="moduleCardHeader">
                    <span className="moduleNumber">{idx + 1}</span>
                    <h4>{m.title}</h4>
                  </div>
                  <ul className="moduleTopicList">
                    {m.topics.map((t, tIdx) => (
                      <li key={tIdx}>
                        <span className="bulletDot">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {course.finalProject && (
            <div className="projectBox">
              <h4 style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Award size={18} color="#f59e0b" /> Final Project & Certificate
              </h4>
              <p>{course.finalProject}</p>
              <div className="certNotice">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Award size={15} color="#2563eb" /> {course.certification}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modalFooter" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <button className="btn outline" onClick={() => window.print()} title="Print or save as PDF">
            <Printer size={15} style={{ marginRight: 6 }} /> Download / Print Syllabus
          </button>
          <button className="btn outline" onClick={onClose}>Close</button>
          <Link 
            className="btn" 
            href={`/admissions?course=${encodeURIComponent(course.title)}&program=${encodeURIComponent(course.category)}`}
            onClick={onClose}
          >
            Apply for this Course →
          </Link>
        </div>
      </div>
    </div>
  );
}
