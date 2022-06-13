import React, { useCallback, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import ProductEditTitlesView from '../../molecules/ProductEditTitlesView'

const TITLE_LENGTH = 50

const ProductEditTitleWidget = ({
  register,
  setValue,
  clearError,
  setError,
  errors,
  data,
  sources,
  activeSource,
  widgetIndex,
  isSelectsDisable
}) => {
  const clearTitleError = () => {
    clearError(`sources[${activeSource}].data[${widgetIndex}].title.text`)
  }

  const setTitleError = useCallback(() => {
    setError(
      `sources[${activeSource}].data[${widgetIndex}].title.text`,
      'notMatch',
      intl.get('validation.requiredField')
    )
  }, [activeSource, widgetIndex])

  const validationFieldValue = value => {
    clearTitleError()
    if (!value) {
      setTitleError()
    }
  }

  useEffect(() => {
    if (!data.title || !data.title.text) {
      setTitleError()
    }
  }, [])

  const remainingValue = TITLE_LENGTH - (data.title && data.title.text && data.title.text.length) || 0

  const setTitleValue = value => {
    const newSources = [...sources]
    newSources[activeSource].data[widgetIndex].title.text = value
    setValue('sources', newSources)
  }

  const handleValueChange = value => {
    let newValue = value.trimLeft().replace('  ', ' ')
    if (value.length > TITLE_LENGTH) {
      newValue = newValue.substring(0, TITLE_LENGTH)
    }
    validationFieldValue(newValue)
    setTitleValue(newValue)
  }

  const destination = useMemo(() => `sources[${activeSource}].data[${widgetIndex}].title.text`, [
    activeSource,
    widgetIndex
  ])

  return (
    <ProductEditTitlesView
      register={register}
      setValue={setValue}
      errors={errors}
      data={data}
      sources={sources}
      activeSource={activeSource}
      widgetIndex={widgetIndex}
      isSelectsDisable={isSelectsDisable}
      remainingValue={remainingValue}
      handleValueChange={handleValueChange}
      destination={destination}
      headerText='Title'
      field='title'
    />
  )
}

ProductEditTitleWidget.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  activeSource: PropTypes.number.isRequired,
  widgetIndex: PropTypes.number.isRequired,
  sources: PropTypes.arrayOf(PropTypes.object),
  isSelectsDisable: PropTypes.bool
}

ProductEditTitleWidget.defaultProps = {
  errors: {},
  data: {},
  sources: [],
  isSelectsDisable: false
}

export default ProductEditTitleWidget
