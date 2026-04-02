import { Link } from 'react-router-dom'
import './About.css'

export default function Disclaimer() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>Disclaimer</h1>
          <p>
            The information on ECR OMR Real Estates is provided for general guidance and promotional purposes.
            While we aim for accuracy, we do not guarantee property availability, prices, or outcomes.
          </p>
          <div style={{ textAlign: 'left', marginTop: '20px', lineHeight: 1.7, color: '#ddd' }}>
            <h3>Accuracy</h3>
            <p>All details are based on data supplied by third-party owners/agents and may change without notice.</p>
            <h3>No financial advice</h3>
            <p>This website is not a substitute for professional legal, tax, or investment advice. Consult a qualified advisor before taking action.</p>
            <h3>External links</h3>
            <p>We may link to third-party sites. We are not responsible for their content or privacy practices.</p>
            <h3>Use at your own risk</h3>
            <p>Use of this site is at your own risk. We disclaim liability for any direct, indirect or consequential losses.</p>
          </div>
          <Link to="/" className="btn-primary" style={{ marginTop: '18px' }}>Back to Home</Link>
        </div>
      </section>
    </main>
  )
}
