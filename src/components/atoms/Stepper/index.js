import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Wrapper, StepsWrapper, IconWrapper, LabelWrapper, IconTriangle } from './styles'
import IconButton from '../../molecules/IconButton'

/* eslint-disable no-nested-ternary */
const Stepper = ({ current, steps, handlePrevStep }) => {
  return (
    <Wrapper>
      {steps.map((el, i) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <StepsWrapper key={i}>
            <IconWrapper
              className={current === i ? 'activeIcon' : i - 1 < current ? 'prevActiveIcon' : ''}
              onClick={i + 1 === current ? handlePrevStep : null}
            >
              <IconButton type={el.icon} />
            </IconWrapper>
            <IconTriangle className={current === i ? 'activeTriangle' : i - 1 < current ? 'prevActiveTriangle' : ''} />
            <LabelWrapper
              className={current === i ? 'activeLabel' : i - 1 < current ? 'prevActiveLabel' : ''}
              onClick={i + 1 === current ? handlePrevStep : null}
            >
              {el.label}
            </LabelWrapper>
          </StepsWrapper>
        )
      })}
    </Wrapper>
  )
}

Stepper.propTypes = {
  current: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.object.isRequired),
  handlePrevStep: PropTypes.func
}

Stepper.defaultProps = {
  steps: [],
  handlePrevStep: null
}

export default withRouter(Stepper)
