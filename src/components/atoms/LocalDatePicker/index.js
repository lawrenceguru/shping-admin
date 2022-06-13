import React from 'react'
import { DatePicker, ConfigProvider } from 'antd'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import moment from 'moment'

const pickerLocales = {
  en: 'enGB',
  ru: 'ruRU',
  zh: 'zhCN'
}

const momentLocales = {
  en: 'en',
  ru: 'ru',
  zh: 'zh-cn'
}

const currLocale = localStorage.getItem('lang')
const dropdownStyle = { fontFamily: 'Roboto', fontSize: 12, color: '#b3b3b3', flexBasis: '80%' }

const LocalDatePicker = ({
  dateValue,
  isCurrDateDisabled,
  handleDatePickerChange,
  placeholder,
  disabledDate,
  disabled,
  style
}) => {
  const currDateFormat = () => {
    const locale = window.navigator.language
    moment.locale(locale.toLowerCase())
    return moment.localeData().longDateFormat('L')
  }

  moment.locale(momentLocales[currLocale])
  const currDateFormatValue = currDateFormat()

  return (
    <ConfigProvider locale={pickerLocales[currLocale]}>
      <DatePicker
        value={dateValue ? moment(dateValue) : null}
        style={{ ...dropdownStyle, ...style }}
        getCalendarContainer={trigger => trigger}
        disabledDate={
          disabledDate ||
          (current =>
            isCurrDateDisabled &&
            current.format('YYYY-MM-DD') &&
            current.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD'))
        }
        placeholder={placeholder || intl.get('selectDate')}
        locale={placeholder}
        onChange={handleDatePickerChange}
        format={currDateFormatValue}
        disabled={disabled}
      />
    </ConfigProvider>
  )
}

LocalDatePicker.propTypes = {
  dateValue: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  isCurrDateDisabled: PropTypes.bool,
  handleDatePickerChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  disabledDate: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object
}

LocalDatePicker.defaultProps = {
  isCurrDateDisabled: false,
  handleDatePickerChange: null,
  placeholder: null,
  dateValue: null,
  disabled: false,
  disabledDate: null,
  style: {}
}

export default LocalDatePicker
