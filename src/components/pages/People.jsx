import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, Link, useParams } from "react-router-dom";
import { searchUser } from "../../store/actions/followers";
import { debounce } from "lodash";
import SearchUserResult from "../Search/SearchUserResult";

const People = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  const debouncedSearch = debounce(async (inputValue) => {
    setLoading(true); // Set loading to true when starting the search
    const users = await dispatch(searchUser(id, inputValue));
    console.log(users);
    setLoading(false); // Set loading to false when search is completed
    setSearchResults(users?.users);
    console.log(searchResults);
  }, 300); // Reduced debounce time for faster response

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    setSearchResults([]); // Clear previous search results when starting a new search
    debouncedSearch(inputValue);
  };

  return (
    <>
      <h1>People</h1>
      <input
        type="text"
        name="searchUser"
        value={value}
        onChange={handleChange}
      />
      {loading ? (
        <p>Loading...</p>
      ) : searchResults && searchResults.length > 0 ? (
        searchResults.map((data) => (
          <SearchUserResult key={data._id} data={data} />
        ))
      ) : (
        <p>No Result Found</p>
      )}
      <Link to={`${user.user._id}/followers`}>Followers</Link>
      <Link to={`${user.user._id}/following`}>Following</Link>
      <Link to={`${user.user._id}/pending`}>Pending</Link>
      <Outlet />
    </>
  );
};

export default People;
