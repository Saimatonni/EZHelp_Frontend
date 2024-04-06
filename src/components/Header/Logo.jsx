/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Image from "../UI/Image";
import logo from "../../assets/images/brand/logo.jpg";


const Logo = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <HashLink className="block" to={"/#"}>
      <Image
        src={logo}
        alt="Insigina__logo"
        className="w-[80px] md:w-[100px] xl:w-[130px]"
      />
    </HashLink>
  );
};

export default Logo;
