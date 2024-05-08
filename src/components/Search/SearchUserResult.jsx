import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendRequest } from "../../toolkit/actions/followerActions";
import { ShowImage, SpButton } from "../../util";
import "./SearchUserResult.css";

const SearchUserResult = ({ data }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const request = (userId) => {
    console.log({ userId });
    dispatch(sendRequest(id, userId));
  };

  return (
    <div className="search-card">
      <ShowImage
        image={data.profilepic}
        firstname={data.firstName}
        lastname={data.lastName}
      />
      <div>
        <p className="strong">
          {data.firstName} {data.lastName}
        </p>
        <p className="weak">@{data.username}</p>
      </div>
      <div className="btn">
        <SpButton text="Follow" onClick={() => request(data._id)} />
      </div>
    </div>
  );
};

export default SearchUserResult;
