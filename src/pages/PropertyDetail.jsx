import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './PropertyDetail.css'
import PropertyCard from '../components/PropertyCard'
import { getProperties } from '../data/propertyStore'

// Import assets (placeholders)
import p1 from '../assets/property_1.png'
import p2 from '../assets/property_2.png'
import p3 from '../assets/property_3.png'
import p4 from '../assets/property_4.png'

const allListingsDefault = [
  {
    id: 1,
    image: p1,
    status: 'Rent',
    price: '₹30,000/mo',
    title: '1028 Sq.Ft. 2 BHK Residential Apartment',
    location: 'Ambattur, Chennai',
    pincode: '600053',
    beds: 2,
    baths: 2,
    area: '1028',
    type: 'Apartment',
    desc: 'Fully furnished and gated apartment in prime location is for rent in prime location, just opposite to Tata Communications. Apartment can be rent out fully or semi-furnished upon agreement. Few minutes away from branded showrooms and other shops. Rent negotiable.',
    owner: {
      name: 'Rajkumar B Thangamanian',
      role: 'Owner',
      phone: '+91-98404 22285'
    },
    details: [
      { label: 'Property Type', val: 'Apartment', icon: '🏠' },
      { label: 'Size', val: '1028 Sq.ft', icon: '📏' },
      { label: 'Rent', val: '30,000', icon: '💰' },
      { label: 'Advance', val: '2,00,000', icon: '🏦' },
      { label: 'Maintenance', val: '2,000', icon: '🛠️' },
      { label: 'Bedroom', val: '2 Bedroom(s)', icon: '🛏️' },
      { label: 'Bathroom', val: '2 Bathroom(s)', icon: '🛁' },
      { label: 'Additional Room', val: '-', icon: '🚪' },
      { label: 'Balconies', val: '2', icon: '🌅' },
      { label: 'Property on Floor', val: '8', icon: '🏢' },
      { label: 'Total Floor(s)', val: '14', icon: '🏘️' },
      { label: 'Suitable Time To Call', val: '4-5pm', icon: '⏰' },
      { label: 'Servant Accommodation', val: 'No', icon: '🙋' },
      { label: 'Pet Allowed', val: 'Yes', icon: '🐾' },
      { label: 'Food Preference', val: 'Veg & Non-Veg', icon: '🍲' },
      { label: 'Tenants', val: 'Both (Family / Bachelor)', icon: '👨‍👩‍👧‍👦' },
      { label: 'Facing', val: 'North West', icon: '🧭' },
      { label: 'Age Of The Property', val: '1-5 years', icon: '🏗️' },
      { label: 'Parking', val: 'Both (Two/Four Wheeler)', icon: '🚗' },
      { label: 'Furnished Status', val: 'Fully Furnished', icon: '🛋️' },
      { label: 'Available From', val: '2024-04-10', icon: '📅' },
    ]
  },
  {
    id: 2,
    image: p2,
    status: 'Sale',
    price: '₹3.50 Cr',
    title: 'Royal Crest Villa — Private Pool',
    location: 'ECR, Thiruvanmiyur',
    beds: 4,
    baths: 4,
    area: '3200',
    type: 'Villa',
    desc: 'Exquisite private villa with a personal swimming pool and landscaped garden.',
    owner: { name: 'Vikram Seth', role: 'Agent', phone: '+91 99887 76655' },
    details: []
  }
]

const recentProperties = [
  { id: 2, image: p2, status: 'Sale', price: '₹3.5 Cr', title: 'Royal Crest Villa', location: 'ECR, Thiruvanmiyur', beds: 4, baths: 4, area: '3200', type: 'Villa' },
  { id: 3, image: p3, status: 'Rent', price: '₹75,000/mo', title: 'Horizon Penthouse', location: 'ECR, Neelankarai', beds: 4, baths: 3, area: '2800', type: 'Penthouse' },
  { id: 4, image: p4, status: 'Sale', price: '₹1.2 Cr', title: 'Aurum Residences', location: 'OMR, Perungudi', beds: 3, baths: 2, area: '1450', type: 'Apartment' },
]

