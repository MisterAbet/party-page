export default {
  parseGoogleContact:(con) => {
    let contact = {
      id: con.resourceName
    }
    if(con.names && con.names.length){
      let primaryName = con.names.filter(n => n.metadata && n.metadata.primary)[0]
      contact.displayName = primaryName.displayName
      contact.givenName = primaryName.givenName
      contact.familyName = primaryName.familyName
    }
    if(con.emailAddresses && con.emailAddresses.length){
      let primaryEmail = con.emailAddresses.filter(n => n.metadata && n.metadata.primary)[0]
      contact.email = primaryEmail.value
    }
    if(con.photos && con.photos.length){
      let primaryPhoto = con.photos.filter(n => n.metadata && n.metadata.primary)[0]
      contact.photo = primaryPhoto.url
    }
    return contact
  },

  parseGoogleAddress: (address) => {
    let rval = {
      title: address.formatted_address || address.name || address,
      position: {
        lat: address.geometry ? address.geometry.location.lat(): 0,
        lng: address.geometry ? address.geometry.location.lng(): 0
      }
    }
    if(address.address_components){
      let postalCode = address.address_components.filter(c => c.types.indexOf('postal_code') !== -1)
      rval.postalCode = postalCode && postalCode.length ? postalCode[0]['long_name']: null
      let country = address.address_components.filter(c => c.types.indexOf('country') !== -1)
      rval.country = country && country.length ? country[0]['long_name']: null
      let state = address.address_components.filter(c => c.types.indexOf('administrative_area_level_1') !== -1)
      rval.state = state && state.length ? state[0]['long_name']: null
      let city = address.address_components.filter(c => c.types.indexOf('locality') !== -1)
      rval.city = city && city.length ? city[0]['long_name']: null
      let street = address.address_components.filter(c => c.types.indexOf('route') !== -1)
      rval.street = street && street.length ? street[0]['long_name']: null
      let street_number = address.address_components.filter(c => c.types.indexOf('street_number') !== -1)
      rval.street_number = street_number && street_number.length ? street_number[0]['long_name']: null
    }
    return rval
  },
  formatDate:(date) => {
    let numberToFixedLength = (num, length) => {
      let numStr = num.toString()
      if(numStr.length < length){
        for(let i = numStr.length; i < length; i++)
          numStr = '0' + numStr;
      }
      return numStr
    }

    return date.getFullYear() + '-' + numberToFixedLength(date.getMonth() + 1, 2) + '-' + numberToFixedLength(date.getDate(), 2)
  },


}
