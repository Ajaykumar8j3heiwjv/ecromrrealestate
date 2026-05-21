import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './PropertyDetail.css'
import { getProperties } from '../data/propertyStore'

function DetailSkeleton() {
  return (
    <div className="property-detail-v2">
      <div className="container">
        <div className="skeleton-line skeleton-pulse" style={{ width: '220px', height: '14px', marginBottom: '20px' }} />
      </div>
      <div className="container">
        <div className="detail-layout">
          <main className="detail-content">
            <div className="detail-gallery">
              <div className="gallery-main skeleton-pulse" style={{ aspectRatio: '16/9' }} />
            </div>
            <div className="detail-header-v2">
              <div className="skeleton-line skeleton-pulse" style={{ width: '70%', height: '28px', marginBottom: '12px' }} />
              <div className="skeleton-line skeleton-pulse" style={{ width: '40%', height: '14px' }} />
            </div>
            <div className="detail-section-v2">
              <div className="skeleton-line skeleton-pulse" style={{ width: '30%', height: '20px', marginBottom: '16px' }} />
              <div className="skeleton-line skeleton-pulse" style={{ width: '100%', height: '13px', marginBottom: '8px' }} />
              <div className="skeleton-line skeleton-pulse" style={{ width: '90%', height: '13px', marginBottom: '8px' }} />
              <div className="skeleton-line skeleton-pulse" style={{ width: '80%', height: '13px' }} />
            </div>
            <div className="detail-section-v2">
              <div className="skeleton-line skeleton-pulse" style={{ width: '40%', height: '20px', marginBottom: '20px' }} />
              <div className="essential-grid">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="essential-item">
                    <div className="skeleton-pulse" style={{ width: 36, height: 36, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div className="skeleton-line skeleton-pulse" style={{ width: '50%', height: '10px', marginBottom: '6px' }} />
                      <div className="skeleton-line skeleton-pulse" style={{ width: '70%', height: '14px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
          <aside className="detail-sidebar-v2">
            <div className="contact-owner-card skeleton-pulse" style={{ height: '200px', marginBottom: '24px' }} />
          </aside>
        </div>
      </div>
    </div>
  )
}

export default function PropertyDetail() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(0)

  const getImages = (prop) => {
    if (!prop) return []
    let imgs = prop.images
    if (typeof imgs === 'string') {
      try { imgs = JSON.parse(imgs) } catch { imgs = [imgs] }
    }
    if (Array.isArray(imgs) && imgs.length > 0) return imgs
    if (prop.image) return [prop.image]
    return []
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    let cancelled = false
    setLoading(true)

    async function load() {
      const storeProps = await getProperties()
      if (cancelled) return
      const found = (storeProps || []).find(p => String(p.id) === String(id))
      if (found) {
        const detailGrid = [
          { label: 'Property Type', val: found.propertyType, icon: '🏠' },
          { label: 'Size', val: found.size, icon: '📏' },
          { label: 'Rent', val: found.rent, icon: '💰' },
          { label: 'Advance', val: found.advance, icon: '🏦' },
          { label: 'Maintenance', val: found.maintenance, icon: '🛠️' },
          { label: 'Bedroom', val: found.beds ? `${found.beds} Bedroom(s)` : '-', icon: '🛏️' },
          { label: 'Bathroom', val: found.baths ? `${found.baths} Bathroom(s)` : '-', icon: '🛁' },
          { label: 'Additional Room', val: found.additionalRoom, icon: '🚪' },
          { label: 'Balconies', val: found.balconies, icon: '🌅' },
          { label: 'Property on Floor', val: found.propertyOnFloor, icon: '🏢' },
          { label: 'Total Floor(s)', val: found.totalFloors, icon: '🏘️' },
          { label: 'Servant Accommodation', val: found.servantAcc, icon: '🙋' },
          { label: 'Facing', val: found.facing, icon: '🧭' },
          { label: 'Age Of The Property', val: found.propertyAge, icon: '🏗️' },
          { label: 'Parking', val: found.parking, icon: '🚗' },
          { label: 'Furnished Status', val: found.furnishedStatus, icon: '🛋️' },
          { label: 'Available From', val: found.availableFrom, icon: '📅' },
        ].filter(item => item.val && item.val !== 'undefined' && item.val !== 'null')

        const imgs = getImages(found)
        setProperty({ ...found, detailsGrid: detailGrid, parsedImages: imgs })
        setActiveImg(0)
      }
      setLoading(false)
    }
    load()
    return () => { cancelled = true }
  }, [id])

  if (loading) return <DetailSkeleton />

  if (!property) return (
    <div className="property-detail-v2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--white)', marginBottom: '12px' }}>Property Not Found</p>
        <Link to="/listings" className="btn-primary">Back to Listings</Link>
      </div>
    </div>
  )

  const images = property.parsedImages || []

  return (
    <div className="property-detail-v2">
      {/* Breadcrumbs */}
      <div className="container">
        <div className="detail-breadcrumb">
          <Link to="/">Home</Link> / <Link to="/listings">Properties</Link> / <span>{property.title}</span>
        </div>
      </div>

      <div className="container">
        <div className="detail-layout">
          <main className="detail-content">
            {/* Gallery Section */}
            <div className="detail-gallery">
              <div className="gallery-main">
                {images.length > 0 ? (
                  <img
                    src={images[activeImg] || property.image}
                    alt={property.title}
                    loading="eager"
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'var(--dark-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>No Image</div>
                )}
                {images.length > 1 && (
                  <>
                    <button
                      className="gallery-nav prev"
                      onClick={() => setActiveImg(i => (i === 0 ? images.length - 1 : i - 1))}
                    >‹</button>
                    <button
                      className="gallery-nav next"
                      onClick={() => setActiveImg(i => (i === images.length - 1 ? 0 : i + 1))}
                    >›</button>
                    <div className="gallery-indicators">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          className={`indicator ${activeImg === idx ? 'active' : ''}`}
                          onClick={() => setActiveImg(idx)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails row */}
              {images.length > 1 && (
                <div className="gallery-thumbs">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      className={`gallery-thumb ${activeImg === idx ? 'active' : ''}`}
                      onClick={() => setActiveImg(idx)}
                    >
                      <img src={img} alt={`View ${idx + 1}`} loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Header Section */}
            <div className="detail-header-v2">
              <div className="detail-status-row">
                <span className="detail-status-badge">{property.status}</span>
                <span className="detail-price-badge">₹{property.price}</span>
              </div>
              <h1 className="detail-title-v2">{property.title}</h1>
              <p className="detail-loc-v2">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="var(--gold-mid)">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {property.location}{property.pincode && ` — ${property.pincode}`}
              </p>
            </div>

            {/* Description Section */}
            <div className="detail-section-v2">
              <h3 className="section-label-v2">Description</h3>
              <p className="section-text-v2">{property.description || property.desc || 'No description available'}</p>
            </div>

            {/* Essential Info Grid */}
            <div className="detail-section-v2">
              <h3 className="section-label-v2">Essential Information</h3>
              <div className="essential-grid">
                {property.detailsGrid && property.detailsGrid.map((item, idx) => (
                  <div className="essential-item" key={idx}>
                    <div className="essential-icon">{item.icon}</div>
                    <div className="essential-info">
                      <div className="essential-label">{item.label}</div>
                      <div className="essential-val">{item.val || '—'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="detail-sidebar-v2">
            <div className="contact-owner-card">
              <h4 className="card-top-label">Contact Agent</h4>
              <div className="owner-profile">
                <div className="owner-avatar">{property.ownerName?.charAt(0) || '?'}</div>
                <div className="owner-info">
                  <div className="owner-name">{property.ownerName || 'Agent'}</div>
                  <div className="owner-role">{property.ownerRole || 'Agent'}</div>
                  <div className="owner-phone">{property.ownerPhone ? `+${property.ownerPhone}` : 'Contact via WhatsApp'}</div>
                </div>
              </div>
              <a
                href={`https://wa.me/${property.ownerPhone}?text=Hi, I am interested in ${encodeURIComponent(property.title)}`}
                target="_blank"
                rel="noreferrer"
                className="contact-owner-btn"
                style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
              >
                WHATSAPP AGENT NOW
              </a>
            </div>

            <div className="detail-safety-tips">
              <h5>Safety Tips</h5>
              <ul>
                <li>Never pay advance without visiting the property.</li>
                <li>Verify ownership documents before closing.</li>
                <li>Always meet the owner in person.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
