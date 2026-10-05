import React, { useState } from 'react';
import { Search, Home, Building2, Warehouse, Store, TreePine, ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HeroSearch({ onSearch, onSelectCategory }) {
  const [leaseType, setLeaseType] = useState('lease'); // lease vs rent
  const [category, setCategory] = useState('residential');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('Any');
  const [minPrice, setMinPrice] = useState('Any');
  const [maxPrice, setMaxPrice] = useState('Any');

  const categories = [
    { id: 'residential', label: 'Residential', desc: 'Houses, Units, Apartments & more', count: '12,458+', icon: <Home size={22} />, class: 'cat-residential' },
    { id: 'commercial', label: 'Commercial', desc: 'Offices, Medical, Showrooms & more', count: '6,214+', icon: <Building2 size={22} />, class: 'cat-commercial' },
    { id: 'industrial', label: 'Industrial', desc: 'Warehouses, Logistics & more', count: '4,892+', icon: <Warehouse size={22} />, class: 'cat-industrial' },
    { id: 'retail', label: 'Retail', desc: 'Shops, Centres, Kiosks & more', count: '2,731+', icon: <Store size={22} />, class: 'cat-retail' },
    { id: 'rural', label: 'Rural', desc: 'Farms, Grazing, Orchards & more', count: '1,246+', icon: <TreePine size={22} />, class: 'cat-rural' }
  ];

  const getSubtypes = () => {
    switch (category) {
      case 'residential': return ['Any', 'House', 'Apartment / Unit', 'Townhouse', 'Studio', 'Room', 'Other'];
      case 'commercial': return ['Any', 'Office', 'Medical', 'Showroom', 'Consulting / Suite', 'Co-working', 'Other'];
      case 'industrial': return ['Any', 'Warehouse', 'Distribution', 'Manufacturing', 'Storage', 'Yard / Hardstand', 'Other'];
      case 'retail': return ['Any', 'Shop / Retail Space', 'Kiosk', 'Food & Beverage', 'Large Format Retail', 'Pop-up / Short Term', 'Other'];
      case 'rural': return ['Any', 'Cropping', 'Grazing', 'Mixed Farming', 'Horticulture / Orchard', 'Vineyard', 'Other'];
      default: return ['Any'];
    }
  };

  const getPriceOptions = () => {
    if (category === 'residential') {
      return ['Any', '200', '400', '600', '800', '1000', '1500'];
    }
    return ['Any', '10000', '30000', '50000', '80000', '120000', '200000', '350000'];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      category,
      location,
      propertyType,
      minPrice: minPrice === 'Any' ? 0 : parseInt(minPrice),
      maxPrice: maxPrice === 'Any' ? Infinity : parseInt(maxPrice),
      leaseType
    });
  };

  const handlePopularSearch = (catId, subType) => {
    onSearch({
      category: catId,
      location: '',
      propertyType: subType,
      minPrice: 0,
      maxPrice: Infinity,
      leaseType: catId === 'residential' ? 'rent' : 'lease'
    });
  };

  return (
    <div>
      {/* Hero Header */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-text">
            <h1>Where Australia <span>Leases.</span></h1>
            <p>
              Residential, commercial, industrial, retail and rural property leases – all in one premium marketplace.
            </p>
          </div>
          <div className="hero-image-card">
            <img 
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800" 
              alt="Beautiful Australian modern property lounge interior" 
            />
          </div>
        </div>
      </section>

      {/* Search Widget Container */}
      <section className="container" style={{ marginTop: '-40px' }}>
        <div className="hero-search-container">
          <div className="search-tabs">
            <button 
              className={`search-tab ${leaseType === 'lease' ? 'active' : ''}`}
              onClick={() => setLeaseType('lease')}
            >
              For Lease
            </button>
            <button 
              className={`search-tab ${leaseType === 'rent' ? 'active' : ''}`}
              onClick={() => setLeaseType('rent')}
            >
              For Rent
            </button>
          </div>

          <form className="search-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>What are you looking for?</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="residential">Residential Rentals</option>
                <option value="commercial">Commercial Leasing</option>
                <option value="industrial">Industrial Leasing</option>
                <option value="retail">Retail Leasing</option>
                <option value="rural">Rural Leasing</option>
              </select>
            </div>

            <div className="form-group">
              <label>Location</label>
              <input 
                type="text" 
                placeholder="Suburb, city or postcode" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Property Type</label>
              <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                {getSubtypes().map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Min Price ({category === 'residential' ? '/wk' : '/yr'})</label>
              <select value={minPrice} onChange={(e) => setMinPrice(e.target.value)}>
                {getPriceOptions().map(price => (
                  <option key={price} value={price}>{price === 'Any' ? 'Any' : `$${parseInt(price).toLocaleString()}`}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Max Price ({category === 'residential' ? '/wk' : '/yr'})</label>
              <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
                {getPriceOptions().map(price => (
                  <option key={price} value={price}>{price === 'Any' ? 'Any' : `$${parseInt(price).toLocaleString()}`}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ height: '48px', padding: '0 28px' }}>
              <Search size={18} />
              <span>Search</span>
            </button>
          </form>
        </div>
      </section>

      {/* Categories Browser Grid */}
      <section className="container">
        <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '56px 0 24px 0' }}>Browse by category</h2>
        <div className="categories-grid">
          {categories.map(cat => (
            <div 
              key={cat.id} 
              className={`category-card ${cat.class}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              <div className="category-icon" style={{ backgroundColor: 'var(--cat-bg)', color: 'var(--cat-color)' }}>
                {cat.icon}
              </div>
              <h3>{cat.label}</h3>
              <p>{cat.desc}</p>
              <span>{cat.count} listings &rarr;</span>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Searches */}
      <section className="container popular-searches">
        <h4>Popular searches</h4>
        <div className="popular-tags">
          <button className="tag-btn" onClick={() => handlePopularSearch('residential', 'House')}>Houses for rent</button>
          <button className="tag-btn" onClick={() => handlePopularSearch('residential', 'Apartment / Unit')}>Apartments for rent</button>
          <button className="tag-btn" onClick={() => handlePopularSearch('commercial', 'Office')}>Office space for lease</button>
          <button className="tag-btn" onClick={() => handlePopularSearch('industrial', 'Warehouse')}>Warehouses for lease</button>
          <button className="tag-btn" onClick={() => handlePopularSearch('retail', 'Shop / Retail Space')}>Retail space for lease</button>
          <button className="tag-btn" onClick={() => handlePopularSearch('rural', 'Grazing')}>Farms for lease</button>
        </div>
      </section>

      {/* Premium Badging and Trust rows */}
      <section className="container feature-info-row">
        <div className="feature-info-item">
          <div className="feature-info-icon"><Search size={28} /></div>
          <div className="feature-info-text">
            <h5>Easy search</h5>
            <p>Find the right leasing property fast with refined criteria.</p>
          </div>
        </div>
        <div className="feature-info-item">
          <div className="feature-info-icon"><ShieldCheck size={28} /></div>
          <div className="feature-info-text">
            <h5>Verified listings</h5>
            <p>Quality checked and managed by professional agencies.</p>
          </div>
        </div>
        <div className="feature-info-item">
          <div className="feature-info-icon"><Heart size={28} /></div>
          <div className="feature-info-text">
            <h5>Save & compare</h5>
            <p>Shortlist and track detailed listings in one central dashboard.</p>
          </div>
        </div>
        <div className="feature-info-item">
          <div className="feature-info-icon"><CheckCircle2 size={28} /></div>
          <div className="feature-info-text">
            <h5>Apply online</h5>
            <p>Quick, secure leasing applications sent directly to agents.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
