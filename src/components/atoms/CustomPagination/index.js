import React from 'react'
import { Pagination, Button, Icon } from 'antd'
import PropTypes from 'prop-types'
import { PaginationWrapper } from './styles'

const CustomPagination = ({
  paginationSize,
  handlePagination,
  currentPaginationPage,
  count,
  lastPage,
  size,
  style
}) => {
  return (
    <PaginationWrapper style={style}>
      <Button disabled={currentPaginationPage === 1} onClick={() => handlePagination(1)}>
        <Icon type='double-left' />
      </Button>
      <Pagination
        pageSize={paginationSize}
        onChange={handlePagination}
        current={currentPaginationPage}
        total={count}
        size={size}
      />
      <Button disabled={currentPaginationPage === lastPage} onClick={() => handlePagination(lastPage)}>
        <Icon type='double-right' />
      </Button>
    </PaginationWrapper>
  )
}

CustomPagination.propTypes = {
  paginationSize: PropTypes.number.isRequired,
  handlePagination: PropTypes.func.isRequired,
  currentPaginationPage: PropTypes.number.isRequired,
  count: PropTypes.number,
  lastPage: PropTypes.number.isRequired,
  size: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object
}

CustomPagination.defaultProps = {
  size: null,
  style: null,
  count: null
}

export default CustomPagination
