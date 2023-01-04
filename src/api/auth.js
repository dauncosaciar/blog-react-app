import { USER_URL_HOST, TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

/* Registro de usuario */
export function signUpApi(user) {
  const url = `${USER_URL_HOST}/registro`;
  const userTemp = {
    ...user,
    email: user.email.toLowerCase()
  };
  delete userTemp.repeatPassword;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userTemp)
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return {
        code: 404,
        message: "Oops! We already have someone registered with that email. Choose another email"
      };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

/* Login de usuario */
export function signInApi(user) {
  const url = `${USER_URL_HOST}/login`;

  const data = {
    ...user,
    email: user.email.toLowerCase()
  };

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return { message: "Oops! Your email or password are incorrect" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

/* Guardar token de login en localstorage */
export function setTokenApi(token) {
  localStorage.setItem(TOKEN, token);
}

/* Obtener token del localstorage */
export function getTokenApi() {
  return localStorage.getItem(TOKEN);
}

/* Desloguearse de la aplicación */
export function logoutApi() {
  localStorage.removeItem(TOKEN);
}

/* Chequear si el usuario está logueado o no */
export function isUserLoggedApi() {
  const token = getTokenApi();

  if (!token) {
    logoutApi();
    return null;
  }
  if (isExpired(token)) {
    logoutApi();
  }
  return jwtDecode(token);
}

/* Chequear si el token ha caducado */
function isExpired(token) {
  const { exp } = jwtDecode(token);
  const expire = exp * 1000;
  const timeout = expire - Date.now(); // Fecha de expiración - fecha de ahora (now)

  if (timeout < 0) {
    return true; // Significa que el token ha caducado
  }
  return false; // Significa que el token no ha caducado
}
