import React, { useEffect, useRef, useState } from "react";
import "./FeedCard.css";
import { ShowImage } from "../../../util";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function FeedCard({ data }) {
  const [overflowActive, setOverflowActive] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"))?.user;

  const overflowingText = useRef(null);

  const isOverflow = (textContainer) => {
    if (textContainer) {
      return textContainer.offsetHeight < textContainer.scrollHeight;
    }
    return false;
  };

  useEffect(() => {
    if (isOverflow(overflowingText.current)) {
      setOverflowActive(true);
      return;
    }
    setOverflowActive(false);
  }, [overflowActive]);

  const { creator } = data;
  return (
    <div
      className="feed-card-container"
      onClick={() => {
        console.log(overflowActive);
      }}
    >
      <div className="user-tag">
        {creator.lastName ? (
          <ShowImage
            image={creator.profilepic}
            firstname={creator.firstName}
            lastname={creator.lastName}
          />
        ) : (
          <ShowImage image={creator.profilepic} firstname={creator.firstName} />
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
          <span>{moment(data.createdAt).fromNow()}</span>
        </div>
      </div>

      <h1
        className={`post-content not-selectable ${!showMore && "fade"}`}
        ref={overflowingText}
      >
        {data.title}
      </h1>
      <p
        className={`post-content not-selectable ${!showMore && "fade"}`}
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
          {data.images.map((item) => (
            <ShowImage
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
      <div>
        <button>Like</button>
        <button>Dislike</button>
        <button>Comment</button>
        {creator._id === user._id && (
          <button onClick={() => setShowMoreOptions(!showMoreOptions)}>
            More
          </button>
        )}
        {showMoreOptions && (
          <>
            <button>edit</button>
            <button>delete</button>
          </>
        )}
      </div>
    </div>
  );
}

export default FeedCard;
