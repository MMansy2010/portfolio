import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSearch from './components/HeroSearch';
import CategorySearch from './components/CategorySearch';
import ListingDetails from './components/ListingDetails';
import Dashboard from './components/Dashboard';
import { db, initDB } from './services/db';
import { Heart, Search, X, User, Lock, ExternalLink } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // home, residential, commercial, industrial, retail, rural, details, dashboard
  const [selectedListing, setSelectedListing] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [savedListings, setSavedListings] = useState([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Search parameters forwarded from HeroSearch
  const [searchFilters, setSearchFilters] = useState(null);

  // Login Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    // Initialise Local Storage DB with pre-seeded data
    initDB();

    // Check logged in user session
    const user = db.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }

    // Load saved properties
    const saved = localStorage.getItem('werent_saved');
    if (saved) {
      setSavedListings(JSON.parse(saved));
    }
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    const res = db.login(loginEmail, loginPassword);
    if (res.success) {
      setCurrentUser(res.user);
      setShowLoginModal(false);
      setLoginEmail('');
      setLoginPassword('');
      // Redirect to dashboard
      setCurrentView('dashboard');
    } else {
      setLoginError(res.error);
    }
  };

  const handleLogout = () => {
    db.logout();
    setCurrentUser(null);
    setCurrentView('home');
  };

  const handleToggleSave = (listing) => {
    setSavedListings(prev => {
      let next;
      if (prev.some(item => item.id === listing.id)) {
        next = prev.filter(item => item.id !== listing.id);
      } else {
        next = [...prev, listing];
      }
      localStorage.setItem('werent_saved', JSON.stringify(next));
      return next;
    });
  };

  const handleSearchTrigger = (filters) => {
    setSearchFilters(filters);
    setShowSavedOnly(false);
    setCurrentView(filters.category);
  };

  const handleSelectCategory = (cat) => {
    setSearchFilters(null);
    setShowSavedOnly(false);
    setCurrentView(cat);
  };

  const handleSelectListing = (listing) => {
    setSelectedListing(listing);
    setCurrentView('details');
  };

  const handleViewSaved = () => {
    setShowSavedOnly(true);
    setCurrentView('residential'); // uses search screen with saved filters
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Header Navigation */}
      <Navbar 
        currentUser={currentUser}
        onNavigate={(view) => {
          setShowSavedOnly(false);
          setCurrentView(view);
        }}
        currentTab={currentView}
        onOpenLogin={() => setShowLoginModal(true)}
        onLogout={handleLogout}
        savedListingsCount={savedListings.length}
        onViewSaved={handleViewSaved}
      />

      {/* Main Body Switcher */}
      <main style={{ flexGrow: 1 }}>
        {showSavedOnly ? (
          <div className="container" style={{ padding: '40px 24px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Heart size={28} fill="#EF4444" color="#EF4444" />
              <span>Saved Listings Shortlist</span>
            </h2>
            {savedListings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '64px', backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <p style={{ color: '#64748B', fontSize: '16px' }}>You haven't saved any listings yet. Browse categories to save properties.</p>
                <button className="btn btn-primary" onClick={() => setCurrentView('home')} style={{ marginTop: '16px' }}>Browse Properties</button>
              </div>
            ) : (
              <div className="listings-grid">
                {savedListings.map(l => (
                  <div key={l.id} className="listing-card">
                    <div className="listing-image-wrapper">
                      <img src={l.images[0]} alt={l.title} />
                      <button 
                        className="heart-btn saved"
                        onClick={() => handleToggleSave(l)}
                      >
                        <Heart size={18} fill="#EF4444" color="#EF4444" />
                      </button>
                    </div>
                    <div className="listing-card-body" onClick={() => handleSelectListing(l)} style={{ cursor: 'pointer' }}>
                      <div className="listing-price">
                        ${l.price.toLocaleString()} <span style={{ fontSize: '14px', fontWeight: 500, color: '#64748B' }}>{l.category === 'residential' ? 'per week' : 'p.a. + Outgoings'}</span>
                      </div>
                      <h3 className="listing-card-title">{l.title}</h3>
                      <p className="listing-card-address">{l.address}</p>
                      <span className="listing-tag" style={{ color: 'var(--color-primary)', backgroundColor: 'rgba(11, 43, 143, 0.08)', fontWeight: 600 }}>{l.propertyType}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {currentView === 'home' && (
              <HeroSearch 
                onSearch={handleSearchTrigger} 
                onSelectCategory={handleSelectCategory}
              />
            )}

            {(currentView === 'residential' || 
              currentView === 'commercial' || 
              currentView === 'industrial' || 
              currentView === 'retail' || 
              currentView === 'rural') && (
              <CategorySearch 
                category={currentView}
                initialFilters={searchFilters}
                onSelectListing={handleSelectListing}
                savedListings={savedListings}
                onToggleSave={handleToggleSave}
              />
            )}

            {currentView === 'details' && (
              <ListingDetails 
                listing={selectedListing}
                onBack={() => setCurrentView(selectedListing.category)}
                savedListings={savedListings}
                onToggleSave={handleToggleSave}
              />
            )}

            {currentView === 'dashboard' && currentUser && (
              <Dashboard 
                currentUser={currentUser}
                onLogout={handleLogout}
                onNavigate={(view) => setCurrentView(view)}
              />
            )}
          </>
        )}
      </main>

      {/* Global Footer */}
      <footer>
        <div className="container footer-grid">
          <div className="footer-brand">
            <h2>werent<span>.</span></h2>
            <p>
              Australia's dedicated leasing marketplace focused exclusively on rentals and lease opportunities across residential, commercial, industrial, retail, and rural sectors.
            </p>
          </div>
          <div className="footer-col">
            <h5>Property Sectors</h5>
            <ul className="footer-links-list">
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleSelectCategory('residential'); }}>Residential Rentals</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleSelectCategory('commercial'); }}>Commercial Office Space</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleSelectCategory('industrial'); }}>Industrial Warehouses</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleSelectCategory('retail'); }}>Retail Stores & Shops</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleSelectCategory('rural'); }}>Rural Farms & Grazing</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Quick Links</h5>
            <ul className="footer-links-list">
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('home'); }}>Home Page</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleViewSaved(); }}>My Saved Properties</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setShowLoginModal(true); }}>Agent Login Portal</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact & Info</h5>
            <ul className="footer-links-list">
              <li style={{ fontSize: '14px' }}>Phone: +61 3 9000 1234</li>
              <li style={{ fontSize: '14px' }}>Email: support@werent.com.au</li>
              <li style={{ fontSize: '14px' }}>Address: 12 Collins St, Melbourne VIC 3000</li>
            </ul>
          </div>
        </div>
        <div className="container footer-bottom-bar">
          <p>&copy; {new Date().getFullYear()} Werent Australia. All rights reserved. Built for Agentic PropTech MVP.</p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </footer>

      {/* SECURE SIGN IN MODAL */}
      {showLoginModal && (
        <div className="modal-overlay no-print" onClick={() => setShowLoginModal(false)}>
          <div className="modal-content" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={22} />
                <span>Agent & Admin Portal</span>
              </h3>
              <button className="close-btn" onClick={() => setShowLoginModal(false)}>&times;</button>
            </div>

            <form onSubmit={handleLoginSubmit} style={{ marginTop: '16px' }}>
              {loginError && (
                <div style={{
                  padding: '12px',
                  backgroundColor: 'rgba(239,68,68,0.08)',
                  color: '#EF4444',
                  borderRadius: '6px',
                  fontSize: '14px',
                  marginBottom: '16px',
                  fontWeight: 600
                }}>
                  {loginError}
                </div>
              )}

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '12px', top: '16px', color: '#94A3B8' }} />
                  <input 
                    type="email" 
                    placeholder="agent@werent.com.au" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    style={{ paddingLeft: '36px', width: '100%' }}
                    required 
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label>Secure Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '12px', top: '16px', color: '#94A3B8' }} />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    style={{ paddingLeft: '36px', width: '100%' }}
                    required 
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '48px' }}>
                Verify & Log In
              </button>
            </form>

            <div style={{
              marginTop: '24px',
              backgroundColor: 'var(--color-bg-light)',
              padding: '16px',
              borderRadius: '8px',
              fontSize: '13px',
              border: '1px solid var(--color-border)'
            }}>
              <h4 style={{ fontWeight: 700, marginBottom: '8px' }}>Testing Credentials:</h4>
              <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span><strong>Agent User:</strong> agent@werent.com.au</span>
                <span>(pass: <code>agent123</code>)</span>
              </p>
              <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span><strong>Admin User:</strong> admin@werent.com.au</span>
                <span>(pass: <code>admin123</code>)</span>
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
