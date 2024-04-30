import React, { useState } from "react";

function ShowImage(props) {
  const [profilePicError, setProfilePicError] = useState(false);

  return (
    <>
      {profilePicError ? (
        <img
          src={`https://ui-avatars.com/api/?name=${props.firstname}${
            !props.lastname ? "" : `+${props.lastname}`
          }`}
          alt="userImage"
          {...props}
        />
      ) : (
        <img
          src={props.image}
          alt="ProfilePic"
          onInvalid={() => setProfilePicError(true)}
          {...props}
        />
      )}
    </>
  );
}

export default ShowImage;
