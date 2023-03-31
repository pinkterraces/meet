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
    const eventCount = NumberOfEventsWrapper.state('eventCount');
    expect(NumberOfEventsWrapper.find('.number-of-events-field').prop('value')).toBe(~~eventCount);
  });
  test('change state when input changes', () => {
/*     NumberOfEventsWrapper.setState({
      eventCount: 32
    }); */
    const eventObject = { target: { eventCount: 8 } };
    NumberOfEventsWrapper.find('.number-of-events-field').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('eventCount')).toBe(8);
  });
});

