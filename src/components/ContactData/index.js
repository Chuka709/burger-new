import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../General/Button";
import css from "./style.module.css";
import axios from "../../axios-orders";
import Spinner from "../General/Spinner";
import { withRouter } from "react-router-dom";
import * as action from "../../redux/actions/orderActions";

class ContactData extends Component {
  state = {
    name: null,
    city: null,
    street: null,
  };
  changeName = (e) => {
    this.setState({ name: e.target.value });
  };
  changeStreet = (e) => {
    this.setState({ street: e.target.value });
  };
  changeCity = (e) => {
    this.setState({ city: e.target.value });
  };
  componentDidUpdate() {
    if (
      this.props.newOrderStatus.finished &&
      !this.props.newOrderStatus.error
    ) {
      this.props.history.replace("/orders");
    }
  }
  saveOrder = () => {
    const newOrder = {
      userId: this.props.userId,
      orts: this.props.ingredients,
      dun: this.props.price,
      hayag: {
        name: this.state.name,
        city: this.state.city,
        street: this.state.street,
      },
    };
    this.props.saveOrderAction(newOrder);
  };
  render() {
    // console.log(this.props);
    return (
      <div className={css.ContactData}>
        <div>
          {this.props.newOrderStatus.error &&
            `Захиалгыг хадгалах явцад алдаа гарлаа : ${this.props.newOrderStatus.error}`}
        </div>
        {this.props.newOrderStatus.saving ? (
          <Spinner />
        ) : (
          <div>
            <p>Захиалгын дүн : {this.props.price}₮</p>
            <input
              onChange={this.changeName}
              type="text"
              name="name"
              placeholder="Таны нэр"
            />
            <input
              onChange={this.changeStreet}
              type="text"
              name="street"
              placeholder="Гэрийн хаяг"
            />
            <input
              onChange={this.changeCity}
              type="text"
              name="city"
              placeholder="Хот"
            />
            <Button text="ИЛГЭЭХ" btnType="Success" clicked={this.saveOrder} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    price: state.burgerReducer.totalPrice,
    ingredients: state.burgerReducer.ingredients,
    newOrderStatus: state.orderReducer.newOrder,
    userId: state.signupLoginReducer.userId,
  };
};

const mapsDispatchToProps = (dispatch) => {
  return {
    saveOrderAction: (newOrder) => dispatch(action.saveOrder(newOrder)),
  };
};
export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(withRouter(ContactData));
