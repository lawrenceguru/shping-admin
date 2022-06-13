import React, { useMemo, useState, useEffect } from 'react'
import { Input, Select } from 'antd'
import { RHFInput } from 'react-hook-form-input'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagic } from '@fortawesome/free-solid-svg-icons'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { StyledError } from '../../atoms/ProductEditInfoWidget/styles'
import CustomInputNumber from '../CustomInputNumber'

const BarcodeInputs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const FieldsWrapper = styled.div`
  flex-basis: 90%;
  display: flex;
  flex-direction: column;
`

const InputFieldsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  & > input:not(:first-child),
  & > div:not(:first-child) {
    margin-left: 5px;
  }
`

const MagicStick = styled.div`
  flex-basis: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
`

const { Option } = Select
const BARCODE_LENGTH = 14
const flagCodeLength = 1

const BarcodeBuilderInput = ({
  register,
  setValue,
  companyPrefix,
  values,
  errors,
  setError,
  clearError,
  addComputedCheckValue
}) => {
  const [isOneTextInput, setIsOneTextInput] = useState(false)
  const [isParticipantExpert, setIsParticipantExpert] = useState(false)

  const prodCodeLength = useMemo(() => {
    return isParticipantExpert ? 12 : 12 - values.mainInfo.barcodeNumber.comPrefix.length
  }, [values])

  useEffect(() => {
    register({ name: 'mainInfo.barcodeNumber.comPrefix' })
    register({ name: 'mainInfo.barcodeNumber.prodCode' })
    register({ name: 'mainInfo.barcodeNumber.checkDigit' })
    register({ name: 'mainInfo.barcodeNumber.enteredCheckDigit' })
    register({ name: 'mainInfo.isOneTextInput' })
  }, [register])

  const clearErrors = () => {
    clearError('mainInfo.barcodeNumber.id')
    clearError('mainInfo.barcodeNumber.comPrefix')
    clearError('mainInfo.barcodeNumber.prodCode')
  }

  useEffect(() => {
    if (!isOneTextInput && values.mainInfo.barcodeNumber.flag.length < 1) {
      setError('mainInfo.barcodeNumber.prodCode', 'notMatch', intl.get('validation.wrongFlag', { flagCodeLength }))
    }

    if (!isOneTextInput && values.mainInfo.barcodeNumber.prodCode.length < prodCodeLength) {
      setError('mainInfo.barcodeNumber.prodCode', 'notMatch', intl.get('validation.wrongProdCode', { prodCodeLength }))
    }

    if (
      errors['mainInfo.barcodeNumber.id'] &&
      errors['mainInfo.barcodeNumber.id'].message === intl.get('validation.wrongCheckGtin')
    ) {
      clearError('mainInfo.barcodeNumber.id')
    }

    if (
      isOneTextInput &&
      values.mainInfo.barcodeNumber.enteredCheckDigit.toString() !== values.mainInfo.barcodeNumber.checkDigit.toString()
    ) {
      setError('mainInfo.barcodeNumber.id', 'notMatch', intl.get('validation.wrongCheckGtin'))
    }

    if (
      isOneTextInput &&
      values.mainInfo.barcodeNumber.id.length < BARCODE_LENGTH &&
      !errors['mainInfo.barcodeNumber.id']
    ) {
      if (values.mainInfo.barcodeNumber.id.length === 13 && values.mainInfo.barcodeNumber.enteredCheckDigit) {
        return
      }
      setError(
        'mainInfo.barcodeNumber.id',
        'notMatch',
        intl.get('validation.tooShortValue', { number: BARCODE_LENGTH })
      )
    }
  }, [values])

  useEffect(() => {
    setValue('mainInfo.isOneTextInput', isOneTextInput)
    if (isOneTextInput && values.mainInfo.barcodeNumber.checkDigit) {
      setValue('mainInfo.barcodeNumber.enteredCheckDigit', values.mainInfo.barcodeNumber.checkDigit)
    }
    clearErrors()
  }, [isOneTextInput])

  useEffect(() => {
    if (companyPrefix && companyPrefix[0] === '*') {
      setIsParticipantExpert(true)
    } else {
      setIsParticipantExpert(false)
    }
  }, [companyPrefix])

  const validateEnteredId = value => {
    clearError('mainInfo.barcodeNumber.id')

    if (value === '') {
      setError('mainInfo.barcodeNumber.id', 'notMatch', intl.get('validation.requiredField'))
      return false
    }
    if (!value.startsWith('0')) {
      setError('mainInfo.barcodeNumber.id', 'notMatch', intl.get('validation.wrongFirstCharacter'))
      return false
    }
    if (!isParticipantExpert) {
      const containedComPrefix = companyPrefix.find(el => value.substr(1).startsWith(el))
      if (!containedComPrefix) {
        setError('mainInfo.barcodeNumber.id', 'notMatch', intl.get('validation.wrongComPrefix'))
        return false
      }
      setValue('mainInfo.barcodeNumber.comPrefix', containedComPrefix)

      const enteredProdCodeValue = value.slice(1 + containedComPrefix.length, BARCODE_LENGTH)
      if (enteredProdCodeValue && value.length < BARCODE_LENGTH) {
        setValue('mainInfo.barcodeNumber.prodCode', enteredProdCodeValue)
      }
    }
    return true
  }

  // eslint-disable-next-line consistent-return
  const decomposeEnteredId = value => {
    clearError('mainInfo.barcodeNumber.id')
    const enteredCheckDigit = value.charAt(13)

    if (enteredCheckDigit) {
      setValue('mainInfo.barcodeNumber.enteredCheckDigit', enteredCheckDigit)
    } else {
      setValue('mainInfo.barcodeNumber.enteredCheckDigit', '')
    }
    let prodCode = value.substr(1, 12)
    if (isParticipantExpert) {
      setValue('mainInfo.barcodeNumber.prodCode', prodCode)
    } else {
      const containedComPrefix = companyPrefix.find(el => prodCode.startsWith(el))
      if (containedComPrefix) {
        setValue('mainInfo.barcodeNumber.comPrefix', containedComPrefix)
        prodCode = prodCode.substring(containedComPrefix.length)
        setValue('mainInfo.barcodeNumber.prodCode', prodCode)
      } else {
        setValue('mainInfo.barcodeNumber.prodCode', '')
      }
    }
    if (value.length === BARCODE_LENGTH) {
      if (enteredCheckDigit !== values.mainInfo.barcodeNumber.checkDigit.toString()) {
        setError('mainInfo.barcodeNumber.id', 'notMatch', intl.get('validation.wrongCheckGtin'))
        return false
      }
      return false
    }
  }

  return (
    <BarcodeInputs>
      {!isOneTextInput ? (
        <FieldsWrapper>
          <InputFieldsWrapper>
            <RHFInput
              as={<CustomInputNumber size='large' />}
              rules={{ required: true }}
              name='mainInfo.barcodeNumber.flag'
              length={flagCodeLength}
              register={register}
              value={values.mainInfo.barcodeNumber.flag}
              setValue={setValue}
              onChange={() => clearError('mainInfo.barcodeNumber.prodCode')}
              style={{ flexBasis: '15%', flexShrink: 0, maxWidth: '15%' }}
            />
            <RHFInput
              as={<Select size='large' type='number' />}
              name='mainInfo.barcodeNumber.comPrefix'
              register={register}
              defaultValue={isParticipantExpert ? '' : companyPrefix[0]}
              setValue={setValue}
              style={{ flexBasis: '30%', display: isParticipantExpert ? 'none' : 'block', flexShrink: 0 }}
              value={values.mainInfo.barcodeNumber.comPrefix}
              onChange={value => {
                clearError('barCode')
                setValue('mainInfo.barcodeNumber.comPrefix', value)
                setValue('mainInfo.barcodeNumber.prodCode', '')
              }}
              disabled={companyPrefix.length < 2}
            >
              {companyPrefix
                ? companyPrefix.map(el => (
                    <Option style={{ fontSize: 18 }} key={el} value={el}>
                      {el}
                    </Option>
                  ))
                : null}
            </RHFInput>
            <RHFInput
              as={
                <Input
                  size='large'
                  type='number'
                  onKeyPress={e => {
                    if (e.target.value.length === prodCodeLength || e.key === '-' || e.key === '+') {
                      e.stopPropagation()
                      e.preventDefault()
                    }
                  }}
                />
              }
              name='mainInfo.barcodeNumber.prodCode'
              onChange={e => {
                clearError('mainInfo.barcodeNumber.prodCode')
                const value = e.target.value.trim()
                if (value === '' || value.length < prodCodeLength) {
                  setError(
                    'mainInfo.barcodeNumber.prodCode',
                    'notMatch',
                    intl.get('validation.wrongProdCode', { prodCodeLength })
                  )
                }
              }}
              register={register}
              setValue={setValue}
              disabled={!prodCodeLength}
              style={{ flexGrow: '1' }}
              value={values.mainInfo.barcodeNumber.prodCode}
            />
            <RHFInput
              as={<Input size='large' type='number' disabled />}
              name='mainInfo.barcodeNumber.checkDigit'
              register={register}
              setValue={setValue}
              style={{ flexBasis: '15%', maxWidth: '15%' }}
              value={values.mainInfo.barcodeNumber.checkDigit}
            />
          </InputFieldsWrapper>
          <StyledError style={{ visibility: errors['mainInfo.barcodeNumber.prodCode'] ? 'visible' : 'hidden' }}>
            {errors['mainInfo.barcodeNumber.prodCode'] && errors['mainInfo.barcodeNumber.prodCode'].message}
          </StyledError>
        </FieldsWrapper>
      ) : (
        <FieldsWrapper>
          <RHFInput
            as={<Input size='large' type='number' />}
            rules={{ required: true }}
            name='mainInfo.barcodeNumber.id'
            onKeyPress={e => {
              if (e.target.value.length === BARCODE_LENGTH || e.key === '-' || e.key === '+') {
                e.stopPropagation()
                e.preventDefault()
              }
            }}
            register={register}
            setValue={setValue}
            value={values.mainInfo.barcodeNumber.id}
            onChange={e => {
              clearError('mainInfo.barcodeNumber.id')
              const { value } = e.target
              validateEnteredId(value.trim())
              decomposeEnteredId(value.trim())
            }}
          />
          <StyledError style={{ visibility: errors['mainInfo.barcodeNumber.id'] ? 'visible' : 'hidden' }}>
            {errors['mainInfo.barcodeNumber.id'] && errors['mainInfo.barcodeNumber.id'].message}
          </StyledError>
        </FieldsWrapper>
      )}
      <MagicStick>
        <FontAwesomeIcon
          style={{ fontSize: 30, cursor: 'pointer', color: 'rgb(178,179,178)', ':hover': { color: 'inherit' } }}
          icon={faMagic}
          onClick={() => {
            if (isOneTextInput) {
              addComputedCheckValue()
            }
            setIsOneTextInput(!isOneTextInput)
          }}
        />
      </MagicStick>
    </BarcodeInputs>
  )
}

BarcodeBuilderInput.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  companyPrefix: PropTypes.arrayOf(PropTypes.string),
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object.isRequired,
  setError: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  triggerValidation: PropTypes.func.isRequired,
  addComputedCheckValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired
}

BarcodeBuilderInput.defaultProps = {
  companyPrefix: []
}

export default BarcodeBuilderInput
