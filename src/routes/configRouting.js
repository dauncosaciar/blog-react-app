import Home from "../pages/Home";
import Search from "../pages/Search";
import User from "../pages/User";
import Error404 from "../pages/Error404";
import New from "../pages/New";
import SignInSignUp from "../pages/SignInSignUp";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: "/login",
    page: SignInSignUp
  },
  {
    path: "/user/:id",
    page: User
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
