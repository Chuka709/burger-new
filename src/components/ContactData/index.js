import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "../General/Button";
import css from "./style.module.css";
import Spinner from "../General/Spinner";
import BurgerContext from "../../context/BurgerContext";
import UserContext from "../../context/UserContext";

const ContactData = (props) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");

  const burgerContext = useContext(BurgerContext);
  const userContext = useContext(UserContext);

  const dunRef = useRef();

  useEffect(() => {
    // console.log("contact data effect....");
    if (burgerContext.burger.finished && !burgerContext.burger.error) {
      history.replace("/orders");
    }
    return () => {
      //tseverlegch function - zahialgiig hoosolj daraagiin zahialgad beldene
      // console.log("order clearing........");
      burgerContext.clearBurger();
    };
  }, [burgerContext.burger.finished]);

  const changeName = (e) => {
    if (dunRef.current.style.color === "red")
      dunRef.current.style.color = "green";
    else dunRef.current.style.color = "red";
    setName(e.target.value);
  };
  const changeStreet = (e) => {
    setStreet(e.target.value);
  };
  const changeCity = (e) => {
    setCity(e.target.value);
  };

  const saveOrder = () => {
    const newOrder = {
      userId: userContext.state.userId,
      orts: burgerContext.burger.ingredients,
      dun: burgerContext.burger.totalPrice,
      hayag: {
        name,
        city,
        street,
      },
    };
    burgerContext.saveBurger(newOrder, userContext.state.token);
  };
  // console.log(props);
  return (
    <div className={css.ContactData}>
      <div>
        {burgerContext.burger.error &&
          `Захиалгыг хадгалах явцад алдаа гарлаа : ${burgerContext.burger.error}`}
      </div>
      {burgerContext.burger.saving ? (
        <Spinner />
      ) : (
        <div>
          <div ref={dunRef}>
            <strong style={{ fontSize: "16px" }}>
              <p>Захиалгын дүн : {burgerContext.burger.totalPrice}₮</p>
            </strong>
          </div>
          <input
            onChange={changeName}
            type="text"
            name="name"
            placeholder="Таны нэр"
          />
          <input
            onChange={changeStreet}
            type="text"
            name="street"
            placeholder="Гэрийн хаяг"
          />
          <input
            onChange={changeCity}
            type="text"
            name="city"
            placeholder="Хот"
          />
          <Button text="ИЛГЭЭХ" btnType="Success" clicked={saveOrder} />
        </div>
      )}
    </div>
  );
};

export default ContactData;
