/* eslint-disable indent */
import axios from 'axios'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { ANALYTIC_API } from 'constants/url'
import { fromIdentity } from 'store/selectors'
import * as actions from './actions'
import analyticsSelectors from './selectors'

export function* postCoordinates() {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const selectors = yield select(analyticsSelectors)
    const data = { from_date: selectors.selectFirstDate, to_date: selectors.selectSecondDate }
    data.use_events = true

    if (selectors.selectCountry !== 'any') {
      data.country = selectors.selectCountry
    }

    if (selectors.selectBrand !== 'any') {
      data.brand = selectors.selectBrand
    }

    const response = yield call(() =>
      axios.post(`${ANALYTIC_API}/scans/get_coordinates`, data, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )
    const { coordinates } = response.data
    yield put(actions.analyticsGetCoordinatesSuccess({ coordinates }))
  } catch (error) {
    yield put(actions.analyticsGetCoordinatesFail(error))
  }
}

export function* postCountries() {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const selectors = yield select(analyticsSelectors)
    const data = { from_date: selectors.selectFirstDate, to_date: selectors.selectSecondDate }
    data.use_events = true

    if (selectors.selectCountry !== 'any') {
      data.country = selectors.selectCountry
    }

    if (selectors.selectBrand !== 'any') {
      data.brand = selectors.selectBrand
    }

    const response = yield call(() =>
      axios.post(`${ANALYTIC_API}/scans/get_countries`, data, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )
    const { countries } = response.data
    yield put(actions.analyticsGetCountriesTotalSuccess({ countries }))
  } catch (error) {
    yield put(actions.analyticsGetCountriesTotalFail(error))
  }
}

export function* postStates() {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const selectors = yield select(analyticsSelectors)
    const data = { from_date: selectors.selectFirstDate, to_date: selectors.selectSecondDate }
    data.use_events = true
    if (selectors.selectCountry !== 'any') {
      data.country = selectors.selectCountry
    }

    if (selectors.selectBrand !== 'any') {
      data.brand = selectors.selectBrand
    }

    const response = yield call(() =>
      axios.post(`${ANALYTIC_API}/scans/get_states`, data, {
        headers: { authenticateit_identity_ticket: ticket }
      })
    )
    const { states } = response.data
    yield put(actions.analyticsGetStatesSuccess({ states }))
  } catch (error) {
    yield put(actions.analyticsGetStatesFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.GET_COORDINATES, postCoordinates)
  yield takeEvery(actions.GET_COUNTRIES_TOTAL, postCountries)
  yield takeEvery(actions.GET_STATES, postStates)
}
