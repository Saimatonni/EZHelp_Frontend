import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import data from "../components/home/data";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";

import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

const JobDetails = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);

  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const selectedJob = data.find((job) => job.id === parseInt(id));
    setJob(selectedJob);
    if (selectedJob) {
      setCoordinates({
        lat: selectedJob.GPSCoordinates.latitude,
        lng: selectedJob.GPSCoordinates.longitude,
      });
    }
  }, [id]);

  console.log("co",coordinates)

  const mapStyles = {
    width: "100%",
    height: "400px",
  };

  const defaultCenter = {
    lat: 23.777176,
    lng: 90.399452,
  };

  useEffect(() => {
    const selectedJob = data.find((job) => job.id === parseInt(id));
    setJob(selectedJob);
  }, [id]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB1GNLedehoDsSDG3f-cf2XCHxiUtIz6bg",
    libraries: ["places"],
  });
  

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
          <h1 className="text-4xl font-bold">{job.payAmount} Taka</h1>
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
            <p className="text-black font-bold">Posted 1 hour ago</p>
          </div>

          <p className="text-black font-bold">{job.totalBidCount} bid</p>
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
              
            >
              Bid Now
            </Button>
          </Col>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
