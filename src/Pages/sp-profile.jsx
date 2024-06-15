import React, { useEffect, useState } from "react";
import dp from "../assets/images/dwight.jpg";
import gradientbg from "../assets/images/banner/vector2.png";
import '../styles/noushin.css';
import { Form, Input } from 'antd';
import servicesProvided from "../data/service_provided";
import Rating from "react-rating";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
    Button,
  } from "reactstrap";

import { BASE_URL } from "../utils/config";
import { UploadOutlined } from "@ant-design/icons";
import { Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SPprofile = () => {
  const [initialValues, setInitialValues] = useState([]);
  const [imageBase64, setImageBase64] = useState("");
  const [biddedJobs, setBiddedJobs] = useState([]);
  const navigate = useNavigate();

  const fetchProfileDetails = async () => {
    try {
      const id = Cookies.get("userid");
      const accessToken = Cookies.get("access_token");
      const response = await fetch(`${BASE_URL}/service-providers/${id}`, {
        headers: {
          "access-token": accessToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const profileData = await response.json();
      setInitialValues(profileData.data);
    } catch (error) {
      console.error("Failed to fetch profile details:", error);
    }
  };

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageBase64(reader.result.split(",")[1]);
    };
    reader.readAsDataURL(file);
    return false;
  };


  return (
    <div style={{ backgroundImage: `url(${gradientbg})` }}>
      <div className="container">
        <div className="image-container" style={{ backgroundImage: `url(${gradientbg})` }}>
          <img src={dp} alt="Circular Image" className="circular-image" />
          <div className="text-ok">
          <h6>{initialValues.name}</h6>
            <p>{initialValues.email}</p>
            <p>{initialValues.phone_number}</p>
          </div>
        </div>
        <div className="text-container">
          <h4 className= "heading-style">
            Edit Profile
          </h4>
          <Form
            initialValues={initialValues}
            labelAlign="left"
          >
            <Form.Item
              label=""
              name="name"
              rules={[{ required: false, message: 'Edit your name' }]}
            >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              label=""
              name="email"
              rules={[{ required: false, message: 'Edit your email' }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              label=""
              name="phone_number"
              rules={[{ required: false, message: 'Edit your phone number' }]}
            >
              <Input placeholder="Phone Number" />
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="list-container">
        <h3 className="spacing">Service Provided</h3>
        <div>
        <div>
          {servicesProvided.map((service_provided, index) => (
            <div key={index} className="list-services">
              <div className="flex justify-between">
                <div className="flex">
                  <div className="id-style">
                    <h6>
                      Service Id : 
                    </h6>
                    <h6>
                      {service_provided.id}
                    </h6>
                  </div>
                  <div className="text-center mb-4">
                    <img
                      src={service_provided.image}
                      alt={service_provided.name}
                      className="mx-auto h-20 w-20 rounded-full"
                    />
                  </div>
                  <div className="ml-5">
                    <h2 className="text-xl mb-1">{service_provided.name}</h2>
                    <div className="flex mb-0">
                      <Rating
                        className="text-brand__font__size__sm text-black"
                        readonly
                        initialRating={service_provided.rating}
                        emptySymbol={<AiOutlineStar />}
                        fullSymbol={<AiFillStar />}
                      />
                    </div>
                    <p>

                    </p>
                    <p className="text-sm text-gray-600">
                      Job Duration: {service_provided.start} - {service_provided.finish} 
                    </p>
                  </div>
                </div>
                <div className="">
                  <p className="mt-2 text-lg font-bold">
                    {service_provided.amount}
                  </p>
                  <Button
                      style={{
                        backgroundColor: "#12002E",
                        height: "40px",
                        width: "120px",
                      }}
                    >
                      {service_provided.isFinished}
                    </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default SPprofile;
