import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Button,
} from "reactstrap";
import { BASE_URL } from "../utils/config";
import Rating from "react-rating";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import Cookies from "js-cookie";
import {
  notification
} from "antd";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [biddedServiceProviders, setBiddedServiceProviders] = useState([]);
  const navigate = useNavigate();

  const fetchJob = async () => {
    try {
      const response = await fetch(`${BASE_URL}/jobs/${id}`);
      const result = await response.json();
      if (response.ok) {
        setJob(result.data);
        setCoordinates({
          lat: result.data.GPSCoordinates.latitude,
          lng: result.data.GPSCoordinates.longitude,
        });
      } else {
        console.error('Error fetching job:', result.message);
      }
    } catch (error) {
      console.error('Error fetching job:', error);
    }
  };
  const fetchBiddedServiceProviders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/bibbed_sp/${id}`);
      const result = await response.json();
      if (response.ok) {
        setBiddedServiceProviders(result.data);
      } else {
        console.error('Error fetching service providers:', result.message);
      }
    } catch (error) {
      console.error('Error fetching service providers:', error);
    }
  };
  useEffect(() => {

    fetchJob();
    fetchBiddedServiceProviders();
  }, [id]);

  const mapStyles = {
    width: "100%",
    height: "400px",
  };

  const defaultCenter = {
    lat: 23.777176,
    lng: 90.399452,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB1GNLedehoDsSDG3f-cf2XCHxiUtIz6bg",
    libraries: ["places"],
  });

  const timeSince = (date) => {
    const now = new Date();
    const postedDate = new Date(date.split('-').reverse().join('-')); // Parse "DD-MM-YYYY" format
    const seconds = Math.floor((now - postedDate) / 1000);

    let interval = Math.floor(seconds / 3600);
    if (interval > 24) {
      const days = Math.floor(interval / 24);
      return days > 1 ? `${days} days ago` : '1 day ago';
    }
    if (interval >= 1) {
      return interval > 1 ? `${interval} hours ago` : '1 hour ago';
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval > 1 ? `${interval} minutes ago` : '1 minute ago';
    }
    return `${seconds} seconds ago`;
  };

  const handleBidNow = async () => {
    const accessToken = Cookies.get("access_token");
    const id2 = Cookies.get("userid");
    if (!accessToken) {
      navigate("/login-sp"); 
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/jobs/${id}/bid?sp_id=${id2}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "access-token": accessToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Bid placed successfully:", result);
      fetchJob();
      fetchBiddedServiceProviders();
      notification.success({
        message: "Bid Placed Successfully",
        description: "Your bid has been successfully placed on this job.",
      });
    } catch (error) {
      console.error("Failed to place bid:", error);
      notification.error({
        message: "Failed to Place Bid",
        description: "Failed to place your bid. Please try again later.",
      });
    }
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <section className="h-full flex flex-col justify-center py-10">
      <div className="max-w-screen-xl w-full mx-auto p-content__padding flex flex-col justify-center items-center">
        <div className="w-full h-[400px] border group relative rounded-tl-md rounded-tr-md">
          <div className="absolute group-hover:bg-opacity-0 duration-300 top-0 left-0 right-0 bottom-0 w-full h-full bg-black bg-opacity-50 group-hover:invisible rounded-tl-md rounded-tr-md"></div>
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={10}
              center={defaultCenter}
            >
              {coordinates.lat !== 0 && coordinates.lng !== 0 && (
                <Marker position={{ lat: coordinates.lat, lng: coordinates.lng }} />
              )}
            </GoogleMap>
          )}
        </div>
      </div>
      <div className="mt-4 px-28 ml-5 mr-5">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">{job.shortTitle}</h1>
          <h1 className="text-4xl font-bold">${job.payAmount}</h1>
        </div>
        <div className="flex justify-between">
          <div className="flex">
            {job.open ? (
              <p className="text-black font-bold bg-green-300 mr-10 px-4 py-2 rounded-lg">
                Open
              </p>
            ) : (
              <p className="text-black font-bold bg-red-300 mr-10 px-4 py-2 rounded-lg">
                Closed
              </p>
            )}
            <p className="text-black font-bold">Posted {timeSince(job.startDate)}</p>
          </div>

          <p className="text-black font-bold">{job.bidded_sp_ids.length} bid</p>
        </div>
        <p>Location : {job.address}</p>
        <p
          className={`bg-white border px-2 rounded-lg border-2 py-1`}
          style={{ width: `${job.workType.length * 8}px` }}
        >
          {job.workType}
        </p>
        <div className="flex justify-between">
          <Col md="9">
            <p className="text-gray-600">{job.description}</p>
          </Col>
          <Col md="3">
            <Button
              style={{
                backgroundColor: "#12002E",
                height: "40px",
                width: "120px",
                marginLeft: "180px"
              }}
              onClick={handleBidNow}
            >
              Bid Now
            </Button>
          </Col>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-bold">Bidded Service Providers</h2>
          {biddedServiceProviders.length > 0 ? (
            <div className="mt-4">
              {biddedServiceProviders.map(sp => (
                <div key={sp._id} className="border rounded-md p-4 mb-4">
                  <div className="flex items-center">
                    <img
                      src={sp.image}
                      alt={sp.name}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                     <div className="flex flex-col w-full">
                    <h3 className="text-xl font-bold">{sp.name}</h3>
                    <div className="flex justify-between">
                      <p className="font-bold">{sp.work_type}</p>
                      <h1 className="text-2xl font-bold">${sp.pay_per_hour}/hour</h1>
                    </div>
                    <p>{sp.experience} years Experience</p>
                    <div className="flex mb-0">
                      <Rating
                        className="text-brand__font__size__sm text-black"
                        readonly
                        initialRating={sp.rating}
                        emptySymbol={<AiOutlineStar />}
                        fullSymbol={<AiFillStar />}
                      />
                      <p className="text-sm text-gray-600 ml-4">
                        {sp.total_review_count} Reviews
                      </p>
                    </div>
                    {/* <p>Email: {sp.email}</p>
                    {/* <p>Phone: {sp.phone_number}</p> */}
                  </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No bidding yet</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
