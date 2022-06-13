import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Select, Input } from 'antd'
import intl from 'react-intl-universal'
import useForm from 'react-hook-form'
import { RHFInput } from 'react-hook-form-input'
import Button from '../../atoms/Button'
import { Wrapper, InputsWrapper, ButtonsWrapper, RhfWrapper, RhfWrapperAddress } from './styles'
import { inputs } from './utils'
import Error from '../../atoms/Error'
import { validateEmail, validatePhone, checkCompanyPrefixNotRequired } from '../../../utils/validation'

const { Option } = Select

const optionsType = [
  { value: 'owner', label: 'Owner' },
  { value: 'supplier', label: 'Supplier' },
  { value: 'distributor', label: 'Distributor' },
  { value: 'retailer', label: 'Retailer' }
]

const SupplyChainEditParticipant = ({
  history,
  createOrUpdateParticipant,
  participantData,
  countries,
  participants
}) => {
  const { register, handleSubmit, setValue, errors, setError, clearError, watch } = useForm()

  const isEditParticipant = participantData && Object.keys(participantData).length
  const preparedCountriesOptions = countries ? countries.map(el => ({ value: el.iso, label: el.name })) : []
  const allValues = watch()

  useEffect(() => {
    setValue('country', [])
    setValue('type', [])
    if (participantData) {
      Object.keys(participantData).forEach(key => {
        if (key === 'country') {
          setValue(key, countries.find(el => el.name === participantData[key]).iso)
        } else if (key === 'participant_type') {
          const [typeParticipant] = participantData.participant_type
          setValue('type', typeParticipant)
        } else {
          setValue(key, participantData[key])
        }
      })
    }
  }, [])

  if (Object.keys(errors).length) {
    if (errors.address) {
      setError('address', 'notMatch', intl.get('validation.supplyChain.addressIsReq'))
    }
    if (errors.city) {
      setError('city', 'notMatch', intl.get('validation.supplyChain.cityIsReq'))
    }
    if (errors.name) {
      setError('name', 'notMatch', intl.get('validation.supplyChain.nameIsReq'))
    }
  }

  const handleValueChange = (field, value) => {
    const newValues = { ...allValues }
    newValues[field] = value
    setValue('values', newValues)
  }

  const onSubmit = val => {
    let validInputsValue = {}
    Object.keys(val).forEach(el => {
      if (val[el] !== '') {
        return (validInputsValue = { ...validInputsValue, [el]: val[el] })
      }
      return null
    })
    createOrUpdateParticipant({
      inputsValue: validInputsValue,
      id: isEditParticipant ? participantData.id : null,
      callback: () => history.push('/admin/track-and-trace/supply-chain')
    })
  }

  const validateValue = (el, value) => {
    if (el.value === 'name' || el.value === 'city' || el.value === 'address') {
      if (value !== '') return clearError(el.value)
      setError(el.value, 'notMatch', intl.get('validation.requiredField'))
    }
    if (el.value === 'phone') {
      validatePhone(value, clearError, setError)
    }
    if (el.value === 'email') {
      validateEmail(value, clearError, setError)
    }
    if (el.value === 'gln') {
      checkCompanyPrefixNotRequired(value, participants, clearError, setError, errors)
    }
    handleValueChange(el.value, value)
    return null
  }

  return (
    <Wrapper>
      <span>{isEditParticipant ? intl.get('supplyChain.edit') : intl.get('supplyChain.create')}</span>
      <InputsWrapper>
        {inputs.map(el => {
          if (el.value === 'select_type') {
            return (
              <RhfWrapper>
                <RHFInput
                  as={
                    <Select
                      style={{ width: '100%' }}
                      placeholder={intl.get('supplyChain.selectType')}
                      size='large'
                      name='type'
                      disabled={isEditParticipant && participantData.api_key}
                    >
                      {optionsType.map(option => (
                        <Option key={option.value}>{option.label}</Option>
                      ))}
                    </Select>
                  }
                  register={register}
                  value={
                    isEditParticipant && participantData.participant_type.includes('distributor' || 'retailer')
                      ? participantData.participant_type
                      : null
                  }
                  name='type'
                  setValue={setValue}
                />
              </RhfWrapper>
            )
          }
          if (el.value === 'country') {
            return (
              <RhfWrapper>
                <RHFInput
                  as={
                    <Select style={{ width: '100%' }} placeholder={intl.get('supplyChain.selectCountry')} size='large'>
                      {preparedCountriesOptions.map(option => (
                        <Option key={option.value}>{option.label}</Option>
                      ))}
                    </Select>
                  }
                  register={register}
                  name='country'
                  setValue={setValue}
                />
              </RhfWrapper>
            )
          }
          if (el.value === 'address') {
            return (
              <RhfWrapperAddress>
                <RHFInput
                  as={<Input size='large' placeholder={intl.get('supplyChain.address')} />}
                  rules={{ required: true }}
                  name='address'
                  register={register}
                  setValue={setValue}
                  onChange={e => {
                    const { value } = e.target
                    validateValue(el, value)
                  }}
                />
                <Error errors={errors} destination={el.value} />
              </RhfWrapperAddress>
            )
          }
          return (
            <RhfWrapper>
              <RHFInput
                as={<Input size='large' placeholder={el.placeholder} />}
                register={register}
                rules={(el.value === 'name' || el.value === 'city') && { required: true }}
                name={el.value}
                setValue={setValue}
                onChange={e => {
                  const { value } = e.target
                  validateValue(el, value)
                }}
              />
              <Error errors={errors} destination={el.value} />
            </RhfWrapper>
          )
        })}
      </InputsWrapper>
      <ButtonsWrapper>
        <Button type='danger' size='large' onClick={() => history.push('/admin/track-and-trace/supply-chain')}>
          {intl.get('cancel')}
        </Button>
        <Button type='danger' size='large' onClick={handleSubmit(onSubmit)}>
          {intl.get('save')}
        </Button>
      </ButtonsWrapper>
    </Wrapper>
  )
}

SupplyChainEditParticipant.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  createOrUpdateParticipant: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  participantData: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  countries: PropTypes.array.isRequired
}

SupplyChainEditParticipant.defaultProps = {
  participantData: {}
}

export default withRouter(SupplyChainEditParticipant)
