import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { isNil } from 'lodash'
import { StyledSelectsOptionsContainer, TableHeaderWrapper, ActionsWrapper } from './styles'
import FoundItems from '../FoundItems'
import SortBy from '../SortBy'
import NumberOfElementsPerPage from '../NumberOfElementsPerPage'

const TableHeaderOptions = ({
  totalItems,
  foundItemsLabel,
  itemsForSort,
  customHandleSort,
  paginationSize,
  optionsForSort,
  handleChangePaginationSize,
  setCurrItemsForSort,
  setDefaultSort,
  hasNotSort,
  children,
  customOrder,
  isHaveActionsContainer
}) => {
  const [order, setOrder] = useState(null)
  const formattedOptionForSort = useMemo(
    () =>
      [{ title: intl.get('tableSettings.dontSort'), dataIndex: 'Do not sort' }, ...optionsForSort]
        .filter(field => field.dataIndex !== 'actions')
        .map((field, index) => {
          const newTitle = field.title.replace(/_/g, ' ')
          return {
            title: newTitle.charAt(0).toUpperCase() + newTitle.substr(1),
            value: field.dataIndex,
            customFieldId: `${field.dataIndex}-${index}`,
            fieldId: field.dataIndex || field.key
          }
        }),
    [optionsForSort]
  )

  const sort = (a, b) => {
    if (a < b) {
      return -1
    }
    if (a > b) {
      return 1
    }
    return 0
  }

  const handleSort = sortBy => {
    if (sortBy !== 'Do not sort') {
      setOrder(`${sortBy}-desc`)
      if (itemsForSort && itemsForSort.length) {
        const copyCurrItems = [...itemsForSort].filter(el => !isNil(el[sortBy]))
        copyCurrItems.sort((a, b) => {
          return sort(a[sortBy], b[sortBy])
        })
        setCurrItemsForSort(copyCurrItems)
      }
    } else {
      setOrder(null)
      setDefaultSort()
    }
  }

  return (
    <TableHeaderWrapper>
      {isHaveActionsContainer ? (
        <ActionsWrapper>
          <FoundItems count={totalItems} text={foundItemsLabel} />
          {children}
        </ActionsWrapper>
      ) : (
        <>
          <FoundItems count={totalItems} text={foundItemsLabel} />
          {children}
        </>
      )}
      {totalItems ? (
        <StyledSelectsOptionsContainer>
          {!hasNotSort && (
            <SortBy
              defaultValue={customOrder || 'Do not sort'}
              handleSort={customHandleSort || handleSort}
              style={{ width: 200, marginRight: 20 }}
              order={customOrder || order}
              sortedOptions={formattedOptionForSort}
            />
          )}
          {handleChangePaginationSize && (
            <NumberOfElementsPerPage
              paginationSize={paginationSize}
              handleChangePaginationSize={handleChangePaginationSize}
            />
          )}
        </StyledSelectsOptionsContainer>
      ) : null}
    </TableHeaderWrapper>
  )
}

TableHeaderOptions.propTypes = {
  totalItems: PropTypes.number,
  foundItemsLabel: PropTypes.string,
  customHandleSort: PropTypes.func,
  optionsForSort: PropTypes.arrayOf(PropTypes.object),
  paginationSize: PropTypes.number,
  handleChangePaginationSize: PropTypes.func,
  itemsForSort: PropTypes.arrayOf(PropTypes.object),
  setCurrItemsForSort: PropTypes.func,
  setDefaultSort: PropTypes.func,
  hasNotSort: PropTypes.bool,
  children: PropTypes.element,
  isHaveActionsContainer: PropTypes.bool,
  customOrder: PropTypes.string
}

TableHeaderOptions.defaultProps = {
  totalItems: 0,
  foundItemsLabel: null,
  customHandleSort: null,
  optionsForSort: [],
  paginationSize: 10,
  handleChangePaginationSize: null,
  itemsForSort: null,
  setCurrItemsForSort: null,
  setDefaultSort: null,
  hasNotSort: false,
  children: null,
  isHaveActionsContainer: false,
  customOrder: null
}

export default TableHeaderOptions
