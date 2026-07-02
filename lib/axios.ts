import axios from "axios";

// Centralized Axios instance
const axiosInstance = axios.create({
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Outbound request interceptor (e.g. for logging or adding session variables)
axiosInstance.interceptors.request.use(
  (config) => {
    // If we need client-side custom headers or analytics tracking, inject here
    return config;
  },
  (error) => {
    console.error("[Axios Request Error]:", error);
    return Promise.reject(error);
  }
);

// Inbound response interceptor (error handling unified across queries)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Standardize error formats for TanStack Query and try-catches
    let message = "Une erreur réseau est survenue. Veuillez réessayer.";
    
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error(
        `[Axios Server Error] Status ${error.response.status}:`,
        error.response.data
      );
      message = error.response.data?.message || `Erreur serveur (${error.response.status})`;
    } else if (error.request) {
      // The request was made but no response was received
      console.error("[Axios Network Error] No response received:", error.request);
      message = "Impossible de contacter le serveur. Vérifiez votre connexion internet.";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("[Axios Configuration Error]:", error.message);
      message = error.message;
    }
    
    // Attach user-friendly translated text onto error metadata for toasts
    const customError = new Error(message);
    (customError as Error & { originalError?: unknown; status?: number }).originalError = error;
    (customError as Error & { originalError?: unknown; status?: number }).status = error.response?.status;
    
    return Promise.reject(customError);
  }
);

export default axiosInstance;
