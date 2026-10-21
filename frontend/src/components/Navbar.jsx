import React from 'react';
import { Menu, Plus } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, setIsOpen, isOpen }) {
  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'System Dashboard';
      case 'places':
        return 'All Places & Records';
      case 'add':
        return 'Add New Place';
      default:
        return 'PlaceTrack';
    }
  };

  return (
    <header className="top-navbar">
      <div className="navbar-title">
        <button
          className="mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          <Menu size={24} />
        </button>
        <h2 className="page-title">{getTitle()}</h2>
      </div>

      <div className="navbar-actions">
        {activeTab !== 'add' && (
          <button
            id="nav-quick-add-btn"
            className="btn btn-primary btn-sm"
            onClick={() => setActiveTab('add')}
          >
            <Plus size={16} />
            <span>Add Place</span>
          </button>
        )}
      </div>
    </header>
  );
}
