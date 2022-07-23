import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./signup.css";
const Signup = () => {
  const [passwordHideShow, setPasswordHideShow] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onChangeNameHandler = (event) => {
    setName(event.target.value);
  };
  const onChangeEmailHandler = (event) => {
    setEmail(event.target.value);
  };
  const onChangePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  // const onSubmitHandler = (event)=>{
  //   event.preventDefault();
  //   const userData = {name, email, password}
  //   fetch('http://localhost:4000/register', {
  //     method: "POST",
  //     body: JSON.stringify(userData),
  //     headers:{
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(response => response.json())
  //   .then(data => console.log('data =>', data));
  // }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const userData = { name, email, password };
    let userDataSend = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    userDataSend = await userDataSend.json();
    console.log("post api data =>", userDataSend);

    let localDataStroge = localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );
    navigate("/");

    setEmail("");
    setName("");
    setPassword("");
  };

  const onClickPasswordHideShow = () => {
    setPasswordHideShow(!passwordHideShow);
  };

  useEffect(() => {
    const authorization = localStorage.getItem("user");
    if (authorization) {
      navigate("/");
    }
  });
  return (
    <div className="container signup">
      <h4>Sign Up Form</h4>
      <form action="" className="signupform" onSubmit={onSubmitHandler}>
        <div className="form-input">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={onChangeNameHandler}
            type="text"
            id="name"
            placeholder="Name"
          />
        </div>
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

export default Signup;
