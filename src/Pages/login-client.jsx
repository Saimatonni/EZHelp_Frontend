import React from 'react';
import '../styles/loginclient_style.css';
import leftbg from "../assets/images/background/client_login.png";
import logo from "../assets/images/brand/logo.jpg";
import googlelogo from "../assets/images/brand/google_logo.png";

const LoginClient = () => {
  return (
    <div className="h-full flex flex-col justify-center py-10 bg-cover bg-center bg-no-repeat">
      <div className="login-container flex">
        <div className="left-half bg-cover bg-center bg-no-repeat">
          <img src={leftbg} alt="Left half image" className="w-full h-full object-cover object-top" />
        </div>
        <div className="right-half">
          <div className="logo-container">
            <img src={logo} alt="Logo" />
          </div>
          <div className="signin-text">
            <h2>Sign in</h2>
            <b>As Client</b>
          </div>
          <div className="signin-options">
            <button className="google-signin">
              <div className="google-signin-content">
                <img src={googlelogo} alt="Google logo" />
                <span>Sign in with Google</span>
              </div>
            </button>
            <div className="or-text">
              or
            </div>
            <button className="client-signin">
              Sign in as a Service Provider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginClient;
