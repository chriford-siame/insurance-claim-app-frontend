import { useState, useEffect } from "react";
import axios from "axios";
import { IClaim } from "src/interfaces/claim";

const useClaims = () => {
  const [claims, setClaims] = useState<IClaim[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClaims = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get(
          "http://localhost:8000/claims/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setClaims(response.data);
      } catch (err) {
        setError("Failed to fetch claims.");
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  return { claims, loading, error };
};

export default useClaims;
