import React, { useEffect, useState } from "react";
import "./RightPanel.css";
import { searchPost, getPosts } from "../../toolkit/actions/postActions";
import { IoSearch } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { debounce } from "lodash";

function RightPanel() {
  const { loading, posts, searchResults } = useSelector((state) => state.post);
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [resultLoading, setResultLoading] = useState(false);
  const dispatch = useDispatch();
  const [pageLoading, setPageLoading] = useState(true);
  const [pagePosts, setPagePosts] = useState([]);

  const debouncedSearch = debounce(async (inputValue) => {
    dispatch(searchPost({ query: inputValue }));
    setResultLoading(true);
  }, 300);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    setResults([]);
    debouncedSearch(inputValue);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(getPosts());
    };

    fetchPosts();
  }, [dispatch]);

  useEffect(() => {
    if (loading && posts.length === 0) {
      setPageLoading(true);
    }
    if (posts.length !== 0) {
      setPageLoading(false);
      setPagePosts(posts);
    }
  }, [loading, posts]);

  useEffect(() => {
    if (value?.length === 0) {
      setResults([]);
      setResultLoading(false);
      return;
    }

    if (!loading && searchResults) {
      setResults(searchResults.data);
      setResultLoading(false);
    }
  }, [loading, searchResults, value]);

  return (
    <div className="panel-wrapper">
      {pageLoading || pagePosts?.length === 0 ? (
        <Loader />
      ) : (
        <>
          <form className="search-form">
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              value={value}
              onChange={handleChange}
            />
            <button type="submit" className="search-button">
              <IoSearch />
            </button>
          </form>

          {resultLoading ? (
            <div className="post-results">
              <Loader />
            </div>
          ) : (
            <>
              {results?.length > 0 && (
                <div className="post-results">
                  {results.map((data) => (
                    <div className="searched-post" key={data._id}>
                      <Link to={`../posts/${data._id}`}>{data.title}</Link>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          <section className="trending-section">
            <h1 className="section-header">Trending</h1>
            {pagePosts.map((post) => (
              <article className="trending-card" key={post._id}>
                <Link to={`../posts/${post._id}`}>
                  <h2>{post.title}</h2>
                </Link>
              </article>
            ))}
          </section>
        </>
      )}
    </div>
  );
}

export default RightPanel;
