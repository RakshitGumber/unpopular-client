import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendRequest } from "../../toolkit/actions/followerActions";
import { ShowImage, SpButton } from "../../util";
import "./SearchUserResult.css";

const SearchUserResult = ({ data }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { outgoing, error, success } = useSelector((state) => state.people);
  const [isPending, setIsPending] = useState(false);
  const [isRequestedFrom, setIsRequestedFrom] = useState(false);

  useEffect(() => {
    for (let i = 0; i < outgoing.length; i++) {
      if (outgoing[i] === data._id) {
        setIsPending(true);
        break;
      }
    }
  }, [outgoing, data._id, isPending]);

  const request = (userId) => {
    dispatch(sendRequest({ id, userId }));
    setIsRequestedFrom(true);
  };

  useEffect(() => {
    if (error && isRequestedFrom) {
      setIsPending(false);
      setIsRequestedFrom(false);
    }
    if (success) setIsRequestedFrom(false);
  }, [error, success, isRequestedFrom]);

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
        {!isPending ? (
          <SpButton text="Follow" onClick={() => request(data._id)} />
        ) : (
          <SpButton text="Pending" disabled />
        )}
      </div>
    </div>
  );
};

export default SearchUserResult;
