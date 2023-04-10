import React, { Component } from "react";

class Event extends Component {

  handleDetailsClicked = () => {
    this.setState({
      eventDetails: true,
    })
  }

  render() {
    const { event } = this.props;
    return (
      <>
        <h2 className="event-title">{event?.summary}</h2>
        <div className="event-time-loc">
          <p>{event?.start.dateTime}</p>
          <p>{event?.location}</p>
        </div>
        <button
          className="show-details"
          onClick={() => this.handleDetailsClicked()}
        >Show Details</button>
      </>

    )
  }
}
export default Event;