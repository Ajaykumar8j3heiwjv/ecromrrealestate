import './Extras.css'
import p1 from '../assets/property_1.png'
import p2 from '../assets/property_2.png'
import p3 from '../assets/property_3.png'
import p4 from '../assets/property_4.png'

const marqueeItems = [
  'Luxury Villas on ECR', 'Premium Apartments on OMR', 'Exclusive Plots Available', 'New Launches This Season',
  'Verified Properties Only', 'Best Investment Returns', 'Expert Property Consultation',
]
// Duplicate for seamless loop
const allItems = [...marqueeItems, ...marqueeItems]

const stats = [
  { num: '500+', label: 'Properties Sold' },
  { num: '1,200+', label: 'Happy Clients' },
  { num: '15+', label: 'Years in Business' },
  { num: '₹500Cr+', label: 'Total Portfolio' },
]

const neighborhoods = [
  { name: 'ECR Road', count: '48 Properties', img: p1 },
  { name: 'OMR Road', count: '72 Properties', img: p2 },
  { name: 'Sholinganallur', count: '31 Properties', img: p3 },
  { name: 'Besant Nagar', count: '19 Properties', img: p4 },
]

export function MarqueeBanner() {
  return (
    <div className="marquee-banner">
      <div className="marquee-track">
        {allItems.map((item, i) => (
          <span className="marquee-item" key={i}>
            {item}
            <span className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  )
}

export function StatsBar() {
  return (
    <section className="stats-bar">
      <div className="container">
        <div className="stats-bar-grid">
          {stats.map((s) => (
            <div className="stats-bar-item" key={s.label}>
              <div className="stats-bar-num">{s.num}</div>
              <div className="stats-bar-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Neighborhoods() {
  return (
    <section className="neighborhoods">
      <div className="container">
        <p className="section-label" style={{ justifyContent: 'center', marginBottom: '12px' }}>Explore by Area</p>
        <h2 className="neighborhoods-title">Prime <span>Neighbourhoods</span></h2>
      </div>
      <div className="neighborhoods-grid">
        {neighborhoods.map((n) => (
          <div className="neighborhood-card" key={n.name}>
            <img src={n.img} alt={n.name} />
            <div className="neighborhood-overlay" />
            <div className="neighborhood-info">
              <div className="neighborhood-name">{n.name}</div>
              <div className="neighborhood-count">{n.count}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
