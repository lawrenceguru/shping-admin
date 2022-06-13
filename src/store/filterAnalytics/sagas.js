import { takeEvery, call, all, put, select } from 'redux-saga/effects'
import * as actions from './actions'
import * as geographySagas from '../geography/sagas'
import { tabSelector } from './selectors'

export function* updateData() {
  const tab = yield select(tabSelector)
  switch (tab) {
    case 'geography':
      yield all([
        yield call(geographySagas.postCoordinates),
        yield call(geographySagas.postCountries),
        yield call(geographySagas.postStates)
      ])
      break
    default:
      break
  }
}

export function* changeFilter() {
  try {
    yield put(actions.filterAnalyticsLoadNewFilterInfo({ isLoadingNewFiltersInfo: true }))
    yield call(updateData)
    yield put(actions.filterAnalyticsLoadNewFilterInfo({ isLoadingNewFiltersInfo: false }))
  } catch (e) {
    yield put(actions.filterAnalyticsLoadNewFilterInfo({ isLoadingNewFiltersInfo: false }))
  }
}

export default function*() {
  yield takeEvery(actions.GET_SELECT_RANGE, changeFilter)
  yield takeEvery(actions.GET_SELECT_COUNTRY, changeFilter)
  yield takeEvery(actions.GET_FIRST_DATE, changeFilter)
  yield takeEvery(actions.GET_SECOND_DATE, changeFilter)
  yield takeEvery(actions.GET_SELECT_CITY, changeFilter)
  yield takeEvery(actions.GET_SELECT_BRAND, changeFilter)
  yield takeEvery(actions.GET_RANGE_DATES, changeFilter)
  yield takeEvery(actions.GET_SELECT_GTIN, changeFilter)
}
