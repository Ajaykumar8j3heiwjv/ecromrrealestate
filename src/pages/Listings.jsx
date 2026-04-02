import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import './Listings.css'
import { getProperties } from '../data/propertyStore'

const popularTags = ['3 BHK', 'Sea View', 'Gated Community', 'North Facing', 'Ready to Move', 'Under Construction']

export default function Listings() {
  const [allListings, setAllListings] = useState([])
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [budgetMin, setBudgetMin] = useState('')
  const [budgetMax, setBudgetMax] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [searchParams] = useSearchParams()

  useEffect(() => {
    setAllListings(getProperties())
  }, [])

  useEffect(() => {
    const rawStatus = searchParams.get('status') || ''
    const rawType = searchParams.get('type') || ''
    const location = searchParams.get('location') || ''
    const budget = searchParams.get('budget') || ''

    // Interpret generic nav-based query values:
    // - ?type=rent  => status = Rent
    // - ?type=buy   => status = Sale
    // - ?type=sell  => status = Sale
    const normalizedType = rawType.trim().toLowerCase()
    let computedStatus = rawStatus

    if (!computedStatus && normalizedType) {
      if (normalizedType === 'rent') computedStatus = 'Rent'
      else if (normalizedType === 'buy' || normalizedType === 'sell') computedStatus = 'Sale'
      else if (normalizedType === 'new') computedStatus = 'New'
    }

    setStatusFilter(computedStatus)

    // If type is property category (Apartment/Villa/Penthouse), use as typeFilter
    if (normalizedType && !['rent', 'buy', 'sell', 'new'].includes(normalizedType)) {
      setTypeFilter(rawType)
    } else {
      setTypeFilter('')
    }

    setLocationFilter(location)

    if (budget) {
      const digits = budget.replace(/[^0-9]/g, ' ').trim().split(/\s+/)
      setBudgetMin(digits[0] || '')
      setBudgetMax(digits[1] || '')
    }
  }, [searchParams])

  const filtered = allListings.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase())
    const matchType = !typeFilter || p.type === typeFilter
    const matchStatus = !statusFilter || p.status === statusFilter
    const matchLocation = !locationFilter || locationFilter === 'All Areas' || p.location === locationFilter
    const price = Number(p.price.toString().replace(/[^0-9]/g, '')) || 0
    const minBudget = Number(budgetMin.toString().replace(/[^0-9]/g, '')) || 0
    const maxBudget = Number(budgetMax.toString().replace(/[^0-9]/g, '')) || 0
    const matchBudget = (!budgetMin && !budgetMax) || (minBudget && price >= minBudget) || (maxBudget && price <= maxBudget) || (minBudget && maxBudget && price >= minBudget && price <= maxBudget)
    return matchSearch && matchType && matchStatus && matchLocation && matchBudget
  })

  return (
    <div className="listings-page">
      {/* Page hero */}
      <div className="listings-hero">
        <div className="container">
          <div className="listings-breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">›</span>
            <span>Properties</span>
          </div>
          <h1 className="listings-hero-title">
            Browse <span>All Properties</span>
          </h1>

          <div className="listings-search-bar">
            <input
              id="listings-search-field"
              type="text"
              placeholder="Search by title or location…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select id="listings-type-filter" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="">All Types</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Penthouse</option>
            </select>
            <select id="listings-status-filter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option>Sale</option>
              <option>Rent</option>
              <option>New</option>
            </select>
            <button className="search-btn" id="listings-search-btn" onClick={() => {}}>Search</button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="listings-body">
        <div className="container">
          <div className="listings-layout">
            {/* Main list */}
            <div className="listings-main">
              <div className="listings-sort-bar">
                <p className="listings-count">
                  Showing <strong>{filtered.length}</strong> properties
                </p>
                <div className="listings-sort">
                  <span>Sort:</span>
                  <select id="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="default">Relevance</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--white)', marginBottom: '8px' }}>No properties found</p>
                  <p>Try adjusting your search or filters.</p>
                </div>
              ) : (
                filtered.map((p) => (
                  <div className="listing-row-card" key={p.id} id={`listing-row-${p.id}`}>
                    <div className="listing-row-img">
                      <img src={p.image} alt={p.title} loading="lazy" />
                      <span className="listing-row-badge">{p.status}</span>
                    </div>
                    <div className="listing-row-body">
                      <div>
                        <div className="listing-row-price">₹{p.price}</div>
                        <h3 className="listing-row-title">{p.title}</h3>
                        <p className="listing-row-loc">
                          <svg viewBox="0 0 24 24" fill="var(--gold-dark)" xmlns="http://www.w3.org/2000/svg" width="12" height="12">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                          {p.location}
                        </p>
                        <div className="listing-row-specs">
                          <span className="listing-row-spec">
                            <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                            {p.beds} Beds
                          </span>
                          <span className="listing-row-spec">
                            <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" y1="5" x2="8" y2="7"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
                            {p.baths} Baths
                          </span>
                          <span className="listing-row-spec">
                            <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                            {p.area} sqft
                          </span>
                          <span className="listing-row-spec" style={{ color: 'var(--gold-dark)', marginLeft: 'auto' }}>{p.type}</span>
                        </div>
                      </div>
                      <div className="listing-row-footer">
                        <Link to={`/listings/${p.id}`} className="btn-primary" id={`view-listing-${p.id}`}>View Details</Link>
                        <a href={`https://wa.me/${p.ownerPhone}?text=Hi, I am interested in ${p.title} (${p.location})`} target="_blank" rel="noreferrer" className="btn-outline" id={`contact-listing-${p.id}`}>WhatsApp</a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Sidebar */}
            <aside className="listings-sidebar">
              <div className="sidebar-section">
                <h3 className="sidebar-title">Refine Search</h3>
                <div className="sidebar-group">
                  <label className="sidebar-label">Location</label>
                  <select id="sidebar-location" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
                    <option>All Areas</option>
                    <option>ECR Road</option>
                    <option>OMR Road</option>
                    <option>Sholinganallur</option>
                    <option>Perungudi</option>
                    <option>Thoraipakkam</option>
                    <option>Besant Nagar</option>
                  </select>
                </div>
                <div className="sidebar-group">
                  <label className="sidebar-label">Budget (Min)</label>
                  <input value={budgetMin} onChange={(e) => setBudgetMin(e.target.value)} id="sidebar-budget-min" type="text" placeholder="e.g. 50" />
                </div>
                <div className="sidebar-group">
                  <label className="sidebar-label">Budget (Max)</label>
                  <input value={budgetMax} onChange={(e) => setBudgetMax(e.target.value)} id="sidebar-budget-max" type="text" placeholder="e.g. 200" />
                </div>
                <div className="sidebar-group">
                  <label className="sidebar-label">Bedrooms</label>
                  <select id="sidebar-beds">
                    <option>Any</option>
                    <option>1 BHK</option>
                    <option>2 BHK</option>
                    <option>3 BHK</option>
                    <option>4+ BHK</option>
                  </select>
                </div>
                <button className="sidebar-filter-btn" id="sidebar-apply-btn">Apply Filters</button>
              </div>

              <div className="sidebar-section">
                <h3 className="sidebar-title">Popular Searches</h3>
                <div className="popular-tags">
                  {popularTags.map((tag) => (
                    <button key={tag} className="popular-tag" id={`tag-${tag.replace(/\s/g,'-').toLowerCase()}`}>{tag}</button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
