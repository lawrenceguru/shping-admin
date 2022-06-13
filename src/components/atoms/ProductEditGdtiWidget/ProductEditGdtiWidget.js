import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { RHFInput } from 'react-hook-form-input'
import { Checkbox, Form, Select } from 'antd'
import intl from 'react-intl-universal'
import ProductEditWidgetWrapper from '../ProductEditWidgetWrapper'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import WidgetHeaderSwitchMode from '../../molecules/WidgetHeaderSwitchMode'
import Error from '../Error'

const { Option } = Select

const ProductEditGdtiWidget = ({
  register,
  setValue,
  setError,
  data,
  sources,
  activeSource,
  widgetIndex,
  isSelectsDisable,
  errors,
  clearError,
  completeGdtiList,
  completeListGdtiIsLoading,
  gdtiInfo,
  isLoadingGdtiInfo,
  getGdtiCompleteLike,
  getGdtiInfo
}) => {
  useEffect(() => {
    if (data && data.gdti && data.gdti.gdti) {
      getGdtiInfo([data.gdti.gdti])
    }
  }, [])

  const setErrorMessage = () => {
    setError(`sources[${activeSource}].data[${widgetIndex}].gdti`, 'notMatch', intl.get('validation.requiredField'))
  }

  const checkGdtiField = () => {
    if (!data.gdti.gdti) {
      setErrorMessage()
    } else {
      clearError(`sources[${activeSource}].data[${widgetIndex}].gdti`)
    }
  }

  useEffect(() => {
    checkGdtiField()
  }, [])

  const setSources = (field, value) => {
    const newSources = [...sources]
    newSources[activeSource].data[widgetIndex].gdti[field] = value
    setValue('sources', newSources)
  }

  return (
    <ProductEditWidgetWrapper
      headerText={intl.get('widgets.gdti.title')}
      id={data.id}
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
      smallSize
    >
      <Form.Item label={intl.get('widgets.gdti.label')}>
        <p
          style={{
            marginBottom: 20,
            position: 'absolute',
            top: '-28px',
            right: '-5px'
          }}
        >
          <RHFInput
            as={
              <Checkbox
                size='large'
                disabled={isSelectsDisable}
                defaultChecked={(data.gdti && data.gdti.inline) || false}
              />
            }
            register={register}
            value={(data.gdti && data.gdti.inline) || false}
            onChange={e => {
              setSources('inline', e.target.checked)
            }}
            setValue={setValue}
          >
            Inline
          </RHFInput>
        </p>
        <Select
          showSearch
          style={{ width: '100%' }}
          onSearch={value => getGdtiCompleteLike(value)}
          getPopupContainer={trigger => trigger.parentNode}
          loading={completeListGdtiIsLoading || isLoadingGdtiInfo}
          value={data.gdti && data.gdti.gdti}
          placeholder={intl.get('widgets.gdti.placeholder')}
          onChange={value => {
            setSources('gdti', value)
            checkGdtiField()
          }}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {[
            ...gdtiInfo,
            ...completeGdtiList.filter(item => !gdtiInfo.find(element => element.value === item.value))
          ].map(product => (
            <Option style={{ fontSize: 16 }} key={product.value} value={product.value}>
              {product.label}
            </Option>
          ))}
        </Select>
        <Error errors={errors} destination={`sources[${activeSource}].data[${widgetIndex}].gdti`} />
      </Form.Item>
    </ProductEditWidgetWrapper>
  )
}

ProductEditGdtiWidget.propTypes = {
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
  isSelectsDisable: PropTypes.bool,
  getGdtiCompleteLike: PropTypes.func.isRequired,
  completeGdtiList: PropTypes.arrayOf(PropTypes.object),
  completeListGdtiIsLoading: PropTypes.bool,
  gdtiInfo: PropTypes.arrayOf(PropTypes.object),
  getGdtiInfo: PropTypes.func.isRequired,
  isLoadingGdtiInfo: PropTypes.bool
}

ProductEditGdtiWidget.defaultProps = {
  errors: {},
  data: {},
  sources: [],
  isSelectsDisable: false,
  completeGdtiList: [],
  completeListGdtiIsLoading: false,
  gdtiInfo: [],
  isLoadingGdtiInfo: false
}

export default ProductEditGdtiWidget
