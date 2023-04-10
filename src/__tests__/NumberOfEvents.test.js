import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
/* import { extractLocations } from '../api'; */

describe('<NumberOfEvents /> component', () => {

  /*  let mockEventCount = mockData.length; */

  let /* locations, */ NumberOfEventsWrapper;
  beforeAll(() => {
    /* locations = extractLocations(mockData); */
    NumberOfEventsWrapper = shallow(<NumberOfEvents /* mockEventData={mockEventData} */ />);
  });
  test('render NumberOfEvents field', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events-field')).toHaveLength(1);
  });
  test('renders text input correctly', () => {
    const eventsCount = NumberOfEventsWrapper.state('eventsCount');
    const fieldValue = NumberOfEventsWrapper.find('.number-of-events-field').prop('value');
    console.log("eventsCount: ", eventsCount);
    console.log("fieldValue: ", fieldValue);
    console.log("XX: ", NumberOfEventsWrapper.find('.number-of-events-field').prop('value'));
    expect(~~fieldValue).toBe(~~eventsCount);
  });
  test('input is changed and the value is reflected correctly', () => {
    const eventsCount = NumberOfEventsWrapper.state('eventsCount');
    expect(NumberOfEventsWrapper.state('eventsCount')).toBe(eventsCount);
    NumberOfEventsWrapper.find('.number-of-events-field').simulate('change', { target: { value: 3 } });
    const newEventsCount = NumberOfEventsWrapper.state('eventsCount');
    expect(NumberOfEventsWrapper.state('eventsCount')).toBe(newEventsCount);
  })

}); 

