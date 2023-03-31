import React, { Component } from 'react';

class NumberOfEvents extends Component {

  state = {
    eventCount: 32
  }

  handleInputChanged = (event) => {
    const value = 8;
    this.setState({
      eventCount: value
    });
  };


  render() {
    return (
      <div className='number-of-events'>
        <input
          className='number-of-events-field'
          value={this.state.eventCount}
          onChange={this.handleInputChanged}
        >
        </input>
      </div>
    );
  }
}

export default NumberOfEvents;