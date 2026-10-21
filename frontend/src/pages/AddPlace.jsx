import React, { useState } from 'react';
import { PlusCircle, RotateCcw, Save, CheckCircle, AlertCircle, Building, MapPin, Tag, User, Phone, FileText } from 'lucide-react';
import placeService from '../services/placeService';

export default function AddPlace({ setActiveTab, setNotification }) {
  const initialFormState = {
    placeName: '',
    location: '',
    category: '',
    description: '',
    contactPerson: '',
    contactNumber: '',
    status: 'Pending',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const categoriesSuggestions = [
    'Technology',
    'Education',
    'Healthcare',
    'Commercial',
    'Heritage & Tourism',
    'Hospitality',
    'Government',
    'Logistics',
    'Residential',
    'Recreation'
  ];

  const validate = () => {
    const errs = {};

    if (!formData.placeName.trim()) {
      errs.placeName = 'Place Name is required';
    } else if (formData.placeName.trim().length > 150) {
      errs.placeName = 'Place Name must not exceed 150 characters';
    }

    if (!formData.location.trim()) {
      errs.location = 'Location / Address is required';
    } else if (formData.location.trim().length > 255) {
      errs.location = 'Location must not exceed 255 characters';
    }

    if (!formData.category.trim()) {
      errs.category = 'Category is required';
    }

    if (formData.description && formData.description.length > 500) {
      errs.description = 'Description must not exceed 500 characters';
    }

    if (!formData.contactPerson.trim()) {
      errs.contactPerson = 'Contact Person is required';
    }

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
    // Clear field-level error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      setNotification({
        type: 'error',
        message: 'Please resolve all form validation errors before saving.',
      });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        placeName: formData.placeName.trim(),
        location: formData.location.trim(),
        category: formData.category.trim(),
        description: formData.description ? formData.description.trim() : '',
        contactPerson: formData.contactPerson.trim(),
        contactNumber: formData.contactNumber.trim(),
        status: formData.status.trim(),
      };

      const created = await placeService.createPlace(payload);
      setNotification({
        type: 'success',
        message: `Place "${created.placeName}" successfully saved to MySQL database!`,
      });

      // Clear the form after successful submission
      handleReset();

      // Navigate to All Places to view newly created record
      setTimeout(() => {
        setActiveTab('places');
      }, 700);
    } catch (err) {
      console.error('Error creating place:', err);
      let errorMsg = 'Failed to save place record. Check if MySQL is running.';
      if (err.response?.data?.errors) {
        // Validation errors returned from Spring Boot
        const backendErrors = Object.values(err.response.data.errors).join(', ');
        errorMsg = backendErrors || err.response.data.message;
      } else if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      }
      setNotification({
        type: 'error',
        message: errorMsg,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <div className="form-header">
          <h2>Add New Place Record</h2>
          <p>
            Enter details below to register a new place or facility in the MySQL database.
            All mandatory fields are marked with an asterisk (*).
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            {/* Place Name */}
            <div className="form-group full-width">
              <label htmlFor="placeName" className="form-label">
                Place Name <span className="required-asterisk">*</span>
              </label>
              <input
                type="text"
                id="placeName"
                name="placeName"
                value={formData.placeName}
                onChange={handleChange}
                className={`form-input ${errors.placeName ? 'has-error' : ''}`}
                placeholder="e.g. Apex Tech Campus, City General Hospital"
              />
              {errors.placeName && (
                <span className="form-error">
                  <AlertCircle size={14} /> {errors.placeName}
                </span>
              )}
            </div>

            {/* Location / Address */}
            <div className="form-group full-width">
              <label htmlFor="location" className="form-label">
                Location / Address <span className="required-asterisk">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`form-input ${errors.location ? 'has-error' : ''}`}
                placeholder="e.g. Plot 18, Cyber Gateway, Hitech City, Hyderabad"
              />
              {errors.location && (
                <span className="form-error">
                  <AlertCircle size={14} /> {errors.location}
                </span>
              )}
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category <span className="required-asterisk">*</span>
              </label>
              <input
                type="text"
                id="category"
                name="category"
                list="category-suggestions"
                value={formData.category}
                onChange={handleChange}
                className={`form-input ${errors.category ? 'has-error' : ''}`}
                placeholder="Select or type category..."
              />
              <datalist id="category-suggestions">
                {categoriesSuggestions.map((cat) => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
              {errors.category && (
                <span className="form-error">
                  <AlertCircle size={14} /> {errors.category}
                </span>
              )}
            </div>

            {/* Status */}
            <div className="form-group">
              <label htmlFor="status" className="form-label">
                Status <span className="required-asterisk">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={`form-select ${errors.status ? 'has-error' : ''}`}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              {errors.status && (
                <span className="form-error">
                  <AlertCircle size={14} /> {errors.status}
                </span>
              )}
            </div>

            {/* Contact Person */}
            <div className="form-group">
              <label htmlFor="contactPerson" className="form-label">
                Contact Person <span className="required-asterisk">*</span>
              </label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                className={`form-input ${errors.contactPerson ? 'has-error' : ''}`}
                placeholder="e.g. Rajesh Kumar"
              />
              {errors.contactPerson && (
                <span className="form-error">
                  <AlertCircle size={14} /> {errors.contactPerson}
                </span>
              )}
            </div>

            {/* Contact Number */}
            <div className="form-group">
              <label htmlFor="contactNumber" className="form-label">
                Contact Number <span className="required-asterisk">*</span>
              </label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                maxLength={10}
                value={formData.contactNumber}
                onChange={handleChange}
                className={`form-input ${errors.contactNumber ? 'has-error' : ''}`}
                placeholder="10-digit number (e.g. 9876543210)"
              />
              {errors.contactNumber && (
                <span className="form-error">
                  <AlertCircle size={14} /> {errors.contactNumber}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="form-group full-width">
              <label htmlFor="description" className="form-label">
                Description (Max 500 characters)
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                maxLength={500}
                value={formData.description}
                onChange={handleChange}
                className={`form-textarea ${errors.description ? 'has-error' : ''}`}
                placeholder="Provide a brief summary of the place, amenities, or notes..."
              />
              <div className="char-counter">
                {formData.description.length}/500 characters
              </div>
              {errors.description && (
                <span className="form-error">
                  <AlertCircle size={14} /> {errors.description}
                </span>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
              disabled={submitting}
            >
              <RotateCcw size={16} />
              <span>Reset Form</span>
            </button>
            <button
              type="submit"
              id="submit-place-btn"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="spinner"></span>
                  <span>Saving to Database...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Save Place</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
