/* Componente Menú */

import React, { useState } from "react";
import { Menu } from "antd";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Logo from "../../assets/img/logo.svg";

import "./MenuTop.scss";

export default withRouter(MenuTop);

function MenuTop(props) {
  const { location } = props;
  const [current, setCurrent] = useState(getSelectedItem(location));
  const loggedUser = useAuth();

  let items = [];

  if (loggedUser) {
    items = [
      { key: "home", label: <Link to="/">Home</Link> },
      { key: "search", label: <Link to="/search">Search</Link> },
      { key: "profile", label: <Link to="/profile">My profile</Link> }
    ];
  } else {
    items = [
      { key: "home", label: <Link to="/">Home</Link> },
      { key: "search", label: <Link to="/search">Search</Link> },
      { key: "profile", label: <Link to="/profile">Login</Link> }
    ];
  }

  const setActiveItem = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className="menu-top">
      <div className="menu-top__logo">
        <img src={Logo} alt="Blog React App" />
      </div>
      <Menu
        onClick={(e) => setActiveItem(e)}
        defaultSelectedKeys={[current]}
        theme="light"
        mode="horizontal"
        items={items}
      />
      <Outlet />
    </div>
  );
}

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let history = useNavigate();
    let params = useParams();

    return <Component {...props} location={location} params={params} history={history} />;
  }

  return ComponentWithRouterProp;
}

function getSelectedItem(location) {
  const pathnameCleaned = location.pathname.split("/")[1];
  const key = pathnameCleaned ? pathnameCleaned : "home";

  return key;
}
