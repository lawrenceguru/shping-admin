import {
  GET_ALL_ENTRIES,
  GET_ALL_ENTRIES_SUCCESS,
  GET_ALL_ENTRIES_FAIL,
  GET_COUNTRY_CARDS,
  GET_COUNTRY_CARDS_SUCCESS,
  GET_COUNTRY_CARDS_FAIL,
  ADD_COUNTRY,
  ADD_COUNTRY_SUCCESS,
  ADD_COUNTRY_FAIL,
  DELETE_COUNTRY,
  DELETE_COUNTRY_SUCCESS,
  DELETE_COUNTRY_FAIL,
  DELETE_COUNTRY_CARDS,
  DELETE_COUNTRY_CARDS_SUCCESS,
  DELETE_COUNTRY_CARDS_FAIL,
  FORM_COUNTRY_CARDS,
  FORM_COUNTRY_CARDS_SUCCESS,
  FORM_COUNTRY_CARDS_FAIL,
  GET_CARDS_REPORT,
  GET_CARDS_REPORT_SUCCESS,
  GET_CARDS_REPORT_FAIL,
  GET_CARD_REPORT_DETAILS,
  GET_CARD_REPORT_DETAILS_SUCCESS,
  GET_CARD_REPORT_DETAILS_FAIL,
  GET_RECEIPTS_REPORTS,
  GET_RECEIPTS_REPORTS_SUCCESS,
  GET_RECEIPTS_REPORTS_FAIL,
  GET_RECEIPT_REPORT_DETAILS,
  GET_RECEIPT_REPORT_DETAILS_SUCCESS,
  GET_RECEIPT_REPORT_DETAILS_FAIL,
  SET_RECEIPT_LOCATION,
  SET_RECEIPT_LOCATION_SUCCESS,
  SET_RECEIPT_LOCATION_FAIL
} from './actions'
import { initialState } from './selectors'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_ENTRIES:
      return {
        ...state,
        allEntriesIsLoading: true
      }
    case GET_ALL_ENTRIES_SUCCESS:
      return {
        ...state,
        allEntriesIsLoading: false,
        entries: payload
      }
    case GET_ALL_ENTRIES_FAIL:
      return {
        ...state,
        allEntriesIsLoading: false
      }
    case GET_COUNTRY_CARDS:
      return {
        ...state,
        countryCardsIsLoading: true,
        isSuccessUpdate: false
      }
    case GET_COUNTRY_CARDS_SUCCESS:
      return {
        ...state,
        countryCardsIsLoading: false,
        countryCards: payload
      }
    case GET_COUNTRY_CARDS_FAIL:
      return {
        ...state,
        countryCardsIsLoading: false
      }
    case ADD_COUNTRY:
      return {
        ...state,
        isUpdatingCountries: true
      }
    case ADD_COUNTRY_SUCCESS:
      return {
        ...state,
        isUpdatingCountries: false
      }
    case ADD_COUNTRY_FAIL:
      return {
        ...state,
        isUpdatingCountries: false
      }
    case DELETE_COUNTRY:
      return {
        ...state,
        isUpdatingCountries: true
      }
    case DELETE_COUNTRY_SUCCESS:
      return {
        ...state,
        isUpdatingCountries: false
      }
    case DELETE_COUNTRY_FAIL:
      return {
        ...state,
        isUpdatingCountries: false
      }
    case DELETE_COUNTRY_CARDS:
      return {
        ...state,
        deletingCardId: payload.cardId
      }
    case DELETE_COUNTRY_CARDS_SUCCESS:
      return {
        ...state,
        deletingCardId: null
      }
    case DELETE_COUNTRY_CARDS_FAIL:
      return {
        ...state,
        deletingCardId: null
      }
    case FORM_COUNTRY_CARDS:
      return {
        ...state,
        isUpdatingCards: true,
        isSuccessUpdate: false
      }
    case FORM_COUNTRY_CARDS_SUCCESS:
      return {
        ...state,
        isUpdatingCards: false,
        isSuccessUpdate: true
      }
    case FORM_COUNTRY_CARDS_FAIL:
      return {
        ...state,
        isUpdatingCards: false,
        isSuccessUpdate: false
      }
    case GET_CARDS_REPORT:
      return {
        ...state,
        isLoadingReports: true,
        filters: payload
      }
    case GET_CARDS_REPORT_SUCCESS:
      return {
        ...state,
        reports: payload && payload.reports,
        reportOptions: payload && payload.options,
        isLoadingReports: false
      }
    case GET_CARDS_REPORT_FAIL:
      return {
        ...state,
        isLoadingReports: false
      }

    case GET_RECEIPTS_REPORTS:
      return {
        ...state,
        isLoadingReports: true,
        filtersReceipts: payload
      }
    case GET_RECEIPTS_REPORTS_SUCCESS:
      return {
        ...state,
        reports: payload && payload.reports,
        stores: payload && payload.stores,
        isLoadingReports: false
      }
    case GET_RECEIPTS_REPORTS_FAIL:
      return {
        ...state,
        isLoadingReports: false
      }
    case GET_CARD_REPORT_DETAILS:
      return {
        ...state,
        isLoadingCardReportDetails: true
      }
    case GET_CARD_REPORT_DETAILS_SUCCESS:
      return {
        ...state,
        isLoadingCardReportDetails: false,
        cardReportDetails: payload
      }
    case GET_CARD_REPORT_DETAILS_FAIL:
      return {
        ...state,
        isLoadingCardReportDetails: false
      }
    case GET_RECEIPT_REPORT_DETAILS:
      return {
        ...state,
        isLoadingReceiptReportDetails: true
      }
    case GET_RECEIPT_REPORT_DETAILS_SUCCESS:
      return {
        ...state,
        isLoadingReceiptReportDetails: false,
        receiptReportDetails: payload
      }
    case GET_RECEIPT_REPORT_DETAILS_FAIL:
      return {
        ...state,
        isLoadingReceiptReportDetails: false
      }
    case SET_RECEIPT_LOCATION:
      return {
        ...state,
        isLocationChanging: true
      }
    case SET_RECEIPT_LOCATION_SUCCESS:
      return {
        ...state,
        isLocationChanging: false
      }
    case SET_RECEIPT_LOCATION_FAIL:
      return {
        ...state,
        isLocationChanging: false
      }
    default:
      return state
  }
}
