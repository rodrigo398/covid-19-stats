import { useState, useEffect } from 'react';

export default function useStats(url) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState();

  useEffect(() => {
    async function fetchData() {
      setError();
      const data = await fetch(url)
        .then(response => response.json())
        .catch(err => {
          setError(err);
        });
      setStats(data);
      setLoading(false);
    }
    fetchData();
  }, [url]);

  return { stats, loading, error };
}
