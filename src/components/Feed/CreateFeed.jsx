import React, { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../toolkit/actions/postActions";
import { saveDraft } from "../../toolkit/slices/postSlice";
import { IoClose } from "react-icons/io5";
import { FaClockRotateLeft } from "react-icons/fa6";
import "./CreateFeed.css";

const initialState = {
  title: "",
  message: "",
  images: [],
  creator: "",
};

const CreateFeed = ({ setShowCreate }) => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const creator = useSelector((state) => state.user.userInfo._id);
  const draft = useSelector((state) => state.post.draft) || initialState;

  const closeWidget = () => {
    setShowCreate(false);
  };

  const loadDraft = () => {
    setFormData(draft);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.creator = creator;
    dispatch(createPost(formData));
  };

  const saveDraftFunc = (e) => {
    e.preventDefault();
    // localStorage.setItem("draft", JSON.stringify(formData));
    dispatch(saveDraft(formData));
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
      <div className="create-post-container">
        <button className="icon-btn" onClick={loadDraft}>
          <FaClockRotateLeft className="icon" size={24} />
        </button>
        <button className="close-btn" onClick={closeWidget}>
          <IoClose size={48} />
        </button>
        {formData.images.length !== 0 &&
          formData.images.map((image) => (
            <div key={image.length}>
              <img src={image} alt="post selected by you" width="200px" />
              <button onClick={() => removeImage(image)}>x</button>
            </div>
          ))}
        <form
          action="create-post-form"
          onSubmit={handleSubmit}
          className="create-post-form"
        >
          <label htmlFor="title">Title</label>
          <input
            className="input"
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />
          <label htmlFor="message">Message</label>
          <textarea
            className="input"
            type="text"
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            aria-multiline
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
          <section className="btn-wrapper">
            <button type="submit">Send</button>
            <button onClick={saveDraftFunc}>Save as Draft</button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default CreateFeed;
