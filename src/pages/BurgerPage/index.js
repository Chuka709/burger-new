import React, { Component } from "react";
import BuildControls from "../../components/BuildControls";
import Burger from "../../components/Burger";
import Modal from "../../components/General/Modal";
// import Spinner from "../../components/General/Spinner";
import OrderSummary from "../../components/OrderSummary";

class BurgerPage extends Component {
  state = {
    confirmOrder: false,
  };

  continueOrder = () => {
    this.props.history.push("/ship");
  };

  showConfirmModal = () => {
    this.setState({ confirmOrder: true });
  };
  closeConfirmModal = () => {
    this.setState({ confirmOrder: false });
  };

  render() {
    // console.log("hey", this.props);

    return (
      <div>
        <Modal
          show={this.state.confirmOrder}
          closeConfirmModal={this.closeConfirmModal}
        >
          {/* {this.state.loading ? (
            <Spinner />
          ) : ( */}
          <OrderSummary
            onCancel={this.closeConfirmModal}
            onContinue={this.continueOrder}
          />
          {/* )} */}
        </Modal>
        <Burger />
        <BuildControls showConfirmModal={this.showConfirmModal} />
      </div>
    );
  }
}

export default BurgerPage;
