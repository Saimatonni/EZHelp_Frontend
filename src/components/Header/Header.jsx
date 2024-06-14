import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Logo from "./Logo";
import PcNavigation from "./PcNavigation";
import clientProfile from "../../assets/images/profile/user.png";
import spProfile from "../../assets/images/profile/profile.png";
import { BASE_URL } from "../../utils/config";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [showDropdown, setShowDropdown] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [profileImage, setProfileImage] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
   
    const role = Cookies.get("role");
    setUserRole(role);
    if (role === "serviceprovider") {
      const spId = Cookies.get("userid");
      const accesstoken = Cookies.get("access_token");
      if (spId) {
        fetch(`${BASE_URL}/service-providers/${spId}`, {
          headers: {
            "access-token": accesstoken
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.message === "Service provider details retrieved successfully") {
              setProfileImage(data.data.image);
            }
          })
          .catch((error) => {
            console.error("Error fetching service provider profile:", error);
          });
      }
    } else if (role === "client") {
      const clientId = Cookies.get("userid");
      const accesstoken = Cookies.get("access_token");
      if (clientId) {
        fetch(`${BASE_URL}/clients/${clientId}`, {
          headers: {
            "access-token": accesstoken
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.message === "Client details retrieved successfully") {
              setProfileImage(data.data.image);
            }
          })
          .catch((error) => {
            console.error("Error fetching client profile:", error);
          });
      }
    }
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleServiceProviderClick = () => {
    navigate("/login-sp");
  };

  const handleClientClick = () => {
    navigate("/login-client");
  };

  const handleLogout = () => {
    Cookies.remove("role");
    Cookies.remove("access_token");
    Cookies.remove("userid");
    navigate("/")
    setUserRole(null);
  };

  const handleProfileClick = () => {
    if (userRole === "serviceprovider") {
      navigate("/sp-profile");
    } else if (userRole === "client") {
      navigate("/client-profile");
    }
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
          {userRole ? (
            <div className="relative">
              <img
                src={profileImage || (userRole === "serviceprovider" ? spProfile : clientProfile)}
                alt="User Profile"
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />
              {showDropdown && (
                <div className="absolute top-full mt-1 right-0 bg-black rounded-lg shadow-md p-1">
                  <button
                    className="block w-full text-white text-left text-sm py-1 px-2 hover:bg-blue-800"
                    onClick={handleProfileClick}
                  >
                    Profile
                  </button>
                  <button
                    className="block w-full text-white text-left text-sm py-1 px-2 hover:bg-blue-800"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
