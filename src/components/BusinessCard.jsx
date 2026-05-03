import './BusinessCard.css'

export default function BusinessCard() {
  return (
    <section className="business-card-section">
      <div className="container">
        <p className="section-label" style={{ justifyContent: 'center', marginBottom: '12px' }}>
          Our Identity
        </p>
        <h2 className="bc-section-title">
          Meet <span>ECR OMR</span> Real Estates
        </h2>
      </div>

      {/* Business Card Image */}
      <div className="bc-wrapper">
        <img 
          src="/BussinessCard.jpeg" 
          alt="ECR OMR Real Estates Business Card" 
          className="bc-image"
          loading="lazy"
        />
      </div>
    </section>
  )
}
