import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Form, Input } from 'antd'

const UNSUPPORTED_CHARS = ['+', '-', '.', ',', 'e']

const BudgetForm = ({ onChange, defaultValue, isRequired }) => {
  const [budget, setBudget] = useState(defaultValue)
  const handleOnChange = useCallback(
    value => {
      if (Number(value) < 0) return
      setBudget(value)
      onChange(value)
    },
    [budget, onChange]
  )

  useEffect(() => {
    setBudget(defaultValue)
  }, [defaultValue])

  return (
    <Form.Item required={isRequired} key='budget' label={intl.get('customer.dialog.setBudget')}>
      <Input
        size='large'
        type='number'
        value={budget}
        onChange={event => handleOnChange(event.target.value)}
        onKeyPress={e => {
          if (UNSUPPORTED_CHARS.includes(e.key)) {
            e.stopPropagation()
            e.preventDefault()
          }
        }}
      />
    </Form.Item>
  )
}

BudgetForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  defaultValue: PropTypes.number
}

BudgetForm.defaultProps = {
  defaultValue: 0,
  isRequired: false
}

export default BudgetForm
