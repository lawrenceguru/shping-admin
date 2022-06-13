import intl from 'react-intl-universal'
import { formatDateTime } from './helpers/date'
import { updateLocationVal, convertFromUint256 } from './helpers/mathOperations'

export const getProcessedBanHistory = data => {
  const { history = [], status, reason, to: bannedTo, from: bannedFrom, rule_id: ruleId } = data

  return {
    count: history.length,
    all: history,
    status,
    isLoading: false,
    reason,
    bannedFrom,
    bannedTo,
    ruleId
  }
}

export const getProccessedScans = data => {
  let result = []

  if (data && data.length) {
    result = data.map(m => ({
      ...m,
      latitude: parseFloat(updateLocationVal(m.latitude)),
      longitude: parseFloat(updateLocationVal(m.longitude))
    }))
  }

  return result
}

export const getProccessedTransactions = data => {
  let result = []

  if (data && data.length) {
    result = data.map(({ ts, coins, ...rest }) => {
      const isDeposit =
        rest && rest.type === 'deposit' ? 'deposit' : { hash: rest.hash, address: rest.address, title: 'transfer' }
      return {
        ...rest,
        ts: formatDateTime(ts),
        coins: intl.get('common.coins', { value: convertFromUint256(coins) }),
        type: intl.get(`users.transactionHistory.${(rest && rest.type) || 'address'}`),
        extendInfo: rest && rest.type === 'cashout' ? { ...rest.account, title: 'cashout' } : isDeposit
      }
    })
  }

  return result
}
