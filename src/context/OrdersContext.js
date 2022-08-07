import React, { useState, createContext } from "react";
import axios from "../axios-orders";

const OrderContext = createContext();

export const OrderStore = (props) => {
  const initialState = {
    orders: [],
    loading: false,
    error: null,
  };

  const [state, setState] = useState(initialState);

  const loadOrders = (userId, token) => {
    setState({
      ...state,
      loading: true,
    });

    axios
      .get(`orders.json?&auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then((response) => {
        const loadedOrders = Object.entries(response.data).reverse();
        setState({
          ...state,
          orders: loadedOrders,
        });
      })
      .catch((error) =>
        setState({
          ...state,
          error,
        })
      );
  };

  return (
    <OrderContext.Provider value={{ state, loadOrders }}>
      {props.children}
    </OrderContext.Provider>
  );
};
export default OrderContext;
