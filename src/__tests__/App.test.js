import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });
  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });
  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render view number of events field', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

describe('<App /> integration', () => {
  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });
  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });
  test('get list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });
  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents);
    AppWrapper.unmount();
  });

  test('number of events matches the number in state.eventsCount', async () => {
    const AppWrapper = mount(<App />);
    const allEvents = await getEvents();
    //AppWrapper.setState({ events: allEvents })
    const eventsCount = AppWrapper.state('eventsCount');
    const allEventsLength = allEvents.slice(0, eventsCount);
    expect(eventsCount).toBe(allEventsLength.length); 
    AppWrapper.unmount();
  });

  test('number of events in EventsList matches the number NumberOfEvents component', async () => {
    const AppWrapper = mount(<App />);
    const allEvents = await getEvents();
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const eventsCount = NumberOfEventsWrapper.state('eventsCount');
    AppWrapper.setState({ eventsCount: eventsCount, events: allEvents });
    const updatedEvents = allEvents.slice(0, eventsCount);
    AppWrapper.setState({ events: updatedEvents });
    const eventListCount = AppWrapper.find(EventList).find('EventList li');
    //const eventListCount = allEvents.map(event => <li></li> )
    expect(eventsCount).toBe(eventListCount.length); 
    AppWrapper.unmount();
  });
}); 