import React, { Component } from 'react';

class NumberOfEvents extends Component {

  state = {
    eventsCount: 4
  }

  handleInputChanged(value) {
    this.setState({
      eventsCount: /* event.eventCount */ value
    });
  };


  render() {
    const { eventsCount } = this.state;
    return (
      <div className='number-of-events'>
        <label>Show 
          <input
            type='number'
            className='number-of-events-field'
            value={eventsCount}
            onChange={event => {
              this.handleInputChanged(event.target.value);
            }}
          >
          </input>events per page.
        </label>
      </div>
    );
  }
}

export default NumberOfEvents;