import React, { useEffect, useMemo, useState } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import * as moment from 'moment'
import CustomTable from '../../molecules/Table'
import CustomPagination from '../../atoms/CustomPagination'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'

const SsccTaskTable = ({ serializeGetSSCCTasksStatus, ssccTasksIsLoading, ssccTasks, columns }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationSize, setPaginationSize] = useState(10)
  const [currTasks, setCurrTasks] = useState(null)

  const setTasks = () => {
    const validData = ssccTasks.map(el => ({
      ...el,
      start_time: moment
        .utc(el.start_time)
        .local()
        .format('MM/DD/YYYY h:mm A'),
      end_time: moment
        .utc(el.end_time)
        .local()
        .format('MM/DD/YYYY h:mm A')
    }))
    setCurrTasks(validData)
  }

  useEffect(() => {
    setTasks()
  }, [ssccTasks])

  useEffect(() => {
    serializeGetSSCCTasksStatus()
  }, [])

  const handleChangePagination = page => {
    setCurrentPage(page)
  }

  const handleChangePaginationSize = value => {
    setCurrentPage(1)
    setPaginationSize(value)
  }

  const totalItems = useMemo(() => {
    return (currTasks && currTasks.length) || 0
  }, [currTasks])

  const lastPage = useMemo(() => Math.ceil(totalItems / paginationSize), [totalItems, paginationSize])

  const setDefaultSort = () => {
    setTasks()
  }

  const slicedDataForTable = useMemo(() => {
    return (
      currTasks &&
      currTasks.length &&
      currTasks.slice((currentPage - 1) * paginationSize, (currentPage - 1) * paginationSize + paginationSize)
    )
  }, [currTasks, currentPage, paginationSize])

  return (
    <>
      <TableHeaderOptions
        totalItems={totalItems}
        foundItemsLabel={intl.get('serializationTasks.foundItems')}
        optionsForSort={columns}
        itemsForSort={currTasks}
        handleChangePaginationSize={handleChangePaginationSize}
        paginationSize={paginationSize}
        setCurrItemsForSort={items => setCurrTasks(items)}
        setDefaultSort={setDefaultSort}
      />
      <CustomTable loading={ssccTasksIsLoading} columns={columns} data={slicedDataForTable} rowKey='key' />
      {!ssccTasksIsLoading && (
        <CustomPagination
          count={totalItems}
          currentPaginationPage={currentPage}
          lastPage={lastPage}
          paginationSize={paginationSize}
          handlePagination={handleChangePagination}
        />
      )}
    </>
  )
}

SsccTaskTable.propTypes = {
  serializeGetSSCCTasksStatus: PropTypes.func.isRequired,
  ssccTasksIsLoading: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  ssccTasks: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  columns: PropTypes.array
}

SsccTaskTable.defaultProps = {
  columns: []
}

export default SsccTaskTable
