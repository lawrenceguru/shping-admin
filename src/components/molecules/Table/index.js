import React, { useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import Loader from '../../templates/Loader'
import CustomPagination from '../../atoms/CustomPagination'
import { TableWrapper } from './styles'
import { useWindowSize } from './utils'

const CustomTable = ({
  columns,
  data,
  totalCounts,
  limit,
  pagination,
  loading,
  rowSelection,
  handlePagination,
  rowKey,
  onRowClick,
  noScroll,
  scroll,
  isNotRenderOnEmptyData,
  currentPage,
  onChange
}) => {
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1)
  const [width] = useWindowSize()
  const tableTotalCounts = useMemo(() => {
    if (totalCounts) {
      return totalCounts
    }
    return data && data.length
  }, [totalCounts, data])

  const isTableLoading = useMemo(() => ({ spinning: loading, indicator: <Loader /> }), [loading])

  const tableLimit = useMemo(() => {
    if (limit) {
      return limit
    }
    return 20
  }, [totalCounts, limit])

  const dataSource = useMemo(() => {
    return data && data.length
      ? data.slice((currentPaginationPage - 1) * tableLimit, tableLimit * currentPaginationPage)
      : []
  }, [data, currentPaginationPage, tableLimit])

  const lastPage = useMemo(() => Math.ceil(tableTotalCounts / tableLimit), [tableTotalCounts, tableLimit])

  useEffect(() => {
    if (currentPaginationPage > lastPage) {
      setCurrentPaginationPage(1)
      if (handlePagination) {
        handlePagination(1)
      }
    }
  }, [lastPage])

  const renderTable = useMemo(() => {
    return !isNotRenderOnEmptyData ? true : !!tableTotalCounts
  }, [isNotRenderOnEmptyData, tableTotalCounts])

  return (
    renderTable && (
      <TableWrapper>
        <Table
          columns={columns}
          dataSource={pagination && !handlePagination ? dataSource : data}
          pagination={false}
          loading={isTableLoading}
          rowSelection={rowSelection}
          rowKey={rowKey}
          scroll={scroll || (noScroll ? {} : { x: width <= 1500 ? 1200 : null })}
          onRow={record => {
            return {
              onClick: () => {
                if (onRowClick) {
                  onRowClick(record)
                }
              }
            }
          }}
          onChange={onChange}
        />
        {pagination && lastPage > 1 && (
          <CustomPagination
            currentPaginationPage={currentPage || currentPaginationPage}
            paginationSize={tableLimit}
            handlePagination={page => {
              if (handlePagination) {
                handlePagination(page)
              }
              setCurrentPaginationPage(page)
            }}
            count={tableTotalCounts}
            lastPage={lastPage}
            size='small'
          />
        )}
      </TableWrapper>
    )
  )
}

CustomTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  totalCounts: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pagination: PropTypes.bool,
  loading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  rowSelection: PropTypes.object,
  rowKey: PropTypes.string,
  onRowClick: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  scroll: PropTypes.object,
  noScroll: PropTypes.bool,
  handlePagination: PropTypes.func,
  isNotRenderOnEmptyData: PropTypes.bool,
  currentPage: PropTypes.number,
  onChange: PropTypes.func
}

CustomTable.defaultProps = {
  columns: [],
  data: [],
  rowSelection: null,
  totalCounts: null,
  limit: null,
  pagination: false,
  loading: false,
  rowKey: '',
  onRowClick: null,
  scroll: null,
  noScroll: false,
  handlePagination: null,
  isNotRenderOnEmptyData: false,
  currentPage: null,
  onChange: null
}

export default CustomTable
