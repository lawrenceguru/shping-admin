import React, { useCallback } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'
import styled from 'styled-components'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { getMomentLocale, getDatePickerLocale } from '../../../utils/helpers/date'

const Wrapper = styled.div``

moment.locale(getMomentLocale())

const DatePickerSelectFewDates = ({ value, size, onChange, placeholder, disabled, format, style }) => {
  const handleOnChange = useCallback(
    (event, newValue) => {
      event.preventDefault()
      event.stopPropagation()

      if (onChange) {
        const stringValue = newValue.format('YYYY-MM-DD')
        const values =
          value && value.length !== 0 && value.includes(stringValue)
            ? value.filter(item => item !== stringValue)
            : [...value, stringValue]
        onChange(values)
      }
    },
    [value]
  )

  return (
    <DatePicker
      value={null}
      defaultValue={null}
      dateRender={current => {
        const styles = {}

        if (value && value.includes(current.format('YYYY-MM-DD'))) {
          styles.color = '#fff'
          styles.background = '#1890ff'
          styles.border = '1px solid transparent'
        }

        return (
          <Wrapper onClick={event => handleOnChange(event, current)} className='ant-calendar-date' style={styles}>
            {current.date()}
          </Wrapper>
        )
      }}
      style={style}
      getCalendarContainer={trigger => trigger}
      placeholder={placeholder || intl.get('selectDate')}
      format={format}
      locale={getDatePickerLocale()}
      size={size}
      disabled={disabled}
    />
  )
}

DatePickerSelectFewDates.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  format: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  size: PropTypes.string
}

DatePickerSelectFewDates.defaultProps = {
  value: null,
  placeholder: null,
  onChange: null,
  disabled: false,
  format: null,
  style: null,
  size: 'middle'
}

export default DatePickerSelectFewDates
