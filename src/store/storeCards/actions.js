export const GET_ALL_ENTRIES = 'storeCards/GET_ALL_ENTRIES'
export const GET_ALL_ENTRIES_SUCCESS = 'storeCards/GET_ALL_ENTRIES_SUCCESS'
export const GET_ALL_ENTRIES_FAIL = 'storeCards/GET_ALL_ENTRIES_FAIL'

export const ADD_COUNTRY = 'storeCards/ADD_COUNTRY'
export const ADD_COUNTRY_SUCCESS = 'storeCards/ADD_COUNTRY_SUCCESS'
export const ADD_COUNTRY_FAIL = 'storeCards/ADD_COUNTRY_FAIL'

export const DELETE_COUNTRY = 'storeCards/DELETE_COUNTRY'
export const DELETE_COUNTRY_SUCCESS = 'storeCards/DELETE_COUNTRY_SUCCESS'
export const DELETE_COUNTRY_FAIL = 'storeCards/DELETE_COUNTRY_FAIL'

export const GET_COUNTRY_CARDS = 'storeCards/GET_COUNTRY_CARDS'
export const GET_COUNTRY_CARDS_SUCCESS = 'storeCards/GET_COUNTRY_CARDS_SUCCESS'
export const GET_COUNTRY_CARDS_FAIL = 'storeCards/GET_COUNTRY_CARDS_FAIL'

export const DELETE_COUNTRY_CARDS = 'storeCards/DELETE_COUNTRY_CARDS'
export const DELETE_COUNTRY_CARDS_SUCCESS = 'storeCards/DELETE_COUNTRY_CARDS_SUCCESS'
export const DELETE_COUNTRY_CARDS_FAIL = 'storeCards/DELETE_COUNTRY_CARDS_FAIL'

export const FORM_COUNTRY_CARDS = 'storeCards/FORM_COUNTRY_CARDS'
export const FORM_COUNTRY_CARDS_SUCCESS = 'storeCards/FORM_COUNTRY_CARDS_SUCCESS'
export const FORM_COUNTRY_CARDS_FAIL = 'storeCards/FORM_COUNTRY_CARDS_FAIL'

export const GET_CARDS_REPORT = 'storeCards/GET_CARDS_REPORT'
export const GET_CARDS_REPORT_SUCCESS = 'storeCards/GET_CARDS_REPORT_SUCCESS'
export const GET_CARDS_REPORT_FAIL = 'storeCards/GET_CARDS_REPORT_FAIL'

export const GET_CARD_REPORT_DETAILS = 'storeCards/GET_CARD_REPORT_DETAILS'
export const GET_CARD_REPORT_DETAILS_SUCCESS = 'storeCards/GET_CARD_REPORT_DETAILS_SUCCESS'
export const GET_CARD_REPORT_DETAILS_FAIL = 'storeCards/GET_CARD_REPORT_DETAILS_FAIL'

export const GET_RECEIPTS_REPORTS = 'storeCards/GET_RECEIPTS_REPORTS'
export const GET_RECEIPTS_REPORTS_SUCCESS = 'storeCards/GET_RECEIPTS_REPORTS_SUCCESS'
export const GET_RECEIPTS_REPORTS_FAIL = 'storeCards/GET_RECEIPTS_REPORTS_FAIL'

export const GET_RECEIPT_REPORT_DETAILS = 'storeCards/GET_RECEIPT_REPORT_DETAILS'
export const GET_RECEIPT_REPORT_DETAILS_SUCCESS = 'storeCards/GET_RECEIPT_REPORT_DETAILS_SUCCESS'
export const GET_RECEIPT_REPORT_DETAILS_FAIL = 'storeCards/GET_RECEIPT_REPORT_DETAILS_FAIL'

export const SET_RECEIPT_LOCATION = 'storeCards/SET_RECEIPT_LOCATION'
export const SET_RECEIPT_LOCATION_SUCCESS = 'storeCards/SET_RECEIPT_LOCATION_SUCCESS'
export const SET_RECEIPT_LOCATION_FAIL = 'storeCards/SET_RECEIPT_LOCATION_FAIL'

export const storeCardsGetAllEntries = payload => ({
  type: GET_ALL_ENTRIES,
  payload
})

