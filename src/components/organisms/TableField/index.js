import React, { useEffect, useRef, useState } from 'react'
import { Table } from 'antd'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroller'
import * as ST from './styles'
import Loader from '../../templates/Loader'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'
import FilterPanel from '../../molecules/FilterPanel'

const TableField = ({
  dataSource,
  columns,
  name,
  setValue,
  register,
  unregister,
  isRequired,
  requiredField,
  loading,
  totalItems,
  itemsForSort,
  options,
  filterOptions,
  setCurrItemsForSort,
  setDefaultSort,
  handleFilter,
  defaultFiltersState,
  customHandleSort,
  rowSelection,
  customHandleOnRowClick,
  handleInfiniteOnLoad,
  hasMore,
  isSetActiveRow,
  editItemActiveId,
  disabled
}) => {
  const [activeRow, setActiveRow] = useState(null)
  const tableRef = useRef(null)

  useEffect(() => {
    register({ name }, { required: isRequired && intl.get('todo.cards.form.required') })
    return () => unregister(name)
  }, [])

  useEffect(() => {
    if (editItemActiveId) {
      const keyItem = dataSource.filter(element => element.id === editItemActiveId).map(item => item.key)
      setActiveRow(keyItem[0])
    }
  }, [editItemActiveId, dataSource])

  const handleOnRowClick = record => {
    setValue(name, record && record[requiredField])
  }

  return (
    <>
      <ST.FilterPanelWrapper count={filterOptions && filterOptions.length}>
        <FilterPanel
          options={options}
          fieldsForMainPanel={filterOptions}
          defaultInitialState={defaultFiltersState}
          handleFilterProducts={handleFilter}
        />
      </ST.FilterPanelWrapper>
      <TableHeaderOptions
        totalItems={totalItems}
        itemsForSort={itemsForSort}
        optionsForSort={options}
        setDefaultSort={setDefaultSort}
        setCurrItemsForSort={setCurrItemsForSort}
        customHandleSort={customHandleSort}
      />
      <ST.LoaderWrapper>
        {loading && <Loader style={{ zIndex: '1' }} />}
        <ST.TableWrapper activeRow={activeRow} ref={tableRef} disabled={disabled} loading={loading ? 'render' : ''}>
          <InfiniteScroll
            initialLoad={false}
            loadMore={handleInfiniteOnLoad || (() => {})}
            hasMore={!loading && hasMore}
            useWindow={false}
            threshold={totalItems}
          >
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              onRow={(record, rowKey) => ({
                onClick: () => {
                  if (isSetActiveRow) {
                    setActiveRow(rowKey)
                  }
                  if (customHandleOnRowClick) {
                    customHandleOnRowClick(record)
                    return
                  }
                  handleOnRowClick(record, rowKey)
                }
              })}
              rowSelection={rowSelection}
            />
          </InfiniteScroll>
        </ST.TableWrapper>
      </ST.LoaderWrapper>
    </>
  )
}

TableField.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  unregister: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  requiredField: PropTypes.string,
  loading: PropTypes.bool,
  totalItems: PropTypes.number,
  itemsForSort: PropTypes.arrayOf(PropTypes.object),
  options: PropTypes.arrayOf(PropTypes.object),
  setCurrItemsForSort: PropTypes.func,
  setDefaultSort: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  defaultFiltersState: PropTypes.object,
  filterOptions: PropTypes.arrayOf(PropTypes.string),
  customHandleSort: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  rowSelection: PropTypes.object,
  customHandleOnRowClick: PropTypes.func,
  hasMore: PropTypes.bool,
  handleInfiniteOnLoad: PropTypes.func,
  isSetActiveRow: PropTypes.bool,
  editItemActiveId: PropTypes.string,
  disabled: PropTypes.bool
}

TableField.defaultProps = {
  dataSource: [],
  columns: [],
  isRequired: false,
  loading: false,
  totalItems: 0,
  itemsForSort: [],
  options: [],
  defaultFiltersState: [],
  filterOptions: [],
  customHandleSort: null,
  setCurrItemsForSort: null,
  rowSelection: null,
  customHandleOnRowClick: null,
  hasMore: false,
  handleInfiniteOnLoad: null,
  requiredField: '',
  isSetActiveRow: false,
  editItemActiveId: '',
  disabled: false
}

export default TableField
