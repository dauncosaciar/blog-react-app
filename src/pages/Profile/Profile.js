/* Página que muestra el componente de registro o el perfil del usuario, dependiendo si está o no logueado */

import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import SignInSignUp from "../../components/SignInSignUp";
import User from "../../components/User";

import "./Profile.scss";

export default function Profile(props) {
  const { setRefreshCheckLogin } = props;
  const userLogged = useAuth();

  return (
    <div className="profile">
      {userLogged ? <User /> : <SignInSignUp setRefreshCheckLogin={setRefreshCheckLogin} />}
    </div>
  );
}
