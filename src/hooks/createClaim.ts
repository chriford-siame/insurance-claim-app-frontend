import { useState, useEffect } from "react";
import axios from "axios";
import { IClaim } from "src/interfaces/claim";
import useUser from "./User";

const useAddClaim = (
  formData: Omit<IClaim, 'id' | 'date_issued'>,
  claimFiles: any[],
  formIsValid: boolean
) => {
  const [cleanedFiles, setCleanedFiles] = useState<any[]>([]);
  const [claim, setClaim] = useState<IClaim>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useUser();

  useEffect(() => {
    if (!formIsValid || !claimFiles) return;

    const token = localStorage.getItem('access_token');

    const submitClaim = async () => {
      setLoading(true);
      const form = new FormData();
      console.log(formData)

      form.append("user", user);
      form.append("first_name", formData.first_name);
      form.append("middle_name", formData.middle_name);
      form.append("last_name", formData.last_name);
      form.append("claim_type", formData.claim_type);
      form.append("nrc", formData.nrc);
      form.append("incident", formData.incident);
      form.append("phone_number", formData.phone_number);
      form.append("status", formData.status);

      for (let i = 0; i < claimFiles.length; i++) {
        form.append("files", claimFiles[i]);
        setCleanedFiles([...cleanedFiles, claimFiles[i]])
        
      }

      try {
        const response = await axios.post(
          "http://localhost:8000/claims/",
          {
            ...formData,
            files: cleanedFiles
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        
        setClaim(response.data);
        window.location.href = "/";
      } catch (err) {
        setError("Failed to submit claim");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    submitClaim();
  }, [formIsValid]);

  return { claim, loading, error };
};
export default useAddClaim;