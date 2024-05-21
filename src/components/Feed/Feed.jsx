import React, { useState, useEffect } from "react";
import "./Feed.css";
import FeedCard from "../FeedCard/FeedCard";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { getPosts } from "../../toolkit/actions/postActions";
import { useParams } from "react-router-dom";
import { errorToast, successToast } from "../../util";
import { resetPostState } from "../../toolkit/slices/postSlice";

function Feed({ hideHeading }) {
  const [pageLoading, setPageLoading] = useState(true);
  const { id } = useParams("id");
  const [pagePosts, setPagePosts] = useState([]);
  const dispatch = useDispatch();
  const { loading, posts, success, error } = useSelector((state) => state.post);

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(getPosts());
    };

    fetchPosts();
  }, [dispatch]);

  useEffect(() => {
    if (loading && posts.length === 0) {
      setPageLoading(true);
    }
    if (!loading && posts.length !== 0) {
      setPagePosts(posts);
      setPageLoading(false);
    }
  }, [loading, posts]);

  useEffect(() => {
    const showToastSuccess = () => {
      if (success === null) return;

      if (success === "postUpdateSuccess") {
        successToast("Post Editted Successfully");
      } else if (success === "postDeleteSuccess") {
        successToast("Post Deleted Successfully");
      }
      dispatch(resetPostState());
    };

    const showToastError = () => {
      if (error === null) return;

      if (error === "postUpdateError") {
        errorToast("Post couldn't be updated due to an error");
      } else if (error === "postDeleteError") {
        errorToast("Post couldn't be deleted due to an error");
      }
      dispatch(resetPostState());
    };

    showToastSuccess();
    showToastError();
    //
  }, [success, dispatch, error]);

  if (pageLoading) return <Loader />;

  return (
    <div className={`feed-wrapper ${hideHeading ? "no-padding" : ""}`}>
      {!hideHeading && <h2>Feed</h2>}
      <div className="feeds">
        {!id ? (
          <>
            {pagePosts.toReversed().map((post, id) => (
              <FeedCard data={post} key={id} />
            ))}
          </>
        ) : (
          <>
            {pagePosts
              .filter(({ creator }) => creator._id === id)
              .toReversed()
              .map((post, id) => (
                <FeedCard data={post} key={id} />
              ))}
          </>
        )}
      </div>
      {!hideHeading && (
        <footer>
          <h2>End Of Feeds</h2>
          <h3>Post More have fun</h3>
        </footer>
      )}
    </div>
  );
}

export default Feed;
