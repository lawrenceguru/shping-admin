import React, { useEffect } from 'react'
import intl from 'react-intl-universal'
import uuid from 'uuid4'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TopTable from '../../atoms/TopTable'
import UserInfo from '../../atoms/UserInfo'
import useGetTopUsers from './useGetTopUsers'

export const StyledIcon = styled.img`
  width: 40px;
  color: #e02d2d;
`

const usersColumns = [
  {
    title: `${intl.get('overviewPage.topUsers.name')}`,
    dataIndex: 'name',
    key: 'name',
    render: (i, data) => <UserInfo image={data.image} firstName={data.name} />
  },
  {
    title: `${intl.get('overviewPage.topUsers.age')}`,
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: `${intl.get('overviewPage.topUsers.level')}`,
    dataIndex: 'level',
    key: 'level'
  },
  {
    title: `${intl.get('overviewPage.topUsers.scans')}`,
    dataIndex: 'scans',
    key: 'scans'
  }
]

const TopUsersTable = ({
  setItem,
  setTableHeight,
  selectFirstDate,
  selectSecondDate,
  selectRange,
  selectBrand,
  selectCountry,
  ...props
}) => {
  const { topUsers } = useGetTopUsers({
    aggregation: selectRange,
    from: selectFirstDate,
    to: selectSecondDate,
    brand: selectBrand,
    country: selectCountry
  })

  useEffect(() => {
    setTableHeight(topUsers)
  }, [topUsers])

  return (
    <TopTable
      widgetName='topUsers'
      columns={usersColumns}
      columnsData={topUsers}
      rowKey={() => uuid()}
      headerText={intl.get('overviewPage.topUsers.topUsers')}
      isFooter={false}
      setItem={setItem}
      {...props}
    />
  )
}

TopUsersTable.propTypes = {
  selectFirstDate: PropTypes.string.isRequired,
  selectSecondDate: PropTypes.string.isRequired,
  setItem: PropTypes.func.isRequired,
  setTableHeight: PropTypes.func.isRequired,
  selectRange: PropTypes.string.isRequired,
  selectBrand: PropTypes.string.isRequired,
  selectCountry: PropTypes.string.isRequired
}

export default React.memo(TopUsersTable)
