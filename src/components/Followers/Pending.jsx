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
import { errorToast, successToast } from "../../util";
import { resetFollowerState } from "../../toolkit/slices/followerSlice";
import { FaCheck, FaTrash } from "react-icons/fa6";

const Pending = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [requests, setRequests] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const { incoming, loading, success, error } = useSelector(
    (state) => state.people
  );
  const [rejected, setRejected] = useState("");
  const [accepted, setAccepted] = useState("");

  let pendingActions = [
    {
      name: <FaCheck size={24} />,
      do: (requestorId) => {
        dispatch(acceptRequest({ id, requestorId }));
        setAccepted(requestorId);
      },
    },
    {
      name: <FaTrash size={24} />,
      do: (requestorId) => {
        dispatch(rejectRequest({ id, requestorId }));
        setRejected(requestorId);
      },
      type: "red",
    },
  ];

  useEffect(() => {
    dispatch(getPendingRequest(id));
    setPageLoading(true);
  }, [dispatch, id]);

  useEffect(() => {
    if (!loading && incoming) {
      setPageLoading(false);
      setRequests(incoming);
    }
  }, [loading, incoming]);

  useEffect(() => {
    const showSuccessToast = () => {
      if (success === null) return;

      if (success === "requestRejectSuccess") {
        successToast("Request Rejected Successfully");
        setRequests((prev) =>
          prev.filter((request) => request._id !== rejected)
        );
      } else if (success === "requestAcceptSuccess") {
        successToast("Request Accepted Successfully");
        setRequests((prev) =>
          prev.filter((request) => request._id !== accepted)
        );
      }
      dispatch(resetFollowerState());
    };

    const showErrorToast = () => {
      if (error === null) return;

      if (error === "requestAcceptError") {
        errorToast("An error occurred while accepting the request");
      } else if (error === "requestRejectError") {
        errorToast("An error occurred while rejecting the request");
      }
      dispatch(resetFollowerState());
    };

    showErrorToast();
    showSuccessToast();
    //
  }, [success, dispatch, rejected, accepted, error]);

  if (pageLoading) {
    return <Loader />;
  }

  if (requests.length === 0) {
    return <h2>No pending requests found</h2>;
  }

  return (
    <>
      {requests.map((request) => (
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
