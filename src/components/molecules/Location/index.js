import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Select, Input, Slider } from 'antd'
import intl from 'react-intl-universal'
import { GoogleApiWrapper, Map as GoogleMap, Marker, Circle } from 'google-maps-react'
import PropTypes from 'prop-types'
import useStates from '../../../data/settings/agt/states'
import usePostcodes from '../../../data/settings/agt/postcodes'
import useCities from '../../../data/settings/agt/cities'
import useRetailers from '../../../data/pam/retailers'

const { Option } = Select
const mapStyles = {
  width: '100%',
  height: '100%'
}
const Location = ({ fieldName, fieldKey, country, google, form }) => {
  const { result: states } = useStates(country)
  const [stateCodes, setStateCodes] = useState(form.getFieldValue(`locations`)[`${fieldName}`].states)
  const { result: postcodes } = usePostcodes(country, stateCodes)
  let uniquePostcodes = []
  if (Array.isArray(postcodes) && Array.isArray(stateCodes) && stateCodes.length > 0)
    uniquePostcodes = [...new Map(postcodes.map(item => [item.postcode, item])).values()]
  const { result: cities } = useCities(country, stateCodes)
  let uniqueCites = []
  if (Array.isArray(cities) && Array.isArray(stateCodes) && stateCodes.length > 0)
    uniqueCites = [...new Map(cities.map(item => [item.name, item])).values()]
  const { retailers } = useRetailers(country)
  const [distance, setDistance] = useState(form.getFieldValue(`locations`)[`${fieldName}`].distance)
  const [mapPosition, setMapPosition] = useState({
    lat: -33.8688,
    lng: 151.2093
  })
  const [stores, setStores] = useState([])
  const handleRetailerChange = () => {
    const retailerIds = form.getFieldValue(`locations`)[`${fieldName}`].retailers
    const selectedRetailers = retailers.filter(retailer => retailerIds.find(id => id === retailer.participant_id))
    let s = []
    if (selectedRetailers.length > 0) {
      selectedRetailers.forEach(retailer => (s = [...s, ...retailer.stores]))
    }
    if (s.length > 0)
      setMapPosition({
        lat: s[0].latitude,
        lng: s[0].longitude
      })
    setStores(s)
  }
  useEffect(() => {
    if (Array.isArray(retailers) && retailers.length > 0) {
      const retailerIds = form.getFieldValue(`locations`)[`${fieldName}`].retailers
      if (retailerIds) {
        const selectedRetailers = retailers.filter(retailer => retailerIds.find(id => id === retailer.participant_id))
        let s = []
        if (selectedRetailers.length > 0) {
          selectedRetailers.forEach(retailer => (s = [...s, ...retailer.stores]))
        }
        if (s.length > 0)
          setMapPosition({
            lat: s[0].latitude,
            lng: s[0].longitude
          })
        setStores(s)
      }
    }
  }, [retailers])
  return (
    <Row gutter={16}>
      <Col span={16}>
        <Form.Item name={[fieldName, 'country']} fieldKey={[fieldKey, 'country']} noStyle>
          <Input type='hidden' />
        </Form.Item>
        <Form.Item
          name={[fieldName, 'states']}
          fieldKey={[fieldKey, 'states']}
          label={intl.get('campaigns.rewards.form.locations.state')}
          validateTrigger={['onChange', 'onBlur']}
          // rules={[{ required: true, message: intl.get('campaigns.shoppingListAds.requiredMessage') }]}
        >
          {Array.isArray(states) && (
            <Select
              mode='multiple'
              onChange={() => setStateCodes(form.getFieldValue(`locations`)[`${fieldName}`].states)}
            >
              {states.map(state => (
                <Option key={state.state_code} value={country.state_code}>
                  {state.state_name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          name={[fieldName, 'postcodes']}
          fieldKey={[fieldKey, 'postcodes']}
          label={intl.get('campaigns.rewards.form.locations.postcode')}
          validateTrigger={['onChange', 'onBlur']}
          // rules={[{ required: true, message: intl.get('campaigns.shoppingListAds.requiredMessage') }]}
        >
          {Array.isArray(postcodes) && (
            <Select
              mode='multiple'
              showSearch
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {uniquePostcodes.map(postcode => (
                <Option key={postcode.postcode} value={postcode.postcode}>
                  {postcode.postcode}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          name={[fieldName, 'cities']}
          fieldKey={[fieldKey, 'cities']}
          label={intl.get('campaigns.rewards.form.locations.city')}
          validateTrigger={['onChange', 'onBlur']}
          // rules={[{ required: true, message: intl.get('campaigns.shoppingListAds.requiredMessage') }]}
        >
          {Array.isArray(cities) && (
            <Select
              mode='multiple'
              showSearch
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {uniqueCites.map(city => (
                <Option key={city.name} value={city.name}>
                  {city.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          name={[fieldName, 'retailers']}
          fieldKey={[fieldKey, 'retailers']}
          label={intl.get('campaigns.rewards.form.locations.retailers')}
          validateTrigger={['onChange', 'onBlur']}
          // rules={[{ required: true, message: intl.get('campaigns.shoppingListAds.requiredMessage') }]}
        >
          {Array.isArray(retailers) && (
            <Select
              mode='multiple'
              showSearch
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              onChange={handleRetailerChange}
            >
              {retailers.map(retailer => (
                <Option key={retailer.participant_id} value={retailer.participant_id}>
                  {retailer.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Col>
      <Col span={8}>
        <Row>
          <Col span={24} className='mb-10' style={{ height: '242px' }}>
            <GoogleMap
              defaultOptions={{
                gestureHandling: 'cooperative'
              }}
              google={google}
              zoom={15}
              style={mapStyles}
              initialCenter={{
                lat: mapPosition.lat ? mapPosition.lat : '0',
                lng: mapPosition.lng ? mapPosition.lng : '0'
              }}
              center={{
                lat: mapPosition.lat ? mapPosition.lat : '0',
                lng: mapPosition.lng ? mapPosition.lng : '0'
              }}
              // disableDefaultUI={true}
            >
              {stores.map(store => (
                <Marker
                  key={store.id}
                  position={{
                    lat: parseFloat(store.latitude),
                    lng: parseFloat(store.longitude)
                  }}
                />
              ))}
              {stores.map(store => (
                <Circle
                  key={store.id}
                  center={{
                    lat: parseFloat(store.latitude),
                    lng: parseFloat(store.longitude)
                  }}
                  radius={distance}
                  strokeWeight={1}
                />
              ))}
            </GoogleMap>
          </Col>
          <Col span={24}>
            <Form.Item
              name={[fieldName, 'distance']}
              fieldKey={[fieldKey, 'distance']}
              label={`Retailer Distance ${distance}km`}
              validateTrigger={['onChange', 'onBlur']}
            >
              <Slider onChange={() => setDistance(form.getFieldValue(`locations`)[`${fieldName}`].distance)} />
            </Form.Item>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
Location.propTypes = {
  fieldName: PropTypes.number.isRequired,
  fieldKey: PropTypes.number.isRequired,
  country: PropTypes.string.isRequired,
  form: PropTypes.shape({}).isRequired,
  google: PropTypes.shape({}).isRequired
}

export default GoogleApiWrapper({
  // apiKey: process.env.REACT_APP_GOOGLE_API_KEY
  apiKey: 'AIzaSyD0KIyfe3R1Xk9hnKpEkDuXv-M2inmkMDI'
})(Location)
