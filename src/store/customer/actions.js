export const GET_ALL = 'customer/GET_ALL'
export const GET_ALL_SUCCESS = 'customer/GET_ALL_SUCCESS'
export const GET_ALL_FAIL = 'customer/GET_ALL_FAIL'

export const SET_PAID_PERIOD = 'customer/SET_PAID_PERIOD'
export const SET_PAID_PERIOD_SUCCESS = 'customer/SET_PAID_PERIOD_SUCCESS'
export const SET_PAID_PERIOD_FAIL = 'customer/SET_PAID_PERIOD_FAIL'

export const SET_TRIAL_PERIOD = 'customer/SET_TRIAL_PERIOD'
export const SET_TRIAL_PERIOD_SUCCESS = 'customer/SET_TRIAL_PERIOD_SUCCESS'
export const SET_TRIAL_PERIOD_FAIL = 'customer/SET_TRIAL_PERIOD_FAIL'

export const DELETE_DATA = 'customer/DELETE_DATA'
export const DELETE_DATA_SUCCESS = 'customer/DELETE_DATA_SUCCESS'
export const DELETE_DATA_FAIL = 'customer/DELETE_DATA_FAIL'

export const REMOVE_PARTICIPANT = 'customer/REMOVE_PARTICIPANT'
export const REMOVE_PARTICIPANT_SUCCESS = 'customer/REMOVE_PARTICIPANT_SUCCESS'
export const REMOVE_PARTICIPANT_FAIL = 'customer/REMOVE_PARTICIPANT_FAIL'

export const GET_CUSTOMER_INFO = 'customer/GET_CUSTOMER_INFO'
export const GET_CUSTOMER_INFO_SUCCESS = 'customer/GET_CUSTOMER_INFO_SUCCESS'
export const GET_CUSTOMER_INFO_FAIL = 'customer/GET_CUSTOMER_INFO_FAIL'

export const SET_TIMEZONE = 'customer/SET_TIMEZONE'
export const SET_TIMEZONE_SUCCESS = 'customer/SET_TIMEZONE_SUCCESS'
export const SET_TIMEZONE_FAIL = 'customer/SET_TIMEZONE_FAIL'

export const SET_REWARDS_FEE = 'customer/SET_REWARDS_FEE'
export const SET_REWARDS_FEE_SUCCESS = 'customer/SET_REWARDS_FEE_SUCCESS'
export const SET_REWARDS_FEE_FAIL = 'customer/SET_REWARDS_FEE_FAIL'

export const SET_BUDGET = 'customer/SET_BUDGET'
export const SET_BUDGET_SUCCESS = 'customer/SET_BUDGET_SUCCESS'
export const SET_BUDGET_FAIL = 'customer/SET_BUDGET_FAIL'

export const GET_CONSTRAINTS = 'customer/GET_CONSTRAINTS'
export const GET_CONSTRAINTS_SUCCESS = 'customer/GET_CONSTRAINTS_SUCCESS'
export const GET_CONSTRAINTS_FAIL = 'customer/GET_CONSTRAINTS_FAIL'

export const SET_CONSTRAINTS = 'customer/SET_CONSTRAINTS'
export const SET_CONSTRAINTS_SUCCESS = 'customer/SET_CONSTRAINTS_SUCCESS'
export const SET_CONSTRAINTS_FAIL = 'customer/SET_CONSTRAINTS_FAIL'

export const ADD_CONSTRAINTS = 'customer/ADD_CONSTRAINTS'
export const ADD_CONSTRAINTS_SUCCESS = 'customer/ADD_CONSTRAINTS_SUCCESS'
export const ADD_CONSTRAINTS_FAIL = 'customer/ADD_CONSTRAINTS_FAIL'

export const DELETE_CONSTRAINTS = 'customer/DELETE_CONSTRAINTS'
export const DELETE_CONSTRAINTS_SUCCESS = 'customer/DELETE_CONSTRAINTS_SUCCESS'
export const DELETE_CONSTRAINTS_FAIL = 'customer/DELETE_CONSTRAINTS_FAIL'

