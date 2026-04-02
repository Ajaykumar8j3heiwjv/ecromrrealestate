import { Link } from 'react-router-dom'
import './About.css'

export default function Privacy() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>
            At ECR OMR Real Estates, your privacy matters. We handle all personal information with strict confidentiality and 
            only use it to provide superior property matching, customer service and communication.
          </p>
          <div style={{ textAlign: 'left', marginTop: '20px', lineHeight: 1.7, color: '#ddd' }}>
            <h3>What we collect</h3>
            <ul>
              <li>Contact details (name, email, phone)</li>
              <li>Search preferences and property requirements</li>
              <li>Saved property interactions and enquiry history</li>
            </ul>
            <h3>How we use your data</h3>
            <ul>
              <li>To send property recommendations and updates</li>
              <li>To communicate directly about listings and site services</li>
              <li>To improve our website and personalized experience</li>
            </ul>
            <h3>Data security</h3>
            <p>We use secure storage and industry-standard safeguards to protect data integrity and confidentiality.</p>
            <h3>Sharing policy</h3>
            <p>We never sell your personal data. We may share it only with trusted service providers directly involved in your transaction.</p>
          </div>
          <Link to="/" className="btn-primary" style={{ marginTop: '18px' }}>Back to Home</Link>
        </div>
      </section>
    </main>
  )
}
