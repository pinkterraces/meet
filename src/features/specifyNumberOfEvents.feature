Feature: SPECIFY NUMBER OF EVENTS

Scenario: When user hasn’t specified a number, 16 is the default number
Given that the user hasn’t specified a number of events
When the events list loads
Then the user should see 16 events

Scenario: User can change the number of events they want to see
Given a number of events to be displayed has been set (or the default setting is in place)
When the user changes the number of events to be displayed on the page to n
Then n number events should be shown on the page
