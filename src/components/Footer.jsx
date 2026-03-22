import { Link } from 'react-router-dom'
import './Footer.css'
import logoImg from '../assets/logo.png'

const quickLinks = ['Buy Property', 'Rent Property', 'Sell Property', 'New Projects', 'About Us', 'Contact Us']
const areas = ['ECR Road', 'OMR Road', 'Sholinganallur', 'Perungudi', 'Thoraipakkam', 'Siruseri', 'Padur', 'Besant Nagar']

export default function Footer() {
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
              <a href="#" className="footer-social" id="social-ig" aria-label="Instagram">
                <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="footer-social" id="social-yt" aria-label="YouTube">
                <svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="var(--gold-mid)" stroke="none"/></svg>
              </a>
              <a href="#" className="footer-social" id="social-wa" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((l) => (
                <li key={l}>
                  <Link to="/listings">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h4 className="footer-col-title">Our Areas</h4>
            <ul className="footer-links">
              {areas.map((a) => (
                <li key={a}>
                  <a href="#">{a}</a>
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
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Disclaimer</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
