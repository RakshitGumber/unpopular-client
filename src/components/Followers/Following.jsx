import React, { useEffect, useState } from "react";
import FollowerCard from "./FollowerCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getFollowingList,
  removeFollowing,
} from "../../toolkit/actions/followerActions";
import Loader from "../Loader/Loader";
import { FaTrash } from "react-icons/fa6";
import { errorToast, successToast } from "../../util";
import { resetFollowerState } from "../../toolkit/slices/followerSlice";

const Following = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, following, success, error } = useSelector(
    (state) => state.people
  );
  const [pageLoading, setPageLoading] = useState(true);
  const [myFollowing, setMyFollowing] = useState([]);
  const [removed, setRemoved] = useState("");

  const followingActions = [
    {
      name: <FaTrash size={24} />,
      do: (userId) => {
        dispatch(removeFollowing({ id, userId }));
        setRemoved(userId);
      },
      type: "red",
    },
  ];

  useEffect(() => {
    dispatch(getFollowingList(id));
    setPageLoading(true);
  }, [dispatch, id]);

  useEffect(() => {
    if (!loading && following) {
      setPageLoading(false);
      setMyFollowing(following);
    }
  }, [loading, following]);

  useEffect(() => {
    const showSuccessToast = () => {
      if (success === null) return;

      if (success === "followingRemoveSuccess") {
        successToast("Following Removed Successfully");
        setMyFollowing((prev) =>
          prev.filter((following) => following._id !== removed)
        );
        dispatch(resetFollowerState());
      }
    };

    const showErrorToast = () => {
      if (error === null) return;

      if (error === "followingRemoveError") {
        errorToast("An Error occurred while removing the following");
      }
      dispatch(resetFollowerState());
    };

    showErrorToast();
    showSuccessToast();
    //
  }, [success, dispatch, removed, error]);

  if (pageLoading) {
    return <Loader />;
  }

  if (myFollowing.length === 0) {
    return <h2>No following found</h2>;
  }

  return (
    <>
      {myFollowing.map((follow) => (
        <FollowerCard
          details={follow}
          key={follow._id}
          actions={followingActions}
        />
      ))}
    </>
  );
};

export default Following;
