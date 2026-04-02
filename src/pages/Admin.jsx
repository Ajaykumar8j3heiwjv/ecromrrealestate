import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Admin.css'
import { getProperties, addProperty, updateProperty, deleteProperty, getEnquiries } from '../data/propertyStore'

/* ====================== DATA ====================== */
const emptyForm = { 
  title: '', location: '', pincode: '', type: 'Apartment', status: 'Sale', price: '', 
  beds: '', baths: '', area: '', desc: '',
  ownerName: '', ownerRole: 'Owner', ownerPhone: '',
  propertyType: 'Apartment', size: '', rent: '', advance: '', maintenance: '',
  bedroom: '', bathroom: '', additionalRoom: '', balconies: '',
  propertyOnFloor: '', totalFloors: '', suitableTime: '', servantAcc: 'No',
  petAllowed: 'Yes', foodPref: 'Veg & Non-Veg', tenants: 'Both (Family / Bachelor)',
  facing: '', propertyAge: '', parking: '', furnishedStatus: 'Fully Furnished',
  availableFrom: '', isFeatured: true, image: ''
}

/* ====================== ICONS ====================== */
const Icon = ({ path, paths }) => (
  <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="admin-nav-icon">
    {path && <path d={path} />}
    {paths && paths.map((p, i) => <path key={i} d={p} />)}
  </svg>
)

