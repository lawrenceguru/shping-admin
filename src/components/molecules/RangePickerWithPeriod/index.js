import React from 'react'
import PropTypes from 'prop-types'
import { DatePicker } from 'antd'
import moment from 'moment'
import { currDateFormat } from '../../../utils/helpers/date'
import FooterPicker from '../../atoms/FooterPicker'

const { RangePicker } = DatePicker

const ranges = {
  Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
  'Last 7 days': [moment().subtract(7, 'days'), moment().subtract(1, 'days')],
  'Last 14 days': [moment().subtract(14, 'days'), moment().subtract(1, 'days')],
  'Last 30 days': [moment().subtract(30, 'days'), moment().subtract(1, 'days')],
  'This Week': [moment().startOf('week'), moment().subtract(1, 'days')],
  'Last Week': [
    moment()
      .subtract(1, 'weeks')
      .startOf('week'),
    moment()
      .subtract(1, 'weeks')
      .endOf('week')
  ],
  'This Month': [moment().startOf('month'), moment().subtract(1, 'days')],
  'Last Month': [
    moment()
      .subtract(1, 'months')
      .startOf('month'),
    moment()
      .subtract(1, 'months')
      .endOf('month')
  ]
}

const RangePickerWithPeriod = ({
  value,
  onChange,
  format,
  disabledDate,
  defaultValue,
  placeholder,
  isCurrDateDisabled
}) => {
  const currDateFormatValue = currDateFormat()
  return (
    <RangePicker
      value={value}
      onChange={onChange}
      format={format || currDateFormatValue}
      defaultValue={defaultValue}
      placeholder={placeholder}
      renderExtraFooter={() => <FooterPicker ranges={ranges} onChange={onChange} />}
      disabledDate={
        disabledDate ||
        (current =>
          isCurrDateDisabled &&
          current.format('YYYY-MM-DD') &&
          current.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD'))
      }
      allowClear={false}
    />
  )
}

RangePickerWithPeriod.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  format: PropTypes.string,
  defaultValue: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
  isCurrDateDisabled: PropTypes.bool,
  disabledDate: PropTypes.func
}

RangePickerWithPeriod.defaultProps = {
  value: [],
  onChange: null,
  format: '',
  defaultValue: [],
  placeholder: '',
  isCurrDateDisabled: false,
  disabledDate: null
}

export default RangePickerWithPeriod
