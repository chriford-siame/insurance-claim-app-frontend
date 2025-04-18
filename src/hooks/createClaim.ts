import { useState, useEffect } from "react";
import axios from "axios";
import { IClaim } from "src/interfaces/claim";
import useUser from "./User";

const useClaim = (formData: FormData) => {
  const [claim, setClaim] = useState<IClaim | string | {}>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useUser();
  
  useEffect(() => {
    const addClaim = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.post<IClaim>(
          `http://localhost:8000/claims/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setClaim(response.data);
      } catch (err) {
        setError("Failed to create claim");
      } finally {
        setLoading(false);
      }
    };

    addClaim();
  }, []);

  return { claim, loading, error };
};

export default useClaim;
