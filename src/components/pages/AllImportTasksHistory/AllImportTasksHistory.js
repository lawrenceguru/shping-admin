import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid4'
import * as ST from './styles'
import { columns } from './consts'
import Loader from '../../templates/Loader'
import Table from '../../molecules/Table'

const AllImportTasksHistory = ({
  match,
  importTasksGetImportParticipantHistory,
  participantHistory,
  participantHistoryIsLoading
}) => {
  const id = useMemo(() => {
    return match && match.params && match.params.id
  }, [match])

  const data = useMemo(() => {
    return (
      (participantHistory &&
        participantHistory.length &&
        participantHistory.map(item => ({
          ...item,
          key: uuid()
        }))) ||
      []
    )
  }, [participantHistory])

  useEffect(() => {
    if (id) {
      importTasksGetImportParticipantHistory(id)
    }
  }, [id])

  return <ST.Wrapper>{participantHistoryIsLoading ? <Loader /> : <Table data={data} columns={columns} />}</ST.Wrapper>
}

AllImportTasksHistory.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  importTasksGetImportParticipantHistory: PropTypes.func.isRequired,
  participantHistory: PropTypes.arrayOf(PropTypes.object),
  participantHistoryIsLoading: PropTypes.bool
}

AllImportTasksHistory.defaultProps = {
  participantHistory: [],
  participantHistoryIsLoading: false
}

export default AllImportTasksHistory
