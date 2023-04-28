// src/App.js

import React, { Component } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import './App.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import './nprogress.css';
import { WarningAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import EventGenre from './EventGenre';

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
          const { eventsCount } = this.state;
          this.setState({ events: events.slice(0, eventsCount), locations: extractLocations(events) });
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

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number };
    })
    return data;
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

        <h4>Events in each city</h4>
        <div className='data-vis-wrapper'>
          <EventGenre events={events} />
          <ResponsiveContainer height={400} >
            <ScatterChart
              margin={{
                top: 20, right: 20, bottom: 20, left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="City" />
              <YAxis type="number" dataKey="number" name="Number of events" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <EventList events={this.state.events} />

        {/* <EventList events={events} /> */}
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }}
        />
      </div>
    );
  }
}

export default App;