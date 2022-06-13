import React, { useEffect, useMemo, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { toast } from 'react-toastify'
import moment from 'moment'
import { Form } from 'antd'
import * as ST from './styles'
import Loader from '../../templates/Loader'
import { columns, fieldsForMainPanelAdvanced } from './consts'
import Table from '../../molecules/Table'
import CustomPagination from '../../atoms/CustomPagination'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'
import IconButton from '../../molecules/IconButton'
import deleteModal from '../../molecules/DeleteModal'
import ModalForm from '../../atoms/ModalForm'
import LocalRangePicer from '../../atoms/LocalRangePicker'
import CustomDatePicker from '../../atoms/CustomDatePicker'
import FilterPanel from '../../molecules/FilterPanel'
import { ReactComponent as XeroLogo } from '../../../assets/xero-logo.svg'
import useBillingCompany from '../../../data/billing/company'

const XeroLogoCom = ({ id }) => {
  const { data: company } = useBillingCompany(id)
  return company?.billings?.xero_contact_id ? <XeroLogo /> : null
}
const CustomersTab = ({
  customerRemoveParticipant,
  customerGetAll,
  customerSetPaidPeriod,
  customerSetTrialPeriod,
  customerDeleteData,
  customerIsLoading,
  customerList,
  customerCount,
  isUpdating,
  filters,
  history
}) => {
  const [paginationSize, setPaginationSize] = useState(10)
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1)
  const [order, setOrder] = useState('Do not sort')
  const lastPage = useMemo(() => Math.ceil(customerCount / paginationSize), [customerCount, paginationSize])
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

    if (!customerIsLoading) {
      customerGetAll(filters)
    }
  }, [])

  const optionsForSort = useMemo(() => {
    return [
      ...columns.slice(0, 2),
      {
        key: 'billing_trial_to',
        title: 'Trial period',
        dataIndex: 'billing_trial_to'
      },
      {
        key: 'billing_paid_to',
        title: 'Paid until',
        dataIndex: 'billing_paid_to'
      },
      {
        key: 'billing_plan',
        title: 'Plan',
        dataIndex: 'billing_plan'
      }
    ]
  }, [columns])

  const handleChangePaginationSize = useCallback(
    size => {
      setCurrentPaginationPage(1)
      setPaginationSize(size)
      customerGetAll({
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
      customerGetAll({
        ...filters,
        offset: paginationSize * (page - 1),
        limit: paginationSize
      })
    },
    [filters, paginationSize]
  )

  const setDefaultSort = useCallback(() => {
    customerGetAll({
      ...filters,
      order_by: undefined
    })
  }, [filters])

  const handleSort = useCallback(
    newOrder => {
      setOrder(newOrder)
      customerGetAll({
        ...filters,
        order_by: newOrder === 'Do not sort' ? undefined : newOrder
      })
    },
    [filters]
  )

  const handleRefresh = useCallback(() => {
    customerGetAll({
      ...filters
    })
  }, [filters])

  const disabledDate = useCallback(
    current => {
      return current && current < moment().startOf('day')
    },
    [moment]
  )

  const handleSetPaidPeriod = useCallback(record => {
    let dates

    ModalForm(
      () => {
        if (!record || !record.id) {
          toast.error(intl.get('customer.dialog.customerNotFound'))
          return false
        }

        if (!dates || !dates[0] || !dates[1]) {
          toast.error(intl.get('customer.dialog.dateNotFound'))
          return false
        }
        customerSetPaidPeriod({ date: dates, id: record.id })

        return true
      },
      <Form.Item label={intl.get('customer.dialog.setPaidPeriodHeader')}>
        <LocalRangePicer onChange={value => (dates = value)} disabledDate={disabledDate} />
      </Form.Item>
    )
  }, [])

  const handleSetTrialPeriod = useCallback(record => {
    let trialPeriodDate

    ModalForm(
      () => {
        if (!record || !record.id) {
          toast.error(intl.get('customer.dialog.customerNotFound'))
          return false
        }

        if (!trialPeriodDate) {
          toast.error(intl.get('customer.dialog.dateNotFound'))
          return false
        }
        customerSetTrialPeriod({ toDate: trialPeriodDate, id: record.id })

        return true
      },
      <Form.Item label={intl.get('customer.dialog.setTrialPeriodHeader')}>
        <CustomDatePicker
          onChange={value => (trialPeriodDate = value)}
          style={{ width: '100%' }}
          isMomentValue
          disabledDate={disabledDate}
        />
      </Form.Item>
    )
  }, [])

  const handleShowInfo = useCallback(
    record => {
      history.push(`/admin/customers/list/${record.id}`)
    },
    [history]
  )

  const mergedColumns = useMemo(() => {
    return [
      {
        key: 'action',
        align: 'center',
        render: record => (
          <ST.ActionsWrapper>
            <IconButton type='File' styleParam={{ fontSize: '20px' }} actionFunction={() => handleShowInfo(record)} />
            <IconButton
              popText={intl.get('customer.actions.paidTitle')}
              type='Dollar'
              styleParam={{ fontSize: '20px' }}
              actionFunction={() => handleSetPaidPeriod(record)}
            />
            <IconButton
              popText={intl.get('customer.actions.trialTitle')}
              type='Calendar'
              styleParam={{ fontSize: '20px' }}
              actionFunction={() => handleSetTrialPeriod(record)}
            />
            <IconButton
              popText={intl.get('customer.actions.removeTitle')}
              type='DeleteTrash'
              styleParam={{ fontSize: '20px' }}
              actionFunction={() =>
                deleteModal(
                  () => customerDeleteData({ id: record.id }),
                  intl.get('customer.dialog.removeCustomerDataHeader')
                )
              }
            />
            <IconButton
              popText={intl.get('customer.actions.removeParticipant')}
              type='DeleteData'
              styleParam={{ fontSize: '20px' }}
              actionFunction={() =>
                deleteModal(
                  () => customerRemoveParticipant({ id: record.id }),
                  intl.get('customer.dialog.removeParticipant')
                )
              }
            />
            <XeroLogoCom id={record.id} />
          </ST.ActionsWrapper>
        )
      },
      ...columns
    ]
  }, [columns])

  const handleFilterParticipants = useCallback(
    userFilters => {
      const fields = userFilters && Object.keys(userFilters)
      if (fields.length) {
        customerGetAll({
          ...filters,
          options: fields.reduce((result, currItem) => {
            const currRes = { ...result }
            currRes[currItem] = userFilters[currItem].value
            return currRes
          }, {})
        })
      }
    },
    [filters]
  )

  const handleClearFilters = useCallback(() => {
    customerGetAll({
      ...filters,
      options: undefined
    })
  }, [filters])

  return (
    <ST.Wrapper>
      <FilterPanel
        fieldsForMainPanelAdvanced={fieldsForMainPanelAdvanced}
        noEquals
        handleFilterProducts={handleFilterParticipants}
        customClear={handleClearFilters}
        defaultInitialState={defaultInitialState}
      />
      <TableHeaderOptions
        totalItems={customerCount}
        optionsForSort={optionsForSort}
        handleChangePaginationSize={handleChangePaginationSize}
        customHandleSort={handleSort}
        customOrder={order}
        paginationSize={paginationSize}
        setDefaultSort={setDefaultSort}
        isHaveActionsContainer
      >
        <IconButton type='Refresh' styleParam={{ fontSize: '22px' }} actionFunction={handleRefresh} />
      </TableHeaderOptions>
      <ST.TableWrapper>
        {customerIsLoading ? (
          <Loader />
        ) : (
          <>
            <Table data={customerList} loading={isUpdating} columns={mergedColumns} rowKey='id' />
            {lastPage > 1 && (
              <CustomPagination
                currentPaginationPage={currentPaginationPage}
                paginationSize={paginationSize}
                handlePagination={page => handleChangePagination(page)}
                count={customerCount}
                lastPage={lastPage}
                size='small'
              />
            )}
          </>
        )}
      </ST.TableWrapper>
    </ST.Wrapper>
  )
}

CustomersTab.propTypes = {
  customerRemoveParticipant: PropTypes.func.isRequired,
  customerGetAll: PropTypes.func.isRequired,
  customerSetPaidPeriod: PropTypes.func.isRequired,
  customerSetTrialPeriod: PropTypes.func.isRequired,
  customerDeleteData: PropTypes.func.isRequired,
  customerIsLoading: PropTypes.bool,
  customerList: PropTypes.arrayOf(PropTypes.object),
  customerCount: PropTypes.number,
  isUpdating: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  filters: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
}

CustomersTab.defaultProps = {
  customerIsLoading: false,
  customerList: null,
  customerCount: 0,
  isUpdating: false,
  filters: null
}

export default CustomersTab
