import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Table, Tooltip, Modal } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import intl from 'react-intl-universal'
import { toast } from 'react-toastify'
import { withRouter } from 'react-router-dom'
import { useSWRConfig } from 'swr'
import { PAYMENTS_API } from 'constants/url'
import * as ST from './styles'
// import coninbaseList from '../../../data/cashout/coinbaseList'
// import historyList from '../../../data/cashout/historyList'
import limitList from '../../../data/cashout/limitList'
import approve from '../../../data/cashout/approve'
import reject from '../../../data/cashout/reject'
import countries from '../../../data/settings/agt/countries'

const colums = [
  {
    title: intl.get('cashout.moderation.table.date'),
    dataIndex: 'ts',
    key: '',
    render: res => {
      const newDate = new Date(res)
      return (
        <>
          {newDate.toDateString()} {newDate.toLocaleTimeString()}
        </>
      )
    }
  },
  {
    title: intl.get('cashout.moderation.table.amount'),
    dataIndex: 'coins',
    key: ''
  },
  {
    title: intl.get('cashout.moderation.table.type'),
    dataIndex: 'type',
    key: ''
  },
  {
    title: intl.get('cashout.moderation.table.address'),
    dataIndex: 'account',
    key: '',
    render: res => <>{res.email}</>
  },
  {
    title: intl.get('cashout.moderation.table.status'),
    dataIndex: 'status',
    key: ''
  }
]

