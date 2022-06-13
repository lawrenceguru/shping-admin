import React, { useEffect, useMemo } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import * as ST from './styles'
import LoadingSpinner from '../../atoms/LoadingSpinner'
import NoDataPlaceholder from '../../atoms/NoDataPlaceholder'
import { rewardsShpingLevels } from '../../pages/CampaignRewardsTab/consts'

const UserLevel = ({ usersGetUserLevelInfo, id, isLoadingUserLevels, userLevels }) => {
  useEffect(() => {
    if (id) {
      usersGetUserLevelInfo(id)
    }
  }, [id])

  const levelName = useMemo(() => {
    const name = userLevels && userLevels.name
    const rewardsItem = name ? rewardsShpingLevels.find(item => item.value === userLevels.name.toLowerCase()) : null
    return rewardsItem ? rewardsItem.label : name
  }, [rewardsShpingLevels, userLevels])

  return (
    <>
      <ST.Header>{intl.get('users.userLevel.header')}</ST.Header>
      <ST.CardWrapper>
        <LoadingSpinner key={id} isLoading={isLoadingUserLevels}>
          {userLevels ? (
            <ST.Description>
              <p>{intl.get('users.userLevel.name', { name: levelName })}</p>
              <p>{intl.get('users.userLevel.scansLeft', { scansLeft: userLevels.scans_left || 0 })}</p>
              <p>{intl.get('users.userLevel.maxPercentages', { maxPercentages: userLevels.max_percentages || 0 })}</p>
              <p>{intl.get('users.userLevel.todo')}</p>
              {userLevels.todo &&
                userLevels.todo.map((item, index) => {
                  return (
                    /* eslint-disable-next-line react/no-array-index-key */
                    <i key={`userLevelInfoTodo.${index}`}>
                      <p>{item}</p>
                    </i>
                  )
                })}
            </ST.Description>
          ) : (
            <NoDataPlaceholder />
          )}
        </LoadingSpinner>
      </ST.CardWrapper>
    </>
  )
}

UserLevel.propTypes = {
  usersGetUserLevelInfo: PropTypes.func.isRequired,
  id: PropTypes.string,
  isLoadingUserLevels: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  userLevels: PropTypes.object
}
UserLevel.defaultProps = {
  id: null,
  isLoadingUserLevels: false,
  userLevels: null
}

export default UserLevel
