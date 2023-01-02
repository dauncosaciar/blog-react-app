/* Hook personalizado para hacer peticiones fetch */

import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [loading, setLoading] = useState(true); // Estado para saber si se está haciendo la petición o si ya ha terminado
  const [result, setResult] = useState(null); // Estado para guardar el resultado de la petición
  const [error, setError] = useState(null); // Estado por si, al hacer la petición, se genera un error

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setResult(json);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, [url]);

  return { loading, result, error };
}
