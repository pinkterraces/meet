import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../EventList';
import Event from '../Event'; 
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event events={mockData} />);
  });
  test('render title of event', () => {
    expect(EventWrapper.find('.event-title')).toHaveLength(1);
  });
  test('render time and location details of event', () => {
    expect(EventWrapper.find('.event-time-loc')).toHaveLength(1);
  });
  test('render show details button', () => {
    expect(EventWrapper.find('.show-details')).toHaveLength(1);
  });
  test('all event details are shown on click', () => {
    EventWrapper.setState({
      eventDetails: false
    });
    EventWrapper.find('.show-details').at(0).simulate('click');
    expect(EventWrapper.state('eventDetails')).toBe(true);
  });
});