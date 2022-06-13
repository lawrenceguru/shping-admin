import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import moment from 'moment'
import AdvancedFiltersPanel from '../../organisms/AdvancedFiltersPanel/AdvancedFiltersPanel'
import { columns } from './constants'
import CustomTable from '../../molecules/Table'
import Button from '../../atoms/Button'
import { Wrapper, ButtonWrapper, IconBtnWrapper } from './styles'
import IconButton from '../../molecules/IconButton'

const operationCol = [
  {
    title: intl.get('trackAndTrace.ttOperations.operation'),
    dataIndex: 'operation'
  }
]

const operationOptions = [
  { value: 'pack_products', label: intl.get('trackAndTrace.ttOperations.packProducts') },
  { value: 'pack_containers', label: intl.get('trackAndTrace.ttOperations.packContainers') },
  { value: 'reassignment', label: intl.get('trackAndTrace.ttOperations.reassignment') },
  { value: 'unpack', label: intl.get('trackAndTrace.ttOperations.unpack') }
]

const TTOperations = ({ operationsGetItems, allItems, isLoading, limit, sortOrder }) => {
  const [userFilter, setUserFilters] = useState(null)

  useEffect(() => {
    operationsGetItems({ sort_order: 'asc', limit })
  }, [])

  const loadMoreItems = () => {
    if (userFilter) {
      operationsGetItems({ sort_order: sortOrder, limit: limit + 2, userFilters: userFilter })
    } else {
      operationsGetItems({ sort_order: sortOrder, limit: limit + 2 })
    }
  }

  const handleFilterProducts = userFilters => {
    operationsGetItems({ sort_order: sortOrder, limit, userFilters })
    setUserFilters(userFilters)
  }

  const handleSort = sortOption => {
    if (userFilter) {
      operationsGetItems({ sort_order: sortOption, limit, userFilters: userFilter })
    } else {
      operationsGetItems({ sort_order: sortOption, limit })
    }
  }

  const preparedColumns = [...operationCol, ...columns]
    .map(el => ({ ...el, columnName: el.title, fieldId: el.dataIndex }))
    .filter(el => el.dataIndex === 'ts' || el.dataIndex === 'invoice_number' || el.dataIndex === 'sscc')

  const validAllItems = allItems.map(el => ({
    ...el,
    ts: moment(el.timestamp).format('L'),
    timestamp_time: moment(el.timestamp).format('h:mm A')
  }))

  return (
    <Wrapper>
      <AdvancedFiltersPanel
        handleFilterProducts={handleFilterProducts}
        columnsData={preparedColumns}
        defaultInitialState={{ operation: { value: 'pack_products' } }}
        options={operationOptions}
        inventory
        noEquals
      />
      <IconBtnWrapper>
        <IconButton type='SortAsc' styleParam={{ fontSize: '32px' }} actionFunction={() => handleSort('desc')} />
        <IconButton type='SortDesc' styleParam={{ fontSize: '32px' }} actionFunction={() => handleSort('asc')} />
      </IconBtnWrapper>
      <CustomTable columns={columns} data={validAllItems} loading={isLoading} rowKey='key' />
      <ButtonWrapper>
        <Button className='load-more-btn' onClick={loadMoreItems}>
          {intl.get('trackAndTrace.ttOperations.loadMore')}
        </Button>
      </ButtonWrapper>
    </Wrapper>
  )
}

TTOperations.propTypes = {
  operationsGetItems: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  allItems: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  sortOrder: PropTypes.string
}

TTOperations.defaultProps = {
  isLoading: false,
  sortOrder: 'asc'
}

export default withRouter(TTOperations)
