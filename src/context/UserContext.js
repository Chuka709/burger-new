import React, { createContext, useId, useState } from "react";
import axios from "../axios-orders";

const UserContext = createContext();
const initialState = {
  saving: false,
  logginIn: false,
  error: null,
  errorCode: null,
  token: null,
  userId: null,
  expiresIn: null,
  refreshToken: null,
};
export const UserStore = (props) => {
  const [state, setState] = useState(initialState);

  const loginUserSuccess = (token, userId, refreshToken, expireDate) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("expireDate", expireDate);

    setState({
      ...state,
      logginIn: false,
      error: null,
      errorCode: null,
      token,
      userId,
      refreshToken,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expireDate");

    setState(initialState);
  };

  const autoRenewTokenAfterMillisec = (milliSec) => {
    axios
      .post(
        "https://securetoken.googleapis.com/v1/token?key=AIzaSyCpmoYbZ60pviPWqOSKgU8cB35Wrd9q_YQ",
        {
          grant_type: "refresh_token",
          refresh_token: localStorage.getItem("refreshToken"),
        }
      )
      .then((result) => {
        //localstorage hadgalah
        console.log("token refreshed...............", result.data);
        const token = result.data.id_token;
        const userId = result.data.user_id;
        const expiresIn = result.data.expires_in;
        const refreshToken = result.data.refresh_token;
        const expireDate = new Date(new Date().getTime() + expiresIn * 1000);

        loginUserSuccess(token, userId, refreshToken, expireDate);
      })
      .catch((error) => {
        setState({
          ...state,
          logginIn: false,
          error: error.message,
          errorCode: error.code,
          token: null,
          userId: null,
          expiresIn: null,
          refreshToken: null,
        });
      });

    setTimeout(() => {
      autoRenewTokenAfterMillisec(3600000);
    }, milliSec);
  };

  const loginUser = (email, password) => {
    setState({
      ...state,
      logginIn: true,
    });
    const data = { email, password, returnSecureToken: true };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCpmoYbZ60pviPWqOSKgU8cB35Wrd9q_YQ",
        data
      )
      .then((result) => {
        //localstorage hadgalah
        const token = result.data.idToken;
        const userId = result.data.localId;
        const expiresIn = result.data.expiresIn;
        const refreshToken = result.data.refreshToken;
        const expireDate = new Date(new Date().getTime() + expiresIn * 1000);

        loginUserSuccess(token, userId, refreshToken, expireDate);

        //dispatch(autoLogoutAfterMillisec(expiresIn * 1000));
      })
      .catch((error) => {
        setState({
          ...state,
          error: error.message,
          errorCode: error.code,
          token: null,
          userId: null,
          expiresIn: null,
          refreshToken: null,
        });
      });
  };

  const signupUser = (email, password) => {
    setState({
      ...state,
      saving: true,
    });
    const data = { email, password, returnSecureToken: true };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCpmoYbZ60pviPWqOSKgU8cB35Wrd9q_YQ",
        data
      )
      .then((result) => {
        //localstorage hadgalah
        const token = result.data.idToken;
        const userId = result.data.localId;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);

        setState({
          ...state,
          saving: false,
          token,
          userId,
          error: null,
          errorCode: null,
        });
      })
      .catch((error) =>
        setState({
          ...state,
          saving: false,
          token: null,
          userId: null,
          error: error.message,
          errorCode: error.code,
        })
      );
  };

  return (
    <UserContext.Provider
      value={{
        state,
        signupUser,
        loginUser,
        logout,
        loginUserSuccess,
        autoRenewTokenAfterMillisec,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
