import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Sidebar, Loader, Navbar, RightPanel } from "../../components";
import "./Post.css";
import { FeedCard } from "../../components";
import { getPosts, commentPost } from "../../toolkit/actions/postActions";
import { FaPaperPlane } from "react-icons/fa6";
import { errorToast, successToast } from "../../util";
import { resetPostState } from "../../toolkit/slices/postSlice";

function Post() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const { loading, posts, success, error } = useSelector((state) => state.post);
  const { userInfo } = useSelector((state) => state.user);
  const [data, setData] = useState({});

  const { theme } = useSelector((state) => state.settings);

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(getPosts());
    };

    fetchPosts();
  }, [dispatch]);

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

  const postComment = (e) => {
    e.preventDefault();
    dispatch(commentPost({ id, message: value, userId: userInfo._id }));
  };

  useEffect(() => {
    const showSuccessToast = () => {
      if (success === null) return;

      if (success === "commentPostSuccess") {
        successToast("Comment Posted Successfully", {
          theme: theme === "light-theme" ? "light" : "dark",
        });
        setValue("");
        dispatch(resetPostState());
      }
    };

    const showErrorToast = () => {
      if (error === null) return;

      if (error === "commentPostSuccess") {
        errorToast("An Unexpected error occurred, comment failed", {
          theme: theme === "light-theme" ? "light" : "dark",
        });
        dispatch(resetPostState());
      }
    };
    showErrorToast();
    showSuccessToast();
  }, [success, error, theme, dispatch]);

  return (
    <div className="post-wrapper">
      <Navbar />
      <Sidebar />
      <div className="post-main">
        {pageLoading ? (
          <Loader />
        ) : (
          <>
            <FeedCard data={data} />
            <div className="post-cont">
              <h2>Comments</h2>
              <form onSubmit={postComment} className="post-search-input">
                <input
                  type="text"
                  placeholder="Comment"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <button type="submit">
                  <FaPaperPlane size="24" />
                </button>
              </form>
              <div className="commentSection">
                {data && data?.comments.length !== 0 ? (
                  data.comments.map((comment) => (
                    <div className="comment">
                      <img src={comment.commentBy.profilepic} alt="no" />
                      <div>
                        <Link to={`../../user/${comment.commentBy._id}`}>
                          @{comment.commentBy.username}
                        </Link>
                        <p>{comment.comment}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <h2>No comments Yet</h2>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <RightPanel />
    </div>
  );
}

export default Post;
