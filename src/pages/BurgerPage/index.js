import React, { useState } from "react";
import BuildControls from "../../components/BuildControls";
import Burger from "../../components/Burger";
import Modal from "../../components/General/Modal";
// import Spinner from "../../components/General/Spinner";
import OrderSummary from "../../components/OrderSummary";

const BurgerPage = (props) => {
  const [confirmOrder, setConfirmOrder] = useState(false);

  const continueOrder = () => {
    props.history.push("/ship");
  };

  const showConfirmModal = () => {
    setConfirmOrder(true);
  };
  const closeConfirmModal = () => {
    setConfirmOrder(false);
  };

  return (
    <div>
      <Modal show={confirmOrder} closeConfirmModal={closeConfirmModal}>
        <OrderSummary onCancel={closeConfirmModal} onContinue={continueOrder} />
      </Modal>
      <Burger />
      <BuildControls showConfirmModal={showConfirmModal} />
    </div>
  );
};

export default BurgerPage;
