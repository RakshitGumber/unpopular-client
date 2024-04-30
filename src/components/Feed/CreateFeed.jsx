import React, { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost } from "../../store/actions/posts";

const initialState = {
  title: "",
  message: "",
  images: [],
  creator: JSON.parse(localStorage.getItem("user")).user._id,
};

const CreateFeed = ({ setShowCreate }) => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const closeWidget = () => {
    setShowCreate(false);
  };

  const getDraft = () => {
    const data = JSON.parse(localStorage.getItem("draft")) || initialState;
    setFormData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createPost(formData));
  };

  const saveDraft = (e) => {
    e.preventDefault();
    localStorage.setItem("draft", JSON.stringify(formData));
    setFormData(initialState);
    closeWidget();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const removeImage = (image) => {
    let newImages = formData.images.filter((item) => item !== image);
    setFormData({ ...formData, images: newImages });
  };

  return (
    <div className="create-post-wrapper">
      <button onClick={getDraft}>Draft</button>
      <button onClick={closeWidget}>Close</button>
      {formData.images.length !== 0 &&
        formData.images.map((image) => (
          <div key={image.length}>
            <img src={image} alt="post selected by you" width="200px" />
            <button onClick={() => removeImage(image)}>x</button>
          </div>
        ))}
      <form action="create-post-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="message">Message</label>
        <input
          type="text"
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
        />
        <FileBase
          type="file"
          multiple
          value={formData.images}
          onDone={(image) => {
            image.forEach(({ base64 }) => {
              setFormData({
                ...formData,
                images: [...formData.images, base64],
              });
            });
          }}
        />
        <button type="submit">Send</button>
        <button onClick={saveDraft}>Save as Draft</button>
      </form>
    </div>
  );
};

export default CreateFeed;
