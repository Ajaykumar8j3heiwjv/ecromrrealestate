import { Link } from 'react-router-dom'
import './About.css'

export default function Disclaimer() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>Disclaimer</h1>
          <p>Information provided on this site is for reference only. We do not guarantee property availability or outcomes.</p>
          <Link to="/" className="btn-primary">Back to Home</Link>
        </div>
      </section>
    </main>
  )
}
