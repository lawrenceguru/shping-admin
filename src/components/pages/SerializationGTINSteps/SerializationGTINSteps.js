import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import useForm from 'react-hook-form'
import moment from 'moment'
import { stepperSteps as steps } from '../../../utils/steps'
import StepsForm from '../../organisms/StepsForm'
import { defaultValues } from './consts'
import getModifiedWidgetsDataForServer from '../../../utils/getModifiedWidgetsDataForServer'
import getModifiedAttributesForServer from '../../../utils/getModifiedAttributesForServer'

// eslint-disable-next-line no-unused-vars
const SerializationGTINSteps = ({ serializationGetGtinValues, containerRef }) => {
  const {
    register,
    triggerValidation,
    getValues,
    setValue,
    errors,
    setError,
    clearError,
    watch,
    unregister,
    formState,
    reset
  } = useForm({
    reValidateMode: 'onChange',
    defaultValues: JSON.parse(JSON.stringify(defaultValues))
  })
  const watchAllValues = watch()

  const clearStore = () => {
    reset({
      ...defaultValues,
      sources: [{ conditions: {} }],
      source: { conditions: {}, data: [{ text: { title: undefined, text: undefined } }] }
    })
  }

  useEffect(() => {
    register({ name: 'sources' })
    register({ name: 'activeSource' })
    register({ name: 'source' })
    register({ name: 'settings' })
    register({ name: 'isAdvancedMode' })
    register({ name: 'serialization' })

    register({ name: 'tradeItem.gpc_segment' })
    register({ name: 'tradeItem.gpc_family' })
    register({ name: 'tradeItem.gpc_class' })
    register({ name: 'tradeItem.gpc_brick' })
    register({ name: 'tradeItem.gpc_brick_attributes' })

    setValue('tradeItem.gpc_brick_attributes', [{ key: undefined, value: undefined }])
    return () => {
      clearStore()
    }
  }, [])

  const values = useMemo(() => {
    return getValues({ nest: true })
  }, [watchAllValues])

  const getValidValuesGTIN = val => {
    const validVal = {}

    const { isAdvancedMode } = val
    Object.keys(val).map(el => {
      if (el === 'serialization') {
        if (val[el].count) validVal.count = Number(val[el].count)
        if (val[el].data_type && val[el].data_type.length) validVal.data_type = val[el].data_type
        if (val[el].format) validVal.format = val[el].format
        if (val[el].length) validVal.length = Number(val[el].length)
        if (val[el].sequence) validVal.sequence = val[el].sequence
        if (val[el].type) validVal.type = val[el].type
        if (val[el].AdditionalTypes && val[el].AdditionalTypes.length) {
          validVal.ai = val[el].AdditionalTypes.map(({ type, content }) => {
            const inputField = Number(type) <= 17 ? 'datepicker' : 'textbox'
            const updateType = type && type.value ? type.value : type
            let returnData

            if (inputField === 'textbox' && updateType && content) {
              const end = content && content.split('.').length === 2 ? 7 : 6
              const split = content && content.substring(0, end).split('.')

              if (split) {
                const valLength = split.length
                const substringCount = valLength === 2 ? 7 : 6
                const decimalPointCount = valLength - 1 ? split[valLength - 1].length : 0
                const wholeNumber = content.substring(0, substringCount).replace('.', '')
                const zeroCount = wholeNumber.length < 6 ? 6 - wholeNumber.length : 0
                let leadingZero = ''

                // eslint-disable-next-line no-plusplus
                for (let x = 0; x < zeroCount; x++) {
                  leadingZero += '0'
                }

                returnData = `${updateType}${decimalPointCount}${leadingZero}${wholeNumber}`
              }
            }

            if (inputField === 'datepicker' && updateType && content) {
              returnData = content ? `${updateType}${moment(content).format('YYMMDD')}` : ''
            }

            return returnData
          }).filter(ai => ai)
        }
      }
      if (el === 'select') {
        validVal.gtin = val[el].gtin
        validVal.name = val[el].name
      }
      if (el === 'settings') {
        validVal.settings = val[el]
      }

      if (el === 'sources' && isAdvancedMode) {
        if (Object.entries(errors).length === 0 && errors.constructor === Object) {
          const newSources = getModifiedWidgetsDataForServer(val[el], true, false)
          const newTradeItem = {
            gpc_segment: (val[el].tradeItem && val[el].tradeItem.gpc_segment) || undefined,
            gpc_family: (val[el].tradeItem && val[el].tradeItem.gpc_family) || undefined,
            gpc_class: (val[el].tradeItem && val[el].tradeItem.gpc_class) || undefined,
            gpc_brick: (val[el].tradeItem && val[el].tradeItem.gpc_brick) || undefined,
            gpc_brick_attributes: getModifiedAttributesForServer(val) || undefined
          }

          setValue('sources', newSources)
          setValue('tradeItem', newTradeItem)

          validVal.sources = val[el]
          validVal.gpc_segment = newTradeItem.gpc_segment || undefined
          validVal.gpc_family = newTradeItem.gpc_family || undefined
          validVal.gpc_class = newTradeItem.gpc_class || undefined
          validVal.gpc_brick = newTradeItem.gpc_brick || undefined
          validVal.gpc_brick_attributes = newTradeItem.gpc_brick_attributes || undefined
        }
      }
      if (el === 'source' && !isAdvancedMode && val.serialization.Update) {
        if (val[el].data[0].text.title !== '' && val[el].data[0].text.text !== '') {
          validVal.source = val[el]
        }
      }
      if (el === 'location') {
        validVal.location = val[el]
      }
      return undefined
    })

    return validVal
  }

  const createTask = () => {
    const newValues = getValidValuesGTIN(values)
    serializationGetGtinValues({ values: newValues })
  }

  return (
    <StepsForm
      createTask={createTask}
      steps={steps}
      containerRef={containerRef}
      clearStore={clearStore}
      register={register}
      setValue={setValue}
      values={values}
      setError={setError}
      errors={errors}
      clearError={clearError}
      triggerValidation={triggerValidation}
      unregister={unregister}
      formState={formState}
      getValues={getValues}
      finalStepIndex={5}
    />
  )
}

SerializationGTINSteps.propTypes = {
  serializationGetGtinValues: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  containerRef: PropTypes.object.isRequired
}

export default SerializationGTINSteps