/* ====================== MODAL ====================== */
function PropertyModal({ mode, data, onSave, onClose }) {
  const [form, setForm] = useState(data || emptyForm)
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const onImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setForm({ ...form, image: reader.result })
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="admin-modal-bg" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2 className="admin-modal-title">{mode === 'add' ? 'Add New Property' : 'Edit Property'}</h2>
          <button className="admin-modal-close" onClick={onClose}>×</button>
        </div>
        <div className="admin-modal-body">
          <div className="admin-form-sections">
            {/* Section 1: Basic Information */}
            <div className="admin-form-section">
              <h3 className="admin-form-section-title">Basic Information</h3>
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Property Title</label>
                  <input name="title" value={form.title} onChange={handle} placeholder="e.g. 1028 Sq.Ft. 2 BHK..." />
                </div>
                <div className="admin-form-group">
                  <label>Price (Numeric String)</label>
                  <input name="price" value={form.price} onChange={handle} placeholder="e.g. 30,000" />
                </div>
                <div className="admin-form-group">
                  <label>Location</label>
                  <input name="location" value={form.location} onChange={handle} placeholder="e.g. Ambattur, Chennai" />
                </div>
                <div className="admin-form-group">
                  <label>Pincode</label>
                  <input name="pincode" value={form.pincode} onChange={handle} placeholder="600053" />
                </div>
                <div className="admin-form-group">
                  <label>Listing Status</label>
                  <select name="status" value={form.status} onChange={handle}>
                    <option>Sale</option>
                    <option>Rent</option>
                    <option>New</option>
                    <option>Sold</option>
                    <option>Inactive</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>Property Type</label>
                  <select name="type" value={form.type} onChange={handle}>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Penthouse</option>
                    <option>Plot</option>
                    <option>Commercial</option>
                  </select>
                </div>
                <div className="admin-form-group full">
                  <label>Property Image (Upload)</label>
                  <input type="file" accept="image/*" onChange={onImageChange} />
                  {form.image && (
                    <div style={{ marginTop: '10px' }}>
                      <img src={form.image} alt="Preview" style={{ height: '80px', borderRadius: '4px', border: '1px solid var(--gold-mid)' }} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Technical Specifications (Matching Image) */}
            <div className="admin-form-section">
              <h3 className="admin-form-section-title">Essential Information (Technical Details)</h3>
              <div className="admin-form-grid">
                <div className="admin-form-group"><label>Size (sqft)</label><input name="size" value={form.size} onChange={handle} placeholder="1028 Sq.ft" /></div>
                <div className="admin-form-group"><label>Rent Value</label><input name="rent" value={form.rent} onChange={handle} placeholder="30,000" /></div>
                <div className="admin-form-group"><label>Advance (₹)</label><input name="advance" value={form.advance} onChange={handle} placeholder="2,00,000" /></div>
                <div className="admin-form-group"><label>Maintenance (₹)</label><input name="maintenance" value={form.maintenance} onChange={handle} placeholder="2,000" /></div>
                <div className="admin-form-group"><label>Bedroom Description</label><input name="bedroom" value={form.bedroom} onChange={handle} placeholder="2 Bedroom(s)" /></div>
                <div className="admin-form-group"><label>Bathroom Description</label><input name="bathroom" value={form.bathroom} onChange={handle} placeholder="2 Bathroom(s)" /></div>
                <div className="admin-form-group"><label>Additional Room</label><input name="additionalRoom" value={form.additionalRoom} onChange={handle} placeholder="Servant Room / -" /></div>
                <div className="admin-form-group"><label>Balconies</label><input name="balconies" value={form.balconies} onChange={handle} placeholder="2" /></div>
                <div className="admin-form-group"><label>Property On Floor</label><input name="propertyOnFloor" value={form.propertyOnFloor} onChange={handle} placeholder="8" /></div>
                <div className="admin-form-group"><label>Total Floor(s)</label><input name="totalFloors" value={form.totalFloors} onChange={handle} placeholder="14" /></div>
                <div className="admin-form-group"><label>Facing</label><input name="facing" value={form.facing} onChange={handle} placeholder="North West" /></div>
                <div className="admin-form-group"><label>Age Of Property</label><input name="propertyAge" value={form.propertyAge} onChange={handle} placeholder="1-5 years" /></div>
                <div className="admin-form-group"><label>Parking</label><input name="parking" value={form.parking} onChange={handle} placeholder="Both (Two / Four Wheeler)" /></div>
                <div className="admin-form-group"><label>Furnished Status</label><input name="furnishedStatus" value={form.furnishedStatus} onChange={handle} placeholder="Fully Furnished" /></div>
                <div className="admin-form-group"><label>Available From</label><input name="availableFrom" value={form.availableFrom} onChange={handle} placeholder="2024-04-10" /></div>
                <div className="admin-form-group"><label>Servant Accommodation</label>
                  <select name="servantAcc" value={form.servantAcc} onChange={handle}><option>No</option><option>Yes</option></select>
                </div>
              </div>
            </div>

            {/* Section 3: Owner & Contact */}
            <div className="admin-form-section">
              <h3 className="admin-form-section-title">Owner & Contact Details</h3>
              <div className="admin-form-grid">
                <div className="admin-form-group"><label>Owner Name</label><input name="ownerName" value={form.ownerName} onChange={handle} placeholder="Rajkumar B..." /></div>
                <div className="admin-form-group"><label>Owner Role</label><input name="ownerRole" value={form.ownerRole} onChange={handle} placeholder="Owner / Agent" /></div>
                <div className="admin-form-group"><label>WhatsApp Number (w/o +)</label><input name="ownerPhone" value={form.ownerPhone} onChange={handle} placeholder="919840422285" /></div>
              </div>
            </div>

            <div className="admin-form-group full">
              <label>Full Description</label>
              <textarea name="desc" value={form.desc} onChange={handle} placeholder="Detailed property description..." />
            </div>
          </div>
        </div>
        <div className="admin-modal-footer">
          <button className="admin-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="admin-btn-save" onClick={() => onSave(form)}>
            {mode === 'add' ? 'Add Property' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ====================== DELETE MODAL ====================== */
function DeleteModal({ item, onConfirm, onClose }) {
  return (
    <div className="admin-modal-bg" onClick={onClose}>
      <div className="admin-modal admin-delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2 className="admin-modal-title">Confirm Delete</h2>
          <button className="admin-modal-close" onClick={onClose}>×</button>
        </div>
        <div className="admin-delete-body">
          <div className="admin-delete-icon">
            <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
            </svg>
          </div>
          <h3 className="admin-delete-title">Delete Property?</h3>
          <p className="admin-delete-text">
            Are you sure you want to remove <strong style={{ color: 'var(--white)' }}>"{item?.title}"</strong>?
            This action cannot be undone.
          </p>
        </div>
        <div className="admin-modal-footer">
          <button className="admin-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="admin-btn-delete" id="confirm-delete-btn" onClick={onConfirm}>Yes, Delete</button>
        </div>
      </div>
    </div>
  )
}

/* ====================== SETTINGS ====================== */
function SettingsTab() {
  const [toggles, setToggles] = useState({
    liveChat: true, enquiryEmail: true, smsAlerts: false, featured: true,
    maintenance: false, analytics: true,
  })
  const toggle = (key) => setToggles((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="admin-settings-grid">
      <div className="admin-settings-card">
        <h3 className="admin-settings-card-title">
          <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width:18, height:18, stroke:'var(--gold-mid)', fill:'none' }}>
            <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
          </svg>
          Site Modules
        </h3>
        {[
          { key: 'liveChat', label: 'Live Chat Widget', sub: 'Enable WhatsApp chat bubble' },
          { key: 'enquiryEmail', label: 'Email Notifications', sub: 'Send enquiry alerts to admin' },
          { key: 'smsAlerts', label: 'SMS Alerts', sub: 'SMS for new enquiries' },
          { key: 'featured', label: 'Featured Listings', sub: 'Show featured section on home' },
          { key: 'maintenance', label: 'Maintenance Mode', sub: 'Hide site from public' },
          { key: 'analytics', label: 'Analytics Tracking', sub: 'Google Analytics integration' },
        ].map(({ key, label, sub }) => (
          <div className="admin-toggle-row" key={key}>
            <div>
              <div className="admin-toggle-label">{label}</div>
              <div className="admin-toggle-sub">{sub}</div>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={toggles[key]} onChange={() => toggle(key)} id={`toggle-${key}`} />
              <span className="toggle-slider" />
            </label>
          </div>
        ))}
      </div>

      <div className="admin-settings-card">
        <h3 className="admin-settings-card-title">
          <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width:18, height:18, stroke:'var(--gold-mid)', fill:'none' }}>
            <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
          </svg>
          Site Information
        </h3>
        {[
          { label: 'Company Name', id: 'set-name', defaultVal: 'ECR OMR Real Estates' },
          { label: 'Contact Phone', id: 'set-phone', defaultVal: '+91 98765 43210' },
          { label: 'Contact Email', id: 'set-email', defaultVal: 'info@ecrOMRrealestate.com' },
          { label: 'Office Address', id: 'set-addr', defaultVal: 'No. 12, OMR Road, Sholinganallur' },
          { label: 'WhatsApp Number', id: 'set-wa', defaultVal: '+91 98765 43210' },
          { label: 'Google Maps Embed URL', id: 'set-map', defaultVal: '' },
        ].map(({ label, id, defaultVal }) => (
          <div className="admin-form-group" key={id}>
            <label>{label}</label>
            <input id={id} type="text" defaultValue={defaultVal} />
          </div>
        ))}
        <button className="admin-btn-save" id="save-settings-btn" style={{ width: '100%', padding: '13px' }}>
          Save Site Settings
        </button>
      </div>
    </div>
  )
}

