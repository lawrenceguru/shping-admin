import React, { useState } from 'react'
import intl from 'react-intl-universal'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Image } from 'antd'
import moment from 'moment'
import * as ST from './styles'
import Button from '../../atoms/Button'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'
// import Loader from '../../templates/Loader'
import Table from '../../molecules/Table'
import CustomPagination from '../../atoms/CustomPagination'
import useCashbackSubmissions from '../../../data/rewards/submissions'
import AcceptModal from '../CampaignCashbackSubmissionView/accept-modal'
import RejectModal from '../CampaignCashbackSubmissionView/reject-modal'

const CashbackUserSubmissions = ({ cashback }) => {
  const [paginationSize, setPaginationSize] = useState(10)
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1)
  const [sorter, setSorter] = useState()
  const [sortDirection, setSortDirection] = useState()

  const { submissions, total } = useCashbackSubmissions(
    [cashback],
    (currentPaginationPage - 1) * paginationSize,
    paginationSize,
    sorter,
    sortDirection
  )
  const [acceptVisible, setAcceptVisible] = useState(false)
  const [rejectVisible, setRejectVisible] = useState(false)
  const [id, setId] = useState('1')
  const onCloseAcceptModal = () => {
    setAcceptVisible(false)
  }
  const onCloseRejectModal = () => {
    setRejectVisible(false)
  }
  const onAccept = submission => () => {
    setId(submission.id)
    setAcceptVisible(true)
  }
  const onReject = submission => () => {
    setId(submission.id)
    setRejectVisible(true)
  }
  const history = useHistory()
  const columns = [
    {
      key: 'image',
      dataIndex: 'image',
      align: 'center',
      render: (_, data) => {
        return (
          data.analyzed_receipt.data &&
          data.analyzed_receipt.data.links &&
          data.analyzed_receipt.data.links.length > 0 && (
            <Image src={data.analyzed_receipt.data.links[0]} alt='title' width={50} height={50} />
          )
        )
      }
    },
    {
      key: 'user_first_name',
      dataIndex: 'user_first_name',
      align: 'center',
      title: intl.get('campaigns.cashbacks.submissions.tableHeader.firstName')
    },
    {
      key: 'user_last_name',
      dataIndex: 'user_last_name',
      align: 'center',
      title: intl.get('campaigns.cashbacks.submissions.tableHeader.lastName')
    },
    {
      key: 'retailer',
      dataIndex: 'retailer',
      align: 'center',
      title: intl.get('campaigns.cashbacks.submissions.tableHeader.retailer'),
      render: (_, data) => {
        return data.analyzed_receipt.retailer
      }
    },
    {
      key: 'cashback_value',
      dataIndex: 'cashback_value',
      align: 'center',
      sorter: true,
      title: intl.get('campaigns.cashbacks.submissions.tableHeader.cashback')
    },
    {
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      sorter: true,
      title: intl.get('campaigns.cashbacks.submissions.tableHeader.state'),
      render: status => {
        return intl.get(`campaigns.cashbacks.submissions.status.${status}`)
      }
    },
    {
      key: 'created_ts',
      dataIndex: 'created_ts',
      align: 'center',
      sorter: true,
      title: intl.get('campaigns.cashbacks.submissions.tableHeader.date'),
      render: date => {
        return moment(date).format('YYYY MM DD')
      }
    },
    {
      key: 'Actions',
      align: 'center',
      title: intl.get('campaigns.cashbacks.submissions.tableHeader.actions'),
      render: data => (
        <ST.Actions>
          <Button
            type='link'
            onClick={() => {
              history.push(`/admin/campaigns/cashbacks/submissions/${data.id}`)
            }}
          >
            {intl.get('campaigns.cashbacks.submissions.actions.review')}
          </Button>
          {['under_review'].includes(data.status) && (
            <>
              <Button type='link' onClick={onAccept(data)}>
                {intl.get('campaigns.cashbacks.submissions.actions.accept')}
              </Button>
              <Button type='link' onClick={onReject(data)}>
                {intl.get('campaigns.cashbacks.submissions.actions.reject')}
              </Button>
            </>
          )}
        </ST.Actions>
      )
    }
  ]

  const isLoading = submissions === undefined
  const totalCount = total || 0
  const lastPage = Math.ceil(totalCount / paginationSize)
  const handleChangePaginationSize = size => {
    setCurrentPaginationPage(1)
    setPaginationSize(size)
  }
  // const isEmpty = Array.isArray(submissions) && submissions.length === 0

  const onChange = (pagination, filters, sort) => {
    setSorter(sort.field)
    setSortDirection(sort.order === 'ascend' ? 'asc' : 'desc')
  }

  return (
    <ST.Wrapper>
      <TableHeaderOptions
        totalItems={totalCount}
        hasNotSort
        paginationSize={paginationSize}
        handleChangePaginationSize={handleChangePaginationSize}
      />
      <Table data={submissions} loading={isLoading} columns={columns} onChange={onChange} rowKey='id' />
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
      <AcceptModal
        visible={acceptVisible}
        closeModal={onCloseAcceptModal}
        isList
        cashback={[cashback, (currentPaginationPage - 1) * paginationSize, paginationSize, sorter, sortDirection]}
        data={{ id, status: 'completed', cashback_value: 8 }}
      />
      <RejectModal
        visible={rejectVisible}
        closeModal={onCloseRejectModal}
        dataId={id}
        isList
        cashback={[cashback, (currentPaginationPage - 1) * paginationSize, paginationSize, sorter, sortDirection]}
      />
    </ST.Wrapper>
  )
}

CashbackUserSubmissions.propTypes = {
  cashback: PropTypes.string.isRequired
}

export default CashbackUserSubmissions