export const GET_BRANDS = 'customer/GET_BRANDS'
export const GET_BRANDS_SUCCESS = 'customer/GET_BRANDS_SUCCESS'
export const GET_BRANDS_FAIL = 'customer/GET_BRANDS_FAIL'

export const ADD_BRAND = 'customer/ADD_BRAND'
export const ADD_BRAND_SUCCESS = 'customer/ADD_BRAND_SUCCESS'
export const ADD_BRAND_FAIL = 'customer/ADD_BRAND_FAIL'

export const EDIT_BRAND = 'customer/EDIT_BRAND'
export const EDIT_BRAND_SUCCESS = 'customer/EDIT_BRAND_SUCCESS'
export const EDIT_BRAND_FAIL = 'customer/EDIT_BRAND_FAIL'

export const DELETE_BRAND = 'customer/DELETE_BRAND'
export const DELETE_BRAND_SUCCESS = 'customer/DELETE_BRAND_SUCCESS'
export const DELETE_BRAND_FAIL = 'customer/DELETE_BRAND_FAIL'

export const GET_PORTFOLIO = 'customer/GET_PORTFOLIO'
export const GET_PORTFOLIO_SUCCESS = 'customer/GET_PORTFOLIO_SUCCESS'
export const GET_PORTFOLIO_FAIL = 'customer/GET_PORTFOLIO_FAIL'
export const CLEAR_ACTIVE_PORTFOLIO = 'customer/CLEAR_ACTIVE_PORTFOLIO'

export const GET_PORTFOLIOS = 'customer/GET_PORTFOLIOS'
export const GET_PORTFOLIOS_SUCCESS = 'customer/GET_PORTFOLIOS_SUCCESS'
export const GET_PORTFOLIOS_FAIL = 'customer/GET_PORTFOLIOS_FAIL'

export const ADD_PORTFOLIO = 'customer/ADD_PORTFOLIO'
export const ADD_PORTFOLIO_SUCCESS = 'customer/ADD_PORTFOLIO_SUCCESS'
export const ADD_PORTFOLIO_FAIL = 'customer/ADD_PORTFOLIO_FAIL'

export const EDIT_PORTFOLIO = 'customer/EDIT_PORTFOLIO'
export const EDIT_PORTFOLIO_SUCCESS = 'customer/EDIT_PORTFOLIO_SUCCESS'
export const EDIT_PORTFOLIO_FAIL = 'customer/EDIT_PORTFOLIO_FAIL'

export const DELETE_PORTFOLIO = 'customer/DELETE_PORTFOLIO'
export const DELETE_PORTFOLIO_SUCCESS = 'customer/DELETE_PORTFOLIO_SUCCESS'
export const DELETE_PORTFOLIO_FAIL = 'customer/DELETE_PORTFOLIO_FAIL'

export const SET_CUSTOMER_FLAGS = 'customer/SET_CUSTOMER_FLAGS'
export const SET_CUSTOMER_FLAGS_SUCCESS = 'customer/SET_CUSTOMER_FLAGS_SUCCESS'
export const SET_CUSTOMER_FLAGS_FAIL = 'customer/SET_CUSTOMER_FLAGS_FAIL'

export const CLEAR_CUSTOMER_INFO = 'customer/CLEAR_CUSTOMER_INFO'

export const customerRemoveParticipant = payload => ({
  type: REMOVE_PARTICIPANT,
  payload
})

export const customerRemoveParticipantSuccess = payload => ({
  type: REMOVE_PARTICIPANT_SUCCESS,
  payload
})

export const customerRemoveParticipantFail = payload => ({
  type: REMOVE_PARTICIPANT_FAIL,
  payload
})

export const customerGetAll = payload => ({
  type: GET_ALL,
  payload
})

