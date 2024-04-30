import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendRequest } from "../../store/actions/followers";

const SearchUserResult = ({ data }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const request = (userId) => {
    console.log({ userId });
    dispatch(sendRequest(id, userId));
  };

  return (
    <div>
      <h1>{data.username}</h1>
      <img src={data.profilepic} alt="pic" />
      <button onClick={() => request(data._id)}>Add Friend</button>
    </div>
  );
};

export default SearchUserResult;
