import React, { useCallback } from 'react'
import intl from 'react-intl-universal'
import moment from 'moment'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Summary, Section, Item } from '../../molecules/Summury'
import { RADIO_GROUP_GENDER } from '../../pages/TodoDeliveryEditor/consts'
import { getValueFromName } from '../../../utils/calculations'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1 2 0;
  z-index: 100;
  min-height: 550px;
`

const CampaignsSummary = ({ sectionsOptions, values }) => {
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

  const none = intl.get('campaigns.featured.summary.none')

  const renderStringFromArray = (array, noneEmpty) => {
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

    return result || (noneEmpty ? none : intl.get('campaigns.featured.summary.all'))
  }

  const renderAgeInterval = (startAge, endAge) => {
    let result = intl.get('campaigns.featured.summary.none')
    if (!startAge && endAge) {
      result = `${endAge !== 75 ? `${endAge} ${intl.get('yo')}` : '∞'} ${intl.get(
        'campaigns.featured.summary.andYOunger'
      )}`
    } else if (startAge && endAge) {
      result = `${startAge} ${intl.get('yo')} - ${endAge !== 75 ? `${endAge} ${intl.get('yo')}` : '∞'}`
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

  const renderLevels = levels =>
    levels && levels.length !== 0 ? levels.map(level => intl.get(`campaigns.rewards.form.levels.${level}`)) : none

  const getAudienceValue = useCallback(
    item => {
      const value = '-'

      if (item && values) {
        switch (item.name) {
          case 'countries':
            return renderStringFromArray(values.audience && values.audience.countries)
          case 'languages':
            return renderStringFromArray(values.audience && values.audience.languages)
          case 'gender':
            return renderGender(values.audience && values.audience.gender)
          case 'ageRange':
            return renderAgeInterval(
              values.audience && values.audience.ageRange && values.audience.ageRange[0],
              values.audience && values.audience.ageRange && values.audience.ageRange[1]
            )
          case 'user_levels':
            return renderLevels(values.audience && values.audience.user_levels)
          default:
            return (values.audience && values.audience[item.name]) || '-'
        }
      }

      return value
    },
    [values]
  )

  const getItemValue = useCallback(
    item => {
      if (values) {
        const value = getValueFromName(item.name, values)
        switch (item.type) {
          case 'datesRange':
            return renderIntervals(value && value[0], value && value[1])
          case 'audience':
            return getAudienceValue(item, values)
          case 'time':
            return (value && moment(value, 'h:mm A').format('h:mm A')) || none
          case 'bool':
            return value ? intl.get('yes') : intl.get('no')
          case 'array':
            return renderStringFromArray(value, true)
          default:
            return item.intlValue ? intl.get(`${item.path}.${value}`) : value || (item.name === 'name' ? none : '-')
        }
      }

      return null
    },
    [values]
  )

  return (
    <Wrapper>
      <Summary header={sectionsOptions.header}>
        {sectionsOptions.sections &&
          Object.keys(sectionsOptions.sections).map(item => (
            <Section key={item}>
              {sectionsOptions.sections[item].map(elem => (
                <Item key={elem.label} label={elem.label} value={getItemValue(elem)} />
              ))}
            </Section>
          ))}
      </Summary>
    </Wrapper>
  )
}

CampaignsSummary.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  sectionsOptions: PropTypes.object.isRequired
}

CampaignsSummary.defaultProps = {
  values: {}
}

export default CampaignsSummary
