import React from 'react'
import PropTypes from 'prop-types'
import { stepperSSCCSteps as steps } from '../../../utils/steps'
import StepsForm from '../../organisms/StepsForm'

const SerializationSSCCSteps = ({ createSerializationGetSSCCOptions, clearSerializationGetSSCCOptions }) => {
  return (
    <StepsForm
      createTask={createSerializationGetSSCCOptions}
      steps={steps}
      clearStore={clearSerializationGetSSCCOptions}
      finalStepIndex={1}
    />
  )
}

SerializationSSCCSteps.propTypes = {
  createSerializationGetSSCCOptions: PropTypes.func.isRequired,
  clearSerializationGetSSCCOptions: PropTypes.func.isRequired
}

export default SerializationSSCCSteps
