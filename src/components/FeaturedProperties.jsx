import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropertyCard from './PropertyCard'
import './FeaturedProperties.css'
import { getProperties } from '../data/propertyStore'

const filters = ['All', 'Apartment', 'Villa', 'Penthouse']

export default function FeaturedProperties() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [allProperties, setAllProperties] = useState([])

  useEffect(() => {
    const props = getProperties()
    setAllProperties(props.filter(p => p.isFeatured))
  }, [])

  const filtered = activeFilter === 'All'
    ? allProperties
    : allProperties.filter((p) => p.type === activeFilter)

  return (
    <section className="featured section" id="featured">
      <div className="container">
        <div className="featured-header">
          <p className="section-label">Hand-Picked For You</p>
          <h2 className="featured-title">
            Featured <span>Luxury Properties</span>
          </h2>
          <p className="featured-desc">
            Curated selection of the finest residences along Chennai's most coveted ECR &amp; OMR corridors.
          </p>
        </div>

        <div className="featured-filters">
          {filters.map((f) => (
            <button
              key={f}
              id={`filter-${f.toLowerCase()}`}
              className={`filter-pill${activeFilter === f ? ' active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="featured-grid">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>

        <div className="featured-cta">
          <Link to="/listings" className="btn-outline" id="view-all-btn">
            View All Properties
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
