import React from 'react'
import PropTypes from 'prop-types'
import CustomTable from '../Table'

const AllBatchTasksTable = ({ tasks }) => {
  const columns = [
    {
      key: 'errors',
      dataIndex: 'errors',
      title: 'Errors',
      align: 'center'
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Status',
      align: 'center'
    }
  ]

  return <CustomTable columns={columns} data={tasks} />
}

AllBatchTasksTable.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object)
}

AllBatchTasksTable.defaultProps = {
  tasks: null
}

export default AllBatchTasksTable
