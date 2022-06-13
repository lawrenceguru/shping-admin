import React from 'react'
import intl from 'react-intl-universal'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { WidgetTemplate } from '../../../styles'
import GraphHeader from '../../molecules/GraphHeader'

const Block = styled.div`
  border-radius: 0 0 6px 6px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
  height: 100%;
  background-color: #fff;

  .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .DayPicker-Day {
    font-size: 0.7rem !important;
    border-radius: 0 !important;
  }
  .DayPicker-Weekday {
    font-size: 0.725em;
    @media (max-width: 1650px) {
      font-size: 0.625em;
    }
  }
  .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
`

const Body = styled.div`
  display: flex;
  height: 100%;
  max-width: 100%;
  justify-content: center;
  padding-top: 1rem;
  overflow: hidden;
  @media (max-width: 1650px) {
    padding-top: 0rem;
    margin-top: -2rem;
    flex-direction: column;
  }
`

const RoiCalendar = ({ dataIndex, selectFirstDate, selectSecondDate, setItem, ...props }) => {
  const from = new Date(selectFirstDate)
  const to = new Date(selectSecondDate)

  const [fromYear, fromMonth] = selectFirstDate.split('-')
  const [toYear, toMonth] = selectSecondDate.split('-')
  const isSameMonth = fromYear === toYear && fromMonth === toMonth

  const getNextMonth = () => {
    const nextMonth = new Date(selectSecondDate)
    nextMonth.setDate(1)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    return nextMonth
  }

  return (
    <Block {...props}>
      <WidgetTemplate>
        <GraphHeader name={intl.get('roiPage.definedPeriod')} setItem={setItem} />
      </WidgetTemplate>

      <Body>
        <DayPicker
          month={from}
          selectedDays={[from, { from, to }]}
          disabledDays
          modifiers={{ start: from, end: to }}
          canChangeMonth={false}
        />

        {isSameMonth ? (
          <DayPicker selectedDays={[]} month={getNextMonth()} disabledDays canChangeMonth={false} />
        ) : (
          <DayPicker
            selectedDays={[from, { from, to }]}
            disabledDays
            modifiers={{ start: from, end: to }}
            canChangeMonth={false}
            month={to}
          />
        )}
      </Body>
    </Block>
  )
}

RoiCalendar.propTypes = {
  dataIndex: PropTypes.string,
  selectFirstDate: PropTypes.string.isRequired,
  selectSecondDate: PropTypes.string.isRequired,
  setItem: PropTypes.func.isRequired
}

RoiCalendar.defaultProps = {
  dataIndex: null
}

export default RoiCalendar
