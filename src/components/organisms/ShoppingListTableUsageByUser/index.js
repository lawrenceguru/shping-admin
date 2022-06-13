import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import intl from 'react-intl-universal'
import styled from 'styled-components'
import uuid from 'uuid4'
import { Button, Table } from 'antd'
import useGetShoppingListUsageUserBy from '../../../data/graphql/shoppinglists-user'
import * as ST from './styles'

const PAGE_SIZE = 10

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
const usersColumns = [
  {
    title: `${intl.get('shoppingListUsersPage.attribute.user_name')}`,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    width: 180,
    render: (i, data) => {
      let name = 'Unknown'
      if (data.first_name && data.last_name) {
        name = `${data.first_name} ${data.last_name}`
      } else if (data.first_name && !data.last_name) {
        name = `${data.first_name}`
      } else if (!data.first_name && data.last_name) {
        name = `${data.last_name}`
      }
      return <NameWrapper>{name}</NameWrapper>
    }
  },
  {
    title: `${intl.get('shoppingListUsersPage.attribute.user_age')}`,
    dataIndex: 'user_age',
    key: 'user_age',
    fixed: 'left',
    width: 100,
    sorter: true,
    render: (i, data) => (
      <CountWrapper>
        <div>{data.user_age}</div>
      </CountWrapper>
    )
  },
  {
    title: `${intl.get('shoppingListUsersPage.attribute.user_gender')}`,
    dataIndex: 'user_sex',
    key: 'user_sex',
    fixed: 'left',
    width: 100,
    sorter: true,
    render: (i, data) => (
      <CountWrapper>
        <div>{data.user_sex}</div>
      </CountWrapper>
    )
  },
  {
    title: `${intl.get('shoppingListUsersPage.attribute.level')}`,
    dataIndex: 'level',
    key: 'level',
    render: (i, data) => (
      <CountWrapper>
        <div>{data.level}</div>
      </CountWrapper>
    )
  },
  {
    title: `${intl.get('shoppingListUsersPage.attribute.reg_date')}`,
    dataIndex: 'reg_date',
    key: 'reg_date',
    width: 150,
    render: (i, data) => (
      <CountWrapper>
        <div>{data.reg_date}</div>
      </CountWrapper>
    )
  },
  {
    title: `${intl.get('shoppingListUsersPage.attribute.added_products')}`,
    dataIndex: 'added_products',
    key: 'added_products',
    width: 150,
    render: (i, data) => (
      <CountWrapper>
        <div>{data.added_products}</div>
      </CountWrapper>
    )
  },
  {
    title: `${intl.get('shoppingListUsersPage.attribute.shoppinglists_products')}`,
    dataIndex: 'shoppinglists_products',
    key: 'shoppinglists_products',
    render: (i, data) => (
      <CountWrapper>
        <div>{data.shoppinglists_products}</div>
      </CountWrapper>
    )
  },
  {
    title: `${intl.get('shoppingListUsersPage.attribute.purchased_products')}`,
    dataIndex: 'purchased_products',
    key: 'purchased_products',
    sorter: true,
    render: (i, data) => (
      <CountWrapper>
        <div>{data.purchased_products}</div>
      </CountWrapper>
    )
  },
  {
    title: `${intl.get('shoppingListUsersPage.attribute.purchase_frequency')}`,
    dataIndex: 'purchase_frequency',
    key: 'purchase_frequency',
    sorter: true,
    render: (i, data) => (
      <CountWrapper>
        <div>{data.purchase_frequency}</div>
      </CountWrapper>
    )
  },
  {
    title: `${intl.get('shoppingListUsersPage.attribute.go_clicks')}`,
    dataIndex: 'go_clicks',
    key: 'go_clicks',
    sorter: true,
    render: (i, data) => (
      <CountWrapper>
        <div>{data.go_clicks}</div>
      </CountWrapper>
    )
  },
  {
    title: `${intl.get('shoppingListUsersPage.attribute.finish_clicks')}`,
    dataIndex: 'finish_clicks',
    key: 'finish_clicks',
    sorter: true,
    width: 150,
    render: (i, data) => (
      <CountWrapper>
        <div>{data.finish_clicks}</div>
      </CountWrapper>
    )
  },
  {
    title: `${intl.get('shoppingListUsersPage.attribute.loyaltee_cards')}`,
    dataIndex: 'loyaltee_cards',
    key: 'loyaltee_cards',
    sorter: true,
    render: (i, data) => (
      <CountWrapper>
        <div>{data.loyaltee_cards}</div>
      </CountWrapper>
    )
  },
  {
    title: `${intl.get('shoppingListUsersPage.attribute.scans')}`,
    dataIndex: 'scans',
    key: 'scans',
    sorter: true,
    render: (i, data) => (
      <CountWrapper>
        <div>{data.scans}</div>
      </CountWrapper>
    )
  },
  {
    title: `${intl.get('shoppingListUsersPage.attribute.receipts')}`,
    dataIndex: 'receipts',
    key: 'receipts',
    sorter: true,
    render: (i, data) => (
      <CountWrapper>
        <div>{data.receipts}</div>
      </CountWrapper>
    )
  },
  {
    title: `${intl.get('shoppingListUsersPage.attribute.categories')}`,
    dataIndex: 'categories',
    key: 'categories',
    render: (i, data) => (
      <CountWrapper>
        <div>{data.categories}</div>
      </CountWrapper>
    )
  },
  {
    title: `${intl.get('shoppingListUsersPage.attribute.attributes')}`,
    dataIndex: 'attributes',
    key: 'attributes',
    render: (i, data) => (
      <CountWrapper>
        <div>{data.attributes}</div>
      </CountWrapper>
    )
  },
  {
    title: `${intl.get('shoppingListUsersPage.attribute.stores')}`,
    dataIndex: 'stores',
    key: 'stores',
    sorter: true,
    render: (i, data) => (
      <CountWrapper>
        <div>{data.stores}</div>
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
  const [pagination, setPagination] = useState({
    page_size: 0
  })
  const [meta, setMeta] = useState()
  const [sort, setSort] = useState(null)
  const [previousData, setPreviousData] = useState([])
  const { loading, shoppingListUsers, metaPagination } = useGetShoppingListUsageUserBy({
    from: selectFirstDate,
    to: selectSecondDate,
    country: selectCountry,
    state: selectState,
    postcode: selectPostcode,
    pagination,
    sort
  })
  const loadMore = metaPagination && metaPagination.next_token !== null
  const handleLoading = () => {
    if (meta)
      setPagination({
        next_token: meta.next_token,
        query_execution_id: meta.query_execution_id,
        page_size: PAGE_SIZE
      })
  }
  useEffect(() => {
    setMeta(metaPagination)
  }, [metaPagination])
  useEffect(() => {
    if (shoppingListUsers && shoppingListUsers.length > 0) {
      if (pagination.query_execution_id) {
        setPreviousData([...previousData, ...shoppingListUsers])
      } else {
        setPreviousData([...previousData, ...shoppingListUsers])
      }
    }
  }, [shoppingListUsers])
  useEffect(() => {
    setPreviousData([])
    setPagination({ page_size: PAGE_SIZE })
  }, [selectFirstDate, selectSecondDate, selectCountry, selectPostcode])
  const handleChange = (p, filters, sorter) => {
    if (sorter && sorter.field) {
      setPreviousData([])
      setPagination({ page_size: PAGE_SIZE })
      setSort({ field: sorter.field, order: sorter.order === 'ascend' ? 'asc' : 'desc' })
    }
  }
  console.log('previousData', previousData)
  return (
    <ST.TableWrapper {...props}>
      <div style={{ height: '100%' }} className='pdf-export' data-index={dataIndex}>
        <Table
          title={() => (
            <ST.HeaderBlockProductTable>
              <ST.Header>{intl.get('shoppingListUsersPage.userDetailTableTitle')}</ST.Header>
            </ST.HeaderBlockProductTable>
          )}
          loading={loading}
          className='shoppingListUsageUser'
          columns={usersColumns}
          rowClassName='ant-table-expanded-row'
          scroll={{ x: 2000, y: 480 }}
          dataSource={previousData}
          onChange={handleChange}
          rowKey={() => uuid()}
          pagination={false}
          footer={() =>
            loadMore && (
              <ST.ButtonWrapper>
                <Button onClick={handleLoading}>Load More</Button>
              </ST.ButtonWrapper>
            )
          }
        />
      </div>
    </ST.TableWrapper>
  )
}

export default React.memo(ShoppingListTableCategory)
