import React, { Component } from "react";

import { connect } from "react-redux";
import {} from "./redux/actions";

class ControlledForm extends Component {
  render() {
    return <div></div>;
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlledForm);
