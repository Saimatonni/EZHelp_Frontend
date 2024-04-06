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

const JobDetails = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    const selectedJob = data.find((job) => job.id === parseInt(id));
    setJob(selectedJob);
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <section className="h-full flex flex-col justify-center py-10">
      <div className="max-w-screen-xl w-full mx-auto p-content__padding flex flex-col justify-center items-center">
        <div className="w-full h-[400px] border group relative rounded-tl-md rounded-tr-md">
          <div className="absolute group-hover:bg-opacity-0 duration-300 top-0 left-0 right-0 bottom-0 w-full h-full bg-black bg-opacity-50 group-hover:invisible rounded-tl-md rounded-tr-md"></div>
          <iframe
            className="w-full h-full rounded-tl-md rounded-tr-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.041193892314!2d90.39749967600932!3d23.78154738757875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c769c6633a2f%3A0xbb3979a7e02a8c90!2sBrain%20Station%2023!5e0!3m2!1sen!2sbd!4v1695626580145!5m2!1sen!2sbd"
            // src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.041193892314!2d90.39749967600932!3d23.78154738757875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c156c9c1ec29%3A0x9138baf2b5395bf5!2sInsignia%20Tours%20and%20Travel!5e0!3m2!1sen!2sbd!4v1695626580145!5m2!1sen!2sbd&id=${id}`}
            allowfullscreen=""
            loading="lazy"
          />
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
