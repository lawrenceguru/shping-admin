import React, { useEffect, useMemo, useCallback, useState } from 'react'
import { withRouter } from 'react-router-dom'
import useForm from 'react-hook-form'
import PropTypes from 'prop-types'
import moment from 'moment'
import intl from 'react-intl-universal'
import { Wrapper, ButtonsWrapper } from './styles'
import TodoDeliveryEditorSummary from '../../organisms/TodoDeliveryEditorSummary'
import TodoDeliveryEditorForm from '../../organisms/TodoDeliveryEditorForm'
import Button from '../../atoms/Button'
import { getDataInFormatUTCToAPi } from '../../../utils/helpers/date'
import { convertFromUint256, normalizeFloat, toReadableNumber } from '../../../utils/helpers/mathOperations'

const INITIAL_VALUES = {
  name: '',
  card_id: '',
  rewardAdjustmentActive: false,
  mode: 'delayed',
  start_offset: {
    month: ''
  },
  count: null,
  productRadio: 'all',
  deliveryTiming: 'immediately',
  start_date: moment().format('M/D/YYYY'),
  end_date: null,
  adjustment: {
    result: null,
    coins_step: 1
  },
  audience: {
    languages: [],
    countries: [],
    gender: 'any',
    ageRange: [],
    registration_methods: [],
    weekly_scans: { from: '', to: '' },
    scan_countries: []
  },
  card_name: '',
  card_result_coins: ''
}

