import { useEffect, useState } from "react";
import { GithubUsersContext } from "./";
import { mockUserLok, mockReposLok, mockFollowersLok } from "../assets";
import axios from "axios";

export const GithubUsersContextProvider = ({ children }) => {
  const rootUrl = "https://api.github.com";

  const [githubUser, setGithubUser] = useState(mockUserLok);
  const [repos, setRepos] = useState(mockReposLok);
  const [followers, setFollowers] = useState(mockFollowersLok);

  // request loading
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // error
  const [error, setError] = useState({ show: false, msg: "" });

  const searchGithubUser = async (query) => {
    toggleError();
    // setIsLoading(true);

    // if (!query === undefined || null) {
    const response = await axios(`${rootUrl}/users/${query}`).catch(
      (err) => setError({ show: true, msg: err })
      // console.log(err)
    );
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          const [repos, followers] = results;
          const status = "fulfilled";
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      toggleError(true, "No user found with given username");
    }
    checkRequestRate();
    setIsLoading(false);
    // }
  };

  const checkRequestRate = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, "Sorry, you have exceeded your hourly rate limit!");
        }
      })
      .catch((err) => console.log(err));
  };

  const toggleError = (show = false, msg = "") => {
    setError({ show, msg });
  };

  useEffect(() => {
    checkRequestRate();
  }, []);

  useEffect(() => {
    searchGithubUser();
  }, []);

  return (
    <GithubUsersContext.Provider
      value={{
        githubUser,
        followers,
        repos,
        requests,
        error,
        isLoading,
        searchGithubUser,
      }}
    >
      {children}
    </GithubUsersContext.Provider>
  );
};
