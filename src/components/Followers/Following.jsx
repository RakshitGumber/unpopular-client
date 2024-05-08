import React, { useEffect, useState } from "react";
import FollowerCard from "./FollowerCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getFollowingList,
  removeFollowing,
} from "../../toolkit/actions/followerActions";
import Loader from "../Loader/Loader";

const Following = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, following } = useSelector((state) => state.people);
  const [pageLoading, setPageLoading] = useState(true);

  const followingActions = [
    {
      name: "Chat",
      do: () => {},
    },
    {
      name: "remove",
      do: (userId) => {
        dispatch(removeFollowing(id, userId));
      },
    },
    {
      name: "call",
      do: () => {},
    },
  ];

  useEffect(() => {
    dispatch(getFollowingList(id));
    setPageLoading(true);
  }, [dispatch, id]);

  useEffect(() => {
    !loading && following && setPageLoading(false);
  }, [loading, following]);

  if (pageLoading) {
    return <Loader />;
  }

  if (!following.data) {
    return <h1>No following found</h1>;
  }

  return (
    <>
      <h1>Following</h1>
      {following.data.map((follow) => (
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
