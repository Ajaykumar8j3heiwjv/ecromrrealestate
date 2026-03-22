import './WhyChooseUs.css'
import p2 from '../assets/property_2.png'

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Verified Listings',
    desc: 'Every property is personally verified by our expert team.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: '15+ Years Expertise',
    desc: 'A decade and a half of unmatched market knowledge.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: '1200+ Happy Clients',
    desc: 'Trusted by families and investors across Chennai.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: 'Best Price Guarantee',
    desc: 'We negotiate the finest deals to maximise your value.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="why section" id="about">
      <div className="container">
        <div className="why-inner">
          <div className="why-left">
            <p className="section-label why-label">Why ECR OMR Realty</p>
            <h2 className="why-title">
              The Gold Standard in<br />
              <span>Luxury Real Estate</span>
            </h2>
            <p className="why-desc">
              We combine deep local expertise with an unwavering commitment to excellence — delivering a bespoke property experience unlike any other in Chennai's premier ECR &amp; OMR belt.
            </p>
            <div className="why-features">
              {features.map((f) => (
                <div className="why-feature" key={f.title}>
                  <div className="why-feature-icon">{f.icon}</div>
                  <h4 className="why-feature-title">{f.title}</h4>
                  <p className="why-feature-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="why-right">
            <img src={p2} alt="Luxury villa ECR OMR" className="why-img-main" />
            <div className="why-img-badge">
              <div className="why-img-badge-num">15+</div>
              <div className="why-img-badge-text">Years of Trust</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
