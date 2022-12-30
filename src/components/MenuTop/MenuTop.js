/* Componente Menú */

import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.svg";

import "./MenuTop.scss";

export default function MenuTop() {
  return (
    <div className="menu-top">
      <div className="menu-top__logo">
        <img src={Logo} alt="Blog React App" />
      </div>
    </div>
  );
}
