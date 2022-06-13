import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import IndexFields from '../../molecules/IndexFields'

const IndexFieldsSerialization = ({
  indexFieldsSerializationGetIndexInfo,
  customIndexFields,
  defaultIndexFields,
  indexFieldsSerializationPostIndexInfo,
  isLoadingIndexInfo
}) => {
  useEffect(() => {
    indexFieldsSerializationGetIndexInfo()
  }, [])

  return (
    <IndexFields
      defaultIndexFields={defaultIndexFields}
      isLoadingIndexInfo={isLoadingIndexInfo}
      customIndexFields={customIndexFields}
      indexPostIndexInfo={indexFieldsSerializationPostIndexInfo}
    />
  )
}

IndexFieldsSerialization.propTypes = {
  customIndexFields: PropTypes.arrayOf(PropTypes.object),
  defaultIndexFields: PropTypes.arrayOf(PropTypes.object),
  indexFieldsSerializationGetIndexInfo: PropTypes.func.isRequired,
  indexFieldsSerializationPostIndexInfo: PropTypes.func.isRequired,
  isLoadingIndexInfo: PropTypes.bool
}

IndexFieldsSerialization.defaultProps = {
  customIndexFields: [],
  defaultIndexFields: [],
  isLoadingIndexInfo: false
}

export default withRouter(IndexFieldsSerialization)
