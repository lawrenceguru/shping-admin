export const GET_SUMMARY_REPORTS = 'campaings/GET_SUMMARY_REPORTS'
export const GET_SUMMARY_REPORTS_SUCCESS = 'campaings/GET_SUMMARY_REPORTS_SUCCESS'
export const GET_SUMMARY_REPORTS_FAIL = 'campaings/GET_SUMMARY_REPORTS_FAIL'

export const DELETE_SUMMARY_REPORT = 'campaings/DELETE_SUMMARY_REPORT'
export const DELETE_SUMMARY_REPORT_SUCCESS = 'campaings/DELETE_SUMMARY_REPORT_SUCCESS'
export const DELETE_SUMMARY_REPORT_FAIL = 'campaings/DELETE_SUMMARY_REPORT_FAIL'

export const GET_DETAILS_FOR_SUMMARY_REPORT = 'campaigns/GET_DETAILS_FOR_SUMMARY_REPORT'
export const GET_DETAILS_FOR_SUMMARY_REPORT_SUCCESS = 'campaigns/GET_DETAILS_FOR_SUMMARY_REPORT_SUCCESS'
export const GET_DETAILS_FOR_SUMMARY_REPORT_FAIL = 'campaigns/GET_DETAILS_FOR_SUMMARY_REPORT_FAIL'

export const POST_SUMMARY_REPORT = 'campaigns/POST_SUMMARY_REPORT'
export const POST_SUMMARY_REPORT_SUCCESS = 'campaigns/POST_SUMMARY_REPORT_SUCCESS'
export const POST_SUMMARY_REPORT_FAIL = 'campaigns/POST_SUMMARY_REPORT_FAIL'

export const campaingsGetSummaryReports = payload => ({
  type: GET_SUMMARY_REPORTS,
  payload
})

export const campaingsGetSummaryReportsSuccess = payload => ({
  type: GET_SUMMARY_REPORTS_SUCCESS,
  payload
})

export const campaingsGetSummaryReportsFail = payload => ({
  type: GET_SUMMARY_REPORTS_FAIL,
  payload
})

export const campaignsDeleteSummaryReport = payload => ({
  type: DELETE_SUMMARY_REPORT,
  payload
})

export const campaignsDeleteSummaryReportSuccess = payload => ({
  type: DELETE_SUMMARY_REPORT_SUCCESS,
  payload
})

export const campaignsDeleteSummaryReportFail = payload => ({
  type: DELETE_SUMMARY_REPORT_FAIL,
  payload
})

export const campaignsGetDetailsForSummaryReports = payload => ({
  type: GET_DETAILS_FOR_SUMMARY_REPORT,
  payload
})

export const campaignsGetDetailsForSummaryReportsSuccess = payload => ({
  type: GET_DETAILS_FOR_SUMMARY_REPORT_SUCCESS,
  payload
})

export const campaignsGetDetailsForSummaryReportsFail = payload => ({
  type: GET_DETAILS_FOR_SUMMARY_REPORT_FAIL,
  payload
})

export const campaignsPostSummaryReport = payload => ({
  type: POST_SUMMARY_REPORT,
  payload
})

export const campaignsPostSummaryReportSuccess = payload => ({
  type: POST_SUMMARY_REPORT_SUCCESS,
  payload
})

export const campaignsPostSummaryReportFail = payload => ({
  type: POST_SUMMARY_REPORT_FAIL,
  payload
})
