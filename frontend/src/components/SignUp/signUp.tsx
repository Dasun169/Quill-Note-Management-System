import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css-files/signUp.css";

interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  user?: {
    name: string;
    email: string;
  };
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<SignUpForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Set video playback rate for smoother effect
  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
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

    // Validate inputs
    if (inputValue.password !== inputValue.confirmPassword) {
      handleError("Passwords do not match");
      return;
    }

    if (!inputValue.name || !inputValue.email || !inputValue.password) {
      handleError("All fields are required");
      return;
    }

    if (inputValue.password.length < 6) {
      handleError("Password must be at least 6 characters");
      return;
    }

    try {
      const { data } = await axios.post<ApiResponse>(
        "http://localhost:5000/quill/signup",
        {
          name: inputValue.name,
          email: inputValue.email,
          password: inputValue.password,
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
        handleError(data.message || "Registration failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data?.message || "Registration error");
      } else {
        handleError("An unexpected error occurred");
      }
      console.error("Registration error:", error);
    } finally {
      setInputValue({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="signup-container">
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
            src="https://assets.mixkit.co/videos/preview/mixkit-woman-writing-on-a-notebook-3221-large.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="signup-card">
        <div className="signup-header">
          <h2>Create Your Account</h2>
          <p>Join our note-taking community</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={inputValue.name}
              onChange={handleOnChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={inputValue.email}
              onChange={handleOnChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={inputValue.password}
                onChange={handleOnChange}
                required
                minLength={6}
                placeholder="Create a password (min 6 chars)"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={inputValue.confirmPassword}
              onChange={handleOnChange}
              required
              minLength={6}
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className={`signup-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="signup-footer">
          <p>
            Already have an account?{" "}
            <Link to="/" className="login-link">
              Sign In
            </Link>
          </p>
          <p className="terms-text">
            By signing up, you agree to our{" "}
            <Link to="/terms" className="terms-link">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="terms-link">
              Privacy Policy
            </Link>
          </p>
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

export default SignUp;
