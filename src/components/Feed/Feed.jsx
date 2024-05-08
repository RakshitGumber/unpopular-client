import React, { useState, useEffect } from "react";
import "./Feed.css";
import FeedCard from "../FeedCard/FeedCard";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { getPost } from "../../toolkit/actions/postActions";

function Feed() {
  const [pageLoading, setPageLoading] = useState(true);
  const [pagePosts, setPagePosts] = useState([]);
  const dispatch = useDispatch();

  const { loading, posts } = useSelector((state) => state.post);

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(getPost());
    };

    fetchPosts();
  }, [dispatch]);

  useEffect(() => {
    if (loading) {
      setPageLoading(true);
    }
    if (posts) {
      setPageLoading(false);
      setPagePosts(posts);
    }
  }, [loading, posts]);

  if (pageLoading || pagePosts?.length === 0) return <Loader />;

  return (
    <div className="feed-wrapper">
      <h2>Feed</h2>
      <div className="feeds">
        {pagePosts.toReversed().map((post, id) => (
          <FeedCard data={post} key={id} />
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
