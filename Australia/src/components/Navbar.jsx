import React, { useState } from 'react';
import { Heart, User, LogOut, Menu, X, Building } from 'lucide-react';

export default function Navbar({ 
  currentUser, 
  onNavigate, 
  currentTab, 
  onOpenLogin, 
  onLogout, 
  savedListingsCount,
  onViewSaved
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (tab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header>
      <div className="container navbar">
        {/* Logo */}
        <a href="#" className="logo" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}>
          werent<span>.</span>
        </a>

        {/* Desktop Nav Links */}
        <nav>
          <ul className="nav-links">
            <li>
              <a 
                href="#rent" 
                className={`nav-link ${currentTab === 'residential' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleLinkClick('residential'); }}
              >
                Rent
              </a>
            </li>
            <li>
              <a 
                href="#commercial" 
                className={`nav-link ${currentTab === 'commercial' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleLinkClick('commercial'); }}
              >
                Commercial
              </a>
            </li>
            <li>
              <a 
                href="#industrial" 
                className={`nav-link ${currentTab === 'industrial' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleLinkClick('industrial'); }}
              >
                Industrial
              </a>
            </li>
            <li>
              <a 
                href="#retail" 
                className={`nav-link ${currentTab === 'retail' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleLinkClick('retail'); }}
              >
                Retail
              </a>
            </li>
            <li>
              <a 
                href="#rural" 
                className={`nav-link ${currentTab === 'rural' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleLinkClick('rural'); }}
              >
                Rural
              </a>
            </li>
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className="nav-actions">
          <button 
            className="btn btn-white saved-btn" 
            onClick={onViewSaved}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: 'none', border: 'none' }}
          >
            <Heart size={18} fill={savedListingsCount > 0 ? "#EF4444" : "none"} />
            <span>Saved ({savedListingsCount})</span>
          </button>

          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => handleLinkClick('dashboard')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Building size={16} />
                <span>Dashboard ({currentUser.role})</span>
              </button>
              <button 
                className="btn btn-white" 
                onClick={onLogout}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px' }}
                title="Log Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button 
              className="btn btn-primary" 
              onClick={onOpenLogin}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <User size={16} />
              <span>Log In</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="hamburger" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '80px',
          left: 0,
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)',
          zIndex: 99
        }}>
          <a 
            href="#rent" 
            style={{ fontWeight: 600, padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}
            onClick={(e) => { e.preventDefault(); handleLinkClick('residential'); }}
          >
            Rent (Residential)
          </a>
          <a 
            href="#commercial" 
            style={{ fontWeight: 600, padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}
            onClick={(e) => { e.preventDefault(); handleLinkClick('commercial'); }}
          >
            Commercial Leasing
          </a>
          <a 
            href="#industrial" 
            style={{ fontWeight: 600, padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}
            onClick={(e) => { e.preventDefault(); handleLinkClick('industrial'); }}
          >
            Industrial Leasing
          </a>
          <a 
            href="#retail" 
            style={{ fontWeight: 600, padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}
            onClick={(e) => { e.preventDefault(); handleLinkClick('retail'); }}
          >
            Retail Leasing
          </a>
          <a 
            href="#rural" 
            style={{ fontWeight: 600, padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}
            onClick={(e) => { e.preventDefault(); handleLinkClick('rural'); }}
          >
            Rural Leasing
          </a>
          
          <button 
            className="btn btn-white" 
            onClick={() => { onViewSaved(); setMobileMenuOpen(false); }}
            style={{ justifyContent: 'center' }}
          >
            <Heart size={18} fill={savedListingsCount > 0 ? "#EF4444" : "none"} />
            Saved ({savedListingsCount})
          </button>

          {currentUser ? (
            <>
              <button 
                className="btn btn-secondary" 
                onClick={() => handleLinkClick('dashboard')}
                style={{ justifyContent: 'center' }}
              >
                <Building size={16} />
                Dashboard ({currentUser.role})
              </button>
              <button 
                className="btn btn-danger" 
                onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                style={{ justifyContent: 'center' }}
              >
                <LogOut size={16} />
                Log Out
              </button>
            </>
          ) : (
            <button 
              className="btn btn-primary" 
              onClick={() => { onOpenLogin(); setMobileMenuOpen(false); }}
              style={{ justifyContent: 'center' }}
            >
              <User size={16} />
              Log In
            </button>
          )}
        </div>
      )}
    </header>
  );
}
