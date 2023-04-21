import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import { auth } from "../firebase";
import "./Login.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-hot-toast";

const Login = () => {
  const [signUp, setSignUp] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const dispatch = useDispatch();

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
      .then((userCredential) => {
        console.log(userCredential);
        dispatch(setUser({ email: userCredential.user.email }));
      })
      .then(() => toast.success("Welcome!"))
      .catch(() => toast.error("Something went wrong! Try again"));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        dispatch(setUser({ email: userCredential.user.email }));
      })
      .then(() => toast.success("Successfully logged in"))
      .catch(() => toast.error("Something went wrong! Try again"));
  };

  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img
          className="loginScreen__logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="banner"
        />
        <button
          onClick={() => setSignUp(!signUp)}
          className="loginScreen__button"
        >
          {signUp ? "Login" : "Sign up"}
        </button>

        <div className="loginScreen__gradient">
          {signUp ? (
            <div className="">
              <h2 className="loginScreen__login">Sign up</h2>
              <form
                onSubmit={handleSignUp}
                className="loginScreen__form"
                action=""
              >
                <input
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  value={signUpEmail}
                  className="loginScreen__input"
                  type="text"
                  placeholder="Email..."
                />
                <input
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  value={signUpPassword}
                  className="loginScreen__input"
                  type="password"
                  placeholder="Password..."
                />
                <button type="submit" className="loginScreen__formButton">
                  Sign up
                </button>
              </form>

              <div className="loginScreen__have-an-account">
                <p>
                  Already have an account?{" "}
                  <span
                    onClick={() => setSignUp(false)}
                    className="loginScreen__sign-up"
                  >
                    login
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div className="">
              <h2 className="loginScreen__login">Login</h2>
              <form
                onSubmit={handleLogin}
                className="loginScreen__form"
                action=""
              >
                <input
                  onChange={(e) => setLoginEmail(e.target.value)}
                  value={loginEmail}
                  className="loginScreen__input"
                  type="text"
                  placeholder="Email..."
                />
                <input
                  onChange={(e) => setLoginPassword(e.target.value)}
                  value={loginPassword}
                  className="loginScreen__input"
                  type="password"
                  placeholder="Password..."
                />
                <button type="submit" className="loginScreen__formButton">
                  Login
                </button>
              </form>

              <div className="loginScreen__have-an-account">
                <p>
                  New to netflix?{" "}
                  <span
                    onClick={() => setSignUp(true)}
                    className="loginScreen__sign-up"
                  >
                    Sign up!
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
