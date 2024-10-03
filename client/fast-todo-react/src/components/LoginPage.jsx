import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null); // State to manage error messages

  const handleSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;

    try {
      // Send the Google token to your backend for verification and to create a session
      const response = await axios.post(
        "https://tadaa-react-fastapi.onrender.com/auth/google/",
        { token: credential }
      );

      // Store the user data in local storage or context
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token); // Store the token

      // Redirect to the user's account page
      navigate("/account");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please try again."); // Set error message
    }
  };

  const handleError = () => {
    console.error("Login failed");
    setError("Login failed. Please try again."); // Set error message
  };

  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <h1 className="text-6xl mb-4">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
      {/* Display error message */}
      <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </GoogleOAuthProvider>
    </div>
  );
};

export default LoginPage;
