import React, { useContext } from "react";
import BurgerContext from "../../context/BurgerContext";

import Button from "../General/Button";

const OrderSummary = (props) => {
  const burgerContext = useContext(BurgerContext);
  return (
    <div>
      <h3>Таны захиалга</h3>
      <p>Таны сонгосон орц: </p>
      <ul>
        {Object.keys(burgerContext.burger.ingredients).map((el) => (
          <li key={el}>
            {burgerContext.burger.ingredientNames[el]} :{" "}
            {burgerContext.burger.ingredients[el]}
          </li>
        ))}
      </ul>
      <p>
        <strong>Захиалгын дүн : {burgerContext.burger.totalPrice}₮</strong>
      </p>
      <p>Цааш үргэлжлүүлэх үү?</p>
      <Button clicked={props.onCancel} text="ТАТГАЛЗАХ" btnType="Danger" />
      <Button
        clicked={props.onContinue}
        text="ҮРГЭЛЖЛҮҮЛЭХ"
        btnType="Success"
      />
    </div>
  );
};

export default OrderSummary;
