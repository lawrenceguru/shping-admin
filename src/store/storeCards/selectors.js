import moment from 'moment'
// eslint-disable-next-line import/prefer-default-export
export const initialState = {
  allEntriesIsLoading: false,
  isUpdatingCountries: false,
  entries: [],
  countryCards: [],
  countryCardsIsLoading: false,
  deletingCardId: null,
  isUpdatingCards: false,
  isSuccessUpdate: false,
  reports: { graph: [], rate: [], list: [], totalWithNewCards: 0, totalWithCardUsage: 0, totalReceipts: 0 },
  reportOptions: {
    countries: [],
    country: null,
    cards: [],
    card: null,
    stores: [],
    store: null,
    reportType: 'new'
  },
  stores: null,
  filters: {
    from_date: moment()
      .subtract(7, 'days')
      .format('YYYY-MM-DD'),
    to_date: moment().format('YYYY-MM-DD'),
    period: 'days',
    reportType: 'new'
  },
  filtersReceipts: {
    from_date: moment()
      .subtract(7, 'days')
      .format('YYYY-MM-DD'),
    to_date: moment().format('YYYY-MM-DD'),
    period: 'days'
  },
  isLoadingReports: false,
  isLoadingCardReportDetails: false,
  cardReportDetails: null,
  isLoadingReceiptReportDetails: false,
  receiptReportDetails: null,
  isLocationChanging: false
}
