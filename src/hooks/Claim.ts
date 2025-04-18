import { useState, useEffect } from "react";
import axios from "axios";
import { IClaim } from "src/interfaces/claim";

const useClaim = (id: string | number) => {
  const [claim, setClaim] = useState<IClaim | {}>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClaim = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get<IClaim>(
          `http://localhost:8000/claims/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setClaim(response.data);
      } catch (err) {
        setError("Failed to fetch claim");
      } finally {
        setLoading(false);
      }
    };

    fetchClaim();
  }, [id]);

  return { claim, loading, error };
};

export default useClaim;
