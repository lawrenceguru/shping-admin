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

const CampaignsBoostSummary = ({ values }) => {
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

  const none = intl.get('campaigns.rewards.form.summary.none')

  return (
    <Wrapper>
      <Summary header={intl.get('campaigns.boost.summary.title')}>
        <Section>
          <Item label={intl.get('campaigns.boost.summary.name')} value={values.name || none} />
        </Section>
        <Section>
          <Item
            label={intl.get('campaigns.boost.summary.date')}
            value={renderIntervals(values.start_date, values.end_date)}
          />
          <Item label={intl.get('campaigns.boost.summary.stopDate')} value={(values && values.stop_date) || '-'} />
        </Section>
        <Section>
          <Item label={intl.get('campaigns.boost.summary.limit')} value={(values && values.limit) || '-'} />
        </Section>
        <Section>
          <Item
            label={intl.get('campaigns.shoutouts.form.summaryCountriesLabel')}
            value={values && renderStringFromArray(values.audience && values.audience.countries)}
          />
          <Item
            label={intl.get('campaigns.shoutouts.form.summaryLanguagesLabel')}
            value={values && renderStringFromArray(values.audience && values.audience.languages)}
          />
          <Item
            label={intl.get('campaigns.shoutouts.form.summaryGenderLabel')}
            value={values && renderGender(values.audience && values.audience.gender)}
          />
          <Item
            label={intl.get('campaigns.shoutouts.form.summaryAgeLabel')}
            value={
              values &&
              renderAgeInterval(
                values.audience && values.audience.ageRange && values.audience.ageRange[0],
                values.audience && values.audience.ageRange && values.audience.ageRange[1]
              )
            }
          />
        </Section>
        <Section>
          <Item label={intl.get('campaigns.boost.summary.period_min')} value={values && values.period_min} />
          <Item label={intl.get('campaigns.boost.summary.firstScan')} value={values && values.first_scan} />
        </Section>
        {values && values.method === 'invite' && (
          <Section>
            <Item
              label={intl.get('campaigns.boost.summary.first')}
              value={(values.buddy_invite && values.buddy_invite.first) || '-'}
            />
            <Item
              label={intl.get('campaigns.boost.summary.firstPeriod')}
              value={(values.buddy_invite && values.buddy_invite && values.buddy_invite.first_period) || '-'}
            />
            <Item
              label={intl.get('campaigns.boost.summary.ifMaxLevel')}
              value={(values.buddy_invite && values.buddy_invite.if_max_level) || '-'}
            />
            <Item
              label={intl.get('campaigns.boost.summary.maxRepeat')}
              value={(values.buddy_invite && values.buddy_invite.max_repeat) || '-'}
            />
            <Item
              label={intl.get('campaigns.boost.summary.repeat')}
              value={(values.buddy_invite && values.buddy_invite.repeat) || '-'}
            />
            <Item
              label={intl.get('campaigns.boost.summary.repeatPeriod')}
              value={(values.buddy_invite && values.buddy_invite.repeat_period) || '-'}
            />
          </Section>
        )}
        <Section>
          <Item label={intl.get('campaigns.boost.summary.level')} value={values.level || none} />
        </Section>
      </Summary>
    </Wrapper>
  )
}

CampaignsBoostSummary.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object
}

CampaignsBoostSummary.defaultProps = {
  values: {}
}

export default CampaignsBoostSummary
