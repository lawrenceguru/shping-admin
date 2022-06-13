import React, { useEffect, useMemo } from 'react'
import { RHFInput } from 'react-hook-form-input'
import { Button, Checkbox, Form, Icon, Input } from 'antd'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Wrapper, BtnWrapper, QuestionWrapper, FieldWrapper } from './styles'
import WidgetRemaining from '../../../atoms/WidgetRemaining'
import Error from '../../../atoms/Error'
import IconButton from '../../IconButton'
import { checkValueLength } from '../../../../utils/validation'

const TITLE_LENGTH = 100
const QUESTION_LENGTH = 100
const ANSWER_LENGTH = 100

const Question = ({ errors, values, register, setValue, activeStepIndex, field, unregister, clearError }) => {
  useEffect(() => {
    if (activeStepIndex === null) {
      register({ name: 'buffer.answers' })
      setValue('buffer.answers', [{ answer: '', correct: false }])
    }

    return () => {
      clearError()
      unregister('buffer.answers')
    }
  }, [])

  const defaultObj = useMemo(() => {
    return values && values.steps && values.steps[activeStepIndex]
  }, [values])

  useEffect(() => {
    if (activeStepIndex !== null) {
      Object.keys(values && values.steps && values.steps[activeStepIndex]).forEach(el => {
        if (el !== 'answers') {
          setValue(`${field}.${el}`, values.steps[activeStepIndex][el])
        }
      })

      if (values && values.buffer && values.buffer.answers && values.buffer.answers.length) {
        const copiedAnswers = [...values.buffer.answers]
        copiedAnswers.forEach((el, index) => {
          if (defaultObj && defaultObj.answers && defaultObj.answers[index]) {
            setValue(`buffer.answers[${index}].answer`, values.steps[activeStepIndex].answers[index].answer)
          } else {
            unregister(`buffer.answers[${index}].answer`)
          }
        })
      }
    }
  }, [activeStepIndex])

  const currObj = useMemo(() => {
    return values && values.buffer
  }, [values])

  const remainingTitleValue = useMemo(() => {
    return TITLE_LENGTH - ((currObj && currObj.title && currObj.title.length) || 0)
  }, [values])

  const remainingQuestionValue = useMemo(() => {
    return QUESTION_LENGTH - ((currObj && currObj.question && currObj.question.length) || 0)
  }, [values])

  const remainingAnswerSize = useMemo(() => {
    if (currObj && currObj.answers) {
      const remainingSizes = []
      currObj.answers.forEach(answer => {
        remainingSizes.push(ANSWER_LENGTH - ((answer && answer.answer && answer.answer.length) || 0))
      })
      return remainingSizes
    }
    return []
  }, [values])

  const handleAddQuestion = () => {
    const currValues = [...currObj.answers]
    currValues.push({ answer: '', correct: false })
    setValue('buffer.answers', [...currValues])
  }

  const handleDeleteQuestion = index => {
    if (currObj.answers && currObj.answers[index] !== undefined) {
      const currValues = { ...currObj, answers: currObj.answers.filter((item, indexItem) => indexItem !== index) }
      unregister(`${field}.answers[${currValues.answers.length}].answer`)
      unregister(`${field}.answers[${currValues.answers.length}].correct`)
      setValue('buffer.answers', [])

      currValues.answers.forEach((item, indexItem) => {
        setValue(`buffer.answers[${indexItem}].answer`, item.answer)

        register({ name: `buffer.answers[${indexItem}].correct` })
        setValue(`buffer.answers[${indexItem}].correct`, item.correct)
      })
    }
  }

  return (
    <Wrapper>
      <Form.Item label={intl.get('todo.cards.stepsSettings.title')}>
        <WidgetRemaining value={remainingTitleValue} />
        <RHFInput
          as={<Input size='large' placeholder={intl.get('todo.cards.stepsSettings.title')} />}
          name={`${field}.title`}
          rules={{
            required: intl.get('todo.cards.form.required'),
            maxLength: {
              value: 100,
              message: intl.get('todo.cards.stepsSettings.maxLengthErrorMessage', {
                type: intl.get('todo.cards.stepsSettings.title')
              })
            }
          }}
          register={register}
          unregister={unregister}
          defaultValue={defaultObj && defaultObj.title}
          setValue={setValue}
          mode='onChange'
          onKeyPress={event => {
            checkValueLength(event, TITLE_LENGTH)
          }}
        />
        <Error errors={errors} destination={`${field}.title`} />
      </Form.Item>
      <Form.Item label={intl.get('todo.cards.stepsSettings.question')}>
        <WidgetRemaining value={remainingQuestionValue} />
        <RHFInput
          as={<Input size='large' placeholder={intl.get('todo.cards.stepsSettings.question')} />}
          name={`${field}.question`}
          rules={{
            required: intl.get('todo.cards.form.required'),
            maxLength: {
              value: 100,
              message: intl.get('todo.cards.stepsSettings.maxLengthErrorMessage', {
                type: intl.get('todo.cards.stepsSettings.question')
              })
            }
          }}
          register={register}
          unregister={unregister}
          defaultValue={defaultObj && defaultObj.question}
          setValue={setValue}
          mode='onChange'
          onKeyPress={event => {
            checkValueLength(event, QUESTION_LENGTH)
          }}
        />
        <Error errors={errors} destination={`${field}.question`} />
      </Form.Item>
      {currObj &&
        currObj.answers &&
        currObj.answers.map((el, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Form.Item key={index} label={`${intl.get('todo.cards.stepsSettings.answer')} ${index + 1}`}>
            <QuestionWrapper>
              {currObj.answers.length > 1 && (
                <IconButton type='Delete' popText='Delete step' actionFunction={() => handleDeleteQuestion(index)} />
              )}
              <FieldWrapper>
                <WidgetRemaining value={remainingAnswerSize[index]} />
                <RHFInput
                  as={
                    <Input size='large' placeholder={`${intl.get('todo.cards.stepsSettings.answer')} ${index + 1}`} />
                  }
                  name={`${field}.answers[${index}].answer`}
                  rules={{
                    required: intl.get('todo.cards.form.required'),
                    maxLength: {
                      value: 100,
                      message: intl.get('todo.cards.stepsSettings.maxLengthErrorMessage', {
                        type: intl.get('todo.cards.stepsSettings.answer')
                      })
                    }
                  }}
                  register={register}
                  unregister={unregister}
                  defaultValue={
                    defaultObj && defaultObj.answers && defaultObj.answers[index] && defaultObj.answers[index].answer
                  }
                  setValue={setValue}
                  mode='onChange'
                  onKeyPress={event => {
                    checkValueLength(event, ANSWER_LENGTH)
                  }}
                />
              </FieldWrapper>
              <Checkbox
                size='large'
                defaultChecked={
                  defaultObj && defaultObj.answers && defaultObj.answers[index] && defaultObj.answers[index].correct
                }
                checked={
                  values &&
                  values.buffer &&
                  values.buffer.answers &&
                  values.buffer.answers[index] &&
                  values.buffer.answers[index].correct
                }
                onChange={() => {
                  register({ name: `${field}.answers[${index}].correct` })
                  setValue(`${field}.answers[${index}].correct`, !values[field].answers[`${index}`].correct)
                }}
              >
                {intl.get('todo.cards.stepsSettings.correct')}
              </Checkbox>
            </QuestionWrapper>
            <Error errors={errors} destination={`${field}.answers[${index}].answer`} />
          </Form.Item>
        ))}
      <BtnWrapper>
        <Button onClick={handleAddQuestion}>
          <Icon type='plus' />
          {intl.get('todo.cards.stepsSettings.addAnswer')}
        </Button>
      </BtnWrapper>
    </Wrapper>
  )
}

Question.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  activeStepIndex: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  field: PropTypes.string,
  unregister: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired
}

Question.defaultProps = {
  values: {},
  errors: {},
  activeStepIndex: null,
  field: null
}

export default Question
