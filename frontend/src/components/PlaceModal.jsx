import React, { useState, useEffect } from 'react';
import { X, Edit2, MapPin, Phone, User, Tag, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function PlaceModal({ isOpen, mode = 'view', place, onClose, onSave, isLoading }) {
  const [formData, setFormData] = useState({
    placeName: '',
    location: '',
    category: '',
    description: '',
    contactPerson: '',
    contactNumber: '',
    status: 'Pending',
  });

  const [errors, setErrors] = useState({});
  const [currentMode, setCurrentMode] = useState(mode);

  useEffect(() => {
    setCurrentMode(mode);
    if (place) {
      setFormData({
        placeName: place.placeName || '',
        location: place.location || '',
        category: place.category || '',
        description: place.description || '',
        contactPerson: place.contactPerson || '',
        contactNumber: place.contactNumber || '',
        status: place.status || 'Pending',
      });
      setErrors({});
    }
  }, [place, mode, isOpen]);

  if (!isOpen || !place) return null;

  const validate = () => {
    const errs = {};
    if (!formData.placeName.trim()) errs.placeName = 'Place Name is required';
    if (!formData.location.trim()) errs.location = 'Location / Address is required';
    if (!formData.category.trim()) errs.category = 'Category is required';
    if (formData.description && formData.description.length > 500) {
      errs.description = 'Description must not exceed 500 characters';
    }
    if (!formData.contactPerson.trim()) errs.contactPerson = 'Contact Person is required';
    if (!formData.contactNumber.trim()) {
      errs.contactNumber = 'Contact Number is required';
    } else if (!/^[0-9]{10}$/.test(formData.contactNumber.trim())) {
      errs.contactNumber = 'Contact Number must contain exactly 10 digits';
    }
    if (!['Pending', 'In Progress', 'Completed'].includes(formData.status)) {
      errs.status = 'Status must be Pending, In Progress, or Completed';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave(place.id, {
      ...formData,
      placeName: formData.placeName.trim(),
      location: formData.location.trim(),
      category: formData.category.trim(),
      description: formData.description ? formData.description.trim() : '',
      contactPerson: formData.contactPerson.trim(),
      contactNumber: formData.contactNumber.trim(),
      status: formData.status.trim(),
    });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3>{currentMode === 'edit' ? 'Edit Place Record' : 'Place Record Details'}</h3>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>#{place.id}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {currentMode === 'view' && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setCurrentMode('edit')}
              >
                <Edit2 size={14} />
                <span>Edit</span>
              </button>
            )}
            <button className="modal-close-btn" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
          </div>
        </div>

        {currentMode === 'view' ? (
          <>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item full-width">
                  <span className="detail-label">Place Name</span>
                  <span className="detail-value" style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1e3a8a' }}>
                    {place.placeName}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label"><Tag size={13} style={{ display: 'inline', marginRight: '4px' }} /> Category</span>
                  <span className="detail-value">
                    <span className="category-badge">{place.category}</span>
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label"><CheckCircle2 size={13} style={{ display: 'inline', marginRight: '4px' }} /> Status</span>
                  <span className="detail-value">
                    <StatusBadge status={place.status} />
                  </span>
                </div>

                <div className="detail-item full-width">
                  <span className="detail-label"><MapPin size={13} style={{ display: 'inline', marginRight: '4px' }} /> Location / Address</span>
                  <span className="detail-value">{place.location}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label"><User size={13} style={{ display: 'inline', marginRight: '4px' }} /> Contact Person</span>
                  <span className="detail-value">{place.contactPerson}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label"><Phone size={13} style={{ display: 'inline', marginRight: '4px' }} /> Contact Number</span>
                  <span className="detail-value">{place.contactNumber}</span>
                </div>

                <div className="detail-item full-width">
                  <span className="detail-label"><FileText size={13} style={{ display: 'inline', marginRight: '4px' }} /> Description</span>
                  <span className="detail-value" style={{ whiteSpace: 'pre-wrap', color: '#475569' }}>
                    {place.description || 'No description provided.'}
                  </span>
                </div>

                <div className="detail-item full-width">
                  <span className="detail-label"><Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} /> Date Created</span>
                  <span className="detail-value" style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    {formatDate(place.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label className="form-label">
                    Place Name <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    name="placeName"
                    value={formData.placeName}
                    onChange={handleChange}
                    className={`form-input ${errors.placeName ? 'has-error' : ''}`}
                    placeholder="e.g. Metro Innovation Tech Park"
                  />
                  {errors.placeName && <span className="form-error">{errors.placeName}</span>}
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Location / Address <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`form-input ${errors.location ? 'has-error' : ''}`}
                    placeholder="e.g. Plot 42, Electronic City, Bengaluru"
                  />
                  {errors.location && <span className="form-error">{errors.location}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Category <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`form-input ${errors.category ? 'has-error' : ''}`}
                    placeholder="e.g. Technology, Healthcare, Education"
                  />
                  {errors.category && <span className="form-error">{errors.category}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Status <span className="required-asterisk">*</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={`form-select ${errors.status ? 'has-error' : ''}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                  {errors.status && <span className="form-error">{errors.status}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Contact Person <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    className={`form-input ${errors.contactPerson ? 'has-error' : ''}`}
                    placeholder="e.g. Rajesh Sharma"
                  />
                  {errors.contactPerson && <span className="form-error">{errors.contactPerson}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Contact Number <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactNumber"
                    maxLength={10}
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className={`form-input ${errors.contactNumber ? 'has-error' : ''}`}
                    placeholder="10-digit mobile number"
                  />
                  {errors.contactNumber && <span className="form-error">{errors.contactNumber}</span>}
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    rows={3}
                    maxLength={500}
                    value={formData.description}
                    onChange={handleChange}
                    className={`form-textarea ${errors.description ? 'has-error' : ''}`}
                    placeholder="Brief description about this place or facility..."
                  />
                  <div className="char-counter">
                    {(formData.description || '').length}/500 characters
                  </div>
                  {errors.description && <span className="form-error">{errors.description}</span>}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setCurrentMode('view')}
                disabled={isLoading}
              >
                Back to View
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? <span className="spinner"></span> : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
