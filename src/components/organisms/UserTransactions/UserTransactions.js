import React, { useEffect, useMemo, useState, useCallback } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import * as ST from './styles'
import Table from '../../molecules/Table'
import { columns } from './consts'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'
import Button from '../../atoms/Button'
import InfoForm from '../../atoms/InfoForm'
import { name } from '../../../utils/consts'

const UserTransactions = ({
  id,
  isLoadingTransactions,
  usersGetUserTransactions,
  transactions,
  usersPutUserTransaction,
  countries,
  isLoadingCountries,
  settingsGetCountries
}) => {
  const [localData, setLocalData] = useState([])
  const [limit, setLimit] = useState(10)
  const totalItems = useMemo(() => {
    return (localData && localData.length) || 0
  }, [localData])

  useEffect(() => {
    if ((!countries || !countries.length) && !isLoadingCountries) {
      settingsGetCountries()
    }
  }, [])

  useEffect(() => {
    if (id) {
      usersGetUserTransactions(id)
    }
  }, [id])

  useEffect(() => {
    if (transactions && transactions.length) {
      setLocalData([...transactions])
    }
  }, [transactions])

  const setDefaultSort = useCallback(() => {
    if (transactions && transactions.length) {
      setLocalData([...transactions])
    }
  }, [transactions])

  const handleOnTypeButtonClick = useCallback(
    (info, type) => {
      let content

      if (info.title === 'transfer') {
        content = (
          <>
            <p>
              <span>{intl.get('users.transactionHistory.transfer.address')}: </span>
              {info.address || intl.get('common.notProvided')}
            </p>
            <p>
              <span>{intl.get('users.transactionHistory.transfer.hash')}: </span>
              {info.hash || intl.get('common.notProvided')}
            </p>
          </>
        )
      }

      if (info.title === 'cashout') {
        const countryDetails = countries && countries.length !== 0 && countries.find(({ iso }) => iso === info.country)
        const location = `${info.city ? `${info.city.trim()}, ` : ''}${countryDetails ? countryDetails[name] : ''}${
          info.postcode ? `, ${info.postcode}` : ''
        }`
        content = (
          <>
            <p>
              <span>{intl.get('users.transactionHistory.cashoutInfo.name')}: </span>
              {info.name || intl.get('common.notProvided')}
            </p>
            <p>
              <span>{intl.get('users.transactionHistory.cashoutInfo.accountNumber')}: </span>
              {info.account || intl.get('common.notProvided')}
            </p>
            <p>
              <span>{intl.get('users.transactionHistory.cashoutInfo.bank')}: </span>
              {info.bank || intl.get('common.notProvided')}
            </p>
            <p>
              <span>{intl.get('users.transactionHistory.cashoutInfo.bsb')}: </span>
              {info.bsb || intl.get('common.notProvided')}
            </p>
            <p>
              <span>{intl.get('users.transactionHistory.cashoutInfo.description')}: </span>
              {info.description || intl.get('common.notProvided')}
            </p>
            <p>
              <span>{intl.get('users.transactionHistory.cashoutInfo.location')}: </span>
              {location || intl.get('common.notProvided')}
            </p>
          </>
        )
      }

      InfoForm(content, type)
    },
    [countries]
  )

  const handleOnCancel = useCallback((cashoutId, status, userId) => {
    usersPutUserTransaction({
      id: userId,
      status,
      cashout_id: cashoutId
    })
  }, [])

  const mergedColumns = useMemo(() => {
    return [
      columns[0],
      {
        key: 'type',
        span: intl.get('users.transactionHistory.type'),
        align: 'center',
        render: data =>
          data && data.extendInfo ? (
            <Button
              type='danger'
              disabled={data.extendInfo === 'deposit'}
              onClick={() => handleOnTypeButtonClick(data.extendInfo, data.type)}
            >
              {data.type}
            </Button>
          ) : (
            <span>-</span>
          )
      },
      ...columns.slice(1),
      {
        key: 'action',
        align: 'center',
        render: data =>
          data.status === 'success' && data.extendInfo && data.extendInfo.span === 'cashout' ? (
            <Button onClick={() => handleOnCancel(data.id, data.status, id)}>{intl.get('cancel')}</Button>
          ) : null
      }
    ]
  }, [columns, countries])

  return (
    <ST.Wrapper>
      <ST.Header>{intl.get('users.transactionHistory.header')}</ST.Header>
      <TableHeaderOptions
        totalItems={totalItems}
        optionsForSort={columns}
        itemsForSort={localData}
        handleChangePaginationSize={size => setLimit(size)}
        paginationSize={limit}
        setCurrItemsForSort={items => setLocalData(items)}
        setDefaultSort={setDefaultSort}
      />
      <Table
        data={localData}
        columns={mergedColumns}
        totalCounts={totalItems}
        limit={limit}
        rowKey='id'
        loading={isLoadingTransactions}
        pagination
      />
    </ST.Wrapper>
  )
}

UserTransactions.propTypes = {
  id: PropTypes.string,
  isLoadingTransactions: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  transactions: PropTypes.arrayOf(PropTypes.object),
  usersGetUserTransactions: PropTypes.func.isRequired,
  usersPutUserTransaction: PropTypes.func.isRequired,
  countries: PropTypes.arrayOf(PropTypes.object),
  isLoadingCountries: PropTypes.bool,
  settingsGetCountries: PropTypes.func.isRequired
}
UserTransactions.defaultProps = {
  id: null,
  isLoadingTransactions: false,
  transactions: null,
  countries: null,
  isLoadingCountries: false
}

export default UserTransactions
