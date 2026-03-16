import  { useState } from 'react';
import './Login.css';

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const handleDemoLogin = () => {
    setLoading(true);
    // Simulate a 2-second wait so it looks "real" to the team
    setTimeout(() => {
      setLoading(false);
      alert("Success! In the real version, this will redirect to the home page.");
    }, 2000);
  };

  return (
    <div className="login-container">
      <div className="login-box">
    
        <h1>INK WEAR</h1>
        <p>Sign in to view the latest updates</p>

        <button className="google-mock-btn" onClick={handleDemoLogin} disabled={loading}>
          <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="G" />
          {loading ? "Connecting..." : "Sign in with Google"}
        </button>

        <div className="divider"><span>or</span></div>

        <div className="mock-form">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="login-submit" onClick={handleDemoLogin}>
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};