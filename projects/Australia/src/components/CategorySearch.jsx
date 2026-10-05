import React, { useState, useEffect } from 'react';
import { Search, Heart, MapPin, Eye, Scaling, Compass, ArrowUpDown, ChevronDown, Check } from 'lucide-react';
import { db } from '../services/db';

export default function CategorySearch({ category, initialFilters, onSelectListing, savedListings, onToggleSave }) {
  const [location, setLocation] = useState(initialFilters?.location || '');
  const [selectedSubtypes, setSelectedSubtypes] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [beds, setBeds] = useState('Any');
  const [baths, setBaths] = useState('Any');
  const [cars, setCars] = useState('Any');
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');
  const [minLand, setMinLand] = useState('');
  const [maxLand, setMaxLand] = useState('');
  const [clearHeight, setClearHeight] = useState('Any');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [sortBy, setSortBy] = useState('Newest');
  const [listings, setListings] = useState([]);

  // Load properties based on filters
  const applyFilters = () => {
    let all = db.getListings().filter(l => l.category === category && l.status === 'approved');

    // Filter by location (suburb, city, state, or postcode)
    if (location.trim()) {
      const locLower = location.toLowerCase();
      all = all.filter(l => 
        l.suburb.toLowerCase().includes(locLower) ||
        l.city.toLowerCase().includes(locLower) ||
        l.state.toLowerCase().includes(locLower) ||
        l.postcode.includes(locLower) ||
        l.address.toLowerCase().includes(locLower)
      );
    }

    // Filter by selected property subtypes
    if (selectedSubtypes.length > 0) {
      all = all.filter(l => selectedSubtypes.includes(l.propertyType));
    }

    // Price Filtering
    const maxVal = category === 'residential' ? 2000 : 500000;
    const isMaxAny = priceRange.max >= maxVal;
    all = all.filter(l => {
      const p = l.price;
      return p >= priceRange.min && (isMaxAny ? true : p <= priceRange.max);
    });

    // Residential Specifics
    if (category === 'residential') {
      if (beds !== 'Any') {
        const count = parseInt(beds);
        all = all.filter(l => count === 5 ? l.bedrooms >= 5 : l.bedrooms === count);
      }
      if (baths !== 'Any') {
        const count = parseInt(baths);
        all = all.filter(l => l.bathrooms >= count);
      }
      if (cars !== 'Any') {
        const count = parseInt(cars);
        all = all.filter(l => l.carSpaces >= count);
      }
    }

    // Areas
    if (category === 'commercial' || category === 'retail') {
      if (minArea) all = all.filter(l => l.area >= parseInt(minArea));
      if (maxArea) all = all.filter(l => l.area <= parseInt(maxArea));
    }

    if (category === 'industrial') {
      if (minArea) all = all.filter(l => l.buildingArea >= parseInt(minArea));
      if (maxArea) all = all.filter(l => l.buildingArea <= parseInt(maxArea));
      if (minLand) all = all.filter(l => l.landArea >= parseInt(minLand));
      if (maxLand) all = all.filter(l => l.landArea <= parseInt(maxLand));
      if (clearHeight !== 'Any') {
        all = all.filter(l => l.clearHeight === clearHeight);
      }
    }

    if (category === 'rural') {
      if (minLand) all = all.filter(l => l.landSize >= parseInt(minLand));
      if (maxLand) all = all.filter(l => l.landSize <= parseInt(maxLand));
    }

    // Features multi-select
    if (selectedFeatures.length > 0) {
      all = all.filter(l => 
        selectedFeatures.every(f => l.features.some(lf => lf.toLowerCase().includes(f.toLowerCase())))
      );
    }

    // Sort Results
    if (sortBy === 'Newest') {
      all.sort((a, b) => b.isNew - a.isNew);
    } else if (sortBy === 'PriceLowHigh') {
      all.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'PriceHighLow') {
      all.sort((a, b) => b.price - a.price);
    }

    setListings(all);
  };

  useEffect(() => {
    // Reset category filters when category changes
    setSelectedSubtypes([]);
    setSelectedFeatures([]);
    setBeds('Any');
    setBaths('Any');
    setCars('Any');
    setMinArea('');
    setMaxArea('');
    setMinLand('');
    setMaxLand('');
    setClearHeight('Any');
    const maxVal = category === 'residential' ? 2000 : 500000;
    setPriceRange({ min: 0, max: maxVal });
    
    if (initialFilters?.location) {
      setLocation(initialFilters.location);
    }
  }, [category]);

  useEffect(() => {
    applyFilters();
  }, [category, location, selectedSubtypes, priceRange, beds, baths, cars, minArea, maxArea, minLand, maxLand, clearHeight, selectedFeatures, sortBy]);

  const handleSubtypeToggle = (type) => {
    setSelectedSubtypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleFeatureToggle = (feature) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const handleClearAll = () => {
    setLocation('');
    setSelectedSubtypes([]);
    setSelectedFeatures([]);
    setBeds('Any');
    setBaths('Any');
    setCars('Any');
    setMinArea('');
    setMaxArea('');
    setMinLand('');
    setMaxLand('');
    setClearHeight('Any');
    const maxVal = category === 'residential' ? 2000 : 500000;
    setPriceRange({ min: 0, max: maxVal });
  };

  const getSubtypeLabels = () => {
    switch (category) {
      case 'residential': return ['House', 'Apartment / Unit', 'Townhouse', 'Studio', 'Room', 'Other'];
      case 'commercial': return ['Office', 'Medical', 'Showroom', 'Consulting / Suite', 'Co-working', 'Other'];
      case 'industrial': return ['Warehouse', 'Distribution', 'Manufacturing', 'Storage', 'Yard / Hardstand', 'Other'];
      case 'retail': return ['Shop / Retail Space', 'Kiosk', 'Food & Beverage', 'Large Format Retail', 'Pop-up / Short Term', 'Other'];
      case 'rural': return ['Cropping', 'Grazing', 'Mixed Farming', 'Horticulture / Orchard', 'Vineyard', 'Other'];
      default: return [];
    }
  };

  const getFeatureOptions = () => {
    switch (category) {
      case 'residential': return ['Pets allowed', 'Furnished', 'Air conditioning', 'Heating', 'Balcony'];
      case 'commercial': return ['Air conditioning', 'Lift', 'Parking', 'Disabled access', 'Fibre Internet'];
      case 'industrial': return ['Container access', 'Truck access', 'Drive-through', '3-phase power', 'Gated security'];
      case 'retail': return ['High foot traffic', 'Parking', 'Food court nearby', 'Outdoor area', 'Grease trap'];
      case 'rural': return ['Water licence', 'Fencing', 'Dwelling included', 'Sheds', 'Irrigation'];
      default: return [];
    }
  };

  const getCategoryClass = () => {
    switch (category) {
      case 'residential': return 'cat-residential';
      case 'commercial': return 'cat-commercial';
      case 'industrial': return 'cat-industrial';
      case 'retail': return 'cat-retail';
      case 'rural': return 'cat-rural';
      default: return '';
    }
  };

  const getPriceMultiplierLabel = () => {
    return category === 'residential' ? 'per week' : 'p.a. + Outgoings';
  };

  return (
    <div className={`container search-screen ${getCategoryClass()}`}>
      {/* Header Row */}
      <div className="search-header-bar">
        <div className="category-badge-main" style={{ backgroundColor: 'var(--cat-bg)', color: 'var(--cat-color)' }}>
          <span style={{ fontSize: '20px' }}>
            {category === 'residential' && '🏠'}
            {category === 'commercial' && '🏢'}
            {category === 'industrial' && '🏭'}
            {category === 'retail' && '🛒'}
            {category === 'rural' && '🌾'}
          </span>
          <span style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>{category}</span>
        </div>
        <div style={{ flexGrow: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '15px', color: 'var(--color-text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search suburb, city, postcode or address..." 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{
              width: '100%',
              height: '48px',
              paddingLeft: '48px',
              borderRadius: '30px',
              border: '1px solid var(--color-border)',
              outline: 'none',
              fontFamily: 'var(--font-main)',
              fontSize: '15px',
              backgroundColor: 'var(--color-bg-white)',
              boxShadow: 'var(--color-card-shadow)'
            }}
          />
        </div>
        <button className="btn btn-secondary" onClick={handleClearAll}>Clear All</button>
      </div>

      {/* Main Layout Grid */}
      <div className="search-layout">
        
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          {/* Subtypes Checkboxes */}
          <div className="filter-section">
            <h4>Property Type</h4>
            <div className="checkbox-list">
              {getSubtypeLabels().map(type => (
                <label key={type} className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={selectedSubtypes.includes(type)}
                    onChange={() => handleSubtypeToggle(type)}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Residential Bedrooms / Bathrooms */}
          {category === 'residential' && (
            <>
              <div className="filter-section">
                <h4>Bedrooms</h4>
                <div className="bed-bath-selector">
                  {['Any', '1', '2', '3', '4', '5+'].map(val => (
                    <button 
                      key={val} 
                      className={`selector-option ${beds === val ? 'active' : ''}`}
                      onClick={() => setBeds(val)}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-section">
                <h4>Bathrooms</h4>
                <div className="bed-bath-selector">
                  {['Any', '1', '2', '3', '4+'].map(val => (
                    <button 
                      key={val} 
                      className={`selector-option ${baths === val ? 'active' : ''}`}
                      onClick={() => setBaths(val)}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-section">
                <h4>Car Spaces</h4>
                <div className="bed-bath-selector">
                  {['Any', '1', '2', '3', '4+'].map(val => (
                    <button 
                      key={val} 
                      className={`selector-option ${cars === val ? 'active' : ''}`}
                      onClick={() => setCars(val)}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Area Inputs (Commercial / Retail / Industrial) */}
          {(category === 'commercial' || category === 'retail') && (
            <div className="filter-section">
              <h4>Area (m²)</h4>
              <div className="slider-inputs">
                <input 
                  type="number" 
                  placeholder="Min m²" 
                  value={minArea}
                  onChange={(e) => setMinArea(e.target.value)}
                />
                <input 
                  type="number" 
                  placeholder="Max m²" 
                  value={maxArea}
                  onChange={(e) => setMaxArea(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Industrial Area & Land */}
          {category === 'industrial' && (
            <>
              <div className="filter-section">
                <h4>Building Area (m²)</h4>
                <div className="slider-inputs">
                  <input type="number" placeholder="Min m²" value={minArea} onChange={(e) => setMinArea(e.target.value)} />
                  <input type="number" placeholder="Max m²" value={maxArea} onChange={(e) => setMaxArea(e.target.value)} />
                </div>
              </div>
              <div className="filter-section">
                <h4>Land Area (m²)</h4>
                <div className="slider-inputs">
                  <input type="number" placeholder="Min m²" value={minLand} onChange={(e) => setMinLand(e.target.value)} />
                  <input type="number" placeholder="Max m²" value={maxLand} onChange={(e) => setMaxLand(e.target.value)} />
                </div>
              </div>
              <div className="filter-section">
                <h4>Clear Height</h4>
                <select 
                  value={clearHeight} 
                  onChange={(e) => setClearHeight(e.target.value)}
                  style={{ width: '100%', height: '38px', borderRadius: '8px', padding: '0 8px', border: '1px solid var(--color-border)' }}
                >
                  <option value="Any">Any</option>
                  <option value="7m">7m</option>
                  <option value="8m">8m</option>
                  <option value="9m">9m</option>
                </select>
              </div>
            </>
          )}

          {/* Rural Land size */}
          {category === 'rural' && (
            <div className="filter-section">
              <h4>Land Size (Hectares)</h4>
              <div className="slider-inputs">
                <input type="number" placeholder="Min ha" value={minLand} onChange={(e) => setMinLand(e.target.value)} />
                <input type="number" placeholder="Max ha" value={maxLand} onChange={(e) => setMaxLand(e.target.value)} />
              </div>
            </div>
          )}

          {/* Price Range Slider */}
          <div className="filter-section">
            <h4>Price {category === 'residential' ? '/ week' : 'per annum'}</h4>
            <div className="price-slider-group">
              <input 
                type="range" 
                min="0" 
                max={category === 'residential' ? "2000" : "500000"} 
                step={category === 'residential' ? "50" : "10000"}
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--color-primary)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                <span>$0</span>
                <span>
                  Max: {priceRange.max >= (category === 'residential' ? 2000 : 500000) ? 'Any' : `$${priceRange.max.toLocaleString()}`}
                </span>
              </div>
            </div>
          </div>

          {/* Additional Features Checkboxes */}
          <div className="filter-section">
            <h4>Features</h4>
            <div className="checkbox-list">
              {getFeatureOptions().map(feature => (
                <label key={feature} className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={selectedFeatures.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                  />
                  <span>{feature}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Listings Display Grid */}
        <main>
          <div className="listings-container-header">
            <span style={{ fontSize: '15px', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              {listings.length} properties found
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Sort by:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  border: '1px solid var(--color-border)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-main)',
                  fontWeight: 600,
                  outline: 'none'
                }}
              >
                <option value="Newest">Newest First</option>
                <option value="PriceLowHigh">Price: Low to High</option>
                <option value="PriceHighLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          {listings.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '64px 24px',
              backgroundColor: 'var(--color-bg-white)',
              borderRadius: 'var(--border-radius)',
              border: '1px solid var(--color-border)'
            }}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>No listings matched your criteria</h3>
              <p style={{ color: 'var(--color-text-muted)' }}>Try adjusting your filters, location keyword, or clear all filters to start fresh.</p>
            </div>
          ) : (
            <div className="listings-grid">
              {listings.map(l => {
                const isSaved = savedListings.some(sl => sl.id === l.id);
                return (
                  <div key={l.id} className="listing-card">
                    {/* Media Block */}
                    <div className="listing-image-wrapper">
                      <img src={l.images[0]} alt={l.title} />
                      {l.isNew && <span className="badge-new">New</span>}
                      {l.featured && <span className="badge-featured">Featured</span>}
                      <button 
                        className={`heart-btn ${isSaved ? 'saved' : ''}`}
                        onClick={(e) => { e.stopPropagation(); onToggleSave(l); }}
                        aria-label="Save Property"
                      >
                        <Heart size={18} fill={isSaved ? "#EF4444" : "none"} />
                      </button>
                    </div>

                    {/* Content Block */}
                    <div className="listing-card-body" onClick={() => onSelectListing(l)} style={{ cursor: 'pointer' }}>
                      <div className="listing-price">
                        ${l.price.toLocaleString()} <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-muted)' }}>{getPriceMultiplierLabel()}</span>
                      </div>
                      
                      {/* Specs Row */}
                      <div className="listing-details-row">
                        {category === 'residential' ? (
                          <>
                            <span><strong>{l.bedrooms}</strong> Bed</span>
                            <span><strong>{l.bathrooms}</strong> Bath</span>
                            <span><strong>{l.carSpaces}</strong> Car</span>
                          </>
                        ) : category === 'industrial' ? (
                          <>
                            <span><strong>{l.buildingArea}m²</strong> Building</span>
                            <span><strong>{l.landArea}m²</strong> Land</span>
                          </>
                        ) : (
                          <span><strong>{l.area || l.landSize} {category === 'rural' ? 'ha' : 'm²'}</strong> Area</span>
                        )}
                      </div>

                      <h3 className="listing-card-title">{l.title}</h3>
                      <p className="listing-card-address">
                        <MapPin size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
                        {l.address}
                      </p>

                      <div className="listing-tags">
                        <span className="listing-tag" style={{ color: 'var(--cat-color)', backgroundColor: 'var(--cat-bg)', fontWeight: 600 }}>{l.propertyType}</span>
                        {l.features.slice(0, 2).map(tag => (
                          <span key={tag} className="listing-tag">{tag}</span>
                        ))}
                      </div>

                      <div className="listing-card-footer">
                        <div className="agent-info-small">
                          <span className="agent-name">{l.agentName}</span>
                          <span className="agency-name">{l.category.toUpperCase()} AGENT</span>
                        </div>
                        <span style={{ fontSize: '13px', color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Eye size={14} /> {l.views} views
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
