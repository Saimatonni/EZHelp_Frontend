import { lazy, Suspense, useEffect, useState } from "react";
import Spinner from "../components/common/Spinner";
import AskQuestion from "../components/home/AskQuestion";
import Testimonial from "../components/home/testimonial";
import Banner from "../components/home/banner";
import EmergencyNeeded from "../components/home/emergencyNeeded";
import Faq from "../components/home/questions";

const Home = () => {



  return (
    <div>
       <Suspense
        fallback={
          <Spinner className="h-screen flex flex-col justify-center items-center" />
        }
      >
        <Banner />
      </Suspense>

      <Suspense
        fallback={
          <Spinner className="h-screen flex flex-col justify-center items-center" />
        }
      >
        <EmergencyNeeded />
      </Suspense>
      
      <Suspense
        fallback={
          <Spinner className="h-screen flex flex-col justify-center items-center" />
        }
      >
        <Faq />
      </Suspense>


      <Suspense
        fallback={
          <Spinner className="h-screen flex flex-col justify-center items-center" />
        }
      >
        <Testimonial />
      </Suspense>
    </div>
  );
};

export default Home;