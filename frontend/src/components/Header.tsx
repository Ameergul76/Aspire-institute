'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { 
  FileSearch, 
  ShieldCheck, 
  GraduationCap, 
  Compass, 
  Lock, 
  Menu, 
  X 
} from 'lucide-react';

export default function Header() {
  const [lang, setLang] = useState<'en' | 'ur'>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Banner */}
      <div className="topbar">
        <div className="container topbarIn">
          <div className="topbarLeft">
            <span style={{ fontWeight: 700, letterSpacing: '0.4px' }}>Build to Achieve</span>
            <span className="topDivider">|</span>
            <Link href="/track-application" className="topbarLink">
              <FileSearch size={14} className="topbarIcon" />
              <span>Track Application</span>
            </Link>
            <span className="topDivider">|</span>
            <Link href="/verify" className="topbarLink">
              <ShieldCheck size={14} className="topbarIcon" />
              <span>Verify Certificate</span>
            </Link>
            <span className="topDivider">|</span>
            <Link href="/results" className="topbarLink">
              <GraduationCap size={14} className="topbarIcon" />
              <span>Check Results</span>
            </Link>
            <span className="topDivider">|</span>
            <Link href="/course-finder" className="topbarLink topbarLinkHighlight">
              <Compass size={14} className="topbarIcon" />
              <span>Course Matcher</span>
            </Link>
          </div>
          <div className="topbarRight">
            <Link href="/admin" className="topbarAdminLink">
              <Lock size={13} className="topbarIcon" />
              <span>Admin</span>
            </Link>
            <span className="topDivider">|</span>
            <div className="langSwitcher">
              <button 
                type="button"
                className={`langBtn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
              >
                English
              </button>
              <button 
                type="button"
                className={`langBtn ${lang === 'ur' ? 'active' : ''}`}
                onClick={() => setLang('ur')}
              >
                اردو
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="nav">
        <div className="container navin">
          {/* Logo with Official Emblem */}
          <Link className="logo" href="/" aria-label="Aspire Institute">
            <div className="logoEmblem">
              <Image 
                src="/aspire-logo.png" 
                alt="Aspire Institute Logo" 
                width={48} 
                height={48} 
                style={{ objectFit: 'contain', width: 'auto', height: '48px' }}
                priority
              />
            </div>
            <div className="logoBrand">
              <span className="logoMain">ASPIRE INSTITUTE</span>
              <span className="logoSub">BUILD TO ACHIEVE</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="links" aria-label="Main navigation">
            <Link href="/" className="navLink">Home</Link>
            <Link href="/about" className="navLink">About</Link>
            <Link href="/courses" className="navLink">Courses</Link>
            <Link href="/admissions" className="navLink">Admissions</Link>
            <Link href="/faculty" className="navLink">Faculty</Link>
            <Link href="/alumni" className="navLink">Alumni</Link>
            <Link href="/gallery" className="navLink">Gallery</Link>
            <Link href="/announcements" className="navLink">Notices</Link>
            <Link href="/blog" className="navLink">Blog</Link>
            <Link href="/contact" className="navLink">Contact</Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="navActions">
            <Link className="btnApply" href="/admissions">
              Apply Now
            </Link>
            {/* Hamburger for mobile */}
            <button 
              className="mobileMenuToggle" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="mobileMenu">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link href="/courses" onClick={() => setMobileMenuOpen(false)}>Courses</Link>
            <Link href="/admissions" onClick={() => setMobileMenuOpen(false)}>Admissions</Link>
            <Link href="/track-application" onClick={() => setMobileMenuOpen(false)}>Track Application</Link>
            <Link href="/verify" onClick={() => setMobileMenuOpen(false)}>Verify Certificate</Link>
            <Link href="/results" onClick={() => setMobileMenuOpen(false)}>Student Results</Link>
            <Link href="/course-finder" onClick={() => setMobileMenuOpen(false)}>Course Matcher Quiz</Link>
            <Link href="/faculty" onClick={() => setMobileMenuOpen(false)}>Faculty & Teachers</Link>
            <Link href="/alumni" onClick={() => setMobileMenuOpen(false)}>Success Stories</Link>
            <Link href="/gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
            <Link href="/announcements" onClick={() => setMobileMenuOpen(false)}>Announcements</Link>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>Admin Panel</Link>
            <Link href="/admissions" className="mobileApply" onClick={() => setMobileMenuOpen(false)}>Apply Now</Link>
          </div>
        )}
      </header>
    </>
  );
}
