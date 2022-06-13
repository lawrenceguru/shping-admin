import React from 'react'
import { Table, Space, Row, Col, Button, Select } from 'antd'
import intl from 'react-intl-universal'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { LikeOutlined, CloseOutlined } from '@ant-design/icons'
import moment from 'moment'
import buddiesData from '../../../data/buddies/buddies'
import buddiesStatus from '../../../data/buddies/buddiesStatus'
import buddiesPoke from '../../../data/buddies/buddiesPoke'
import buddiesDelete from '../../../data/buddies/buddiesDelete'

// const bigInt = require('https://peterolson.github.io/BigInteger.js/BigInteger.min.js')
const DivWrap = styled('div')`
  & .ant-pagination {
    display: none;
  }
`
const DomSelect = styled(Select)`
  width: 100%;
  .ant-select-selector {
    border: white !important;
  }
  .ant-select-selector: focus {
    border: white !important;
  }
}
`
const AvatarImg = styled('img')`
  width: 50px;
  height: 50px;
  border-radius: 50% !important;
  margin-right: 30px;
`
const { Option } = Select

const CustomTable = () => {
  const { buddies } = buddiesData()
  const convertFromUint256 = num => {
    // return num > 1e10
    //   ? Number(
    //     bigInt(num)
    //       .divide(10 ** 18)
    //       .toString()
    //     )
    //   : num
    return num.slice(0, 4)
  }
  const handleChange = async (status, id, chunkId) => {
    const { result } = await buddiesStatus(status, id, chunkId)
    console.log(result)
    if (result) {
      toast.success(`Buddy family status was successfully changed.`)
    }
  }
  const handleDelete = async val => {
    const { result } = await buddiesDelete(val)
    if (result) {
      toast.success(`Buddy was successfully deleted.`)
    }
  }
  const selectHtml = (res, id, chunkId) => {
    return (
      <DomSelect defaultValue={res} onChange={e => handleChange(e, id, chunkId)}>
        <Option value='family_together'>Family together</Option>
        <Option value='family_separately'>Family separately</Option>
        <Option value='friend'>Friend</Option>
        <Option value='other'>Other</Option>
      </DomSelect>
    )
  }
  const handlePoke = async val => {
    const { result } = await buddiesPoke(val)
    if (result) {
      toast.success(`Buddy was successfully poked.`)
    }
  }
  const columns = [
    {
      title: intl.get('buddiesTable.tableHeader.buddy'),
      dataIndex: 'Buddy',
      key: intl.get('buddiesTable.tableHeader.buddy'),
      render: data => (
        <div>
          <AvatarImg src={data.photo} alt='' />
          {data.last_name} {data.first_name}
        </div>
      )
    },
    {
      title: intl.get('buddiesTable.tableHeader.budget'),
      dataIndex: 'coins',
      key: intl.get('buddiesTable.tableHeader.budget'),
      render: data => <>{data} SHPING</>
    },
    {
      title: intl.get('buddiesTable.tableHeader.levelType'),
      dataIndex: 'level_name',
      key: intl.get('buddiesTable.tableHeader.levelType')
    },
    {
      title: intl.get('buddiesTable.tableHeader.inviteAcceptDate'),
      dataIndex: 'ts',
      key: intl.get('buddiesTable.tableHeader.inviteAcceptDate')
    },
    {
      title: intl.get('buddiesTable.tableHeader.familyStatus'),
      dataIndex: 'status',
      key: intl.get('buddiesTable.tableHeader.familyStatus')
    },
    {
      title: '',
      key: 'action',
      render: data => (
        <Space size='middle'>
          <Button
            shape='circle'
            onClick={event => {
              event.preventDefault()
              event.stopPropagation()
              handlePoke(data.id)
            }}
            style={{ border: 'white !important' }}
          >
            <LikeOutlined />
          </Button>
          <Button shape='circle' style={{ border: 'white !important' }} onClick={() => handleDelete(data.id)}>
            <CloseOutlined />
          </Button>
        </Space>
      )
    }
  ]
  const data = buddies?.buddies_list?.map(res => {
    const Buddy = {
      last_name: res.last_name,
      first_name: res.first_name,
      photo: res.photo
    }
    res.ts = moment(res.ts).format('M/D/YYYY')
    res.coins = convertFromUint256(res.coins)
    res.status = selectHtml(res.status, res.id, buddies.id)
    console.log(res.status)
    return { ...res, Buddy }
  })
  return (
    <DivWrap>
      {buddies && buddies.buddies_list.length > 0 && (
        <Row>
          <Col span={24}>
            <Table columns={columns} dataSource={data} />
          </Col>
        </Row>
      )}
    </DivWrap>
  )
}

export default CustomTable
