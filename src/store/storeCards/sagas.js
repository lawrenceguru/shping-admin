import axios from 'axios'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import { STORECARDS_API, RECEIPTS_API } from 'constants/url'
import { fromIdentity } from 'store/selectors'
import moment from 'moment'
import {
  proccessServerData,
  proccessStoreData,
  proccessRepotDataInformation,
  proccessReportDetailData,
  processCountriesData,
  proccessReceiptDetails
} from '../../utils/storeCards'
import * as actions from './actions'

export function* getAllEntries() {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(axios.get, `${STORECARDS_API}/country`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    const mappedData = data ? Object.entries(data).map(entry => entry[1]) : []
    yield put(actions.storeCardsGetAllEntriesSuccess(mappedData))
  } catch (error) {
    yield put(actions.storeCardsGetAllEntriesFail(error))
  }
}

export function* addCountry({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { id } = payload

    yield call(axios.post, `${STORECARDS_API}/country/${id}`, null, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.storeCardsGetAllEntries())
    toast.success('Country successfully added.')
    yield put(actions.storeCardsAddCountrySuccess())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.storeCardsAddCountryFail(error))
  }
}

export function* deleteCountry({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { id } = payload

    yield call(axios.delete, `${STORECARDS_API}/country/${id}`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.storeCardsGetAllEntries())
    toast.success('Country successfully removed.')
    yield put(actions.storeCardsDeleteCountrySuccess())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.storeCardsDeleteCountryFail(error))
  }
}

export function* getCountryCards({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { id } = payload

    const { data } = yield call(axios.get, `${STORECARDS_API}/card/${id}`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.storeCardsGetCountryCardsSuccess(proccessServerData(data)))
  } catch (error) {
    yield put(actions.storeCardsGetCountryCardsFail(error))
  }
}

export function* formCountryCards({ payload }) {
  try {
    const { id, countryId, ...params } = payload
    const ticket = yield select(fromIdentity.getTicket)

    if (!id) {
      yield call(axios.post, `${STORECARDS_API}/card/${countryId}`, params, {
        headers: { authenticateit_identity_ticket: ticket }
      })
      toast.success('Country card successfully created.')
    } else {
      yield call(axios.post, `${STORECARDS_API}/card/${countryId}/${id}`, params, {
        headers: { authenticateit_identity_ticket: ticket }
      })
      toast.success('Country card successfully updated.')
    }

    yield put(actions.storeCardsFormCountryCardsSuccess())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.storeCardsFormCountryCardsFail(error))
  }
}

export function* deleteCountryCards({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { countryId, cardId } = payload

    yield call(axios.delete, `${STORECARDS_API}/card/${countryId}/${cardId}`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.storeCardsGetCountryCards({ id: countryId }))
    toast.success('Country card successfully deleted.')
    yield put(actions.storeCardsDeleteCountryCardsSuccess())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.storeCardsDeleteCountryCardsFail(error))
  }
}

