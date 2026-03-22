import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

const tabs = ['Buy', 'Rent', 'Sell']
const propertyTypes = ['All Types', 'Apartment', 'Villa', 'Plot', 'Commercial', 'Penthouse']
const locations = ['All Locations', 'ECR Road', 'OMR Road', 'Sholinganallur', 'Perungudi', 'Thoraipakkam', 'Padur', 'Siruseri']

export default function Hero() {
  const [activeTab, setActiveTab] = useState('Buy')
  const [bgLoaded, setBgLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = '/src/assets/hero_bg.png'
    img.onload = () => setBgLoaded(true)
    setTimeout(() => setBgLoaded(true), 100)
  }, [])

  return (
    <section className="hero" id="hero">
      <div className={`hero-bg${bgLoaded ? ' loaded' : ''}`} />
      <div className="hero-overlay" />
      <div className="hero-overlay-left" />

      {/* Decorative ornaments */}
      <div className="hero-ornament hero-ornament-tl" />
      <div className="hero-ornament hero-ornament-br" />

      <div className="hero-content">
        <p className="hero-eyebrow">Chennai's Premier Realty</p>

        <h1 className="hero-title">
          Discover Your
          <span className="gold-line">Royal Estate</span>
        </h1>

        <p className="hero-subtitle">
          Exclusive luxury properties along Chennai's iconic ECR &amp; OMR corridors
        </p>

        <div className="hero-btns">
          <Link to="/listings" className="btn-primary" id="hero-explore-btn">
            Explore Properties
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <a href="#contact" className="btn-outline" id="hero-consult-btn">
            Free Consultation
          </a>
        </div>

        {/* Search Bar */}
        <div className="hero-search">
          <div className="hero-search-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                id={`search-tab-${tab.toLowerCase()}`}
                className={`hero-search-tab${activeTab === tab ? ' active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="hero-search-body">
            <div className="hero-search-field">
              <label>Location</label>
              <select defaultValue="All Locations" id="search-location">
                {locations.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div className="hero-search-field">
              <label>Property Type</label>
              <select defaultValue="All Types" id="search-type">
                {propertyTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="hero-search-field">
              <label>Budget</label>
              <input type="text" placeholder="e.g. ₹50L – ₹2Cr" id="search-budget" />
            </div>
            <Link to="/listings" className="hero-search-btn" id="hero-search-submit">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              Search
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
