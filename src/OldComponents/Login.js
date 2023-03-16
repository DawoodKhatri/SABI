import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [State, setState] = useState("Initial");
  const navigate = useNavigate();
  var api = process.env.REACT_APP_SERVER;
  // var api = "http://localhost:4040";
  const verify = () => {
    var data = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    };
    var query = `/?email=${data["email"]}&password=${data["password"]}`;
    fetch(api + "/login" + query).then((response) => {
      response.json().then((result) => {
        if (result["result"] === "success") {
          console.log(result);
          props.update(result["userData"]);
          navigate("/dashboard");
        } else {
          setState("Error");
        }
      });
    });
  };

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
            {State === "Error" && (
              <div class="mb-3 text-center border border-2 rounded rounded-2 border-danger">
                <label class="form-label mx-3 my-1 text-danger">
                  Incorrect Email or Password
                </label>
              </div>
            )}
            <div class="mt-4 mb-2 text-center">
              <button className="btn btn-warning" onClick={verify}>
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
