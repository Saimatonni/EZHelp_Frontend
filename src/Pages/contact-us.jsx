import { RiProfileLine } from "react-icons/ri";
import { TfiEmail } from "react-icons/tfi";
import { BsCardText } from "react-icons/bs";
import Input from "../components/UI/Input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Spinner from "../components/common/Spinner";
import { BsEnvelope } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { AiOutlineCopyrightCircle, AiOutlineMobile } from "react-icons/ai";
import { BASE_URL } from "../utils/config";
import Cookies from 'js-cookie'; 
import { Form, Button ,notification} from 'antd';

const ContactUsScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);

      const client_id = Cookies.get('userid');
      const access_token = Cookies.get('access_token');

      const response = await fetch(`${BASE_URL}/faqs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: client_id || '',
          name: formData.name,
          contact: formData.emailOrPhone,
          question: formData.questionText
        })
      });

      const data = await response.json();

      if (response.ok) {
        notification.success({
          message: 'Success',
          description: 'Your message has been submitted successfully!'
        });
        setIsLoading(false);
      } else {
        notification.error({
          message: 'Error',
          description: 'Failed to submit your message. Please try again later.'
        });
        setIsLoading(false);
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'An error occurred while submitting your message. Please try again later.'
      });
      setIsLoading(false);
    }
  };

  return (
    <section className="h-full flex flex-col justify-center py-10">
      <div className="max-w-screen-xl w-full mx-auto p-content__padding flex flex-col justify-center items-center">

        <div className="bg-white w-full flex flex-col md:flex-row gap-5 justify-between items-center py-10 rounded-bl-md rounded-br-md shadow-md">
          <div className="flex-1 relative w-full">
            <div className="max-w-[450px] w-full mx-auto px-5 pt-10 pb-2 bg-white shadow-lg border rounded-md">
              <div className="mb-4">
                <h3 className="text-brand__font__size__lg leading-tight">
                  Send Message
                </h3>
              </div>

              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="font-brand__font__semibold text-brand__font__size__sm pb-2">
                    <div className="relative text-gray-600">
                      <input
                        name="name"
                        type="text"
                        placeholder="Your name"
                        className="w-full rounded py-3 pl-4 pr-9 border outline-none mb-2 placeholder:text-brand__font__size__sm"
                        {...register("name", {
                          required: true,
                        })}
                      />

                      <RiProfileLine
                        className="absolute top-3 right-2"
                        size={20}
                      />
                      {errors?.name?.type === "required" && (
                        <small className="text-brand__dangerous">
                          Name is required
                        </small>
                      )}
                    </div>
                    <div className="relative text-gray-600">
                      <input
                        name="emailOrPhone"
                        type="text"
                        placeholder="Your phone or email"
                        className="w-full rounded py-3 pl-4 pr-9 border outline-none mb-2 placeholder:text-brand__font__size__sm"
                        {...register("emailOrPhone", {
                          required: true,
                        })}
                      />
                      <TfiEmail className="absolute top-3 right-2" size={18} />
                      {errors?.emailOrPhone?.type === "required" && (
                        <small className="text-brand__dangerous">
                          Email or phone required
                        </small>
                      )}
                    </div>

                    <div className="relative text-gray-600">
                      <textarea
                        name="questionText"
                        type="text"
                        rows="6"
                        placeholder="Please write your question"
                        className="w-full rounded py-3 pl-4 pr-9 border outline-none mb-2 placeholder:text-brand__font__size__sm resize-none"
                        {...register("questionText", {
                          required: true,
                        })}
                      />
                      <BsCardText
                        className="absolute top-3 right-2"
                        size={20}
                      />
                      {errors?.questionText?.type === "required" && (
                        <small className="text-brand__dangerous">
                          Message required
                        </small>
                      )}
                    </div>

                    {isLoading ? (
                      <div className="w-full flex justify-center">
                        <Spinner styles="w-6 h-6 border-white mx-auto" />
                      </div>
                    ) : (
                      <Input
                        type="submit"
                        value="Submit"
                        className="w-full rounded bg-black text-white p-2 cursor-pointer hover:bg-primary duration-300 text-brand__font__size__md"
                      />
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="max-w-[500px] mx-auto p-content__padding">
              <div>
                <h5 className="text-brand__font__size__xl font-brand__font__semibold font-brand__font__family__fancy">
                  Contact Details
                </h5>
              </div>
              <br />
              <div className="flex-1 flex flex-col items-center md:items-start pb-5 md:p-0">
                <p className="lg:inline-flex lg:items-center gap-x-2  lg:text-left">
                  <FaLocationDot className="hidden lg:block" />
                  Department of Computer Science & Engineering, University of
                  Dhaka
                </p>
                <p className="lg:inline-flex lg:items-center gap-x-2 text-center lg:text-left">
                  <BsEnvelope className="hidden lg:block" />
                  ezhelp@gmail.com
                </p>
                <p className="lg:inline-flex lg:items-center gap-x-2 text-center lg:text-left">
                  <AiOutlineMobile className="hidden lg:block" />
                  +880 1890000000
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsScreen;
