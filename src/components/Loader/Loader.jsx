import React from "react";
import "./Loader.css";

function Loader() {
  return (
    <div className="loader">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width="200"
        height="200"
        style={{
          shapeRendering: "auto",
          display: "block",
        }}
      >
        <g>
          <circle cx="30" cy="50" fill="#e90c59" r="20">
            <animate
              attributeName="cx"
              repeatCount="indefinite"
              dur="1s"
              keyTimes="0;0.5;1"
              values="30;70;30"
              begin="-0.5s"
            ></animate>
          </circle>
          <circle cx="70" cy="50" fill="#7b00ff" r="20">
            <animate
              attributeName="cx"
              repeatCount="indefinite"
              dur="1s"
              keyTimes="0;0.5;1"
              values="30;70;30"
              begin="0s"
            ></animate>
          </circle>
          <circle cx="30" cy="50" fill="#e90c59" r="20">
            <animate
              attributeName="cx"
              repeatCount="indefinite"
              dur="1s"
              keyTimes="0;0.5;1"
              values="30;70;30"
              begin="-0.5s"
            ></animate>
            <animate
              attributeName="fill-opacity"
              values="0;0;1;1"
              calcMode="discrete"
              keyTimes="0;0.499;0.5;1"
              dur="1s"
              repeatCount="indefinite"
            ></animate>
          </circle>
          <g></g>
        </g>
      </svg>
    </div>
  );
}

export default Loader;
