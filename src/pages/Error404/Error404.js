/* Página que muestra un mensaje de recurso no encontrado */

import React from "react";
import { Link } from "react-router-dom";

import "./Error404.scss";

export default function Error404() {
  return (
    <div className="error404">
      <h1>Error 404</h1>
      <h2>Página No Encontrada</h2>
      <Link to="/">
        <h3>Volver al inicio</h3>
      </Link>
    </div>
  );
}
