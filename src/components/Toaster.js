import React, { Component } from "react";

class Toaster extends Component {
  constructor() {
    super();
    this.state = {
      theme: {
        "SUCCESS" : "success",
        "SAVE FAILED": "failed",
      }
    }
  }

  render() {
    const theme = this.state.theme[this.props.overall];
    return (
      <div
        className={
          this.props.hidden ? "toasterContainer hidden" : "toasterContainer show"
        }
      >
        <div className={"toaster " + theme}>
          <h1>{this.props.overall}</h1>
          <p> {this.props.message}</p>
        </div>
      </div>
    );
  }
}
export default Toaster;
