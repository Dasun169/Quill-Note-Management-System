import React from "react";
import { FiMenu } from "react-icons/fi";
import "./css-files/signUp.css"; // Import the CSS file for styling

const SignUp: React.FC = () => {
  return (
    <div className="main-container">
      <div className="left-container">
        <div className="left-top">
          <div className="home">
            <h2>Home</h2>
          </div>
          <div className="home-button">
            <button className="home-btn">
              <FiMenu />
            </button>
          </div>
        </div>
      </div>
      <div className="middle-container"></div>
      <div className="right-container"></div>
    </div>
  );
};

export default SignUp;
