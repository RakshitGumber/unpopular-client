import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Sidebar, RightPanel, Loader, Navbar } from "../../components";
import "./Post.css";
import { FeedCard } from "../../components";
import { getPost } from "../../toolkit/actions/postActions";
import { FaPaperPlane } from "react-icons/fa6";

function Post() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [pageLoading, setPageLoading] = useState(true);
  const { loading, posts } = useSelector((state) => state.post);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(getPost(id));
    };

    fetchPosts();
  }, [dispatch, id]);

  useEffect(() => {
    if (loading && posts.length === 0) {
      setPageLoading(true);
      return;
    }
    if (posts.length !== 0) {
      setData(posts.filter((data) => data._id === id)[0]);
      setPageLoading(false);
    }
  }, [loading, posts, id, data]);

  if (pageLoading) return <Loader />;

  return (
    <div className="post-wrapper">
      <Navbar />
      <Sidebar />
      <div className="post-main">
        <FeedCard data={data} />
        <div className="post-cont">
          <h2>Comments</h2>
          <form onSubmit={() => {}} className="post-search-input">
            <input type="text" placeholder="Comment" />
            <button type="submit">
              <FaPaperPlane size="24" />
            </button>
          </form>
        </div>
      </div>
      <RightPanel />
    </div>
  );
}

export default Post;
