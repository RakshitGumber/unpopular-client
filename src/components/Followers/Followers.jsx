import React, { useEffect, useState } from "react";
import FollowerCard from "./FollowerCard";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getFriendList } from "../../store/actions/followers";

let followersActions = [
  {
    name: "Chat",
    do: () => {},
  },
  {
    name: "remove",
    do: () => {},
  },
  {
    name: "call",
    do: () => {},
  },
];

const Followers = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

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
    return <h1>Loading</h1>;
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
