import React, { useState } from "react";
import Logo from "./Logo";
import PcNavigation from "./PcNavigation";
import { useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleServiceProviderClick = () => {
    navigate("/login-sp");
  };

  const handleClientClick = () => {
    navigate("/login-client");
  };


  return (
    <header
      className={`w-full h-20 md:h-24 flex justify-between items-center duration-300 font-brand__font_family__regular ${
        isHomePage
          ? "bg-transparent absolute top-0 left-0 right-0 lg:h-28"
          : "bg-white lg:h-24 shadow sticky top-0 z-50"
      }`}
    >
      <div className="max-w-screen-xl mx-auto w-full z-50 text-brand__white p-content__padding">
        <div className="flex justify-between items-center">
          <Logo />
          <PcNavigation />
          <div className="relative">
            <span
              className="bg-black text-white py-1 px-4 rounded-md mr-1 cursor-pointer"
              onClick={toggleDropdown}
            >
              Join As <IoIosArrowDown className="inline-block ml-1" />
            </span>
            {showDropdown && (
              <div className="absolute top-full mt-1 left-0 bg-black rounded-lg shadow-md p-1">
                <button
                  className="block w-full text-white text-left text-sm py-1 px-2 hover:bg-blue-800"
                  onClick={handleServiceProviderClick}
                >
                  Service Provider
                </button>
                <button
                  className="block w-full text-white text-sm text-left py-1 px-2 hover:bg-blue-800"
                  onClick={handleClientClick}
                >
                  Client
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
