import React from "react";
import gradientbg from "../assets/images/banner/vector2.png";

const ClientProfile = () => {
  return (
    <div
      className="h-full flex flex-col justify-center p-10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${gradientbg})` }}
    >
      ClientProfile
    </div>
  );
};

export default ClientProfile;
