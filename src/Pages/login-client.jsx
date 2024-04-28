import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import '../styles/loginclient_style.css';
import leftbg from "../assets/images/background/client_login.png";
import logo from "../assets/images/brand/logo.jpg";
import googlelogo from "../assets/images/brand/google_logo.png";
import Cookies from 'js-cookie'; 

const LoginClient = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    // Cookies.remove('role');
    navigate('/');
  };

  const handleSignIn = (values) => {
    Cookies.set("role", "client"); 
    navigate('/');
  };

  const handleSignUp = () => {
    navigate('/signup-client');
  };

  return (
      <div className="login-container flex">
        <div className="left-half bg-cover bg-center bg-no-repeat">
          <img src={leftbg} alt="Left half image" className="w-full h-full object-cover object-top" />
        </div>
        <div className="right-half flex flex-col justify-center">
          <div className="logo-container" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <img src={logo} alt="Logo" />
          </div>
          <div className="signin-text">
            <h2>Sign in</h2>
            <b>As Client</b>
          </div>
          <div className="signin-options">
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={handleSignIn}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit">
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="or-text">
            or
          </div>
          <div className="signin-options">
            <button className="google-signin">
              <div className="google-signin-content">
                <img src={googlelogo} alt="Google logo" />
                <span>Sign in with Google</span>
              </div>
            </button>
          </div>
          <div className="signup-option text-center mt-4">
            <p className="text-gray-500">Don't have an account? <span onClick={handleSignUp} className="text-blue-500 cursor-pointer hover:underline">Sign up</span></p>
          </div>
        </div>
      </div>
  );
};

export default LoginClient;
