import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import intl from 'react-intl-universal'
import RemoveIcon from '../../molecules/RemoveIcon'

const mapStyles = {
  position: 'relative',
  width: 'calc(100% - 40px)',
  height: 'calc(100% - 100px)',
  margin: 20,
  cursor: 'default',
  zIndex: 100
}

const TitleChart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
  padding: 15px 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-weight: bold;
  color: #000000;
  font-size: 1rem;
  & text {
    color: #ffffff;
  }
`

const defaultMapOptions = {
  disableDefaultUI: true
}
const MapContainer = props => {
  const { coordinates, setItem, google, selectCountry, countries } = props
  const [mapCenter, setMapCenter] = useState({ lat: -26.137012, lng: 134.209177 })

  useEffect(() => {
    if (selectCountry !== 'any') {
      const address = countries.find(item => item.iso === selectCountry).name
      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({ address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          setMapCenter({ lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() })
        } else {
          setMapCenter({ lat: -26.137012, lng: 134.209177 })
        }
      })
    }
  }, [selectCountry])

  return (
    <>
      <TitleChart>
        <div>{intl.get('geographyPage.geography')}</div>
        <RemoveIcon setItem={setItem} />
      </TitleChart>
      <Map
        google={google}
        style={mapStyles}
        zoom={4}
        initialCenter={mapCenter}
        center={mapCenter}
        defaultOptions={defaultMapOptions}
      >
        {coordinates.length &&
          coordinates.map((store, index) => {
            return (
              <Marker
                /* eslint-disable-next-line react/no-array-index.js-key,react/no-array-index-key */
                key={index}
                id={index}
                position={{
                  lat: store.latitude,
                  lng: store.longitude
                }}
              />
            )
          })}
      </Map>
    </>
  )
}

MapContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  coordinates: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  google: PropTypes.object.isRequired,
  setItem: PropTypes.func.isRequired,
  countries: PropTypes.arrayOf(PropTypes.object),
  selectCountry: PropTypes.string.isRequired
}

MapContainer.defaultProps = {
  countries: [],
  coordinates: []
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyD0KIyfe3R1Xk9hnKpEkDuXv-M2inmkMDI'
})(MapContainer)
