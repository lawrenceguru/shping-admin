import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import ProductTable from '../../organisms/ProductTable'
import { localizationDefaultIndexFields } from '../../../utils/helpers/localization'

const SerializedProductsTab = ({
  serializedProductsGetProducts,
  products,
  count,
  isLoadingSerializedProducts,
  customIndexFields,
  defaultIndexFields,
  indexFieldsSerializationGetIndexInfo,
  currentParticipant,
  serializedProductsSetProductsOrder,
  orderState
}) => {
  return (
    <ProductTable
      products={products}
      count={count}
      showDatamatrix
      showConfigurableButton
      hiddenFields={['image', 'id', 'name', 'brand_id', 'gtin', 'code', 'datamatrix_code', 'custody']}
      getProductsList={serializedProductsGetProducts}
      isLoadingProductsList={isLoadingSerializedProducts}
      customIndexFields={customIndexFields}
      defaultIndexFields={localizationDefaultIndexFields(defaultIndexFields)}
      indexFieldsProductsGetIndexInfo={indexFieldsSerializationGetIndexInfo}
      currentParticipant={currentParticipant}
      startFilterByDate
      serializedProductsSetProductsOrder={serializedProductsSetProductsOrder}
      orderState={orderState}
    />
  )
}

SerializedProductsTab.propTypes = {
  serializedProductsGetProducts: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.object),
  count: PropTypes.number,
  isLoadingSerializedProducts: PropTypes.bool,
  customIndexFields: PropTypes.arrayOf(PropTypes.object),
  defaultIndexFields: PropTypes.arrayOf(PropTypes.object),
  indexFieldsSerializationGetIndexInfo: PropTypes.func.isRequired,
  currentParticipant: PropTypes.string.isRequired,
  serializedProductsSetProductsOrder: PropTypes.func.isRequired,
  orderState: PropTypes.string
}

SerializedProductsTab.defaultProps = {
  products: [],
  count: null,
  isLoadingSerializedProducts: false,
  customIndexFields: [],
  defaultIndexFields: [],
  orderState: null
}

export default withRouter(SerializedProductsTab)
