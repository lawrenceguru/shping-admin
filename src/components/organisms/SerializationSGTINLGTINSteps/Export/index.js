import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Form, Select } from 'antd'
import ProductEditWidgetWrapper from '../../../atoms/ProductEditWidgetWrapper'
import CustomSelect from '../../../atoms/CustomSelect'
import RadioGroup from '../../../atoms/RadioGroup'
import SerializationStepsHeader from '../../../atoms/SerializationStepsHeader'
import { FieldsWrapper, Row } from './styles'

const YesOrNow = [
  {
    label: intl.get('yes'),
    value: 'yes'
  },
  {
    label: intl.get('no'),
    value: 'no'
  }
]
const RADIO_GROUP = [
  { label: '|', value: '|' },
  { label: ',', value: ',' },
  { label: 'tab', value: 'tab' },
  { label: ';', value: ';' }
]
const { Option } = Select

const Export = ({ setValue, values, setIsSubmit, triggerValidation }) => {
  const onSubmit = () => {
    if (values && values.select && values.select.gtin) {
      return values.select.gtin
    }
    return null
  }

  useEffect(() => {
    setIsSubmit({
      call: () =>
        new Promise(resolve => {
          triggerValidation().then(result => {
            if (result) {
              onSubmit(values)
              resolve()
            }
          })
        })
    })
  }, [])

  const handleValueChange = (field, value) => {
    const newSettings = { ...values.settings }
    newSettings[field] = value.slice(0, -1)
    setValue('settings', newSettings)
  }

  return (
    <>
      <SerializationStepsHeader firstHeaderText={intl.get('serializationTasks.serializationStep.fifthStep.header')} />
      <ProductEditWidgetWrapper maxWidth='100%'>
        <FieldsWrapper>
          <Row>
            <Form.Item label={intl.get('serializationTasks.serializationStep.finalStep.name')}>
              <CustomSelect
                value={values && values.settings && values.settings.name}
                handleValueChange={value => {
                  handleValueChange('name', value)
                }}
              >
                {YesOrNow.map(el => (
                  <Option style={{ fontSize: 16 }} key={`${el.value}1`}>
                    {el.label}
                  </Option>
                ))}
              </CustomSelect>
            </Form.Item>
            <Form.Item label={intl.get('serializationTasks.serializationStep.finalStep.owner')}>
              <CustomSelect
                value={values && values.settings && values.settings.owner}
                handleValueChange={value => {
                  handleValueChange('owner', value)
                }}
              >
                {YesOrNow.map(el => (
                  <Option style={{ fontSize: 16 }} key={`${el.value}1`}>
                    {el.label}
                  </Option>
                ))}
              </CustomSelect>
            </Form.Item>
          </Row>
          <Row>
            <Form.Item label={intl.get('serializationTasks.serializationStep.finalStep.GS1inCsv')}>
              <CustomSelect
                value={values && values.settings && values.settings.code}
                handleValueChange={value => {
                  handleValueChange('code', value)
                }}
              >
                {YesOrNow.map(el => (
                  <Option style={{ fontSize: 16 }} key={`${el.value}1`}>
                    {el.label}
                  </Option>
                ))}
              </CustomSelect>
            </Form.Item>
            <Form.Item label={intl.get('serializationTasks.serializationStep.finalStep.labelsAsTitles')}>
              <CustomSelect
                value={values && values.settings && values.settings.labels_as_titles}
                handleValueChange={value => {
                  handleValueChange('labels_as_titles', value)
                }}
              >
                {YesOrNow.map(el => (
                  <Option style={{ fontSize: 16 }} key={`${el.value}1`}>
                    {el.label}
                  </Option>
                ))}
              </CustomSelect>
            </Form.Item>
          </Row>
          <Row>
            <Form.Item label={intl.get('serializationTasks.serializationStep.finalStep.delimiter')}>
              <RadioGroup
                value={values && values.settings && values.settings.delimiter}
                onChange={e => {
                  handleValueChange('delimiter', e.target.value)
                }}
                group={RADIO_GROUP}
              />
            </Form.Item>
          </Row>
        </FieldsWrapper>
      </ProductEditWidgetWrapper>
    </>
  )
}

Export.propTypes = {
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  triggerValidation: PropTypes.func.isRequired,
  setIsSubmit: PropTypes.func.isRequired
}

Export.defaultProps = {
  values: {}
}

export default Export
