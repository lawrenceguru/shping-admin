import React, { useEffect } from 'react'
import intl from 'react-intl-universal'
import { withRouter } from 'react-router-dom'
import { RHFInput } from 'react-hook-form-input'
import { Input, Select } from 'antd'
import PropTypes from 'prop-types'
import useForm from 'react-hook-form'
import { inputs, inputsGenerator, optionsOrder } from './constants'
import { Wrapper, InputsWrapper, RhfWrapper, TextWrapper } from './styles'
import Error from '../../atoms/Error'

const { Option } = Select

const SerializationSSCCOptions = ({ setIsSubmit, serializationGetSSCCOptions, current, values }) => {
  const { register, triggerValidation, getValues, setValue, errors, setError, clearError, watch } = useForm()
  const allValues = watch()

  useEffect(() => {
    if (current === 0) {
      Object.keys(values).forEach(key => {
        setValue(key, values[key])
      })
    }
  }, [])

  if (Object.keys(errors).length) {
    if (errors.count) {
      setError('count', 'notMatch', intl.get('serializationTasks.serializationSSCCOptions.countError'))
    }
  }

  const handleValueChange = (field, value) => {
    const newValues = { ...allValues }
    newValues[field] = value
    setValue('values', newValues)
  }

  const validateValue = (el, value) => {
    if (el.value === 'count') {
      if (value !== '') return clearError(el.value)
      setError(el.value, 'notMatch', `${el.value} is required*`)
    }
    handleValueChange(el.value, value)
    return null
  }

  const onSubmit = val => {
    let validInputsValue = {}
    Object.keys(val).forEach(el => {
      if (val[el] !== '') {
        if (el === 'serial_number' && val.sequence === 'random') {
          return (validInputsValue = { ...validInputsValue, [el]: '' })
        }
        return (validInputsValue = { ...validInputsValue, [el]: val[el] })
      }
      return null
    })
    serializationGetSSCCOptions({ validInputsValue })
  }

  useEffect(() => {
    setIsSubmit({
      call: () =>
        new Promise(resolve => {
          triggerValidation().then(result => {
            if (result) {
              onSubmit(getValues())
              resolve()
            }
          })
        })
    })
  }, [])

  return (
    <Wrapper>
      <TextWrapper>
        <h2>{intl.get('serializationTasks.serializationSSCCOptions.firstStep.header')}</h2>
      </TextWrapper>
      <InputsWrapper>
        {inputs.map(el => {
          return (
            <RhfWrapper key={el.value}>
              <RHFInput
                as={<Input size='large' type='number' placeholder={el.placeholder} />}
                register={register}
                rules={el.value === 'count' && { required: true }}
                name={el.value}
                onKeyPress={e => {
                  if (e.key === '-' || e.key === '+') {
                    e.stopPropagation()
                    e.preventDefault()
                  }
                }}
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
        <TextWrapper>
          <h2>{intl.get('serializationTasks.codeGenerationSection')}</h2>
        </TextWrapper>
        {inputsGenerator.map(el => {
          if (el.value === 'sequence') {
            return (
              <RhfWrapper key={el.value}>
                <RHFInput
                  as={
                    <Select style={{ width: '100%' }} size='large' name='sequence'>
                      {optionsOrder.map(option => (
                        <Option key={option.value}>{option.label}</Option>
                      ))}
                    </Select>
                  }
                  register={register}
                  name='sequence'
                  setValue={setValue}
                />
                <Error errors={errors} destination={el.value} />
              </RhfWrapper>
            )
          }
          if (el.value === 'serial_number') {
            return (
              <RhfWrapper key={el.value}>
                <RHFInput
                  as={
                    <Input
                      size='large'
                      style={getValues().sequence === 'random' ? { display: 'none' } : {}}
                      placeholder={el.placeholder}
                    />
                  }
                  register={register}
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
          }
          return null
        })}
      </InputsWrapper>
    </Wrapper>
  )
}

SerializationSSCCOptions.propTypes = {
  setIsSubmit: PropTypes.bool.isRequired,
  serializationGetSSCCOptions: PropTypes.func.isRequired,
  current: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object
}

SerializationSSCCOptions.defaultProps = {
  values: null
}

export default withRouter(SerializationSSCCOptions)
