import React from 'react'
import PropTypes from 'prop-types'
import { RHFInput } from 'react-hook-form-input'
import { Form, Input } from 'antd'
import ProductEditWidgetWrapper from '../../atoms/ProductEditWidgetWrapper'
import WidgetHeaderSwitchMode from '../WidgetHeaderSwitchMode'
import Error from '../../atoms/Error'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import WidgetRemaining from '../../atoms/WidgetRemaining'

const ProductEditTitlesView = ({
  register,
  setValue,
  errors,
  data,
  sources,
  activeSource,
  widgetIndex,
  isSelectsDisable,
  remainingValue,
  handleValueChange,
  destination,
  headerText,
  field
}) => {
  return (
    <ProductEditWidgetWrapper
      headerText={headerText}
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
      <Form.Item label='Content'>
        <WidgetRemaining value={remainingValue} />
        <RHFInput
          as={<Input size='large' disabled={isSelectsDisable} />}
          rules={{ required: true }}
          register={register}
          setValue={setValue}
          value={data && data[field] && data[field].text}
          onChange={e => {
            const { value } = e.target
            handleValueChange(value)
          }}
        />
        <Error destination={destination} errors={errors} />
      </Form.Item>
    </ProductEditWidgetWrapper>
  )
}

ProductEditTitlesView.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  activeSource: PropTypes.number.isRequired,
  widgetIndex: PropTypes.number.isRequired,
  sources: PropTypes.arrayOf(PropTypes.object),
  isSelectsDisable: PropTypes.bool,
  remainingValue: PropTypes.number.isRequired,
  handleValueChange: PropTypes.func.isRequired,
  destination: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired
}

ProductEditTitlesView.defaultProps = {
  errors: {},
  data: {},
  sources: [],
  isSelectsDisable: false
}

export default ProductEditTitlesView
