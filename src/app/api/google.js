import axios from 'axios'
import utils from './../shared/utils'

export default {
  getContacts: (token) =>{
    return axios.get(
      'https://people.googleapis.com/v1/people/me/connections?personFields=names,photos,emailAddresses',
      {
            headers:{'Authorization': 'Bearer ' + token}
      }
    )
  },

  getCalendarList: (token) => {
    return axios.get('https://www.googleapis.com/calendar/v3/users/me/calendarList',{
      headers:{'Authorization': 'Bearer ' + token}
    })
  },

  createCalendarEvent: (token, calendarId, title, location, date, contacts) =>{
    const attendees = contacts.map(c =>{
      return {
        id: c.id.replace('people/',''),
        email: c.email
      }
    })
    return axios.post('https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events',{
      summary: title,
      location: location,
      start:{
        date: utils.formatDate(date)
      },
      end:{
        date: utils.formatDate(date)
      },
      attendees: attendees,
      headers:{'Authorization': 'Bearer ' + token}
    })
  },

  updateCalendarEvent: (token, calendarId, eventId, title, location, date, contacts) =>{
    const attendees = contacts.map(c =>{
      return {
        id: c.id.replace('people/',''),
        email: c.email
      }
    })
    return axios.patch('https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events/' + eventId,{
      summary: title,
      location: location,
      start:{
        date: utils.formatDate(date)
      },
      end:{
        date: utils.formatDate(date)
      },
      attendees: attendees,
      headers:{'Authorization': 'Bearer ' + token}
    })
  }
}