/* ====================== MAIN ADMIN ====================== */
const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="admin-nav-icon"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
  { key: 'properties', label: 'Properties', icon: <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="admin-nav-icon"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { key: 'enquiries', label: 'Enquiries', icon: <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="admin-nav-icon"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  // { key: 'settings', label: 'Site Settings', icon: <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="admin-nav-icon"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg> },
]

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [properties, setProperties] = useState([])
  const [enquiries, setEnquiries] = useState([])
  const [modal, setModal] = useState(null)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [tableSearch, setTableSearch] = useState('')

  useEffect(() => {
    setProperties(getProperties())
    setEnquiries(getEnquiries())
  }, [])

  /* CRUD Handlers */
  const handleAdd = (form) => {
    const updated = addProperty(form)
    setProperties(updated)
    setModal(null)
  }

  const handleEdit = (form) => {
    const updated = updateProperty(form)
    setProperties(updated)
    setModal(null)
    setEditTarget(null)
  }

  const openEdit = (prop) => { setEditTarget(prop); setModal('edit') }
  const openDelete = (prop) => setDeleteTarget(prop)

  const confirmDelete = () => {
    const updated = deleteProperty(deleteTarget.id)
    setProperties(updated)
    setDeleteTarget(null)
  }

  const filteredProps = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(tableSearch.toLowerCase()) ||
      p.location.toLowerCase().includes(tableSearch.toLowerCase())
  )

  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('adminAuthenticated') === 'true')
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState('')

  const ADMIN_USERNAME = 'Admin'
  const ADMIN_PASSWORD = 'Admin@123'

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()

    if (loginForm.username.trim() === ADMIN_USERNAME && loginForm.password === ADMIN_PASSWORD) {
      localStorage.setItem('adminAuthenticated', 'true')
      setIsAuthenticated(true)
      setLoginError('')
      setLoginForm({ username: '', password: '' })
      return
    }

    setLoginError('Invalid credentials. Username: Admin, Password: Admin123')
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated')
    setIsAuthenticated(false)
    setActiveTab('dashboard')
  }

  const tabTitle = { dashboard: 'Dashboard', properties: 'Property Management', enquiries: 'Enquiries', settings: 'Site Settings' }

  if (!isAuthenticated) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-card">
          <h1>Admin Login</h1>
          <p>Enter your credentials to continue.</p>
          <form onSubmit={handleLoginSubmit} className="admin-login-form">
            <label>
              Username
              <input
                type="text"
                name="username"
                value={loginForm.username}
                onChange={handleLoginChange}
                placeholder="username"
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                placeholder="password"
                required
              />
            </label>
            {loginError && <div className="admin-login-error">{loginError}</div>}
            <button className="admin-btn-save" type="submit">Log In</button>
            <p className="admin-login-note">Hint: username = Admin, password = Admin123</p>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-wrap">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <div className="admin-logo-name">ECR OMR</div>
          <div className="admin-logo-sub">Real Estates</div>
          <span className="admin-badge">Admin Panel</span>
        </div>

        <nav className="admin-nav">
          <div className="admin-nav-section">
            <div className="admin-nav-section-label">Navigation</div>
            {navItems.map((item) => (
              <button
                key={item.key}
                id={`admin-nav-${item.key}`}
                className={`admin-nav-item${activeTab === item.key ? ' active' : ''}`}
                onClick={() => setActiveTab(item.key)}
              >
                {item.icon}
                {item.label}
                {item.key === 'properties' && properties.length > 0 && <span className="admin-nav-badge">{properties.length}</span>}
                {item.key === 'enquiries' && <span className="admin-nav-badge">3</span>}
              </button>
            ))}
          </div>
          <div className="admin-nav-section" style={{ marginTop: '12px' }}>
            <div className="admin-nav-section-label">Quick Links</div>
            <Link to="/" className="admin-nav-item" style={{ textDecoration: 'none' }}>
              <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="admin-nav-icon"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              View Website
            </Link>
            <Link to="/listings" className="admin-nav-item" style={{ textDecoration: 'none' }}>
              <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="admin-nav-icon"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              All Listings
            </Link>
          </div>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-avatar">A</div>
          <div>
            <div className="admin-user-name">Admin</div>
            <div className="admin-user-role">Super Administrator</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="admin-main">
        <div className="admin-topbar">
          <h1 className="admin-topbar-title">{tabTitle[activeTab]}</h1>
          <div className="admin-topbar-right">
            {activeTab === 'properties' && (
              <button className="admin-topbar-btn" id="add-property-btn" onClick={() => setModal('add')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add Property
              </button>
            )}
            <button className="admin-topbar-btn" onClick={handleLogout} style={{ marginRight: '8px', backgroundColor: '#cc4f4f' }}>Log out</button>
            <Link to="/" style={{ fontSize: '12px', color: 'var(--gold-mid)', letterSpacing: '0.1em', textDecoration: 'none' }}>← Back to Site</Link>
          </div>
        </div>

        <div className="admin-content">

          {/* ---- DASHBOARD ---- */}
          {activeTab === 'dashboard' && (
            <>
              <div className="admin-stats-grid">
                {[
                  { icon: <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>, num: properties.length, label: 'Total Properties', change: '+2 this week', dir: 'up' },
                  { icon: <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, num: enquiries.length, label: 'New Enquiries', change: '+1 today', dir: 'up' },
                  { icon: <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, num: '₹50L', label: 'Revenue (Mar)', change: '+18% vs Feb', dir: 'up' },
                  { icon: <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>, num: '1,200+', label: 'Total Clients', change: '+15 this month', dir: 'up' },
                ].map((s, i) => (
                  <div className="admin-stat-card" key={i} id={`stat-card-${i}`}>
                    <div className="admin-stat-icon">{s.icon}</div>
                    <div className="admin-stat-num">{s.num}</div>
                    <div className="admin-stat-label">{s.label}</div>
                    <div className={`admin-stat-change ${s.dir}`}>▲ {s.change}</div>
                  </div>
                ))}
              </div>

              {/* Recent Properties table */}
              <div className="admin-table-section">
                <div className="admin-table-header">
                  <h3 className="admin-table-title">Recent Properties</h3>
                  <button className="admin-topbar-btn" onClick={() => setActiveTab('properties')} style={{ fontSize: '10px', padding: '8px 18px' }}>View All</button>
                </div>
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr><th>Property</th><th>Type</th><th>Price</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {properties.slice(0, 4).map((p) => (
                        <tr key={p.id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <img src={p.image} alt={p.title} className="prop-img" />
                              <div>
                                <div className="prop-title">{p.title}</div>
                                <div className="prop-sub">{p.location}</div>
                              </div>
                            </div>
                          </td>
                          <td>{p.type}</td>
                          <td style={{ color: 'var(--gold-light)', fontFamily: 'var(--font-serif)' }}>₹{p.price}</td>
                          <td><span className={`status-tag ${p.status.toLowerCase()}`}>{p.status}</span></td>
                          <td>
                            <div className="admin-action-btns">
                              <button className="action-btn edit" onClick={() => openEdit(p)} title="Edit">
                                <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                              </button>
                              <button className="action-btn delete" onClick={() => openDelete(p)} title="Delete">
                                <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Enquiries */}
              <div className="admin-table-section">
                <div className="admin-table-header">
                  <h3 className="admin-table-title">Recent Enquiries</h3>
                  <button className="admin-topbar-btn" onClick={() => setActiveTab('enquiries')} style={{ fontSize: '10px', padding: '8px 18px' }}>View All</button>
                </div>
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr><th>Name</th><th>Phone</th><th>Interest</th><th>Property</th><th>Date</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      {enquiries.map((e) => (
                        <tr key={e.id} className="enquiry-row">
                          <td style={{ fontWeight: 500, color: 'var(--white)' }}>{e.name}</td>
                          <td>{e.phone}</td>
                          <td>{e.interest}</td>
                          <td>{e.property}</td>
                          <td>{e.date}</td>
                          <td><span className={`status-tag ${e.status === 'New' ? 'new' : e.status === 'Contacted' ? 'rent' : 'inactive'}`}>{e.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ---- PROPERTIES ---- */}
          {activeTab === 'properties' && (
            <div className="admin-table-section">
              <div className="admin-table-header">
                <h3 className="admin-table-title">All Properties ({properties.length})</h3>
                <div className="admin-table-actions">
                  <input
                    className="admin-table-search"
                    id="prop-table-search"
                    type="text"
                    placeholder="Search properties…"
                    value={tableSearch}
                    onChange={(e) => setTableSearch(e.target.value)}
                  />
                  <button className="admin-topbar-btn" id="add-prop-table-btn" onClick={() => setModal('add')}>
                    + Add New
                  </button>
                </div>
              </div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr><th>Property</th><th>Type</th><th>Beds</th><th>Area</th><th>Price</th><th>Status</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {filteredProps.map((p) => (
                      <tr key={p.id} id={`prop-row-${p.id}`}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img src={p.image} alt={p.title} className="prop-img" />
                            <div>
                              <div className="prop-title">{p.title}</div>
                              <div className="prop-sub">{p.location}</div>
                            </div>
                          </div>
                        </td>
                        <td>{p.type}</td>
                        <td>{p.beds} BHK</td>
                        <td>{p.area} sqft</td>
                        <td style={{ color: 'var(--gold-light)', fontFamily: 'var(--font-serif)', fontSize: '14px' }}>₹{p.price}</td>
                        <td><span className={`status-tag ${p.status.toLowerCase()}`}>{p.status}</span></td>
                        <td>
                          <div className="admin-action-btns">
                            <button className="action-btn view" title="View on Site">
                              <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                            </button>
                            <button className="action-btn edit" id={`edit-prop-${p.id}`} onClick={() => openEdit(p)} title="Edit">
                              <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            </button>
                            <button className="action-btn delete" id={`delete-prop-${p.id}`} onClick={() => openDelete(p)} title="Delete">
                              <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredProps.length === 0 && (
                      <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No properties found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ---- ENQUIRIES ---- */}
          {activeTab === 'enquiries' && (
            <div className="admin-table-section">
              <div className="admin-table-header">
                <h3 className="admin-table-title">All Enquiries ({enquiries.length})</h3>
              </div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr><th>Name</th><th>Phone</th><th>Interest</th><th>Property</th><th>Date</th><th>Status</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {enquiries.map((e) => (
                      <tr key={e.id} className="enquiry-row" id={`enquiry-row-${e.id}`}>
                        <td style={{ fontWeight: 500, color: 'var(--white)' }}>{e.name}</td>
                        <td>{e.phone}</td>
                        <td>{e.interest}</td>
                        <td>{e.property}</td>
                        <td>{e.date}</td>
                        <td>
                          <span className={`status-tag ${e.status === 'New' ? 'new' : e.status === 'Contacted' ? 'rent' : 'inactive'}`}>{e.status}</span>
                        </td>
                        <td>
                          <div className="admin-action-btns">
                            <button className="action-btn edit" title="Mark Contacted">
                              <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12"/></svg>
                            </button>
                            <button className="action-btn delete" title="Delete enquiry">
                              <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ---- SETTINGS ---- */}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </div>

      {/* Modals */}
      {modal === 'add' && (
        <PropertyModal mode="add" onSave={handleAdd} onClose={() => setModal(null)} />
      )}
      {modal === 'edit' && editTarget && (
        <PropertyModal mode="edit" data={editTarget} onSave={handleEdit} onClose={() => { setModal(null); setEditTarget(null) }} />
      )}
      {deleteTarget && (
        <DeleteModal item={deleteTarget} onConfirm={confirmDelete} onClose={() => setDeleteTarget(null)} />
      )}
    </div>
  )
}
