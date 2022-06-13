import React, { useEffect } from 'react'
import { Input, Select, Form } from 'antd'
import { RHFInput } from 'react-hook-form-input'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import BarcodeBuilderInput from '../../molecules/BarcodeBuilderInput'
import ProductEditWidgetWrapper from '../ProductEditWidgetWrapper'
import Error from '../Error'

const { Option } = Select

const ProductEditInfoWidget = ({
  register,
  values,
  brands,
  setValue,
  setError,
  errors,
  clearError,
  isNewProduct,
  companyPrefix,
  triggerValidation,
  addComputedCheckValue,
  participantType
}) => {
  useEffect(() => {
    register({ name: 'mainInfo.barcodeNumber.id' })
    register({ name: 'mainInfo.name' }, { required: intl.get('validation.requiredField') })
    register({ name: 'mainInfo.brand' })
  }, [register])

  useEffect(() => {
    if (isNewProduct) {
      triggerValidation()
    }
  }, [])

  return (
    <ProductEditWidgetWrapper headerText={intl.get('widgets.mainInfo.product')}>
      <fieldset name='mainInfo' key='mainInfo'>
        <Form.Item label={intl.get('widgets.mainInfo.barcodeNumber')}>
          {!isNewProduct ? (
            <RHFInput
              as={<Input size='large' />}
              rules={{ required: true }}
              name='mainInfo.barcodeNumber.id'
              register={register}
              setValue={setValue}
              value={values.mainInfo.barcodeNumber.id}
              disabled
            />
          ) : (
            <BarcodeBuilderInput
              register={register}
              setValue={setValue}
              values={values}
              setError={setError}
              errors={errors}
              clearError={clearError}
              companyPrefix={companyPrefix}
              triggerValidation={triggerValidation}
              addComputedCheckValue={addComputedCheckValue}
            />
          )}
        </Form.Item>
        <Form.Item label={intl.get('widgets.mainInfo.productName')}>
          <RHFInput
            as={<Input size='large' />}
            rules={{ required: true }}
            name='mainInfo.name'
            register={register}
            setValue={setValue}
            value={values.mainInfo.name}
            onChange={e => {
              clearError('mainInfo.name')
              const { value } = e.target
              if (value.trim() === '') {
                setError('mainInfo.name', 'notMatch', intl.get('validation.requiredField'))
              }
            }}
          />
          <Error errors={errors} destination='mainInfo.name' />
        </Form.Item>
        {participantType !== 'expert' && (
          <Form.Item label={intl.get('widgets.mainInfo.brandName')}>
            <Select
              size='large'
              showSearch
              style={{ width: '100%' }}
              optionFilterProp='children'
              value={values.mainInfo.brand}
              getPopupContainer={trigger => trigger.parentNode}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              onChange={value => setValue('mainInfo.brand', value)}
            >
              {brands
                ? brands.map(brand => (
                    <Option style={{ fontSize: 18 }} key={brand.id} value={brand.id}>
                      {brand.id}
                    </Option>
                  ))
                : null}
            </Select>
          </Form.Item>
        )}
      </fieldset>
    </ProductEditWidgetWrapper>
  )
}

ProductEditInfoWidget.propTypes = {
  register: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  brands: PropTypes.arrayOf(PropTypes.object),
  setValue: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  isNewProduct: PropTypes.bool.isRequired,
  companyPrefix: PropTypes.arrayOf(PropTypes.string),
  triggerValidation: PropTypes.func.isRequired,
  addComputedCheckValue: PropTypes.func.isRequired,
  participantType: PropTypes.string
}

ProductEditInfoWidget.defaultProps = {
  errors: {},
  values: {},
  brands: [],
  companyPrefix: null,
  participantType: null
}

export default ProductEditInfoWidget
