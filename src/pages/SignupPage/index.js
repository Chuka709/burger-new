import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import css from "./style.module.css";
import Button from "../../components/General/Button";
import Spinner from "../../components/General/Spinner";
import UserContext from "../../context/UserContext";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const userContext = useContext(UserContext);

  // useEffect(()=>{},[email])
  const signup = () => {
    if (password === confirmPassword) {
      userContext.signupUser(email, password);
    } else {
      setError("Нууц үгнүүд хоорондоо таарахгүй байна.");
    }
  };
  return (
    <div className={css.Signup}>
      {userContext.state.userId && <Redirect to="/" />}
      <h1>Бүртгэлийн цонх</h1>
      <div>Та өөрийн мэдээллээ оруулна уу</div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Цахим шуудан"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Нууц үг"
      />
      <input
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
        placeholder="Нууц үг баталгаажуулах"
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      {userContext.state.error && (
        <div style={{ color: "red" }}>{userContext.state.error}</div>
      )}
      {userContext.state.saving && <Spinner />}
      <Button text="БҮРТГҮҮЛЭХ" clicked={signup} btnType="Success" />
    </div>
  );
};

export default Signup;
