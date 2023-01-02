/* Componente Menú */

import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.svg";

import "./MenuTop.scss";

export default function MenuTop() {
  const [current, setCurrent] = useState("home");

  const items = [
    { key: "home", label: <Link to="/">Home</Link> },
    { key: "search", label: <Link to="/search">Buscador</Link> },
    { key: "login", label: <Link to="/login">Iniciar Sesión</Link> }
  ];

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
    </div>
  );
}