const TodoDeliveryEditor = ({
  editItemId,
  todoCards,
  settingsGetCountries,
  settingsGetLanguages,
  countries,
  languages,
  isLoadingCountries,
  isLoadingLanguages,
  isTodoCardsLoading,
  history,
  todoCreateTodoDelivery,
  todoUpdateTodoDelivery,
  todoDeliveries,
  todoClearSelectedTodoDelivery,
  updated,
  todoGetTodoCards
}) => {
  const [editCountries, setEditCountries] = useState([])
  const [editLanguages, setEditLanguages] = useState([])
  const [editScanCountries, setEditScanCountries] = useState([])

  const getEditCard = useCallback((id, cards, initial) => {
    const removeValues = [
      'card',
      'id',
      'owner',
      'card_promo_image',
      'card_competition',
      'card_action',
      'card_auto_approve',
      'card_description',
      'card_icon',
      'card_owner',
      'card_steps'
    ]
    const findCard = cards.find(element => element.id === id)
    const editCard = { ...initial, ...findCard }

    if (findCard && findCard.adjustment) {
      editCard.adjustment = { ...findCard.adjustment }
    }
    removeValues.forEach(item => {
      delete editCard[item]
    })
    editCard.start_date = moment(editCard.start_date, 'YYYY-MM-DD').format('M/D/YYYY')
    if (editCard.end_date) {
      editCard.end_date = moment(editCard.end_date, 'YYYY-MM-DD').format('M/D/YYYY')
    }
    editCard.audience = { ...initial.audience, ...editCard.audience }

    const ageRange = []
    if (editCard.audience.min_age) {
      ageRange.push(editCard.audience.min_age)
      delete editCard.audience.min_age
    } else {
      ageRange.push(0)
    }

    if (editCard.audience.max_age) {
      ageRange.push(editCard.audience.max_age === 100 ? 75 : editCard.audience.max_age)
      delete editCard.audience.max_age
    } else {
      ageRange.push(ageRange[0] ? ageRange[0] : 0)
    }

    editCard.audience.ageRange = ageRange

    if (editCard.audience.countries.length) {
      setEditCountries([...editCard.audience.countries])
      editCard.audience.countries = []
    }

    if (editCard.audience.languages.length) {
      setEditLanguages([...editCard.audience.languages])
      editCard.audience.languages = []
    }

    if (editCard.audience.scan_countries.length) {
      setEditScanCountries([...editCard.audience.scan_countries])
      editCard.audience.scan_countries = []
    }

    if (editCard.adjustment.result && editCard.adjustment.coins_step) {
      const value = toReadableNumber(editCard.adjustment.coins_step)
      delete editCard.adjustment.coins_step
      editCard.adjustment.coins_step = value
    }

    if (editCard.budget && editCard.budget.length > 10) {
      editCard.budget = Math.ceil(convertFromUint256(editCard.budget))
    }

    return editCard
  }, [])
  const initialState = useMemo(() => {
    if (editItemId) {
      return getEditCard(editItemId, todoDeliveries, INITIAL_VALUES)
    }
    return INITIAL_VALUES
  }, [todoDeliveries, editItemId])

  const {
    watch,
    errors,
    getValues,
    clearError,
    setValue,
    register,
    unregister,
    triggerValidation,
    setError,
    reset
  } = useForm({
    defaultValues: initialState,
    reValidateMode: 'onChange'
  })

  const disabled = errors && Object.keys(errors).length

  const all = watch()

  const values = useMemo(() => {
    return getValues({ nest: true })
  }, [all])
  const isActive = useMemo(() => {
    return values && values.status === 'active'
  }, [values])

  const name = localStorage.getItem('lang') === 'en' ? 'name' : `name_${localStorage.getItem('lang')}`

  useEffect(() => {
    if (!countries || !countries.length) {
      settingsGetCountries()
    }
    if (!languages || !languages.length) {
      settingsGetLanguages()
    }
    if ((!todoCards || !todoCards.length) && !isTodoCardsLoading) {
      todoGetTodoCards()
    }

    return () => {
      todoClearSelectedTodoDelivery()
      reset(null)
    }
  }, [])

  useEffect(() => {
    if (updated) {
      history.push('/admin/todo-cards/deliveries')
    }
  }, [updated])

  useEffect(() => {
    if (editItemId) {
      const res = getEditCard(editItemId, todoDeliveries, INITIAL_VALUES)
      Object.keys(res).forEach(key => {
        if (key !== 'audience' && key !== 'adjustment' && key !== 'start_offset') {
          register({ name: key, type: 'custom' })
        }
      })

      register({ name: 'rewardAdjustmentActive' })
      if (res.adjustment.coins_step && res.adjustment.result) {
        setValue('rewardAdjustmentActive', true)
        register({ name: 'adjustment.result' })
        setValue('adjustment.result', res.adjustment && res.adjustment.result)

        register({ name: 'adjustment.coins_step' })
        setValue('adjustment.coins_step', res.adjustment && res.adjustment.coins_step)
      } else {
        setValue('rewardAdjustmentActive', false)
      }

      if (res.start_offset) {
        register({ name: 'start_offset.months' })
        setValue('start_offset.months', res.start_offset && res.start_offset.month)
      }

      register({ name: 'productRadio' })
      if (res.products) {
        setValue('productRadio', 'choose')

        register({ name: 'products' })
        setValue('products', res.products)
      } else {
        setValue('productRadio', 'all')
      }

      if (res.end_date) {
        setValue('deliveryTiming', 'setData')
      }

      Object.keys(res.audience).forEach(key => {
        if (key === 'weekly_scans') {
          register({ name: `audience.${key}.from` })
          setValue(`audience.${key}.from`, res.audience.weekly_scans.from)

          register({ name: `audience.${key}.to` })
          setValue(`audience.${key}.to`, res.audience.weekly_scans.to)
        } else {
          register({ name: `audience.${key}` })
          setValue(`audience.${key}`, res.audience[key])
        }
      })
    }
  }, [todoDeliveries, editItemId])

  const getValuesFromArray = (array, searchKey, key, searchArray) => {
    const result = []
    array.forEach(item => {
      const findIndex = searchArray.findIndex(element => element[searchKey] === item)
      if (findIndex !== -1) {
        result.push(searchArray[findIndex][key])
      }
    })
    return result
  }

  useEffect(() => {
    if (countries && countries.length && editCountries && editCountries.length) {
      const result = getValuesFromArray(editCountries, 'iso', name, countries)

      register({ name: 'audience.countries' })
      setValue('audience.countries', result)

      setEditCountries([])
    }
  }, [countries, editCountries])

  useEffect(() => {
    if (countries && countries.length && editScanCountries && editScanCountries.length) {
      const result = getValuesFromArray(editScanCountries, 'iso', name, countries)

      register({ name: 'audience.scan_countries' })
      setValue('audience.scan_countries', result)

      setEditScanCountries([])
    }
  }, [countries, editScanCountries])

  useEffect(() => {
    if (languages && languages.length && editLanguages && editLanguages.length) {
      const result = getValuesFromArray(editLanguages, 'code', name, languages)

      register({ name: 'audience.languages' })
      setValue('audience.languages', result)

      setEditLanguages([])
    }
  }, [languages, editLanguages])

  const onSubmit = useCallback(() => {
    const data = { ...values }

    delete data.card_name
    delete data.deliveryTiming
    delete data.productRadio

    data.start_date = getDataInFormatUTCToAPi(data.start_date, 'M/D/YYYY')

    if (!data.end_date) {
      delete data.end_date
    } else {
      data.end_date = getDataInFormatUTCToAPi(data.end_date, 'M/D/YYYY', false)
    }

    if (!data.rewardAdjustmentActive) {
      delete data.adjustment
    } else {
      data.adjustment.result = parseFloat(data.adjustment.result)
      data.adjustment.coins_step = normalizeFloat(data.adjustment.coins_step)
    }

    delete data.rewardAdjustmentActive
    delete data.points

    if (!data.card_result_coins) {
      data.status = 'active'
      delete data.budget
    } else {
      data.budget = normalizeFloat(data.budget)
    }

    if (data.count) {
      data.count = Number(data.count)
    }

    delete data.card_result_coins

    if (data.audience && data.audience.countries && data.audience.countries.length === 0) {
      delete data.audience.countries
    } else {
      const isoCountries = getValuesFromArray(data.audience.countries, name, 'iso', countries)
      data.audience.countries = [...isoCountries]
    }

    if (data.audience && data.audience.scan_countries && data.audience.scan_countries.length === 0) {
      delete data.audience.scan_countries
    } else {
      const isoCountries = getValuesFromArray(data.audience.scan_countries, name, 'iso', countries)
      data.audience.scan_countries = [...isoCountries]
    }

    if (data.audience && data.audience.languages && data.audience.languages.length === 0) {
      delete data.audience.languages
    } else {
      const codeLanguages = getValuesFromArray(data.audience.languages, name, 'code', languages)
      data.audience.languages = [...codeLanguages]
    }

    if (data.audience && data.audience.ageRange && data.audience.ageRange.length === 0) {
      delete data.audience.ageRange
    } else {
      if (data.audience.ageRange[0] !== 0) {
        // eslint-disable-next-line prefer-destructuring
        data.audience.min_age = data.audience.ageRange[0]
      }
      if (data.audience.ageRange[1] !== 0) {
        data.audience.max_age = data.audience.ageRange[1] === 75 ? 100 : data.audience.ageRange[1]
      }
    }

    delete data.audience.ageRange

    if (data.audience && data.audience.gender && data.audience.gender === 'any') {
      delete data.audience.gender
    }

    if (data.audience && data.audience.registration_methods && data.audience.registration_methods.length === 0) {
      delete data.audience.registration_methods
    }

    if (data.mode !== 'delayPast') {
      delete data.start_offset
    }

    if (
      data.audience &&
      data.audience.weekly_scans &&
      !data.audience.weekly_scans.from &&
      !data.audience.weekly_scans.to
    ) {
      delete data.audience.weekly_scans
    } else {
      data.audience.weekly_scans.from = Number(data.audience.weekly_scans.from)
      data.audience.weekly_scans.to = Number(data.audience.weekly_scans.to)
    }

    if (!data.products) {
      data.products = null
    }
    // eslint-disable-next-line no-unused-expressions
    editItemId ? todoUpdateTodoDelivery({ id: editItemId, data }) : todoCreateTodoDelivery(data)
  }, [values])

  const handleCancel = useCallback(() => {
    history.push('/admin/todo-cards/deliveries')
  }, [])

  const handleOnClickFinished = useCallback(() => {
    triggerValidation().then(isValid => {
      if (isValid) {
        onSubmit()
      }
    })
  }, [onSubmit])

  return (
    <Wrapper>
      <TodoDeliveryEditorForm
        watch={watch}
        errors={errors}
        values={values}
        clearError={clearError}
        setValue={setValue}
        register={register}
        unregister={unregister}
        isTodoCardsLoading={isTodoCardsLoading}
        isLoadingCountries={isLoadingCountries}
        isLoadingLanguages={isLoadingLanguages}
        countries={countries}
        languages={languages}
        todoCards={todoCards}
        setError={setError}
        name={name}
        isActive={isActive}
      />
      <TodoDeliveryEditorSummary values={values} />
      <ButtonsWrapper>
        <div>
          <Button size='large' onClick={handleCancel}>
            {intl.get('cancel')}
          </Button>
          <Button type='danger' size='large' onClick={handleOnClickFinished} disabled={!!disabled || isActive}>
            {intl.get('serializationTasks.serializationStep.finish')}
          </Button>
        </div>
      </ButtonsWrapper>
    </Wrapper>
  )
}

TodoDeliveryEditor.propTypes = {
  todoCards: PropTypes.arrayOf(PropTypes.object),
  languages: PropTypes.arrayOf(PropTypes.object),
  countries: PropTypes.arrayOf(PropTypes.object),
  settingsGetCountries: PropTypes.func.isRequired,
  settingsGetLanguages: PropTypes.func.isRequired,
  isLoadingCountries: PropTypes.bool,
  isLoadingLanguages: PropTypes.bool,
  isTodoCardsLoading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  editItemId: PropTypes.string,
  todoCreateTodoDelivery: PropTypes.func.isRequired,
  todoUpdateTodoDelivery: PropTypes.func.isRequired,
  todoDeliveries: PropTypes.arrayOf(PropTypes.object),
  todoClearSelectedTodoDelivery: PropTypes.func.isRequired,
  updated: PropTypes.bool,
  todoGetTodoCards: PropTypes.func.isRequired
}

TodoDeliveryEditor.defaultProps = {
  todoCards: [],
  todoDeliveries: [],
  languages: [],
  countries: [],
  isLoadingCountries: false,
  isLoadingLanguages: false,
  isTodoCardsLoading: false,
  editItemId: null,
  updated: false
}

export default withRouter(TodoDeliveryEditor)
