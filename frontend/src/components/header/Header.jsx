import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./header.css";
const Header = () => {
  const authorization = localStorage.getItem("user");
  const navigate = useNavigate();
  const logOutHandler = () => {
    console.log("working......");
    localStorage.clear();
    navigate("/");
  };
  return (
    <header>
      <div className="header">
        <div className="logo">
          <NavLink to="/">e commerce dashboard</NavLink>
        </div>
        <div className="navbar">
          {authorization ? (
            <ul>
              <li>
                <NavLink to="/"> Products </NavLink>
              </li>
              <li>
                <NavLink to="/add"> add Products </NavLink>{" "}
              </li>
              {/* <li>
                <NavLink to="/update"> update Products </NavLink>
              </li> */}

              <li>
                <NavLink to="/profile"> Profile </NavLink>
              </li>
              <li>
                <NavLink to="/signup" onClick={logOutHandler}>
                  Logout  (<span  className="username">{JSON.parse(authorization).name}</span>)
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <NavLink to="/signup"> signup </NavLink>
              </li>
              <li>
                <NavLink to="/login"> login </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
