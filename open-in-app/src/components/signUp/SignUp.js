import React from 'react';
import './SignUp.scss';
import googleLogo from "../../assets/logos/google.png"
import appleLogo from "../../assets/logos/apple.png"
import brandlogo from "../../assets/logos/brand-logo.png"
import github from "../../assets/logos/Vector (4).svg"
import twitter from "../../assets/logos/Vector (5).svg"
import linkedin from "../../assets/logos/Vector (3).svg"
import discord from "../../assets/logos/Vector (6).svg"

function SignUp() {

  return (
      <div className="container">
        <aside className="SignUpsidebar">
          <div>
            <img className="brandlogo" src={brandlogo} alt="" />
          </div>
          <div className="logo">
            BASE
          </div>
          <div className="social-links">
            <img className="social-media-logo" src={github} alt="" />
            <img className="social-media-logo" src={twitter} alt="" />
            <img className="social-media-logo" src={linkedin} alt="" />
            <img className="social-media-logo" src={discord} alt="" />
          </div>
        </aside>
        <main className="main-content">
          <div className="signin-card">
            <h1 className="signin-title">Sign In</h1>
            <h5>Sign in to your account</h5>
            <div className='login-path-container'>
              <div className="googleLogo-container">
                <img src={googleLogo} alt="Base Logo" className="googlelogo" />
                <h6 className="logo-title">Sign in with Google</h6>
              </div>
              <div className="appleLogo-container">
                <img src={appleLogo} alt="Base Logo" className="applelogo" />
                <h6 className="logo-title">Sign in with Apple</h6>
              </div>
              <div></div>
            </div>
            <div className="signin-methods">
            </div>
            <form className="signin-form">
              <div className="input-title-field-container">
                <div className="input-title">Email Address</div>
                <input type="email" id="email" placeholder="Email address" />
              </div >
              <div className="input-title-field-container">
                <div className="input-title">Password</div>
                <input type="password" id="password" placeholder="Password" />
                <div className="forgot-password">Forgot password?</div>
              </div>
              <button type="button" className="signin-button" onClick={() => { window.location.href = './uploadPage'; }}>Sign In</button>

            </form>
            <div className="signup-link">
              Don't have an account? <a href="./uploadPage">Register here</a>
            </div>
          </div>
        </main>
      </div>
  );
}
export default SignUp;
