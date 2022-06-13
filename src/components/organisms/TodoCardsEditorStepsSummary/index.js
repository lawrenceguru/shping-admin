import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactDOM from 'react-dom'
import { Summary, Section } from '../../molecules/Summury'
import IconButton from '../../molecules/IconButton'

const Step = styled.div`
  display: flex;
  justify-content: space-between;
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1 2 0;
  z-index: 100;
  min-height: 550px;
`

const ItemLabel = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`

const StepName = styled.span`
  font-weight: 900;
  margin-right: 5px;
`

const TodoCardsEditorStepsSummary = ({ values, handleStepClick, handleDelete, activeStepIndex }) => {
  const container = document.getElementById('portal-for-todo-steps')
  return (
    container &&
    ReactDOM.createPortal(
      <Wrapper>
        <Summary header={intl.get('todo.cards.summary.header', { type: 'Steps' })}>
          {values &&
            values.steps &&
            values.steps.map((item, index) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Section key={index} role='button' isActive={index === activeStepIndex}>
                  <Step>
                    <ItemLabel onClick={() => handleStepClick(index)}>
                      <StepName>{`Step ${index + 1}:`}</StepName>
                      <span>{item.type.charAt(0).toUpperCase() + item.type.substr(1)}</span>
                    </ItemLabel>
                    <IconButton type='Delete' popText='Delete step' actionFunction={() => handleDelete(index)} />
                  </Step>
                </Section>
              )
            })}
        </Summary>
      </Wrapper>,
      container
    )
  )
}

TodoCardsEditorStepsSummary.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object.isRequired,
  handleStepClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default TodoCardsEditorStepsSummary
