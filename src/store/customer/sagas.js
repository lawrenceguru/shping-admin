import axios from 'axios'
import { toast } from 'react-toastify'
import intl from 'react-intl-universal'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { IDENTITY_API, PARTICIPANT_API } from 'constants/url'
import { fromIdentity } from 'store/selectors'
import { proccessServerDate } from '../../utils/customer'
import * as actions from './actions'
import { filtersSelector } from './selectors'

export function* getAll({ payload }) {
  try {
    const { options, ...request } = payload
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(
      axios.post,
      `${IDENTITY_API}/participants`,
      {
        ...request,
        ...options
      },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    yield put(
      actions.customerGetAllSuccess({
        data: proccessServerDate(data.data),
        count: data.count
      })
    )
  } catch (error) {
    yield put(actions.customerGetAllFail(error))
  }
}

export function* getCustomerInfo({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(axios.get, `${IDENTITY_API}/participants/participant/${payload.id}`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.customerGetCustomerInfoSuccess(data))
  } catch (error) {
    yield put(actions.customerGetCustomerInfoFail(error))
  }
}

export function* setPaidPeriod({ payload }) {
  try {
    const { id, date, isInfo } = payload
    const ticket = yield select(fromIdentity.getTicket)

    yield call(
      axios.put,
      `${IDENTITY_API}/participants/participant/${id}/payment`,
      {
        from_date: date && date[0] && date[0].format('YYYY-MM-DD'),
        to_date: date && date[1] && date[1].format('YYYY-MM-DD')
      },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    toast.success(intl.get('customer.sagas.setPaidPeriodSuccess'))
    yield put(actions.customerSetPaidPeriodSuccess())
    if (isInfo) {
      yield put(actions.customerGetCustomerInfo({ id }))
    } else {
      const filters = yield select(filtersSelector)
      yield put(actions.customerGetAll(filters))
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.customerSetPaidPeriodFail(error))
  }
}

export function* setTrialPeriod({ payload }) {
  try {
    const { id, toDate, isInfo } = payload
    const ticket = yield select(fromIdentity.getTicket)

    yield call(
      axios.put,
      `${IDENTITY_API}/participants/participant/${id}/payment/trial`,
      {
        to_date: toDate && toDate.format('YYYY-MM-DD')
      },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    toast.success(intl.get('customer.sagas.setTrialPeriodSuccess'))
    yield put(actions.customerSetTrialPeriodSuccess())
    if (isInfo) {
      yield put(actions.customerGetCustomerInfo({ id }))
    } else {
      const filters = yield select(filtersSelector)
      yield put(actions.customerGetAll(filters))
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.customerSetTrialPeriodFail(error))
  }
}

export function* deleteCustomerData({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { isInfo, id } = payload

    yield call(axios.delete, `${IDENTITY_API}/participants/participant/${id}/payment/customer`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.customerDeleteDataSuccess())
    toast.success(intl.get('customer.sagas.deleteCustomerDataSuccess'))
    if (isInfo) {
      yield put(actions.customerGetCustomerInfo({ id }))
    } else {
      const filters = yield select(filtersSelector)
      yield put(actions.customerGetAll(filters))
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.customerDeleteDataFail(error))
  }
}

function* removeParticipant({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { id, isInfo } = payload

    yield call(axios.delete, `${IDENTITY_API}/participants/participant/${id}`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    const filters = yield select(filtersSelector)
    yield put(actions.customerRemoveParticipantSuccess(isInfo))
    toast.success(intl.get('customer.sagas.removeParticipant'))
    yield put(actions.customerGetAll(filters))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.customerRemoveParticipantFail(error))
  }
}

export function* setTimezone({ payload }) {
  try {
    const { id, code } = payload
    const ticket = yield select(fromIdentity.getTicket)

    yield call(
      axios.put,
      `${IDENTITY_API}/participants/participant/${id}/timezone`,
      { code },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    yield put(actions.customerSetTimezoneSuccess())
    toast.success(intl.get('customer.sagas.putParticipantProfileSuccess'))
    yield put(actions.customerGetCustomerInfo({ id }))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.customerSetTimezoneFail())
  }
}

export function* setRewardsFee({ payload: { id, ...options } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.put, `${IDENTITY_API}/participants/participant/${id}/deposit/fee`, options, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.customerSetRewardsFeeSuccess())
    toast.success(intl.get('customer.sagas.rewardsFee'))
    yield put(actions.customerGetCustomerInfo({ id }))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.customerSetRewardsFeeFail(error))
  }
}

export function* setBudget({ payload: { id, ...options } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.put, `${IDENTITY_API}/participants/participant/${id}/options`, options, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.customerSetBudgetSuccess())
    toast.success(intl.get('customer.sagas.budget'))
    yield put(actions.customerGetCustomerInfo({ id }))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.customerSetBudgetFail(error))
  }
}

export function* getConstraints({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(axios.get, `${PARTICIPANT_API}/participants/${payload}/constraints`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.customerGetConstraintsSuccess(data))
  } catch (error) {
    yield put(actions.customerGetConstraintsFail(error))
  }
}

export function* setConstraints({ payload }) {
  try {
    const { id, ...request } = payload
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.put, `${PARTICIPANT_API}/participants/${id}/constraints`, request, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.customerSetConstraintsSuccess())
    toast.success('Constraints successfully updated')
    yield put(actions.customerGetConstraints(id))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.customerSetConstraintsFail(error))
  }
}

export function* addConstraints({ payload }) {
  try {
    const { id, ...request } = payload
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.post, `${PARTICIPANT_API}/participants/${id}/constraints/add`, request, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.customerSetConstraintsSuccess())
    toast.success('Constraints successfully added')
    yield put(actions.customerGetConstraints(id))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.customerSetConstraintsFail(error))
  }
}

