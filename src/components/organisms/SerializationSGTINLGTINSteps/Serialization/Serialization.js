import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { withRouter } from 'react-router-dom'
import { Input, Select, Checkbox, DatePicker } from 'antd'
import * as ST from './styles'
import { optionsType, optionsCode, optionsDataType, optionsOrder, attributeType } from './consts'
import Error from '../../../atoms/Error'
import CustomSelect from '../../../atoms/CustomSelect'
import { AdditionalSelectValidation, validateAdditionAttr, validateLength } from '../../../../utils/validation'
import IconButton from '../../../molecules/IconButton'
import Button from '../../../atoms/Button'
import ProductEditWidgetWrapper from '../../../atoms/ProductEditWidgetWrapper'
import SerializationStepsHeader from '../../../atoms/SerializationStepsHeader'

const { Option } = Select
const dropdownStyle = { fontFamily: 'Roboto', fontSize: 12, color: '#b3b3b3', width: '100%' }

const Serialization = ({ setIsSubmit, values, triggerValidation, setValue, errors, setError, clearError }) => {
  const checkFieldValues = () => {
    if (values && values.serialization && !values.serialization.count) {
      setError('serialization.count', 'notMatch', intl.get('validation.requiredField'))
    }
    if (values && values.serialization && values.serialization.format && !values.serialization.format.length) {
      setError('serialization.format', 'required', intl.get('validation.requiredField'))
    }
    if (values && values.serialization && values.serialization.type && !values.serialization.type.length) {
      setError('serialization.type', 'required', intl.get('validation.requiredField'))
    }
    if (values && values.serialization && values.serialization.sequence && !values.serialization.sequence.length) {
      setError('serialization.sequence', 'required', intl.get('validation.requiredField'))
    }
  }

  const getGap = actualValues => {
    let gap = 3
    if (actualValues && actualValues.serialization) {
      if (actualValues.serialization.Assign) {
        gap = 1
      }
      if (!actualValues.serialization.Assign && actualValues.serialization.Update) {
        gap = 2
      }
    }
    return gap
  }

  const onSubmit = () => {
    return values
  }

  const setNewValue = () => {
    setIsSubmit({
      call: () =>
        new Promise(resolve => {
          triggerValidation().then(result => {
            if (result) {
              onSubmit(values)
              resolve()
            }
          })
        }),
      gap: getGap
    })
  }

  useEffect(() => {
    checkFieldValues()
    triggerValidation()
    setNewValue()
    setValue('serialization', values.serialization)
  }, [])

  const handleValueChange = (field, value) => {
    const newValues = { ...values.serialization }
    newValues[field] = value
    setValue('serialization', newValues)
  }

  const validateValue = (value, el, i) => {
    const newValues = { ...values.serialization }
    newValues.AdditionalTypes[i][el] = value
    setValue('serialization', newValues)
  }

  const validateInputValue = (el, value) => {
    clearError(`serialization.${el}`)
    if (value === '') setError('serialization.count', 'notMatch', intl.get('validation.requiredField'))
    handleValueChange(el, value)
    return null
  }

  const validateSelectValue = el => {
    if (values.serialization[el] !== '') return clearError(`serialization.${el}`)
    return null
  }

  const processAddDelAttrib = (action, i) => {
    if (action === 'add') {
      const newSerializations = { ...values.serialization }
      newSerializations.AdditionalTypes = [...newSerializations.AdditionalTypes, { type: [], content: '' }]
      setValue(`serialization`, newSerializations)
    } else {
      const newSerializations = { ...values.serialization }
      newSerializations.AdditionalTypes.splice(i, 1)
      setValue(`serialization`, newSerializations)
    }
  }

  return (
    <ST.Wrapper>
      <SerializationStepsHeader firstHeaderText={intl.get('serializationTasks.serializationStep.secondStep.header')} />
      <ProductEditWidgetWrapper maxWidth='100%'>
        <ST.InputsWrapper>
          <ST.RhfWrapper>
            <CustomSelect
              size='large'
              placeholder={intl.get('serializationTasks.serializationStep.attributeType.placeholder')}
              handleValueChange={value => {
                validateSelectValue('type')
                handleValueChange('type', value)
              }}
              value={values && values.serialization && values.serialization.type}
            >
              {optionsType.map(option => (
                <Option key={option.value}>{option.label}</Option>
              ))}
            </CustomSelect>
            <Error errors={errors} destination='serialization.type' />
          </ST.RhfWrapper>
          <ST.RhfWrapper>
            <CustomSelect
              size='large'
              placeholder={intl.get('serializationTasks.serializationStep.secondStep.formatPlaceholder')}
              handleValueChange={value => {
                validateSelectValue('format')
                handleValueChange('format', value)
              }}
              value={values && values.serialization && values.serialization.format}
            >
              {optionsCode.map(option => (
                <Option key={option.value}>{option.label}</Option>
              ))}
            </CustomSelect>
            <Error errors={errors} destination='serialization.format' />
          </ST.RhfWrapper>
          <ST.RhfWrapper>
            <Input
              size='large'
              type='number'
              placeholder={intl.get('serializationTasks.serializationStep.secondStep.countPlaceholder')}
              value={values && values.serialization && values.serialization.count}
              onChange={e => {
                const { value } = e.target
                validateInputValue('count', value)
              }}
            />
            <Error errors={errors} destination='serialization.count' />
          </ST.RhfWrapper>
        </ST.InputsWrapper>
        <ST.WrapperText>
          <h1>{intl.get('serializationTasks.serializationStep.secondStep.contentSection')}</h1>
        </ST.WrapperText>
        <ST.InputsWrapper>
          <ST.RhfWrapper>
            <CustomSelect
              size='large'
              placeholder={intl.get('serializationTasks.serializationStep.secondStep.dataTypePlaceholder')}
              handleValueChange={value => {
                handleValueChange('data_type', value)
              }}
              value={values && values.serialization && values.serialization.data_type}
            >
              {optionsDataType.map(option => (
                <Option key={option.value}>{option.label}</Option>
              ))}
            </CustomSelect>
            <Error errors={errors} destination='serialization.data_type' />
          </ST.RhfWrapper>
          <ST.RhfWrapper>
            <Input
              size='large'
              type='number'
              placeholder={intl.get('serializationTasks.serializationStep.secondStep.lengthPlaceholder')}
              value={values && values.serialization && values.serialization.length}
              onChange={e => {
                const { value } = e.target
                validateLength('length', value, 20, setValue, handleValueChange)
              }}
            />
            <Error errors={errors} destination='serialization.length' />
          </ST.RhfWrapper>
        </ST.InputsWrapper>
        <ST.WrapperText>
          <h1>{intl.get('serializationTasks.serializationStep.secondStep.additionalSection')}</h1>
        </ST.WrapperText>
        {values &&
          values.serialization &&
          values.serialization.AdditionalTypes &&
          values.serialization.AdditionalTypes.map((el, i) => {
            return (
              <ST.InputsWrapper>
                <ST.RhfWrapper>
                  <Select
                    style={{ width: '100%' }}
                    size='large'
                    value={el.type}
                    placeholder={intl.get('serializationTasks.serializationStep.attributeType.placeholder')}
                    onChange={value => {
                      const newSerializations = { ...values.serialization }
                      newSerializations.AdditionalTypes[i].type = value
                      setValue('serialization', newSerializations)
                    }}
                  >
                    {attributeType(1).map(option => (
                      <Option key={option.value}>{option.label}</Option>
                    ))}
                  </Select>
                  <Error errors={errors} destination='serialization.AddType' />
                </ST.RhfWrapper>
                {AdditionalSelectValidation(values, i) ? (
                  <ST.AdditionalWrapper>
                    <ST.RhfAdditionalWrapper>
                      <DatePicker
                        style={dropdownStyle}
                        size='large'
                        placeholder={intl.get('serializationTasks.serializationStep.secondStep.datePlaceholder')}
                        format={null}
                        onChange={date => validateValue(date, 'content', i)}
                      />
                      <Error errors={errors} destination={`serialization.AdditionalTypes[${i}].content`} />
                    </ST.RhfAdditionalWrapper>
                    <IconButton
                      type='Delete'
                      styleParam={{ fontSize: 40 }}
                      actionFunction={() => processAddDelAttrib('del')}
                    />
                  </ST.AdditionalWrapper>
                ) : (
                  <ST.AdditionalWrapper>
                    <ST.RhfAdditionalWrapper>
                      <Input
                        size='large'
                        disabled={
                          values &&
                          values.serialization.AdditionalTypes &&
                          values.serialization.AdditionalTypes[i].type &&
                          !values.serialization.AdditionalTypes[i].type.length
                        }
                        value={
                          values &&
                          values.serialization &&
                          values.serialization.AdditionalTypes &&
                          values.serialization.AdditionalTypes[i].content
                        }
                        onChange={e => {
                          const { value } = e.target
                          validateAdditionAttr(
                            'content',
                            value,
                            values,
                            setError,
                            clearError,
                            setValue,
                            validateValue,
                            i
                          )
                        }}
                      />
                      <Error errors={errors} destination={`serialization.AdditionalTypes[${i}].content`} />
                    </ST.RhfAdditionalWrapper>
                    <IconButton
                      type='Delete'
                      styleParam={{ fontSize: 40 }}
                      actionFunction={() => processAddDelAttrib('del', i)}
                    />
                  </ST.AdditionalWrapper>
                )}
              </ST.InputsWrapper>
            )
          })}
        <ST.ButtonWrapper>
          <Button className='load-more-btn' onClick={() => processAddDelAttrib('add')}>
            {intl.get('serializationTasks.serializationStep.secondStep.addMore')}
          </Button>
        </ST.ButtonWrapper>
        <ST.WrapperText>
          <h1>{intl.get('serializationTasks.codeGenerationSection')}</h1>
        </ST.WrapperText>
        <ST.InputsWrapper>
          <ST.RhfWrapper>
            <CustomSelect
              style={{ width: '100%' }}
              size='large'
              name='serialization.sequence'
              placeholder={intl.get('serializationTasks.serializationStep.secondStep.sequencePlaceholder')}
              handleValueChange={value => {
                validateSelectValue('sequence')
                handleValueChange('sequence', value)
              }}
              value={values && values.serialization && values.serialization.sequence}
            >
              {optionsOrder.map(option => (
                <Option key={option.value}>{option.label}</Option>
              ))}
            </CustomSelect>
            <Error errors={errors} destination='serialization.sequence' />
          </ST.RhfWrapper>
        </ST.InputsWrapper>
        <ST.CheckboxWrapper>
          <ST.RhfWrapper>
            <Checkbox
              value={values && values.serialization && values.serialization.Assign}
              onChange={e => {
                const { checked } = e.target
                handleValueChange('Assign', checked)
              }}
              defaultChecked={values && values.serialization && values.serialization.Assign}
            >
              {intl.get('serializationTasks.serializationStep.secondStep.assignCheckboxText')}
            </Checkbox>
            <Error errors={errors} destination='serialization.Assign' />
          </ST.RhfWrapper>
          <ST.RhfWrapper>
            <Checkbox
              value={values && values.serialization && values.serialization.Update}
              onChange={e => {
                const { checked } = e.target
                handleValueChange('Update', checked)
              }}
              defaultChecked={values && values.serialization && values.serialization.Update}
            >
              {intl.get('serializationTasks.serializationStep.secondStep.updateCheckboxText')}
            </Checkbox>
            <Error errors={errors} destination='serialization.Update' />
          </ST.RhfWrapper>
        </ST.CheckboxWrapper>
      </ProductEditWidgetWrapper>
    </ST.Wrapper>
  )
}

Serialization.propTypes = {
  setIsSubmit: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  triggerValidation: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object
}

Serialization.defaultProps = {
  values: {},
  errors: {}
}

export default withRouter(Serialization)
