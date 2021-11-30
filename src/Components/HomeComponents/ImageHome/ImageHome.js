import React from "react";
import "./ImageHome.scss";

const ImageHome = ({ dataImage }) => {
  return (
    <div className="image-home-container">
      <img src={dataImage} alt="vases présentés" />
      <div className="text">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-6548.5 -1361.5 13910 2575"
          height="500px"
          width="1500px"
        >
          <path
            id="curve"
            d=" M -6547 -61.087 Q -4237.024 -2651.516 125.459 -75.839 Q 4487.942 2499.839 7360 -75.839 L 7360 -75.839 L 7360 -75.839"
            fill="none"
            stroke="transparent"
          />
          <text x="7%" filter="blur(20px)">
            <animate
              attributeName="x"
              from="100%"
              to="7%"
              begin="0s"
              dur="2s"
            />

            <textPath
              fontSize="500"
              fill="white"
              letterSpacing="350px"
              href="#curve"
            >
              LA CERAMIQUE INSPIREE
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
};

export default ImageHome;
