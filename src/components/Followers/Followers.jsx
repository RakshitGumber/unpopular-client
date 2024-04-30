import React, { useEffect, useState } from "react";
import FollowerCard from "./FollowerCard";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getFriendList, removeFollower } from "../../store/actions/followers";
import Loader from "../Loader/Loader";

const Followers = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  let followersActions = [
    {
      name: "Chat",
      do: () => {},
    },
    {
      name: "remove",
      do: (userId) => {
        dispatch(removeFollower(id, userId));
      },
    },
    {
      name: "call",
      do: () => {},
    },
  ];

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const fetchedFollowers = await dispatch(getFriendList(id));
        setFollowers(fetchedFollowers);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [dispatch, id]);

  if (loading) {
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
