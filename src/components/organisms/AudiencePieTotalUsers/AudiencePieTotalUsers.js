import React, { useEffect } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import AudiencePieUsers from '../AudiencePieUsers'
import useGetAudienceTotalUsers from './useGetAudienceTotalUsers'

const AudiencePieTotalUsers = ({
  settingsGetActiveUsers,
  setItem,
  getMaxCountItems,
  pastUsers,
  selectFirstDate,
  selectSecondDate,
  selectBrand,
  selectCountry,
  dataIndex,
  ...props
}) => {
  const { audienceTotalUsers } = useGetAudienceTotalUsers({
    from: selectFirstDate,
    to: selectSecondDate,
    brand: selectBrand,
    country: selectCountry
  })

  useEffect(() => {
    settingsGetActiveUsers()
  }, [])

  // Add users from old API
  const usersAllTime = audienceTotalUsers.allTime + pastUsers

  return (
    <AudiencePieUsers
      pieName={intl.get('widgetsNames.totalUsers')}
      widgetName='totalUsers'
      usersAllTime={usersAllTime}
      usersOverDefinedPeriod={audienceTotalUsers.overDefinedPeriod}
      dataIndex={dataIndex}
      setItem={() => setItem({ pageName: 'audiencePage', widgetName: 'totalUsers' })}
      getMaxCountItems={getMaxCountItems}
      {...props}
    />
  )
}

AudiencePieTotalUsers.propTypes = {
  setItem: PropTypes.func.isRequired,
  getMaxCountItems: PropTypes.func.isRequired,
  settingsGetActiveUsers: PropTypes.func.isRequired,
  pastUsers: PropTypes.number.isRequired,
  selectFirstDate: PropTypes.string.isRequired,
  selectSecondDate: PropTypes.string.isRequired,
  selectBrand: PropTypes.string.isRequired,
  selectCountry: PropTypes.string.isRequired,
  dataIndex: PropTypes.string
}

AudiencePieTotalUsers.defaultProps = {
  dataIndex: null
}
export default AudiencePieTotalUsers
