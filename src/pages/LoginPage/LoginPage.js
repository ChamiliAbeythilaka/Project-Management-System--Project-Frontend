import React, { useState } from "react";
import logo from "../../assets/logo.png";
import "./LoginPage.css";
import axios from "axios";



function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) =>{
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitClick = ()=>{
    axios
      .get(`https://localhost:7196/user?email=${email}&password=${password}`)
      .then((res) => {
        if (res.data) {
          alert("Sign In Succsefull,Hello Sachini");
        } else {
          alert("Sign In Error,Incorrect email or password");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }


  return (
    <>
      <div className="left-container">
        <img src={logo} alt="G3 Technologies" />
        <p className="title">Sign In</p>
        <div className="main-content">
          <p className="lable">Email</p>
          <input
            className="input"
            type="email"
            onChange={handleEmailChange}
            placeholder="Please Enter Your Email"
          />
          <p className="lable">Password</p>
          <input
            className="input"
            type="password"
            onChange={handlePasswordChange}
            placeholder="Please Enter Your Password"
          />
        </div>
        <button onClick={onSubmitClick}>Submit</button>
      </div>
      <div className="right-container">
        <div className="slogon">
          <p>Where</p>
          <p>Solutions</p>
          <p>Begin.</p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
