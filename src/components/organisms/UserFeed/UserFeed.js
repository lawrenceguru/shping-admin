import React, { useEffect, useMemo, useState, useCallback } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroller'
import uuid from 'uuid4'
import * as ST from './styles'
import Table from '../../molecules/Table'
import { columns } from './consts'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'

const UserFeed = ({ usersGetUserFeed, id, isLoadingFeed, feed }) => {
  const [localFeed, setLocalFeed] = useState([])
  const [defaultOrder, setDefaultorder] = useState([])
  const totalItems = useMemo(() => {
    return (localFeed && localFeed.length) || 0
  }, [localFeed])

  useEffect(() => {
    if (id) {
      usersGetUserFeed({ id })
    }
  }, [id])

  useEffect(() => {
    if (feed && feed.records && feed.records.length) {
      setLocalFeed([...localFeed, ...feed.records.map(item => ({ ...item, id: uuid() }))])
      setDefaultorder([...defaultOrder, ...feed.records.map(item => ({ ...item, id: uuid() }))])
    }
  }, [feed])

  const setDefaultSort = useCallback(() => {
    if (defaultOrder && defaultOrder.length) {
      setLocalFeed([defaultOrder])
    }
  }, [defaultOrder])

  const handleInfiniteOnLoad = useCallback(() => {
    usersGetUserFeed({
      id,
      chunk: feed && feed.next
    })
  }, [feed, id])

  return (
    <ST.Wrapper>
      <ST.Header>{intl.get('users.timeline.header')}</ST.Header>
      <TableHeaderOptions
        totalItems={totalItems}
        optionsForSort={columns}
        itemsForSort={localFeed}
        setCurrItemsForSort={items => setLocalFeed(items)}
        setDefaultSort={setDefaultSort}
      />
      <ST.TableWrapper>
        <InfiniteScroll
          initialLoad={false}
          loadMore={handleInfiniteOnLoad}
          hasMore={!!(!isLoadingFeed && feed && feed.next)}
          useWindow={false}
          threshold={totalItems}
        >
          <Table data={localFeed} columns={columns} rowKey='id' loading={isLoadingFeed} noScroll />
        </InfiniteScroll>
      </ST.TableWrapper>
    </ST.Wrapper>
  )
}

UserFeed.propTypes = {
  usersGetUserFeed: PropTypes.func.isRequired,
  id: PropTypes.string,
  isLoadingFeed: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  feed: PropTypes.object
}
UserFeed.defaultProps = {
  id: null,
  isLoadingFeed: false,
  feed: null
}

export default UserFeed
