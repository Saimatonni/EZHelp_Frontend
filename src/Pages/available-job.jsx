import React from "react";
import gradientbg from "../assets/images/banner/vector2.png";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import data from "../components/home/data";

const AvailableJobs = () => {
  return (
    <div
      className="h-full flex flex-col justify-center py-10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${gradientbg})` }}
    >
      <Row>
        <Col
          md="7"
          className="overflow-y-scroll"
          style={{ maxHeight: "calc(100vh - 100px)" }}
        >
          {/* <Row> */}
          <div className="ml-20">
            {data.map((job) => (
              <Col key={job.id} sm="11" className="mb-4">
                <div className="border rounded-md px-4 py-2">
                  <div className="flex justify-between">
                    <h1>{job.workType} Needed</h1>
                    <Button
                      style={{
                        backgroundColor: "#12002E",
                        height: "40px",
                        width: "120px",
                      }}
                    >
                      Bid Now
                    </Button>
                  </div>
                  <div className="flex justify-between">
                    <p className="mb-1">{job.address}</p>
                    <p>4 people bidded</p>
                  </div>
                  <p className="mb-1">{job.shortTitle}</p>
                  <p className="font-bold">posted 1 hour ago by Amir Khan</p>
                </div>
              </Col>
            ))}
          </div>
          {/* </Row> */}
        </Col>
        <Col md="5" className="p-5">
          <div className="bg-white rounded-md shadow-md p-4">
            <h3>Filter By</h3>
            <div className="mt-4">
              <label htmlFor="budget" className="mb-2">
                Budget:
              </label>
              <div className="flex">
                <input
                  type="number"
                  id="minBudget"
                  placeholder="Min"
                  className="mr-2 border rounded-md px-2 py-1"
                />
                <input
                  type="number"
                  id="maxBudget"
                  placeholder="Max"
                  className="border rounded-md px-2 py-1"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="postTime" className="mr-4">
                Post Time:
              </label>
              <select id="postTime" className="border rounded-md px-2 py-1">
                <option value="lastHour">Last Hour</option>
                <option value="last24Hours">Last 24 Hours</option>
                <option value="lastWeek">Last Week</option>
              </select>
            </div>
            <div className="mt-4">
              <label htmlFor="skill" className="mb-2">Skill:</label>
              <div
                id="skill"
                className="rounded-md px-2 py-1 overflow-y-scroll"
                style={{ maxHeight: "200px" }}
              >
                <label className="block mb-1">
                  <input type="checkbox" value="plumbing" /> Plumbing
                </label>
                <label className="block mb-1">
                  <input type="checkbox" value="electrician" /> Electrician
                </label>
                <label className="block mb-1">
                  <input type="checkbox" value="gardening" /> Gardening
                </label>
                <label className="block mb-1">
                  <input type="checkbox" value="painter" /> Painter
                </label>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AvailableJobs;
