import React, { useEffect } from "react";

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
      {actions.map((action) => {
        return (
          <button
            key={Math.floor(Math.random() * action.name.length)}
            onClick={action.do}
          >
            {action.name}
          </button>
        );
      })}
    </>
  );
};

export default FollowerCard;
