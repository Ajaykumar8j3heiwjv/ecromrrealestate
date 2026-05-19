import React, { useState } from 'react'
import './BusinessCard.css'

const cardImages = [
  "/BC_front (1).jpeg",
  "/BC_back.jpeg"
]

export default function BusinessCard() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? cardImages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === cardImages.length - 1 ? 0 : prev + 1))
  }

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

      {/* Business Card Slider */}
      <div className="bc-carousel-wrapper">
        <button className="bc-arrow left-arrow" onClick={handlePrev} aria-label="Previous card side">
          &#10094;
        </button>

        <div className="bc-card-container">
          {cardImages.map((src, index) => (
            <div 
              key={index} 
              className={`bc-slide ${index === currentIndex ? 'active' : ''}`}
            >
              <img 
                src={src} 
                alt={`Business Card ${index === 0 ? 'Front' : 'Back'}`} 
                className="bc-image"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <button className="bc-arrow right-arrow" onClick={handleNext} aria-label="Next card side">
          &#10095;
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="bc-dots">
        {cardImages.map((_, index) => (
          <button
            key={index}
            className={`bc-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to side ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
