import React from 'react';
import { LayoutDashboard, MapPin, PlusCircle, Database, CheckCircle } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'places', label: 'All Places', icon: MapPin },
    { id: 'add', label: 'Add New Place', icon: PlusCircle },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-icon">
            <MapPin size={22} />
          </div>
          <div>
            <div className="logo-text">PlaceTrack</div>
            <span className="logo-badge">v1.0 • System</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="app-meta-badge">
            <Database size={14} />
            <span>MySQL Connected</span>
          </div>
          <div className="app-meta-badge" style={{ marginTop: '4px' }}>
            <CheckCircle size={14} color="#10b981" />
            <span>Spring Boot REST API</span>
          </div>
        </div>
      </aside>
    </>
  );
}
