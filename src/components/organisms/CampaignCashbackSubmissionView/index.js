import React, { useState } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { useHistory } from 'react-router-dom'
import { Image, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import * as ST from './styles'
import Table from '../../molecules/Table'
import AcceptModal from './accept-modal'
import RejectModal from './reject-modal'
import EditModal from './edit-modal'

const getReceiptImage = submission => {
  if (submission.analyzed_receipt?.data?.links) {
    return submission.analyzed_receipt?.data?.links.map(link => (
      <Image key={link} src={link} width={200} height={200} />
    ))
  }
  if (submission.submission?.steps && submission.submission?.steps?.some(step => step?.image)) {
    const receiptStep = submission.submission?.steps?.find(step => step?.image)
    if (receiptStep?.image?.length) {
      return receiptStep.image.map(link => <Image key={link?.url} src={link?.url} width={200} height={200} />)
    }
  }
  return 'No media found'
}

const CashbackView = ({ submission, id }) => {
  const history = useHistory()
  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: intl.get('campaigns.cashbacks.expandedPrices.tableHeader.name')
    },
    {
      key: 'quantity',
      dataIndex: 'quantity',
      title: intl.get('campaigns.cashbacks.expandedPrices.tableHeader.quantity')
    },
    {
      key: 'value',
      dataIndex: 'value',
      title: intl.get('campaigns.cashbacks.expandedPrices.tableHeader.cost')
    },
    {
      key: 'gtin',
      dataIndex: 'gtin',
      title: intl.get('campaigns.cashbacks.expandedPrices.tableHeader.product')
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: intl.get('campaigns.cashbacks.expandedPrices.tableHeader.actions'),
      render: (_, data) =>
        ['under_review'].includes(submission.submission.status) && (
          <Button type='link' onClick={() => history.push(`/admin/campaigns/cashbacks/submissions/${id}/${data.id}`)}>
            {intl.get('campaigns.cashbacks.submissions.actions.edit')}
          </Button>
        )
    }
  ]

  const [acceptVisible, setAcceptVisible] = useState(false)
  const [rejectVisible, setRejectVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const onAccept = () => {
    setAcceptVisible(true)
  }
  const onReject = () => {
    setRejectVisible(true)
  }
  const onCloseAcceptModal = () => {
    setAcceptVisible(false)
  }
  const onCloseRejectModal = () => {
    setRejectVisible(false)
  }
  const onEdit = () => {
    setEditVisible(true)
  }
  const onCloseEditModal = () => {
    setEditVisible(false)
  }
  return (
    <ST.Wrapper>
      {getReceiptImage(submission)}
      {(submission.analyzed_receipt?.data?.expanded_prices && (
        <ST.TableWrapper>
          <Table data={submission.analyzed_receipt.data.expanded_prices} columns={columns} rowKey='id' />
        </ST.TableWrapper>
      )) ||
        'No data found'}
      {['under_review'].includes(submission.submission.status) && (
        <ST.Accept>
          <Button type='text' className='cashback' onClick={onEdit}>
            {intl.get('campaigns.cashbacks.submissions.tableHeader.cashbackAmount')}:
            {submission.submission.cashback_value}AUD
            <EditOutlined style={{ marginTop: '3px' }} />
          </Button>
          <div className='actions'>
            <Button type='primary' onClick={onAccept}>
              {intl.get('campaigns.cashbacks.submissions.actions.accept')}
            </Button>
            <Button type='primary' onClick={onReject}>
              {intl.get('campaigns.cashbacks.submissions.actions.reject')}
            </Button>
          </div>
        </ST.Accept>
      )}
      <AcceptModal
        visible={acceptVisible}
        closeModal={onCloseAcceptModal}
        data={{ id, status: 'completed', cashback_value: submission.submission.cashback_value }}
        isList={false}
      />
      <RejectModal visible={rejectVisible} closeModal={onCloseRejectModal} dataId={id} isList={false} />
      <EditModal
        visible={editVisible}
        closeModal={onCloseEditModal}
        dataId={id}
        amount={submission.submission.cashback_value}
      />
    </ST.Wrapper>
  )
}
CashbackView.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  submission: PropTypes.object,
  id: PropTypes.string.isRequired
}

CashbackView.defaultProps = {
  submission: {}
}

export default CashbackView
