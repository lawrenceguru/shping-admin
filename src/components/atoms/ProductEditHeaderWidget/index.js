import React, { useCallback, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import ProductEditTitlesView from '../../molecules/ProductEditTitlesView'

const HEADER_TEXT_LENGTH = 20

const ProductEditHeaderWidget = ({
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
    clearError(`sources[${activeSource}].data[${widgetIndex}].header.text`)
  }

  const setHeaderError = useCallback(() => {
    setError(
      `sources[${activeSource}].data[${widgetIndex}].header.text`,
      'notMatch',
      intl.get('validation.requiredField')
    )
  }, [activeSource, widgetIndex])

  const validationFieldValue = value => {
    clearTitleError()
    if (!value) {
      setHeaderError()
    }
  }

  useEffect(() => {
    if (!data.header || !data.header.text) {
      setHeaderError()
    }
  }, [])

  const setHeaderValue = value => {
    const newSources = [...sources]
    newSources[activeSource].data[widgetIndex].header.text = value
    setValue('sources', newSources)
  }

  const remainingValue = HEADER_TEXT_LENGTH - (data.header && data.header.text && data.header.text.length) || 0

  const handleValueChange = value => {
    let newValue = value.trimLeft().replace('  ', ' ')
    if (value.length > HEADER_TEXT_LENGTH) {
      newValue = newValue.substring(0, HEADER_TEXT_LENGTH)
    }
    validationFieldValue(newValue)
    setHeaderValue(newValue)
  }

  const destination = useMemo(() => `sources[${activeSource}].data[${widgetIndex}].header.text`, [
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
      headerText='Header'
      field='header'
    />
  )
}

ProductEditHeaderWidget.propTypes = {
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

ProductEditHeaderWidget.defaultProps = {
  errors: {},
  data: {},
  sources: [],
  isSelectsDisable: false
}

export default ProductEditHeaderWidget
