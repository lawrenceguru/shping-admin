import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Summary, Item, Section } from '../../molecules/Summury'
import { SummaryIcon, WrappedImage, Wrapper, SummaryDescription } from './styles'
import LoadingSpinner from '../../atoms/LoadingSpinner'
import { icons } from '../../../utils/consts'

const SettingsSummary = ({ values }) => {
  const container = document.getElementById('portal-for-todo-steps')
  const renderImage = image => {
    if (typeof image === 'string') {
      const icon = icons.filter(element => element.value === image)

      if (icon.length) {
        return <WrappedImage src={icon[0].url} />
      }

      return image && !image.includes('http') ? <SummaryIcon icon={image} /> : <WrappedImage src={image} />
    }
    return image.url ? <WrappedImage src={image.url} /> : <LoadingSpinner isLoading />
  }

  return (
    container &&
    ReactDOM.createPortal(
      <Wrapper>
        <Summary header={intl.get('todo.cards.summary.header', { type: 'Card' })}>
          <Section>
            <Item label={intl.get('todo.cards.summary.name')} value={values.name} />
          </Section>
          <Section>{values.icon && renderImage(values.icon)}</Section>
          <Section>{values.promo_image && renderImage(values.promo_image)}</Section>
          <Section>
            <SummaryDescription>{values.description}</SummaryDescription>
          </Section>
          <Section>
            <Item
              label={intl.get('todo.cards.summary.coins')}
              value={values.result && values.result.coins ? values.result.coins : intl.get('todo.cards.summary.none')}
            />
          </Section>
          <Section>
            {values.competition && values.competition.prize && (
              <Item
                label={intl.get('todo.cards.form.competition.prize.placeholder')}
                value={values.competition.prize}
              />
            )}
            {values.competition && values.competition.terms_conds && (
              <Item
                label={intl.get('todo.cards.form.competition.terms_conds.placeholder')}
                value={values.competition.terms_conds}
              />
            )}
            {values.competition && values.competition.eligibility && (
              <Item
                label={intl.get('todo.cards.form.competition.eligibility.placeholder')}
                value={values.competition.eligibility}
              />
            )}
          </Section>
          <Section>
            <Item
              label={intl.get('todo.cards.summary.label')}
              value={
                values.auto_approve
                  ? intl.get('todo.cards.summary.autoApproved')
                  : intl.get('todo.cards.summary.needsApprove')
              }
            />
          </Section>
        </Summary>
      </Wrapper>,
      container
    )
  )
}

SettingsSummary.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object.isRequired
}

export default SettingsSummary
