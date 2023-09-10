import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../styles/Button";
import "../App.css";

const host = "http://localhost:3001";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    const { name, email, mobile, password } = credentials;
    e.preventDefault();
    // API Call
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        mobile,
        password,
      }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      props.showAlert("Account Created Successfully", "success");
      navigate("/");
    } else {
      console.log("success = ", json.success);
      props.showAlert("Invalid Details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ "padding": "4rem 0 4rem 0", "textAlign": "center" }} >
      <h2 className="App textStyle" >Create an account to use Rudraksha Store</h2>
      <div style={{ "marginTop": "5rem" }}>
        <form className="formStyle" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            name="name"
            placeholder="Enter Your Name"
            onChange={onChange}
            id="name"
            style={{ textTransform: "none", "width": "100%" }}
            aria-describedby="nameHelp"
          />
          <input
            type="email"
            required
            name="email"
            placeholder="Enter Your Email Address"
            onChange={onChange}
            style={{ textTransform: "none", "width": "100%" }}
            id="email"
            aria-describedby="emailHelp"
          />
          <input
            type="mobile"
            required
            name="mobile"
            placeholder="Enter Your Mobile Number (only 10 digits required)"
            onChange={onChange}
            maxLength={10}
            id="mobile"
            style={{ textTransform: "none", "width": "100%" }}
            aria-describedby="mobileHelp"
          />
          <input
            type="password"
            required
            minLength={5}
            name="password"
            placeholder="Enter Your Password"
            onChange={onChange}
            style={{ textTransform: "none", "width": "100%" }}
            id="password"
          />
          <input
            type="password"
            required
            minLength={5}
            name="cpassword"
            placeholder="Confirm Password"
            onChange={onChange}
            style={{ textTransform: "none", "width": "100%" }}
            id="cpassword"
          />
          <input
            type="submit"
            className="contactInputs"
            value="SIGNUP"
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;
