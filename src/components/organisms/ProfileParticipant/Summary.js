import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Summary, Item, Section } from '../../molecules/Summury'

const Wrapper = styled.div`
  margin-top: 25px;
  display: flex;
  position: sticky;
  top: 110px;  
  height: fit-content;
  flex-basis: 30%;
  & > div > div {
    min-height: 750px;
    max-height: 800px;
  }
}
`

const TodoDeliveryEditorSummary = ({ values }) => {
  const notProvided = intl.get('common.notProvided')
  const lang = window.localStorage.getItem('lang')
  const countries = useSelector(({ settings }) => settings.countries)
  const displayCountry = name => {
    const countryItem = countries.find(country => country.iso === name)
    if (countryItem) {
      if (lang === 'en') return countryItem.name
      if (lang === 'ru') return countryItem.name_ru
      if (lang === 'zh') return countryItem.name_zh
    }
    return ''
  }
  return (
    <Wrapper>
      <Summary header={intl.get('profileParticipant.summaryHeading')}>
        <Section>
          <Item label={intl.get('profileParticipant.fields.name.label')} value={values?.name || notProvided} />
        </Section>
        <Section>
          <Item label={intl.get('profileParticipant.fields.address.label')} value={values?.address || notProvided} />
        </Section>
        <Section>
          <Item label={intl.get('profileParticipant.fields.city.label')} value={values?.city || notProvided} />
        </Section>
        <Section>
          <Item
            label={intl.get('profileParticipant.fields.country.label')}
            value={values && displayCountry(values.country)}
          />
        </Section>
        <Section>
          <Item label={intl.get('profileParticipant.fields.postCode.label')} value={values?.post_code || notProvided} />
        </Section>
        <Section>
          <Item label={intl.get('profileParticipant.fields.contact.label')} value={values?.contact || notProvided} />
        </Section>
        <Section>
          <Item label={intl.get('profileParticipant.fields.phone.label')} value={values?.phone || notProvided} />
        </Section>
        <Section>
          <Item label={intl.get('profileParticipant.fields.email.label')} value={values?.email || notProvided} />
        </Section>
        <Section>
          <Item
            label={intl.get('profileParticipant.fields.facebookUrl.label')}
            value={values?.facebook_url || notProvided}
          />
        </Section>
        <Section>
          <Item
            label={intl.get('profileParticipant.fields.exclusiveInfo.label')}
            value={values?.exclusive_info ? 'Yes' : 'No'}
          />
        </Section>
        <Section>
          <Item
            label={intl.get('profileParticipant.fields.timezoneCode.label')}
            value={values?.timezone_code || notProvided}
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
