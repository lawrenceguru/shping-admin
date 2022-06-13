import React, { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Form, Select } from 'antd'
import ProductEditWidgetWrapper from '../ProductEditWidgetWrapper'
import WidgetHeaderSwitchMode from '../../molecules/WidgetHeaderSwitchMode'

const { Option } = Select

const currentLocale = localStorage.getItem('lang')

const ProductEditMadeInWidget = ({
  setValue,
  countries,
  data,
  sources,
  activeSource,
  widgetIndex,
  setError,
  clearError,
  isSelectsDisable
}) => {
  const setCountryError = useCallback(() => {
    setError(
      `sources[${activeSource}].data[${widgetIndex}].made_in.country`,
      'notMatch',
      intl.get('validation.requiredField')
    )
  }, [activeSource, widgetIndex])

  useEffect(() => {
    if (!data.made_in.country) {
      setCountryError()
    }
  }, [])

  const handleValueChange = value => {
    const newSources = [...sources]
    newSources[activeSource].data[widgetIndex].made_in.country = value
    setValue('sources', newSources)
  }

  return (
    <ProductEditWidgetWrapper
      headerText={intl.get('widgets.madeIn.title')}
      id={data.id}
      smallSize
      HeaderPanel={() => (
        <WidgetHeaderSwitchMode
          setValue={setValue}
          data={data}
          sources={sources}
          activeSource={activeSource}
          widgetIndex={widgetIndex}
          isSelectsDisable={isSelectsDisable}
        />
      )}
    >
      <Form.Item label={intl.get('widgets.madeIn.selectTitle')}>
        <Select
          showSearch
          style={{ width: '100%' }}
          optionFilterProp='children'
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          getPopupContainer={trigger => trigger.parentNode}
          value={(data.made_in && data.made_in.country) || undefined}
          placeholder={intl.get('widgets.madeIn.placeholder')}
          onChange={value => {
            handleValueChange(value)
            clearError(`sources[${activeSource}].data[${widgetIndex}].made_in.country`)
          }}
        >
          {countries.map(el => (
            <Option style={{ fontSize: 16 }} key={el.iso} value={el.iso}>
              {currentLocale !== 'en' ? el[`name_${currentLocale}`] : el.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </ProductEditWidgetWrapper>
  )
}

ProductEditMadeInWidget.propTypes = {
  setValue: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  activeSource: PropTypes.number.isRequired,
  widgetIndex: PropTypes.number.isRequired,
  sources: PropTypes.arrayOf(PropTypes.object),
  isSelectsDisable: PropTypes.bool,
  countries: PropTypes.arrayOf(PropTypes.object)
}

ProductEditMadeInWidget.defaultProps = {
  data: {},
  sources: [],
  countries: [],
  isSelectsDisable: false
}

export default ProductEditMadeInWidget
