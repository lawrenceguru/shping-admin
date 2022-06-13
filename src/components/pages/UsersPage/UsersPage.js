/* eslint-disable prefer-destructuring */
import React, { useEffect, useMemo, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import moment from 'moment'
import * as ST from './styles'
import Loader from '../../templates/Loader'
import { columns, fieldsForMainPanelAdvanced, filterOptions } from './consts'
import Table from '../../molecules/Table'
import CustomPagination from '../../atoms/CustomPagination'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'
import IconButton from '../../molecules/IconButton'
import FilterPanel from '../../molecules/FilterPanel'
import { formatUTCToApi, parseDate } from '../../../utils/helpers/date'
import { copyToClipboard } from '../../../utils/copyToClipBoard'

const componentName = ({ users, isLoading, usersGetUsersList, count, filters, history }) => {
  const [paginationSize, setPaginationSize] = useState(10)
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1)
  const [order, setOrder] = useState('Do not sort')
  const lastPage = useMemo(() => Math.ceil(count / paginationSize), [count, paginationSize])
  const defaultInitialState = useMemo(() => {
    return (
      (filters &&
        filters.options &&
        Object.keys(filters.options).reduce((result, currItem) => {
          const currRes = { ...result }
          currRes[currItem] = { value: filters.options[currItem], option: false }
          return currRes
        }, {})) ||
      null
    )
  }, [filters])

  useEffect(() => {
    if (filters) {
      setPaginationSize(filters.limit || 10)
      setCurrentPaginationPage(filters.offset ? filters.offset / filters.limit + 1 : 1)
      setOrder(filters.order_by || 'Do not sort')
    }

    if (!isLoading) {
      usersGetUsersList(filters)
    }
  }, [])

  const handleChangePaginationSize = useCallback(
    size => {
      setCurrentPaginationPage(1)
      setPaginationSize(size)
      usersGetUsersList({
        ...filters,
        offset: 0,
        limit: size
      })
    },
    [filters]
  )

  const handleChangePagination = useCallback(
    page => {
      setCurrentPaginationPage(page)
      usersGetUsersList({
        ...filters,
        offset: paginationSize * (page - 1),
        limit: paginationSize
      })
    },
    [filters, paginationSize]
  )

  const setDefaultSort = useCallback(() => {
    usersGetUsersList({
      ...filters,
      order_by: undefined
    })
  }, [filters])

  const handleSort = useCallback(
    newOrder => {
      setOrder(newOrder)
      usersGetUsersList({
        ...filters,
        order_by: newOrder === 'Do not sort' ? undefined : newOrder
      })
    },
    [filters]
  )

  const handleShowInfo = useCallback(
    id => {
      history.push(`/admin/users/info/${id}`)
    },
    [history]
  )

  const mergedColumns = useMemo(() => {
    return [
      {
        key: 'action',
        align: 'center',
        render: data => (
          <ST.ActionsWrapper>
            <IconButton type='Copy' actionFunction={() => copyToClipboard(data.id)} styleParam={{ fontSize: '20px' }} />
            <IconButton type='File' actionFunction={() => handleShowInfo(data.id)} styleParam={{ fontSize: '20px' }} />
          </ST.ActionsWrapper>
        )
      },
      ...columns
    ]
  }, [columns])

  const getFilterFromValue = userFilters => {
    const result = {}
    let newFilters = {}

    if (userFilters) {
      newFilters = { ...userFilters }
      const fields = [
        'total_buddies_invitations_accepted',
        'total_buddies_invitations_sent',
        'total_buddies_received_invitations_accepted',
        'total_reviews_accepted',
        'total_reviews_pending',
        'total_reviews_rejected'
      ]

      fields.forEach(item => {
        if (userFilters[`${item}_from`]) {
          result[item] = {
            ...result[item],
            value_from: userFilters[`${item}_from`].value
          }
          delete newFilters[`${item}_from`]
        }

        if (userFilters[`${item}_to`]) {
          result[item] = {
            ...result[item],
            value_to: userFilters[`${item}_to`].value
          }
          delete newFilters[`${item}_to`]
        }

        if (
          userFilters[`${item}_date`] &&
          userFilters[`${item}_date`].value &&
          userFilters[`${item}_date`].value.length
        ) {
          result[item] = {
            ...result[item],
            date_from: userFilters[`${item}_date`].value[0],
            date_to: userFilters[`${item}_date`].value[1]
          }
          delete newFilters[`${item}_date`]
        }
      })

      if (userFilters.created && userFilters.created.value && userFilters.created.value.length) {
        result.created_from = formatUTCToApi(parseDate(moment.utc(`${userFilters.created.value[0]}Z`)))
        result.created_to = formatUTCToApi(parseDate(moment.utc(`${userFilters.created.value[1]}Z`)))
        delete newFilters.created
      }

      if (userFilters.last_access && userFilters.last_access.value && userFilters.last_access.value.length) {
        result.last_access_from = formatUTCToApi(parseDate(moment.utc(`${userFilters.last_access.value[0]}Z`)))
        result.last_access_to = formatUTCToApi(parseDate(moment.utc(`${userFilters.last_access.value[1]}Z`)))
        delete newFilters.last_access
      }
    }

    return {
      options: result,
      newFilters
    }
  }

  const handleFilterUsers = useCallback(
    userFilters => {
      const { newFilters, options } = getFilterFromValue(userFilters)
      const fields = newFilters && Object.keys(newFilters)

      if (fields.length || (options && Object.keys(options).length)) {
        usersGetUsersList({
          ...filters,
          options: {
            ...fields.reduce((result, currItem) => {
              const currRes = { ...result }

              if (currItem.includes('flag')) {
                currRes[currItem] =
                  newFilters[currItem].value === 'none' ? undefined : newFilters[currItem].value === 'true'
              } else {
                currRes[currItem] = newFilters[currItem].value
              }

              return currRes
            }, {}),
            ...options
          }
        })
      }
    },
    [filters]
  )

  const handleClearFilters = useCallback(() => {
    usersGetUsersList({
      ...filters,
      options: undefined
    })
  }, [filters])

  return (
    <ST.Wrapper>
      <ST.Header>{intl.get('users.header')}</ST.Header>
      <FilterPanel
        fieldsForMainPanelAdvanced={fieldsForMainPanelAdvanced}
        noEquals
        columnsData={filterOptions}
        isAdvanced
        handleFilterProducts={handleFilterUsers}
        customClear={handleClearFilters}
        defaultInitialState={defaultInitialState}
        isHaveNotPlaceholderForChildren
      />
      <TableHeaderOptions
        totalItems={count}
        optionsForSort={columns}
        handleChangePaginationSize={handleChangePaginationSize}
        customHandleSort={handleSort}
        customOrder={order}
        paginationSize={paginationSize}
        setDefaultSort={setDefaultSort}
      />
      <ST.TableWrapper>
        {isLoading ? (
          <Loader />
        ) : (
          users &&
          users.length !== 0 && (
            <>
              <Table data={users} columns={mergedColumns} rowKey='uuid' scroll={{ x: 2000 }} />
              {lastPage > 1 && (
                <CustomPagination
                  currentPaginationPage={currentPaginationPage}
                  paginationSize={paginationSize}
                  handlePagination={page => handleChangePagination(page)}
                  count={count}
                  lastPage={lastPage}
                  size='small'
                />
              )}
            </>
          )
        )}
      </ST.TableWrapper>
    </ST.Wrapper>
  )
}

componentName.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  usersGetUsersList: PropTypes.func.isRequired,
  count: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  filters: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
}
componentName.defaultProps = {
  users: null,
  isLoading: false,
  count: 0,
  filters: null
}

export default componentName
