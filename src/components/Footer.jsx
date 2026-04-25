import { Link } from 'react-router-dom'
import './Footer.css'
import logoImg from '../assets/logo.png'

const quickLinks = ['Buy Property', 'Rent Property', 'Sell Property', 'New Projects', 'About Us', 'Contact Us']
const areas = ['ECR Road', 'OMR Road', 'Sholinganallur', 'Perungudi', 'Thoraipakkam', 'Siruseri', 'Padur', 'Besant Nagar']

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const handleLinkClick = (target) => {
    if (target === 'contact') {
      const targetElement = document.getElementById('contact')
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    scrollToTop()
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          {/* Brand */}
          <div>
            <div className="footer-brand-logo">
              <img src={logoImg} alt="ECR OMR Real Estates" onError={(e) => e.target.style.display='none'} />
              <div>
                <div className="footer-brand-name">ECR OMR</div>
                <div className="footer-brand-sub">Real Estates</div>
              </div>
            </div>
            <p className="footer-brand-desc">
              Chennai's most trusted luxury real estate partner since 2009. Specialising in premium properties along the ECR &amp; OMR corridors.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social" id="social-fb" aria-label="Facebook">
                <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/ecr_omr_realestate/" className="footer-social" id="social-ig" aria-label="Instagram">
                <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="footer-social" id="social-yt" aria-label="YouTube">
                <svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="var(--gold-mid)" stroke="none"/></svg>
              </a>
              {/* <a href="https://wa.me/918939474747" target="_blank" rel="noopener noreferrer" className="footer-social footer-social-wa" id="social-wa" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a> */}
            </div>
            <a href="https://wa.me/918939474747" target="_blank" rel="noopener noreferrer" className="footer-whatsapp-btn" id="footer-whatsapp-cta">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a6.963 6.963 0 00-6.96 6.96c0 1.527.42 3.022 1.21 4.32l-1.288 4.705 4.806-1.268c1.261.737 2.707 1.126 4.232 1.126h.004a6.966 6.966 0 006.96-6.96c0-1.86-.727-3.61-2.045-4.927a6.963 6.963 0 00-4.915-2.038M21.75 11.997A10.751 10.751 0 0011.032 1.25h-.008a10.75 10.75 0 00-10.75 10.75c0 2.373.577 4.686 1.673 6.73l-1.78 6.497 6.654-1.756a10.732 10.732 0 005.155 1.308h.008c5.933 0 10.75-4.817 10.75-10.75"/>
              </svg>
              Chat on WhatsApp: +91 89 39 47 47 47
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((l) => {
                const routeMap = {
                  'Buy Property': '/listings?type=buy',
                  'Rent Property': '/listings?type=rent',
                  'Sell Property': '/listings?type=sell',
                  'New Projects': '/listings?type=projects',
                  'About Us': '/about',
                  'Contact Us': '/#contact',
                }
                const route = routeMap[l] || '/listings'
                return (
                  <li key={l}>
                    <Link
                      to={route}
                      onClick={() => handleLinkClick(l === 'Contact Us' ? 'contact' : null)}
                    >
                      {l}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h4 className="footer-col-title">Our Areas</h4>
            <ul className="footer-links">
              {areas.map((a) => (
                <li key={a}>
                  <Link to={`/listings?location=${encodeURIComponent(a)}`}>{a}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="footer-col-title">Newsletter</h4>
            <p className="footer-newsletter-text">
              Subscribe for exclusive property alerts, market insights, and premium listings delivered directly to you.
            </p>
            <div className="footer-newsletter-form">
              <input type="email" placeholder="Your email address" id="newsletter-email" />
              <button id="newsletter-submit" type="button">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © 2025 <span>ECR OMR Real Estates</span>. All rights reserved.
          </p>
          <ul className="footer-bottom-links">
            <li>
              <Link to="/privacy" onClick={scrollToTop}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" onClick={scrollToTop}>
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/disclaimer" onClick={scrollToTop}>
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
