import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import gradientbg from "../../assets/images/banner/vector2.png";
import banner from "../../assets/images/banner/banner.png";

const Banner = () => {
  return (
    <Row className="w-full px-5  backdrop-blur-md">
      <Col md={6} className="relative">
        <div className="absolute inset-0 flex flex-col mt-20 px-10 ml-10">
          <div className="text-3xl md:text-7xl font-bold mt-20">
            Hire Any Service With Ease
          </div>
          <div className="mt-2 md:mt-4 text-base md:text-lg">
            This is your Ultimate Assistance Platform to simplify the process of connecting those in need with the right helping hands
          </div>
          <div className="flex mt-2 md:mt-4">
            <Button style={{ backgroundColor: '#12002E', marginRight: '10px' }}>Hire a Service</Button>
            <Button style={{ backgroundColor: 'transparent', border: '2px solid #12002E', color: 'black' }}>Find Work</Button>
          </div>
        </div>
      </Col>
      <Col md={6} className="relative d-none d-md-block">
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={banner} alt="Banner" className="max-w-full max-h-full" />
        </div>
        <img src={gradientbg} alt="Gradient Background" style={{ width: '100%', height: 'auto' }} />
      </Col>
    </Row>
  );
};

export default Banner;







