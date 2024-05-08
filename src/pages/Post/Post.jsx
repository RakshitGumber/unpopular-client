import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Sidebar, RightPanel } from "../../components";
import "./Post.css";
import { FeedCard } from "../../components";

function Post() {
  const { id } = useParams();

  const { posts } = useSelector((state) => state.post);
  const post = useMemo(
    () => posts.filter((item) => item._id === String(id))[0],
    [posts, id]
  );

  return (
    <div className="post-wrapper">
      <Sidebar />
      <div className="post-main">
        <FeedCard data={post} />
        <div className="post-cont">
          <h2>Comments</h2>
        </div>
      </div>
      <RightPanel />
    </div>
  );
}

export default Post;
