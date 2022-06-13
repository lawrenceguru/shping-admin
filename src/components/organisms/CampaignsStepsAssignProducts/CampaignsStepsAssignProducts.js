import React, { useEffect } from 'react'
import { Checkbox, Form, Select } from 'antd'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { RHFInput } from 'react-hook-form-input'
import * as ST from './styles'
import Loader from '../../templates/Loader'

const { Option } = Select

const CampaignsStepsAssignProducts = ({
  getGdtiForRewardsCompleteLike,
  completeList,
  completeListIsLoading,
  values,
  register,
  setValue,
  productInfo,
  getProductsInfo,
  isLoadingProductInfo,
  isHaveNotAllProductsOption
}) => {
  useEffect(() => {
    if (values && values.products && values.products.length) {
      getProductsInfo(values.products)
    }
  }, [])
  return isLoadingProductInfo ? (
    <Loader />
  ) : (
    <ST.StyledForm>
      {!isHaveNotAllProductsOption && (
        <Form.Item>
          <Checkbox
            size='large'
            defaultChecked={values && values.allProducts}
            checked={values && values.allProducts}
            onChange={() => {
              register({ name: `allProducts` })
              setValue(`allProducts`, !values.allProducts)
            }}
          >
            {intl.get('documents.attach.allProducts')}
          </Checkbox>
        </Form.Item>
      )}
      <ST.ConditionsWrapper isVisible={isHaveNotAllProductsOption || !(values && values.allProducts)}>
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
                onSearch={value =>
                  getGdtiForRewardsCompleteLike({
                    searchString: value,
                    partnerBrand: !!(values && values.partner_brand)
                  })
                }
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {[
                  ...productInfo,
                  ...completeList.filter(item => !productInfo.find(element => element.value === item.value))
                ].map(product => (
                  <Option style={{ fontSize: 16 }} key={product.value} value={product.value}>
                    {product.label}
                  </Option>
                ))}
              </Select>
            }
            name='products'
            register={register}
            setValue={setValue}
            defaultValue={(values && values.products) || []}
          />
        </Form.Item>
      </ST.ConditionsWrapper>
    </ST.StyledForm>
  )
}

CampaignsStepsAssignProducts.propTypes = {
  getGdtiForRewardsCompleteLike: PropTypes.func.isRequired,
  completeList: PropTypes.arrayOf(PropTypes.object),
  completeListIsLoading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  productInfo: PropTypes.arrayOf(PropTypes.object),
  getProductsInfo: PropTypes.func.isRequired,
  isLoadingProductInfo: PropTypes.bool,
  isHaveNotAllProductsOption: PropTypes.bool
}

CampaignsStepsAssignProducts.defaultProps = {
  completeList: [],
  completeListIsLoading: false,
  values: null,
  productInfo: [],
  isLoadingProductInfo: false,
  isHaveNotAllProductsOption: false
}

export default CampaignsStepsAssignProducts
