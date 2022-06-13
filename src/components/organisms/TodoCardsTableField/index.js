import React, { useCallback, useEffect, useMemo, useState } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import TableField from '../TableField'
import { convertFromUint256 } from '../../../utils/helpers/mathOperations'

const todoCardsFieldColumns = [
  {
    title: intl.get('todo.deliveries.form.todoCardHeader1'),
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: intl.get('todo.deliveries.form.todoCardHeader2'),
    dataIndex: 'coins',
    key: 'coins'
  },
  {
    title: intl.get('todo.deliveries.form.todoCardHeader3'),
    dataIndex: 'type',
    key: 'type'
  }
]

const TodoCardsTableField = ({
  todoCards,
  unregister,
  register,
  setValue,
  name,
  loading,
  setHasBudget,
  editItemActiveId,
  disabled
}) => {
  const [todoCardsFieldData, setTodoCardsFieldData] = useState([])
  const [allTodos, setAllTodos] = useState([])
  const totalItemsTodo = useMemo(() => {
    return todoCardsFieldData && todoCardsFieldData.length
  }, [todoCardsFieldData])

  const optionsForSortTodo = useMemo(() => {
    return todoCardsFieldColumns && todoCardsFieldColumns.map(item => ({ title: item.key, dataIndex: item.key }))
  }, [todoCardsFieldColumns])

  const optionsForFilters = useMemo(() => {
    return todoCardsFieldColumns && todoCardsFieldColumns.map(item => item.key)
  }, [todoCardsFieldColumns])

  const getTodoItems = useCallback(() => {
    return todoCards.map((item, index) => {
      return {
        id: item.id,
        key: index,
        name: item.name,
        coins: (item.result && item.result.coins && Math.ceil(convertFromUint256(item.result.coins))) || '',
        type: item.icon
      }
    })
  }, [todoCards])

  const defaultFilterState = useMemo(() => {
    const defaultState = {}
    if (todoCardsFieldColumns && todoCardsFieldColumns.length > 0) {
      todoCardsFieldColumns.forEach(item => {
        defaultState[item.key] = { value: '', option: true }
      })
    }

    return defaultState
  }, [todoCardsFieldColumns])

  useEffect(() => {
    if (todoCards && todoCards.length > 0) {
      setTodoCardsFieldData(getTodoItems())
      setAllTodos(getTodoItems())
    }
  }, [getTodoItems])

  const setCurrItemsTodoForSort = useCallback(sortedItems => {
    setTodoCardsFieldData(sortedItems)
  }, [])

  const setDefaultItemsTodo = useCallback(() => {
    setTodoCardsFieldData(getTodoItems())
  }, [getTodoItems])

  const handleFilter = filterValues => {
    let filteredTodos = [...allTodos]
    if (filterValues && Object.keys(filterValues).length !== 0) {
      Object.keys(filterValues).forEach(el => {
        const filterField = filterValues[el]
        const regExValue = new RegExp(filterField.value, 'gi')
        const isMatch = filterField && filterField.option
        filteredTodos =
          filteredTodos &&
          filteredTodos.filter(loc => {
            return loc[el] && isMatch
              ? String(loc[el]).match(regExValue)
              : loc[el] && !String(loc[el]).match(regExValue)
          })
      })
    }

    setTodoCardsFieldData(filteredTodos || null)
  }

  const customHandleOnRowClick = useCallback(record => {
    setValue(name, record && record.id)
    setHasBudget(record && !!record.coins)

    register({ name: 'card_name' })
    setValue('card_name', record && record.name)

    register({ name: 'card_result_coins' })
    setValue('card_result_coins', record && !!record.coins)
  }, [])

  return (
    <TableField
      dataSource={todoCardsFieldData}
      columns={todoCardsFieldColumns}
      setCurrItemsForSort={setCurrItemsTodoForSort}
      unregister={unregister}
      setValue={setValue}
      register={register}
      name={name}
      setDefaultSort={setDefaultItemsTodo}
      options={optionsForSortTodo}
      totalItems={totalItemsTodo}
      loading={loading}
      itemsForSort={todoCardsFieldData}
      defaultFiltersState={defaultFilterState}
      filterOptions={optionsForFilters}
      handleFilter={handleFilter}
      customHandleOnRowClick={customHandleOnRowClick}
      isRequired
      editItemActiveId={editItemActiveId}
      disabled={disabled}
    />
  )
}

TodoCardsTableField.propTypes = {
  todoCards: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  unregister: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  setHasBudget: PropTypes.func.isRequired,
  editItemActiveId: PropTypes.string,
  disabled: PropTypes.bool
}

TodoCardsTableField.defaultProps = {
  todoCards: [],
  loading: false,
  editItemActiveId: '',
  disabled: false
}

export default TodoCardsTableField
