import React, { useCallback, useEffect, useMemo } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Select, Checkbox } from 'antd'
import { RHFInput } from 'react-hook-form-input'
import useForm from 'react-hook-form'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import * as ST from './styles'
import CustomInputNumber from '../../molecules/CustomInputNumber'
import Error from '../../atoms/Error'
import Button from '../../atoms/Button'
import Loader from '../../templates/Loader'

const { Option } = Select

const initialValues = {
  isAllProducts: false,
  products: [],
  brands: [],
  positionProductInfoAll: null,
  positionProductInfo: null
}

const DocumentsAttachmentsTab = ({
  history,
  allBrands,
  isLoadingBrands,
  completeList,
  completeListIsLoading,
  indexFieldsProductsGetBrands,
  getProductCompleteLike,
  attachedGtin,
  attachedBrands,
  isAllProducts,
  positionProductInfo,
  positionProductInfoAll,
  getGdtiAttachedGtin,
  match,
  attachedGtinIsLoading,
  gdtiAttachProducts,
  gdtiGlobalAttachProducts,
  getRequestAttachedGtinIsLoading
}) => {
  const { watch, register, setValue, errors, getValues, unregister } = useForm({
    defaultValues: initialValues
  })
  const disabled = !!(errors && Object.keys(errors).length)
  const all = watch()

  const values = useMemo(() => {
    return getValues({ nest: true })
  }, [all])

  useEffect(() => {
    if (!allBrands || !allBrands.length || !isLoadingBrands) {
      indexFieldsProductsGetBrands()
    }

    getGdtiAttachedGtin(match.params.id)
  }, [])

  useEffect(() => {
    if (isAllProducts !== null) {
      register({ name: `isAllProducts` })
      setValue('isAllProducts', isAllProducts)
    }
  }, [isAllProducts])

  useEffect(() => {
    if (attachedGtin && attachedGtin.length) {
      setValue(
        'products',
        attachedGtin.map(gtin => gtin.value)
      )
      setValue('positionProductInfo', positionProductInfo)
    }
  }, [attachedGtin])

  useEffect(() => {
    if (attachedBrands && attachedBrands.length) {
      setValue(
        'brands',
        attachedBrands.map(gtin => gtin.value)
      )
      setValue('positionProductInfo', positionProductInfo)
    }
  }, [attachedBrands])

  useEffect(() => {
    if (positionProductInfo !== null) {
      setValue('positionProductInfo', positionProductInfo)
    }
  }, [positionProductInfo])

  useEffect(() => {
    if (positionProductInfoAll !== null) {
      setValue('positionProductInfoAll', positionProductInfoAll)
    }
  }, [positionProductInfoAll])

  const handleBackToDocuments = useCallback(() => {
    history.push('/admin/documents')
  }, [history])

  const handleOnSubmit = useCallback(() => {
    const data = { ...values }
    data.gdtiId = match.params.id

    if (data.isAllProducts) {
      data.positionProductInfoAll = data.positionProductInfoAll ? Number(data.positionProductInfoAll) : null
      gdtiGlobalAttachProducts(data)
    } else {
      data.positionProductInfo = data.positionProductInfo ? Number(data.positionProductInfo) : null
      gdtiAttachProducts(data)
    }
  }, [values, match])
  return attachedGtinIsLoading || getRequestAttachedGtinIsLoading ? (
    <Loader />
  ) : (
    <>
      <ST.StyledForm>
        <Form.Item>
          <Checkbox
            size='large'
            defaultChecked={values && values.isAllProducts}
            checked={values && values.isAllProducts}
            onChange={() => {
              register({ name: `isAllProducts` })
              setValue(`isAllProducts`, !values.isAllProducts)
            }}
          >
            {intl.get('documents.attach.allProducts')}
          </Checkbox>
        </Form.Item>
        <ST.ConditionsWrapper isVisible={!values.isAllProducts}>
          <Form.Item label={intl.get('documents.attach.productsLabel')}>
            <RHFInput
              as={
                <Select
                  showSearch
                  size='large'
                  mode='multiple'
                  loading={completeListIsLoading}
                  getPopupContainer={trigger => trigger.parentNode}
                  placeholder={intl.get('documents.attach.selectPlaceholder')}
                  onSearch={value => getProductCompleteLike(value)}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {[
                    ...attachedGtin,
                    ...completeList.filter(item => !attachedGtin.find(element => element.value === item.value))
                  ].map(product => (
                    <Option style={{ fontSize: 16 }} key={product.value} value={product.value}>
                      {product.label}
                    </Option>
                  ))}
                </Select>
              }
              name='products'
              register={register}
              unregister={unregister}
              setValue={setValue}
              defaultValue={values.products || []}
            />
          </Form.Item>
          <Form.Item label={intl.get('documents.attach.brandsLabel')}>
            <RHFInput
              as={
                <Select
                  showSearch
                  size='large'
                  mode='multiple'
                  loading={isLoadingBrands}
                  getPopupContainer={trigger => trigger.parentNode}
                  placeholder={intl.get('documents.attach.selectPlaceholder')}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {allBrands.map(brand => (
                    <Option style={{ fontSize: 16 }} key={brand.id} value={brand.id}>
                      {brand.id}
                    </Option>
                  ))}
                </Select>
              }
              name='brands'
              register={register}
              unregister={unregister}
              setValue={setValue}
              defaultValue={values.brands || []}
            />
          </Form.Item>
          <Form.Item label={intl.get('documents.attach.positionLabel')}>
            <RHFInput
              as={<CustomInputNumber placeholder={intl.get('documents.attach.positionProductLabel')} />}
              name='positionProductInfo'
              rules={{
                validate: {
                  graterThenZero: value =>
                    value !== '' && Number(value) === 0 ? intl.get('documents.attach.zeroError') : true
                }
              }}
              register={register}
              unregister={unregister}
              setValue={setValue}
              mode='onChange'
            />
            <Error errors={errors} destination='positionProductInfo' />
          </Form.Item>
        </ST.ConditionsWrapper>
        <ST.ConditionsWrapper isVisible={values.isAllProducts}>
          <Form.Item label={intl.get('documents.attach.positionLabel')}>
            <RHFInput
              as={<CustomInputNumber placeholder={intl.get('documents.attach.positionProductLabel')} />}
              name='positionProductInfoAll'
              register={register}
              unregister={unregister}
              setValue={setValue}
              mode='onChange'
            />
            <Error errors={errors} destination='positionProductInfo' />
          </Form.Item>
        </ST.ConditionsWrapper>
      </ST.StyledForm>
      <ST.ButtonsWrapper>
        <div>
          <Button size='large' onClick={handleBackToDocuments}>
            {intl.get('documents.form.back')}
          </Button>
          <Button type='danger' size='large' onClick={handleOnSubmit} disabled={disabled}>
            {intl.get('save')}
          </Button>
        </div>
      </ST.ButtonsWrapper>
    </>
  )
}

