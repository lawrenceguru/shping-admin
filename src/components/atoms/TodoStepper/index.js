import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { CheckOutlined } from '@ant-design/icons'
import { Wrapper, StepsWrapper, IconWrapper, LabelWrapper } from './styles'

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
              i={i}
            >
              {i < current ? (
                <span className='stepPrevIcon'>
                  <CheckOutlined />
                </span>
              ) : (
                <span>{i + 1}</span>
              )}
            </IconWrapper>
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
