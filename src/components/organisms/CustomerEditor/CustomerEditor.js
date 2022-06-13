import React, { useMemo, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import moment from 'moment'
import { Select, Form } from 'antd'
import { normalizeFloat } from '../../../utils/helpers/mathOperations'
import { proccessCustomerInfo, proccessFeeData } from '../../../utils/customer'
import { name } from '../../../utils/consts'
import ModalForm from '../../atoms/ModalForm'
import LocalRangePicer from '../../atoms/LocalRangePicker'
import CustomDatePicker from '../../atoms/CustomDatePicker'
import RewardsFeeForm from '../../molecules/RewardsFeeForm'
import CustomerCard from '../CustomerCard'
import BudgetForm from '../../molecules/BudgetForm'

const { Option } = Select

const CustomerEditor = ({
  id,
  history,
  customerGetCustomerInfo,
  customerInfo,
  filters,
  timezones,
  isLoadingTimezones,
  settingsGetTimezone,
  countries,
  isLoadingCountries,
  settingsGetCountries,
  customerClearCustomerInfo,
  isSuccessRemoving,
  customerSetPaidPeriod,
  customerSetTrialPeriod,
  customerSetRewardsFee,
  customerSetBudget,
  customerSetTimezone,
  customerSetCustomerFlags
}) => {
  const customer = useMemo(() => {
    return (customerInfo && proccessCustomerInfo(customerInfo, countries, timezones)) || null
  }, [customerInfo, countries, timezones])

  useEffect(() => {
    if (id) {
      customerGetCustomerInfo({ ...filters, id })
    }

    if ((!countries || !countries.length) && !isLoadingCountries) {
      settingsGetCountries()
    }

    if ((!timezones || !timezones.length) && !isLoadingTimezones) {
      settingsGetTimezone()
    }

    return () => customerClearCustomerInfo()
  }, [])

  useEffect(() => {
    if (isSuccessRemoving) {
      history.push('/admin/customers/list')
    }
  }, [isSuccessRemoving])

  const disabledDate = useCallback(
    current => {
      return current && current < moment().startOf('day')
    },
    [moment]
  )

  const handleRefreshCustomer = useCallback(() => {
    customerGetCustomerInfo({ ...filters, id })
  }, [id, filters])

  const handleRewardsFeeForm = useCallback(
    participantId => {
      let values = proccessFeeData(customerInfo && customerInfo.balance && customerInfo.balance.fee)

      ModalForm(
        () => {
          if (!participantId) {
            toast.error(intl.get('customer.dialog.customerNotFound'))
            return false
          }

          if (!(values && values.type)) {
            toast.error(intl.get('customer.form.type.error'))

            return false
          }

          if (!(values && values.value)) {
            toast.error(intl.get('customer.form.feeValue.error'))

            return false
          }

          if (values.type && values.type === 'percentages') {
            const range = values && values.value

            if (range < 0 || range > 100) {
              toast.error(intl.get('customer.form.feeValue.errorRange'))

              return false
            }

            values.value = parseInt(values.value, 10)
          } else {
            values.value = normalizeFloat(values.value)
          }

          if (!(values && values.source)) {
            toast.error(intl.get('customer.form.source.error'))

            return false
          }

          if (!(values && values.status)) {
            toast.error(intl.get('customer.form.status.error'))

            return false
          }
          customerSetRewardsFee({ ...values, id: participantId })

          return true
        },
        <RewardsFeeForm onChange={value => (values = value)} defaultValues={values} />,
        intl.get('customer.dialog.rewardsFeeHeader')
      )
    },
    [customerInfo]
  )

  const handleSetBudget = useCallback(
    participantId => {
      let currentBudget = (customer && customer.budget) || 0

      ModalForm(() => {
        if (!participantId) {
          toast.error(intl.get('customer.dialog.customerNotFound'))
          return false
        }

        return customerSetBudget({
          id: participantId,
          budget: Number(currentBudget) === 0 ? null : Number(currentBudget)
        })
      }, <BudgetForm onChange={value => (currentBudget = value)} defaultValue={currentBudget} />)
    },
    [customer]
  )

  const handleSetPaidPeriod = useCallback(participantId => {
    let dates

    ModalForm(
      () => {
        if (!participantId) {
          toast.error(intl.get('customer.dialog.customerNotFound'))
          return false
        }

        if (!dates || !dates[0] || !dates[1]) {
          toast.error(intl.get('customer.dialog.dateNotFound'))
          return false
        }
        customerSetPaidPeriod({ date: dates, id: participantId, isInfo: true })

        return true
      },
      <Form.Item label={intl.get('customer.dialog.setPaidPeriodHeader')}>
        <LocalRangePicer onChange={value => (dates = value)} disabledDate={disabledDate} />
      </Form.Item>
    )
  }, [])

  const handleSetTrialPeriod = useCallback(participantId => {
    let trialPeriodDate

    ModalForm(
      () => {
        if (!participantId) {
          toast.error(intl.get('customer.dialog.customerNotFound'))
          return false
        }

        if (!trialPeriodDate) {
          toast.error(intl.get('customer.dialog.dateNotFound'))
          return false
        }
        customerSetTrialPeriod({ toDate: trialPeriodDate, id: participantId, isInfo: true })

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

  const handleSetTimezone = useCallback(
    participantId => {
      let code
      ModalForm(
        () => {
          if (!participantId) {
            toast.error(intl.get('customer.dialog.customerNotFound'))
            return false
          }

          if (!code) {
            toast.error(intl.get('customer.dialog.dateNotFound'))
            return false
          }
          customerSetTimezone({ code, id: participantId })

          return true
        },
        <Form.Item label={intl.get('customer.dialog.setTimezoneHeader')}>
          <Select
            showSearch
            onChange={value => (code = value)}
            defaultValue={customer.timezone_code}
            size='large'
            style={{ width: '100%' }}
            getPopupContainer={trigger => trigger.parentNode}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            placeholder={intl.get('customer.dialog.setTimezoneHeaderPlaceholder')}
          >
            {timezones &&
              timezones.length !== 0 &&
              timezones.map(timezone => (
                <Option key={timezone.id} value={timezone.id}>
                  {timezone[name]}
                </Option>
              ))}
          </Select>
        </Form.Item>
      )
    },
    [customer, timezones]
  )

  const handleChangeFlags = useCallback(
    (value, key, secondFlagValue) => {
      customerSetCustomerFlags({
        id,
        [key]: value,
        [key === 'partner_brand' ? 'paying_customer' : 'partner_brand']: secondFlagValue
      })
    },
    [id]
  )

  return (
    <CustomerCard
      id={id}
      customer={customer}
      handleRefreshCustomer={handleRefreshCustomer}
      handleRewardsFeeForm={handleRewardsFeeForm}
      handleSetPaidPeriod={handleSetPaidPeriod}
      handleSetTrialPeriod={handleSetTrialPeriod}
      handleSetTimezone={handleSetTimezone}
      handleSetBudget={handleSetBudget}
      handleChangeFlags={handleChangeFlags}
    />
  )
}

CustomerEditor.propTypes = {
  id: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  customerGetCustomerInfo: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  customerInfo: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  filters: PropTypes.object,
  timezones: PropTypes.arrayOf(PropTypes.object),
  isLoadingTimezones: PropTypes.bool,
  settingsGetTimezone: PropTypes.func.isRequired,
  countries: PropTypes.arrayOf(PropTypes.object),
  isLoadingCountries: PropTypes.bool,
  settingsGetCountries: PropTypes.func.isRequired,
  customerClearCustomerInfo: PropTypes.func.isRequired,
  isSuccessRemoving: PropTypes.bool,
  customerSetPaidPeriod: PropTypes.func.isRequired,
  customerSetTrialPeriod: PropTypes.func.isRequired,
  customerSetRewardsFee: PropTypes.func.isRequired,
  customerSetBudget: PropTypes.func.isRequired,
  customerSetTimezone: PropTypes.func.isRequired,
  customerSetCustomerFlags: PropTypes.func.isRequired
}

CustomerEditor.defaultProps = {
  id: null,
  customerInfo: null,
  filters: null,
  timezones: null,
  countries: null,
  isLoadingTimezones: false,
  isLoadingCountries: false,
  isSuccessRemoving: false
}

export default withRouter(CustomerEditor)
