import React, { useState, useContext, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../toolkit/actions/postActions";
import { saveDraft } from "../../toolkit/slices/postSlice";
import { IoClose } from "react-icons/io5";
import { FaClockRotateLeft } from "react-icons/fa6";
import "./CreateFeed.css";
import { FeedControlContext } from "..";

const initialState = {
  title: "",
  message: "",
  images: [],
  creator: "",
};

const CreateFeed = ({ setShowCreate }) => {
  const [formData, setFormData] = useState(initialState);
  const [thisid, setThisId] = useState("");
  const dispatch = useDispatch();
  const creator = useSelector((state) => state.user.userInfo._id);
  const { draft } = useSelector((state) => state.post) || initialState;
  const { editing, postValue } = useContext(FeedControlContext);

  const closeWidget = () => {
    setShowCreate(false);
  };

  const loadDraft = () => {
    setFormData(draft);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      dispatch(updatePost({ id: thisid, post: formData }));
      closeWidget();
    } else {
      formData.creator = creator;
      dispatch(createPost(formData));
      closeWidget();
    }
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

  useEffect(() => {
    if (editing) {
      setFormData(postValue);
      setThisId(postValue.id);
    }
  }, [editing, postValue, setThisId]);

  return (
    <div className="create-post-wrapper">
      <div className="create-post-container">
        <h1>{editing ? "Edit" : "Create"}</h1>
        {!editing && (
          <button className="icon-btn" onClick={loadDraft}>
            <FaClockRotateLeft className="icon" size={24} />
          </button>
        )}
        <button className="close-btn" onClick={closeWidget}>
          <IoClose size={48} />
        </button>

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
          <section className="images">
            {console.log(formData.images)}
            {formData.images.length !== 0 &&
              formData.images.map((image, id) => (
                <div key={id}>
                  <img
                    className="image"
                    src={image}
                    alt="post selected by you"
                    width="200px"
                  />
                  <button
                    className="img-btn"
                    onClick={() => removeImage(image)}
                  >
                    <IoClose size={20} />
                  </button>
                </div>
              ))}
          </section>
          <section className="btn-wrapper">
            <button type="submit">Send</button>
            {!editing && <button onClick={saveDraftFunc}>Save as Draft</button>}
          </section>
        </form>
      </div>
    </div>
  );
};

export default CreateFeed;
