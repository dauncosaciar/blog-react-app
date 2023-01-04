import Home from "../pages/Home";
import Search from "../pages/Search";
import Profile from "../pages/Profile";
import Error404 from "../pages/Error404";
import New from "../pages/New";

export default function ConfigRouting() {
  const configRoutes = [
    {
      path: "/profile",
      page: Profile
    },
    {
      path: "/new/:id",
      page: New
    },
    {
      path: "/search",
      page: Search
    },
    {
      path: "/",
      page: Home
    },
    {
      path: "*",
      page: Error404
    }
  ];

  return configRoutes;
}
