import React, { useState, useCallback, useMemo } from 'react'
import intl from 'react-intl-universal'
import { Input, Form } from 'antd'
import PropTypes from 'prop-types'
import WidgetRemaining from '../WidgetRemaining'
import * as ST from './styles'

const { TextArea } = Input

const SendTimelineForm = ({ onChange }) => {
  const [value, setValue] = useState()
  const remainingValue = useMemo(() => {
    return 500 - ((value && value.length) || 0)
  }, [value])

  const handleOnChange = useCallback(event => {
    setValue(event.target.value)
    onChange(event.target.value)
  }, [])

  return (
    <ST.Wrapper>
      <ST.Header>{intl.get('users.timelineForm.header')}</ST.Header>
      <Form.Item label={intl.get('users.timelineForm.label')}>
        <WidgetRemaining value={remainingValue} top='-94px' />
        <TextArea
          placeholder={intl.get('users.timelineForm.placeholder')}
          rows={4}
          value={value}
          onChange={handleOnChange}
        />
      </Form.Item>
    </ST.Wrapper>
  )
}

SendTimelineForm.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default SendTimelineForm
