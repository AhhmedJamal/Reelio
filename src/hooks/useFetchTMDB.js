import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;

async function fetchFromTMDB(url) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (!res.ok) {
    throw new Error(`TMDb fetch failed: ${res.status}`);
  }
  return res.json();
}

export function useFetchTMDB(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    fetchFromTMDB(url)
      .then((res) => setData(res.results || res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
