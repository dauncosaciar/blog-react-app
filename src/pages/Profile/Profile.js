/* Página que muestra el componente de registro o el perfil del usuario, dependiendo si está o no logueado */

import React, { useState } from "react";
import SignInSignUp from "../../components/SignInSignUp";

import "./Profile.scss";

export default function Profile() {
  return (
    <div className="profile">
      <SignInSignUp />
    </div>
  );
}
