import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Calendar, Mail, Phone, Printer, ArrowLeft, Heart, Compass, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { db } from '../services/db';

export default function ListingDetails({ listing, onBack, savedListings, onToggleSave }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // 360 virtual tour simulation states
  const [panOffset, setPanOffset] = useState(50); // percentage 0 - 100
  const isDragging = useRef(false);
  const startX = useRef(0);

  // Enquiry states
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryEmail, setEnquiryEmail] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryMessage, setEnquiryMessage] = useState("Hi, I'm interested in this property. I would like to explore options or schedule a viewing.");
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  useEffect(() => {
    if (listing) {
      // Increment views count on entry
      db.incrementViews(listing.id);
      setActiveImageIndex(0);
      setEnquirySubmitted(false);

      // Inject SEO Schema Markup dynamically
      const scriptId = `seo-schema-listing-${listing.id}`;
      let scriptEl = document.getElementById(scriptId);
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = scriptId;
        scriptEl.type = 'application/ld+json';
        
        const schema = {
          "@context": "https://schema.org",
          "@type": listing.category === 'residential' ? "SingleFamilyResidence" : "CommercialProperties",
          "name": listing.title,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": listing.address,
            "addressLocality": listing.suburb,
            "addressRegion": listing.state,
            "postalCode": listing.postcode,
            "addressCountry": "AU"
          },
          "image": listing.images,
          "description": listing.description,
          "offers": {
            "@type": "Offer",
            "price": listing.price,
            "priceCurrency": "AUD",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": listing.price,
              "priceCurrency": "AUD",
              "referenceQuantity": {
                "@type": "QuantitativeValue",
                "value": 1,
                "unitCode": listing.category === 'residential' ? "WUR" : "ANN" // week vs annum
              }
            }
          }
        };

        scriptEl.innerHTML = JSON.stringify(schema);
        document.head.appendChild(scriptEl);
      }

      return () => {
        const scriptElToRemove = document.getElementById(scriptId);
        if (scriptElToRemove) {
          scriptElToRemove.remove();
        }
      };
    }
  }, [listing]);

  if (!listing) return null;

  const isSaved = savedListings.some(sl => sl.id === listing.id);

  // 360 Tour Drag Handlers
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startX.current;
    startX.current = e.clientX;
    // Map movement to background position offset percentage
    setPanOffset(prev => {
      let next = prev - deltaX * 0.15;
      if (next < 0) next = 100;
      if (next > 100) next = 0;
      return next;
    });
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  // Printable Floor Plan Action
  const handlePrintFloorplan = () => {
    window.print();
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    db.submitEnquiry({
      listingId: listing.id,
      listingTitle: listing.title,
      name: enquiryName,
      email: enquiryEmail,
      phone: enquiryPhone,
      message: enquiryMessage,
      agentId: listing.agentId
    });
    setEnquirySubmitted(true);
    setEnquiryName('');
    setEnquiryEmail('');
    setEnquiryPhone('');
  };

  return (
    <div className="container property-details-layout">
      {/* Back navigation & Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }} className="no-print">
        <button className="btn btn-secondary" onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ArrowLeft size={16} />
          <span>Back to search</span>
        </button>
        <button 
          className={`btn btn-white ${isSaved ? 'saved' : ''}`} 
          onClick={() => onToggleSave(listing)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Heart size={16} fill={isSaved ? "#EF4444" : "none"} color={isSaved ? "#EF4444" : "currentColor"} />
          <span>{isSaved ? 'Saved' : 'Save Property'}</span>
        </button>
      </div>

      {/* Title & Price Header */}
      <div className="property-details-header">
        <div className="property-title-area">
          <h1>{listing.title}</h1>
          <p>
            <MapPin size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
            {listing.address}
          </p>
        </div>
        <div className="property-price-area">
          <div className="property-price-value">${listing.price.toLocaleString()}</div>
          <div className="property-price-label">
            {listing.category === 'residential' ? 'Per Week' : 'Per Annum + Outgoings'}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="gallery-container no-print">
        <div className="main-image">
          <img src={listing.images[activeImageIndex]} alt={`${listing.title} Main`} />
          
          {/* Navigation indicators */}
          {listing.images.length > 1 && (
            <>
              <button 
                onClick={() => setActiveImageIndex(prev => (prev === 0 ? listing.images.length - 1 : prev - 1))}
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => setActiveImageIndex(prev => (prev === listing.images.length - 1 ? 0 : prev + 1))}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
        
        {/* Thumbnails */}
        <div className="thumb-images">
          {listing.images.map((img, idx) => (
            <div 
              key={idx} 
              className={`thumb-image ${activeImageIndex === idx ? 'active' : ''}`}
              onClick={() => setActiveImageIndex(idx)}
              style={{ border: activeImageIndex === idx ? '3px solid var(--color-primary)' : 'none' }}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Main content splitter */}
      <div className="property-info-grid">
        
        {/* Left main pane */}
        <div>
          {/* Spec details card */}
          <div className="property-description">
            <h3>Property Specifications</h3>
            <div className="property-specs">
              {listing.category === 'residential' ? (
                <>
                  <div className="spec-item">
                    <span>{listing.bedrooms}</span>
                    <span>Bedrooms</span>
                  </div>
                  <div className="spec-item">
                    <span>{listing.bathrooms}</span>
                    <span>Bathrooms</span>
                  </div>
                  <div className="spec-item">
                    <span>{listing.carSpaces}</span>
                    <span>Car Spaces</span>
                  </div>
                  <div className="spec-item">
                    <span>{listing.propertyType}</span>
                    <span>Type</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="spec-item">
                    <span>{listing.area || listing.buildingArea || listing.landSize || '150'} {listing.category === 'rural' ? 'ha' : 'm²'}</span>
                    <span>{listing.category === 'rural' ? 'Land Size' : 'Internal Area'}</span>
                  </div>
                  {listing.landArea && (
                    <div className="spec-item">
                      <span>{listing.landArea} m²</span>
                      <span>Total Land</span>
                    </div>
                  )}
                  {listing.clearHeight && (
                    <div className="spec-item">
                      <span>{listing.clearHeight}</span>
                      <span>Clear Height</span>
                    </div>
                  )}
                  <div className="spec-item">
                    <span>{listing.propertyType}</span>
                    <span>Property Sector</span>
                  </div>
                </>
              )}
            </div>

            <h3>Description</h3>
            <p>{listing.description}</p>

            <h3>Key Features</h3>
            <div className="features-details-grid">
              {listing.features.map((feat, index) => (
                <div key={index} className="feature-detail-item">
                  <CheckCircle2 size={16} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 360 Virtual Tour Simulator */}
          <div className="virtual-tour-section no-print">
            <h3>Interactive 360° Virtual Tour</h3>
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
              Drag your mouse across the image below to look around the property interior.
            </p>
            <div className="virtual-tour-viewer">
              <div className="tour-instructions">
                <Compass size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                <span>Simulated 360° View</span>
              </div>
              <div 
                className="tour-canvas-sim"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                style={{
                  backgroundImage: `url(${listing.images[1] || listing.images[0]})`,
                  backgroundPosition: `${panOffset}% center`
                }}
              />
            </div>
          </div>

          {/* Printable Floor Plan */}
          <div className="floorplan-section">
            <div className="floorplan-header no-print">
              <h3>Floor Plan</h3>
              <button className="btn btn-secondary" onClick={handlePrintFloorplan}>
                <Printer size={16} />
                <span>Print Floor Plan</span>
              </button>
            </div>
            
            <div className="floorplan-canvas">
              {/* Styled SVG Vector Floor Plan */}
              <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* External Walls */}
                <rect x="20" y="20" width="360" height="260" stroke="#000" strokeWidth="4" />
                
                {/* Rooms Partition Walls */}
                <line x1="160" y1="20" x2="160" y2="280" stroke="#000" strokeWidth="3" />
                <line x1="160" y1="160" x2="380" y2="160" stroke="#000" strokeWidth="3" />
                <line x1="20" y1="120" x2="160" y2="120" stroke="#000" strokeWidth="3" />
                
                {/* Doors indications */}
                <path d="M 160 90 A 30 30 0 0 1 130 120" stroke="#64748B" strokeWidth="2" strokeDasharray="3 3" />
                <path d="M 230 160 A 30 30 0 0 1 200 130" stroke="#64748B" strokeWidth="2" strokeDasharray="3 3" />

                {/* Text Labels */}
                <text x="90" y="70" fill="#0B2B8F" fontWeight="bold" textAnchor="middle">BEDROOM 1</text>
                <text x="90" y="210" fill="#0B2B8F" fontWeight="bold" textAnchor="middle">LIVING AREA</text>
                <text x="270" y="90" fill="#0B2B8F" fontWeight="bold" textAnchor="middle">KITCHEN</text>
                <text x="270" y="220" fill="#0B2B8F" fontWeight="bold" textAnchor="middle">BATHROOM</text>
                
                {/* North Pointer */}
                <g transform="translate(340, 50)">
                  <circle cx="0" cy="0" r="15" stroke="#64748B" strokeWidth="1" />
                  <line x1="0" y1="15" x2="0" y2="-15" stroke="#000" strokeWidth="2" />
                  <polyline points="-5,-5 0,-15 5,-5" stroke="#000" strokeWidth="2" fill="#000" />
                  <text x="0" y="-18" fontSize="10" fill="#000" textAnchor="middle">N</text>
                </g>
              </svg>
            </div>
            <p className="no-print" style={{ fontSize: '12px', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: '12px' }}>
              Dimensions are illustrative and for guide purposes only.
            </p>
          </div>
        </div>

        {/* Right Sidebar Agent Info */}
        <aside className="agent-contact-sidebar no-print">
          <div className="agent-profile-card">
            <div className="agent-avatar-large">
              {listing.agentName ? listing.agentName.split(' ').map(n=>n[0]).join('') : 'AM'}
            </div>
            <h4>{listing.agentName}</h4>
            <p>Mercer Partners Agency</p>
            
            <a href={`tel:${listing.agentPhone}`} className="agent-phone-link">
              <Phone size={16} />
              <span>{listing.agentPhone}</span>
            </a>

            {/* Enquiry Form Panel */}
            <div className="enquiry-form">
              <h5>Enquire about this property</h5>
              {enquirySubmitted ? (
                <div style={{
                  padding: '16px',
                  backgroundColor: 'rgba(16,185,129,0.08)',
                  color: '#10B981',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  textAlign: 'center'
                }}>
                  Thank you! Your enquiry has been submitted. The agent will contact you shortly.
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit}>
                  <div className="form-group">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      value={enquiryEmail}
                      onChange={(e) => setEnquiryEmail(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      value={enquiryPhone}
                      onChange={(e) => setEnquiryPhone(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <textarea 
                      placeholder="Your Message..." 
                      value={enquiryMessage}
                      onChange={(e) => setEnquiryMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    <Mail size={16} />
                    <span>Send Enquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
