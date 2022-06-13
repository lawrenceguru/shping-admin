import React, { useCallback, useMemo } from 'react'
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

const LocalDatePicker = ({ onChange, placeholder, disabledDate, disabled, style }) => {
  const currDateFormat = useCallback(() => {
    moment.locale(momentLocales[currLocale])
    return moment.localeData().longDateFormat('L')
  }, [currLocale])

  const currDateFormatValue = useMemo(() => currDateFormat(), [currDateFormat])

  return (
    <ConfigProvider locale={pickerLocales[currLocale]}>
      <DatePicker
        style={{ ...dropdownStyle, ...style }}
        getCalendarContainer={trigger => trigger}
        disabledDate={disabledDate}
        placeholder={placeholder || intl.get('selectDate')}
        locale={pickerLocales[currLocale]}
        onChange={onChange}
        format={currDateFormatValue}
        disabled={disabled}
      />
    </ConfigProvider>
  )
}

LocalDatePicker.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  disabledDate: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object
}

LocalDatePicker.defaultProps = {
  onChange: null,
  placeholder: null,
  disabled: false,
  disabledDate: null,
  style: {}
}

export default LocalDatePicker
