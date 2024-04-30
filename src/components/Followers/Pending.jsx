import React, { useEffect, useState } from "react";
import FollowerCard from "./FollowerCard";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getPendingRequest,
  rejectRequest,
  acceptRequest,
} from "../../store/actions/followers";
import Loader from "../Loader/Loader";

const Pending = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  let pendingActions = [
    {
      name: "accept",
      do: (requestorId) => {
        dispatch(acceptRequest(id, requestorId));
      },
    },
    {
      name: "reject",
      do: (requestorId) => {
        dispatch(rejectRequest(id, requestorId));
      },
    },
  ];

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const fetchedRequests = await dispatch(getPendingRequest(id));
        setRequests(fetchedRequests);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchPending();
  }, [dispatch, id]);
  if (loading) {
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
