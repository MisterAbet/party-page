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

1. On main page you will see form fields for editing Party event. You can edit party name, date and location.
2. To add your contacts to Party and sync it with google calendar you need to sign in to your google account. Click to Sign In link in top-right corner of the page to open Sign In dialog.
3. After success autorization you will see "Select contacts" and "Add to Calendar" buttons.
4. Click on "Select contacts" button to open select contacts dialog. Select contacts who you want to invite to party and click "Invite" button.
5. Selected contacts will be show under "Select contacts" button.
6. To add Party to your Google Calendar you can click "Add to Calendar" button. Also you can select one of your calendars, to add event.
7. After success save event to Google Calendar you will see a success message at top-right corner of page. Also "Add to Calendar" button will change to "Synch Calendar" button.
8. You can make changes in Party and press "Synch Calendar" button to update event in Google Calendar. After sucess sync you will see a success message at top-right corner of page.