const ModalSection = ({ isModalVisible, setIsModalVisible, userId, history }) => {
  const [tableData, setTableData] = useState([])
  const [userProfile, setUserProfile] = useState()
  const [shpingLimit, setShpingLimit] = useState()
  const [shpingRequest, setShpingRequest] = useState()
  const [pageLoading, setPageLoading] = useState(true)
  const [visibleApprovalModal, setVisibleApprovalModal] = useState(false)
  const [visibleDeclineModal, setVisibleDeclineModal] = useState(false)
  const { mutate } = useSWRConfig()
  // const id = 'urn:authenticateit:user:email:ikleeen@gmail.com'
  // console.log(historyList(id))
  const { result } = limitList(userId)
  const { result: getCountries } = countries()
  useEffect(() => {
    setPageLoading(true)
    setTableData(result?.history)
    setUserProfile(result?.user)
    setShpingLimit(result?.limits)
    setShpingRequest(result?.request)
    if (result) {
      setPageLoading(false)
    }
  }, [result])
  const getCountry = _it => {
    const temp = getCountries?.find(res => res.numeric_code === _it)
    return temp?.name
  }
  const calcBarRed = () => {
    let temp
    if (shpingLimit?.max_level_value > shpingLimit?.history_value) {
      temp = shpingLimit?.max_level_value + shpingLimit?.history_value + shpingLimit?.record_value
    } else {
      temp = shpingLimit?.history_value + shpingLimit?.record_value
    }
    // const temp = shpingLimit?.max_level_value + shpingLimit?.history_value + shpingLimit?.record_value
    console.log(shpingLimit?.max_level_value)
    console.log(shpingLimit?.history_value)
    console.log(shpingLimit?.record_value)
    return (100 / shpingLimit?.total_max_level_value) * temp
  }
  const calcBarBlue = () => {
    return (100 / shpingLimit?.total_max_level_value) * shpingLimit?.max_level_value
  }
  const calcBarOrange = () => {
    return (100 / shpingLimit?.total_max_level_value) * shpingLimit?.max_level_value + shpingLimit?.history_value
  }
  const handleModalCancel = () => {
    setIsModalVisible(false)
  }
  const handleApprovalModal = () => {
    approve(userId)
      .then(() => {
        toast.success('Successfully changed approve status.')
        mutate(`${PAYMENTS_API}/coinbase/transfer/get`)
      })
      .catch(error => {
        if (error?.response?.data?.error_data[0] === 'manual_approved') {
          toast.error('This is aleady the status that approved.')
        }
        if (error?.response?.data?.error_data[0] === 'manual_rejected') {
          toast.error('This is aleady the status that rejected.')
        }
      })
    setVisibleApprovalModal(false)
  }
  const handleDeclineModal = () => {
    reject(userId)
      .then(() => {
        toast.success('Successfully changed reject status')
        mutate(`${PAYMENTS_API}/coinbase/transfer/get`)
      })
      .catch(error => {
        if (error?.response?.data?.error_data[0] === 'manual_approved') {
          toast.error('This is aleady the status that approved.')
        }
        if (error?.response?.data?.error_data[0] === 'manual_rejected') {
          toast.error('This is aleady the status that rejected.')
        }
      })
    setVisibleDeclineModal(false)
  }
  const appUserHistoryPage = () => {
    history.push(`/admin/users/info/${userProfile?.id}`)
  }
  return (
    <>
      {!pageLoading && (
        <ST.CustomModal width={1000} visible={isModalVisible} footer={[]}>
          <div className='ant-modal-close'>
            <CloseCircleOutlined onClick={() => handleModalCancel()} />
          </div>
          <Row>
            <Col span={8} className='userTitle'>
              <div className='floatLeftPanel'>
                <img src={userProfile?.photo} alt='' />
              </div>
              <div className='floatLeftPanel'>
                <div>
                  {userProfile?.first_name} {userProfile?.last_name}
                </div>
                <div>
                  <span>{userProfile?.level}</span> User from {getCountry(userProfile?.country)}
                </div>
                <div>{userProfile?.email}</div>
              </div>
            </Col>
            <Col span={16} className='userTitleLimit'>
              <div className='floatLeftPanel'>
                <img src='/c_mark.png' alt='' />
              </div>
              <div className='floatLeftPanel'>
                <div>
                  SHPING {shpingRequest?.coins}/
                  <span>
                    {shpingLimit?.currency} {shpingLimit?.record_value}
                  </span>
                </div>
                <div>
                  <span>{shpingLimit?.level}</span> {shpingLimit?.max_level_value}/{shpingLimit?.total_max_level_value}
                  <span>Booster</span>
                  {shpingLimit?.max_level_value}/{shpingLimit?.total_max_level_value}
                </div>
                <div>
                  <div id='progress_bar'>
                    <Tooltip placement='bottom' title={`$${shpingLimit?.max_level_value}`}>
                      <div id='bar_blue' style={{ width: `${calcBarBlue()}%` }} />
                    </Tooltip>
                    <Tooltip placement='bottom' title={`$${shpingLimit?.history_value}`}>
                      <div id='bar_orange' style={{ width: `${calcBarOrange()}%` }} />
                    </Tooltip>
                    <Tooltip placement='bottom' title={`$${shpingLimit?.record_value}`}>
                      <div id='bar_red' style={{ width: `${calcBarRed()}%` }} />
                    </Tooltip>
                    <Tooltip placement='bottom' title={`$${shpingLimit?.total_max_level_value}`}>
                      <div id='bar_gray'> </div>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className='modalHeader'>{intl.get('cashout.moderation.modal.transaction_history')}</div>
              <div className='modalSubHeader'>
                <Button onClick={() => appUserHistoryPage()}>
                  {intl.get('cashout.moderation.modal.full_history')}
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table
                columns={colums}
                dataSource={tableData}
                locale={{ emptyText: intl.get('cashout.moderation.table.noData') }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} className='text-center'>
              <Button type='primary' danger onClick={() => setVisibleDeclineModal(true)}>
                {intl.get('cashout.moderation.modal.decline')}
              </Button>
              <Button type='primary' onClick={() => setVisibleApprovalModal(true)} className='ml-10'>
                {intl.get('cashout.moderation.modal.approve')}
              </Button>
            </Col>
          </Row>
        </ST.CustomModal>
      )}
      <Modal
        title='Approve'
        visible={visibleApprovalModal}
        onOk={() => handleApprovalModal()}
        onCancel={() => setVisibleApprovalModal(false)}
        okText='OK'
        cancelText='Cancel'
        zIndex={1001}
      >
        <p>Please confirm the Approve request. After approval, the transaction will be processed.</p>
      </Modal>
      <Modal
        title='Decline'
        visible={visibleDeclineModal}
        onOk={() => handleDeclineModal()}
        onCancel={() => setVisibleDeclineModal(false)}
        okText='OK'
        cancelText='Cancel'
        zIndex={1001}
      >
        <p>Are you sure to decline this request?</p>
      </Modal>
    </>
  )
}

export default withRouter(ModalSection)
