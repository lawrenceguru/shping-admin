import React, { useState } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Form } from 'antd'
import RadioGroup from '../RadioGroup'

const OrientationForm = ({ defaultValue, onChange, radioOptions }) => {
  const [value, setValue] = useState(defaultValue)

  return (
    <Form.Item label={intl.get('overviewPage.pdf.orientation')}>
      <RadioGroup
        value={value}
        group={radioOptions}
        isButtons
        onChange={event => {
          setValue(event.target.value)
          onChange(event.target.value)
        }}
      />
    </Form.Item>
  )
}

OrientationForm.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  radioOptions: PropTypes.arrayOf(PropTypes.object)
}

OrientationForm.defaultProps = {
  defaultValue: 'p',
  radioOptions: []
}

export default OrientationForm
