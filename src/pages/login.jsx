import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userAuth, userLogin } from "../redux/slices/userSlice";

const Login = () => {
  const [error, setError] = useState();

  const auth = useSelector((state) => state.user.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = () => {
    var data = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    dispatch(
      userLogin(
        data,
        () => {
          navigate("/dashboard");
        },
        (message) => {
          setError(message);
        }
      )
    );
  };

  useEffect(() => {
    if (auth) {
        console.log(auth);
      navigate("/dashboard");
    }
  }, [auth]);

  return (
    <div
      className="container-fluid min-vh-100 p-2 d-flex"
      style={{ backgroundColor: "#eee" }}
    >
      <div class="card col-12 col-sm-8 col-md-6 col-xl-4 rounded rounded-4 text-center m-auto">
        <div class="card-header">
          <p className="card-title display-6 fw-normal py-3">Log in</p>
        </div>
        <div class="card-body px-4">
          <div class="card-text text-start">
            <div class="mb-3">
              <label class="form-label">Email address</label>
              <input
                id="email"
                type="email"
                class="form-control"
                placeholder="Enter your email"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input
                id="password"
                type="password"
                class="form-control"
                placeholder="Enter your password"
              />
            </div>
            {error && (
              <div class="mb-3 text-center border border-2 rounded rounded-2 border-danger">
                <label class="form-label mx-3 my-1 text-danger">{error}</label>
              </div>
            )}
            <div class="mt-4 mb-2 text-center">
              <button className="btn btn-warning" onClick={login}>
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
