import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import { Summary, Section, Item } from '../../molecules/Summury'
import { RADIO_GROUP_GENDER } from '../../pages/TodoDeliveryEditor/consts'
import { reminderFrequencies, reminderCustomDays } from '../CampaignsReminderStepsSettings/consts'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1 2 0;
  z-index: 100;
  min-height: 550px;
`

const CampaignsReminderSummary = ({ values }) => {
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

  const none = intl.get('campaigns.rewards.form.summary.none')
  const renderMessages = messages => {
    return messages.reduce((res, currItem) => {
      const { text, language } = currItem

      if (!res) {
        return `${text}${language ? ` (${language})` : ''}`
      }

      return text ? `${res}, ${text}${language && ` (${language})`}` : res
    }, '')
  }

  const renderFrequency = (frequency, customDays) => {
    const itemFrequency = reminderFrequencies.find(item => item.value === frequency)
    let result = itemFrequency ? itemFrequency.label : ''

    if (customDays && customDays.length) {
      result += `${customDays.reduce((res, currItem) => {
        const itemDay = reminderCustomDays.find(item => item.value === currItem)

        if (!res) {
          return ` (${itemDay.label}`
        }

        return `${res}, ${itemDay.label}`
      }, '')})`
    }

    return result
  }

  return (
    <Wrapper>
      <Summary header={intl.get('campaigns.reminder.summary.summaryHeading')}>
        <Section>
          <Item label={intl.get('campaigns.reminder.summary.name')} value={values.name || none} />
        </Section>
        <Section>
          <Item
            label={intl.get('campaigns.reminder.summary.date')}
            value={(values && values.run_options && values.run_options.start_date) || none}
          />
          <Item
            label={intl.get('campaigns.reminder.summary.time')}
            value={
              (values &&
                values.run_options &&
                values.run_options.start_time &&
                moment(values.run_options.start_time, 'h:mm A').format('h:mm A')) ||
              none
            }
          />
          <Item
            label={intl.get('campaigns.reminder.summary.frequency')}
            value={
              values &&
              values.run_options &&
              values.run_options.frequency &&
              renderFrequency(values.run_options.frequency, values.customDays)
            }
          />
        </Section>
        <Section>
          <Item
            label={intl.get(`campaigns.reminder.summary.messages`)}
            value={(values && values.messages && values.messages.length && renderMessages(values.messages)) || none}
          />
        </Section>
        <Section>
          <Item
            label={intl.get('campaigns.reminder.summary.countries')}
            value={values && renderStringFromArray(values.audience && values.audience.countries)}
          />
          <Item
            label={intl.get('campaigns.reminder.summary.gender')}
            value={values && renderStringFromArray(values.audience && values.audience.languages)}
          />
          <Item
            label={intl.get('campaigns.reminder.summary.languages')}
            value={values && renderGender(values.audience && values.audience.gender)}
          />
          <Item
            label={intl.get('campaigns.reminder.summary.age')}
            value={
              values &&
              renderAgeInterval(
                values.audience && values.audience.ageRange && values.audience.ageRange[0],
                values.audience && values.audience.ageRange && values.audience.ageRange[1]
              )
            }
          />
        </Section>
      </Summary>
    </Wrapper>
  )
}

CampaignsReminderSummary.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object
}

CampaignsReminderSummary.defaultProps = {
  values: {}
}

export default CampaignsReminderSummary
