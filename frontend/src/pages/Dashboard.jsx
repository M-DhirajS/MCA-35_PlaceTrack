import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Clock,
  Activity,
  CheckCircle2,
  Plus,
  ArrowRight,
  RefreshCw,
  Eye,
  AlertCircle
} from 'lucide-react';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import PlaceModal from '../components/PlaceModal';
import placeService from '../services/placeService';

export default function Dashboard({ setActiveTab, setNotification }) {
  const [stats, setStats] = useState({
    totalPlaces: 0,
    pendingPlaces: 0,
    inProgressPlaces: 0,
    completedPlaces: 0,
  });
  const [recentPlaces, setRecentPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsData, recentData] = await Promise.all([
        placeService.getStats(),
        placeService.getRecentPlaces(),
      ]);
      setStats(statsData);
      setRecentPlaces(recentData || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Unable to load dashboard data. Ensure the Spring Boot backend is running on port 8080.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleQuickStatusChange = async (placeId, newStatus) => {
    try {
      setUpdatingId(placeId);
      await placeService.updatePlaceStatus(placeId, newStatus);
      setNotification({
        type: 'success',
        message: `Status successfully updated to "${newStatus}"!`,
      });
      fetchDashboardData();
    } catch (err) {
      console.error('Error updating status:', err);
      setNotification({
        type: 'error',
        message: err.response?.data?.message || 'Failed to update record status.',
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleOpenViewModal = (place) => {
    setSelectedPlace(place);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleSaveModal = async (id, updatedData) => {
    try {
      await placeService.updatePlace(id, updatedData);
      setNotification({
        type: 'success',
        message: 'Place details updated successfully!',
      });
      setIsModalOpen(false);
      fetchDashboardData();
    } catch (err) {
      console.error('Error saving updated place:', err);
      setNotification({
        type: 'error',
        message: err.response?.data?.message || 'Failed to update record.',
      });
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

  const calculatePercentage = (count) => {
    if (!stats.totalPlaces || stats.totalPlaces === 0) return 0;
    return Math.round((count / stats.totalPlaces) * 100);
  };

  return (
    <div className="page-container">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-content">
          <h1>Welcome to PlaceTrack</h1>
          <p>
            Comprehensive place and location record management system. Monitor facilities,
            track operational statuses, and manage contact directories seamlessly.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            className="btn btn-secondary"
            onClick={fetchDashboardData}
            title="Refresh dashboard metrics"
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? 'spinner' : ''} />
            <span>Refresh</span>
          </button>
          <button
            id="dash-add-place-btn"
            className="btn btn-primary"
            onClick={() => setActiveTab('add')}
          >
            <Plus size={18} />
            <span>Add New Place</span>
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div
          style={{
            background: '#fee2e2',
            border: '1px solid #f87171',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#b91c1c',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AlertCircle size={22} />
            <span>{error}</span>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={fetchDashboardData}>
            Retry Connection
          </button>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="stat-cards-grid">
        <StatCard
          title="Total Places"
          count={stats.totalPlaces}
          type="total"
          icon={MapPin}
          subtext="All registered locations"
        />
        <StatCard
          title="Pending Places"
          count={stats.pendingPlaces}
          type="pending"
          icon={Clock}
          subtext={`${calculatePercentage(stats.pendingPlaces)}% awaiting action`}
        />
        <StatCard
          title="In Progress"
          count={stats.inProgressPlaces}
          type="progress"
          icon={Activity}
          subtext={`${calculatePercentage(stats.inProgressPlaces)}% under review`}
        />
        <StatCard
          title="Completed"
          count={stats.completedPlaces}
          type="completed"
          icon={CheckCircle2}
          subtext={`${calculatePercentage(stats.completedPlaces)}% fully verified`}
        />
      </div>

      {/* Status Progress Bar */}
      {stats.totalPlaces > 0 && (
        <div className="section-card" style={{ padding: '20px 24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>
              Status Distribution Overview
            </span>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
              {stats.totalPlaces} Total Locations
            </span>
          </div>
          <div style={{ height: '10px', display: 'flex', borderRadius: '999px', overflow: 'hidden', backgroundColor: '#e2e8f0' }}>
            <div
              style={{
                width: `${calculatePercentage(stats.completedPlaces)}%`,
                backgroundColor: '#10b981',
                transition: 'width 0.4s ease'
              }}
              title={`Completed: ${stats.completedPlaces}`}
            />
            <div
              style={{
                width: `${calculatePercentage(stats.inProgressPlaces)}%`,
                backgroundColor: '#6366f1',
                transition: 'width 0.4s ease'
              }}
              title={`In Progress: ${stats.inProgressPlaces}`}
            />
            <div
              style={{
                width: `${calculatePercentage(stats.pendingPlaces)}%`,
                backgroundColor: '#f59e0b',
                transition: 'width 0.4s ease'
              }}
              title={`Pending: ${stats.pendingPlaces}`}
            />
          </div>
          <div style={{ display: 'flex', gap: '20px', marginTop: '12px', fontSize: '0.75rem', color: '#64748b' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10b981' }} />
              Completed ({stats.completedPlaces})
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#6366f1' }} />
              In Progress ({stats.inProgressPlaces})
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#f59e0b' }} />
              Pending ({stats.pendingPlaces})
            </span>
          </div>
        </div>
      )}

      {/* Recent Records Section */}
      <div className="section-card">
        <div className="section-header">
          <div className="section-title">
            <MapPin size={20} color="#2563eb" />
            <span>Recently Added Places</span>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setActiveTab('places')}
          >
            <span>View All Places</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner-large"></div>
            <p>Loading recent records from MySQL database...</p>
          </div>
        ) : recentPlaces.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <MapPin size={32} />
            </div>
            <h4 className="empty-title">No Places Registered Yet</h4>
            <p className="empty-desc">
              Get started by adding your first place record to the system.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => setActiveTab('add')}
              style={{ marginTop: '12px' }}
            >
              <Plus size={16} />
              <span>Add Your First Place</span>
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Place Name</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th>Contact Person</th>
                  <th>Contact Number</th>
                  <th>Status</th>
                  <th>Created Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentPlaces.map((place) => (
                  <tr key={place.id}>
                    <td>
                      <span style={{ fontWeight: 600, color: '#64748b' }}>#{place.id}</span>
                    </td>
                    <td>
                      <div className="table-cell-title">{place.placeName}</div>
                    </td>
                    <td>{place.location}</td>
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
                        onChange={(e) => handleQuickStatusChange(place.id, e.target.value)}
                        disabled={updatingId === place.id}
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
                          borderRadius: '6px'
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
                      <button
                        className="action-btn view"
                        title="View details"
                        onClick={() => handleOpenViewModal(place)}
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Place Details Modal */}
      <PlaceModal
        isOpen={isModalOpen}
        mode={modalMode}
        place={selectedPlace}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveModal}
        isLoading={false}
      />
    </div>
  );
}
