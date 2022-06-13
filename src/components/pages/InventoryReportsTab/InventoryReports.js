import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import intl from 'react-intl-universal'
import Button from '../../atoms/Button'
import { Wrapper, StyledPanelContainer, StyledSelectsContainer, ExportButtonWrapper } from './styles'
import { columns, exportConverter } from './constants'
import CustomPagination from '../../atoms/CustomPagination'
import CustomTable from '../../molecules/Table'
import SortBy from '../../atoms/SortBy'
import NumberOfElementsPerPage from '../../atoms/NumberOfElementsPerPage'
import AdvancedFiltersPanel from '../../organisms/AdvancedFiltersPanel/AdvancedFiltersPanel'
import FoundItems from '../../atoms/FoundItems'
import { currDateFormat } from '../../../utils/helpers/date'

const InventoryReportsTab = ({
  inventoryGetItems,
  skip,
  take,
  allItems,
  totalItems,
  isLoading,
  fullData,
  inventoryGetItemsExport,
  inventoryClearFullData
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationSize, setPaginationSize] = useState(10)
  const [order, setOrder] = useState(null)
  const [filters, setFilters] = useState(null)
  const validAllItems = allItems.map(el => ({ ...el, ts: moment(el.ts).format(currDateFormat()) }))
  const lastPage = useMemo(() => Math.ceil(totalItems / take), [totalItems, take])

  useEffect(() => {
    inventoryGetItems({ skip, take })
    return () => {
      inventoryClearFullData()
    }
  }, [])

  useEffect(() => {
    exportConverter(fullData)
  }, [fullData])

  const handleChangePagination = page => {
    if (order) {
      inventoryGetItems({
        skip: (page - 1) * paginationSize,
        take: paginationSize,
        order: order.toString(),
        query: filters
      })
    } else {
      inventoryGetItems({ skip: (page - 1) * paginationSize, take: paginationSize, query: filters })
    }
    setCurrentPage(page)
  }

  const sortOptions = useMemo(
    () =>
      [...columns, { title: intl.get('tableSettings.dontSort'), dataIndex: 'Do not sort' }].map((field, index) => {
        return {
          title: field.title,
          value: field.dataIndex,
          customFieldId: `${field.dataIndex}-${index}`,
          fieldId: field.dataIndex
        }
      }),
    [allItems]
  )

  const handleSortProducts = sortBy => {
    if (sortBy !== 'Do not sort') {
      setOrder(`${sortBy}-desc`)
      inventoryGetItems({
        skip,
        take: paginationSize,
        order: `${sortBy}-desc`,
        query: filters
      })
    } else {
      setOrder(null)
      inventoryGetItems({
        skip,
        take: paginationSize,
        query: filters
      })
    }
  }

  const handleChangePaginationSize = value => {
    setCurrentPage(1)
    setPaginationSize(value)
    if (order) {
      inventoryGetItems({ skip: 0, take: value, order: order.toString(), query: filters })
    } else {
      inventoryGetItems({ skip: 0, take: value, query: filters })
    }
  }

  const handleFilterProducts = userFilters => {
    setFilters(userFilters)
    inventoryGetItems({
      skip,
      take: paginationSize,
      query: userFilters
    })
  }

  const handleClickExport = () => {
    inventoryGetItemsExport({ skip, take: totalItems, query: filters })
  }

  const preparedColumns = columns.map(el => ({ ...el, columnName: el.title, fieldId: el.dataIndex }))

  return (
    <Wrapper>
      <AdvancedFiltersPanel handleFilterProducts={handleFilterProducts} columnsData={preparedColumns}>
        <ExportButtonWrapper>
          <Button type='danger' size='large' onClick={handleClickExport}>
            {intl.get('export')}
          </Button>
        </ExportButtonWrapper>
      </AdvancedFiltersPanel>
      <StyledPanelContainer>
        <FoundItems count={totalItems} text={intl.get('trackAndTrace.inventory.foundReports')} />
        {totalItems ? (
          <StyledSelectsContainer>
            <SortBy
              defaultValue='Do not sort'
              handleSort={handleSortProducts}
              style={{ width: 200, marginRight: 20 }}
              order={order}
              sortedOptions={sortOptions}
            />
            <NumberOfElementsPerPage
              paginationSize={paginationSize}
              handleChangePaginationSize={handleChangePaginationSize}
            />
          </StyledSelectsContainer>
        ) : null}
      </StyledPanelContainer>
      <CustomTable columns={columns} data={validAllItems} loading={isLoading} rowKey='key' totalCounts={totalItems} />
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

InventoryReportsTab.propTypes = {
  inventoryGetItems: PropTypes.func.isRequired,
  inventoryGetItemsExport: PropTypes.func.isRequired,
  skip: PropTypes.number.isRequired,
  take: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  allItems: PropTypes.array,
  totalItems: PropTypes.number,
  isLoading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  fullData: PropTypes.array,
  inventoryClearFullData: PropTypes.func.isRequired
}

InventoryReportsTab.defaultProps = {
  allItems: [],
  fullData: [],
  totalItems: null,
  isLoading: false
}

export default withRouter(InventoryReportsTab)