export const storeCardsGetAllEntriesSuccess = payload => ({
  type: GET_ALL_ENTRIES_SUCCESS,
  payload
})

export const storeCardsGetAllEntriesFail = payload => ({
  type: GET_ALL_ENTRIES_FAIL,
  payload
})

export const storeCardsAddCountry = payload => ({
  type: ADD_COUNTRY,
  payload
})

export const storeCardsAddCountrySuccess = payload => ({
  type: ADD_COUNTRY_SUCCESS,
  payload
})

export const storeCardsAddCountryFail = payload => ({
  type: ADD_COUNTRY_FAIL,
  payload
})

export const storeCardsDeleteCountry = payload => ({
  type: DELETE_COUNTRY,
  payload
})

export const storeCardsDeleteCountrySuccess = payload => ({
  type: DELETE_COUNTRY_SUCCESS,
  payload
})

export const storeCardsDeleteCountryFail = payload => ({
  type: DELETE_COUNTRY_FAIL,
  payload
})

export const storeCardsGetCountryCards = payload => ({
  type: GET_COUNTRY_CARDS,
  payload
})

export const storeCardsGetCountryCardsSuccess = payload => ({
  type: GET_COUNTRY_CARDS_SUCCESS,
  payload
})

export const storeCardsGetCountryCardsFail = payload => ({
  type: GET_COUNTRY_CARDS_FAIL,
  payload
})

export const storeCardsDeleteCountryCards = payload => ({
  type: DELETE_COUNTRY_CARDS,
  payload
})

export const storeCardsDeleteCountryCardsSuccess = payload => ({
  type: DELETE_COUNTRY_CARDS_SUCCESS,
  payload
})

export const storeCardsDeleteCountryCardsFail = payload => ({
  type: DELETE_COUNTRY_CARDS_FAIL,
  payload
})

export const storeCardsFormCountryCards = payload => ({
  type: FORM_COUNTRY_CARDS,
  payload
})

export const storeCardsFormCountryCardsSuccess = payload => ({
  type: FORM_COUNTRY_CARDS_SUCCESS,
  payload
})

export const storeCardsFormCountryCardsFail = payload => ({
  type: FORM_COUNTRY_CARDS_FAIL,
  payload
})

export const storeCardsGetCardsReport = payload => ({
  type: GET_CARDS_REPORT,
  payload
})

export const storeCardsGetCardsReportSuccess = payload => ({
  type: GET_CARDS_REPORT_SUCCESS,
  payload
})

export const storeCardsGetCardsReportFail = payload => ({
  type: GET_CARDS_REPORT_FAIL,
  payload
})

export const storeCardsGetCardReportDetails = payload => ({
  type: GET_CARD_REPORT_DETAILS,
  payload
})

export const storeCardsGetCardReportDetailsSuccess = payload => ({
  type: GET_CARD_REPORT_DETAILS_SUCCESS,
  payload
})

export const storeCardsGetCardReportDetailsFail = payload => ({
  type: GET_CARD_REPORT_DETAILS_FAIL,
  payload
})

export const storeCardsGetReceiptsReports = payload => ({
  type: GET_RECEIPTS_REPORTS,
  payload
})

export const storeCardsGetReceiptsReportsSuccess = payload => ({
  type: GET_RECEIPTS_REPORTS_SUCCESS,
  payload
})

export const storeCardsGetReceiptsReportsFail = payload => ({
  type: GET_RECEIPTS_REPORTS_FAIL,
  payload
})

export const storeCardsGetReceiptReportDetails = payload => ({
  type: GET_RECEIPT_REPORT_DETAILS,
  payload
})

export const storeCardsGetReceiptReportDetailsSuccess = payload => ({
  type: GET_RECEIPT_REPORT_DETAILS_SUCCESS,
  payload
})

export const storeCardsGetReceiptReportDetailsFail = payload => ({
  type: GET_RECEIPT_REPORT_DETAILS_FAIL,
  payload
})

export const storeCardsSetRecepitLocation = payload => ({
  type: SET_RECEIPT_LOCATION,
  payload
})

export const storeCardsSetRecepitLocationSuccess = payload => ({
  type: SET_RECEIPT_LOCATION_SUCCESS,
  payload
})

export const storeCardsSetRecepitLocationFail = payload => ({
  type: SET_RECEIPT_LOCATION_FAIL,
  payload
})
