import React from 'react'
import PropTypes from 'prop-types'
import { AutoComplete } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getProductCompleteLike } from 'store/actions'

const { Option } = AutoComplete

const GTINAutoComplete = ({ value, onChange }) => {
  const dispatch = useDispatch()
  const gtins = useSelector(({ products }) => products.completeList)

  const handleOnChange = () => {
    dispatch(getProductCompleteLike(''))
  }
  const handleAutoSearch = v => {
    dispatch(getProductCompleteLike(v))
  }
  return (
    <AutoComplete onSearch={handleAutoSearch} onSelect={handleOnChange} value={value} onChange={onChange}>
      {Array.isArray(gtins) &&
        gtins.map(gtin => (
          <Option key={gtin.value} value={gtin.value}>
            {gtin.value}
          </Option>
        ))}
    </AutoComplete>
  )
}
GTINAutoComplete.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

GTINAutoComplete.defaultProps = {
  value: ''
}

export default GTINAutoComplete
