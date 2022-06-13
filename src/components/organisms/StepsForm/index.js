import React, { useMemo, useState } from 'react'
import intl from 'react-intl-universal'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Stepper from '../../atoms/Stepper'
import Button from '../../atoms/Button'
import Loader from '../../templates/Loader'
import { ButtonsWrapper } from './styles'

const StepsForm = ({
  createTask,
  history,
  steps,
  clearStore,
  register,
  setValue,
  values,
  triggerValidation,
  finalStepIndex,
  setError,
  errors,
  unregister,
  clearError,
  containerRef
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [submit, setSubmit] = useState(null)
  const [lastGap, setLastGap] = useState([1])

  const handlePrevStep = () => {
    const newGap = [...lastGap]
    setCurrentIndex(currentIndex - lastGap[lastGap.length - 1] <= 0 ? 0 : currentIndex - lastGap[lastGap.length - 1])
    newGap.splice(-1, 1)
    setLastGap(newGap)
  }

  const handleFinish = () => {
    createTask()
  }

  const handleNextStep = () => {
    const gap = submit.gap ? submit.gap(values) : 1
    if (typeof submit.call === 'function') {
      submit.call(errors).then(() => {
        setLastGap([...lastGap, gap])
        setCurrentIndex(currentIndex + gap > steps.length ? 1 : currentIndex + gap)
      })
    }
  }

  const isDisabled = errors && Object.keys(errors).length !== 0

  const handleCancel = () => {
    if (setValue) {
      setValue('source', { conditions: {}, data: [{ text: { title: 123, text: 321 } }] })
    }
    if (clearStore) {
      clearStore()
    }
    history.push('/admin/track-and-trace/serialization-tasks')
  }
  const Page = useMemo(() => {
    const currentStep = steps[currentIndex]

    if (currentStep) {
      return currentStep.page
    }
    return null
  }, [currentIndex, steps])

  return (
    <div>
      <Stepper current={currentIndex} steps={steps} handlePrevStep={handlePrevStep} />
      <React.Suspense fallback={<Loader />}>
        {Page && (
          <Page
            setIsSubmit={setSubmit}
            register={register}
            setValue={setValue}
            handleNextStep={handleNextStep}
            values={values}
            setError={setError}
            errors={errors}
            triggerValidation={triggerValidation}
            unregister={unregister}
            clearError={clearError}
            containerRef={containerRef}
          />
        )}
      </React.Suspense>
      <ButtonsWrapper>
        <div>
          {currentIndex > 0 && (
            <Button type='danger' size='large' onClick={handlePrevStep}>
              {intl.get('serializationTasks.serializationStep.prevStep')}
            </Button>
          )}
        </div>
        <div>
          <Button size='large' onClick={handleCancel}>
            {intl.get('cancel')}
          </Button>
          {currentIndex < finalStepIndex ? (
            <Button type='danger' size='default' onClick={handleNextStep} disabled={isDisabled}>
              {intl.get('serializationTasks.serializationStep.nextStep')}
            </Button>
          ) : (
            <Button type='danger' size='large' onClick={handleFinish}>
              {intl.get('serializationTasks.serializationStep.finish')}
            </Button>
          )}
        </div>
      </ButtonsWrapper>
    </div>
  )
}

StepsForm.propTypes = {
  createTask: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  steps: PropTypes.array.isRequired,
  clearStore: PropTypes.func,
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object.isRequired,
  triggerValidation: PropTypes.func.isRequired,
  finalStepIndex: PropTypes.number.isRequired,
  setError: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  unregister: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  containerRef: PropTypes.object
}

StepsForm.defaultProps = {
  createTask: null,
  errors: {},
  containerRef: {},
  clearStore: null
}

export default withRouter(StepsForm)
