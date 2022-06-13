import React from 'react'
import styled from 'styled-components'
import { Modal } from 'antd'
import AllBatchTasksTable from '../AllBatchTasksTable'

const Wrapper = styled.div`
  color: rgb(178, 179, 178);
  font-family: Roboto;
  font-weight: 600;
  .ant-table-fixed {
    width: initial !important;
  }
`

const { info } = Modal

const AllBatchTasksForm = BatchTasks =>
  info({
    content: <Wrapper>{!!(BatchTasks && BatchTasks.length) && <AllBatchTasksTable tasks={BatchTasks} />}</Wrapper>,
    okType: 'danger',
    centered: true,
    width: '75%'
  })

export default AllBatchTasksForm
