import React, { useEffect, useState } from "react";
import FollowerCard from "./FollowerCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getPendingRequest,
  rejectRequest,
  acceptRequest,
} from "../../toolkit/actions/followerActions";
import Loader from "../Loader/Loader";

const Pending = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [requests, setRequests] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const { outgoing, loading } = useSelector((state) => state.people);

  let pendingActions = [
    {
      name: "accept",
      do: (requestorId) => {
        dispatch(acceptRequest({id, requestorId}));
      },
    },
    {
      name: "reject",
      do: (requestorId) => {
        dispatch(rejectRequest({id, requestorId}));
      },
    },
  ];

  useEffect(() => {
    dispatch(getPendingRequest(id));
    setPageLoading(true);
  }, [dispatch, id]);

  useEffect(() => {
    if (!loading && outgoing) {
      setPageLoading(false);
      setRequests(outgoing);
    }
  }, [loading, outgoing]);

  if (pageLoading) {
    return <Loader />;
  }

  if (!requests.data) {
    return <h1>No pending requests found</h1>;
  }

  return (
    <>
      <h1>Pending Requests</h1>
      {requests.data.map((request) => (
        <FollowerCard
          details={request}
          key={request._id}
          actions={pendingActions}
        />
      ))}
    </>
  );
};

export default Pending;
