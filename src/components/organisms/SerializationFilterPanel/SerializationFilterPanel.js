import React, { useEffect, useCallback } from 'react'
import { Select, Button, Icon } from 'antd'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import moment from 'moment'
import { FilterBlock } from './styles'
import RangePickerWithPeriod from '../../molecules/RangePickerWithPeriod'

const { Option } = Select

const SerializationFilterPanel = ({
  serializationFilterAnalyticsSetRangeDates,
  serializationFilterAnalyticsGetSelectCustomer,
  context,
  myTeamGetContext,
  serializationFilterAnalyticsSetSelectRange,
  dateAs,
  fromDate,
  toDate,
  issuer,
  setModal
}) => {
  useEffect(() => {
    myTeamGetContext()
  }, [])

  const onChangeRange = value => {
    serializationFilterAnalyticsSetSelectRange(value)
  }

  const onChangeIssuer = value => {
    serializationFilterAnalyticsGetSelectCustomer(value)
  }

  const handleRangePickerChange = useCallback(dates => {
    if (dates && dates.length) {
      const formatDates = [dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD')]
      serializationFilterAnalyticsSetRangeDates(formatDates)
    }
  }, [])

  const disabledDate = currValue => moment().startOf('day') <= currValue.startOf('day')

  return (
    <FilterBlock>
      <div>
        <RangePickerWithPeriod
          value={[moment(fromDate), moment(toDate)]}
          onChange={handleRangePickerChange}
          disabledDate={disabledDate}
        />
        <Select
          showSearch
          style={{ width: 200 }}
          optionFilterProp='children'
          defaultValue={dateAs}
          value={dateAs}
          onChange={onChangeRange}
          getPopupContainer={trigger => trigger.parentNode}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option className='option' value='day'>
            {intl.get('overviewPage.daily')}
          </Option>
          <Option className='option' value='week'>
            {intl.get('overviewPage.weekly')}
          </Option>
          <Option value='month'>{intl.get('overviewPage.monthly')}</Option>
        </Select>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder={intl.get('overviewPage.selectBrand')}
          optionFilterProp='children'
          defaultValue={issuer}
          value={issuer}
          onChange={onChangeIssuer}
          getPopupContainer={trigger => trigger.parentNode}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option value='any'>{intl.get('overviewPage.issuer')}</Option>
          {context
            ? // eslint-disable-next-line react/destructuring-assignment
              context.map(customer => (
                <Option key={customer.participant_id} value={customer.participant_id}>
                  {customer.id && customer.id[0].toUpperCase() + customer.id.slice(1)}
                </Option>
              ))
            : null}
        </Select>
      </div>
      <div>
        <Button onClick={() => setModal(true)}>
          <Icon type='plus' />
          {intl.get('overviewPage.addWidgets')}
        </Button>
      </div>
    </FilterBlock>
  )
}

SerializationFilterPanel.propTypes = {
  fromDate: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
  setModal: PropTypes.func.isRequired,
  serializationFilterAnalyticsSetRangeDates: PropTypes.func.isRequired,
  serializationFilterAnalyticsGetSelectCustomer: PropTypes.func.isRequired,
  serializationFilterAnalyticsSetSelectRange: PropTypes.func.isRequired,
  issuer: PropTypes.string.isRequired,
  context: PropTypes.arrayOf(PropTypes.object),
  myTeamGetContext: PropTypes.func.isRequired,
  dateAs: PropTypes.string.isRequired
}

SerializationFilterPanel.defaultProps = {
  context: []
}
export default SerializationFilterPanel
