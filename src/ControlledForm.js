import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionCreators from "./store/actions";

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
