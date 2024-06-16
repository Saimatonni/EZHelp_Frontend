import React, { useEffect, useState } from "react";
import dp from "../assets/images/dwight.jpg";
import gradientbg from "../assets/images/banner/vector2.png";
import "../styles/noushin.css";
import { Form, Input, Button as AntButton, message, Upload } from "antd";
import servicesProvided from "../data/service_provided";
import Rating from "react-rating";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Button } from "reactstrap";

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

  const fetchBiddedJobs = async () => {
    try {
      const id = Cookies.get("userid");
      const accessToken = Cookies.get("access_token");
      const response = await fetch(`${BASE_URL}/jobs/bidded/${id}`, {
        headers: {
          "access-token": accessToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jobData = await response.json();
      setBiddedJobs(jobData.data);
    } catch (error) {
      console.error("Failed to fetch bidded jobs:", error);
    }
  };

  useEffect(() => {
    fetchProfileDetails();
    fetchBiddedJobs();
  }, []);

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageBase64(reader.result.split(",")[1]);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const onFinish = async (values) => {
    try {
      const id = Cookies.get("userid");
      const accessToken = Cookies.get("access_token");

      const requestBody = {
        name: values.n_name,
        work_type: values.n_work_type,
        pay_per_hour: values.n_pay_per_hour,
        experience: values.n_experience,
        email: values.n_email,
        phone_number: values.n_phone_number,
        nid_number: values.n_nid_number,
        image: imageBase64,
        password: values.n_password,
      };

      const response = await fetch(`${BASE_URL}/service-providers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "access-token": accessToken,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      message.success("Profile updated successfully");
      console.log("Profile updated successfully");
      fetchProfileDetails();
    } catch (error) {
      message.error("Failed to update profile. Please try again later.");
      console.error("Failed to update profile:", error);
    }
  };

  const timeSince = (date) => {
    const now = new Date();
    const postedDate = new Date(date.split("-").reverse().join("-")); // Parse "DD-MM-YYYY" format
    const seconds = Math.floor((now - postedDate) / 1000);

    let interval = Math.floor(seconds / 3600);
    if (interval > 24) {
      const days = Math.floor(interval / 24);
      return days > 1 ? `${days} days ago` : "1 day ago";
    }
    if (interval >= 1) {
      return interval > 1 ? `${interval} hours ago` : "1 hour ago";
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval > 1 ? `${interval} minutes ago` : "1 minute ago";
    }
    return `${seconds} seconds ago`;
  };

  return (
    <div style={{ backgroundImage: `url(${gradientbg})` }}>
      <div className="container">
        <div
          className="image-container"
          style={{ backgroundImage: `url(${gradientbg})` }}
        >
          <img
            src={initialValues.image}
            alt="Circular Image"
            className="circular-image"
          />
          <div className="text-ok">
            <h6>{initialValues.name}</h6>
            <p>{initialValues.email}</p>
            <p>{initialValues.phone_number}</p>
            <p>{initialValues.work_type}</p>
          </div>
        </div>
        <div className="text-container">
          <h4 className="heading-style">Edit Profile</h4>
          <Form labelAlign="left" onFinish={onFinish}>
            <Form.Item label="Image" name="image">
              <Upload beforeUpload={handleImageUpload}>
                <AntButton icon={<UploadOutlined />}>Click to upload</AntButton>
              </Upload>
            </Form.Item>
            <Form.Item
              label="Name"
              name="n_name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              label="Work Type"
              name="n_work_type"
              rules={[
                { required: true, message: "Please enter your work type" },
              ]}
            >
              <Input placeholder="Work Type" />
            </Form.Item>
            <Form.Item
              label="Pay Per Hour"
              name="n_pay_per_hour"
              rules={[
                { required: true, message: "Please enter your pay per hour" },
              ]}
            >
              <Input type="number" placeholder="Pay Per Hour" />
            </Form.Item>
            <Form.Item
              label="Experience"
              name="n_experience"
              rules={[
                { required: true, message: "Please enter your experience" },
              ]}
            >
              <Input type="number" placeholder="Experience" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="n_email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="n_phone_number"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <Input placeholder="Phone Number" />
            </Form.Item>
            <Form.Item
              label="NID Number"
              name="n_nid_number"
              rules={[
                { required: true, message: "Please enter your NID number" },
              ]}
            >
              <Input placeholder="NID Number" />
            </Form.Item>
            <Form.Item label="Password" name="n_password">
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <AntButton type="primary" htmlType="submit">
                Submit
              </AntButton>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="list-container">
        <h3 className="spacing">Bidded Jobs</h3>
        <div>
          <div>
          {biddedJobs.length > 0 ? (
              <div>
                {biddedJobs.map((job) => (
                  <Col key={job._id} sm="11" className="mb-4">
                    <div className="border rounded-md px-4 py-2">
                      <div className="flex justify-between">
                        <h1>{job.workType} Needed</h1>
                        <div>
                          <Button
                            style={{
                              backgroundColor: "#12002E",
                              height: "40px",
                              width: "80px",
                              marginRight: "10px",
                            }}
                            onClick={() => navigate(`/job-details/${job._id}`)}
                          >
                            View
                          </Button>
                         
                          
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <p className="mb-1">{job.address}</p>
                        <p>{job.bidded_sp_ids.length} people bidded</p>
                      </div>
                      <p className="mb-1">{job.shortTitle}</p>
                      <p className="font-bold">
                        posted {timeSince(job.startDate)}
                      </p>
                    </div>
                  </Col>
                ))}
              </div>
            ) : (
              <p>No jobs posted yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SPprofile;
