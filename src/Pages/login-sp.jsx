import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';
import '../styles/loginclient_style.css';
import leftbg from "../assets/images/background/sp_image.png";
import logo from "../assets/images/brand/logo.jpg";
import { BASE_URL } from '../utils/config';
import Cookies from 'js-cookie'; 

const LoginSP = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSignUp = () => {
    navigate('/signup-sp');
  };

  const handleSignIn = async (values) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role: 'serviceprovider',
        email: values.username,
        password: values.password
      })
    };

    try {
      const response = await fetch(`${BASE_URL}/service-providers/login`, requestOptions);
      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        Cookies.set("role", "serviceprovider");
        Cookies.set("access_token", data.access_token);
        Cookies.set("userid", data.sp_id);
        notification.success({
          message: 'Login Successful',
          description: 'You have successfully logged in as a service provider.'
        });
        navigate('/');
      } else {
        console.error('Login failed:', data.message);
        notification.error({
          message: 'Login Failed',
          description: data.message || 'Invalid username or password. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      notification.error({
        message: 'Login Error',
        description: 'Failed to login. Please check your network connection and try again.'
      });
    }
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
          <b>As Service Provider</b>
        </div>
        <div className="signin-options">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={handleSignIn}
          >
            <Form.Item
              label="Email"
              name="username"
              rules={[{ required: true, message: 'Please input your email!' }]}
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
        <div className="signup-option text-center mt-4">
          <p className="text-gray-500">Don't have an account? <span onClick={handleSignUp} className="text-blue-500 cursor-pointer hover:underline">Sign up</span></p>
        </div>
      </div>
    </div>
  );
};

export default LoginSP;
