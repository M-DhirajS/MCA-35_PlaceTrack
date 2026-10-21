import React, { useState, useEffect, useCallback } from 'react';
import {
  Search,
  Filter,
  X,
  Eye,
  Edit2,
  Trash2,
  Plus,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import PlaceModal from '../components/PlaceModal';
import ConfirmModal from '../components/ConfirmModal';
import placeService from '../services/placeService';

export default function AllPlaces({ setActiveTab, setNotification }) {
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal states
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [isModalLoading, setIsModalLoading] = useState(false);

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [placeToDelete, setPlaceToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Status updating indicator
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  // Load Categories
  const fetchCategories = async () => {
    try {
      const cats = await placeService.getCategories();
      setCategories(cats || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Load Places with Filters
  const fetchPlaces = useCallback(async () => {
    setLoading(true);
    try {
      const data = await placeService.getAllPlaces(
        searchTerm,
        selectedStatus,
        selectedCategory
      );
      setPlaces(data || []);
    } catch (err) {
      console.error('Error fetching places:', err);
      setNotification({
        type: 'error',
        message: 'Failed to fetch places from MySQL. Please check backend connection.',
      });
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedStatus, selectedCategory, setNotification]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPlaces();
    }, 250);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchPlaces]);

  // Clear filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('All');
    setSelectedCategory('All');
  };

  // Status update
  const handleStatusChange = async (placeId, newStatus) => {
    try {
      setUpdatingStatusId(placeId);
      await placeService.updatePlaceStatus(placeId, newStatus);
      setNotification({
        type: 'success',
        message: `Status updated to "${newStatus}"!`,
      });
      fetchPlaces();
    } catch (err) {
      console.error('Failed to update status:', err);
      setNotification({
        type: 'error',
        message: err.response?.data?.message || 'Failed to update record status.',
      });
    } finally {
      setUpdatingStatusId(null);
    }
  };

  // View Modal
  const handleView = (place) => {
    setSelectedPlace(place);
    setModalMode('view');
    setIsModalOpen(true);
  };

  // Edit Modal
  const handleEdit = (place) => {
    setSelectedPlace(place);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  // Save Edit
  const handleSavePlace = async (id, updatedData) => {
    setIsModalLoading(true);
    try {
      await placeService.updatePlace(id, updatedData);
      setNotification({
        type: 'success',
        message: 'Place record updated successfully!',
      });
      setIsModalOpen(false);
      fetchPlaces();
      fetchCategories();
    } catch (err) {
      console.error('Failed to update place:', err);
      setNotification({
        type: 'error',
        message: err.response?.data?.message || 'Failed to update place record.',
      });
    } finally {
      setIsModalLoading(false);
    }
  };

  // Delete flow
  const handleDeletePrompt = (place) => {
    setPlaceToDelete(place);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!placeToDelete) return;
    setIsDeleting(true);
    try {
      await placeService.deletePlace(placeToDelete.id);
      setNotification({
        type: 'success',
        message: `Place "${placeToDelete.placeName}" deleted successfully.`,
      });
      setIsDeleteModalOpen(false);
      setPlaceToDelete(null);
      fetchPlaces();
      fetchCategories();
    } catch (err) {
      console.error('Failed to delete place:', err);
      setNotification({
        type: 'error',
        message: err.response?.data?.message || 'Failed to delete record.',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const isFiltered = searchTerm !== '' || selectedStatus !== 'All' || selectedCategory !== 'All';

  return (
    <div className="page-container">
      <div className="section-card">
        {/* Header */}
        <div className="section-header">
          <div className="section-title">
            <FolderOpen size={22} color="#2563eb" />
            <span>All Place Records</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={fetchPlaces}
              title="Refresh records"
              disabled={loading}
            >
              <RefreshCw size={14} className={loading ? 'spinner' : ''} />
              <span>Refresh</span>
            </button>
            <button
              id="allplaces-add-btn"
              className="btn btn-primary btn-sm"
              onClick={() => setActiveTab('add')}
            >
              <Plus size={16} />
              <span>Add New Place</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="filter-bar">
          <div className="search-input-group">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              id="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, location, category, contact..."
              className="search-input"
            />
          </div>

          <div className="filter-actions">
            {/* Status Filter */}
            <select
              id="filter-status-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            {/* Category Filter */}
            <select
              id="filter-category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Clear Button */}
            {isFiltered && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleClearFilters}
                title="Reset search and filters"
              >
                <X size={14} />
                <span>Clear Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Meta Info */}
        <div className="results-meta">
          <span>
            Showing <strong>{places.length}</strong> {places.length === 1 ? 'place' : 'places'}
            {isFiltered && ' (filtered)'}
          </span>
          {isFiltered && (
            <span>
              Active Filters: {searchTerm && `Search: "${searchTerm}"`}
              {selectedStatus !== 'All' && ` • Status: ${selectedStatus}`}
              {selectedCategory !== 'All' && ` • Category: ${selectedCategory}`}
            </span>
          )}
        </div>

        {/* Records Table */}
        {loading ? (
          <div className="loading-container">
            <div className="spinner-large"></div>
            <p>Fetching records from MySQL database...</p>
          </div>
        ) : places.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <FolderOpen size={32} />
            </div>
            <h4 className="empty-title">
              {isFiltered ? 'No matching places found' : 'No places registered yet'}
            </h4>
            <p className="empty-desc">
              {isFiltered
                ? 'Try adjusting your search criteria or resetting filters to find records.'
                : 'Click "Add New Place" to insert your first record into MySQL.'}
            </p>
            {isFiltered ? (
              <button className="btn btn-secondary" onClick={handleClearFilters}>
                Clear Filters
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => setActiveTab('add')}>
                <Plus size={16} />
                <span>Add Place Now</span>
              </button>
            )}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>ID</th>
                  <th>Place Name</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th>Contact Person</th>
                  <th>Contact Number</th>
                  <th>Status</th>
                  <th>Created Date</th>
                  <th style={{ textAlign: 'center', width: '130px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {places.map((place) => (
                  <tr key={place.id}>
                    <td>
                      <span style={{ fontWeight: 600, color: '#64748b' }}>#{place.id}</span>
                    </td>
                    <td>
                      <div className="table-cell-title">{place.placeName}</div>
                    </td>
                    <td>
                      <span title={place.location} style={{ display: 'block', maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {place.location}
                      </span>
                    </td>
                    <td>
                      <span className="category-badge">{place.category}</span>
                    </td>
                    <td>{place.contactPerson}</td>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                        {place.contactNumber}
                      </span>
                    </td>
                    <td>
                      <select
                        value={place.status}
                        onChange={(e) => handleStatusChange(place.id, e.target.value)}
                        disabled={updatingStatusId === place.id}
                        className="filter-select"
                        style={{
                          padding: '4px 8px',
                          fontSize: '0.8rem',
                          height: 'auto',
                          fontWeight: '600',
                          color:
                            place.status === 'Completed'
                              ? '#166534'
                              : place.status === 'In Progress'
                              ? '#3730a3'
                              : '#92400e',
                          backgroundColor:
                            place.status === 'Completed'
                              ? '#dcfce7'
                              : place.status === 'In Progress'
                              ? '#e0e7ff'
                              : '#fef3c7',
                          border: 'none',
                          borderRadius: '6px',
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td>
                      <span className="table-cell-sub">{formatDate(place.createdAt)}</span>
                    </td>
                    <td>
                      <div className="action-buttons" style={{ justifyContent: 'center' }}>
                        <button
                          className="action-btn view"
                          title="View Details"
                          onClick={() => handleView(place)}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="action-btn edit"
                          title="Edit Record"
                          onClick={() => handleEdit(place)}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          className="action-btn delete"
                          title="Delete Record"
                          onClick={() => handleDeletePrompt(place)}
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
      </div>

      {/* View/Edit Modal */}
      <PlaceModal
        isOpen={isModalOpen}
        mode={modalMode}
        place={selectedPlace}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePlace}
        isLoading={isModalLoading}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Place Record"
        message={`Are you sure you want to delete "${placeToDelete?.placeName}"? This action permanently removes the record from the MySQL database.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        isLoading={isDeleting}
      />
    </div>
  );
}
