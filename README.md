# Party Page

> Simple party page

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

**Set up Oauth keys before build**

1. To obtain API key please visit the [Google Developer Console](https://console.developers.google.com/) and create project or use existing. The API's that you have to enable in your Google API Manager Dashboard are [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/), [Google Calendar API](https://developers.google.com/google-apps/calendar/), [Google People API](https://developers.google.com/people/) and [Google Places API Web Service](https://developers.google.com/places/web-service/)
2. Obtain Api key for Google Maps JavaScript API and oAuth Client ID  for Google Calendar API and Google People API

3. Replace keys in src/config.js

**UI Walkthrough**

1. **About**  
There are form fields on a main page for editing Party event: party name, location and date.
2. **Authorization**  
You must sign-in to be able to pick your contacts/sync an event with a google calendar. Use Sign In link in top-right corner. You will see "Select contacts" and "Add to Calendar" buttons after successful authorization.
3. **How to add contacts**  
Click "Select contacts" button to open Contacts dialog. Select contacts you want to invite to the party and click "Invite" button. Selected contacts will be shown under "Select contacts" button.
4. **Sync with Google Calendar**  
Click "Add to Calendar" button to create an event in your Google Calendar. You will see a “success message” at top-right corner of the page.  "Add to Calendar" button will be changed to "Synch Calendar" button. Clicking this button will update the event in the Google Calendar.