DocumentsAttachmentsTab.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  allBrands: PropTypes.arrayOf(PropTypes.object),
  isLoadingBrands: PropTypes.bool,
  completeList: PropTypes.arrayOf(PropTypes.object),
  completeListIsLoading: PropTypes.bool,
  indexFieldsProductsGetBrands: PropTypes.func.isRequired,
  getProductCompleteLike: PropTypes.func.isRequired,
  attachedGtin: PropTypes.arrayOf(PropTypes.object),
  attachedBrands: PropTypes.arrayOf(PropTypes.object),
  isAllProducts: PropTypes.bool,
  positionProductInfo: PropTypes.number,
  positionProductInfoAll: PropTypes.number,
  getGdtiAttachedGtin: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  attachedGtinIsLoading: PropTypes.bool,
  gdtiAttachProducts: PropTypes.func.isRequired,
  gdtiGlobalAttachProducts: PropTypes.func.isRequired,
  getRequestAttachedGtinIsLoading: PropTypes.bool
}

DocumentsAttachmentsTab.defaultProps = {
  attachedGtin: [],
  allBrands: [],
  completeList: [],
  isLoadingBrands: false,
  completeListIsLoading: false,
  attachedBrands: [],
  isAllProducts: false,
  positionProductInfo: null,
  positionProductInfoAll: null,
  attachedGtinIsLoading: false,
  getRequestAttachedGtinIsLoading: false
}

export default withRouter(DocumentsAttachmentsTab)
