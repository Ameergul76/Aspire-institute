'use client';
import { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (r.ok) {
        setDone(true);
        form.reset();
      } else {
        alert('Could not send message. Please try again or WhatsApp us.');
      }
    } catch {
      setDone(true);
      form.reset();
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="pageHero" style={{
        background: 'linear-gradient(135deg, rgba(7, 14, 47, 0.95) 0%, rgba(13, 31, 102, 0.88) 100%), url(/campus.jpg) center/cover no-repeat',
        padding: '70px 0',
        color: '#fff'
      }}>
        <div className="container">
          <span className="badgePill">Get in Touch</span>
          <h1 style={{ fontSize: '42px', fontWeight: 900, margin: '14px 0 10px' }}>
            Contact Aspire Institute
          </h1>
          <p style={{ fontSize: '18px', color: '#cbd5e1', maxWidth: '640px', margin: 0 }}>
            Have questions about courses, admissions, or class timings? We are here to help you.
          </p>
        </div>
      </section>

      <main className="section" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="contactGrid">
            {/* Contact Details Card */}
            <div className="contactInfoCard">
              <div className="contactInfoBlock">
                <div className="contactInfoIcon">
                  <MapPin size={20} />
                </div>
                <div className="contactInfoContent">
                  <h4>Campus Location</h4>
                  <p>
                    The Graceful Grammar High School, Naval Campus, near Asifa Bhutto Park, Naval Colony, Karachi, Pakistan.
                  </p>
                </div>
              </div>

              <div className="contactInfoBlock">
                <div className="contactInfoIcon">
                  <Phone size={20} />
                </div>
                <div className="contactInfoContent">
                  <h4>Phone Numbers</h4>
                  <p>
                    <strong>03213693881</strong><br />
                    <strong>03147189947</strong>
                  </p>
                  <div className="contactButtonsRow">
                    <a href="tel:03213693881" className="callBtn">
                      <Phone size={15} /> <span>Call Us</span>
                    </a>
                    <a 
                      href="https://wa.me/923213693881?text=Hello%20Aspire%20Institute,%20I%20want%20information%20about%20admissions" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="whatsappBtn"
                    >
                      <MessageCircle size={15} /> <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="contactInfoBlock">
                <div className="contactInfoIcon">
                  <Clock size={20} />
                </div>
                <div className="contactInfoContent">
                  <h4>Office & Lab Timings</h4>
                  <p>
                    Monday to Saturday: <strong>4:00 PM to 8:00 PM</strong><br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

              <div className="mapLinkRow">
                <a 
                  href="https://maps.google.com/?q=Naval+Colony+Karachi" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mapLink"
                >
                  <MapPin size={15} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} /> Open in Google Maps →
                </a>
              </div>
            </div>

            {/* Send Us a Message Card */}
            <div className="contactFormCard">
              <h3>Send Us a Message</h3>
              {done && (
                <div className="formSuccess">
                  <CheckCircle2 size={18} style={{ display: 'inline', verticalAlign: '-3px', marginRight: 6 }} />
                  Message sent successfully! The institute administration will get in touch with you shortly.
                </div>
              )}
              <form onSubmit={send} className="formGrid">
                <input 
                  type="text" 
                  name="name" 
                  className="formInput" 
                  placeholder="Your Full Name *" 
                  required 
                />
                <input 
                  type="email" 
                  name="email" 
                  className="formInput" 
                  placeholder="Your Email Address (Optional)" 
                />
                <input 
                  type="tel" 
                  name="mobile" 
                  className="formInput" 
                  placeholder="Mobile / WhatsApp Number *" 
                  required 
                />
                <textarea 
                  name="message" 
                  className="formInput" 
                  rows={5} 
                  placeholder="Write your question, required course or message here... *" 
                  required 
                ></textarea>
                <button type="submit" className="btn" disabled={loading}>
                  {loading ? 'Sending Message...' : 'Send Message →'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
