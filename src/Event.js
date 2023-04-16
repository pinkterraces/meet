import React, { Component } from "react";
import { WarningAlert } from "./Alert";

class Event extends Component {
  
  state = {
    eventDetails: false,
    buttonText: 'Show Details',
    infoText: ''
  }

  handleDetailsClicked = () => {
    const { event } = this.props;
    let eventDate = event.start.dateTime;
    let todaysDate = new Date();
    
    if (this.state.eventDetails === false && todaysDate.toISOString().split('T')[0] > eventDate.split('T')[0]) {
        this.setState({
          eventDetails: true,
          buttonText: 'Hide Details',
          infoText: 'Please note that this event is in the past!'
        });
      } else if (this.state.eventDetails === false) {
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
    //const { eventDate } = event.start.dateTime;
    return (
      <>
        <h2 className="event-title">{event?.summary}</h2>
        <div className="event-time-loc">
          <p>{event?.start.dateTime}</p>
          <p>{event?.location}</p>
          <div className="eventDetails" style={(this.state.eventDetails === false) ? { display: 'none' } : {} }>
            <h3>About the event:</h3>
            <p><a href={event?.htmlLink} target="_blank" rel='noreferrer'>See event details on Google calendar</a></p>
            <p>{event?.description}</p>
            <WarningAlert
              text={this.state.infoText} 
            />
          </div>
        </div>
        <button
          className="show-details-btn"
          onClick={() => this.handleDetailsClicked()}
        >{this.state.buttonText}</button>
      </>

    )
  }
}
export default Event;