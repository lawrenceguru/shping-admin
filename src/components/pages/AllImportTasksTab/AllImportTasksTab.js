import React, { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import * as ST from './styles'
import { columns } from './consts'
import Loader from '../../templates/Loader'
import Table from '../../molecules/Table'

const AllImportTasksTab = ({ history, importTasksGetImportParticipants, participants, participantsIsLoading }) => {
  useEffect(() => {
    if (!participantsIsLoading) {
      importTasksGetImportParticipants()
    }
  }, [])

  const handleOnRowClick = useCallback(
    record => {
      history.push(`/admin/customers/import-tasks/${record.id}`)
    },
    [history]
  )

  return (
    <ST.Wrapper>
      {participantsIsLoading ? (
        <Loader />
      ) : (
        <Table data={participants} columns={columns} rowKey='id' onRowClick={handleOnRowClick} />
      )}
    </ST.Wrapper>
  )
}

AllImportTasksTab.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  importTasksGetImportParticipants: PropTypes.func.isRequired,
  participants: PropTypes.arrayOf(PropTypes.object),
  participantsIsLoading: PropTypes.bool
}

AllImportTasksTab.defaultProps = {
  participants: [],
  participantsIsLoading: false
}

export default AllImportTasksTab
