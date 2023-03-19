# meet

A serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. The application uses the Google
Calendar API to fetch upcoming events.

*How will serverless be used in this app?*

The server logic will be written with Node/Express as Lambda functions, hosted on AWS. AWS Lambda be the authorization server and the functions hosted there will serve a token to users and allow access the Google Calendar API.


*FEATURES*

**FEATURE 1: FILTER EVENTS BY CITY**

As a user
I should be able to see a list of all events if I have not searched for a city
So that I can see all available events

Scenario 1: When user hasn’t searched for a city, show upcoming events from all cites
Given user hasn’t searched for any city
When the user opens the app
Then the user should see a list of all upcoming events

Scenario 2: User should see a list of suggestions when they search for a city
Given the main page is open
When user starts typing in the city textbox
Then the user should see a list of cities (suggestions) that match what they’ve typed

Scenario 3: User can select a city from the suggested list
Given the user was typing “Berlin” in the city textbox
And the list of suggested cities is showing
When the user selects a city (e.g., “Berlin, Germany”) from the list
Then their city should be changed to that city (i.e., “Berlin, Germany”)
And the user should receive a list of upcoming events in that city

**FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS**

As a user
I should be able to show and hide the event element
So that I can see more details about a specific event

Scenario 1: An event element is collapsed by default
Given that the events list has loaded
When the user looks at the event list
Then all event elements are collapsed

Scenario 2: User can expand an event to see its details
Given that the events list has loaded
When the user clicks on ‘Show details’
Then the event element should expand with all event details displayed

Scenario 3: User can collapse an event to hide its details
Given that the events element is expanded
When the user clicks on ‘Hide details’
Then the event element should collapse


**FEATURE 3: SPECIFY NUMBER OF EVENTS**

As a user
I should be able to specify the number of events displayed
So that I can customise the view to my preference

Scenario 1: When user hasn’t specified a number, 32 is the default number
Given that the user hasn’t specified a number of events
When the events list loads
Then the user should see 32 events
Scenario 2: User can change the number of events they want to see
Given a number of events to be displayed has been set (or the default setting is in place)
When the user changes the number of events to be displayed on the page to n
Then n number events should be shown on the page


**FEATURE 4: USE THE APP WHEN OFFLINE**
As a user
I should be able to access the app offline
So that I can access event details when not connected to the internet

Scenario 1: Show cached data when there’s no internet connection
Given the user is offline
When the user uses the app
Then cached data should show in the app
Scenario 2: Show error when user changes the settings (city, time range)
Given the user is offline
When the users tries to change any settings
Then the user receives an error


**FEATURE 5: DATA VISUALIZATION**
As a user
I should be able to see a visual representation of the events in different cities
So that I can see at a glance where there are more or less events

Scenario 1: Show a chart with the number of upcoming events in each city
Given there are events
When the user loads the charts
Then the user will see the number of upcoming events in each city 

