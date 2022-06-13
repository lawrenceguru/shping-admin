import React, { useEffect, useMemo } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import * as ST from './styles'
import LoadingSpinner from '../../atoms/LoadingSpinner'
import NoDataPlaceholder from '../../atoms/NoDataPlaceholder'

const UserContributionLevel = ({ usersGetContributorLevelInfo, id, isLoadingContributorLevel, contributorLevel }) => {
  useEffect(() => {
    if (id) {
      usersGetContributorLevelInfo(id)
    }
  }, [id])

  const type = useMemo(() => {
    const contributionType = contributorLevel && contributorLevel.current_level && contributorLevel.current_level.type
    return intl.get(`common.contributorsStatus.${contributionType}`) || contributionType
  }, [contributorLevel])

  return (
    <>
      <ST.Header>{intl.get('users.contributionLevel.header')}</ST.Header>
      <ST.CardWrapper>
        <LoadingSpinner key={id} isLoading={isLoadingContributorLevel}>
          {contributorLevel && contributorLevel.current_level ? (
            <ST.Description>
              <p>{intl.get('users.contributionLevel.type', { type })}</p>
              <p>
                {intl.get('users.contributionLevel.accuracy', {
                  accuracy: contributorLevel.current_level.accuracy || '0'
                })}
              </p>
              <p>
                {intl.get('users.contributionLevel.products', {
                  products: contributorLevel.current_level.products || '0'
                })}
              </p>
              <p>
                {intl.get('users.contributionLevel.daysLeft', {
                  daysLeft: contributorLevel.current_level.days_left || '0'
                })}
              </p>
              <p>
                {intl.get('users.contributionLevel.currentPercentages', {
                  currentPercentages: contributorLevel.current_level.current_percentages || '0'
                })}
              </p>
              <p>
                {intl.get('users.contributionLevel.maxPercentages', {
                  maxPercentages: contributorLevel.current_level.max_percentages
                })}
              </p>
            </ST.Description>
          ) : (
            <NoDataPlaceholder />
          )}
        </LoadingSpinner>
      </ST.CardWrapper>
    </>
  )
}

UserContributionLevel.propTypes = {
  usersGetContributorLevelInfo: PropTypes.func.isRequired,
  id: PropTypes.string,
  isLoadingContributorLevel: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  contributorLevel: PropTypes.object
}
UserContributionLevel.defaultProps = {
  id: null,
  isLoadingContributorLevel: false,
  contributorLevel: null
}

export default UserContributionLevel
