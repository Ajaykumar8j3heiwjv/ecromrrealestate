import { useState } from 'react'
import { Link } from 'react-router-dom'
import './PropertyCard.css'

export default function PropertyCard({ property }) {
  const [fav, setFav] = useState(false)

  const {
    id = 1,
    image,
    status = 'Sale',
    price = '₹1.2 Cr',
    priceNote = 'onwards',
    title = 'Luxury Apartment',
    location = 'OMR Road',
    beds = 3,
    baths = 2,
    area = '1450',
    type = 'Apartment',
  } = property || {}

  return (
    <div className="property-card" id={`property-card-${id}`}>
      <div className="property-card-image">
        <img src={image} alt={title} loading="lazy" />
        <div className="property-card-overlay" />
        <span className={`property-status status-${status.toLowerCase()}`}>{status}</span>
        <button
          className="property-favourite"
          id={`fav-btn-${id}`}
          onClick={(e) => { e.stopPropagation(); setFav(!fav) }}
          aria-label="Add to wishlist"
        >
          <svg viewBox="0 0 24 24" fill={fav ? '#C9A43D' : 'none'} stroke={fav ? '#C9A43D' : 'currentColor'}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeWidth="1.5"/>
          </svg>
        </button>
      </div>

      <div className="property-card-body">
        <div className="property-price">
          {price}
          <span className="property-price-sub">{priceNote}</span>
        </div>

        <h3 className="property-title">{title}</h3>

        <p className="property-location">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          {location}
        </p>

        <div className="property-card-divider" />

        <div className="property-specs">
          <span className="property-spec">
            <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            {beds} Beds
          </span>
          <span className="property-spec">
            <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" y1="5" x2="8" y2="7"/><line x1="2" y1="12" x2="22" y2="12"/>
            </svg>
            {baths} Baths
          </span>
          <span className="property-spec">
            <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            </svg>
            {area} sqft
          </span>
          <span className="property-spec" style={{ color: 'var(--gold-deep)', marginLeft: 'auto' }}>
            {type}
          </span>
        </div>

        <div className="property-card-footer">
          <Link to={`/listings/${id}`} className="btn-primary" id={`view-btn-${id}`}>View Details</Link>
          <a href={`https://wa.me/9176088519?text=Hi, I am interested in ${title}`} target="_blank" rel="noreferrer" className="btn-outline" id={`contact-btn-${id}`}>WhatsApp</a>
        </div>
      </div>
    </div>
  )
}
