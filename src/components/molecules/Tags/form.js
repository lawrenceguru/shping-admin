import React from 'react'
import PropTypes from 'prop-types'
import Tags from './index'

const TagFormItem = ({ value, onChange }) => {
  return <Tags initialTags={value} onChangeVaue={onChange} />
}

TagFormItem.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func
}

TagFormItem.defaultProps = {
  value: null,
  onChange: undefined
}

export default TagFormItem
