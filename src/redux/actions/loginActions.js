import axios from "../../axios-orders";
export const loginUser = (email, password) => {
  return function (dispatch) {
    dispatch(loginUserStart());
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
        const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
        const refreshToken = result.data.refreshToken;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("expireDate", expireDate);
        dispatch(loginUserSuccess(token, userId));
        dispatch(autoLogoutAfterMillisec(expiresIn * 1000));
      })
      .catch((error) => dispatch(loginUserError(error)));
  };
};
export const loginUserStart = () => {
  return {
    type: "LOGIN_USER_START",
  };
};
export const loginUserSuccess = (token, userId) => {
  return {
    type: "LOGIN_USER_SUCCESS",
    token,
    userId,
  };
};
export const loginUserError = (error) => {
  return {
    type: "LOGIN_USER_ERROR",
    error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("expireDate");
  return {
    type: "LOGOUT",
  };
};
export const autoLogoutAfterMillisec = (ms) => {
  return function (dispatch) {
    setTimeout(() => {
      dispatch(logout());
    }, ms);
  };
};

//logout hiihgui token shinechleh bol
// axios
//   .post(
//     "https://securetoken.googleapis.com/v1/token?key=AIzaSyCpmoYbZ60pviPWqOSKgU8cB35Wrd9q_YQ",
//     {
//       grant_type: "refresh_token",
//       refresh_token: localStorage.getItem("refreshToken"),
//     }
//   )
//   .then((result) => {
//     //localstorage hadgalah
//     const token = result.data.id_token;
//     const userId = result.data.user_id;
//     const expiresIn = result.data.expires_nn;
//     const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
//     const refreshToken = result.data.refresh_token;
//     localStorage.setItem("token", token);
//     localStorage.setItem("userId", userId);
//     localStorage.setItem("refreshToken", refreshToken);
//     localStorage.setItem("expireDate", expireDate);
//     dispatch(loginUserSuccess(token, userId));
//     dispatch(autoLogoutAfterMillisec(expiresIn * 1000));
//   })
//   .catch((error) => dispatch(loginUserError(error)));