export function* deleteConstraints({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { participantId, id } = payload || {}

    const param = {
      products: [id]
    }

    yield call(axios.post, `${PARTICIPANT_API}/participants/${participantId}/constraints/remove`, param, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.customerDeleteConstraintsSuccess())
    toast.success('Constraint successfully deleted')
    yield put(actions.customerGetConstraints(participantId))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.customerDeleteConstraintsFail(error))
  }
}

export function* getBrands({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(axios.get, `${PARTICIPANT_API}/brands`, {
      params: {
        owner: payload
      },
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.customerGetBrandsSuccess(data))
  } catch (error) {
    yield put(actions.customerGetBrandsFail(error))
  }
}

export function* addBrand({ payload }) {
  try {
    const { id, ...request } = payload
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.post, `${PARTICIPANT_API}/brands`, request, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.customerAddBrandSuccess())
    toast.success('Brand successfully added')
    yield put(actions.customerGetBrands(id))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.customerAddBrandFail(error))
  }
}

export function* editBrand({ payload }) {
  try {
    const { id, ...request } = payload
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.post, `${PARTICIPANT_API}/brands/update`, request, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.customerEditBrandSuccess())
    toast.success('Brand successfully updated')
    yield put(actions.customerGetBrands(id))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.customerEditBrandFail(error))
  }
}

export function* deleteBrand({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { participantId, name } = payload || {}

    const params = { name }

    yield call(axios.post, `${PARTICIPANT_API}/brands/delete`, params, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.customerDeleteBrandSuccess())
    toast.success('Brand successfully deleted')
    yield put(actions.customerGetBrands(participantId))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.customerDeleteBrandFail(error))
  }
}

export function* getPortfolio({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(axios.get, `${PARTICIPANT_API}/portfolio/${payload}`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.customerGetPortfolioSuccess(data))
  } catch (error) {
    yield put(actions.customerGetPortfolioFail(error))
  }
}

export function* getPortfolios({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(axios.get, `${PARTICIPANT_API}/portfolio`, {
      params: {
        owner: payload
      },
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.customerGetPortfoliosSuccess(data))
  } catch (error) {
    yield put(actions.customerGetPortfoliosFail(error))
  }
}

export function* addPortfolio({ payload }) {
  try {
    const { id, ...request } = payload
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.post, `${PARTICIPANT_API}/portfolio`, request, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.customerAddPortfolioSuccess())
    toast.success('Portfolio successfully added')
    yield put(actions.customerGetPortfolios(id))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.customerAddPortfolioFail(error))
  }
}

export function* editPortfolio({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.put, `${PARTICIPANT_API}/portfolio`, payload, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.customerEditPortfolioSuccess())
    toast.success('Portfolio successfully updated')
    yield put(actions.customerGetPortfolios(payload.owner))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.customerEditPortfolioFail(error))
  }
}

export function* deletePortfolio({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { participantId, portfolioId } = payload || {}

    yield call(axios.delete, `${PARTICIPANT_API}/portfolio/${portfolioId}`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.customerDeletePortfolioSuccess())
    toast.success('Portfolio successfully deleted')
    yield put(actions.customerGetPortfolios(participantId))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.customerDeletePortfolioFail(error))
  }
}

export function* setCustomerFlags({ payload }) {
  try {
    const { id, ...flags } = payload
    const ticket = yield select(fromIdentity.getTicket)

    yield call(
      axios.put,
      `${IDENTITY_API}/participants/participant/${id}/options`,
      {
        ...flags
      },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    yield put(actions.customerSetCustomerFlagsSuccess())
    toast.success(intl.get('customer.sagas.setFlagSuccess'))
    yield put(actions.customerGetCustomerInfo({ id }))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.customerSetCustomerFlagsFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.GET_ALL, getAll)
  yield takeEvery(actions.SET_PAID_PERIOD, setPaidPeriod)
  yield takeEvery(actions.DELETE_DATA, deleteCustomerData)
  yield takeEvery(actions.SET_TRIAL_PERIOD, setTrialPeriod)
  yield takeEvery(actions.REMOVE_PARTICIPANT, removeParticipant)
  yield takeEvery(actions.GET_CUSTOMER_INFO, getCustomerInfo)
  yield takeEvery(actions.SET_TIMEZONE, setTimezone)
  yield takeEvery(actions.SET_REWARDS_FEE, setRewardsFee)
  yield takeEvery(actions.SET_BUDGET, setBudget)
  yield takeEvery(actions.GET_CONSTRAINTS, getConstraints)
  yield takeEvery(actions.SET_CONSTRAINTS, setConstraints)
  yield takeEvery(actions.DELETE_CONSTRAINTS, deleteConstraints)
  yield takeEvery(actions.SET_CUSTOMER_FLAGS, setCustomerFlags)
  yield takeEvery(actions.ADD_CONSTRAINTS, addConstraints)
  yield takeEvery(actions.GET_BRANDS, getBrands)
  yield takeEvery(actions.ADD_BRAND, addBrand)
  yield takeEvery(actions.EDIT_BRAND, editBrand)
  yield takeEvery(actions.DELETE_BRAND, deleteBrand)
  yield takeEvery(actions.GET_PORTFOLIO, getPortfolio)
  yield takeEvery(actions.GET_PORTFOLIOS, getPortfolios)
  yield takeEvery(actions.ADD_PORTFOLIO, addPortfolio)
  yield takeEvery(actions.EDIT_PORTFOLIO, editPortfolio)
  yield takeEvery(actions.DELETE_PORTFOLIO, deletePortfolio)
}
