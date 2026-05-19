import React, { useRef } from 'react';
import './StoreGallery.css';

const storeImages = [
  {
    local: "/images/store-1.jpg",
    fallback: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=700&q=80"
  },
  {
    local: "/images/store-2.jpg",
    fallback: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=700&q=80"
  },
  {
    local: "/images/store-3.jpg",
    fallback: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=700&q=80"
  },
  {
    local: "/images/store-4.jpg",
    fallback: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=700&q=80"
  }
];

export default function StoreGallery() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = current.clientWidth * 0.8;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="store-gallery">
      <div className="container">
        <div className="store-gallery-header">
          <h2 className="store-gallery-title">Visit Our <span>Shop</span></h2>
          <p className="store-gallery-desc">Take a look inside our office and see where the magic happens.</p>
        </div>

        <div className="gallery-wrapper">
          <button className="gallery-arrow left-arrow" onClick={() => scroll('left')} aria-label="Scroll left">
            &#10094;
          </button>

          <div className="gallery-scroll-container" ref={scrollRef}>
            {storeImages.map((img, index) => (
              <div key={index} className="gallery-item">
                <img 
                  src={img.local} 
                  alt={`Store view ${index + 1}`} 
                  loading="lazy" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = img.fallback;
                  }}
                />
              </div>
            ))}
          </div>

          <button className="gallery-arrow right-arrow" onClick={() => scroll('right')} aria-label="Scroll right">
            &#10095;
          </button>
        </div>
      </div>
    </section>
  );
}
