import React, { useEffect, useRef, useState } from "react";
import {
  LogIn,
  Mail,
  Lock,
  Loader2,
  Utensils,
  AlertTriangle,
  CheckCircle,
  UserPlus,
  User,
  Phone,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { homeSliceAction } from "../Home/homeSlice";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const [mode, setMode] = useState("login");
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleSubmitAuth = async (e) => {
    e.preventDefault();
    if (isProcessing) return;

    if (!emailRef.current.value.trim() || !passwordRef.current.value.trim()) {
      setMessage("Please enter both email and password.");
      return;
    }

    if (mode === "signup") {
      if (
        nameRef.current.value.trim() == "" ||
        phoneRef.current.value.trim() == "" ||
        phoneRef.current.value.length != 10
      ) {
        setMessage(
          "Please provide your Full Name and Phone Number to register."
        );
        return;
      }
      if (passwordRef.current.value.length < 6) {
        setMessage("Password must be at least 6 characters long.");
        return;
      }
    }

    setIsProcessing(true);
    setMessage("");

    if (mode === "login") {
      const res = await axios.post("http://localhost:3000/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
        if(res.data.status) {
          localStorage.setItem("token",res.data.token);
          dispatch(homeSliceAction.setAuthenticated(true));
          dispatch(homeSliceAction.setRepaint());
          navigate("/profile");
      }
      setIsProcessing(false);
      emailRef.current.value = "";
      passwordRef.current.value = "";
      setMessage(res.data.msg);
    } else {
      const form = {
        name: nameRef.current.value,
        phone: phoneRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      const res = await axios.post("http://localhost:3000/signup", form);
      setIsProcessing(false);

      setMessage(res.data.msg);
      emailRef.current.value = "";
      passwordRef.current.value = "";
      nameRef.current.value = "";
      phoneRef.current.value = "";
      setMode("login");
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    emailRef.current.value = "";
    passwordRef.current.value = "";
    setMessage("");
  };

  const getHeaderTitle = () =>
    mode === "login" ? "Welcome Back" : "Create Account";
  const getHeaderSubtitle = () =>
    mode === "login"
      ? "Sign in to manage your pledges"
      : "Join us and share your contact details for coordination";
  const getButtonText = () => {
    if (isProcessing)
      return mode === "login" ? "Signing In..." : "Registering...";
    return mode === "login" ? "Sign In" : "Sign Up";
  };
  const getIcon = () =>
    mode === "login" ? (
      <LogIn className="mr-2 size-5" />
    ) : (
      <UserPlus className="mr-2 size-5" />
    );
  const getToggleText = () =>
    mode === "login"
      ? "Don't have an account? Sign Up"
      : "Already have an account? Sign In";

  const isSuccess = message.startsWith("Success");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-gray-100">
        <div className="text-center mb-8">
          <Utensils className="size-10 text-emerald-600 mx-auto mb-2" />
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {getHeaderTitle()}
          </h1>
          <p className="mt-1 text-gray-500 text-sm">{getHeaderSubtitle()}</p>
        </div>

        <form onSubmit={handleSubmitAuth} className="space-y-4">
          {mode === "signup" && (
            <>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Full Name (Required)"
                  ref={nameRef}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
                />
                <User className="size-5 text-gray-500 pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>

              <div className="relative">
                <input
                  type="tel"
                  placeholder="Phone Number (Required for logistics)"
                  ref={phoneRef}
                  required
                  pattern="[0-9]{10}"
                  minLength={10}
                  maxLength={10}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
                />
                <Phone className="size-5 text-gray-500 pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </>
          )}

          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              autoComplete="username"
              ref={emailRef}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
            />
            <Mail className="size-5 text-gray-500 pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              ref={passwordRef}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
            />
            <Lock className="size-5 text-gray-500 pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>

          {mode === "login" && (
            <div className="text-right">
              <a
                href="#"
                className="text-sm font-medium text-emerald-600 hover:text-emerald-800"
              >
                Forgot Password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className={`
                            w-full flex items-center justify-center px-6 py-3 border border-transparent text-lg
                            font-extrabold rounded-xl shadow-lg transition-all duration-300
                            transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-offset-2
                            ${
                              isProcessing
                                ? "bg-gray-400 text-gray-100 cursor-not-allowed"
                                : "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500" 
                            }
                        `}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Loader2 className="mr-2 size-5 animate-spin" />
            ) : (
              getIcon()
            )}
            {getButtonText()}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={toggleMode}
              className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors duration-200"
            >
              {getToggleText()}
            </button>
          </div>
        </form>

        {message && (
          <div
            className={`
                            mt-6 p-4 rounded-xl shadow-inner flex items-center transition-opacity duration-300
                            ${
                              isSuccess
                                ? "bg-emerald-100 text-emerald-800" 
                                : "bg-lime-100 text-lime-800" 
                            }
                        `}
          >
            {isSuccess ? (
              <CheckCircle className="size-5 mr-3" />
            ) : (
              <AlertTriangle className="size-5 mr-3" />
            )}
            <p className="text-sm font-medium">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