export function* getCardsReports({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { reportType, cardId, countryId, ...params } = payload

    const { data } = yield call(
      axios.post,
      `${STORECARDS_API}/reports/${reportType}`,
      {
        ...params,
        from_date:
          params.from_date &&
          moment(params.from_date, 'YYYY-MM-DD')
            .startOf('day')
            .toISOString(),
        to_date:
          params.to_date &&
          moment(params.to_date, 'YYYY-MM-DD')
            .endOf('day')
            .toISOString(),
        country_card_id: cardId,
        country_iso: countryId
      },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    const result = yield call(axios.get, `${STORECARDS_API}/country`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    let cards = []

    if (countryId) {
      const cardsData = yield call(axios.get, `${STORECARDS_API}/card/${countryId}`, {
        headers: { authenticateit_identity_ticket: ticket }
      })

      cards = cardsData.data
        ? Object.entries(cardsData.data).map(entry => {
            return { label: entry[1].name, value: entry[1].id }
          })
        : []
    }

    const reportData = {
      ...proccessRepotDataInformation(data, payload),
      cards,
      countries: processCountriesData(result),
      country: countryId,
      card: cardId
    }

    yield put(actions.storeCardsGetCardsReportSuccess(reportData))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.storeCardsGetCardsReportFail(error))
  }
}

export function* getCardReportDetails({ payload }) {
  try {
    const { cardId, userId } = payload
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(
      axios.post,
      `${STORECARDS_API}/reports/usage-details`,
      {
        user_id: userId
      },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    const details = proccessReportDetailData(data, cardId)
    yield put(actions.storeCardsGetCardReportDetailsSuccess(details))
  } catch (error) {
    yield put(actions.storeCardsGetCardReportDetailsFail(error))
  }
}

export function* getReceiptsReports({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { countryId, storeId, ...params } = payload

    const { data } = yield call(
      axios.post,
      `${RECEIPTS_API}/reports/usage`,
      {
        ...params,
        from_date:
          params.from_date &&
          moment(params.from_date, 'YYYY-MM-DD')
            .startOf('day')
            .toISOString(),
        to_date:
          params.to_date &&
          moment(params.to_date, 'YYYY-MM-DD')
            .endOf('day')
            .toISOString(),
        country_iso: countryId,
        store_id: storeId
      },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )
    const result = yield call(axios.get, `${STORECARDS_API}/country`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    const noFilterData = yield call(
      axios.post,
      `${RECEIPTS_API}/reports/usage`,
      {
        start_date: payload.start_date,
        to_date: payload.start_date,
        country_iso: payload.countryId
      },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    const reportData = {
      ...proccessRepotDataInformation(data, payload),
      countries: processCountriesData(result),
      country: countryId,
      cards: [],
      card: null,
      stores: proccessStoreData(noFilterData.data),
      store: storeId
    }

    yield put(actions.storeCardsGetReceiptsReportsSuccess(reportData))
  } catch (error) {
    yield put(actions.storeCardsGetReceiptsReportsFail(error))
  }
}

export function* getReceiptReportDetails({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { userId, receiptId } = payload

    const { data } = yield call(
      axios.post,
      `${RECEIPTS_API}/reports/usage-details`,
      {
        user_id: userId
      },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )
    const details = proccessReceiptDetails(data, receiptId)
    const list = yield call(
      axios.get,
      // eslint-disable-next-line max-len
      `${RECEIPTS_API}/user/receipt/store_list?latitude=${details.currentReceipt.latitude}&longitude=${details.currentReceipt.longitude}`,
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    if (list) {
      details.currentReceipt.nearestStores = Object.entries(list.data).map(item => ({
        value: item[1].id,
        label: `${item[1].name}   - ${item[1].offset} km`
      }))
    } else {
      details.currentReceipt.nearestStores = {}
    }

    yield put(actions.storeCardsGetReceiptReportDetailsSuccess(details))
  } catch (error) {
    yield put(actions.storeCardsGetReceiptReportDetailsFail(error))
  }
}

export function* setReceiptLocation({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.post, `${RECEIPTS_API}/user/receipt/location`, payload, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.storeCardsSetRecepitLocationSuccess())
    yield put(actions.storeCardsGetReceiptReportDetails({ userId: payload.user_id, receiptId: payload.receipt_id }))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.storeCardsSetRecepitLocationFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.GET_ALL_ENTRIES, getAllEntries)
  yield takeEvery(actions.ADD_COUNTRY, addCountry)
  yield takeEvery(actions.DELETE_COUNTRY, deleteCountry)
  yield takeEvery(actions.GET_COUNTRY_CARDS, getCountryCards)
  yield takeEvery(actions.DELETE_COUNTRY_CARDS, deleteCountryCards)
  yield takeEvery(actions.FORM_COUNTRY_CARDS, formCountryCards)
  yield takeEvery(actions.GET_CARDS_REPORT, getCardsReports)
  yield takeEvery(actions.GET_CARD_REPORT_DETAILS, getCardReportDetails)
  yield takeEvery(actions.GET_RECEIPTS_REPORTS, getReceiptsReports)
  yield takeEvery(actions.GET_RECEIPT_REPORT_DETAILS, getReceiptReportDetails)
  yield takeEvery(actions.SET_RECEIPT_LOCATION, setReceiptLocation)
}
