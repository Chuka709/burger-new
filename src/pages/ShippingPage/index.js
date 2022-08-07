import React, { useContext } from "react";
import { Route } from "react-router-dom";
import Burger from "../../components/Burger";
import ContactData from "../../components/ContactData";
import Button from "../../components/General/Button";
import css from "./style.module.css";
import BurgerContext from "../../context/BurgerContext";

const ShippingPage = (props) => {
  const burgerContext = useContext(BurgerContext);
  const cancelOrder = () => {
    props.history.goBack();
  };
  const showContactData = () => {
    props.history.replace("/ship/contact");
  };
  return (
    <div className={css.ShippingPage}>
      <p style={{ fontSize: "24px" }}>
        <strong>Таны захиалга : {burgerContext.burger.totalPrice}₮</strong>
      </p>
      <Burger />
      <Button clicked={cancelOrder} btnType="Danger" text="ЗАХИАЛГА ЦУЦЛАХ" />
      <Button
        clicked={showContactData}
        btnType="Success"
        text="ХҮРГЭЛТИЙН МЭДЭЭЛЭЛ ОРУУЛАХ"
      />
      <Route path="/ship/contact">
        <ContactData />
      </Route>
      {/* <Route
          path="/ship/contact"
          render={() => (
            <ContactData
              ingredients={state.ingredients}
              price={state.price}
            />
          )}
        /> */}
    </div>
  );
};
export default ShippingPage;
