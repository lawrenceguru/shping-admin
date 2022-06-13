import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import IndexFields from '../../molecules/IndexFields'

const IndexFieldsDocuments = ({
  indexFieldsDocumentsGetIndexInfo,
  customIndexFields,
  defaultIndexFields,
  indexFieldsDocumentsPostIndexInfo,
  isLoadingIndexInfo
}) => {
  useEffect(() => {
    indexFieldsDocumentsGetIndexInfo()
  }, [])

  return (
    <IndexFields
      defaultIndexFields={defaultIndexFields}
      isLoadingIndexInfo={isLoadingIndexInfo}
      customIndexFields={customIndexFields}
      indexPostIndexInfo={indexFieldsDocumentsPostIndexInfo}
    />
  )
}

IndexFieldsDocuments.propTypes = {
  customIndexFields: PropTypes.arrayOf(PropTypes.object),
  defaultIndexFields: PropTypes.arrayOf(PropTypes.object),
  indexFieldsDocumentsGetIndexInfo: PropTypes.func.isRequired,
  indexFieldsDocumentsPostIndexInfo: PropTypes.func.isRequired,
  isLoadingIndexInfo: PropTypes.bool
}

IndexFieldsDocuments.defaultProps = {
  customIndexFields: [],
  defaultIndexFields: [],
  isLoadingIndexInfo: false
}

export default withRouter(IndexFieldsDocuments)
