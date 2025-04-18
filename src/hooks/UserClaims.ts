import { useState, useEffect } from "react";
import axios from "axios";
import { IClaim } from "src/interfaces/claim";

const useUserClaims = () => {
  const [userClaims, setUserClaims] = useState<IClaim[] | []>([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserClaims = async () => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      try {
        const claimResponse = await axios.get(
          `http://localhost:8000/claims/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setUserClaims(claimResponse.data);
      } catch (err) {
        setError("Failed to fetch user claims.");
      } finally {
        setLoading(false);
      }

      try {
        const userResponse = await axios.get(
          `http://localhost:8000/users/${username}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setUser(userResponse.data);
      } catch (err) {
        setError("Failed to fetch user user.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserClaims();
  }, []);

  return { user, userClaims, loading, error };
};

export default useUserClaims;
