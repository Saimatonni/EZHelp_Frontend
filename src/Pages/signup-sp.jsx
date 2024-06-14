import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col ,notification} from 'antd';
import '../styles/loginclient_style.css';
import leftbg from "../assets/images/background/sp_image.png";
import logo from "../assets/images/brand/logo.jpg";
import { BASE_URL } from '../utils/config';

const SignupSP = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSignIn = () => {
    navigate('/login-sp');
  };

  const handleSignUp = async (values) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: values.name,
        work_type: values.work_type,
        pay_per_hour: parseInt(values.pay_per_hour),
        experience: parseInt(values.experience),
        email: values.email,
        phone_number: values.phone_number,
        nid_number: values.nid_number,
        role: 'serviceprovider',
        password: values.password
      })
    };

    try {
      const response = await fetch(`${BASE_URL}/service-providers/register`, requestOptions);
      const data = await response.json();
      if (response.ok) {
        console.log('Registration successful:', data);
        notification.success({
          message: 'Registration Successful',
          description: 'You have successfully registered as a service provider.'
        });
        navigate('/login-sp');
      } else {
        console.error('Registration failed:', data.message);
        notification.error({
          message: 'Registration Failed',
          description: data.message || 'Something went wrong. Please try again later.'
        });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      notification.error({
        message: 'Registration Error',
        description: 'Failed to register. Please check your network connection and try again.'
      });
    }
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
        <div className="signup-option text-center mt-4">
          <p className="text-gray-500">Already have an account? <span onClick={handleSignIn} className="text-blue-500 cursor-pointer hover:underline">Sign In</span></p>
        </div>
      </div>
    </div>
  );
};

export default SignupSP;
