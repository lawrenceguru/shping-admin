import React, { useEffect, useMemo, useState, useCallback } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import uuid from 'uuid4'
import * as ST from './styles'
import Table from '../../molecules/Table'
import { columns } from './consts'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'

const UsersHistoryBan = ({ isLoading, data }) => {
  const [localData, setLocalData] = useState([])
  const [limit, setLimit] = useState(10)
  const totalItems = useMemo(() => {
    return (localData && localData.length) || 0
  }, [localData])

  useEffect(() => {
    if (data && data.all && data.all.length) {
      setLocalData(data.all.map(item => ({ ...item, id: uuid() })))
    }
  }, [data])

  const setDefaultSort = useCallback(() => {
    if (data && data.all && data.all.length) {
      setLocalData(data.all.map(item => ({ ...item, id: uuid() })))
    }
  }, [data])

  return (
    <ST.Wrapper>
      <ST.Header>{intl.get('users.banHistory.header')}</ST.Header>
      <TableHeaderOptions
        totalItems={totalItems}
        optionsForSort={columns}
        itemsForSort={localData}
        handleChangePaginationSize={size => setLimit(size)}
        paginationSize={limit}
        setCurrItemsForSort={items => setLocalData(items)}
        setDefaultSort={setDefaultSort}
      />
      <Table
        data={localData}
        columns={columns}
        totalCounts={totalItems}
        limit={limit}
        rowKey='id'
        loading={isLoading}
        pagination
      />
    </ST.Wrapper>
  )
}

UsersHistoryBan.propTypes = {
  isLoading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object
}
UsersHistoryBan.defaultProps = {
  isLoading: false,
  data: null
}

export default UsersHistoryBan
