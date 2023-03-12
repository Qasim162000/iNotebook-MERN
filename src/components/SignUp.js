import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    //API Call
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/login");
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            name="name"
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength={3}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            name="cpassword"
            type="password"
            className="form-control"
            id="cpassword"
            onChange={onChange}
            required
            minLength={5}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
