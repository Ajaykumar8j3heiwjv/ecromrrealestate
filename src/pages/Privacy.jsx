import { Link } from 'react-router-dom'
import './About.css'

export default function Privacy() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>We respect your privacy. This policy explains how we handle your data for ecrOMRRealEstate.</p>
          <Link to="/" className="btn-primary">Back to Home</Link>
        </div>
      </section>
    </main>
  )
}
