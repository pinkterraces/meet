import React from 'react';
import { mount, shallow } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';

import App from '../App';
import Event from '../Event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

  test('An event element is collapsed by default', ({ given, when, then }) => {

    let AppWrapper;

    given('that the events list has loaded', () => {
      AppWrapper = mount(<App />);
      expect(AppWrapper.find('EventList')).toHaveLength(1);
    });

    when('the user looks at the event list', () => {
    });

    then('all event elements are collapsed', () => {
      let EventWrapper = shallow(<Event />);
      expect(EventWrapper.state('eventDetails')).toBe(false);
    });

  });

  test('User can expand an event to see its details', ({ given, when, then }) => {

    let AppWrapper;
    let EventWrapper;

    given('that the events list has loaded', () => {
      AppWrapper = mount(<App />);
      expect(AppWrapper.find('EventList')).toHaveLength(1);
    });

    when('the user clicks on ‘Show details’', () => {
      EventWrapper = shallow(<Event />);
      EventWrapper.find('.show-details-btn').at(0).simulate('click');
    });

    then('the event element should expand with all event details displayed', () => {
      expect(EventWrapper.state('eventDetails')).toBe(true);
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {

    let EventWrapper

    given('that the events element is expanded', () => {
      EventWrapper = shallow(<Event />);
      EventWrapper.setState({ eventDetails: true });
    });

    when('the user clicks on ‘Hide details’', () => {
      EventWrapper.find('.show-details-btn').at(0).simulate('click');
    });

    then('the event element should collapse', () => {
      expect(EventWrapper.state('eventDetails')).toBe(false);
    });
  });

});