import React, { useEffect, useMemo, useState } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import useForm from 'react-hook-form'
import { pickBy, identity } from 'lodash'
import { Select, Input } from 'antd'
import { RHFInput } from 'react-hook-form-input'
import Button from '../../atoms/Button'
import * as ST from './styles'
import { subSiteType } from '../../../utils/consts'
import { getCountriesOptions } from '../../../utils/getOptionsForSelectors'
import { inputs, defaultValues } from './consts'
import Error from '../../atoms/Error'
import CustomSelect from '../../atoms/CustomSelect'
import LocationsMap from '../../atoms/LocationsMap'
import { trimToSixDecimalPlaces, intToDecimalDegree } from '../../../utils/calculations'
import WidgetRemaining from '../../atoms/WidgetRemaining'

const { Option } = Select
const NAME_CITY_ADDRESS_LENGTH = 100
const POST_CODE_LENGTH = 10

const SupplyChainEditLocations = ({
  history,
  countries,
  createParticipantLocation,
  locationData,
  settingsGetCountries,
  updateParticipantLocation,
  isSupplyParticipantsLocationCreating,
  isNeedReturnToLocationsPage,
  selectedParticipantId,
  supplyParticipantsLocations,
  clearSelectedLocation
}) => {
  const [addressFromInputs, setAddressFromInputs] = useState(null)
  const currId = useMemo(() => {
    const locationsById = supplyParticipantsLocations.find(el => el.id === selectedParticipantId)
    return (locationsById && locationsById.id) || null
  }, [selectedParticipantId, supplyParticipantsLocations])

  const { register, setValue, errors, setError, clearError, watch, reset, handleSubmit } = useForm({
    reValidateMode: 'onChange',
    defaultValues
  })

  useEffect(() => {
    register({ name: 'latitude' })
    register({ name: 'longitude' })
  }, [register])

  const allValues = watch()

  const isEditLocation = useMemo(() => {
    return locationData && Object.keys(locationData).length
  }, [locationData])

  const parseAndUpdateCoordinates = (coordName, coordValue) => {
    const newValue =
      coordValue.toString().indexOf('.') !== -1 ? trimToSixDecimalPlaces(coordValue) : intToDecimalDegree(coordValue)
    setValue(coordName, newValue.toFixed(6))
  }

  const prepareCoordinate = coordValue => {
    return Number(coordValue.replace('.', ''))
  }

  useEffect(() => {
    if (!countries || !countries.length) {
      settingsGetCountries()
    }

    if (isEditLocation) {
      Object.keys(defaultValues).forEach(key => {
        setValue(key, locationData[key] || undefined)

        if (key === 'latitude' || key === 'longitude') {
          const value = locationData[key]
          parseAndUpdateCoordinates(key, value)
        }
      })
    } else {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          parseAndUpdateCoordinates('latitude', latitude)
          parseAndUpdateCoordinates('longitude', longitude)
        },
        () => {
          // Geolocation is disabled set default location to Australia
          parseAndUpdateCoordinates('latitude', -26.137012)
          parseAndUpdateCoordinates('longitude', 134.209177)
        }
      )
    }

    return () => {
      reset()
      clearSelectedLocation()
    }
  }, [])

  useEffect(() => {
    if (isNeedReturnToLocationsPage) {
      clearSelectedLocation()
      history.push('/admin/track-and-trace/supply-chain/locations')
    }
  }, [isNeedReturnToLocationsPage])

  const onSubmit = data => {
    const dataWithoutFalseyFields = pickBy(data, identity)
    if (isEditLocation) {
      updateParticipantLocation({
        ...dataWithoutFalseyFields,
        id: locationData.id,
        latitude: prepareCoordinate(data.latitude),
        longitude: prepareCoordinate(data.longitude)
      })
      return
    }
    createParticipantLocation({
      ...dataWithoutFalseyFields,
      owner: currId,
      accuracy: 800,
      latitude: prepareCoordinate(data.latitude),
      longitude: prepareCoordinate(data.longitude)
    })
  }

  const onMarkerDragEnd = (data1, data2, coord) => {
    const { latLng } = coord
    const lat = latLng.lat()
    const lng = latLng.lng()

    setValue('latitude', lat.toFixed(6))
    setValue('longitude', lng.toFixed(6))
  }

  const handleUpdateMap = () => {
    const { address, city, country } = allValues

    if (address || city || country) {
      const completeAddress = `${address} ${city} ${country}`
      setAddressFromInputs(completeAddress)
    }
  }

  const remainingValue = value => {
    return NAME_CITY_ADDRESS_LENGTH - (value && value.length) || 0
  }

  const remainingPostValue = value => {
    return POST_CODE_LENGTH - (value && value.length) || 0
  }

  const getMaxFieldLength = field => {
    if (field === 'name' || field === 'city' || field === 'address') {
      return NAME_CITY_ADDRESS_LENGTH
    }

    if (field === 'post_code') {
      return POST_CODE_LENGTH
    }

    return 1000
  }

  return (
    <ST.Wrapper>
      <ST.InputsWrapper>
        {inputs.map(el => {
          if (el.value === 'sub_site_type') {
            return (
              <ST.RhfWrapper key={el.value}>
                <ST.RemainingWrapper />
                <RHFInput
                  as={
                    <CustomSelect
                      placeholder={intl.get('supplyChainLocations.selectType')}
                      size='large'
                      handleValueChange={value => {
                        setValue('sub_site_type', value)
                        clearError(el.value)
                      }}
                      value={isEditLocation ? locationData.sub_site_type : null}
                    >
                      {subSiteType.map(option => (
                        <Option key={option.value}>{option.label}</Option>
                      ))}
                    </CustomSelect>
                  }
                  register={register}
                  name='sub_site_type'
                  rules={{ required: `${intl.get(`supplyChainLocations.${el.value}`)} is required*` }}
                  setValue={setValue}
                />
                <Error errors={errors} destination={el.value} />
              </ST.RhfWrapper>
            )
          }
          if (el.value === 'country') {
            return (
              <ST.RhfWrapper key={el.value}>
                <ST.RemainingWrapper />
                <RHFInput
                  as={
                    <CustomSelect
                      size='large'
                      placeholder={intl.get('supplyChainLocations.selectCountry')}
                      handleValueChange={value => {
                        setValue('country', value)
                        clearError(el.value)
                      }}
                      value={isEditLocation ? locationData.country : null}
                    >
                      {getCountriesOptions(countries).map(option => (
                        <Option key={option.value}>{option.label}</Option>
                      ))}
                    </CustomSelect>
                  }
                  register={register}
                  name='country'
                  rules={{ required: `${intl.get(`supplyChainLocations.${el.value}`)} is required*` }}
                  setValue={setValue}
                />
                <Error errors={errors} destination={el.value} />
              </ST.RhfWrapper>
            )
          }
          return (
            <ST.RhfWrapper key={el.value}>
              <ST.RemainingWrapper>
                {['name', 'address', 'city'].includes(el.value) && (
                  <WidgetRemaining
                    position='relative'
                    textAlign='end'
                    marginBottom='0'
                    top='0'
                    value={remainingValue(allValues[el.value])}
                  />
                )}
                {el.value === 'post_code' && (
                  <WidgetRemaining
                    position='relative'
                    textAlign='end'
                    marginBottom='0'
                    top='0'
                    value={remainingPostValue(allValues[el.value])}
                  />
                )}
              </ST.RemainingWrapper>
              <RHFInput
                as={
                  <Input
                    size='large'
                    type={el.value === 'post_code' ? 'number' : undefined}
                    placeholder={el.placeholder}
                    maxLength={getMaxFieldLength(el.value)}
                  />
                }
                register={register}
                name={el.value}
                onKeyPress={e => {
                  if (
                    el.value === 'post_code' &&
                    (e.target.value.length === POST_CODE_LENGTH || e.key === '-' || e.key === '+')
                  ) {
                    e.stopPropagation()
                    e.preventDefault()
                  }
                }}
                rules={
                  ['name', 'address', 'city'].includes(el.value) && {
                    required: `${intl.get(`supplyChainLocations.${el.value}`)} is required*`
                  }
                }
                setValue={setValue}
                onChange={e => {
                  const { value } = e.target
                  if (el.value === 'name' || el.value === 'city' || el.value === 'address') {
                    if (value !== '') {
                      return clearError(el.value)
                    }
                    setError(el.value, 'notMatch', intl.get('validation.requiredField'))
                  }
                  return null
                }}
              />
              <Error errors={errors} destination={el.value} />
            </ST.RhfWrapper>
          )
        })}
      </ST.InputsWrapper>
      <ST.MapWrapper>
        <ST.TitleMapWrapper>
          <ST.TitleMap>{intl.get('supplyChainLocations.gpsCoordinates')}</ST.TitleMap>
          <Button onClick={handleUpdateMap}>{intl.get('supplyChainLocations.updateMap')}</Button>
        </ST.TitleMapWrapper>
        <LocationsMap
          onMarkerDragEnd={onMarkerDragEnd}
          latitude={allValues.latitude}
          longitude={allValues.longitude}
          addressFromInputs={addressFromInputs}
          parseAndUpdateCoordinates={parseAndUpdateCoordinates}
        />
      </ST.MapWrapper>
      <ST.ButtonsWrapper>
        <Button
          type='danger'
          size='large'
          htmlType='button'
          onClick={() => history.push('/admin/track-and-trace/supply-chain/locations')}
        >
          {intl.get('cancel')}
        </Button>
        <Button
          type='danger'
          size='large'
          onClick={handleSubmit(onSubmit)}
          loading={isSupplyParticipantsLocationCreating}
          disabled={Object.entries(errors).length !== 0 || isSupplyParticipantsLocationCreating}
        >
          {intl.get('save')}
        </Button>
      </ST.ButtonsWrapper>
    </ST.Wrapper>
  )
}

SupplyChainEditLocations.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  createParticipantLocation: PropTypes.func.isRequired,
  countries: PropTypes.arrayOf(PropTypes.object),
  isSupplyParticipantsLocationCreating: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  locationData: PropTypes.object,
  settingsGetCountries: PropTypes.func.isRequired,
  updateParticipantLocation: PropTypes.func.isRequired,
  isNeedReturnToLocationsPage: PropTypes.bool,
  clearSelectedLocation: PropTypes.func.isRequired,
  selectedParticipantId: PropTypes.string,
  supplyParticipantsLocations: PropTypes.arrayOf(PropTypes.object)
}

SupplyChainEditLocations.defaultProps = {
  isSupplyParticipantsLocationCreating: false,
  countries: [],
  locationData: null,
  isNeedReturnToLocationsPage: false,
  selectedParticipantId: null,
  supplyParticipantsLocations: []
}

export default SupplyChainEditLocations
