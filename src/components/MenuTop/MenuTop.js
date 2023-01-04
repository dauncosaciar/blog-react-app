/* Componente Menú */

import React, { useState } from "react";
import { Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Logo from "../../assets/img/logo.svg";

import "./MenuTop.scss";

export default function MenuTop() {
  const [current, setCurrent] = useState("home");
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
