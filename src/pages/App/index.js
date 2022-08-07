import React, { useState, useEffect, Suspense, useContext } from "react";
import { Redirect } from "react-router-dom";
import css from "./style.module.css";
import Toolbar from "../../components/Toolbar";
import SideBar from "../../components/SideBar";

import ShippingPage from "../ShippingPage";
import LoginPage from "../LoginPage";
import Logout from "../../components/Logout";
import { Route, Switch } from "react-router-dom";

import { BurgerStore } from "../../context/BurgerContext";
import { OrderStore } from "../../context/OrdersContext";
import UserContext from "../../context/UserContext";

//lazy loading buyu shaardlagatai uyd ajillana. SUSPENSE ashiglana
const BurgerPage = React.lazy(() => {
  return import("../BurgerPage");
});
const OrderPage = React.lazy(() => {
  return import("../OrderPage");
});
const SignupPage = React.lazy(() => {
  return import("../SignupPage");
});
const App = (props) => {
  const [showSideBar, setShowSideBar] = useState(false);

  const userContext = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expireDate = new Date(localStorage.getItem("expireDate"));
    const refreshToken = localStorage.getItem("refreshToken");
    if (token) {
      if (expireDate > new Date()) {
        //hugatsaa duusaagui token, auto login hiine
        userContext.loginUserSuccess(token, userId, refreshToken, expireDate);
        //token bolohod uldej bga hugatsaag tootsoolj tuhain hugatsaanii daraa logout hiine, esvel token shinechlene
        userContext.autoRenewTokenAfterMillisec(
          expireDate.getTime() - new Date().getTime()
        );
        // userContext.autoLogoutAfterMillisec(
        //   expireDate.getTime() - new Date().getTime()
        // );
      } else {
        //token hugatsaa duussan logout hiine
        //userContext.logout();
        userContext.autoRenewTokenAfterMillisec(3600 * 1000);
      }
    }
  }, []);

  const toggleSideBar = () => {
    setShowSideBar((prevShowSidebar) => !prevShowSidebar);
  };

  return (
    <div>
      <Toolbar toggleSideBar={toggleSideBar} />
      <SideBar showSideBar={showSideBar} toggleSideBar={toggleSideBar} />
      <main className={css.Content}>
        <BurgerStore>
          <Suspense fallback={<div>waiting...</div>}>
            {userContext.state.userId ? (
              <Switch>
                <Route path="/orders">
                  <OrderStore>
                    <OrderPage />
                  </OrderStore>
                </Route>
                <Route path="/logout" component={Logout} />

                <Route path="/ship" component={ShippingPage} />
                <Route path="/" component={BurgerPage} />
              </Switch>
            ) : (
              <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignupPage} />
                <Redirect to="/login" />
              </Switch>
            )}
          </Suspense>
        </BurgerStore>
      </main>
    </div>
  );
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     autoLogin: (token, userId) =>
//       dispatch(actions.loginUserSuccess(token, userId)),
//     logout: () => dispatch(actions.logout()),
//     autoLogoutAfterMillisec: () => dispatch(actions.autoLogoutAfterMillisec()),
//   };
// };

export default App;
