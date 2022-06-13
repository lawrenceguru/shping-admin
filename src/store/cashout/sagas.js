import { call, put, select, takeEvery } from 'redux-saga/effects'
import { ETHEREUM_API, LIQUID_API } from 'constants/url'
import { fromIdentity } from 'store/selectors'
import intl from 'react-intl-universal'
import axios from 'axios'
import { toast } from 'react-toastify'
import * as actions from './actions'

export function* getSettings() {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { data } = yield call(() =>
      axios.get(`${ETHEREUM_API}/settings`, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )
    const { data: liquidData } = yield call(() =>
      axios.get(`${LIQUID_API}/settings`, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )
    const liquid = {
      enabled: liquidData.api.enabled,
      start_bot: liquidData.start_bot,
      fake_mode: liquidData.fake_mode,
      cors: liquidData.api.cors.length > 0 && liquidData.api.cors[0],
      currencyPairs: liquidData.currencyPairs,
      default_spread_diff: liquidData.defaultValues.spread_diff,
      default_ask_increase: liquidData.defaultValues.ask_increase,
      default_min_ask_sum: liquidData.defaultValues.min_ask_sum,
      default_max_ask_sum: liquidData.defaultValues.max_ask_sum,
      default_bid_decrease: liquidData.defaultValues.bid_decrease,
      default_min_bid_sum: liquidData.defaultValues.min_bid_sum,
      default_max_bid_sum: liquidData.defaultValues.max_bid_sum,
      pair1_status: liquidData.products.length > 0 && liquidData.products[0].status,
      pair1_id: liquidData.products.length > 0 && liquidData.products[0].id,
      pair1_currencyPair: liquidData.products.length > 0 && liquidData.products[0].currencyPair,
      pair1_currency: liquidData.products.length > 0 && liquidData.products[0].currency,
      pair1_spread_diff: liquidData.products.length > 0 && liquidData.products[0].spread_diff,
      pair1_ask_increase: liquidData.products.length > 0 && liquidData.products[0].ask_increase,
      pair1_min_ask_sum: liquidData.products.length > 0 && liquidData.products[0].min_ask_sum,
      pair1_max_ask_sum: liquidData.products.length > 0 && liquidData.products[0].max_ask_sum,
      pair1_bid_decrease: liquidData.products.length > 0 && liquidData.products[0].bid_decrease,
      pair1_min_bid_sum: liquidData.products.length > 0 && liquidData.products[0].min_bid_sum,
      pair1_max_bid_sum: liquidData.products.length > 0 && liquidData.products[0].max_bid_sum,
      pair2_status: liquidData.products.length > 0 && liquidData.products[1].status,
      pair2_id: liquidData.products.length > 0 && liquidData.products[1].id,
      pair2_currencyPair: liquidData.products.length > 0 && liquidData.products[1].currencyPair,
      pair2_currency: liquidData.products.length > 0 && liquidData.products[1].currency,
      pair2_spread_diff: liquidData.products.length > 0 && liquidData.products[1].spread_diff,
      pair2_ask_increase: liquidData.products.length > 0 && liquidData.products[1].ask_increase,
      pair2_min_ask_sum: liquidData.products.length > 0 && liquidData.products[1].min_ask_sum,
      pair2_max_ask_sum: liquidData.products.length > 0 && liquidData.products[1].max_ask_sum,
      pair2_bid_decrease: liquidData.products.length > 0 && liquidData.products[1].bid_decrease,
      pair2_min_bid_sum: liquidData.products.length > 0 && liquidData.products[1].min_bid_sum,
      pair2_max_bid_sum: liquidData.products.length > 0 && liquidData.products[1].max_bid_sum
    }
    const clonedData = {
      ...data,
      liquid
    }
    yield put(actions.cashoutGetSettingsSuccess(clonedData))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.cashoutGetSettingsFail(error))
  }
}

export function* setSettings({ payload }) {
  const ethereumData = {
    ...payload,
    liquid: undefined
  }
  delete ethereumData.liquid
  const liquidData = {
    currencyPairs: payload.liquid.currencyPairs,
    fake_mode: payload.liquid.fake_mode,
    start_bot: payload.liquid.start_bot,
    api: {
      enabled: payload.liquid.enabled,
      cors: [payload.liquid.cors]
    },
    defaultValues: {
      spread_diff: parseFloat(payload.liquid.default_spread_diff),
      ask_increase: parseFloat(payload.liquid.default_ask_increase),
      min_ask_sum: parseFloat(payload.liquid.default_min_ask_sum),
      max_ask_sum: parseFloat(payload.liquid.default_max_ask_sum),
      bid_decrease: parseFloat(payload.liquid.default_bid_decrease),
      min_bid_sum: parseFloat(payload.liquid.default_min_bid_sum),
      max_bid_sum: parseFloat(payload.liquid.default_max_bid_sum)
    },
    products: [
      {
        status: payload.liquid.pair1_status,
        id: payload.liquid.pair1_id,
        currencyPair: payload.liquid.pair1_currencyPair,
        currency: payload.liquid.pair1_currency,
        spread_diff: parseFloat(payload.liquid.pair1_spread_diff),
        ask_increase: parseFloat(payload.liquid.pair1_ask_increase),
        min_ask_sum: parseFloat(payload.liquid.pair1_min_ask_sum),
        max_ask_sum: parseFloat(payload.liquid.pair1_max_ask_sum),
        bid_decrease: parseFloat(payload.liquid.pair1_bid_decrease),
        min_bid_sum: parseFloat(payload.liquid.pair1_min_bid_sum),
        max_bid_sum: parseFloat(payload.liquid.pair1_max_bid_sum)
      },
      {
        status: payload.liquid.pair2_status,
        id: payload.liquid.pair2_id,
        currencyPair: payload.liquid.pair2_currencyPair,
        currency: payload.liquid.pair2_currency,
        spread_diff: parseFloat(payload.liquid.pair2_spread_diff),
        ask_increase: parseFloat(payload.liquid.pair2_ask_increase),
        min_ask_sum: parseFloat(payload.liquid.pair2_min_ask_sum),
        max_ask_sum: parseFloat(payload.liquid.pair2_max_ask_sum),
        bid_decrease: parseFloat(payload.liquid.pair2_bid_decrease),
        min_bid_sum: parseFloat(payload.liquid.pair2_min_bid_sum),
        max_bid_sum: parseFloat(payload.liquid.pair2_max_bid_sum)
      }
    ]
  }
  try {
    const ticket = yield select(fromIdentity.getTicket)
    yield call(() =>
      axios.post(`${ETHEREUM_API}/settings`, ethereumData, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )
    yield call(() =>
      axios.post(`${LIQUID_API}/settings`, liquidData, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )
    yield put(actions.cashoutGetSettingsSuccess())
    toast.success(intl.get('cashout.successUpdated'))
    yield put(actions.cashoutGetSettings())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.cashoutGetSettingsFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.GET_SETTINGS, getSettings)
  yield takeEvery(actions.SET_SETTINGS, setSettings)
}
