import React, { useEffect, useRef, useState } from "react";
import "./FeedCard.css";
import { ShowImage } from "../../util";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { SpButton } from "../../util";
import { IoChatbubbleSharp, IoEllipsisVertical } from "react-icons/io5";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { likePost, dislikePost } from "../../toolkit/actions/postActions";
import { sendRequest } from "../../toolkit/actions/followerActions";

function FeedCard({ data }) {
  const [overflowActive, setOverflowActive] = useState(false);
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);
  const [isFollowing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const dataState = useRef({
    liked: data.likes.includes(user._id),
    disliked: data.dislikes.includes(user._id),
    pending: false,
    following: false,
  });
  const [postState, setPostState] = useState({
    likes: data.likes.length,
    dislikes: data.dislikes.length,
  });

  const overflowingText = useRef(null);

  const isOverflow = (textContainer) => {
    if (textContainer) {
      return textContainer.offsetHeight < textContainer.scrollHeight;
    }
    return false;
  };

  const sendFollowRequest = () => {
    dispatch(sendRequest({ id: user._id, userId: data.creator._id }));
    setIsPending(true);
  };

  useEffect(() => {
    if (isOverflow(overflowingText.current)) {
      setOverflowActive(true);
      return;
    }
    setOverflowActive(false);
  }, [overflowActive]);

  const likePostFunc = () => {
    dispatch(likePost({ postId: data._id, userId: user._id }));
    if (!dataState.current.liked) {
      dataState.current.liked = true;
      if (dataState.current.disliked) {
        setPostState({
          ...postState,
          likes: postState.likes + 1,
          dislikes: postState.dislikes - 1,
        });
        dataState.current.disliked = false;
        return;
      }
      setPostState({ ...postState, likes: postState.likes + 1 });
      return;
    }
    setPostState({ ...postState, likes: postState.likes - 1 });
    dataState.current.liked = false;
  };

  const dislikePostFunc = () => {
    dispatch(dislikePost({ postId: data._id, userId: user._id }));
    if (!dataState.current.disliked) {
      dataState.current.disliked = true;
      if (dataState.current.liked) {
        setPostState({
          ...postState,
          likes: postState.likes - 1,
          dislikes: postState.dislikes + 1,
        });
        dataState.current.liked = false;
        return;
      }
      setPostState({ ...postState, dislikes: postState.dislikes + 1 });
      return;
    }
    setPostState({ ...postState, dislikes: postState.dislikes - 1 });
    dataState.current.disliked = false;
  };

  const openPost = () => {
    navigate(`/posts/${data._id}`);
  };

  const { creator } = data;
  return (
    <div className="feed-card-container">
      <div className="row">
        <div className="user-tag">
          {creator.lastName ? (
            <ShowImage
              image={creator.profilepic}
              firstname={creator.firstName}
              lastname={creator.lastName}
            />
          ) : (
            <ShowImage
              image={creator.profilepic}
              firstname={creator.firstName}
            />
          )}

          <div
            className="userinfo"
            onClick={() => {
              navigate(`/user/${creator._id}`);
            }}
          >
            <p className="strong">
              {creator.lastName
                ? creator.firstName + " " + creator.lastName
                : creator.firstName}
            </p>
            <p className="weak">@{creator.username}</p>
            <p className="weak">{moment(data.createdAt).fromNow()}</p>
          </div>
        </div>
        {creator._id === user?._id ||
          (isPending ? (
            <SpButton text="Pending" />
          ) : isFollowing ? (
            <SpButton text="Following" />
          ) : (
            <SpButton text="Follow" onClick={sendFollowRequest} />
          ))}
        {creator._id === user?._id && (
          <button
            className="icon-button"
            onClick={() => setShowMoreOptions(!showMoreOptions)}
          >
            <IoEllipsisVertical size={24} />
          </button>
        )}
        {showMoreOptions && (
          <div className="more-options">
            <button>edit</button>
            <button>delete</button>
          </div>
        )}
      </div>
      <h1 className={`post-title not-selectable`}>{data.title}</h1>
      <p
        className={`post-content not-selectable ${
          overflowActive && !showMore && "fade"
        }`}
        ref={overflowingText}
      >
        {data.message}
      </p>
      {overflowActive && !showMore && (
        <button className="more" onClick={() => setShowMore(!showMore)}>
          More...
        </button>
      )}
      {data.images && (
        <div className="post-images">
          {data.images.map((item, id) => (
            <ShowImage
              key={id}
              image={item}
              firstname={"image"}
              lastname={"don't know"}
              className={`${
                data.images.length <= 1 ? "cover-image" : "grid-image-view"
              }  ${showFullImage && "fit-contain"}`}
              onClick={() => setShowFullImage(!showFullImage)}
            />
          ))}
        </div>
      )}
      <div className="post-actions">
        <div className="post-reactivity">
          <button
            className={`icon-button  ${
              dataState.current.liked && "selected-button"
            }`}
            onClick={likePostFunc}
          >
            <BiSolidUpvote size={24} />
          </button>
          <span>{postState.likes - postState.dislikes}</span>
          <button
            className={`icon-button ${
              dataState.current.disliked && "selected-button"
            }`}
            onClick={dislikePostFunc}
          >
            <BiSolidDownvote size={24} />
          </button>
        </div>
        <button className="icon-button" onClick={openPost}>
          <IoChatbubbleSharp size={24} />
        </button>
      </div>
    </div>
  );
}

export default FeedCard;
