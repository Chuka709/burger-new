import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import css from "./style.module.css";
import Button from "../../components/General/Button";
import * as actions from "../../redux/actions/signupActions";
import Spinner from "../../components/General/Spinner";
class Signup extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    error: null,
  };
  changeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  changePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  changeConfirmPassword = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };
  signup = () => {
    if (this.state.password === this.state.confirmPassword) {
      this.props.signupUser(this.state.email, this.state.password);
    } else {
      this.setState({ error: "Нууц үгнүүд хоорондоо таарахгүй байна." });
    }
  };
  render() {
    return (
      <div className={css.Signup}>
        {this.props.userId && <Redirect to="/" />}
        <h1>Бүртгэлийн цонх</h1>
        <div>Та өөрийн мэдээллээ оруулна уу</div>
        <input
          onChange={this.changeEmail}
          type="text"
          placeholder="Цахим шуудан"
        />
        <input
          onChange={this.changePassword}
          type="password"
          placeholder="Нууц үг"
        />
        <input
          onChange={this.changeConfirmPassword}
          type="password"
          placeholder="Нууц үг баталгаажуулах"
        />
        {this.state.error && (
          <div style={{ color: "red" }}>{this.state.error}</div>
        )}
        {this.props.firebaseError && (
          <div style={{ color: "red" }}>{this.props.firebaseError}</div>
        )}
        {this.props.saving && <Spinner />}
        <Button text="БҮРТГҮҮЛЭХ" clicked={this.signup} btnType="Success" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    saving: state.signupLoginReducer.saving,
    firebaseError: state.signupLoginReducer.firebaseError,
    userId: state.signupLoginReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signupUser: (email, password) =>
      dispatch(actions.signupUser(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
