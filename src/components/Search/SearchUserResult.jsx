import React from "react";

const SearchUserResult = ({ data }) => {
  return (
    <div>
      <h1>{data.username}</h1>
      <img src={data.profilepic} alt="pic" />
    </div>
  );
};

export default SearchUserResult;
