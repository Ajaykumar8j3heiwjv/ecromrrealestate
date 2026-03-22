import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import logoImg from '../assets/logo.png'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Buy', href: '/listings?type=buy' },
  { label: 'Rent', href: '/listings?type=rent' },
  { label: 'Sell', href: '/listings?type=sell' },
  { label: 'Projects', href: '/listings?type=projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <Link to="/" className="navbar-logo">
        <img src={logoImg} alt="ECR OMR Real Estates Logo" onError={(e) => { e.target.style.display='none' }} />
        <div className="navbar-logo-text">
          <span className="navbar-logo-name">ECR OMR</span>
          <span className="navbar-logo-sub">Real Estates</span>
        </div>
      </Link>

      <ul className={`navbar-links${menuOpen ? ' open' : ''}`}>
        {navLinks.map((link) => (
          <li key={link.label}>
            <Link to={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="navbar-cta">
        <a href="tel:+919876543210" className="navbar-phone">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C9.39 21 3 14.61 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.26.2 2.47.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z"/>
          </svg>
          +91 91760 88519
        </a>
        <Link to="/listings" className="btn-primary" style={{ fontSize: '11px', padding: '10px 22px' }}>
          Find Property
        </Link>
      </div>

      <button
        className="navbar-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        id="navbar-toggle-btn"
      >
        <span style={menuOpen ? { transform: 'rotate(45deg) translateY(7px)' } : {}} />
        <span style={menuOpen ? { opacity: 0 } : {}} />
        <span style={menuOpen ? { transform: 'rotate(-45deg) translateY(-7px)' } : {}} />
      </button>
    </nav>
  )
}
