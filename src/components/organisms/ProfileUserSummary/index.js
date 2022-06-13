import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Summary, Item, Section } from '../../molecules/Summury'

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
  const notProvided = intl.get('profileUser.notProvided')

  return (
    <Wrapper>
      <Summary header={intl.get('profileUser.summaryHeading')}>
        <Section>
          <Item label={intl.get('profileUser.fields.firstName.label')} value={values && values.first_name} />
        </Section>
        <Section>
          <Item label={intl.get('profileUser.fields.lastName.label')} value={values && values.last_name} />
        </Section>
        <Section>
          <Item
            label={intl.get('profileUser.fields.phone.label')}
            value={values && values.phone ? values.phone : notProvided}
          />
        </Section>
        <Section>
          <Item
            label={intl.get('profileUser.fields.language.label')}
            value={values && values.language ? values.language : notProvided}
          />
        </Section>
        <Section>
          <Item
            label={intl.get('profileUser.fields.address1.label')}
            value={values && values.address1 ? values.address1 : notProvided}
          />
        </Section>
        <Section>
          <Item
            label={intl.get('profileUser.fields.address2.label')}
            value={values && values.address2 ? values.address2 : notProvided}
          />
        </Section>
        <Section>
          <Item
            label={intl.get('profileUser.fields.city.label')}
            value={values && values.city ? values.city : notProvided}
          />
        </Section>
        <Section>
          <Item
            label={intl.get('profileUser.fields.postCode.label')}
            value={values && values.post_code ? values.post_code : notProvided}
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
