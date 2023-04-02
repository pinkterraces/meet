import React, { Component } from 'react';

class NumberOfEvents extends Component {

  state = {
    eventCount: 32
  }

  handleInputChanged = (event) => {
    const value = 8;
    this.setState({
      eventCount: /* event.eventCount */ value
    });
  };


  render() {
    const { eventCount } = this.state;
    return (
      <div className='number-of-events'>
        <label>Show 
          <input
            type='number'
            className='number-of-events-field'
            value={eventCount}
            onChange={this.handleInputChanged}
          >
          </input>events per page.
        </label>
      </div>
    );
  }
}

export default NumberOfEvents;