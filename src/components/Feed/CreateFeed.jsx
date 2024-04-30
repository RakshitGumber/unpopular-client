import React from "react";
import FileBase from "react-file-base64";

const CreateFeed = () => {
  return (
    <div className="create-post-wrapper">
      <button>Draft</button>
      <form action="create-post-form">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" placeholder="Title" />
        <label htmlFor="message">Message</label>
        <input type="text" name="message" placeholder="Message" />
        <FileBase type="file" multiple={true} onDone={() => {}} />
        <button>Send</button>
        <button>Save as Draft</button>
      </form>
    </div>
  );
};

export default CreateFeed;
