import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import css from "./style.module.css";
import Button from "../../components/General/Button";
import Spinner from "../../components/General/Spinner";
import UserContext from "../../context/UserContext";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userContext = useContext(UserContext);

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const login = () => {
    userContext.loginUser(email, password);
  };
  return (
    <div className={css.Login}>
      {userContext.state.userId && <Redirect to="/orders" />}
      <input onChange={changeEmail} type="text" placeholder="Цахим шуудан" />
      <input onChange={changePassword} type="password" placeholder="Нууц үг" />
      {userContext.state.logginIn && <Spinner />}
      {userContext.state.error && (
        <div style={{ color: "red" }}>
          {userContext.state.error} алдааны код : {userContext.state.errorCode}
        </div>
      )}
      <Button text="НЭВТРЭХ" clicked={login} btnType="Success" />
    </div>
  );
};

export default Login;
