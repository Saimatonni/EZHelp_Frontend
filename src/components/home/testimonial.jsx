import React, { useEffect, useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RVCard from "./RVCard";
import Button from "../../components/UI/Button";
import { BASE_URL } from "../../utils/config";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${BASE_URL}/testimonials`);
        const data = await response.json();
        if (response.ok) {
          setTestimonials(data);
        } else {
          setError("Failed to fetch testimonials");
        }
      } catch (error) {
        setError("Error fetching testimonials data");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const faqCarouselResponsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  if (loading) {
    return <div>Loading testimonials...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="pt-10 lg:pb-20 my-10">
      <div className="max-w-screen-xl w-full mx-auto p-content__padding bg-center bg-cover">
        <div className="pb-10 px-5 w-full text-center">
          <h2 className="text-3xl font-bold leading-tight">
            What Clients Say
          </h2>
        </div>

        <Carousel
          additionalTransfrom={0}
          className="shadow-lg"
          arrows
          infinite
          autoPlay
          autoPlaySpeed={5000}
          customLeftArrow={
            <Button className="bg-black hover:bg-white border border-gray-400 text-white hover:text-black opacity-80 hover:opacity-100 duration-300 rounded-full text-4xl absolute left-0 cursor-pointer">
              <BsFillArrowLeftCircleFill />
            </Button>
          }
          customRightArrow={
            <Button className="bg-black hover:bg-white border border-gray-400 text-white hover:text-black opacity-80 hover:opacity-100 duration-300 rounded-full text-4xl absolute right-0 cursor-pointer">
              <BsFillArrowRightCircleFill />
            </Button>
          }
          responsive={faqCarouselResponsive}
        >
          {testimonials.map((testimonial) => (
            <RVCard key={testimonial._id} data={testimonial} />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonial;
