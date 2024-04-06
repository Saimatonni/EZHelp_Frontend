/* eslint-disable react/prop-types */
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Rating from "react-rating";
import Image from "../UI/Image";
import defaultProImg from "../../assets/images/profile/profile.png";

const RVCard = ({ data }) => {
  const { name, rate, details, photoUrl } = data;

  return (
    <div className="h-[420px] border bg-brand__ash rounded">
      <div className="h-full flex flex-col">
        <div className="flex items-center border-b">
        <div className="flex-grow flex flex-col items-center bg-indigo-900 text-white py-3">
            <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center border-2">
              <Image
                alt="Profile"
                src={photoUrl ? photoUrl : defaultProImg}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="font-brand__font__bold text-brand__font__size__md">
              {name}
            </span>
            <Rating
              className="text-brand__font__size__sm text-white"
              readonly
              initialRating={rate}
              emptySymbol={<AiOutlineStar />}
              fullSymbol={<AiFillStar />}
            />
          </div>
        </div>

        <div className="px-6 py-3 my-4 h-full overflow-y-auto custom__scrollbar">
          <p className="leading-normal text-brand__font__size__sm">{details}</p>
        </div>
      </div>
    </div>
  );
};

export default RVCard;