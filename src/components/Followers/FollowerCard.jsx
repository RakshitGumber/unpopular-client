import React from "react";
import { ShowImage } from "../../util";
import "./FollowerCard.css";

const FollowerCard = ({ details, actions }) => {
  return (
    <div className="follower-card">
      <div className="search-card">
        <ShowImage
          image={details.profilepic}
          firstname={details.firstname}
          lastname={details.lastName}
        />

        <div>
          <p className="strong">
            {details.firstName} {details.lastName}
          </p>
          <p className="weak">@{details.username}</p>
        </div>

        <div className="btn">
          {actions.map((action, index) => {
            return (
              <button
                key={index}
                onClick={(id) => action.do(details._id)}
                className={action.type === "red" ? "red" : ""}
              >
                {action.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FollowerCard;
