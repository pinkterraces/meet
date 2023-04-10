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
      if (this.mounted) {
        const slicedEvents = events.slice(0, this.state.eventsCount);
        this.setState({ events: slicedEvents, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  state = {
    events: [],
    locations: [],
    eventsCount: 2
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const slicedEvents = events.slice(0, this.state.eventsCount);
      const locationEvents = (location === 'all') ?
      slicedEvents :
      slicedEvents.filter((event) => slicedEvents.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }

  updateEventsCount = (value) => {
    this.setState({
      eventsCount: value
    });
    this.updateEvents();
  }

  //update number of events to do function here that passes number of events to the NumberOfEvents

  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateEventsCount={this.updateEventsCount} numberOfEvents={this.state.eventsCount}/>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;