export const customerGetAllSuccess = payload => ({
  type: GET_ALL_SUCCESS,
  payload
})

export const customerGetAllFail = payload => ({
  type: GET_ALL_FAIL,
  payload
})

export const customerSetPaidPeriod = payload => ({
  type: SET_PAID_PERIOD,
  payload
})

export const customerSetPaidPeriodSuccess = payload => ({
  type: SET_PAID_PERIOD_SUCCESS,
  payload
})

export const customerSetPaidPeriodFail = payload => ({
  type: SET_PAID_PERIOD_FAIL,
  payload
})

export const customerSetTrialPeriod = payload => ({
  type: SET_TRIAL_PERIOD,
  payload
})

export const customerSetTrialPeriodSuccess = payload => ({
  type: SET_TRIAL_PERIOD_SUCCESS,
  payload
})

export const customerSetTrialPeriodFail = payload => ({
  type: SET_TRIAL_PERIOD_FAIL,
  payload
})

export const customerDeleteData = payload => ({
  type: DELETE_DATA,
  payload
})

export const customerDeleteDataSuccess = payload => ({
  type: DELETE_DATA_SUCCESS,
  payload
})

export const customerDeleteDataFail = payload => ({
  type: DELETE_DATA_FAIL,
  payload
})

export const customerClearCustomerInfo = payload => ({
  type: CLEAR_CUSTOMER_INFO,
  payload
})

export const customerGetCustomerInfo = payload => ({
  type: GET_CUSTOMER_INFO,
  payload
})

export const customerGetCustomerInfoSuccess = payload => ({
  type: GET_CUSTOMER_INFO_SUCCESS,
  payload
})

export const customerGetCustomerInfoFail = payload => ({
  type: GET_CUSTOMER_INFO_FAIL,
  payload
})

export const customerSetTimezone = payload => ({
  type: SET_TIMEZONE,
  payload
})

export const customerSetTimezoneSuccess = payload => ({
  type: SET_TIMEZONE_SUCCESS,
  payload
})

export const customerSetTimezoneFail = payload => ({
  type: SET_TIMEZONE_FAIL,
  payload
})

export const customerSetRewardsFee = payload => ({
  type: SET_REWARDS_FEE,
  payload
})

export const customerSetRewardsFeeSuccess = payload => ({
  type: SET_REWARDS_FEE_SUCCESS,
  payload
})

export const customerSetRewardsFeeFail = payload => ({
  type: SET_REWARDS_FEE_FAIL,
  payload
})

export const customerSetBudget = payload => ({
  type: SET_BUDGET,
  payload
})

export const customerSetBudgetSuccess = payload => ({
  type: SET_BUDGET_SUCCESS,
  payload
})

export const customerSetBudgetFail = payload => ({
  type: SET_BUDGET_FAIL,
  payload
})

export const customerSetConstraints = payload => ({
  type: SET_CONSTRAINTS,
  payload
})

export const customerSetConstraintsSuccess = payload => ({
  type: SET_CONSTRAINTS_SUCCESS,
  payload
})

export const customerSetConstraintsFail = payload => ({
  type: SET_CONSTRAINTS_FAIL,
  payload
})

export const customerAddConstraints = payload => ({
  type: ADD_CONSTRAINTS,
  payload
})

export const customerAddConstraintsSuccess = payload => ({
  type: ADD_CONSTRAINTS_SUCCESS,
  payload
})

export const customerAddConstraintsFail = payload => ({
  type: ADD_CONSTRAINTS_FAIL,
  payload
})

export const customerGetConstraints = payload => ({
  type: GET_CONSTRAINTS,
  payload
})

export const customerGetConstraintsSuccess = payload => ({
  type: GET_CONSTRAINTS_SUCCESS,
  payload
})

export const customerGetConstraintsFail = payload => ({
  type: GET_CONSTRAINTS_FAIL,
  payload
})

export const customerDeleteConstraints = payload => ({
  type: DELETE_CONSTRAINTS,
  payload
})

