import React from 'react';
import ReactDOM from 'react-dom';
import './SignUp.scss';
import googleLogo from "./assets/logos/google.png"
import appleLogo from "./assets/logos/apple.png"
import brandlogo from "./assets/logos/brand-logo.png"
import github from "./assets/logos/github.png"
import linkedin from "./assets/logos/link.png"
import twitter from "./assets/logos/twitter.png"
import discord from "./assets/logos/discord.png"

function App() {
  return (
    <div className="container">
      <aside className="sidebar">
        <div>
          <img className="brandlogo" src={brandlogo} alt="" />
        </div>
        {/* Sidebar content */}
        <div className="logo">
          BASE
        </div>
        <div className="social-links">
        <img className="social-media-logo" src={github} alt="" />
        <img className="social-media-logo" src={linkedin} alt="" />
        <img className="social-media-logo" src={twitter} alt="" />
        <img className="social-media-logo" src={discord} alt="" />
        </div>
      </aside>
      <main className="main-content">
        <div className="signin-card">
          <h1 className="signin-title">Sign In</h1>
          <h5>Sign in to your account</h5>
          <div className='login-path-container'>
            <div className="googleLogo-container">
            <img src={googleLogo} alt="Base Logo" className="logo" />
              <h6 className="logo-title">Sign in with Google</h6>
            </div>
            <div className="appleLogo-container">
            <img src={appleLogo} alt="Base Logo" className="logo" />
              <h6 className="logo-title">Sign in with Apple</h6>
            </div>
            <div></div>
          </div>
          <div className="signin-methods">
            {/* Sign in methods */}
          </div>
          <form className="signin-form">
            {/* Form fields */}
            <div className="input-title">Email Address</div>
            <input type="email" id="email" placeholder="Email address" />
            <div className="input-title">Password</div>
            <input type="password" id="password" placeholder="Password" />
            <div className="forgot-password">Forgot password?</div>
            <button type="submit" className="signin-button">Sign In</button>
          </form>
          <div className="signup-link">
            Don't have an account? <a href="./">Register here</a>
          </div>
        </div>
      </main>
    </div>
  );
}
export default App;

ReactDOM.render(<App />, document.getElementById('root'));
