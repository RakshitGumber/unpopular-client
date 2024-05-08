import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link, useParams } from "react-router-dom";
import { searchUser } from "../../toolkit/actions/followerActions";
import { debounce } from "lodash";
import SearchUserResult from "../../components/Search/SearchUserResult";
import { Sidebar, RightPanel, TopBar, BottomBar } from "../../components";
import "./People.css";

const People = () => {
  const user = useSelector((state) => state.user.userInfo);
  const [value, setValue] = useState("");
  const { loading, searchResults } = useSelector((state) => state.people);
  const [results, setResults] = useState([]);
  const [resultLoading, setResultLoading] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  const debouncedSearch = debounce(async (inputValue) => {
    setResultLoading(true);
    dispatch(searchUser({ id, query: inputValue }));
  }, 300);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    setResults([]);
    debouncedSearch(inputValue);
  };
  useEffect(() => {
    setResults([]);
  }, []);

  useEffect(() => {
    if (value.length === 0) {
      setResults([]);
      setResultLoading(false);
      return;
    }

    if (!loading && searchResults) {
      setResultLoading(false);
      setResults(searchResults);
      console.log(results);
    }
  }, [loading, searchResults, results, value]);

  return (
    <div className="friends-wrapper">
      <TopBar />
      <Sidebar />
      <div className="friends-main">
        <h1>Explore</h1>
        <input
          type="text"
          name="searchUser"
          value={value}
          onChange={handleChange}
          className="search"
          placeholder="Explore"
        />
        <div className="results">
          {resultLoading ? (
            <p>Loading...</p>
          ) : results && results.length > 0 ? (
            results.map(
              (data, id) =>
                user._id !== data._id && (
                  <SearchUserResult key={id} data={data} />
                )
            )
          ) : (
            <p>No Result Found</p>
          )}
        </div>
        <Link to={`${user._id}/followers`}>Followers</Link>
        <Link to={`${user._id}/following`}>Following</Link>
        <Link to={`${user._id}/pending`}>Pending</Link>
        <Outlet />
      </div>
      <RightPanel />
      <BottomBar />
    </div>
  );
};

export default People;
