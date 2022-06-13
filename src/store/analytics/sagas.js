import axios from 'axios'
import moment from 'moment'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { ANALYTIC_API, SETTINGS_API } from 'constants/url'
import { fromIdentity } from 'store/selectors'
import * as actions from './actions'
import analyticsSelectors from './selectors'
import { getCurrentPercent } from '../../utils/calculations'
import { chartDateMapping } from '../../utils/campaign'

export function* postCountries() {
  try {
    const response = yield call(axios.get, `${SETTINGS_API}/countries`)
    const { countries } = response.data
    yield put(actions.analyticsGetCountriesSuccess({ countries }))
  } catch (error) {
    yield put(actions.analyticsGetCountriesFail(error))
  }
}

function getSelectorsData(selectors) {
  const data = { from_date: selectors.selectFirstDate, to_date: selectors.selectSecondDate }

  if (selectors.selectCountry !== 'any') {
    data.country = selectors.selectCountry
  }

  if (selectors.selectBrand !== 'any') {
    data.brand = selectors.selectBrand
  }

  return data
}

function getPrevData(currRangeItem, currList) {
  if (currList.length < 2) {
    return null
  }
  const lastData = currList[currList.length - 1]
  const prevData = currList[currList.length - 2]
  // eslint-disable-next-line no-unused-expressions
  return lastData[currRangeItem] - prevData[currRangeItem] === 1 ? prevData.num_sales : null
}

export function* postMonthlySalesBrand() {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const selectors = yield select(analyticsSelectors)
    const filters = {
      get_days: 'day',
      get_weeks: 'week',
      get_months: 'month'
    }
    const data = {
      from_date: selectors.selectFirstDate,
      to_date: selectors.selectSecondDate,
      group_by: filters[selectors.selectRange],
      use_events: true
    }

    if (selectors.selectCountry !== 'any') {
      data.country = selectors.selectCountry
    }

    if (selectors.selectBrand !== 'any') {
      data.brand = selectors.selectBrand
    }

    const response = yield call(() =>
      axios.post(`${ANALYTIC_API}/sales/get_brands`, data, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )
    const currRange = selectors.selectRange.split('_')[1]
    const infoSales = response.data.brands
    infoSales.forEach(el => {
      const currSales = el.num_sales
      const prevSales = el[currRange].length > 1 ? getPrevData(filters[selectors.selectRange], el[currRange]) : null
      // eslint-disable-next-line no-param-reassign
      el.percent = getCurrentPercent(currSales, prevSales)
    })
    yield put(actions.analyticsGetBrandSalesSuccess({ infoSales }))
  } catch (error) {
    yield put(actions.analyticsGetBrandSalesFail(error))
  }
}

export function* postCampaigns() {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const selectors = yield select(analyticsSelectors)
    const data = getSelectorsData(selectors)
    data.use_events = true

    if (selectors.selectCountry !== 'any') {
      data.country = selectors.selectCountry
    }

    if (selectors.selectBrand !== 'any') {
      data.brand = selectors.selectBrand
    }

    const response = yield call(() =>
      axios.post(`${ANALYTIC_API}/spendings/get_actions`, data, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )
    const campaigns = response.data.actions
    yield put(actions.analyticsGetCampaignsSuccess({ campaigns }))
  } catch (error) {
    yield put(actions.analyticsGetCampaignsFail(error))
  }
}

export function* getCampaignChart({ payload: { by, filters, fromDate, toDate, indicatorsFilter } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const fromDateDefault = moment()
      .clone()
      .subtract(chartDateMapping[by], by)
      .format('YYYY-MM-DD')

    const toDateDefault = moment()
      .clone()
      .format('YYYY-MM-DD')

    const dataRequest = {
      from_date: fromDate || fromDateDefault,
      to_date: toDate || toDateDefault,
      ...(filters && { ...filters })
    }

    const { data } = yield call(
      axios.post,
      `${ANALYTIC_API}/spendings/get_${by}`,
      { ...dataRequest },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    delete dataRequest.events

    if (indicatorsFilter) {
      dataRequest.events = indicatorsFilter
    }

    yield put(actions.analyticsGetCampaignsChartSuccess({ data, by }))
  } catch (error) {
    yield put(actions.analyticsGetCampaignsFail(error))
  }
}

export function* getRewardsIndicators({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(axios.post, `${ANALYTIC_API}/rewards/get_indicators`, payload, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.analyticsGetRewardsIndicatorsSuccess(data))
  } catch (error) {
    yield put(actions.analyticsGetRewardsIndicatorsFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.GET_COUNTRIES, postCountries)
  yield takeEvery(actions.GET_CAMPAIGNS, postCampaigns)
  yield takeEvery(actions.GET_BRAND_SALES, postMonthlySalesBrand)
  yield takeEvery(actions.GET_CAMPAIGNS_CHART, getCampaignChart)
  yield takeEvery(actions.GET_REWARDS_INDICATORS, getRewardsIndicators)
}
