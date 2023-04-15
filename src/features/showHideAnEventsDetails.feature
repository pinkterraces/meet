Feature: SHOW/HIDE AN EVENT'S DETAILS

Scenario: An event element is collapsed by default
Given that the events list has loaded
When the user looks at the event list
Then all event elements are collapsed

Scenario: User can expand an event to see its details
Given that the events list has loaded
When the user clicks on ‘Show details’
Then the event element should expand with all event details displayed

Scenario: User can collapse an event to hide its details
Given that the events element is expanded
When the user clicks on ‘Hide details’
Then the event element should collapse
