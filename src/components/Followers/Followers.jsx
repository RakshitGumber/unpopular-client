import React, { useEffect, useState } from "react";
import FollowerCard from "./FollowerCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getFollowerList,
  removeFollower,
} from "../../toolkit/actions/followerActions";
import Loader from "../Loader/Loader";

const Followers = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, followers } = useSelector((state) => state.people);
  const [pageLoading, setPageLoading] = useState(true);

  let followersActions = [
    {
      name: "Chat",
      do: () => {},
    },
    {
      name: "remove",
      do: (userId) => {
        dispatch(removeFollower({ id, userId }));
      },
    },
    {
      name: "call",
      do: () => {},
    },
  ];

  useEffect(() => {
    dispatch(getFollowerList(id));
    setPageLoading(true);
  }, [dispatch, id]);

  useEffect(() => {
    !loading && followers && setPageLoading(false);
  }, [loading, followers]);

  if (pageLoading) {
    return <Loader />;
  }

  if (!followers.data) {
    return <h1>No followers found</h1>;
  }

  return (
    <>
      <h1>Followers</h1>
      {followers.data.map((follower) => (
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
