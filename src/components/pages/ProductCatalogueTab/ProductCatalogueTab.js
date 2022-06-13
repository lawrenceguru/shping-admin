import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import ProductTable from '../../organisms/ProductTable'

const ProductCatalogueTab = ({
  getProductsList,
  products,
  count,
  isLoadingProductsList,
  isDeletingGtin,
  deleteGtin,
  customIndexFields,
  defaultIndexFields,
  brands,
  indexFieldsProductsGetIndexInfo,
  currentParticipant
}) => {
  return (
    <ProductTable
      products={products}
      count={count}
      hiddenFields={['image', 'id', 'name', 'brand_id']}
      getProductsList={getProductsList}
      isLoadingProductsList={isLoadingProductsList}
      customIndexFields={customIndexFields}
      defaultIndexFields={defaultIndexFields}
      indexFieldsProductsGetIndexInfo={indexFieldsProductsGetIndexInfo}
      isDeletingGtin={isDeletingGtin}
      deleteGtin={deleteGtin}
      brands={brands}
      isDeleteIconExist
      showPreviewOnClick
      showAddButton
      showBrands
      showIndexFields
      showConfigurableButton
      isProductPage
      currentParticipant={currentParticipant}
      isHaveImport
    />
  )
}

ProductCatalogueTab.propTypes = {
  getProductsList: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.object),
  isLoadingProductsList: PropTypes.bool,
  count: PropTypes.number,
  isDeletingGtin: PropTypes.bool,
  customIndexFields: PropTypes.arrayOf(PropTypes.object),
  defaultIndexFields: PropTypes.arrayOf(PropTypes.object),
  deleteGtin: PropTypes.func.isRequired,
  brands: PropTypes.arrayOf(PropTypes.object),
  indexFieldsProductsGetIndexInfo: PropTypes.func.isRequired,
  currentParticipant: PropTypes.string.isRequired
}

ProductCatalogueTab.defaultProps = {
  isLoadingProductsList: false,
  customIndexFields: [],
  defaultIndexFields: [],
  isDeletingGtin: false,
  products: [],
  brands: [],
  count: 0
}

export default withRouter(ProductCatalogueTab)
