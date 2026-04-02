import { Link } from 'react-router-dom'
import './About.css'

export default function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>About ECR OMR Real Estates</h1>
          <p>
            We are Chennai’s trusted luxury real estate experts, specializing in the high-growth ECR and OMR corridors.
            With 15+ years of proven track record, we connect buyers, renters, and sellers with premium curated listings and
            end-to-end transaction support.
          </p>
          <p style={{ marginTop: '18px', fontSize: '16px', color: '#d0c8b1' }}>
            Our mission is to make every property move safe, transparent, and success-driven—powered by local expertise,
            verified inventory, and personalised client service.
          </p>
        </div>
      </section>

      <section className="about-values container">
        <h2>Our Promise</h2>
        <div className="about-values-grid">
          <article>
            <h3>Trusted Listings</h3>
            <p>Only verified properties and genuine sellers/landlords in ECR/OMR corridors.</p>
          </article>
          <article>
            <h3>Client-First Service</h3>
            <p>Personalized guidance with transparent pricing and paperwork support.</p>
          </article>
          <article>
            <h3>Local Insights</h3>
            <p>Decades of local market intelligence for investments, rentals, and resale strategy.</p>
          </article>
        </div>
      </section>

      <section className="about-team container">
        <h2>Meet the Team</h2>
        <p>Our team combines strong local insight with premium global best practices to deliver quick, profitable deals and satisfied clients.</p>
        <div className="about-team-grid">
          <article>
            <h4>Ravi Kumar</h4>
            <p>Founder & CEO — 18 years in Chennai residential & commercial markets.</p>
          </article>
          <article>
            <h4>Meena Krishnan</h4>
            <p>Head of Sales — property vetting, investor relations, and portfolio advisory.</p>
          </article>
          <article>
            <h4>Arun Prakash</h4>
            <p>Operations Lead — contracts, due diligence & client happiness.</p>
          </article>
        </div>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </section>
    </main>
  )
}