export default function PropertyDetail() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    const storeProps = getProperties()
    const found = storeProps.find(p => p.id === parseInt(id))
    if (found) {
      // Format details for the grid display
      const detailGrid = [
        { label: 'Property Type', val: found.propertyType, icon: '🏠' },
        { label: 'Size', val: found.size, icon: '📏' },
        { label: 'Rent', val: found.rent, icon: '💰' },
        { label: 'Advance', val: found.advance, icon: '🏦' },
        { label: 'Maintenance', val: found.maintenance, icon: '🛠️' },
        { label: 'Bedroom', val: found.bedroom, icon: '🛏️' },
        { label: 'Bathroom', val: found.bathroom, icon: '🛁' },
        { label: 'Additional Room', val: found.additionalRoom, icon: '🚪' },
        { label: 'Balconies', val: found.balconies, icon: '🌅' },
        { label: 'Property on Floor', val: found.propertyOnFloor, icon: '🏢' },
        { label: 'Total Floor(s)', val: found.totalFloors, icon: '🏘️' },
        { label: 'Suitable Time To Call', val: found.suitableTime, icon: '⏰' },
        { label: 'Servant Accommodation', val: found.servantAcc, icon: '🙋' },
        { label: 'Pet Allowed', val: found.petAllowed, icon: '🐾' },
        { label: 'Food Preference', val: found.foodPref, icon: '🍲' },
        { label: 'Tenants', val: found.tenants, icon: '👨‍👩‍👧‍👦' },
        { label: 'Facing', val: found.facing, icon: '🧭' },
        { label: 'Age Of The Property', val: found.propertyAge, icon: '🏗️' },
        { label: 'Parking', val: found.parking, icon: '🚗' },
        { label: 'Furnished Status', val: found.furnishedStatus, icon: '🛋️' },
        { label: 'Available From', val: found.availableFrom, icon: '📅' },
      ]
      setProperty({ ...found, detailsGrid: detailGrid })
    }
  }, [id])

  if (!property) return <div className="loading">Loading...</div>

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
                <img src={property.image} alt={property.title} />
                <button className="gallery-nav prev">‹</button>
                <button className="gallery-nav next">›</button>
              </div>
            </div>

            {/* Header Section */}
            <div className="detail-header-v2">
              <h1 className="detail-title-v2">{property.title}</h1>
              <p className="detail-loc-v2">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="var(--gold-mid)">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {property.location} {property.pincode && `— ${property.pincode}`}
              </p>
            </div>

            {/* Description Section */}
            <div className="detail-section-v2">
              <h3 className="section-label-v2">Description</h3>
              <p className="section-text-v2">{property.desc}</p>
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
                      <div className="essential-val">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="detail-sidebar-v2">
            <div className="contact-owner-card">
              <h4 className="card-top-label">Contact Owner</h4>
              <div className="owner-profile">
                <div className="owner-avatar">{property.ownerName?.charAt(0)}</div>
                <div className="owner-info">
                  <div className="owner-name">{property.ownerName}</div>
                  <div className="owner-role">{property.ownerRole}</div>
                  <div className="owner-phone">+{property.ownerPhone}</div>
                </div>
              </div>
              <a 
                href={`https://wa.me/${property.ownerPhone}?text=Hi, I am interested in ${property.title}`}
                target="_blank"
                rel="noreferrer"
                className="contact-owner-btn"
                style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
              >
                WHATSAPP OWNER NOW
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

        {/* Recently Added Section */}
        <div className="recently-added-section">
          <h2 className="recent-title">Recently added Properties</h2>
          <div className="recent-grid">
            {recentProperties.map(p => (
              <div className="recent-card-wrap" key={p.id}>
                <div className="recent-card-img">
                  <img src={p.image} alt={p.title} />
                  <div className="recent-card-badges">
                    <span className="badge-bhk">{p.beds} BHK</span>
                    <span className="badge-status">For {p.status}</span>
                  </div>
                </div>
                <div className="recent-card-body">
                  <h4 className="recent-card-title">{p.title}</h4>
                  <p className="recent-card-loc">{p.location}</p>
                  <div className="recent-card-footer">
                    <div className="recent-footer-item">
                      <label>Rent</label>
                      <span>Not Mentioned</span>
                    </div>
                    <div className="recent-footer-item">
                      <label>Advance</label>
                      <span>Not Mentioned</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
