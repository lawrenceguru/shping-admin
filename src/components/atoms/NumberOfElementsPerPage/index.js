import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'

const { Option } = Select
const NumberOfElementsPerPage = ({ paginationSize, handleChangePaginationSize }) => {
  return (
    <Select
      defaultValue={paginationSize}
      value={paginationSize}
      style={{ width: 120 }}
      onChange={handleChangePaginationSize}
      getPopupContainer={trigger => trigger.parentNode}
    >
      {[10, 20, 30, 40, 50]
        .filter(el => el !== paginationSize)
        .map(el => (
          <Option key={el} style={{ color: 'rgb(178,179,178)', fontFamily: 'Roboto', fontWeight: 600 }} value={el}>
            {el}
          </Option>
        ))}
    </Select>
  )
}

NumberOfElementsPerPage.propTypes = {
  paginationSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChangePaginationSize: PropTypes.func
}

NumberOfElementsPerPage.defaultProps = {
  paginationSize: null,
  handleChangePaginationSize: null
}

export default NumberOfElementsPerPage
