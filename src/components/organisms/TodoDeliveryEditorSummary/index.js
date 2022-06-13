import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Summary, Item, Section } from '../../molecules/Summury'
import { RADIO_GROUP_GENDER } from '../../pages/TodoDeliveryEditor/consts'

const Wrapper = styled.div`
  margin-top: 25px;
  display: flex;
  position: sticky;
  top: 110px;
  height: fit-content;
  flex-basis: 30%;
}
`

const TodoDeliveryEditorSummary = ({ values }) => {
  const renderIntervals = (firstValue, secondValue) => {
    let fromValue = '∞'
    let toValue = '∞'
    if (firstValue) {
      fromValue = firstValue
    }
    if (secondValue) {
      toValue = secondValue
    }
    return `${fromValue} - ${toValue}`
  }

  const renderStringFromArray = array => {
    let result = ''
    if (array && array.length) {
      array.forEach((item, index) => {
        if (index + 1 !== array.length) {
          result += `${item}, `
        } else {
          result += `${item}`
        }
      })
    }
    return result
  }

  const renderAgeInterval = (startAge, endAge) => {
    let result = 'None'
    if (!startAge && endAge) {
      result = `${endAge !== 75 ? `${endAge} y.o.` : '∞'} and Younger`
    } else if (startAge && endAge) {
      result = `${startAge} y.o. - ${endAge !== 75 ? `${endAge} y.o.` : '∞'}`
    }

    return result
  }

  const renderDelayMode = mode => {
    if (mode === 'delayPast' || mode === 'delay') {
      return intl.get('todo.deliveries.form.deliveryMode.inPast')
    }

    if (mode === 'immediate') {
      return intl.get('todo.deliveries.form.deliveryMode.immediate')
    }

    return mode === 'delay' || mode === 'delayed' ? intl.get('todo.deliveries.form.deliveryMode.inFuture') : ''
  }

  const renderGender = gender => {
    let labelGender
    if (gender) {
      labelGender = RADIO_GROUP_GENDER.filter(element => element.value === gender).map(element => element.label)
    } else {
      labelGender = RADIO_GROUP_GENDER.filter(element => element.value === 'any').map(element => element.label)
    }
    return labelGender
  }
  return (
    <Wrapper>
      <Summary header={intl.get('todo.deliveries.form.summaryTitle')}>
        <Section>
          <Item label={intl.get('todo.deliveries.form.summaryNameLabel')} value={values.name} />
        </Section>
        <Section>
          <Item label={intl.get('todo.deliveries.form.summaryCardLabel')} value={values && values.card_name} />
          {values.budget && (
            <Item label={intl.get('todo.deliveries.form.summaryBudgetLabel')} value={`${values.budget} SHPING`} />
          )}
          <Item
            label={intl.get('todo.deliveries.form.summaryDatesLabel')}
            value={values && renderIntervals(values.start_date, values.end_date)}
          />
        </Section>
        <Section>
          <Item
            label={intl.get('todo.deliveries.form.summaryDeliveryLabel')}
            value={renderDelayMode(values && values.mode)}
          />
          {(values.mode === 'delay' || values.mode === 'delayPast') && values.start_offset && (
            <Item
              label={intl.get('todo.deliveries.form.numberOfMonths')}
              value={values.start_offset.months && values.start_offset.months.toString()}
            />
          )}
        </Section>
        <Section>
          <Item
            label={intl.get('todo.deliveries.form.summaryProductLabel')}
            value={
              !values.products || values.products.length === 0
                ? intl.get('todo.deliveries.form.productsOption1')
                : values.products
            }
          />
        </Section>
        <Section>
          <Item
            label={intl.get('todo.deliveries.form.summaryCountriesLabel')}
            value={values && values.audience && renderStringFromArray(values.audience.countries)}
          />
          <Item
            label={intl.get('todo.deliveries.form.summaryLanguagesLabel')}
            value={values && values.audience && renderStringFromArray(values.audience.languages)}
          />
          <Item
            label={intl.get('todo.deliveries.form.summaryGenderLabel')}
            value={values && values.audience && renderGender(values.audience.gender)}
          />

          <Item
            label={intl.get('todo.deliveries.form.summaryAgeLabel')}
            value={
              values &&
              values.audience &&
              values.audience.ageRange &&
              renderAgeInterval(values.audience.ageRange[0], values.audience.ageRange[1])
            }
          />
          <Item
            label={intl.get('todo.deliveries.form.summaryRegistrationLabel')}
            value={
              values &&
              values.audience &&
              values.audience.registration_methods &&
              values.audience.registration_methods.map(method => method.charAt(0).toUpperCase() + method.substr(1))
            }
          />
          <Item
            label={intl.get('todo.deliveries.form.summaryWeeklyScansLabel')}
            value={
              values &&
              values.audience &&
              values.audience.weekly_scans &&
              renderIntervals(values.audience.weekly_scans.from, values.audience.weekly_scans.to)
            }
          />
          <Item
            label={intl.get('todo.deliveries.form.summaryScannedCountriesLabel')}
            value={values && values.audience && renderStringFromArray(values.audience.scan_countries)}
          />
        </Section>
      </Summary>
    </Wrapper>
  )
}

TodoDeliveryEditorSummary.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object.isRequired
}

export default TodoDeliveryEditorSummary
