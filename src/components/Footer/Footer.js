/* Componente que muestra un footer */

import React from "react";
import { Layout } from "antd";
import moment from "moment";

import "./Footer.scss";

export default function Footer() {
  const { Footer } = Layout;

  return (
    <Footer className="footer">
      <p>Roma Invicta &copy; {moment().get("year")}.</p>
    </Footer>
  );
}
