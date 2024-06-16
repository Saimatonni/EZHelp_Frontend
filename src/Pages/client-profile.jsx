import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
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
import RatingPopup from "./RatingPopUp";

const ClientProfile = () => {
  const [initialValues, setInitialValues] = useState([]);
  const [imageBase64, setImageBase64] = useState("");
  const [postedJobs, setPostedJobs] = useState([]);
  const navigate = useNavigate();
  const [showPostedJobs, setShowPostedJobs] = useState(true);
  const [assignedSPs, setAssignedSPs] = useState([]);
  const [ratingPopupVisible, setRatingPopupVisible] = useState(false);

  const fetchProfileDetails = async () => {
    try {
      const id = Cookies.get("userid");
      const accessToken = Cookies.get("access_token");
      const response = await fetch(`${BASE_URL}/clients/${id}`, {
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

  const fetchPostedJobs = async () => {
    try {
      const id = Cookies.get("userid");
      const accessToken = Cookies.get("access_token");
      const response = await fetch(`${BASE_URL}/jobs/user/${id}`, {
        headers: {
          "access-token": accessToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jobsData = await response.json();
      setPostedJobs(jobsData.data);
    } catch (error) {
      console.error("Failed to fetch posted jobs:", error);
    }
  };

  const fetchAssignedSPs = async () => {
    try {
      const id = Cookies.get("userid");
      const accessToken = Cookies.get("access_token");
      const response = await fetch(`${BASE_URL}/assignments`, {
        headers: {
          "access-token": accessToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const assignedSPsData = await response.json();
      setAssignedSPs(assignedSPsData[0].provider_details);
    } catch (error) {
      console.error("Failed to fetch assigned service providers:", error);
    }
  };


  useEffect(() => {
    fetchProfileDetails();
    fetchPostedJobs();
    fetchAssignedSPs();
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
        email: values.n_email,
        phone_number: values.n_phone_number,
        password: values.n_password,
        image: imageBase64,
      };

      const response = await fetch(`${BASE_URL}/clients/${id}`, {
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

  const handleToggleView = () => {
    setShowPostedJobs(!showPostedJobs);
    if (!showPostedJobs) {
      fetchAssignedSPs();
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const accessToken = Cookies.get("access_token");
      const response = await fetch(`${BASE_URL}/jobs/delete?job_id=${jobId}`, {
        method: "DELETE",
        headers: {
          "access-token": accessToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      message.success("Job deleted successfully");
      fetchPostedJobs();
    } catch (error) {
      message.error("Failed to delete job. Please try again later.");
      console.error("Failed to delete job:", error);
    }
  };

  const handleToggleJobStatus = async (jobId, openStatus) => {
    try {
      const accessToken = Cookies.get("access_token");
      const response = await fetch(
        `${BASE_URL}/jobs/${jobId}/update_open_status?open_status=${openStatus}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "access-token": accessToken,
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const messageText = openStatus
        ? "Job opened successfully"
        : "Job closed successfully";
      message.success(messageText);
      fetchPostedJobs();
    } catch (error) {
      message.error("Failed to update job status. Please try again later.");
      console.error("Failed to update job status:", error);
    }
  };

  const handleRatingClick = () => {
    setRatingPopupVisible(true);
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
          </div>
        </div>
        <div className="text-container">
          <h4 className="heading-style">Edit Profile</h4>
          <Form
            //  initialValues={initialValues}
            labelAlign="left"
            onFinish={onFinish}
          >
            <Form.Item label="Image" name="image">
              <Upload beforeUpload={handleImageUpload}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
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
              label="Password"
              name="n_password"
              rules={[{ required: false }]}
            >
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
        <div style={{ marginTop: "20px", marginBottom: "38px" }}>
          <Button
            color="primary"
            style={{ marginRight: "10px" }}
            onClick={() => setShowPostedJobs(true)}
            disabled={showPostedJobs}
          >
            Job Posted
          </Button>
          <Button
            color="primary"
            onClick={() => setShowPostedJobs(false)}
            disabled={!showPostedJobs}
          >
            Assigned Service Providers
          </Button>
        </div>
        {showPostedJobs ? (
          <div>
            {postedJobs.length > 0 ? (
              <div>
                {postedJobs.map((job) => (
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
                          <Button
                            style={{
                              backgroundColor: "#FF4C4C",
                              height: "40px",
                              width: "80px",
                            }}
                            onClick={() => handleDeleteJob(job._id)}
                          >
                            Delete
                          </Button>
                          {job.open ? (
                            <Button
                              style={{
                                backgroundColor: "#00B74A",
                                height: "40px",
                                width: "80px",
                                marginLeft: "10px",
                              }}
                              onClick={() =>
                                handleToggleJobStatus(job._id, false)
                              }
                            >
                              Close
                            </Button>
                          ) : (
                            <Button
                              style={{
                                backgroundColor: "#4287f5",
                                height: "40px",
                                width: "80px",
                                marginLeft: "10px",
                              }}
                              onClick={() =>
                                handleToggleJobStatus(job._id, true)
                              }
                            >
                              Open
                            </Button>
                          )}
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
        ) : (
          <div className="border rounded-lg p-4">
            
              <div className="flex justify-between">
                <div className="flex">
                  <div className="text-center mb-4">
                    <img
                      src={assignedSPs.image}
                      alt={assignedSPs.name}
                      className="mx-auto h-20 w-20 rounded-full"
                    />
                  </div>
                  <div className="ml-5">
                    <h2 className="text-xl font-bold mb-1">{assignedSPs.name}</h2>
                    <p className="text-sm text-gray-600 mb-1">
                      {assignedSPs.work_type}
                    </p>
                    <div className="flex mb-0">
                      <Rating
                        className="text-brand__font__size__sm text-black"
                        readonly
                        initialRating={assignedSPs.rating}
                        emptySymbol={<AiOutlineStar />}
                        fullSymbol={<AiFillStar />}
                      />
                      <p className="text-sm text-gray-600 ml-4">
                        {assignedSPs.total_review_count} Reviews
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {assignedSPs.experience} years of Experience
                    </p>
                  </div>
                </div>
                <div>
                  <p className="mt-2 text-lg font-bold">
                    {assignedSPs.pay_per_hour} Taka/hour
                  </p>
                  <Button
                    style={{
                      backgroundColor: "#12002E",
                      height: "40px",
                      width: "120px",
                      marginTop: "10px"
                    }}
                    onClick={handleRatingClick}
                    // onClick={() => hireServiceProvider(assignedSPs._id)}
                  >
                    Give Rating
                  </Button>
                </div>
              </div>
            
          </div>
        )}
      </div>
      {ratingPopupVisible && (
        <RatingPopup
          providerId="666c52ec7f038633dcc3b464"
          clientName={initialValues.name} 
          clientImage={initialValues.image} 
          onClose={() => setRatingPopupVisible(false)} 
        />
      )}
    </div>
  );
};

export default ClientProfile;
