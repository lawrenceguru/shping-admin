import React, { useEffect, useState, useCallback, useMemo } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import * as ST from './styles'
import Table from '../../molecules/Table'
import { columns } from './consts'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'
import IconButton from '../../molecules/IconButton'
import { copyToClipboard } from '../../../utils/copyToClipBoard'

const UserRewards = ({ id, isLoadingRewards, rewards, usersGetUserRewards, count }) => {
  const mergedColumns = useMemo(() => {
    return [
      {
        key: 'action',
        align: 'center',
        render: data => (
          <ST.ActionsWrapper>
            <IconButton type='Copy' actionFunction={() => copyToClipboard(data.id)} styleParam={{ fontSize: '20px' }} />
          </ST.ActionsWrapper>
        )
      },
      ...columns
    ]
  }, [columns])
  const [limit, setLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    usersGetUserRewards({
      id,
      limit,
      offset: limit * (currentPage - 1)
    })
  }, [])

  const handleChangePaginationSize = useCallback(
    value => {
      setLimit(value)

      usersGetUserRewards({
        id,
        limit: value,
        offset: limit * (currentPage - 1)
      })
    },
    [currentPage, id]
  )

  const handleChangePage = useCallback(
    value => {
      setCurrentPage(value)

      usersGetUserRewards({
        id,
        limit,
        offset: limit * (value - 1)
      })
    },
    [limit, id]
  )

  return (
    <ST.Wrapper>
      <ST.Header>{intl.get('users.rewards.header')}</ST.Header>
      <TableHeaderOptions
        totalItems={count}
        hasNotSort
        handleChangePaginationSize={handleChangePaginationSize}
        paginationSize={limit}
      />
      <Table
        data={rewards}
        columns={mergedColumns}
        totalCounts={count}
        limit={limit}
        rowKey='id'
        loading={isLoadingRewards}
        pagination
        handlePagination={handleChangePage}
      />
    </ST.Wrapper>
  )
}

UserRewards.propTypes = {
  id: PropTypes.string,
  count: PropTypes.number,
  usersGetUserRewards: PropTypes.func.isRequired,
  isLoadingRewards: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  rewards: PropTypes.arrayOf(PropTypes.object)
}
UserRewards.defaultProps = {
  isLoadingRewards: false,
  rewards: null,
  id: null,
  count: 0
}

export default UserRewards
