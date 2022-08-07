import axios from "../../axios-orders";
export const loadOrders = (userId) => {
  return function (dispatch, getState) {
    // dispatch(loadOrdersStart());
    // const token = getState().signupLoginReducer.token;
    // // console.log("dddddddddddddddddddddd", userId);
    // axios
    //   .get(`orders.json?&auth=${token}&orderBy="userId"&equalTo="${userId}"`)
    //   .then((response) => {
    //     const loadedOrders = Object.entries(response.data).reverse();
    //     dispatch(loadOrdersSuccess(loadedOrders));
    //   })
    //   .catch((error) => dispatch(loadOrdersError(error)));
  };
};

export const loadOrdersStart = () => {
  return {
    type: "LOAD_ORDERS_START",
  };
};
export const loadOrdersSuccess = (loadedOrders) => {
  return {
    type: "LOAD_ORDERS_SUCCESS",
    orders: loadedOrders,
  };
};
export const loadOrdersError = (error) => {
  return {
    type: "LOAD_ORDERS_ERROR",
    error,
  };
};

export const clearOrder = () => {
  return {
    type: "CLEAR_ORDER",
  };
};

//ЗАХИАЛГА ХАДГАЛАХ ХЭСЭГ

// export const saveOrder = (newOrder) => {
//   return function (dispatch, getState) {
//     dispatch(saveOrdersStart());
//     const token = getState().signupLoginReducer.token;
//     axios
//       .post(`/orders.json?auth=${token}`, newOrder)
//       .then((response) => {
//         dispatch(saveOrdersSuccess());
//       })
//       .catch((error) => dispatch(saveOrdersError(error)));
//   };
// };

export const saveOrdersStart = () => {
  return {
    type: "SAVE_ORDERS_START",
  };
};
export const saveOrdersSuccess = (loadedOrders) => {
  return {
    type: "SAVE_ORDERS_SUCCESS",
  };
};
export const saveOrdersError = (error) => {
  return {
    type: "SAVE_ORDERS_ERROR",
    error,
  };
};
