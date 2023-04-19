// src/App.js

import React, { Component } from 'react';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import './App.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import './nprogress.css';
import { WarningAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';

class App extends Component {

  async componentDidMount() {
    if (!navigator.onLine) {
      this.setState({ infoText: 'You are offline' })
    }
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false :
      true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  state = {
    events: [],
    locations: [],
    seletedLocation: "all",
    eventsCount: 16,
    showWelcomeScreen: undefined, //true will show  welcome screen, false will hide it, undefined will render  empty div until the state gets either true or false
    infoText: ''
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

    if (this.state.showWelcomeScreen === undefined) return <div
      className="App" />

    const { locations, eventsCount, events } = this.state;
    return (
      <div className="App">

        <WarningAlert
          text={this.state.infoText}
        />

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
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }}
        />
      </div>
    );
  }
}

export default App;