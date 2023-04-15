import React, { Component } from 'react';

class NumberOfEvents extends Component {

  state = {
    eventsCount: 16
  }

  handleInputChanged = (event, props) => {
    let inputValue = event.target.value;
    this.props.updateEvents(null, inputValue);
    this.setState({ eventsCount: inputValue });
  }


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
              this.handleInputChanged(event);
            }}
            min='1'
            max='50'
          >
          </input>events per page.
        </label>
      </div>
    );
  }
}

export default NumberOfEvents;