import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Building2, Eye, Mail, Plus, Trash2, Check, Star, CheckSquare, MessageSquareCode, Reply } from 'lucide-react';

export default function Dashboard({ currentUser, onLogout, onNavigate }) {
  const [activeTab, setActiveTab] = useState(currentUser.role === 'admin' ? 'approvals' : 'listings');
  const [listings, setListings] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [editingListing, setEditingListing] = useState(null);
  const [replyingEnquiry, setReplyingEnquiry] = useState(null);
  const [replyText, setReplyText] = useState('');
  
  // Create / Edit Form State
  const [showFormModal, setShowFormModal] = useState(false);
  const [formCategory, setFormCategory] = useState('residential');
  const [formTitle, setFormTitle] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formSuburb, setFormSuburb] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formPostcode, setFormPostcode] = useState('');
  const [formState, setFormState] = useState('VIC');
  const [formPrice, setFormPrice] = useState('');
  const [formType, setFormType] = useState('');
  const [formBedrooms, setFormBedrooms] = useState('2');
  const [formBathrooms, setFormBathrooms] = useState('1');
  const [formCarSpaces, setFormCarSpaces] = useState('1');
  const [formArea, setFormArea] = useState('');
  const [formBuildingArea, setFormBuildingArea] = useState('');
  const [formLandArea, setFormLandArea] = useState('');
  const [formClearHeight, setFormClearHeight] = useState('Any');
  const [formLandSize, setFormLandSize] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formFeatures, setFormFeatures] = useState([]);
  const [formImages, setFormImages] = useState('');

  // Load Dashboard Data
  const loadData = () => {
    const list = db.getListings();
    if (currentUser.role === 'admin') {
      setListings(list);
      setEnquiries(db.getEnquiries());
    } else {
      // Filter by current Agent ID
      setListings(list.filter(l => l.agentId === currentUser.id));
      setEnquiries(db.getEnquiries(currentUser.id));
    }
    setAnalytics(db.getAnalytics());
  };

  useEffect(() => {
    loadData();
  }, [currentUser]);

  const handleDeleteListing = (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      db.deleteListing(id);
      loadData();
    }
  };

  const handleApproveListing = (id) => {
    db.approveListing(id);
    loadData();
  };

  const handleToggleFeature = (id) => {
    db.toggleFeatureListing(id);
    loadData();
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    db.replyToEnquiry(replyingEnquiry.id, replyText);
    setReplyText('');
    setReplyingEnquiry(null);
    loadData();
  };

  // Open Form for Create
  const handleOpenCreate = () => {
    setEditingListing(null);
    setFormCategory('residential');
    setFormTitle('');
    setFormAddress('');
    setFormSuburb('');
    setFormCity('');
    setFormPostcode('');
    setFormState('VIC');
    setFormPrice('');
    setFormType('House');
    setFormBedrooms('2');
    setFormBathrooms('1');
    setFormCarSpaces('1');
    setFormArea('');
    setFormBuildingArea('');
    setFormLandArea('');
    setFormClearHeight('Any');
    setFormLandSize('');
    setFormDescription('Beautiful leasing opportunity in prime location.');
    setFormFeatures([]);
    setFormImages('');
    setShowFormModal(true);
  };

  // Open Form for Edit
  const handleOpenEdit = (listing) => {
    setEditingListing(listing);
    setFormCategory(listing.category);
    setFormTitle(listing.title);
    setFormAddress(listing.address);
    setFormSuburb(listing.suburb || '');
    setFormCity(listing.city || '');
    setFormPostcode(listing.postcode || '');
    setFormState(listing.state || 'VIC');
    setFormPrice(listing.price.toString());
    setFormType(listing.propertyType);
    setFormBedrooms((listing.bedrooms || 2).toString());
    setFormBathrooms((listing.bathrooms || 1).toString());
    setFormCarSpaces((listing.carSpaces || 1).toString());
    setFormArea((listing.area || '').toString());
    setFormBuildingArea((listing.buildingArea || '').toString());
    setFormLandArea((listing.landArea || '').toString());
    setFormClearHeight(listing.clearHeight || 'Any');
    setFormLandSize((listing.landSize || '').toString());
    setFormDescription(listing.description);
    setFormFeatures(listing.features || []);
    setFormImages((listing.images || []).join(', '));
    setShowFormModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const parsedImages = formImages.trim() 
      ? formImages.split(',').map(img => img.trim()) 
      : [
          formCategory === 'residential' 
            ? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800"
            : "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800"
        ];

    const listingData = {
      category: formCategory,
      propertyType: formType,
      title: formTitle,
      address: formAddress,
      suburb: formSuburb || formCity || 'Suburb',
      city: formCity || 'Melbourne',
      postcode: formPostcode || '3000',
      state: formState,
      price: parseFloat(formPrice),
      description: formDescription,
      features: formFeatures,
      images: parsedImages,
      agentId: currentUser.role === 'admin' ? 'user_agent_1' : currentUser.id,
      agentName: currentUser.role === 'admin' ? 'Alex Mercer' : currentUser.name,
      agentPhone: currentUser.role === 'admin' ? '+61 3 9555 0192' : currentUser.phone
    };

    // Conditional details
    if (formCategory === 'residential') {
      listingData.bedrooms = parseInt(formBedrooms);
      listingData.bathrooms = parseInt(formBathrooms);
      listingData.carSpaces = parseInt(formCarSpaces);
    } else if (formCategory === 'commercial' || formCategory === 'retail') {
      listingData.area = parseFloat(formArea || 100);
    } else if (formCategory === 'industrial') {
      listingData.buildingArea = parseFloat(formBuildingArea || 200);
      listingData.landArea = parseFloat(formLandArea || 500);
      listingData.clearHeight = formClearHeight;
    } else if (formCategory === 'rural') {
      listingData.landSize = parseFloat(formLandSize || 10);
    }

    if (editingListing) {
      db.updateListing(editingListing.id, listingData);
    } else {
      db.createListing(listingData);
    }

    setShowFormModal(false);
    loadData();
  };

  const handleFeatureCheckboxToggle = (feat) => {
    setFormFeatures(prev => 
      prev.includes(feat) ? prev.filter(f => f !== feat) : [...prev, feat]
    );
  };

  const getSubtypes = (cat) => {
    switch (cat) {
      case 'residential': return ['House', 'Apartment / Unit', 'Townhouse', 'Studio', 'Room', 'Other'];
      case 'commercial': return ['Office', 'Medical', 'Showroom', 'Consulting / Suite', 'Co-working', 'Other'];
      case 'industrial': return ['Warehouse', 'Distribution', 'Manufacturing', 'Storage', 'Yard / Hardstand', 'Other'];
      case 'retail': return ['Shop / Retail Space', 'Kiosk', 'Food & Beverage', 'Large Format Retail', 'Pop-up / Short Term', 'Other'];
      case 'rural': return ['Cropping', 'Grazing', 'Mixed Farming', 'Horticulture / Orchard', 'Vineyard', 'Other'];
      default: return [];
    }
  };

  const getFeatureOptions = (cat) => {
    switch (cat) {
      case 'residential': return ['Pets allowed', 'Furnished', 'Air conditioning', 'Heating', 'Balcony'];
      case 'commercial': return ['Air conditioning', 'Lift', 'Parking', 'Disabled access', 'Fibre Internet'];
      case 'industrial': return ['Container access', 'Truck access', 'Drive-through', '3-phase power', 'Gated security'];
      case 'retail': return ['High foot traffic', 'Parking', 'Food court nearby', 'Outdoor area', 'Grease trap'];
      case 'rural': return ['Water licence', 'Fencing', 'Dwelling included', 'Sheds', 'Irrigation'];
      default: return [];
    }
  };

  return (
    <div className="container dashboard-layout">
      {/* User welcome header */}
      <div className="dashboard-header">
        <div className="dashboard-user-info">
          <h1>Welcome, {currentUser.name}!</h1>
          <p>{currentUser.role === 'admin' ? 'Administrator Site Control Panel' : `Licensed Agent at ${currentUser.agency}`}</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={() => onNavigate('home')}>View Main Page</button>
          <button className="btn btn-primary" onClick={handleOpenCreate}>
            <Plus size={16} />
            <span>Post Property</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs">
        {currentUser.role === 'admin' ? (
          <>
            <button 
              className={`dashboard-tab ${activeTab === 'approvals' ? 'active' : ''}`}
              onClick={() => setActiveTab('approvals')}
            >
              Pending Approvals ({listings.filter(l => l.status === 'pending').length})
            </button>
            <button 
              className={`dashboard-tab ${activeTab === 'listings' ? 'active' : ''}`}
              onClick={() => setActiveTab('listings')}
            >
              All Listings ({listings.length})
            </button>
            <button 
              className={`dashboard-tab ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              Analytics Dashboard
            </button>
          </>
        ) : (
          <>
            <button 
              className={`dashboard-tab ${activeTab === 'listings' ? 'active' : ''}`}
              onClick={() => setActiveTab('listings')}
            >
              My Listings ({listings.length})
            </button>
            <button 
              className={`dashboard-tab ${activeTab === 'enquiries' ? 'active' : ''}`}
              onClick={() => setActiveTab('enquiries')}
            >
              Customer Enquiries ({enquiries.filter(e => !e.replied).length} unreplied)
            </button>
          </>
        )}
      </div>

      {/* RENDER ANALYTICS TAB (ADMIN ONLY) */}
      {activeTab === 'analytics' && currentUser.role === 'admin' && (
        <div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon"><Building2 /></div>
              <div className="stat-text">
                <h4>Total Properties</h4>
                <p>{analytics.totalListings}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ color: '#EF4444', backgroundColor: 'rgba(239,68,68,0.08)' }}><Star /></div>
              <div className="stat-text">
                <h4>Featured Units</h4>
                <p>{listings.filter(l => l.featured).length}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ color: '#10B981', backgroundColor: 'rgba(16,185,129,0.08)' }}><Eye /></div>
              <div className="stat-text">
                <h4>Total Listing Views</h4>
                <p>{analytics.totalViews}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ color: '#F59E0B', backgroundColor: 'rgba(245,158,11,0.08)' }}><Mail /></div>
              <div className="stat-text">
                <h4>Leasing Enquiries</h4>
                <p>{analytics.totalEnquiries}</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '40px' }}>
            <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Listings by Category</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {Object.keys(analytics.categoryStats || {}).map(cat => (
                  <div key={cat} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{cat}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '70%' }}>
                      <div style={{
                        height: '12px',
                        backgroundColor: 'var(--color-primary)',
                        width: `${(analytics.categoryStats[cat] / (analytics.totalListings || 1)) * 100}%`,
                        borderRadius: '6px'
                      }}></div>
                      <span style={{ fontSize: '14px', color: '#64748B', fontWeight: 700 }}>{analytics.categoryStats[cat]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Listings by Australian State</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {Object.keys(analytics.stateStats || {}).map(st => (
                  <div key={st} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600 }}>{st}</span>
                    <span style={{ fontSize: '14px', color: '#64748B', fontWeight: 700 }}>{analytics.stateStats[st]} units</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RENDER LISTINGS MANAGEMENT TAB */}
      {activeTab === 'listings' && (
        <div className="dashboard-table-container">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Category</th>
                <th>Price</th>
                <th>Views</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map(l => (
                <tr key={l.id}>
                  <td>
                    <div className="listing-row-info">
                      <div className="listing-row-thumb">
                        <img src={l.images[0]} alt={l.title} />
                      </div>
                      <div className="listing-row-title">
                        <h5>{l.title}</h5>
                        <p>{l.address}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 700 }}>{l.category}</span>
                  </td>
                  <td>
                    <strong style={{ color: 'var(--color-primary)' }}>
                      ${l.price.toLocaleString()}
                    </strong>
                    <span style={{ fontSize: '12px', color: '#64748B' }}>
                      {l.category === 'residential' ? '/wk' : '/yr'}
                    </span>
                  </td>
                  <td>{l.views}</td>
                  <td>
                    <span className={`badge-status ${l.status}`}>{l.status}</span>
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button 
                        className="action-btn-small" 
                        onClick={() => handleToggleFeature(l.id)} 
                        title="Toggle Featured"
                        style={{ color: l.featured ? '#F59E0B' : '#64748B' }}
                      >
                        <Star size={16} fill={l.featured ? '#F59E0B' : 'none'} />
                      </button>
                      <button 
                        className="action-btn-small" 
                        onClick={() => handleOpenEdit(l)} 
                        title="Edit Property"
                      >
                        <Plus size={16} style={{ transform: 'rotate(45deg)' }} />
                      </button>
                      <button 
                        className="action-btn-small delete" 
                        onClick={() => handleDeleteListing(l.id)} 
                        title="Delete Property"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* RENDER PENDING APPROVALS BOARD (ADMIN ONLY) */}
      {activeTab === 'approvals' && currentUser.role === 'admin' && (
        <div className="dashboard-table-container">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Category</th>
                <th>Price</th>
                <th>Agent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.filter(l => l.status === 'pending').map(l => (
                <tr key={l.id}>
                  <td>
                    <div className="listing-row-info">
                      <div className="listing-row-thumb">
                        <img src={l.images[0]} alt={l.title} />
                      </div>
                      <div className="listing-row-title">
                        <h5>{l.title}</h5>
                        <p>{l.address}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 700 }}>{l.category}</span>
                  </td>
                  <td>${l.price.toLocaleString()}</td>
                  <td>{l.agentName}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        className="btn btn-secondary" 
                        onClick={() => handleApproveListing(l.id)}
                        style={{ padding: '6px 12px', fontSize: '13px', backgroundColor: 'rgba(16,185,129,0.1)', color: '#10B981' }}
                      >
                        <Check size={14} />
                        Approve
                      </button>
                      <button 
                        className="action-btn-small delete" 
                        onClick={() => handleDeleteListing(l.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {listings.filter(l => l.status === 'pending').length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '32px', color: '#64748B' }}>
                    No pending approvals at this time.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* RENDER ENQUIRIES TAB (AGENT / ADMIN) */}
      {activeTab === 'enquiries' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {enquiries.map(enq => (
            <div key={enq.id} style={{
              backgroundColor: '#FFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: 'var(--color-card-shadow)',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700 }}>{enq.name}</h4>
                  <p style={{ fontSize: '13px', color: '#64748B' }}>{enq.email} | {enq.phone}</p>
                </div>
                <span style={{ fontSize: '12px', color: '#64748B' }}>
                  {new Date(enq.date).toLocaleDateString()}
                </span>
              </div>
              <div style={{
                backgroundColor: 'var(--color-bg-light)',
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '14px'
              }}>
                <strong>Listing: {enq.listingTitle}</strong>
                <p style={{ marginTop: '6px', fontStyle: 'italic' }}>"{enq.message}"</p>
              </div>

              {enq.replied ? (
                <div style={{
                  borderLeft: '4px solid #10B981',
                  paddingLeft: '16px',
                  fontSize: '14px',
                  color: '#1E293B'
                }}>
                  <strong>My Reply:</strong>
                  <p style={{ marginTop: '4px' }}>{enq.replyMessage}</p>
                </div>
              ) : (
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setReplyingEnquiry(enq)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '13px' }}
                >
                  <Reply size={14} />
                  <span>Reply</span>
                </button>
              )}
            </div>
          ))}

          {enquiries.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px', backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', color: '#64748B' }}>
              No enquiries received yet.
            </div>
          )}
        </div>
      )}

      {/* REPLY MODAL FORM */}
      {replyingEnquiry && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3>Reply to {replyingEnquiry.name}</h3>
              <button className="close-btn" onClick={() => setReplyingEnquiry(null)}>&times;</button>
            </div>
            <form onSubmit={handleReplySubmit}>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label>Enquiry Message</label>
                <p style={{ fontSize: '14px', color: '#64748B', fontStyle: 'italic', marginBottom: '12px' }}>
                  "{replyingEnquiry.message}"
                </p>
                <label>Your Email Response</label>
                <textarea 
                  required 
                  value={replyText} 
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your response to the customer..."
                  style={{ width: '100%', height: '120px', padding: '12px', border: '1px solid #E2E8F0', borderRadius: '8px', fontFamily: 'var(--font-main)', resize: 'none' }}
                ></textarea>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" className="btn btn-white" onClick={() => setReplyingEnquiry(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Send Response</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE / EDIT PROPERTY FORM MODAL */}
      {showFormModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingListing ? 'Edit Property Listing' : 'Post New Rental Property'}</h3>
              <button className="close-btn" onClick={() => setShowFormModal(false)}>&times;</button>
            </div>
            
            <form onSubmit={handleFormSubmit}>
              <div className="form-grid">
                
                <div className="form-group">
                  <label>Listing Category</label>
                  <select 
                    value={formCategory} 
                    onChange={(e) => {
                      setFormCategory(e.target.value);
                      setFormType(getSubtypes(e.target.value)[0]);
                      setFormFeatures([]);
                    }}
                    disabled={!!editingListing}
                  >
                    <option value="residential">Residential Rental</option>
                    <option value="commercial">Commercial Lease</option>
                    <option value="industrial">Industrial Lease</option>
                    <option value="retail">Retail Lease</option>
                    <option value="rural">Rural Lease</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Property Subtype</label>
                  <select value={formType} onChange={(e) => setFormType(e.target.value)}>
                    {getSubtypes(formCategory).map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group form-grid-full">
                  <label>Listing Title</label>
                  <input 
                    type="text" 
                    value={formTitle} 
                    onChange={(e) => setFormTitle(e.target.value)} 
                    placeholder="e.g. Modern Open-Plan Executive Office Suite" 
                    required 
                  />
                </div>

                <div className="form-group form-grid-full">
                  <label>Address</label>
                  <input 
                    type="text" 
                    value={formAddress} 
                    onChange={(e) => setFormAddress(e.target.value)} 
                    placeholder="Street number, street name" 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label>Suburb</label>
                  <input type="text" value={formSuburb} onChange={(e) => setFormSuburb(e.target.value)} placeholder="e.g. Truganina" required />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input type="text" value={formCity} onChange={(e) => setFormCity(e.target.value)} placeholder="e.g. Melbourne" required />
                </div>

                <div className="form-group">
                  <label>Postcode</label>
                  <input type="text" value={formPostcode} onChange={(e) => setFormPostcode(e.target.value)} placeholder="e.g. 3029" required />
                </div>

                <div className="form-group">
                  <label>State</label>
                  <select value={formState} onChange={(e) => setFormState(e.target.value)}>
                    <option value="VIC">VIC</option>
                    <option value="NSW">NSW</option>
                    <option value="QLD">QLD</option>
                    <option value="WA">WA</option>
                    <option value="SA">SA</option>
                    <option value="TAS">TAS</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    {formCategory === 'residential' ? 'Rent Price (per week AUD)' : 'Rent Price (per annum AUD)'}
                  </label>
                  <input type="number" value={formPrice} onChange={(e) => setFormPrice(e.target.value)} placeholder="e.g. 650" required />
                </div>

                {/* Conditional Fields: Residential */}
                {formCategory === 'residential' && (
                  <>
                    <div className="form-group">
                      <label>Bedrooms</label>
                      <input type="number" value={formBedrooms} onChange={(e) => setFormBedrooms(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label>Bathrooms</label>
                      <input type="number" value={formBathrooms} onChange={(e) => setFormBathrooms(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label>Car Spaces</label>
                      <input type="number" value={formCarSpaces} onChange={(e) => setFormCarSpaces(e.target.value)} required />
                    </div>
                  </>
                )}

                {/* Conditional Fields: Commercial / Retail */}
                {(formCategory === 'commercial' || formCategory === 'retail') && (
                  <div className="form-group">
                    <label>Floor Area (m²)</label>
                    <input type="number" value={formArea} onChange={(e) => setFormArea(e.target.value)} placeholder="e.g. 120" required />
                  </div>
                )}

                {/* Conditional Fields: Industrial */}
                {formCategory === 'industrial' && (
                  <>
                    <div className="form-group">
                      <label>Building Area (m²)</label>
                      <input type="number" value={formBuildingArea} onChange={(e) => setFormBuildingArea(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label>Land Area (m²)</label>
                      <input type="number" value={formLandArea} onChange={(e) => setFormLandArea(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label>Clear Height</label>
                      <input type="text" value={formClearHeight} onChange={(e) => setFormClearHeight(e.target.value)} placeholder="e.g. 9m" />
                    </div>
                  </>
                )}

                {/* Conditional Fields: Rural */}
                {formCategory === 'rural' && (
                  <div className="form-group">
                    <label>Land Size (Hectares)</label>
                    <input type="number" value={formLandSize} onChange={(e) => setFormLandSize(e.target.value)} placeholder="e.g. 150" required />
                  </div>
                )}

                <div className="form-group form-grid-full">
                  <label>Image URLs (comma separated)</label>
                  <input 
                    type="text" 
                    value={formImages} 
                    onChange={(e) => setFormImages(e.target.value)} 
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" 
                  />
                </div>

                <div className="form-group form-grid-full">
                  <label>Description</label>
                  <textarea 
                    value={formDescription} 
                    onChange={(e) => setFormDescription(e.target.value)}
                    style={{ width: '100%', height: '100px', padding: '12px', border: '1px solid #E2E8F0', borderRadius: '8px', fontFamily: 'var(--font-main)', resize: 'none' }}
                    required
                  ></textarea>
                </div>

                <div className="form-group form-grid-full">
                  <label>Features & Attributes</label>
                  <div className="form-checkboxes-row">
                    {getFeatureOptions(formCategory).map(feat => (
                      <label key={feat} className="checkbox-label">
                        <input 
                          type="checkbox" 
                          checked={formFeatures.includes(feat)}
                          onChange={() => handleFeatureCheckboxToggle(feat)}
                        />
                        <span>{feat}</span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
                <button type="button" className="btn btn-white" onClick={() => setShowFormModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">
                  {editingListing ? 'Update Listing' : 'Submit and Request Approval'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
