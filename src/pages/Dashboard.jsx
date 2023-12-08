import { useContext } from "react";
import { AdminInfo, User, Repos, Navbar, Search } from "../components";
import { GithubUsersContext } from "../context";
import { loadinGif } from "../assets";

export const Dashboard = () => {
  const { isLoading } = useContext(GithubUsersContext);

  if (isLoading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img src={loadinGif} className="loading-img" alt="loading" />
      </main>
    );
  }
  return (
    <main>
      <Navbar />
      <Search />

      <AdminInfo />
      <User />
      <Repos />
    </main>
  );
};
