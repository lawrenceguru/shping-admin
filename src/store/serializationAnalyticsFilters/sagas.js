import { takeEvery, call, all, put, select } from 'redux-saga/effects'
import * as actions from './actions'
import * as analyticSagas from '../serializationAnalytics/sagas'
import { tabSelector } from './selectors'

export function* updateData() {
  const tab = yield select(tabSelector)
  switch (tab) {
    case 'overview':
      yield all([
        call(analyticSagas.postProductsStatistic),
        call(analyticSagas.postCreatedProductsTotal),
        call(analyticSagas.postIntoCirculationProductsTotal),
        call(analyticSagas.postShippedProductsTotal)
      ])
      break
    default:
      break
  }
}

export function* changeFilter() {
  try {
    yield put(actions.serializationFilterAnalyticsLoadNewFilterInfo({ isLoadingNewFiltersInfo: true }))
    yield call(updateData)
    yield put(actions.serializationFilterAnalyticsLoadNewFilterInfo({ isLoadingNewFiltersInfo: false }))
  } catch (e) {
    yield put(actions.serializationFilterAnalyticsLoadNewFilterInfo({ isLoadingNewFiltersInfo: false }))
  }
}

export default function*() {
  yield takeEvery(actions.GET_SELECT_RANGE, changeFilter)
  yield takeEvery(actions.GET_RANGE_DATES, changeFilter)
  yield takeEvery(actions.GET_SELECT_CUSTOMER, changeFilter)
}
