import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {

  state = {
    eventsCount: 16,
    infoText: ''
  }

  handleInputChanged = (event, props) => {
    let inputValue = event.target.value;
    this.props.updateEvents(null, inputValue);
    if (inputValue > 50) {
      this.setState({
        infoText: 'Please choose a number between 1 and 50'
      });
    } else {
      this.setState({
        eventsCount: inputValue,
        infoText: ''
      });
    }
  }


  render() {
    const { eventsCount } = this.state;
    return (
      <div className='number-of-events'>
        <ErrorAlert
          text={this.state.infoText}
        />
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