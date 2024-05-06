import React from "react";
import gradientbg from "../assets/images/banner/vector2.png";

const ClientProfile = () => {
  return (
    <div className="container">
      <div className="image-container">
        <img src="your-image-url.jpg" alt="Circular Image" className="circular-image" />
      </div>
      <div className="text-container">
        <input type="text" placeholder="Text Field 1" className="text-field" />
        <input type="text" placeholder="Text Field 2" className="text-field" />
        <input type="text" placeholder="Text Field 3" className="text-field" />
      </div>
    </div>
  );
};

export default ClientProfile;
