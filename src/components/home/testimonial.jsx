import { useEffect, useState } from "react";
import { faqCarouselResponsive } from "../../constants/common";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RVCard from "./RVCard";
import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";

const Testimonial = () => {

  const exampleTestimonials = [
    {
      id: 1,
      name: "John Doe",
      rate: 4,
      details: "Great service! The team was professional and efficient.",
    },
    {
      id: 2,
      name: "Jane Smith",
      rate: 5,
      details: "I'm impressed with the quality of work provided. Highly recommend!",
    },
    {
      id: 3,
      name: "Jane Smith",
      rate: 3,
      details: "I'm impressed with the quality of work provided. Highly recommend!",
    },
    {
      id: 4,
      name: "Jane Smith",
      rate: 5,
      details: "I'm impressed with the quality of work provided. Highly recommend!",
    },
    {
      id: 5,
      name: "Jane Smith",
      rate: 2,
      details: "I'm impressed with the quality of work provided. Highly recommend!",
    },
  ];

  return (
    <section className="pt-10 lg:pb-20 my-10">
      <div className="max-w-screen-xl w-full mx-auto p-content__padding  bg-center bg-cover">
        <div className="pb-10 px-5 w-full text-center">
          <h2 className="text-brand__font__size__xl font-brand__font__bold font-brand__font__family__fancy leading-tight bg-brand__ash__light ms-auto">
            What Clients say
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
            <Button className="bg-black hover:bg-white border border-brand__gray__border text-white hover:text-black opacity-80 hover:opacity-100 duration-300 rounded-full text-4xl absolute left-0 cursor-pointer">
              <BsFillArrowLeftCircleFill />
            </Button>
          }
          customRightArrow={
            <Button className="bg-black hover:bg-white border border-brand__gray__border text-white hover:text-black opacity-80 hover:opacity-100 duration-300 rounded-full text-4xl absolute right-0 cursor-pointer">
              <BsFillArrowRightCircleFill />
            </Button>
          }
          responsive={faqCarouselResponsive}
        >
          {exampleTestimonials.map((testimonial) => (
            <RVCard key={testimonial.id} data={testimonial} />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonial;

