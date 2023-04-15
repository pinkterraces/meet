import React, { Component } from "react";

class Event extends Component {
  
  state = {
    eventDetails: false,
    buttonText: 'Show Details'
  }

/*   handleDetailsClicked = () => {
    this.setState(prevState => ({
      check: !prevState.check
    }));
  } */

  handleDetailsClicked = () => {
    
    if (this.state.eventDetails === false) {
      this.setState({
        eventDetails: true,
        buttonText: 'Hide Details'
      });
    } else {
      this.setState({
        eventDetails: false,
        buttonText: 'Show Details'
      });
    }
  };

  render() {
    const { event } = this.props;
    return (
      <>
        <h2 className="event-title">{event?.summary}</h2>
        <div className="event-time-loc">
          <p>{event?.start.dateTime}</p>
          <p>{event?.location}</p>
          <div style={(this.state.eventDetails === true) ? {} : { display: 'none' }}>
            <h3>About the event:</h3>
            <p><a href={event?.htmlLink} target="_blank" rel='noreferrer'>See event details on Google calendar</a></p>
            <p>{event?.description}</p>
          </div>
        </div>
        <button
          className="show-details"
          onClick={() => this.handleDetailsClicked()}
        >{this.state.buttonText}</button>
      </>

    )
  }
}
export default Event;