import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import IndexFields from '../../molecules/IndexFields'

const IndexFieldsProducts = ({
  indexFieldsProductsGetIndexInfo,
  customIndexFields,
  defaultIndexFields,
  indexFieldsProductsPostIndexInfo,
  isLoadingIndexInfo
}) => {
  useEffect(() => {
    indexFieldsProductsGetIndexInfo()
  }, [])

  return (
    <IndexFields
      defaultIndexFields={defaultIndexFields}
      isLoadingIndexInfo={isLoadingIndexInfo}
      customIndexFields={customIndexFields}
      indexPostIndexInfo={indexFieldsProductsPostIndexInfo}
    />
  )
}

IndexFieldsProducts.propTypes = {
  customIndexFields: PropTypes.arrayOf(PropTypes.object),
  defaultIndexFields: PropTypes.arrayOf(PropTypes.object),
  indexFieldsProductsGetIndexInfo: PropTypes.func.isRequired,
  indexFieldsProductsPostIndexInfo: PropTypes.func.isRequired,
  isLoadingIndexInfo: PropTypes.bool
}

IndexFieldsProducts.defaultProps = {
  customIndexFields: [],
  defaultIndexFields: [],
  isLoadingIndexInfo: false
}

export default withRouter(IndexFieldsProducts)
