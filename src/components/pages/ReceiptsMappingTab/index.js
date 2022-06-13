import React, { useMemo, useCallback, useState } from 'react'
import useSWR from 'swr'
import { useHistory } from 'react-router-dom'
import { Table, Button } from 'antd'
import { FileImageFilled } from '@ant-design/icons'
import moment from 'moment'
import axios from 'axios'
import { DESCRIPTION_API } from 'constants/url'
import { columns, fieldsForMainPanelAdvanced, defaultInitialStateFilters } from './consts'
import Loader from '../../templates/Loader'
import FilterPanel from '../../molecules/FilterPanel'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'
import CustomPagination from '../../atoms/CustomPagination'
import useStores from '../../../data/description/receipts/stores'
import * as ST from './styles'
import { store } from '../../../index'

const fetcher = (url, limit, page, name, receiptStore, status, receiptTs) => {
  const states = store.getState()
  const { ticket } = states.identity
  const filters = {
    limit,
    offset: limit * (page - 1)
  }
  if (name !== '') filters.name = name
  if (receiptStore.length > 0) filters.receipt_store = receiptStore
  if (status !== '') filters.status = status
  if (receiptTs) {
    filters.receipt_ts_from = `${moment(receiptTs[0])
      .utc()
      .format('YYYY-MM-DD')}T00:00:00Z`
    filters.receipt_ts_to = `${moment(receiptTs[1])
      .utc()
      .format('YYYY-MM-DD')}T00:00:00Z`
  }
  return axios.post(url, filters, { headers: { authenticateit_identity_ticket: ticket } }).then(res => {
    return res.data
  })
}
const ReceiptsMappingTab = () => {
  const [paginationSize, setPaginationSize] = useState(() => {
    const size = localStorage.getItem('receipsMappingPaginationSize')
    if (size) return Number.parseInt(size, 10)
    return 10
  })

  const [currentPaginationPage, setCurrentPaginationPage] = useState(() => {
    const page = localStorage.getItem('receipsMappingCurrentPaginationPage')
    if (page) return Number.parseInt(page, 10)
    return 1
  })

  const [name, setName] = useState('')
  const [receiptStore, setReceiptStore] = useState([])
  const [status, setStatus] = useState('')
  const [receiptTs, setReceiptTs] = useState()
  const { data } = useSWR(
    [`${DESCRIPTION_API}/receipts/names`, paginationSize, currentPaginationPage, name, receiptStore, status, receiptTs],
    fetcher
  )
  const { stores } = useStores(`${DESCRIPTION_API}/receipts/stores`)

  const filterOptions = useMemo(() => {
    if (stores) {
      const options = stores.map(item => ({ value: item, label: item }))
      fieldsForMainPanelAdvanced[2].options = options
    }
    fieldsForMainPanelAdvanced[1].options = [
      { value: '', label: 'All' },
      { value: 'NEW', label: 'New' },
      { value: 'PENDING', label: 'Pending' },
      { value: 'APPROVED', label: 'Approved' },
      { value: 'REMOVED', label: 'Removed' },
      { value: 'REJECTED', label: 'Rejected' }
    ]
    return fieldsForMainPanelAdvanced
  }, [fieldsForMainPanelAdvanced, stores])
  const handleFilterOptions = useCallback(userFilters => {
    if (userFilters.name) setName(userFilters.name.value)
    else setName('')
    if (userFilters.stores) setReceiptStore(userFilters.stores.value)
    else setReceiptStore([])
    if (userFilters.status) setStatus(userFilters.status.value)
    else setStatus('')
    if (userFilters.receipt_ts) setReceiptTs(userFilters.receipt_ts.value)
    else setReceiptTs()
  }, [])

  const lastPage = useMemo(() => Math.ceil(data ? data.count / paginationSize : 0 / paginationSize), [
    data,
    paginationSize
  ])
  const history = useHistory()
  const actionRender = useCallback(
    record => (
      <Button
        icon={<FileImageFilled />}
        size='large'
        onClick={() => {
          history.push(`/admin/products/receipts-mapping/${record.id}`)
          localStorage.setItem('receipts_mapping_detail', JSON.stringify(record))
        }}
      />
    ),
    [history, paginationSize, currentPaginationPage, name, receiptStore]
  )
  columns[0].render = actionRender
  return (
    <ST.Wrapper>
      <FilterPanel
        isAdvanced={false}
        noEquals
        fieldsForMainPanelAdvanced={filterOptions}
        handleFilterProducts={handleFilterOptions}
        defaultInitialState={defaultInitialStateFilters}
      />
      <TableHeaderOptions
        totalItems={data ? data.count : 0}
        handleChangePaginationSize={size => {
          setPaginationSize(size)
          localStorage.setItem('receipsMappingPaginationSize', size)
        }}
        paginationSize={paginationSize}
        hasNotSort
      />
      {data && Array.isArray(data.data) ? (
        <Table
          columns={columns}
          rowKey='id'
          dataSource={data.data}
          pagination={{ defaultPageSize: paginationSize, position: ['none', 'none'] }}
        />
      ) : (
        <Loader />
      )}
      {lastPage > 1 && (
        <CustomPagination
          currentPaginationPage={currentPaginationPage}
          paginationSize={paginationSize}
          handlePagination={page => {
            setCurrentPaginationPage(page)
            localStorage.setItem('receipsMappingCurrentPaginationPage', page)
          }}
          count={data ? data.count : 0}
          lastPage={lastPage}
          size='small'
        />
      )}
    </ST.Wrapper>
  )
}

export default ReceiptsMappingTab
