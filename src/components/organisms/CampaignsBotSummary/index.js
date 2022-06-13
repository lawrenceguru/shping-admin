import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Summary, Section, Item } from '../../molecules/Summury'
import { RADIO_GROUP_GENDER } from '../../pages/TodoDeliveryEditor/consts'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1 2 0;
  z-index: 100;
  min-height: 550px;
`

const CampaignsBotSummary = ({ values }) => {
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
    return result || intl.get('campaigns.rewards.form.summary.all')
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
      <Summary header={intl.get('campaigns.bot.form.summaryTitle')}>
        <Section>
          <Item label={intl.get('campaigns.bot.form.summaryNameLabel')} value={values.name} />
          <Item
            label={intl.get('campaigns.bot.form.summaryStatusLabel')}
            value={values && values.status ? intl.get('todo.delivery.active') : intl.get('todo.delivery.inactive')}
          />
        </Section>
        <Section>
          <Item
            label={intl.get('campaigns.bot.form.summaryDatesLabel')}
            value={renderIntervals(values.start_date, values.end_date)}
          />
        </Section>
        <Section>
          <Item
            label={intl.get('campaigns.bot.form.summaryCountriesLabel')}
            value={values && renderStringFromArray(values.audience && values.audience.countries)}
          />
          <Item
            label={intl.get('campaigns.bot.form.summaryLanguagesLabel')}
            value={values && renderStringFromArray(values.audience && values.audience.languages)}
          />
          <Item
            label={intl.get('campaigns.bot.form.summaryGenderLabel')}
            value={values && renderGender(values.audience && values.audience.gender)}
          />
          <Item
            label={intl.get('campaigns.bot.form.summaryAgeLabel')}
            value={
              values &&
              renderAgeInterval(
                values.audience && values.audience.ageRange && values.audience.ageRange[0],
                values.audience && values.audience.ageRange && values.audience.ageRange[1]
              )
            }
          />
          <Item
            label={intl.get('campaigns.bot.form.summaryScanDateLabel')}
            value={(values && values.audience && values.audience.scan_date) || '-'}
          />
          <Item
            label={intl.get('campaigns.bot.form.summaryWeeklyScansLabel')}
            value={
              values &&
              renderIntervals(
                values.audience && values.audience.weekly_scans && values.audience.weekly_scans.from,
                values.audience && values.audience.weekly_scans && values.audience.weekly_scans.to
              )
            }
          />
          <Item
            label={intl.get('campaigns.bot.form.summaryScannedCountriesLabel')}
            value={values && renderStringFromArray(values.audience && values.audience.scan_countries)}
          />
          <Item
            label={intl.get('campaigns.bot.form.summaryRegistrationLabel')}
            value={
              (values &&
                values.audience &&
                values.audience.registration_methods &&
                values.audience.registration_methods.length &&
                values.audience.registration_methods.map(
                  method => method.charAt(0).toUpperCase() + method.substr(1)
                )) ||
              '-'
            }
          />
        </Section>
      </Summary>
    </Wrapper>
  )
}

CampaignsBotSummary.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object
}

CampaignsBotSummary.defaultProps = {
  values: {}
}

export default CampaignsBotSummary
