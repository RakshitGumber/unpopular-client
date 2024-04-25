import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../store/actions/user";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  profilepic: "",
  username: "",
  email: "",
  password: "",
};

const UserDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userData = useSelector((state) => state.userReducer.userData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    setLoading(true);
    dispatch(getUser(id))
      .then((data) => {
        setLoading(false);
        console.log(data);
        if (
          JSON.parse(localStorage.getItem("user")).user._id === data.user._id
        ) {
          setEditable(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, [dispatch, id]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("../");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateUser(id, formData));
    setEditing(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading || !userData) return <h1>Loading</h1>;

  return (
    <>
      {editable && (
        <button
          onClick={() => {
            setEditing(true);
          }}
        >
          Pencile
        </button>
      )}
      {editing ? (
        <>
          <input
            type="text"
            name="firstName"
            onChange={handleChange}
            placeholder={userData.user.firstName}
          />
          <button type="submit" onClick={handleSubmit}>
            Save Changes
          </button>
          <button
            onClick={() => {
              setEditing(false);
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h1>{userData.user.firstName}</h1>
        </>
      )}
      <button onClick={logout}>Log Out</button>
    </>
  );
  // sett all data to show user data
};

export default UserDetails;
