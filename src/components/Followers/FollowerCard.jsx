import React from "react";

const FollowerCard = ({ details, actions }) => {
  return (
    <>
      <h1>{details.username}</h1>
      <img
        src={
          details.profilepic ??
          `https://ui-avatars.com/api/?name=${details.username}`
        }
        alt="missing"
      />
      {actions.map((action, index) => {
        return (
          <button key={index} onClick={(id) => action.do(details._id)}>
            {action.name}
          </button>
        );
      })}
    </>
  );
};

export default FollowerCard;
