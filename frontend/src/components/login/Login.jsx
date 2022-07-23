import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [passwordHideShow, setPasswordHideShow] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const authorization = localStorage.getItem("user");
    if (authorization) {
      navigate("/");
    }
  });
  


  const onChangeEmailHandler = (event) => {
    setEmail(event.target.value);
  };
  const onChangePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onClickPasswordHideShow = () => {
    setPasswordHideShow(!passwordHideShow);
  };

  const onSubmitHandler = async (event)=>{
    event.preventDefault();

    let result = await fetch("http://localhost:5000/login", {
      method : 'POST',
      body : JSON.stringify({email, password}),
      headers: {
        "Content-Type": "application/json",
      },
    })
    result = await result.json();
    if(result.name){ 
      localStorage.setItem(
      "user",
      JSON.stringify(result)    );
      navigate('/')
    }else{
      alert('Please select')
    }
    console.log(result);

  }
  


  return (
    <div className="container">
      <h1>Log In</h1>
      <form action="" onSubmit={onSubmitHandler}>
        <div className="form-input">
          <label htmlFor="email">email</label>
          <input
            value={email}
            onChange={onChangeEmailHandler}
            type="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="form-input hideshow">
          <label htmlFor="password">password</label>
          <input
            value={password}
            onChange={onChangePasswordHandler}
            type={passwordHideShow ? "password" : "text"}
            id="password"
            placeholder="Password"
          />
          <span className="icon" onClick={onClickPasswordHideShow}>
            <i
              className={
                passwordHideShow ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
              }
            ></i>
          </span>
        </div>

        <input type="submit" value="Signup" />
      </form>
    </div>
  );
};

export default Login;
