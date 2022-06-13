import React, { useMemo, useEffect, useState } from 'react'
import intl from 'react-intl-universal'
import { Form } from 'antd'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import TodoStepper from '../../atoms/TodoStepper'
import Button from '../../atoms/Button'
import Loader from '../../templates/Loader'
import { ButtonsWrapper } from './styles'

const TodoStepForm = ({
  createTask,
  history,
  steps,
  clearStore,
  register,
  setValue,
  values,
  triggerValidation,
  finalStepIndex,
  errors,
  containerRef,
  clearError,
  setError,
  onSubmit,
  unregister,
  reset,
  nextBtnText,
  disabled,
  watch,
  redirectLink,
  getCurrStep,
  antdData,
  setAntdData,
  isHaveNotAllProductsOption
}) => {
  console.log(antdData)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [submit, setSubmit] = useState(null)
  const [lastGap, setLastGap] = useState([1])
  const [antdComplete, setAntdComplete] = useState(false)

  useEffect(() => {
    if (getCurrStep) {
      getCurrStep(currentIndex)
    }
  }, [currentIndex])

  const handlePrevStep = () => {
    const newGap = [...lastGap]
    setCurrentIndex(currentIndex - lastGap[lastGap.length - 1] <= 0 ? 0 : currentIndex - lastGap[lastGap.length - 1])
    newGap.splice(-1, 1)
    setLastGap(newGap)
  }

  const pageType = useMemo(() => {
    const currentStep = steps[currentIndex]

    if (currentStep) {
      return currentStep?.type
    }
    return null
  }, [currentIndex, steps])

  const [form] = Form.useForm()
  const handleFinish = () => {
    if (pageType === 'antd') {
      form.submit()
    } else {
      if (clearStore) {
        clearStore()
      }
      createTask()
    }
  }
  const handleNextStep = async () => {
    if (pageType === 'antd') {
      form.submit()
    } else {
      const gap = submit && submit.gap ? submit.gap(values) : 1
      if (typeof submit.call === 'function') {
        submit.call(values).then(isValidate => {
          if (isValidate) {
            setLastGap([...lastGap, gap])
            setCurrentIndex(currentIndex + gap > steps.length ? 1 : currentIndex + gap)
          }
        })
      }
    }
  }

  const isDisabled = errors && Object.keys(errors).length !== 0

  const handleCancel = () => {
    if (clearStore) {
      clearStore()
    }
    history.push(redirectLink || '/admin/todo-cards')
  }
  const Page = useMemo(() => {
    const currentStep = steps[currentIndex]

    if (currentStep) {
      return currentStep.page
    }
    return null
  }, [currentIndex, steps])
  useEffect(() => {
    if (antdComplete) {
      const gap = 1
      setLastGap([...lastGap, gap])
      setCurrentIndex(currentIndex + gap > steps.length ? 1 : currentIndex + gap)
      setAntdComplete(false)

      if (currentIndex >= finalStepIndex) {
        createTask()
      }
    }
  }, [antdComplete])
  return (
    <div>
      <TodoStepper current={currentIndex} steps={steps} handlePrevStep={handlePrevStep} />
      <React.Suspense fallback={<Loader />}>
        {Page &&
          (pageType === 'antd' ? (
            <Page values={values} form={form} setAntdData={setAntdData} setAntdComplete={setAntdComplete} />
          ) : (
            <Page
              setIsSubmit={setSubmit}
              register={register}
              setValue={setValue}
              handleNextStep={handleNextStep}
              values={values}
              errors={errors}
              containerRef={containerRef}
              triggerValidation={triggerValidation}
              clearError={clearError}
              setError={setError}
              onSubmit={onSubmit}
              unregister={unregister}
              reset={reset}
              disabled={disabled}
              watch={watch}
              isHaveNotAllProductsOption={isHaveNotAllProductsOption}
            />
          ))}
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
          <Button size='large' onClick={handleCancel} disabled={disabled}>
            {intl.get('cancel')}
          </Button>
          {currentIndex < finalStepIndex ? (
            <Button type='danger' size='large' onClick={handleNextStep} disabled={isDisabled || disabled}>
              {nextBtnText || intl.get('serializationTasks.serializationStep.nextStep')}
            </Button>
          ) : (
            <Button type='danger' size='large' onClick={handleFinish} disabled={disabled}>
              {intl.get('serializationTasks.serializationStep.finish')}
            </Button>
          )}
        </div>
      </ButtonsWrapper>
    </div>
  )
}

TodoStepForm.propTypes = {
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
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  containerRef: PropTypes.object,
  clearError: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  reset: PropTypes.func,
  unregister: PropTypes.func,
  onSubmit: PropTypes.func,
  nextBtnText: PropTypes.string,
  disabled: PropTypes.bool,
  watch: PropTypes.func,
  redirectLink: PropTypes.string,
  getCurrStep: PropTypes.func,
  antdData: PropTypes.shape({}),
  setAntdData: PropTypes.func,
  isHaveNotAllProductsOption: PropTypes.bool
}

TodoStepForm.defaultProps = {
  createTask: null,
  errors: {},
  containerRef: {},
  clearStore: null,
  reset: null,
  unregister: null,
  onSubmit: null,
  nextBtnText: null,
  disabled: false,
  watch: null,
  redirectLink: null,
  getCurrStep: null,
  antdData: null,
  setAntdData: null,
  isHaveNotAllProductsOption: false
}

export default withRouter(TodoStepForm)
