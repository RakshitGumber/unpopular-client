import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link, useParams, useLocation } from "react-router-dom";
import { searchUser } from "../../toolkit/actions/followerActions";
import { debounce } from "lodash";
import SearchUserResult from "../../components/Search/SearchUserResult";
import { Sidebar, RightPanel, BottomBar, Navbar } from "../../components";
import "./People.css";
import { errorToast, successToast, useOutsideClick } from "../../util";
import { resetFollowerState } from "../../toolkit/slices/followerSlice";

const People = () => {
  const searchRef = useRef();
  const user = useSelector((state) => state.user.userInfo);
  const [value, setValue] = useState("");
  const { loading, searchResults, success, error } = useSelector(
    (state) => state.people
  );
  const [results, setResults] = useState([]);
  const [resultLoading, setResultLoading] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();

  const debouncedSearch = debounce(async (inputValue) => {
    dispatch(searchUser({ id, query: inputValue }));
    setResultLoading(true);
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
    }
  }, [loading, searchResults, value]);

  useOutsideClick(searchRef, () => {
    setResults([]);
    setValue("");
  });

  useEffect(() => {
    const showSuccessToast = () => {
      if (success === null) return;

      if (success === "sendRequestSuccess") {
        successToast("Request Sent Successfully");
      }

      dispatch(resetFollowerState());
    };

    const showErrorToast = () => {
      if (error === null) return;

      if (error === "sendRequestError") {
        errorToast("An unexpected Error occurred while sending request");
      }
      dispatch(resetFollowerState());
    };

    showErrorToast();
    showSuccessToast();
    //
  }, [success, dispatch, error]);

  return (
    <div className="friends-wrapper">
      <Navbar hidden />
      <Sidebar />
      <div className="friends-main">
        <h1>Explore</h1>
        <div className="search-wrapper" ref={searchRef}>
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
            ) : (
              results &&
              results.length > 0 &&
              results.map(
                (data, id) =>
                  user._id !== data._id && (
                    <SearchUserResult key={id} data={data} />
                  )
              )
            )}
          </div>
        </div>
        <div className="sect-headers">
          <Link
            to={`${user._id}/followers`}
            className={
              location.pathname.includes(`${user._id}/followers`)
                ? "selected"
                : ""
            }
          >
            Followers
          </Link>
          <Link
            to={`${user._id}/following`}
            className={
              location.pathname.includes(`${user._id}/following`)
                ? "selected"
                : ""
            }
          >
            Following
          </Link>
          <Link
            to={`${user._id}/pending`}
            className={
              location.pathname.includes(`${user._id}/pending`)
                ? "selected"
                : ""
            }
          >
            Pending
          </Link>
        </div>
        <div className="sect-content">
          <Outlet />
        </div>
      </div>
      <RightPanel />
      <BottomBar />
    </div>
  );
};

export default People;
