import React, { useEffect, useMemo, useState } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import moment from 'moment'
import Button from '../../atoms/Button'
import { Wrapper, StyledSelectsContainer } from './styles'
import CustomTable from '../../molecules/Table'
import CustomPagination from '../../atoms/CustomPagination'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'

const SgtinLgtinTaskTable = ({
  serializationGetItems,
  isLoading,
  totalItems,
  limit,
  offset,
  allData,
  columns,
  setIsVisible
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationSize, setPaginationSize] = useState(10)
  const lastPage = useMemo(() => Math.ceil(totalItems / limit), [totalItems, limit])
  const [currTasks, setCurrTasks] = useState(null)

  useEffect(() => {
    serializationGetItems({ limit, offset })
  }, [])

  const setTasks = () => {
    const validData = allData.map(el => ({
      ...el,
      start_time: moment
        .utc(el.start_time)
        .local()
        .format('L')
    }))
    setCurrTasks(validData)
  }

  useEffect(() => {
    setTasks()
  }, [allData])

  const handleChangePagination = page => {
    serializationGetItems({ offset: (page - 1) * paginationSize, limit: paginationSize })
    setCurrentPage(page)
  }

  const handleChangePaginationSize = value => {
    setCurrentPage(1)
    setPaginationSize(value)
    serializationGetItems({ offset: 0, limit: value })
  }

  const setDefaultSort = () => {
    setTasks()
  }

  return (
    <Wrapper>
      <StyledSelectsContainer>
        <Button type='danger' size='large' onClick={() => setIsVisible(true)}>
          {intl.get('serializationTasks.createTask')}
        </Button>
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
      </StyledSelectsContainer>
      <CustomTable loading={isLoading} columns={columns} data={currTasks} rowKey='key' />
      {!isLoading && (
        <CustomPagination
          count={totalItems}
          currentPaginationPage={currentPage}
          lastPage={lastPage}
          paginationSize={paginationSize}
          handlePagination={handleChangePagination}
        />
      )}
    </Wrapper>
  )
}

SgtinLgtinTaskTable.propTypes = {
  serializationGetItems: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  totalItems: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  allData: PropTypes.array.isRequired,
  limit: PropTypes.number,
  offset: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  columns: PropTypes.array,
  setIsVisible: PropTypes.func.isRequired
}

SgtinLgtinTaskTable.defaultProps = {
  limit: 10,
  offset: 0,
  columns: []
}

export default SgtinLgtinTaskTable
