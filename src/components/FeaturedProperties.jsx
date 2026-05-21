import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropertyCard from './PropertyCard'
import './FeaturedProperties.css'
import { getProperties } from '../data/propertyStore'

const filters = ['All', 'Apartment', 'Villa', 'Penthouse']

function FeaturedSkeleton() {
  return (
    <div className="featured-skeleton-grid">
      {[1, 2, 3].map(i => (
        <div key={i} className="featured-skeleton-card">
          <div className="featured-skeleton-img skeleton-shimmer" />
          <div className="featured-skeleton-body">
            <div className="skeleton-bar skeleton-shimmer" style={{ width: '30%', height: '10px', marginBottom: '10px' }} />
            <div className="skeleton-bar skeleton-shimmer" style={{ width: '85%', height: '16px', marginBottom: '8px' }} />
            <div className="skeleton-bar skeleton-shimmer" style={{ width: '55%', height: '12px', marginBottom: '16px' }} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <div className="skeleton-bar skeleton-shimmer" style={{ width: '50px', height: '12px' }} />
              <div className="skeleton-bar skeleton-shimmer" style={{ width: '50px', height: '12px' }} />
              <div className="skeleton-bar skeleton-shimmer" style={{ width: '50px', height: '12px' }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function FeaturedProperties() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [allProperties, setAllProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    getProperties().then(props => {
      if (!cancelled) {
        setAllProperties((props || []).filter(p => p.isFeatured))
        setLoading(false)
      }
    })
    return () => { cancelled = true }
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

        {loading ? (
          <FeaturedSkeleton />
        ) : (
          <div className="featured-grid">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}

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
