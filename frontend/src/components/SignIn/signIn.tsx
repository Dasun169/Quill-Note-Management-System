import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/quill/verify",
          {},
          { withCredentials: true }
        );
        if (response.data.status) {
          navigate("/Home", {
            state: { email: response.data.user?.email || "" },
          });
        }
      } catch (error) {
        console.log("User not authenticated", error);
      }
    };
    checkAuthStatus();

    // Set video playback rate for smoother effect
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
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
      position: "top-center",
      className: "toast-error",
    });
    setIsLoading(false);
  };

  const handleSuccess = (msg: string) => {
    toast.success(msg, {
      position: "top-center",
      className: "toast-success",
    });
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

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
        setTimeout(() => {
          navigate("/Home", { state: { email: inputValue.email } });
        }, 1500);
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
      {/* Video background */}
      <div className="video-background">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="video-bg"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-notebook-with-a-blue-cover-and-pencil-11747-large.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="signin-card">
        <div className="signin-header">
          <h2>Welcome Back</h2>
          <p>Sign in to access your notes</p>
        </div>

        <form onSubmit={handleSubmit} className="signin-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={inputValue.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={inputValue.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className={`signin-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="signin-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/SignUp" className="signup-link">
              Sign up
            </Link>
          </p>
          <Link to="/forgot-password" className="forgot-password">
            Forgot password?
          </Link>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default SignIn;
