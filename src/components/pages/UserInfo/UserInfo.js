import React, { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import UserData from '../../organisms/UserData'
import * as ST from './styles'
import UserLevel from '../../organisms/UserLevel'
import UserContributionLevel from '../../organisms/UserContributionLevel'
import UserBuddies from '../../organisms/UserBuddies'
import UserFeed from '../../organisms/UserFeed'
import UserHistoryBan from '../../organisms/UsersHistoryBan'
import UserRewards from '../../organisms/UserRewards'
import UserScans from '../../organisms/UserScans'
import UserTransactions from '../../organisms/UserTransactions'

const UserInfo = ({
  match,
  usersGetUsersList,
  isLoading,
  users,
  usersGetBlockedStatus,
  isUserBlocked,
  banHistory,
  usersGetBanHistory,
  usersClearUserInfo
}) => {
  const id = useMemo(() => {
    return (match && match.params && match.params.id) || null
  }, [match])

  const isUserRewardsBanned = useMemo(() => {
    return !!(banHistory && banHistory.status === 'active')
  }, [banHistory])

  const user = useMemo(() => {
    return (users && users.length && users.find(item => item.id === id)) || null
  }, [id, users])

  useEffect(() => {
    return () => usersClearUserInfo()
  }, [])

  useEffect(() => {
    if (id) {
      usersGetUsersList({ id })
      usersGetBlockedStatus(id)
      usersGetBanHistory(id)
    }
  }, [id])

  return (
    <ST.Wrapper>
      <UserData
        id={id}
        user={user}
        isLoading={isLoading}
        isUserBlocked={isUserBlocked}
        isUserRewardsBanned={isUserRewardsBanned}
      />
      <UserLevel id={id} />
      <UserContributionLevel id={id} />
      <UserScans id={id} />
      <UserRewards id={id} />
      <UserBuddies id={id} />
      <UserFeed id={id} />
      <UserHistoryBan data={banHistory} isLoading={isLoading} />
      <UserTransactions id={id} />
    </ST.Wrapper>
  )
}

UserInfo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  usersGetUsersList: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  users: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  banHistory: PropTypes.object,
  usersGetBanHistory: PropTypes.func.isRequired,
  usersGetBlockedStatus: PropTypes.func.isRequired,
  isUserBlocked: PropTypes.bool,
  usersClearUserInfo: PropTypes.func.isRequired
}
UserInfo.defaultProps = {
  isLoading: false,
  users: null,
  banHistory: null,
  isUserBlocked: false
}

export default UserInfo
