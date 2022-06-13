import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import Button from '../../atoms/Button'
import FilterPanel from '../../molecules/FilterPanel'
import deleteModal from '../../molecules/DeleteModal'
import Card from '../../molecules/DeliveryCard'
import * as ST from './styles'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'
import CustomPagination from '../../atoms/CustomPagination'
import { columns } from './consts'
import { icons } from '../../../utils/consts'
import { convertFromUint256 } from '../../../utils/helpers/mathOperations'
import Loader from '../../templates/Loader'

const TodoCardsDeliveries = ({
  history,
  todoGetTodoDeliveries,
  todoDeliveries,
  isTodoDeliveriesLoading,
  todoDeleteTodoDelivery,
  participantGetParticipantDeposit,
  isTodoDeliveryDeleting,
  todoSelectTodoDelivery
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationSize, setPaginationSize] = useState(10)
  const [currItems, setCurrItems] = useState(null)
  const [filterValues, setFilterValues] = useState(null)

  useEffect(() => {
    todoGetTodoDeliveries()
    participantGetParticipantDeposit()
  }, [])

  const count = useMemo(() => {
    return currItems && currItems.length
  }, [currItems])

  useEffect(() => {
    const newDeliveries = todoDeliveries.map(el => {
      if (el.card) {
        Object.keys(el.card).forEach(key => {
          if (key === 'result') {
            // eslint-disable-next-line no-param-reassign
            el[`card_${key}_coins`] = el.card[key] && el.card[key].coins
          } else {
            // eslint-disable-next-line no-param-reassign
            el[`card_${key}`] = el.card[key]
          }
        })
      }
      return el
    })
    setCurrItems(newDeliveries)
  }, [todoDeliveries])

  const handleAddCard = () => {
    history.push(`/admin/todo-cards/deliveries/editor`)
  }

  const handleEditCard = id => {
    todoSelectTodoDelivery(id)
    history.push(`/admin/todo-cards/deliveries/editor`)
  }

  const handleDeleteCard = id => {
    todoDeleteTodoDelivery(id)
  }

  const handleChangePaginationSize = value => {
    setCurrentPage(1)
    setPaginationSize(value)
  }

  const getUpdatedCards = useCallback(deliveries => {
    if (!deliveries) {
      return []
    }

    return deliveries.map(el => {
      let imageSrc = null

      if (el.card && el.card.icon) {
        const iconFromStorage = icons.find(elem => elem.value === el.card.icon)
        imageSrc = iconFromStorage ? iconFromStorage.url : el.card.icon
      }

      return { ...el, image_src: imageSrc, columnName: el.name, fieldId: el.id }
    })
  }, [])

  const setLocationsWithFilters = () => {
    setCurrentPage(1)
    let filteredLocation = [...todoDeliveries]
    if (filterValues && Object.keys(filterValues).length !== 0) {
      Object.keys(filterValues).forEach(el => {
        const filterField = filterValues[el]
        const regExValue = new RegExp(filterField.value, 'gi')
        const isMatch = filterField && filterField.value && filterField.option

        if (el === 'card_auto_approve') {
          const newEl = filterField.value === 'yes'
          filteredLocation =
            filteredLocation &&
            filteredLocation.filter(loc =>
              isMatch ? loc.card_auto_approve === newEl : !loc.card_auto_approve === newEl
            )
        } else if (el === 'start_date') {
          const newEl = moment(filterField.value)

          filteredLocation =
            filteredLocation &&
            filteredLocation.filter(loc => {
              return isMatch
                ? moment(loc.start_date).isSame(newEl, 'day')
                : !moment(loc.start_date).isSame(newEl, 'day')
            })
        } else if (el === 'card_result_coins' || el === 'submissions_made') {
          filteredLocation =
            filteredLocation &&
            filteredLocation.filter(loc => {
              if (filterField.value === '0') {
                return isMatch ? !loc[el] : loc[el]
              }
              return isMatch
                ? Math.ceil(convertFromUint256(loc[el])) === Number(filterField.value)
                : Math.ceil(convertFromUint256(loc[el])) !== Number(filterField.value)
            })
        } else if (el === 'budget') {
          filteredLocation =
            filteredLocation &&
            filteredLocation.filter(loc => {
              return isMatch
                ? Number(loc[el]) === filterField.value * 1000000000000000000
                : Number(loc[el]) !== filterField.value * 1000000000000000000
            })
        } else if (el === 'status') {
          filteredLocation =
            filteredLocation &&
            filteredLocation.filter(loc => {
              if (!loc[el]) {
                return false
              }
              return isMatch ? loc[el] === filterField.value : loc[el] !== filterField.value
            })
        } else {
          filteredLocation =
            filteredLocation &&
            filteredLocation.filter(loc => {
              // eslint-disable-next-line no-nested-ternary
              return loc[el]
                ? loc[el].toString() && isMatch
                  ? loc[el].toString().match(regExValue)
                  : !loc[el].toString().match(regExValue)
                : false
            })
        }
      })
    }

    setCurrItems(getUpdatedCards(filteredLocation) || null)
  }

  useEffect(() => {
    setLocationsWithFilters()
  }, [todoDeliveries, filterValues])

  const preparedColumns = useMemo(() => {
    return getUpdatedCards(todoDeliveries)
  }, [todoDeliveries, getUpdatedCards])

  const lastPage = useMemo(() => Math.ceil(count / paginationSize), [count, paginationSize])

  const setItems = useCallback(() => {
    setCurrItems(preparedColumns)
  }, [preparedColumns])

  const setDefaultSort = () => {
    setItems()
  }

  const slicedDataForTable = useMemo(() => {
    return (
      currItems &&
      currItems.slice((currentPage - 1) * paginationSize, (currentPage - 1) * paginationSize + paginationSize)
    )
  }, [currItems, currentPage, paginationSize])

  const handleFilterProducts = userFilters => {
    setFilterValues(userFilters)
  }

  const handleChangePagination = page => {
    setCurrentPage(page)
  }

  return (
    <ST.Wrapper>
      <FilterPanel
        handleFilterProducts={handleFilterProducts}
        fieldsForMainPanel={['name']}
        columnsData={columns}
        isAdvanced
      >
        <ST.ExportButtonWrapper>
          <Button type='danger' size='large' onClick={handleAddCard}>
            Add delivery
          </Button>
        </ST.ExportButtonWrapper>
      </FilterPanel>
      <TableHeaderOptions
        totalItems={count}
        foundItemsLabel='deliveries'
        optionsForSort={columns}
        itemsForSort={currItems}
        handleChangePaginationSize={handleChangePaginationSize}
        paginationSize={paginationSize}
        setCurrItemsForSort={items => setCurrItems(items)}
        setDefaultSort={setDefaultSort}
      />
      <div>
        {isTodoDeliveriesLoading || isTodoDeliveryDeleting ? (
          <Loader />
        ) : (
          <Card
            items={slicedDataForTable || []}
            showConfirm={item =>
              deleteModal(() => handleDeleteCard(item.id), `Are you sure you want to delete delivery ${item.name}`)
            }
            redirectOnClick={handleEditCard}
            isLoadingItemsList={isTodoDeliveriesLoading}
            isDeletingGtin={false}
            isDeleteIconExist
            isAdditionalFields
          />
        )}
      </div>
      {!isTodoDeliveriesLoading && !isTodoDeliveryDeleting && lastPage > 1 && (
        <CustomPagination
          count={count}
          currentPaginationPage={currentPage}
          lastPage={lastPage}
          paginationSize={paginationSize}
          handlePagination={handleChangePagination}
        />
      )}
    </ST.Wrapper>
  )
}

TodoCardsDeliveries.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  location: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  history: PropTypes.object.isRequired,
  todoGetTodoDeliveries: PropTypes.func.isRequired,
  isTodoDeliveriesLoading: PropTypes.bool,
  todoDeleteTodoDelivery: PropTypes.func.isRequired,
  participantGetParticipantDeposit: PropTypes.func.isRequired,
  todoDeliveries: PropTypes.arrayOf(
    PropTypes.shape({
      auto_approve: PropTypes.bool,
      description: PropTypes.string,
      icon: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string,
      owner: PropTypes.string,
      result: PropTypes.shape({ coins: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) }),
      steps: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
          title: PropTypes.string,
          type: PropTypes.string,
          answers: PropTypes.arrayOf(
            PropTypes.shape({
              answer: PropTypes.string,
              correct: PropTypes.bool
            })
          )
        })
      )
    })
  ),
  isTodoDeliveryDeleting: PropTypes.bool,
  todoSelectTodoDelivery: PropTypes.func.isRequired
}

TodoCardsDeliveries.defaultProps = {
  isTodoDeliveriesLoading: false,
  todoDeliveries: [],
  isTodoDeliveryDeleting: false
}

export default withRouter(TodoCardsDeliveries)
