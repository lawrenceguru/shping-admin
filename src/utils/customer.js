import moment from 'moment'
import intl from 'react-intl-universal'
import { convertFromUint256 } from './helpers/mathOperations'

export const proccessServerDate = data => {
  let result = []

  if (data && data.length) {
    result = data.map(info => {
      const paidTo = info.billing_paid_to
      const isCoins = info.fee && info.fee.type === 'coins'
      const shpingCoin = info.fee && intl.get('common.coins', { value: convertFromUint256(info.fee.value) })
      const fee = info.fee && (isCoins ? shpingCoin : `${info.fee.value}%`)
      const issue =
        paidTo &&
        moment
          .utc(paidTo)
          .local()
          .isBefore(moment(new Date()))

      return {
        ...info,
        rewards_fee: fee,
        payment_issue: issue,
        paid_until:
          info.billing_paid_to &&
          info.billing_paid_to
            .split('-')
            .reverse()
            .join('/'),
        trial_period:
          info.billing_trial_to &&
          moment
            .utc(info.billing_trial_to)
            .local()
            .format('L'),
        plan: info.billing_plan && intl.get(`customer.plans.planNames.${info.billing_plan}`)
      }
    })
  }

  return result
}

export const proccessCustomerInfo = (data, countries, timezones) => {
  const result = {}

  if (data) {
    const {
      name,
      country,
      city,
      billing,
      balance,
      budget,
      timezone_code: timezoneCode,
      paying_customer: payingCustomer,
      partner_brand: partnerBrand
    } = data
    const { country: billingCountry, paid_from: paidFrom, paid_to: paidTo, plan, user_email: userEmail } = billing || {}
    const { address, coins } = balance || paidFrom || {}
    result.paying_customer = payingCustomer
    result.partner_brand = partnerBrand
    result.name = name
    result.city = city
    result.budget = budget
    result.timezone_code = timezoneCode
    result.plan = plan
    result.user_email = userEmail
    result.address = address
    result.coins = coins
    result.selectedCountry = (countries && countries.length && countries.find(c => c.iso === country)) || null
    result.selectedTimezone = (timezones && countries.length && timezones.find(t => t.id === timezoneCode)) || null
    result.selectedBillingCountry = countries && countries.find(c => c.iso === billingCountry)
    result.trialPeriod =
      billing &&
      billing.trial &&
      billing.trial.status &&
      moment
        .utc(billing.trial.ts)
        .local()
        .format('L')
    const fee = balance && balance.fee
    const isCoins = fee && fee.type === 'coins'
    result.rewardsFee =
      fee && (isCoins ? intl.get('common.coins', { value: convertFromUint256(fee.value) }) : `${fee.value}%`)
    result.paidFrom =
      paidFrom &&
      paidFrom
        .split('-')
        .reverse()
        .join('/')
    result.paidTo =
      paidTo &&
      paidTo
        .split('-')
        .reverse()
        .join('/')
  }

  return result
}

export const proccessFeeData = fee => {
  const result = {}

  if (fee) {
    Object.keys(fee).forEach(key => {
      if (key !== 'ts') {
        result[key] = key === 'value' ? convertFromUint256(fee[key]) : fee[key]
      }
    })
  }

  return result
}