export const customerDeleteConstraintsSuccess = payload => ({
  type: DELETE_CONSTRAINTS_SUCCESS,
  payload
})

export const customerDeleteConstraintsFail = payload => ({
  type: DELETE_CONSTRAINTS_FAIL,
  payload
})

export const customerGetBrands = payload => ({
  type: GET_BRANDS,
  payload
})

export const customerGetBrandsSuccess = payload => ({
  type: GET_BRANDS_SUCCESS,
  payload
})

export const customerGetBrandsFail = payload => ({
  type: GET_BRANDS_FAIL,
  payload
})

export const customerAddBrand = payload => ({
  type: ADD_BRAND,
  payload
})

export const customerAddBrandSuccess = payload => ({
  type: ADD_BRAND_SUCCESS,
  payload
})

export const customerAddBrandFail = payload => ({
  type: ADD_BRAND_FAIL,
  payload
})

export const customerEditBrand = payload => ({
  type: EDIT_BRAND,
  payload
})

export const customerEditBrandSuccess = payload => ({
  type: EDIT_BRAND_SUCCESS,
  payload
})

export const customerEditBrandFail = payload => ({
  type: EDIT_BRAND_FAIL,
  payload
})

export const customerDeleteBrand = payload => ({
  type: DELETE_BRAND,
  payload
})

export const customerDeleteBrandSuccess = payload => ({
  type: DELETE_BRAND_SUCCESS,
  payload
})

export const customerDeleteBrandFail = payload => ({
  type: DELETE_BRAND_FAIL,
  payload
})

export const customerGetPortfolio = payload => ({
  type: GET_PORTFOLIO,
  payload
})

export const customerGetPortfolioSuccess = payload => ({
  type: GET_PORTFOLIO_SUCCESS,
  payload
})

export const customerGetPortfolioFail = payload => ({
  type: GET_PORTFOLIO_FAIL,
  payload
})

export const customerClearActivePortfolio = () => ({
  type: CLEAR_ACTIVE_PORTFOLIO
})

export const customerGetPortfolios = payload => ({
  type: GET_PORTFOLIOS,
  payload
})

export const customerGetPortfoliosSuccess = payload => ({
  type: GET_PORTFOLIOS_SUCCESS,
  payload
})

export const customerGetPortfoliosFail = payload => ({
  type: GET_PORTFOLIOS_FAIL,
  payload
})

export const customerAddPortfolio = payload => ({
  type: ADD_PORTFOLIO,
  payload
})

export const customerAddPortfolioSuccess = payload => ({
  type: ADD_PORTFOLIO_SUCCESS,
  payload
})

export const customerAddPortfolioFail = payload => ({
  type: ADD_PORTFOLIO_FAIL,
  payload
})

export const customerEditPortfolio = payload => ({
  type: EDIT_PORTFOLIO,
  payload
})

export const customerEditPortfolioSuccess = payload => ({
  type: EDIT_PORTFOLIO_SUCCESS,
  payload
})

export const customerEditPortfolioFail = payload => ({
  type: EDIT_PORTFOLIO_FAIL,
  payload
})

export const customerDeletePortfolio = payload => ({
  type: DELETE_PORTFOLIO,
  payload
})

export const customerDeletePortfolioSuccess = payload => ({
  type: DELETE_PORTFOLIO_SUCCESS,
  payload
})

export const customerDeletePortfolioFail = payload => ({
  type: DELETE_PORTFOLIO_FAIL,
  payload
})

export const customerSetCustomerFlags = payload => ({
  type: SET_CUSTOMER_FLAGS,
  payload
})

export const customerSetCustomerFlagsSuccess = payload => ({
  type: SET_CUSTOMER_FLAGS_SUCCESS,
  payload
})

export const customerSetCustomerFlagsFail = payload => ({
  type: SET_CUSTOMER_FLAGS_FAIL,
  payload
})
