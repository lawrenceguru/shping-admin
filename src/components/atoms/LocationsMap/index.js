import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

const mapStyles = {
  position: 'relative',
  width: '100%',
  height: '100%',
  cursor: 'default'
}

const containerStyle = {
  position: 'relative',
  width: '100%',
  height: '400px'
}

const defaultMapOptions = {
  disableDefaultUI: true
}

const mapCenter = { lat: -26.137012, lng: 134.209177 }

const LocationsMap = ({
  onMarkerDragEnd,
  google,
  latitude,
  longitude,
  addressFromInputs,
  parseAndUpdateCoordinates
}) => {
  useEffect(() => {
    const geocoder = google && google.maps && new google.maps.Geocoder()
    geocoder.geocode({ address: addressFromInputs }, results => {
      if (results.length) {
        const {
          geometry: {
            location: { lat, lng }
          }
        } = results && results[0]
        parseAndUpdateCoordinates('latitude', lat())
        parseAndUpdateCoordinates('longitude', lng())
      }
    })
  }, [addressFromInputs])

  return (
    <Map
      google={google}
      containerStyle={containerStyle}
      style={mapStyles}
      zoom={10}
      initialCenter={{ lat: latitude || mapCenter.lat, lng: longitude || mapCenter.lng }}
      center={{ lat: latitude || mapCenter.lat, lng: longitude || mapCenter.lng }}
      defaultOptions={defaultMapOptions}
    >
      <Marker
        draggable
        onDragend={onMarkerDragEnd}
        position={{
          lat: latitude || mapCenter.lat,
          lng: longitude || mapCenter.lng
        }}
      />
    </Map>
  )
}

LocationsMap.propTypes = {
  latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  addressFromInputs: PropTypes.string,
  onMarkerDragEnd: PropTypes.func,
  parseAndUpdateCoordinates: PropTypes.func.isRequired
}

LocationsMap.defaultProps = {
  latitude: null,
  longitude: null,
  onMarkerDragEnd: null,
  addressFromInputs: null
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD0KIyfe3R1Xk9hnKpEkDuXv-M2inmkMDI',
  libraries: ['geometry', 'drawing', 'places']
})(LocationsMap)
