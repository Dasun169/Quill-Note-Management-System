import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./css-files/signIn.css";

interface LoginForm {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    name: string;
    email: string;
  };
}

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        console.log("Checking auth status...");
        const response = await axios.post(
          "http://localhost:5000/quill/verify",
          {},
          { withCredentials: true }
        );
        console.log("Auth check response:", response.data);
        if (response.data.status) {
          console.log("User authenticated, navigating to Home");
          navigate("/Home", {
            state: { email: response.data.user?.email || "" },
          });
        }
      } catch (error) {
        console.log("User not authenticated", error);
      }
    };
    checkAuthStatus();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleError = (err: string) => {
    toast.error(err, {
      position: "bottom-left",
    });
    setIsLoading(false);
  };

  const handleSuccess = (msg: string) => {
    toast.success(msg, {
      position: "bottom-right",
    });
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!inputValue.email || !inputValue.password) {
      handleError("All fields are required");
      return;
    }

    try {
      const { data } = await axios.post<AuthResponse>(
        "http://localhost:5000/quill/login",
        {
          ...inputValue,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        handleSuccess(data.message);
        navigate("/Home", { state: { email: inputValue.email } });
      } else {
        handleError(data.message || "Login failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(
          error.response?.data?.message || "An error occurred during login"
        );
      } else {
        handleError("An unexpected error occurred");
      }
      console.error("Login error:", error);
    } finally {
      setInputValue({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-form1">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={inputValue.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={inputValue.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="signin-button1" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="signup-link1">
          Don't have an account? <Link to="/SignUp">Sign up</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
