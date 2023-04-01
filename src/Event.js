import React, { Component } from "react";

class Event extends Component {

  handleDetailsClicked = () => {
    this.setState({
      eventDetails: true,
    })
  }

  render() {
    return (
      <>
        <h2 className="event-title">Summary</h2>
        <ul className="event-time-loc"></ul>
        <button
          className="show-details"
          onClick={() => this.handleDetailsClicked()}
        ></button>
      </>

    )
  }
}
export default Event;