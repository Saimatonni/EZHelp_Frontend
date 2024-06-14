import React, { useEffect, useState } from "react";
import gradientbg from "../assets/images/banner/vector2.png";
import Rating from "react-rating";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BASE_URL } from "../utils/config"; 
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
  const [serviceProviders, setServiceProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const response = await fetch(`${BASE_URL}/service-providers`);
        const result = await response.json();
        if (response.ok) {
          setServiceProviders(result.data);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError('Error fetching service providers');
      } finally {
        setLoading(false);
      }
    };

    fetchServiceProviders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
      className="h-full flex flex-col justify-center py-10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${gradientbg})` }}
    >
      <div className="w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          {serviceProviders.map((servicer) => (
            <div key={servicer._id} className="border rounded-lg p-4">
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
                      {servicer.work_type}
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
                        {servicer.total_review_count} Reviews
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {servicer.experience} years of Experience
                    </p>
                  </div>
                </div>
                <div>
                  <p className="mt-2 text-lg font-bold">
                    {servicer.pay_per_hour} Taka/hour
                  </p>
                  <Button
                    style={{
                      backgroundColor: "#12002E",
                      height: "40px",
                      width: "120px",
                      marginTop: "10px"
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
