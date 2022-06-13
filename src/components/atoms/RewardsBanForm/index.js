import React, { useState, useCallback, useMemo } from 'react'
import intl from 'react-intl-universal'
import moment from 'moment'
import { Input, Form } from 'antd'
import PropTypes from 'prop-types'
import WidgetRemaining from '../WidgetRemaining'
import * as ST from './styles'
import LocalDatePicker from '../LocalDatePicker'

const { TextArea } = Input

const RewardsBanForm = ({ onChange }) => {
  const [value, setValue] = useState()
  const remainingValue = useMemo(() => {
    return 500 - ((value && value.reason && value.reason.length) || 0)
  }, [value])

  const disabledDate = useCallback(
    current => {
      return current && current < moment().startOf('day')
    },
    [moment]
  )

  const handleOnChange = useCallback(
    (val, key) => {
      const newValues = {
        ...value,
        [key]: val
      }
      setValue(newValues)
      onChange(newValues)
    },
    [value]
  )

  return (
    <ST.Wrapper>
      <ST.Header>{intl.get('users.rewardsBanForm.header')}</ST.Header>
      <Form.Item label={intl.get('users.rewardsBanForm.dateLabel')}>
        <LocalDatePicker
          style={{ width: '100%' }}
          disabledDate={disabledDate}
          dateValue={value && value.to}
          handleDatePickerChange={val => handleOnChange(val, 'to')}
        />
      </Form.Item>
      <Form.Item label={intl.get('users.rewardsBanForm.messageLabel')}>
        <WidgetRemaining value={remainingValue} top='-94px' />
        <TextArea
          placeholder={intl.get('users.rewardsBanForm.messagePlaceholder')}
          rows={4}
          value={value && value.reason}
          onChange={event => handleOnChange(event.target.value, 'reason')}
        />
      </Form.Item>
    </ST.Wrapper>
  )
}

RewardsBanForm.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default RewardsBanForm
