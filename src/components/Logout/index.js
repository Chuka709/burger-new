import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Logout = (props) => {
  const userContext = useContext(UserContext);
  useEffect(() => {
    userContext.logout();
  }, []);

  return <Redirect to="/" />;
};

export default Logout;
