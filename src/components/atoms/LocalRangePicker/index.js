import React, { useMemo } from 'react'
import { DatePicker, ConfigProvider } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'

const { RangePicker } = DatePicker

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

const LocalRangePicker = ({ onChange, disabledDate, disabled }) => {
  const currDateFormat = () => {
    moment.locale(momentLocales[currLocale])
    return moment.localeData().longDateFormat('L')
  }

  const currDateFormatValue = useMemo(() => currDateFormat(), [])

  return (
    <ConfigProvider locale={pickerLocales[currLocale]}>
      <RangePicker
        style={dropdownStyle}
        getCalendarContainer={trigger => trigger}
        disabledDate={disabledDate}
        locale={pickerLocales[currLocale]}
        onChange={onChange}
        format={currDateFormatValue}
        disabled={disabled}
      />
    </ConfigProvider>
  )
}

LocalRangePicker.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  disabledDate: PropTypes.func
}

LocalRangePicker.defaultProps = {
  onChange: null,
  disabled: false,
  disabledDate: null
}

export default LocalRangePicker
