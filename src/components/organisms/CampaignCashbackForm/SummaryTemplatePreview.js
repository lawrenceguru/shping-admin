import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'

import IconButton from '../../molecules/IconButton'
import * as ST from './styles'

const SummaryTemplatePreview = ({ steps, onEditStep, onRemoveStep, active }) => {
  const notProvided = intl.get('common.notProvided')
  return (
    <ST.StickyWrapper>
      <h3>{intl.get('campaigns.cashbacks.steps.steps.previewTitle')}</h3>
      {(!steps || (steps && steps.length === 0)) && (
        <div>
          {intl.get('reviews.templates.steps.step2')} : {notProvided}
        </div>
      )}
      {steps &&
        steps.map((step, index) => {
          const handleRemoveStep = e => {
            e.stopPropagation()
            onRemoveStep(index)
          }
          const stepName = Object.keys(step)[0]
          const handleEditStep = () => onEditStep(index)
          const capitalize = `${stepName.charAt(0).toUpperCase()}${stepName.slice(1)}`
          return (
            // eslint-disable-next-line react/no-array-index-key
            <ST.StepContainer active={active === index} onClick={handleEditStep} key={`${stepName}-${index}`}>
              <div>
                {intl.get('reviews.templates.action.step', { number: index + 1 })} : {capitalize}
              </div>
              <IconButton type='Close' styleParam={{ fontSize: '25px' }} actionFunction={handleRemoveStep} />
            </ST.StepContainer>
          )
        })}
    </ST.StickyWrapper>
  )
}

SummaryTemplatePreview.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  onEditStep: PropTypes.func.isRequired,
  onRemoveStep: PropTypes.func.isRequired,
  steps: PropTypes.arrayOf(PropTypes.object),
  active: PropTypes.number
}

SummaryTemplatePreview.defaultProps = {
  steps: [],
  active: -1
}

export default SummaryTemplatePreview
