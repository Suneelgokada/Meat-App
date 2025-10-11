import React, { useState } from 'react';
import OtpInput from './Otpinput';
import Icons from './Icons';

const UserLogin = ({ onLoginSuccess }) => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const validateMobile = () => {
    if (!mobile.trim()) {
      setMessage('Please enter your mobile number');
      return false;
    }
    if (!/^\d{10}$/.test(mobile.trim())) {
      setMessage('Mobile number must be 10 digits');
      return false;
    }
    return true;
  };

  const handleSendOtp = () => {
    setMessage('');
    if (!validateMobile()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setMessage(`OTP sent to ${mobile}`);
    }, 1000);
  };

  return (
    <div className="background-image">
      <div className="login-container">
        <div className="login-header">
          <div className="login-icon">
            <Icons.User />
          </div>
          <h1>User Login</h1>
        </div>

        {message && (
          <div className={`message ${otpSent ? 'success-message' : 'error-message'}`}>
            {message}
          </div>
        )}

        {!otpSent ? (
          <div className="login-form">
            <div className="form-group">
              <label htmlFor="mobile">Mobile Number</label>
              <input
                type="tel"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter your mobile number"
                maxLength={10}
                disabled={loading}
              />
            </div>

            <button className="login-button" onClick={handleSendOtp} disabled={loading}>
              {loading ? (
                <>
                  <Icons.Spinner /> Sending OTP...
                </>
              ) : (
                'Send OTP'
              )}
            </button>
          </div>
        ) : (
          <div className="login-form">
            <label>Enter OTP</label>
            <OtpInput length={6} onChange={setOtp} />
            <button className="login-button" onClick={onLoginSuccess} style={{ marginTop: '20px' }}>
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLogin;
