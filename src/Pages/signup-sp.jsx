import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from 'antd';
import '../styles/loginclient_style.css';
import leftbg from "../assets/images/background/sp_image.png";
import logo from "../assets/images/brand/logo.jpg";
import googlelogo from "../assets/images/brand/google_logo.png";
import Cookies from 'js-cookie'; 

const SignupSP = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSignIn = () => {
    navigate('/login-sp');
  };

  const handleSignUp = (values) => {
    Cookies.set("role", "serviceprovider"); 
    navigate('/');
  };

  return (
    <div className="login-container flex">
      <div className="left-half bg-cover bg-center bg-no-repeat">
        <img src={leftbg} alt="Left half image" className="w-full h-full object-cover object-top" />
      </div>
      <div className="right-half flex flex-col justify-center overflow-y-auto">
        <div className="logo-container" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Logo" />
        </div>
        <div className="signin-text">
          <h2>Sign Up</h2>
          <b>As Service Provider</b>
        </div>
        <div className="signin-options">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={handleSignUp}
          >
            <div className="input-container">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Work Type"
                    name="work_type"
                    rules={[{ required: true, message: 'Please input your work type!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Pay Per Hour"
                    name="pay_per_hour"
                    rules={[{ required: true, message: 'Please input your pay per hour!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Experience"
                    name="experience"
                    rules={[{ required: true, message: 'Please input your experience!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Phone Number"
                    name="phone_number"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="NID Number"
                    name="nid_number"
                    rules={[{ required: true, message: 'Please input your NID number!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit">
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
        {/* <div className="or-text">
          or
        </div>
        <div className="signin-options">
          <button className="google-signin">
            <div className="google-signin-content">
              <img src={googlelogo} alt="Google logo" />
              <span>Sign Up with Google</span>
            </div>
          </button>
        </div> */}
        <div className="signup-option text-center mt-4">
          <p className="text-gray-500">Already have an account? <span onClick={handleSignIn} className="text-blue-500 cursor-pointer hover:underline">Sign In</span></p>
        </div>
      </div>
    </div>
  );
};

export default SignupSP;
