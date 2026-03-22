import './Testimonials.css'

const testimonials = [
  {
    id: 1,
    text: "ECR OMR Real Estates made buying our dream villa an effortless experience. Their market knowledge of the ECR corridor is unmatched, and the level of personal attention was truly outstanding.",
    author: 'Aravind Krishnamurthy',
    role: 'Villa Owner, ECR Thiruvanmiyur',
    initial: 'A',
  },
  {
    id: 2,
    text: "We sold our OMR apartment within 3 weeks at a premium price. The team's handling of paperwork and negotiations was flawless. Highly recommend to anyone looking for a serious real estate partner.",
    author: 'Priya Natarajan',
    role: 'Property Investor, OMR Sholinganallur',
    initial: 'P',
  },
  {
    id: 3,
    text: "From the very first consultation to the final handover, every step was handled with professionalism and honesty. ECR OMR Realty genuinely looks out for your best interest.",
    author: 'Suresh Venkataraman',
    role: 'Apartment Buyer, OMR Perungudi',
    initial: 'S',
  },
]

const StarIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

export default function Testimonials() {
  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        <div className="testimonials-header">
          <p className="section-label">Client Stories</p>
          <h2 className="testimonials-title">
            What Our <span>Clients Say</span>
          </h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.id} id={`testimonial-${t.id}`}>
              <div className="testimonial-quote">"</div>
              <div className="testimonial-stars">
                {[1,2,3,4,5].map((i) => <StarIcon key={i} />)}
              </div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initial}</div>
                <div>
                  <div className="testimonial-name">{t.author}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
