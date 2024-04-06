import React from "react";
import gradientbg from "../assets/images/banner/vector2.png";
import Rating from "react-rating";
import servicers from "../data/servicers";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardText,
    Button,
  } from "reactstrap";

const ServiceProviders = () => {
  return (
    <div
      className="h-full flex flex-col justify-center py-10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${gradientbg})` }}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          {servicers.map((servicer, index) => (
            <div key={index} className="border rounded-lg  p-4">
              <div className="flex justify-between">
                <div className="flex">
                  <div className="text-center mb-4">
                    <img
                      src={servicer.image}
                      alt={servicer.name}
                      className="mx-auto h-20 w-20 rounded-full"
                    />
                  </div>
                  <div className="ml-5">
                    <h2 className="text-xl font-bold mb-1">{servicer.name}</h2>
                    <p className="text-sm text-gray-600 mb-1">
                      {servicer.workType}
                    </p>
                    <div className="flex mb-0">
                      <Rating
                        className="text-brand__font__size__sm text-black"
                        readonly
                        initialRating={servicer.rating}
                        emptySymbol={<AiOutlineStar />}
                        fullSymbol={<AiFillStar />}
                      />
                      <p className="text-sm text-gray-600 ml-4">
                        {servicer.totalReviewCount} Reviews
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {servicer.experience} Experience
                    </p>
                  </div>
                </div>
                <div className="">
                  <p className="mt-2 text-lg font-bold">
                    ${servicer.payPerHour}/hour
                  </p>
                  <Button
                      style={{
                        backgroundColor: "#12002E",
                        height: "40px",
                        width: "120px",
                      }}
                    >
                      Hire Me
                    </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceProviders;
