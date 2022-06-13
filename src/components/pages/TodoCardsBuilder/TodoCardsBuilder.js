import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import intl from 'react-intl-universal'
import { icons } from '../../../utils/consts'
import Button from '../../atoms/Button'
import FilterPanel from '../../molecules/FilterPanel'
import deleteModal from '../../molecules/DeleteModal'
import Card from '../../molecules/BuilderCard'
import * as ST from './styles'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'
import CustomPagination from '../../atoms/CustomPagination'
import Loader from '../../templates/Loader'

const TodoCardsBuilder = ({
  history,
  todoGetTodoCards,
  isTodoCardsLoading,
  todoCards,
  todoDeleteTodoCards,
  isTodoCardsDeleting,
  todoSelectTodoCard
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationSize, setPaginationSize] = useState(10)
  const [currItems, setCurrItems] = useState(null)
  const [filterValues, setFilterValues] = useState(null)

  useEffect(() => {
    todoGetTodoCards()
  }, [])

  const count = useMemo(() => {
    return currItems && currItems.length
  }, [currItems])

  useEffect(() => {
    setCurrItems(todoCards)
  }, [todoCards])

  const handleAddCard = () => {
    history.push(`/admin/todo-cards/editor`)
  }

  const handleEditCard = id => {
    todoSelectTodoCard(id)
    history.push(`/admin/todo-cards/editor`)
  }

  const handleDeleteCard = id => {
    todoDeleteTodoCards(id)
  }

  const handleChangePaginationSize = value => {
    setCurrentPage(1)
    setPaginationSize(value)
  }

  const getUpdatedCards = useCallback(todos => {
    if (!todos) {
      return []
    }
    return todos.map(el => {
      let imageSrc = null

      if (el.promo_image) {
        imageSrc = el.promo_image
      } else if (el.icon) {
        const iconFromStorage = icons.find(elem => elem.value === el.icon)
        imageSrc = iconFromStorage ? iconFromStorage.url : el.icon
      }

      return { ...el, image_src: imageSrc, columnName: el.name, fieldId: el.id }
    })
  }, [])

  const setLocationsWithFilters = () => {
    let filteredLocation = [...todoCards]
    if (filterValues && Object.keys(filterValues).length !== 0) {
      Object.keys(filterValues).forEach(el => {
        const filterField = filterValues[el]
        const regExValue = new RegExp(filterField.value, 'gi')
        const isMatch = filterField && filterField.value && filterField.option

        filteredLocation =
          filteredLocation &&
          filteredLocation.filter(loc => (loc[el] && isMatch ? loc[el].match(regExValue) : !loc[el].match(regExValue)))
      })
    }

    setCurrItems(getUpdatedCards(filteredLocation) || null)
  }

  useEffect(() => {
    setLocationsWithFilters()
  }, [todoCards, filterValues])

  const preparedColumns = useMemo(() => {
    return getUpdatedCards(todoCards)
  }, [todoCards, getUpdatedCards])

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

  const optionsForSort = ['name', 'description'].map(el => ({
    ...el,
    title: el,
    dataIndex: el,
    rowKey: el,
    fieldId: el,
    columnName: el
  }))

  return (
    <ST.Wrapper>
      <FilterPanel handleFilterProducts={handleFilterProducts} fieldsForMainPanel={['name', 'description']}>
        <ST.ExportButtonWrapper>
          <Button type='danger' size='large' onClick={handleAddCard}>
            {intl.get('todo.builder.add')}
          </Button>
        </ST.ExportButtonWrapper>
      </FilterPanel>
      <TableHeaderOptions
        totalItems={count}
        foundItemsLabel='cards'
        optionsForSort={optionsForSort}
        itemsForSort={currItems}
        handleChangePaginationSize={handleChangePaginationSize}
        paginationSize={paginationSize}
        setCurrItemsForSort={items => setCurrItems(items)}
        setDefaultSort={setDefaultSort}
      />
      <div>
        {isTodoCardsLoading || isTodoCardsDeleting ? (
          <Loader />
        ) : (
          <Card
            items={slicedDataForTable || []}
            visibleFields={['name', 'description']}
            fields={['name', 'description']}
            showConfirm={item => deleteModal(() => handleDeleteCard(item.id), `Are you sure delete ${item.name}`)}
            redirectOnClick={handleEditCard}
            isLoadingItemsList={isTodoCardsLoading || isTodoCardsDeleting}
            isDeletingGtin={false}
            isDeleteIconExist
            isAdditionalFields
            popText={intl.get('todo.builder.delete')}
          />
        )}
      </div>
      {!isTodoCardsLoading && lastPage > 1 && (
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

TodoCardsBuilder.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  location: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  history: PropTypes.object.isRequired,
  todoGetTodoCards: PropTypes.func.isRequired,
  todoDeleteTodoCards: PropTypes.func.isRequired,
  isTodoCardsLoading: PropTypes.bool,
  todoCards: PropTypes.arrayOf(
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
  isTodoCardsDeleting: PropTypes.bool,
  todoSelectTodoCard: PropTypes.func.isRequired
}

TodoCardsBuilder.defaultProps = {
  isTodoCardsLoading: false,
  todoCards: [],
  isTodoCardsDeleting: false
}

export default withRouter(TodoCardsBuilder)
