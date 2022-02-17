import { useState, useCallback } from "react";
const useHttp = () => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsloading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? requestConfig.body : null,
      });
      if (response.ok) {
      } else {
        setIsloading(false);
        return response.json().then((data) => {
          let errorMessage = "Failed!";
          if (data.error.message) {
            errorMessage = data.error.message;
          }
          setError(errorMessage);
        });
      }
      const data = await response.json();
      applyData(data);
    } catch (error) {
      setError(error.message);
    }
    setIsloading(false);
  }, []);
  return {
    isLoading,
    error,
    sendRequest,
  };
};
export default useHttp;
