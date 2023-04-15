// src/App.js

import React, { Component } from 'react';
import { extractLocations, getEvents } from './api';
import './App.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import './nprogress.css';

class App extends Component {

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      const { eventsCount } = this.state;
      if (this.mounted) {
        const eventsToShow = events.slice(0, eventsCount);
        this.setState({ events: eventsToShow, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  state = {
    events: [],
    locations: [],
    seletedLocation: "all",
    eventsCount: 16
  };

  updateEvents = (location, inputNumber) => {
    const { eventsCount, seletedLocation } = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents =
          location === "all"
            ? events
            : events.filter((event) => event.location === location);
        const eventsToShow = locationEvents.slice(0, eventsCount);
        this.setState({
          events: eventsToShow,
          seletedLocation: location,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          seletedLocation === "all"
            ? events
            : events.filter((event) => event.location === seletedLocation);
        const eventsToShow = locationEvents.slice(0, inputNumber);
        this.setState({
          events: eventsToShow,
          eventCount: inputNumber,
        });
      });
    }
  };


  render() {
    const { locations, eventsCount, events } = this.state;
    return (
      <div className="App">

        <h1>Meet App</h1>

        <CitySearch
          locations={locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          eventsCount={eventsCount}
          updateEvents={this.updateEvents}
        />
        <EventList events={events} />
      </div>
    );
  }
}

export default App;