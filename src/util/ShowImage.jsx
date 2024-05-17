import React, { useState } from "react";

const ShowImage = React.forwardRef((props, ref) => {
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
          ref={ref}
        />
      ) : (
        <img
          src={props.image}
          alt="ProfilePic"
          onError={() => setProfilePicError(true)}
          {...props}
          ref={ref}
        />
      )}
    </>
  );
});

export default ShowImage;
