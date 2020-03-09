import React, { Component } from "react";

class Toaster extends Component {

  render() {
    return (
      <div
        className={
          this.props.hidden ? "toasterContainer hidden" : "toasterContainer show"
        }
      >
        <div className={"toaster " + this.props.color}>
          <h1>{this.props.overall}</h1>
          <p> {this.props.message}</p>
        </div>
      </div>
    );
  }
}
export default Toaster;
