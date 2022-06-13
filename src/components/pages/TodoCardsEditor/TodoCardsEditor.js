import React, { useEffect, useMemo } from 'react'
import useForm from 'react-hook-form'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import { stepperTodoCardsSteps as steps } from '../../../utils/steps'
import TodoStepForm from '../../organisms/TodoStepForm'
import { normalizeFloat, convertFromUint256 } from '../../../utils/helpers/mathOperations'

const initialValues = {
  name: '',
  icon: '',
  promo_image: '',
  description: '',
  result: {
    coins: ''
  },
  competition_toggle: false,
  competition: {
    prize: '',
    terms_conds: '',
    eligibility: ''
  },
  auto_approve: true,
  steps: [],
  buffer: null
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  > div:first-child {
    flex-basis: 60%;
  }
}
`

const PreviewWrapper = styled.div`
  display: flex;
  position: sticky;
  top: 80px;
  height: fit-content;
  flex-basis: 30%;
  width: 100%;
}
`

const TodoCardsEditor = ({
  history,
  editItemId,
  todoCards,
  todoClearSelectedTodoCard,
  todoCreateTodoCards,
  todoUpdateTodoCards,
  isTodoCardsUpdating,
  isTodoCardsCreating,
  updated
}) => {
  const initialState = useMemo(() => {
    if (editItemId) {
      return todoCards.find(element => element.id === editItemId)
    }
    return initialValues
  }, [todoCards, editItemId])

  const {
    watch,
    register,
    setValue,
    errors,
    setError,
    clearError,
    getValues,
    triggerValidation,
    unregister,
    reset
  } = useForm({
    defaultValues: JSON.parse(JSON.stringify(initialState))
  })

  useEffect(() => {
    if (updated) {
      history.push('/admin/todo-cards')
    }
  }, [updated])

  const all = watch()
  const titleWatcher = watch('buffer.title')
  const questionWatcher = watch('buffer.question')
  const textWatcher = watch('buffer.text')
  const nameWatcher = watch('name')
  const descriptionWatcher = watch('description')
  const prizeWatcher = watch('competition.prize')
  const termsWatcher = watch('competition.terms_conds')
  const eligibilityWatcher = watch('competition.eligibility')

  const values = useMemo(() => {
    return getValues({ nest: true })
  }, [all])

  useEffect(() => {
    if (editItemId) {
      const res = todoCards.find(element => element.id === editItemId)

      Object.keys(res).forEach(key => {
        if (key !== 'owner' && key !== 'id' && key !== 'steps' && key !== 'competition' && key !== 'result') {
          register({ name: key, type: 'custom' })
        }
      })
      register({ name: 'steps', type: 'custom' }, { required: true })
      setValue('steps', res.steps)

      register({ name: 'result.coins' })
      if (res.result && res.result.coins) {
        setValue('result.coins', convertFromUint256(res.result.coins))
      }

      if (res.competition) {
        register({ name: 'competition_toggle' })
        setValue('competition_toggle', true)
        register({ name: 'competition.prize' })
        setValue('competition.prize', res.competition.prize)
        register({ name: 'competition.terms_conds' })
        setValue('competition.terms_conds', res.competition.terms_conds)
        register({ name: 'competition.eligibility' })
        setValue('competition.eligibility', res.competition.eligibility)
      }
    }
  }, [todoCards, editItemId])

  useEffect(() => {
    return () => {
      todoClearSelectedTodoCard()
      reset(null)
    }
  }, [])

  useEffect(() => {
    if (titleWatcher && titleWatcher.length > 100) {
      setValue('buffer.title', titleWatcher.substr(0, 100))
      clearError('buffer.title')
    }
  }, [titleWatcher])

  useEffect(() => {
    if (questionWatcher && questionWatcher.length > 100) {
      setValue('buffer.question', questionWatcher.substr(0, 100))
      clearError('buffer.question')
    }
  }, [questionWatcher])

  useEffect(() => {
    if (textWatcher && textWatcher.length > 500) {
      setValue('buffer.text', textWatcher.substr(0, 500))
      clearError('buffer.text')
    }
  }, [textWatcher])

  useEffect(() => {
    if (nameWatcher && nameWatcher.length > 100) {
      setValue('name', nameWatcher.substr(0, 100))
      clearError('name')
    }
  }, [nameWatcher])

  useEffect(() => {
    if (descriptionWatcher && descriptionWatcher.length > 500) {
      setValue('description', descriptionWatcher.substr(0, 500))
      clearError('description')
    }
  }, [descriptionWatcher])

  useEffect(() => {
    if (prizeWatcher && prizeWatcher.length > 100) {
      setValue('competition.prize', prizeWatcher.substr(0, 250))
      clearError('competition.prize')
    }
  }, [prizeWatcher])

  useEffect(() => {
    if (termsWatcher && termsWatcher.length > 250) {
      setValue('competition.terms_conds', termsWatcher.substr(0, 250))
      clearError('competition.terms_conds')
    }
  }, [termsWatcher])

  useEffect(() => {
    if (eligibilityWatcher && eligibilityWatcher.length > 250) {
      setValue('competition.eligibility', eligibilityWatcher.substr(0, 250))
      clearError('competition.eligibility')
    }
  }, [eligibilityWatcher])

  useEffect(() => {
    if (all['buffer.answers']) {
      all['buffer.answers'].forEach((item, index) => {
        if (item.answer && item.answer.length > 100) {
          setValue(`buffer.answers[${index}].answer`, item.answer.substr(0, 100))
          clearError(`buffer.answers[${index}].answer`)
        }
      })
    }
  }, [all])

  const onSubmit = async () => {
    const data = { ...values, buffer: undefined }

    if (!data.competition_toggle && editItemId) {
      data.competition_toggle = undefined
      data.competition = null
    } else if (!data.competition_toggle) {
      data.competition_toggle = undefined
      data.competition = undefined
    }

    if ((!data.result || !data.result.coins) && editItemId) {
      data.result = null
    } else if (!data.result || !data.result.coins) {
      data.result = undefined
    } else if (data.result && data.result.coins) {
      data.result.coins = normalizeFloat(data.result.coins)
    }

    if (!data.promo_image) {
      data.promo_image = undefined
    }

    if (!data.steps || !data.steps.length) {
      toast.error('At least 1 step must be added')
      return
    }
    // eslint-disable-next-line no-unused-expressions
    editItemId ? todoUpdateTodoCards({ id: editItemId, data }) : todoCreateTodoCards(data)
  }

  return (
    <Wrapper>
      <TodoStepForm
        steps={steps}
        register={register}
        setValue={setValue}
        errors={errors}
        setError={setError}
        clearError={clearError}
        finalStepIndex={1}
        values={values}
        triggerValidation={triggerValidation}
        unregister={unregister}
        reset={reset}
        createTask={onSubmit}
        nextBtnText='Continue'
        disabled={isTodoCardsUpdating || isTodoCardsCreating}
      />
      <PreviewWrapper id='portal-for-todo-steps' />
    </Wrapper>
  )
}

TodoCardsEditor.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  editItemId: PropTypes.string,
  todoCards: PropTypes.arrayOf(PropTypes.object),
  todoClearSelectedTodoCard: PropTypes.func.isRequired,
  todoCreateTodoCards: PropTypes.func.isRequired,
  todoUpdateTodoCards: PropTypes.func.isRequired,
  isTodoCardsUpdating: PropTypes.bool,
  isTodoCardsCreating: PropTypes.bool,
  updated: PropTypes.bool
}

TodoCardsEditor.defaultProps = {
  editItemId: null,
  todoCards: [],
  updated: false,
  isTodoCardsCreating: false,
  isTodoCardsUpdating: false
}

export default withRouter(TodoCardsEditor)
