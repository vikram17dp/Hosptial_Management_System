import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { isAuthenticated, setIsAutenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  // const [conformpassword, setConformPassword] = useState("");
  const navigatorTo = useNavigate();
  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4004/api/v1/user/login",
          {email,password,role:"Patient"},

          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAutenticated(true);
          navigatorTo('/')
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container form-component login-form">
        <h2>Sign In</h2>
        <p>Please Login To Continue</p>
        <p>
          Welcome back! Please log in to access your account and manage your
          appointments. If you don’t have an account yet, you can register
          quickly and start managing your healthcare needs with ease.
        </p>

        <form action="" onSubmit={handlelogin}>
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setpassword(e.target.value)}
          />
          {/* <input
            type="password"
            value={conformpassword}
            placeholder="conformpassword"
            onChange={(e) => setConformPassword(e.target.value)}
          /> */}
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Not Registered?</p>
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Register Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
