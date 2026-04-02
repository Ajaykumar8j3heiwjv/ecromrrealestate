import { Link } from 'react-router-dom'
import './About.css'

export default function Terms() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>Terms of Service</h1>
          <p>
            Welcome to ECR OMR Real Estates. These Terms of Service govern your use of our website and services.
            By accessing this site, you accept these terms in full.
          </p>
          <div style={{ textAlign: 'left', marginTop: '20px', lineHeight: 1.7, color: '#ddd' }}>
            <h3>Use of Service</h3>
            <p>You may use our platform to browse properties, submit enquiries, and engage with our team.</p>
            <h3>User Responsibilities</h3>
            <ul>
              <li>Provide accurate information when creating enquiries.</li>
              <li>Respect copyright and property data provided on the site.</li>
              <li>Do not misuse or attempt to disrupt service operations.</li>
            </ul>
            <h3>Listings</h3>
            <p>All listings are subject to availability and may be changed or removed at any time without notice.</p>
            <h3>Limitation of Liability</h3>
            <p>We are not responsible for third-party property deals or legal outcomes. Always conduct due diligence.</p>
          </div>
          <Link to="/" className="btn-primary" style={{ marginTop: '18px' }}>Back to Home</Link>
        </div>
      </section>
    </main>
  )
}
