import React, { useState } from 'react';
import './EventRegistration.css';

function EventRegistration() {
  // Initial empty form state
  const initialFormState = {
    fullName: '',
    email: '',
    mobile: '',
    dob: '',
    gender: '',
    eventName: '',
    eventDate: '',
    participants: 1,
    ticketType: '',
    mealPreference: '',
    specialRequirements: '',
    acceptTerms: false,
  };

  // State Hooks
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle generic inputs (text, select, number, textarea, radio)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error message when the user starts typing/editing the field
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  // Handle checkbox input (boolean value)
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  // Validate form entries
  const validateForm = () => {
    const newErrors = {};

    // Name Validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    // Email Validation (basic syntax check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. user@domain.com).';
    }

    // Mobile Number Validation (exactly 10 digits check)
    const mobileRegex = /^\d{10}$/;
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile Number is required.';
    } else if (!mobileRegex.test(formData.mobile.trim())) {
      newErrors.mobile = 'Mobile Number must be exactly 10 digits.';
    }

    // Date of Birth Validation
    if (!formData.dob) {
      newErrors.dob = 'Date of Birth is required.';
    }

    // Gender Validation
    if (!formData.gender) {
      newErrors.gender = 'Please select a gender.';
    }

    // Event Validation
    if (!formData.eventName) {
      newErrors.eventName = 'Please select an event from the list.';
    }

    // Event Date Validation
    if (!formData.eventDate) {
      newErrors.eventDate = 'Event Date is required.';
    }

    // Participants Validation
    if (!formData.participants || Number(formData.participants) <= 0) {
      newErrors.participants = 'Number of participants must be greater than 0.';
    }

    // Ticket Type Validation
    if (!formData.ticketType) {
      newErrors.ticketType = 'Please select a ticket type.';
    }

    // Meal Preference Validation
    if (!formData.mealPreference) {
      newErrors.mealPreference = 'Please select a meal preference.';
    }

    // Terms & Conditions Checkbox Validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions.';
    }

    setErrors(newErrors);

    // Return true if error object has no keys
    return Object.keys(newErrors).length === 0;
  };

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    const isValid = validateForm();
    if (isValid) {
      setIsSubmitted(true);
    }
  };

  // Reset Form Handler
  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
  };

  // Register Another Participant Handler
  const handleRegisterAnother = () => {
    setFormData(initialFormState);
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="registration-container fade-in">
      {!isSubmitted ? (
        // Form View
        <form onSubmit={handleSubmit} className="registration-card" noValidate>
          <div className="card-header">
            <div className="header-icon">🎟️</div>
            <h1 className="card-title">Event Registration</h1>
            <p className="card-subtitle">Complete the details below to reserve your entry ticket</p>
          </div>

          <div className="form-sections">
            {/* Section 1: Personal Info */}
            <div className="form-section">
              <h2 className="section-title">Personal Information</h2>
              <div className="form-grid">
                
                {/* Full Name */}
                <div className="form-group full-width">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? 'input-error' : ''}
                  />
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                {/* Email Address */}
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'input-error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                {/* Mobile Number */}
                <div className="form-group">
                  <label htmlFor="mobile">Mobile Number</label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    placeholder="10-digit number"
                    maxLength="10"
                    value={formData.mobile}
                    onChange={handleChange}
                    className={errors.mobile ? 'input-error' : ''}
                  />
                  {errors.mobile && <span className="error-message">{errors.mobile}</span>}
                </div>

                {/* Date of Birth */}
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className={errors.dob ? 'input-error' : ''}
                  />
                  {errors.dob && <span className="error-message">{errors.dob}</span>}
                </div>

                {/* Gender */}
                <div className="form-group">
                  <label>Gender</label>
                  <div className="radio-group-horizontal">
                    <label className="radio-custom-label">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === 'Male'}
                        onChange={handleChange}
                      />
                      <span>Male</span>
                    </label>
                    <label className="radio-custom-label">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === 'Female'}
                        onChange={handleChange}
                      />
                      <span>Female</span>
                    </label>
                    <label className="radio-custom-label">
                      <input
                        type="radio"
                        name="gender"
                        value="Other"
                        checked={formData.gender === 'Other'}
                        onChange={handleChange}
                      />
                      <span>Other</span>
                    </label>
                  </div>
                  {errors.gender && <span className="error-message">{errors.gender}</span>}
                </div>

              </div>
            </div>

            {/* Section 2: Event Info */}
            <div className="form-section">
              <h2 className="section-title">Event Details</h2>
              <div className="form-grid">
                
                {/* Event Name */}
                <div className="form-group">
                  <label htmlFor="eventName">Choose Event</label>
                  <select
                    id="eventName"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                    className={errors.eventName ? 'input-error' : ''}
                  >
                    <option value="">Select an Event</option>
                    <option value="Tech Summit 2026">Tech Summit 2026</option>
                    <option value="Global Music Festival 2026">Global Music Festival 2026</option>
                    <option value="Modern Art Exhibition 2026">Modern Art Exhibition 2026</option>
                    <option value="AI & Business Conclave 2026">AI & Business Conclave 2026</option>
                    <option value="Developer Hackathon 2026">Developer Hackathon 2026</option>
                  </select>
                  {errors.eventName && <span className="error-message">{errors.eventName}</span>}
                </div>

                {/* Event Date */}
                <div className="form-group">
                  <label htmlFor="eventDate">Event Date</label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className={errors.eventDate ? 'input-error' : ''}
                  />
                  {errors.eventDate && <span className="error-message">{errors.eventDate}</span>}
                </div>

                {/* Number of Participants */}
                <div className="form-group full-width">
                  <label htmlFor="participants">Number of Participants</label>
                  <input
                    type="number"
                    id="participants"
                    name="participants"
                    min="1"
                    value={formData.participants}
                    onChange={handleChange}
                    className={errors.participants ? 'input-error' : ''}
                  />
                  {errors.participants && <span className="error-message">{errors.participants}</span>}
                </div>

                {/* Ticket Type */}
                <div className="form-group full-width">
                  <label>Select Ticket Type</label>
                  <div className="ticket-type-grid">
                    <label className={`ticket-card ${formData.ticketType === 'Standard' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="ticketType"
                        value="Standard"
                        checked={formData.ticketType === 'Standard'}
                        onChange={handleChange}
                      />
                      <div className="ticket-badge standard">Standard</div>
                      <div className="ticket-price">Regular Entry</div>
                      <div className="ticket-desc">Access to main halls & standard seating</div>
                    </label>

                    <label className={`ticket-card ${formData.ticketType === 'VIP' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="ticketType"
                        value="VIP"
                        checked={formData.ticketType === 'VIP'}
                        onChange={handleChange}
                      />
                      <div className="ticket-badge vip">VIP</div>
                      <div className="ticket-price">Premium Access</div>
                      <div className="ticket-desc">Front-row seats, VIP lounge & catering</div>
                    </label>

                    <label className={`ticket-card ${formData.ticketType === 'Student' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="ticketType"
                        value="Student"
                        checked={formData.ticketType === 'Student'}
                        onChange={handleChange}
                      />
                      <div className="ticket-badge student">Student</div>
                      <div className="ticket-price">Discounted</div>
                      <div className="ticket-desc">Valid student ID card required at entry</div>
                    </label>
                  </div>
                  {errors.ticketType && <span className="error-message">{errors.ticketType}</span>}
                </div>

              </div>
            </div>

            {/* Section 3: Additional Details */}
            <div className="form-section">
              <h2 className="section-title">Additional Details</h2>
              <div className="form-grid">
                
                {/* Meal Preference */}
                <div className="form-group full-width">
                  <label>Meal Preference</label>
                  <div className="radio-group-horizontal">
                    <label className="radio-custom-label">
                      <input
                        type="radio"
                        name="mealPreference"
                        value="Veg"
                        checked={formData.mealPreference === 'Veg'}
                        onChange={handleChange}
                      />
                      <span>Vegetarian</span>
                    </label>
                    <label className="radio-custom-label">
                      <input
                        type="radio"
                        name="mealPreference"
                        value="Non-Veg"
                        checked={formData.mealPreference === 'Non-Veg'}
                        onChange={handleChange}
                      />
                      <span>Non-Vegetarian</span>
                    </label>
                    <label className="radio-custom-label">
                      <input
                        type="radio"
                        name="mealPreference"
                        value="Vegan"
                        checked={formData.mealPreference === 'Vegan'}
                        onChange={handleChange}
                      />
                      <span>Vegan</span>
                    </label>
                  </div>
                  {errors.mealPreference && <span className="error-message">{errors.mealPreference}</span>}
                </div>

                {/* Special Requirements */}
                <div className="form-group full-width">
                  <label htmlFor="specialRequirements">Special Requirements (Optional)</label>
                  <textarea
                    id="specialRequirements"
                    name="specialRequirements"
                    placeholder="Accessibility requirements, allergies, special requests, etc."
                    rows="3"
                    value={formData.specialRequirements}
                    onChange={handleChange}
                  />
                </div>

              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="terms-group">
              <label className="checkbox-custom-label">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleCheckboxChange}
                />
                <span className="checkbox-box"></span>
                <span className="checkbox-text">
                  I agree to the Terms & Conditions and understand that event schedule, venue details, and safety guidelines apply to my booking.
                </span>
              </label>
              {errors.acceptTerms && <span className="error-message">{errors.acceptTerms}</span>}
            </div>

            {/* Action Buttons */}
            <div className="form-actions-buttons">
              <button type="button" onClick={handleReset} className="btn-reset">
                Reset
              </button>
              <button type="submit" className="btn-submit">
                Register Now 🚀
              </button>
            </div>

          </div>
        </form>
      ) : (
        // Success Confirmation Screen
        <div className="success-card fade-in">
          <div className="success-icon-container">
            <div className="success-pulse"></div>
            <div className="success-checkmark">✓</div>
          </div>
          
          <h1 className="success-title">Registration Confirmed!</h1>
          <p className="success-subtitle">
            Awesome! Your ticket has been reserved and your slot is booked.
          </p>

          {/* Ticket Information Summary */}
          <div className="ticket-summary">
            <div className="ticket-header">
              <div className="ticket-logo">🎟️ OFFICIAL PASS</div>
              <div className="ticket-code">#EVT-{Math.floor(100000 + Math.random() * 900000)}</div>
            </div>
            
            <div className="ticket-body">
              <div className="ticket-detail">
                <span className="detail-label">Participant Name</span>
                <span className="detail-value highlight">{formData.fullName}</span>
              </div>
              <div className="ticket-detail">
                <span className="detail-label">Selected Event</span>
                <span className="detail-value">{formData.eventName}</span>
              </div>
              <div className="ticket-detail">
                <span className="detail-label">Ticket Tier</span>
                <span className="detail-value">
                  <span className={`badge-tier ${formData.ticketType.toLowerCase()}`}>
                    {formData.ticketType} Pass
                  </span>
                </span>
              </div>
              <div className="ticket-detail">
                <span className="detail-label">Event Date</span>
                <span className="detail-value">{formData.eventDate}</span>
              </div>
              <div className="ticket-detail">
                <span className="detail-label">Total Attendees</span>
                <span className="detail-value">{formData.participants} Guest(s)</span>
              </div>
            </div>
            
            <div className="ticket-footer">
              <div className="ticket-disclaimer">Please present this ticket copy at the reception check-in.</div>
            </div>
          </div>

          <button onClick={handleRegisterAnother} className="btn-success-reset">
            Register Another Participant
          </button>
        </div>
      )}
    </div>
  );
}

export default EventRegistration;
