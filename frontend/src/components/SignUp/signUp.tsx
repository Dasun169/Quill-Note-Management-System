import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
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

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
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

    // Validate inputs
    if (inputValue.password !== inputValue.confirmPassword) {
      handleError("Passwords do not match");
      return;
    }

    if (!inputValue.name || !inputValue.email || !inputValue.password) {
      handleError("All fields are required");
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
          navigate("/Home");
        }, 3000);
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
      <div className="signup-form2">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group2">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={inputValue.name}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="form-group2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={inputValue.email}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="form-group2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={inputValue.password}
              onChange={handleOnChange}
              required
              minLength={6}
            />
          </div>
          <div className="form-group2">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={inputValue.confirmPassword}
              onChange={handleOnChange}
              required
              minLength={6}
            />
          </div>
          <button type="submit" className="signup-button2" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        <div className="login-link2">
          Already have an account? <Link to="/">Sign In</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
