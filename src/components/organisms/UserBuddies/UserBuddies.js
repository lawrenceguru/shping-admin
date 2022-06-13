import React, { useEffect, useMemo, useState, useCallback } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroller'
import * as ST from './styles'
import Table from '../../molecules/Table'
import { columns } from './consts'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'

const UserBuddies = ({ usersGetUsersBuddies, id, isLoadingbuddies, buddies }) => {
  const [localBuddies, setLocalBuddies] = useState([])
  const [defaultOrder, setDefaultorder] = useState([])
  const totalItems = useMemo(() => {
    return (localBuddies && localBuddies.length) || 0
  }, [localBuddies])

  useEffect(() => {
    if (id) {
      usersGetUsersBuddies({ id })
    }
  }, [id])

  useEffect(() => {
    if (buddies && buddies.data && buddies.data.length) {
      setLocalBuddies([...localBuddies, ...buddies.data])
      setDefaultorder([...defaultOrder, ...buddies.data])
    }
  }, [buddies])

  const setDefaultSort = useCallback(() => {
    if (defaultOrder && defaultOrder.length) {
      setLocalBuddies([defaultOrder])
    }
  }, [defaultOrder])

  const handleInfiniteOnLoad = useCallback(() => {
    usersGetUsersBuddies({
      id,
      chunk: buddies && buddies.next
    })
  }, [buddies, id])

  return (
    <ST.Wrapper>
      <ST.Header>{intl.get('users.buddies.header')}</ST.Header>
      <TableHeaderOptions
        totalItems={totalItems}
        optionsForSort={columns}
        itemsForSort={localBuddies}
        setCurrItemsForSort={items => setLocalBuddies(items)}
        setDefaultSort={setDefaultSort}
      />
      <ST.TableWrapper>
        <InfiniteScroll
          initialLoad={false}
          loadMore={handleInfiniteOnLoad}
          hasMore={!!(!isLoadingbuddies && buddies && buddies.next)}
          useWindow={false}
          threshold={totalItems}
        >
          <Table data={localBuddies} columns={columns} rowKey='id' loading={isLoadingbuddies} noScroll />
        </InfiniteScroll>
      </ST.TableWrapper>
    </ST.Wrapper>
  )
}

UserBuddies.propTypes = {
  usersGetUsersBuddies: PropTypes.func.isRequired,
  id: PropTypes.string,
  isLoadingbuddies: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  buddies: PropTypes.object
}
UserBuddies.defaultProps = {
  id: null,
  isLoadingbuddies: false,
  buddies: null
}

export default UserBuddies
