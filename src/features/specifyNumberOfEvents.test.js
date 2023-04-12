import React from 'react';
import { mount } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';

import App from '../App';
import EventList from '../EventList';
import NumberOfEvents from '../NumberOfEvents';


const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

  test('When user hasn’t specified a number, 16 is the default number', ({ given, when, then }) => {

    let AppWrapper;

    given('that the user hasn’t specified a number of events', () => {
    });

    when('the events list loads', () => {
      AppWrapper = mount(<App />);
      expect(AppWrapper.find('EventList')).toHaveLength(1);
    });

    then('the user should see 16 events', () => {
      AppWrapper.update();
      let eventListCount = AppWrapper.find(EventList).find('.event');
      expect(eventListCount.length).toBe(16);
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {

    let AppWrapper;
    let NumberOfEventsWrapper;

    given('a number of events to be displayed has been set (or the default setting is in place)', () => {
      AppWrapper = mount(<App />);
      expect(AppWrapper.find('EventList')).toHaveLength(1);
    });

    when('the user changes the number of events to be displayed on the page to n', () => {
      NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      NumberOfEventsWrapper.find('.number-of-events-field').simulate('change', { target: { value: 3 } });
    });

    then('n number events should be shown on the page', () => {
      AppWrapper.update();
      let eventListCount = AppWrapper.find(EventList).find('.event');
      expect(eventListCount.length).toBe(3);
    });
  });

});