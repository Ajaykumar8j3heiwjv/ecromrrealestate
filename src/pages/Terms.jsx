import { Link } from 'react-router-dom'
import './About.css'

export default function Terms() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>Terms of Service</h1>
          <p>By using ECR OMR Real Estates, you agree to our terms and conditions.</p>
          <Link to="/" className="btn-primary">Back to Home</Link>
        </div>
      </section>
    </main>
  )
}
