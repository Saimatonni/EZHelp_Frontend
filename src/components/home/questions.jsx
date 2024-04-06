import Image from "../UI/Image";
import FaqAccordion from "./FaqAccordion";
import faqImg from "../../assets/images/background/FAQ-header-image.png";
import AskQuestion from "./AskQuestion";
import gradientbg from "../../assets/images/banner/vector2.png";

const Faq = () => {
  return (
    <section className="h-full  py-5 relative bg-white bg-center bg-cover bg-fixed mt-20">
      {/* <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-black bg-opacity-50"></div> */}
      <div className="max-w-screen-xl mx-auto p-content__padding flex flex-col items-center justify-center relative h-full">
        {/* <div className="max-w-[450px] mr-auto">
          <Image src={faqImg} className="w-full h-full" />
        </div> */}

        <div className="w-full flex flex-col lg:flex-row justify-between gap-5">
          <FaqAccordion />

          <AskQuestion />
        </div>
      </div>
      
    </section>
  );
};

export default Faq;