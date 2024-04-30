import React, { useState, useEffect } from "react";
import "./Feed.css";
import FeedCard from "./FeedCard/FeedCard";
import { useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { getPost } from "../../store/actions/posts";

function Feed() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      const post = await dispatch(getPost());
      setPosts(post);
      setLoading(false);
    };

    fetchPosts();
  }, [dispatch]);

  if (loading || posts === undefined) return <Loader />;

  return (
    <div className="feed-wrapper">
      <h2>Feed</h2>
      <div className="feeds">
        {posts.map((post) => (
          <FeedCard data={post} key={post.id} />
        ))}
      </div>
      <footer>
        <h2>End Of Feeds</h2>
        <h3>Post More have fun</h3>
      </footer>
    </div>
  );
}

export default Feed;
