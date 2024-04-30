import React, { useEffect, useState } from "react";
import FollowerCard from "./FollowerCard";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getFollowingList,
  removeFollowing,
} from "../../store/actions/followers";
import Loader from "../Loader/Loader";

const Following = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const fetchFollowings = async () => {
      try {
        const fetchedFollowings = await dispatch(getFollowingList(id));
        setFollowing(fetchedFollowings);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchFollowings();
  }, [dispatch, id]);

  if (loading) {
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
