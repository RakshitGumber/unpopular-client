import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../toolkit/actions/postActions";
import { saveDraft } from "../../toolkit/slices/postSlice";
import { IoClose } from "react-icons/io5";
import { FaClockRotateLeft } from "react-icons/fa6";
import "./CreateFeed.css";
import { FeedControlContext } from "..";
import { Widget } from "@uploadcare/react-widget";

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
  const [disabled, setDisabled] = useState(false);

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
          encType="multipart/form-data"
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
          <label htmlFor="images">Add or Remove Images</label>
          <Widget
            publicKey="a56cee8a34ef7370cbc4"
            onFileSelect={(file) => {
              setDisabled(true);
            }}
            onChange={(info) => {
              console.log(info);
              setFormData({ ...formData, images: [] });
              const imageArray = [];
              for (let i = 0; i < info.count; i++) {
                imageArray.push(`${info.cdnUrl}nth/${i}/`);
              }
              setFormData({
                ...formData,
                images: imageArray,
              });
              setDisabled(false);
            }}
            multiple
            multipleMax={4}
            id="images"
          />
          <section className="images">
            {formData.images.length !== 0 &&
              formData.images.map((image, id) => (
                <div key={id}>
                  <img
                    className="image"
                    src={image}
                    alt="post selected by you"
                    width="200px"
                  />
                </div>
              ))}
          </section>
          <section className="btn-wrapper">
            <button type="submit" disabled={disabled}>
              Send
            </button>
            {!editing && <button onClick={saveDraftFunc}>Save as Draft</button>}
          </section>
        </form>
      </div>
    </div>
  );
};

export default CreateFeed;
