/* Componente que carga un spin mientras se devuelve y cargan los datos de una petición */

import React from "react";
import { Spin } from "antd";

import "./Loading.scss";

export default function Loading() {
  return (
    <div className="loading">
      <Spin size="large" />
    </div>
  );
}
