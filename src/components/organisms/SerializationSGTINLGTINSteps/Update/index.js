import React, { useEffect, useState } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import uuid from 'uuid4'
import { toast } from 'react-toastify'
import CustomButton from '../../../molecules/Button'
import SerializationSourceWidget from '../../../atoms/SerializationSourceWidget'
import SerializationTextWidget from '../../../atoms/SerializationTextWidget'
import ProductWidgets from '../../SerializationProductWidgets'
import { InfoWrapper, InfoProductWrapper, WidgetsWrapper, AdditionalButtonsWrapper } from './styles'
import SerializationStepsHeader from '../../../atoms/SerializationStepsHeader'
import SerializationImageWidget from '../../../atoms/SerializationImageWidget'

const Update = ({
  values,
  register,
  errors,
  setValue,
  setError,
  clearError,
  setIsSubmit,
  unregister,
  containerRef,
  triggerValidation
}) => {
  const [isAdvancedMode, setIsAdvancedMode] = useState(values && values.isAdvancedMode)

  const deleteErrors = () => {
    const keyForDeleting = []
    if (isAdvancedMode) {
      Object.keys(errors).forEach(key => {
        if (key.startsWith('source[')) {
          keyForDeleting.push(key)
        }
      })
    } else {
      Object.keys(errors).forEach(key => {
        if (key.startsWith('sources[')) {
          keyForDeleting.push(key)
        }
      })
    }

    keyForDeleting.forEach(key => {
      // eslint-disable-next-line no-param-reassign
      delete errors[key]
    })
  }

  useEffect(() => {
    return () => {
      const keyForDeleting = []

      Object.keys(errors).forEach(key => {
        if (key.startsWith('source[')) {
          keyForDeleting.push(key)
        }
      })
      Object.keys(errors).forEach(key => {
        if (key.startsWith('sources[')) {
          keyForDeleting.push(key)
        }
      })
      keyForDeleting.forEach(key => {
        // eslint-disable-next-line no-param-reassign
        delete errors[key]
      })
    }
  }, [])

  const checkIsEmptySource = sources => {
    let isEmptySource = false
    sources.forEach(el => {
      if (!el.data || !el.data.length) {
        isEmptySource = true
      }
    })
    return isEmptySource
  }

  const onSubmit = actualErrors => {
    if (Object.entries(actualErrors).length === 0 && actualErrors.constructor === Object) {
      if (checkIsEmptySource(values.sources)) {
        toast.error(intl.get('serializationTasks.serializationStep.fourthStep.alertText'))
      }
    }
    return true
  }

  useEffect(() => {
    setIsSubmit({
      call: actualErrors =>
        new Promise((resolve, reject) => {
          triggerValidation().then(result => {
            if (result) {
              if (isAdvancedMode && !onSubmit(actualErrors)) {
                reject()
              }
              resolve()
            }
          })
        })
    })
  }, [isAdvancedMode])

  useEffect(() => {
    setValue('isAdvancedMode', isAdvancedMode)
    deleteErrors()
  }, [isAdvancedMode])

  const addWidget = type => {
    const newValues = { ...values.source }

    if (type === 'text') {
      newValues.data.push({ text: { title: '', text: '' } })
    }
    if (type === 'image') {
      newValues.data.push({
        image: [{ url: null }],
        id: uuid()
      })
    }
    setValue('source', newValues)
  }

  const deleteWidget = index => {
    const newValues = { ...values.source }
    newValues.data.splice(index, 1)
    setValue('source', newValues)
  }

  return (
    <div>
      <SerializationStepsHeader firstHeaderText={intl.get('serializationTasks.serializationStep.fourthStep.header')} />
      <InfoWrapper>
        <InfoProductWrapper>
          <span>
            {intl.get('serializationTasks.serializationStep.fourthStep.gtin')}{' '}
            {values && values.select && values.select.gtin}
          </span>
          <span>
            {intl.get('serializationTasks.serializationStep.fourthStep.name')}{' '}
            {values && values.select && values.select.name}
          </span>
        </InfoProductWrapper>
        <CustomButton
          text={
            isAdvancedMode ? intl.get('widgets.nutrition_info.default') : intl.get('widgets.nutrition_info.advanced')
          }
          width='120px'
          handleClick={() => {
            setIsAdvancedMode(!isAdvancedMode)
          }}
        />
      </InfoWrapper>
      {!isAdvancedMode && (
        <WidgetsWrapper>
          <SerializationSourceWidget
            register={register}
            errors={errors}
            setValue={setValue}
            setError={setError}
            clearError={clearError}
            values={values}
            activeSource={values && values.activeSource}
          />
          <SerializationTextWidget
            register={register}
            errors={errors}
            setValue={setValue}
            setError={setError}
            clearError={clearError}
            values={values}
            index={0}
            deleteWidget={deleteWidget}
          />
          {values &&
            values.source &&
            values.source.data &&
            values.source.data.map((el, index) => {
              if (index > 0) {
                return Object.keys(el)[0] !== 'text' ? (
                  <SerializationImageWidget
                    /* eslint-disable-next-line react/no-array-index-key */
                    key={index}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    setError={setError}
                    clearError={clearError}
                    source={values.source}
                    data={el}
                    widgetIndex={index}
                    triggerValidation={triggerValidation}
                    deleteWidget={deleteWidget}
                  />
                ) : (
                  <SerializationTextWidget
                    errors={errors}
                    setValue={setValue}
                    setError={setError}
                    clearError={clearError}
                    values={values}
                    index={index}
                    deleteWidget={deleteWidget}
                  />
                )
              }
              return null
            })}
          <AdditionalButtonsWrapper>
            <CustomButton
              type='danger'
              handleClick={() => addWidget('image')}
              text={intl.get('serializationTasks.serializationStep.fourthStep.addImage')}
            />
            <CustomButton
              type='danger'
              handleClick={() => addWidget('text')}
              width='140px'
              text={intl.get('serializationTasks.serializationStep.fourthStep.addText')}
            />
          </AdditionalButtonsWrapper>
        </WidgetsWrapper>
      )}
      {isAdvancedMode && (
        <ProductWidgets
          containerRef={containerRef}
          register={register}
          errors={errors}
          setValue={setValue}
          setError={setError}
          clearError={clearError}
          values={{ ...values }}
          setIsSubmit={setIsSubmit}
          unregister={unregister}
          triggerValidation={triggerValidation}
        />
      )}
    </div>
  )
}

Update.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  clearError: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  unregister: PropTypes.func.isRequired,
  triggerValidation: PropTypes.func.isRequired,
  setIsSubmit: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  containerRef: PropTypes.object
}

Update.defaultProps = {
  values: null,
  containerRef: {},
  errors: {}
}

export default Update
