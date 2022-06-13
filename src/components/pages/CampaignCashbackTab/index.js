import React, { useCallback, useState } from 'react'
import intl from 'react-intl-universal'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { Select, Form } from 'antd'
import SwitchOption from '../../atoms/SwitchOption'
import * as ST from './styles'
import Button from '../../atoms/Button'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'
// import Loader from '../../templates/Loader'
import Table from '../../molecules/Table'
import CustomPagination from '../../atoms/CustomPagination'
import useCashbacks from '../../../data/rewards/cashbacks'
import deleteModal from '../../molecules/DeleteModal'
import { remove, updateAction } from '../../organisms/CampaignCashbackForm/actions'

const { Option } = Select

const formatPrice = value => {
  if (value && !Number.isNaN(value)) {
    return Number(value).toFixed(2)
  }
  return value
}

const CampaignCashbackTab = () => {
  const ticket = useSelector(({ identity }) => identity.ticket)
  const [paginationSize, setPaginationSize] = useState(10)
  const [status, setStatus] = useState('all')
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1)
  const [sorter, setSorter] = useState()
  const [sortDirection, setSortDirection] = useState()
  const { data: results, cashbacks, total, mutate: mutateAction } = useCashbacks(
    (currentPaginationPage - 1) * paginationSize,
    paginationSize,
    sorter,
    sortDirection,
    status
  )

  const handleDeleteCampaignCashback = item => {
    remove(item, ticket, mutateAction)
  }
  const showConfirm = item => {
    deleteModal(
      () => handleDeleteCampaignCashback(item),
      intl.get('campaigns.cashbacks.deleteConfirm', { name: item.name })
    )
  }
  const history = useHistory()
  const columns = [
    {
      key: 'switch',
      align: 'center',
      render: data => (
        <ST.SwitchFieldWrapper>
          <SwitchOption
            checked={data && data.status.toLowerCase() === 'active'}
            onChange={(value, event) => {
              event.preventDefault()
              event.stopPropagation()
              updateAction(data, ticket, mutateAction)
            }}
          />
        </ST.SwitchFieldWrapper>
      )
    },
    {
      key: 'name',
      dataIndex: 'name',
      align: 'center',
      title: intl.get('campaigns.cashbacks.tableHeader.name')
    },
    {
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      sorter: true,
      title: intl.get('campaigns.cashbacks.tableHeader.status'),
      render: (_, data) => {
        if (data.published_at) return 'Published'
        return 'Draft'
      }
    },
    {
      key: 'budget',
      dataIndex: 'budget',
      align: 'center',
      title: intl.get('campaigns.cashbacks.tableHeader.budget'),
      render: data => {
        if (data && data.value) return `$${data.value}`
        return ''
      }
    },
    {
      key: 'remaining',
      dataIndex: 'remaining',
      align: 'center',
      title: intl.get('campaigns.cashbacks.tableHeader.remaining'),
      render: (_, data) => {
        return <>{`$${formatPrice(data?.spendings?.remaining_balance)}`}</>
      }
    },
    {
      key: 'start',
      dataIndex: 'start_date',
      align: 'center',
      sorter: true,
      title: intl.get('campaigns.cashbacks.tableHeader.start'),
      render: start => {
        return moment(start).format('DD/MM/YYYY, HH:mm:ss')
      }
    },
    {
      key: 'end',
      dataIndex: 'end_date',
      align: 'center',
      sorter: true,
      title: intl.get('campaigns.cashbacks.tableHeader.end'),
      render: end => {
        return moment(end).format('DD/MM/YYYY, HH:mm:ss')
      }
    },
    {
      key: 'Actions',
      align: 'center',
      title: intl.get('campaigns.cashbacks.tableHeader.actions'),
      render: data => (
        <ST.Actions>
          {data.published_at ? (
            <Button
              type='link'
              onClick={() => {
                history.push(`/admin/campaigns/cashbacks/${data.id}`)
              }}
            >
              {intl.get('campaigns.cashbacks.actions.review')}
            </Button>
          ) : (
            <>
              <Button
                type='link'
                onClick={() => {
                  history.push(`/admin/campaigns/cashbacks/${data.id}/update`)
                }}
              >
                {intl.get('campaigns.cashbacks.actions.edit')}
              </Button>
              <Button
                type='link'
                onClick={e => {
                  e.stopPropagation()
                  e.preventDefault()
                  showConfirm(data)
                }}
              >
                {intl.get('campaigns.cashbacks.actions.remove')}
              </Button>
            </>
          )}
        </ST.Actions>
      )
    }
  ]

  const isLoading = cashbacks === undefined
  const totalCount = total || 0
  const handleAddCampaignCashback = useCallback(() => history.push('/admin/campaigns/cashbacks/create'), [])
  const lastPage = Math.ceil(totalCount / paginationSize)
  const handleChangePaginationSize = size => {
    setCurrentPaginationPage(1)
    setPaginationSize(size)
  }
  const isEmpty = Array.isArray(results) && results.length === 0
  const onChange = (pagination, filters, sort) => {
    setSorter(sort.field)
    setSortDirection(sort.order === 'ascend' ? 'asc' : 'desc')
  }
  const filterStatus = e => {
    setStatus(e)
  }
  return (
    <ST.Wrapper>
      <ST.ButtonWrapper>
        <Button type='danger' size='large' onClick={handleAddCampaignCashback}>
          {intl.get('campaigns.cashbacks.buttonCreate')}
        </Button>
      </ST.ButtonWrapper>
      <TableHeaderOptions
        totalItems={totalCount}
        hasNotSort
        paginationSize={paginationSize}
        handleChangePaginationSize={handleChangePaginationSize}
      >
        <Form initialValues={{ status: 'all' }} className='filter'>
          <Form.Item name='status' label={intl.get('campaigns.cashbacks.fields.filter')}>
            <Select id='filter-status' value={status} onChange={filterStatus}>
              <Option value='all'>All</Option>
              <Option value='active'>Active</Option>
              <Option value='draft'>Draft</Option>
              <Option value='completed'>Completed</Option>
            </Select>
          </Form.Item>
        </Form>
      </TableHeaderOptions>
      <>
        {isEmpty ? (
          <>No Data</>
        ) : (
          <>
            <Table data={cashbacks} loading={isLoading} columns={columns} onChange={onChange} rowKey='id' />
            {lastPage > 1 && (
              <CustomPagination
                currentPaginationPage={currentPaginationPage}
                paginationSize={paginationSize}
                handlePagination={page => setCurrentPaginationPage(page)}
                count={totalCount}
                lastPage={lastPage}
                size='small'
              />
            )}
          </>
        )}
      </>
    </ST.Wrapper>
  )
}

export default CampaignCashbackTab
