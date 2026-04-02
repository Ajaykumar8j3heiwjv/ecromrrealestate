import { useState } from 'react'
import './ContactSection.css'
import { addEnquiry } from '../data/propertyStore'

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.63 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 6 6l1-1.68a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)
const MailIcon = () => (
  <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
)
const MapIcon = () => (
  <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
)

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', interest: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()

    // persist into admin enquiry store
    addEnquiry({
      name: form.name,
      phone: form.phone,
      email: form.email,
      interest: form.interest,
      message: form.message,
      property: form.interest || 'General',
    })

    // try sending email through Formcarry (for inbox notification)
    try {
      const payload = new FormData()
      payload.append('name', form.name)
      payload.append('phone', form.phone)
      payload.append('email', form.email)
      payload.append('interest', form.interest)
      payload.append('message', form.message)
      payload.append('_next', 'http://localhost:5173')

      await fetch('https://formcarry.com/s/27X4AL2MI5l', {
        method: 'POST',
        body: payload,
      })
    } catch (error) {
      console.warn('Formcarry email delivery failed (still saved locally):', error)
    }

    setSent(true)
    setTimeout(() => {
      setSent(false)
      setForm({ name: '', phone: '', email: '', interest: '', message: '' })
    }, 4000)
  }

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="contact-inner">
          <div className="contact-left">
            <p className="section-label contact-label">Get In Touch</p>
            <h2 className="contact-title">
              Let's Find Your<br />
              <span>Perfect Property</span>
            </h2>
            <p className="contact-desc">
              Our experienced consultants are ready to guide you through every step of your property journey — from discovery to keys in hand.
            </p>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-info-icon"><PhoneIcon /></div>
                <div>
                  <div className="contact-info-label">Phone</div>
                  <div className="contact-info-value">+91 91760 88519</div>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon"><MailIcon /></div>
                <div>
                  <div className="contact-info-label">Email</div>
                  <div className="contact-info-value">ecromrrealestate@gmail.com</div>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon"><MapIcon /></div>
                <div>
                  <div className="contact-info-label">Office</div>
                  <div className="contact-info-value">No. 12, OMR Road, Sholinganallur, Chennai – 600119</div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h3 className="contact-form-title">Request a Free Consultation</h3>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
                <p style={{ color: 'var(--gold-light)', fontFamily: 'var(--font-serif)', fontSize: '22px' }}>Thank You!</p>
                <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Our team will reach out within 24 hours.</p>
              </div>
            ) : (
              <form id="contact-form" onSubmit={handleSubmit}>
                {/* FormSubmit Configuration */}
                <input type="hidden" name="_next" value="http://localhost:5173" />

                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input id="field-name" type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input id="field-phone" type="tel" name="phone" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input id="field-email" type="email" name="email" placeholder="you@email.com" value={form.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>I am Looking to</label>
                  <select id="field-interest" name="interest" value={form.interest} onChange={handleChange}>
                    <option value="">Select interest</option>
                    <option>Buy a Property</option>
                    <option>Rent a Property</option>
                    <option>Sell my Property</option>
                    <option>Investment Advice</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea id="field-message" name="message" placeholder="Tell us about your requirements..." value={form.message} onChange={handleChange} />
                </div>
                <button type="submit" className="form-submit" id="contact-submit-btn">
                  Send Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
