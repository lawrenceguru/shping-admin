import React from 'react'
import { useSelector } from 'react-redux'
import intl from 'react-intl-universal'
import styled from 'styled-components'
import uuid from 'uuid4'
import TopTable from '../../atoms/TopTable'
import useGetShoppingListUsageGroupBy from '../../../data/graphql/shoppinglists-groupby'

const NameWrapper = styled.div`
  margin-left: 25px;
`

const CountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  & > div {
    min-width: 65px;
  }
`
const categoriesColumns = [
  {
    title: `${intl.get('shoppingListUsagePage.category.name')}`,
    dataIndex: 'name',
    key: 'name',
    render: (i, data) => {
      let name = 'Unknown'
      if (data && data.category && data.category.length > 0) {
        name = data.category.map(category => category.name).join('/')
      }

      return <NameWrapper>{name}</NameWrapper>
    }
  },
  {
    title: `${intl.get('shoppingListUsagePage.category.showCount')}`,
    dataIndex: 'num_interactions',
    key: 'num_interactions',
    render: (i, data) => (
      <CountWrapper>
        <div>{data.searches}</div>
      </CountWrapper>
    )
  }
]

const ShoppingListTableCategory = ({ dataIndex, ...props }) => {
  const selectFirstDate = useSelector(({ filterAnalytics }) => filterAnalytics.selectFirstDate)
  const selectSecondDate = useSelector(({ filterAnalytics }) => filterAnalytics.selectSecondDate)
  const selectCountry = useSelector(({ filterAnalytics }) => filterAnalytics.selectCountry)
  const selectState = useSelector(({ filterAnalytics }) => filterAnalytics.selectState)
  const selectPostcode = useSelector(({ filterAnalytics }) => filterAnalytics.selectPostcode)
  const { searches } = useGetShoppingListUsageGroupBy({
    from: selectFirstDate,
    to: selectSecondDate,
    country: selectCountry,
    state: selectState,
    postcode: selectPostcode,
    groupBy: ['category']
  })

  return (
    <TopTable
      widgetName='shoppinglistCategoryTable'
      columns={categoriesColumns}
      dataIndex={dataIndex}
      columnsData={searches}
      rowKey={() => uuid()}
      headerText={intl.get('shoppingListUsagePage.categoryTableTitle')}
      isFooter
      viewAll
      pagination
      {...props}
    />
  )
}

export default React.memo(ShoppingListTableCategory)
