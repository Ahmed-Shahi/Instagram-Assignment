import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import MetaLogo from "../assets/loop.png"
import axios from 'axios';

function SignUp() {
  const navigate = useNavigate();
  const baseurl = "https://instagram-assignment-ivory.vercel.app"
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    month: '',
    day: '',
    year: '',
    fullName: '',
    username: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showBirthdayInfo, setShowBirthdayInfo] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(baseurl+"/auth/signup",formData)
    .then((res)=>{
      alert(res.data)
      navigate("/")
    })
    .catch((err)=>{
      alert(err.data)
    })
  };

  const handleBackToLogin = () => {
    navigate('/');
  };
  const arrow = "<";
  return (
    <div className="signup-page-wrapper">
      <div className="signup-card">
        {/* Top Header */}
        <div className="signup-card-header">
          <button
            type="button"
            className="signup-back-btn"
            onClick={handleBackToLogin}
            aria-label="Back to login"
          >
            {arrow}
          </button>
        </div>
        <div className='meta-brand'>
          <img src={MetaLogo} alt="Meta Logo" className='meta-logo' />
          <p
            fill="#000000"
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
            fontSize="18"
            fontWeight="700"
            letterSpacing="-0.4px"
          >
            Meta
          </p>
        </div>

        {/* Title Section */}
        <div className="signup-headings">
          <h1 className="signup-title">Get started on Instagram with a Meta Account</h1>
          <p className="signup-subtitle">
            A Meta Account lets you access multiple Meta technologies, like Instagram, easily and securely.
          </p>
        </div>

        {/* Main Form */}
        <form className="signup-form" onSubmit={handleSubmit}>
          {/* Mobile Number or Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Mobile number or email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              className="form-input"
              placeholder="Mobile number or email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
            <p className="form-helper-text">
              You may receive notifications from us.{' '}
              <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="form-link"
              >
                Learn why we ask for your contact information
              </a>
            </p>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div className="input-password-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
              {formData.password && (
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              )}
            </div>
          </div>

          {/* Birthday */}
          <div className="form-group">
            <div className="label-with-info">
              <label className="form-label">Birthday</label>
              <button
                type="button"
                className="info-btn"
                onClick={() => setShowBirthdayInfo(!showBirthdayInfo)}
                title="Click for more information about birthday"
                aria-label="Birthday information"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </button>
            </div>

            {showBirthdayInfo && (
              <div className="birthday-info-tooltip">
                Providing your birthday helps make sure you get the right Instagram experience for your age. If you want to change who can see this, go to your Personal Information account settings.
              </div>
            )}

            <div className="birthday-selects">
              <div className="select-container">
                <select
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  className="birthday-select"
                >
                  <option value="" disabled>Month</option>
                  {months.map((m, idx) => (
                    <option key={idx} value={m}>{m}</option>
                  ))}
                </select>
                <span className="select-chevron">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.2" fill="none">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </div>

              <div className="select-container">
                <select
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  className="birthday-select"
                >
                  <option value="" disabled>Day</option>
                  {days.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <span className="select-chevron">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.2" fill="none">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </div>

              <div className="select-container">
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="birthday-select"
                >
                  <option value="" disabled>Year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                <span className="select-chevron">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.2" fill="none">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="fullName">
              Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              className="form-input"
              placeholder="Full name"
              value={formData.fullName}
              onChange={handleChange}
              autoComplete="name"
            />
          </div>

          {/* Username */}
          <div className="form-group">
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="form-input"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
            />
          </div>

          {/* Terms & Policies Section */}
          <div className="policy-agreements">
            <p className="policy-text">
              People who use our service may have uploaded your contact information to Instagram.{' '}
              <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="policy-link"
              >
                Learn more.
              </a>
            </p>

            <p className="policy-text">
              By tapping Submit, you agree to create an account and to Instagram's{' '}
              <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="policy-link"
              >
                Terms
              </a>
              ,{' '}
              <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="policy-link"
              >
                Privacy Policy
              </a>{' '}
              and{' '}
              <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="policy-link"
              >
                Cookies Policy
              </a>
              .
            </p>

            <p className="policy-text">
              The{' '}
              <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="policy-link"
              >
                Privacy Policy
              </a>{' '}
              describes the ways we can use the information we collect when you create an account. For example, we use this information to provide, personalize and improve our products, including ads.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="signup-actions">
            <button type="submit" className="signup-submit-btn" >
              Submit
            </button>
            <button
              type="button"
              className="signup-login-btn"
              onClick={handleBackToLogin}
            >
              I already have an account
            </button>
          </div>
        </form>
      </div>

      
    </div>
  );
}

export default SignUp;