import React, { useEffect, useState } from "react";
import FollowerCard from "./FollowerCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getFollowerList,
  removeFollower,
} from "../../toolkit/actions/followerActions";
import Loader from "../Loader/Loader";
import { FaTrash, FaPhone, FaMessage } from "react-icons/fa6";
import { errorToast, successToast } from "../../util";
import { resetFollowerState } from "../../toolkit/slices/followerSlice";

const Followers = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, followers, success, error } = useSelector(
    (state) => state.people
  );
  const [pageLoading, setPageLoading] = useState(true);
  const [removed, setRemoved] = useState("");
  const [myFollowers, setMyFollowers] = useState([]);

  let followersActions = [
    {
      name: <FaMessage size={24} />,
      do: () => {},
    },
    {
      name: <FaPhone size={24} />,
      do: () => {},
    },
    {
      name: <FaTrash size={24} />,
      do: (userId) => {
        dispatch(removeFollower({ id, userId }));
        setRemoved(userId);
      },
      type: "red",
    },
  ];

  useEffect(() => {
    dispatch(getFollowerList(id));
    setPageLoading(true);
  }, [dispatch, id]);

  useEffect(() => {
    if (!loading && followers) {
      setPageLoading(false);
      setMyFollowers(followers);
    }
  }, [loading, followers]);

  useEffect(() => {
    const showSuccessToast = () => {
      if (success === null) return;

      if (success === "followerRemoveSuccess") {
        successToast("Follower Removed Successfully");
        setMyFollowers((prev) =>
          prev.filter((follower) => follower._id !== removed)
        );
        dispatch(resetFollowerState());
      }
    };
    const showErrorToast = () => {
      if (error === null) return;

      if (error === "followerRemoveError") {
        errorToast("An Error occurred while removing the follower");
      }
      dispatch(resetFollowerState());
    };

    showErrorToast();
    showSuccessToast();
    //
  }, [dispatch, removed, success, error]);

  if (pageLoading) {
    return <Loader />;
  }

  if (myFollowers.length === 0) {
    return <h2>No followers found</h2>;
  }

  return (
    <>
      {myFollowers.map((follower) => (
        <FollowerCard
          details={follower}
          key={follower._id}
          actions={followersActions}
        />
      ))}
    </>
  );
};

export default Followers;
