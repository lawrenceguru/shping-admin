import React, { useEffect, useState } from 'react'
import { Table, Button } from 'antd'
import intl from 'react-intl-universal'
import * as ST from './styles'
import coninbaseList from '../../../data/cashout/coinbaseList'
import ModalSection from './ModalSection'

const CashoutModeration = () => {
  const [tableData, setTableData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalUserId, setModalUserId] = useState()

  const { result } = coninbaseList()
  useEffect(() => {
    setTableData(result)
  }, [result])
  const modalShow = _id => {
    setIsModalVisible(true)
    setModalUserId(_id)
  }
  const colums = [
    {
      title: intl.get('cashout.moderation.table.first_name'),
      dataIndex: 'first_name',
      key: 'first_name'
    },
    {
      title: intl.get('cashout.moderation.table.last_name'),
      dataIndex: 'last_name',
      key: 'last_name'
    },
    {
      title: intl.get('cashout.moderation.table.account'),
      dataIndex: 'account_email',
      key: ''
    },
    {
      title: intl.get('cashout.moderation.table.amount'),
      dataIndex: 'aud_amount',
      key: ''
    },
    {
      title: intl.get('cashout.moderation.table.submitted'),
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
      title: intl.get('cashout.moderation.table.fees'),
      dataIndex: 'aud_fee_amount',
      key: ''
    },
    {
      title: intl.get('cashout.moderation.table.status'),
      dataIndex: 'status',
      key: ''
    },
    {
      title: intl.get('cashout.moderation.table.actions'),
      dataIndex: '',
      key: '',
      render: res => (
        <Button onClick={() => modalShow(res?.id)}>
          <img src='/Vector.png' alt='' style={{ cursor: 'pointer' }} />
        </Button>
      )
    }
  ]

  return (
    <ST.Warpper>
      <ST.Header>{intl.get('cashout.moderation.header')}</ST.Header>
      <ST.SubHeader>{intl.get('cashout.moderation.sub_header')}</ST.SubHeader>
      <Table
        columns={colums}
        dataSource={tableData}
        locale={{ emptyText: intl.get('cashout.moderation.table.noData') }}
      />
      <ModalSection isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} userId={modalUserId} />
    </ST.Warpper>
  )
}

export default CashoutModeration
