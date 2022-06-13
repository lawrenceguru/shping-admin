import React, { lazy, useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import * as ST from './styles'
import CustomButton from '../../molecules/Button'
import Button from '../../atoms/Button'
import TodoCardsEditorStepsSummary from '../TodoCardsEditorStepsSummary'
import Loader from '../../templates/Loader'

const options = ['text', 'textbox', 'rating', 'question', 'image', 'contact', 'receipt']

const optionsComponents = {
  text: lazy(() => import('../../molecules/TodoEditorSteps/Text')),
  textbox: lazy(() => import('../../molecules/TodoEditorSteps/Textbox')),
  rating: lazy(() => import('../../molecules/TodoEditorSteps/Textbox')),
  question: lazy(() => import('../../molecules/TodoEditorSteps/Question')),
  image: lazy(() => import('../../molecules/TodoEditorSteps/Textbox')),
  contact: lazy(() => import('../../molecules/TodoEditorSteps/Textbox')),
  receipt: lazy(() => import('../../molecules/TodoEditorSteps/Textbox'))
}

const StepSettings = ({
  setValue,
  register,
  values,
  setIsSubmit,
  triggerValidation,
  unregister,
  errors,
  clearError,
  disabled
}) => {
  const [activeComponent, setActiveComponent] = useState('text')
  const [activeStepIndex, setActiveStepIndex] = useState(null)

  useEffect(() => {
    if (!values || !values.steps) {
      register({ name: 'steps' })
    }

    return () => {
      unregister(['buffer'])
    }
  }, [])

  const isDisable = useMemo(() => {
    return errors && !!Object.keys(errors).length
  }, [errors])

  const StepInformation = useMemo(() => {
    return optionsComponents[activeComponent]
  }, [activeComponent])

  useEffect(() => {
    setIsSubmit({
      call: () =>
        new Promise(resolve => {
          triggerValidation().then(() => {
            resolve()
          })
        })
    })
  }, [triggerValidation, values])

  const clearAnswers = (requiredIndex = 0, defaultValues) => {
    setValue(`buffer.title`, null)
    setValue(`buffer.text`, null)
    setValue(`buffer.question`, null)
    if (values.buffer && values.buffer.answers) {
      const cop = [...values.buffer.answers].map((el, index) => index)
      cop.forEach((item, index) => {
        if (index <= requiredIndex) {
          setValue(
            `buffer.answers[${index}].answer`,
            (defaultValues && defaultValues[index] && defaultValues[index].answer) || null
          )
          setValue(
            `buffer.answers[${index}].correct`,
            (defaultValues && defaultValues[index] && defaultValues[index].correct) || false
          )
        } else {
          unregister(`buffer.answers[${index}].answer`)
          unregister(`buffer.answers[${index}].correct`)
        }
      })
      setValue('buffer.answers', [])
    }
  }

  const handleAddStep = useCallback(() => {
    triggerValidation().then(isValid => {
      if (isValid) {
        const currSteps = (values && values.steps && [...values.steps]) || []
        if (values && values.buffer) {
          currSteps.push({ ...JSON.parse(JSON.stringify(values.buffer)), type: activeComponent })
          setValue('steps', currSteps)
          clearAnswers()
          setActiveStepIndex(null)
        }
      }
    })
  }, [values])

  const handleUpdateStep = () => {
    triggerValidation().then(isValid => {
      if (isValid) {
        const currSteps = (values && values.steps && [...values.steps]) || []

        if (values && values.buffer) {
          currSteps[activeStepIndex] = values && { ...JSON.parse(JSON.stringify(values.buffer)), type: activeComponent }
          clearAnswers()
        }

        setValue('steps', currSteps)
        setActiveStepIndex(null)
      }
    })
  }

  const handleStepClick = index => {
    const currStep = values && values.steps && values.steps[index] && { ...values.steps[index] }
    const requiredIndex = (currStep.answers && currStep.answers.length > 1 && currStep.answers.length - 1) || 0
    clearAnswers(requiredIndex, currStep.answers && JSON.parse(JSON.stringify(currStep.answers)))

    setActiveStepIndex(index)

    if (currStep) {
      Object.keys(currStep).forEach(el => {
        if (el === 'answers' && currStep[el]) {
          if (values && (!values.buffer || !values.buffer.answers)) {
            register({ name: 'buffer.answers' })
          }
          setValue(`buffer.${el}`, JSON.parse(JSON.stringify(currStep[el])))
        } else {
          setValue(`buffer.${el}`, currStep[el])
        }
      })
      setActiveComponent(currStep.type)
    }
  }

  const handleDelete = index => {
    const currSteps = (values && values.steps) || []

    if (activeStepIndex === index) {
      setActiveStepIndex(null)
    }

    currSteps.splice(index, 1)
    setValue('steps', currSteps)
  }

  return (
    <ST.Wrapper>
      <ST.StepWrapper>
        <ST.OptionsWrapper>
          {options.map(el => (
            <CustomButton
              key={el}
              text={el && intl.get(`todo.cards.stepsSettings.types.${el}`).toUpperCase()}
              height='35px'
              fontSize='15px'
              backgroundColor='rgb(255, 255, 255)'
              color='rgb(178, 179, 178)'
              borderColor='rgb(178, 179, 178)'
              marginTop='10px'
              className={activeComponent === el.toLowerCase() ? 'active' : ''}
              handleClick={() => {
                if (values.buffer) {
                  Object.keys(values.buffer).forEach(key => {
                    setValue(`buffer.${key}`, null)
                  })
                  setActiveStepIndex(null)
                }
                setActiveComponent(el.toLowerCase())
              }}
            />
          ))}
        </ST.OptionsWrapper>
        <div>
          <React.Suspense fallback={<Loader />}>
            <StepInformation
              register={register}
              values={values}
              setValue={setValue}
              activeStepIndex={activeStepIndex}
              field='buffer'
              unregister={unregister}
              clearError={clearError}
              errors={errors}
              triggerValidation={triggerValidation}
            />
          </React.Suspense>
        </div>
        <ST.NavigationWrapper>
          <Button type='danger' size='default' onClick={handleAddStep} disabled={isDisable || disabled}>
            {intl.get('todo.cards.stepsSettings.addStep')}
          </Button>
          <Button
            type='danger'
            size='default'
            onClick={handleUpdateStep}
            disabled={isDisable || activeStepIndex === null || disabled}
          >
            {intl.get('todo.cards.stepsSettings.updateStep')}
          </Button>
        </ST.NavigationWrapper>
      </ST.StepWrapper>
      <TodoCardsEditorStepsSummary
        values={values}
        handleStepClick={handleStepClick}
        handleDelete={handleDelete}
        activeStepIndex={activeStepIndex}
      />
    </ST.Wrapper>
  )
}

StepSettings.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  unregister: PropTypes.func.isRequired,
  setIsSubmit: PropTypes.func.isRequired,
  triggerValidation: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

StepSettings.defaultProps = {
  values: {},
  errors: {},
  disabled: false
}

export default StepSettings
