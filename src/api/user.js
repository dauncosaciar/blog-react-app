import { USER_URL_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";

export function getUserApi(id) {
  const url = `${USER_URL_HOST}/verPerfil?id=${id}`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`
    }
  };

  return fetch(url, params)
    .then((response) => {
      // eslint-disable-next-line no-throw-literal
      if (response.status >= 400) throw null;
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function uploadAvatarApi(file) {
  const url = `${USER_URL_HOST}/subirAvatar`;

  const formData = new FormData(); // Enviar Multipart Forms (para subir ficheros)
  formData.append("avatar", file);

  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getTokenApi()}`
    },
    body: formData
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function updateInfoApi(data) {
  const url = `${USER_URL_HOST}/modificarPerfil`;

  const params = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getTokenApi()}`
    },
    body: JSON.stringify(data)
  };

  return fetch(url, params)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      return err;
    });
}
