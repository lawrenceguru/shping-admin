import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import intl from 'react-intl-universal'
import { Form, Select as AntdSelect } from 'antd'
import Select from '../../atoms/CustomSelect'
import InputNumber from '../CustomInputNumber'
import { options, fields } from './consts'

const Header = styled.h3`
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 900;
  font-family: Roboto;
  color: rgba(0, 0, 0, 0.85);
`

const { Option } = AntdSelect

const RewardsFeeForm = ({ onChange, defaultValues }) => {
  const [values, setValues] = useState({ ...defaultValues })
  const handleOnChange = useCallback(
    (value, key) => {
      setValues({
        ...values,
        [key]: value
      })
      onChange({
        ...values,
        [key]: value
      })
    },
    [values, onChange]
  )
  return (
    <>
      <Header>{intl.get('customer.dialog.rewardsFeeHeader')}</Header>
      {fields.map(field =>
        field !== 'feeValue' ? (
          <Form.Item key={field} label={intl.get(`customer.form.${field}.label`)}>
            <Select
              value={values[field]}
              placeholder={intl.get(`customer.form.${field}.placeholder`)}
              handleValueChange={value => handleOnChange(value, field)}
            >
              {options[field] &&
                options[field].length &&
                options[field].map(item => (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        ) : (
          <Form.Item key='feeValue' label={intl.get('customer.form.feeValue.label')}>
            <InputNumber
              value={values.value}
              onChange={event => handleOnChange(event.target.value, 'value')}
              placeholder={intl.get('customer.form.feeValue.placeholder')}
            />
          </Form.Item>
        )
      )}
    </>
  )
}

RewardsFeeForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  defaultValues: PropTypes.object
}

RewardsFeeForm.defaultProps = {
  defaultValues: {}
}
export default RewardsFeeForm
