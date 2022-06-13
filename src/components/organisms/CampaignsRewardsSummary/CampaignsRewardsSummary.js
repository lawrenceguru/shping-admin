import React, { useMemo } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Summary, Section, Item } from '../../molecules/Summury'
import { RADIO_GROUP_GENDER } from '../../pages/TodoDeliveryEditor/consts'
import { nameType } from '../../../utils/consts'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1 2 0;
  z-index: 100;
  min-height: 550px;
`

const CampaignsRewardsSummary = ({ watch, values, rewardsActions }) => {
  const actionWatcher = watch('action')
  const action = useMemo(() => {
    const actionData = rewardsActions && rewardsActions.find(el => el.id === actionWatcher)
    return actionData && actionData[nameType]
  }, [rewardsActions, actionWatcher])

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

  const renderLevels = levels =>
    levels && levels.length !== 0 ? levels.map(level => intl.get(`campaigns.rewards.form.levels.${level}`)) : none

  const renderRestrictions = (location, condition) => {
    const resultString = `${
      location ? `${intl.get('campaigns.rewards.form.summary.location')}${condition ? ',' : ''} ` : ''
    }${
      condition === 'global_once'
        ? intl.get('campaigns.rewards.form.conditionAllOptionsLabel').toLowerCase()
        : intl.get(`campaigns.rewards.form.summary.condition.${condition}`)
    }`
    return resultString && resultString[0].toUpperCase() + resultString.slice(1)
  }

  return (
    <Wrapper>
      <Summary header={intl.get('campaigns.rewards.form.summary.header')}>
        <Section>
          <Item label={intl.get('campaigns.rewards.form.summary.name')} value={values.name} />
          <Item
            label={intl.get('campaigns.rewards.form.partnerBrand')}
            value={values && values.partner_brand ? intl.get('yes') : intl.get('no')}
          />
        </Section>
        <Section>
          <Item label={intl.get('campaigns.rewards.form.summary.action')} value={action || none} />
          <Item
            label={intl.get('campaigns.rewards.form.summary.reward')}
            value={values.points ? `SHPING ${values.points}` : none}
          />
          <Item
            label={intl.get('campaigns.rewards.form.summary.dates')}
            value={renderIntervals(values.start_date, values.end_date)}
          />
        </Section>
        <Section>
          <Item
            label={intl.get('campaigns.rewards.form.summary.countries')}
            value={values && renderStringFromArray(values.audience && values.audience.countries)}
          />
          <Item
            label={intl.get('campaigns.rewards.form.summary.languages')}
            value={values && renderStringFromArray(values.audience && values.audience.languages)}
          />
          <Item
            label={intl.get('campaigns.rewards.form.summary.gender')}
            value={values && renderGender(values.audience && values.audience.gender)}
          />
          <Item
            label={intl.get('campaigns.rewards.form.summary.age')}
            value={
              values &&
              renderAgeInterval(
                values.audience && values.audience.ageRange && values.audience.ageRange[0],
                values.audience && values.audience.ageRange && values.audience.ageRange[1]
              )
            }
          />
          <Item
            label={intl.get('campaigns.rewards.form.postcode')}
            value={values && values.audience && values.audience.postcode}
          />
          <Item
            label={intl.get('campaigns.rewards.form.summary.levels')}
            value={values && renderLevels(values.audience && values.audience.user_levels)}
          />
        </Section>
        {values.isHaveRestrictions && (
          <Section>
            <Item
              label={intl.get('campaigns.rewards.form.summary.restrictions')}
              value={values && renderRestrictions(values.location, values.condition)}
            />
          </Section>
        )}
        {values.budget && (
          <Section>
            <Item
              label={intl.get(`campaigns.rewards.form.summary.budget.${values.budget.interval || 'day'}`)}
              value={values.budget.per_interval ? `SHPING ${values.budget.per_interval}` : none}
            />
          </Section>
        )}
        {(!values.budget || !values.budget.interval) && values.rewardAdjustmentActive && (
          <Section>
            <Item
              label={intl.get('campaigns.rewards.form.summaryBudgetLabel')}
              value={intl.get('campaigns.rewards.form.budgetOption1')}
            />
          </Section>
        )}
      </Summary>
    </Wrapper>
  )
}

CampaignsRewardsSummary.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  watch: PropTypes.func.isRequired,
  rewardsActions: PropTypes.arrayOf(PropTypes.object)
}

CampaignsRewardsSummary.defaultProps = {
  values: {},
  rewardsActions: []
}

export default CampaignsRewardsSummary
