import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footerGrid">
        {/* Column 1: Brand Info */}
        <div className="footerBrandCol">
          <div className="footerLogo">
            <Image 
              src="/aspire-logo.png" 
              alt="Aspire Institute Logo" 
              width={48} 
              height={48} 
              style={{ objectFit: 'contain', width: 'auto', height: '44px' }}
            />
            <div className="footerLogoText">
              <strong>ASPIRE INSTITUTE</strong>
              <span>BUILD TO ACHIEVE</span>
            </div>
          </div>
          <p className="footerDesc">
            Empowering students with practical education, modern technology, and career-ready skills.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footerCol">
          <h4>Quick Links</h4>
          <ul className="footerLinks">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/courses">All Courses</Link></li>
            <li><Link href="/admissions">Admissions Portal</Link></li>
            <li><Link href="/gallery">Campus Gallery</Link></li>
            <li><Link href="/announcements">Announcements</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Our Courses */}
        <div className="footerCol">
          <h4>Featured Courses</h4>
          <ul className="footerLinks">
            <li><Link href="/courses">CIT (6 Months)</Link></li>
            <li><Link href="/courses">DIT (1 Year)</Link></li>
            <li><Link href="/courses">Web Development (4 Months)</Link></li>
            <li><Link href="/courses">Data Science (1 Year)</Link></li>
            <li><Link href="/courses">Python Programming (3 Months)</Link></li>
            <li><Link href="/courses">Data Analytics (4 Months)</Link></li>
          </ul>
        </div>

        {/* Column 4: Follow Us & Contact */}
        <div className="footerCol">
          <h4>Follow Us</h4>
          <div className="socialIcons">
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="socialIcon" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="socialIcon" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            {/* YouTube */}
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="socialIcon" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"/>
              </svg>
            </a>
          </div>

          <div className="footerLangToggle">
            <span className="footerLangActive">English</span>
            <span className="footerLangDivider">|</span>
            <span className="footerLangItem">اردو</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footerBottom">
        <div className="container footerBottomIn">
          <p>© 2026 Aspire Institute of Technology. All rights reserved.</p>
          <div className="footerLegal">
            <Link href="/about">Privacy Policy</Link>
            <span className="footerLegalDivider">|</span>
            <Link href="/about">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
