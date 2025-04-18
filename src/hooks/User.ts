import { useState, useEffect } from "react";
import axios from "axios";

const useUser = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('access_token');

    useEffect(() => {
      const fetchUser = async () => {
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
          setError("Failed to fetch user.");
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }, []);
  
    return { user, loading, error };
  };
  
export default useUser;
