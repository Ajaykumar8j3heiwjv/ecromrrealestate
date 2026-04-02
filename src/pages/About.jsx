import { Link } from 'react-router-dom'
import './About.css'

export default function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>About ECR OMR Real Estates</h1>
          <p>
            We are Chennai's premier luxury real estate marketplace, specializing in ECR and OMR properties. 
            With over 15 years of experience, we deliver trusted advisory, end-to-end transactions, and a curated portfolio.
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
        <p>Our experts are from top brokerage backgrounds with deep presence in Chennai markets. We are ready to assist you at every step.</p>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </section>
    </main>
  )
}
