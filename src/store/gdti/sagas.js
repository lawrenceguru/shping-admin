import axios from 'axios'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { fromIdentity } from 'store/selectors'
import { GDTI_API, INDEX_API, DESCRIPTION_API, PARTICIPANT_API } from 'constants/url'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import intl from 'react-intl-universal'
import * as actions from './actions'
import { documentsGetDocuments } from '../documents/actions'
import {
  getModifiedDataForGetAttachmentsRequest,
  getModifiedDataForPostAttachmentsRequest
} from '../../utils/getModifiedDataForRequest'
import { getTableName } from '../products/selectors'
import { getIndexInfo } from '../indexFieldsProducts/sagas'

export function* getGdtiCertificates() {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { data } = yield call(axios.get, `${GDTI_API}/gdtis?doc_type=2`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    let certificateList = []

    if (data && data.count > 0) {
      certificateList = data.data.map(certificate => ({
        label: JSON.parse(certificate.title).en,
        value: certificate.id,
        image: certificate.image
      }))
    }
    yield put(actions.getGdtiCertificatesSuccess({ certificateList }))
  } catch (error) {
    yield put(actions.getGdtiCertificatesFail({ error }))
  }
}

export function* getGdtiNutritions() {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { data } = yield call(axios.get, `${GDTI_API}/gdtis?doc_type=4`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    let nutritionsList = []

    if (data && data.count > 0) {
      nutritionsList = data.data.map(nutrition => ({
        label: JSON.parse(nutrition.title).en,
        value: nutrition.id,
        image: nutrition.image
      }))
    }
    yield put(actions.getGdtiNutritionsSuccess({ nutritionsList }))
  } catch (error) {
    yield put(actions.getGdtiNutritionsFail({ error }))
  }
}

export function* deleteGdti({ payload: { id, title, paginationSize, skip, order, filters } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const {
      data: { brand, gtin }
    } = yield call(axios.get, `${GDTI_API}/gdtis/${id}/attached`, {
      headers: { authenticateit_identity_ticket: ticket }
    })
    const {
      data: { attachments }
    } = yield call(axios.get, `${GDTI_API}/attachments/global`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    const isAttached = attachments.includes(id)

    if ((!brand || !brand.length) && (!gtin || !gtin.length) && !isAttached) {
      yield call(axios.delete, `${GDTI_API}/gdtis/${id}`, {
        headers: { authenticateit_identity_ticket: ticket }
      })

      yield put(documentsGetDocuments({ paginationSize, skip, order, filters }))
      toast.success(intl.get('documents.deleteSuccess', { title }))
      yield put(actions.deleteGdtiSuccess())
    } else {
      yield put(actions.deleteGdtiFail())
      toast.error(intl.get('documents.deleteFailMessage'))
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.deleteGdtiFail(error))
  }
}

export function* postGdti({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const {
      data: { id }
    } = yield call(axios.post, `${GDTI_API}/gdtis/`, payload, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    toast.success(intl.get('documents.form.docCreated'))
    yield put(actions.postGdtiSuccess(id))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.postGdtiFail())
  }
}

export function* getGdti({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const { data } = yield call(axios.get, `${GDTI_API}/gdtis/${payload}`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.getGdtiSuccess(data))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.getGdtiFail(error))
  }
}

export function* updateGdti({ payload: { id, data } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.put, `${GDTI_API}/gdtis/${id}`, data, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    toast.success(intl.get('documents.form.docUpdated'))
    yield put(actions.updateGdtiSuccess())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.updateGdtiFail(error))
  }
}
export function* getGdtiAttachedGtin({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    let indexSchemaTable = yield select(getTableName)

    if (!indexSchemaTable) {
      yield call(getIndexInfo)
      indexSchemaTable = yield select(getTableName)
    }

    const response = yield call(axios.get, `${GDTI_API}/gdtis/${payload}/attached`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    const {
      // eslint-disable-next-line camelcase
      data: { attachments, attachment_positions }
    } = yield call(axios.get, `${GDTI_API}/attachments/global`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    const { data: responsePositions } = yield call(axios.get, `${GDTI_API}/gdtis/${payload}/attached/positions`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    const { brands, param, positionProductInfo } = getModifiedDataForGetAttachmentsRequest(response, responsePositions)

    const { data } = yield call(axios.post, `${INDEX_API}/rsql/${indexSchemaTable}`, param, {
      headers: {
        authenticateit_identity_ticket: ticket,
        'Content-Type': 'application/json'
      }
    })

    yield put(
      actions.getGdtiAttachedGtinSuccess({
        attachedGtin: data.map(value => {
          return {
            value: value.id,
            label: `${value.name} [${value.id}]`
          }
        }),
        attachedBrands: brands.map(brand => {
          return {
            value: brand,
            label: brand
          }
        }),
        isAllProducts: attachments.includes(payload),
        positionProductInfo,
        positionProductInfoAll:
          // eslint-disable-next-line camelcase
          (attachments.includes(payload) && attachment_positions && attachment_positions[payload]) || null
      })
    )
  } catch (error) {
    yield put(actions.getGdtiAttachedGtinFail(error))
  }
}

export function* postAttachedGdti({ payload: { gtinId, gdtiId, positionProductInfo } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    const reqPayload = {
      attachments: [gdtiId]
    }

    if (positionProductInfo) {
      reqPayload.attachment_positions = { [gdtiId]: Number(positionProductInfo) }
    }

    yield call(axios.post, `${DESCRIPTION_API}/gtins/${gtinId}/attachments/add`, reqPayload, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.getGdtiAttachedGtin(gdtiId))
    toast.success(intl.get('documents.attach.attached'))
    yield put(actions.postAttacedGdtiSuccess())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.postAttacedGdtiFail(error))
  }
}

export function* putAttachedMultiProducts(attach, detach, positionProductToDetach, gdtiId, reqPayload) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    if (attach && attach.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const gtinId of attach) {
        yield call(axios.post, `${DESCRIPTION_API}/gtins/${gtinId}/attachments/add`, reqPayload, {
          headers: { authenticateit_identity_ticket: ticket }
        })
      }
    }

    if (positionProductToDetach && positionProductToDetach.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const gtinId of positionProductToDetach) {
        yield call(
          axios.post,
          `${DESCRIPTION_API}/gtins/${gtinId}/attachments/add`,
          {
            attachments: [gdtiId],
            attachment_positions: { [gdtiId]: null }
          },
          { headers: { authenticateit_identity_ticket: ticket } }
        )
      }
    }

    if (detach && detach.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const gtinId of detach) {
        yield call(
          axios.post,
          `${DESCRIPTION_API}/gtins/${gtinId}/attachments/remove`,
          { attachments: [gdtiId], attachment_positions: { [gdtiId]: null } },
          { headers: { authenticateit_identity_ticket: ticket } }
        )
      }
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.postAttacedGdtiFail(error))
  }
}

export function* putAttachedMultiBrands(attach, detach, positionBrandToDetach, gdtiId, reqPayload) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    if (attach && attach.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const brandName of attach) {
        yield call(
          axios.post,
          `${PARTICIPANT_API}/brands/attachments/add`,
          { ...reqPayload, name: brandName },
          { headers: { authenticateit_identity_ticket: ticket } }
        )
      }
    }

    if (positionBrandToDetach && positionBrandToDetach.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const brandName of positionBrandToDetach) {
        yield call(
          axios.post,
          `${PARTICIPANT_API}/brands/attachments/add`,
          {
            attachments: [gdtiId],
            attachment_positions: { [gdtiId]: null },
            name: brandName
          },
          { headers: { authenticateit_identity_ticket: ticket } }
        )
      }
    }

    if (detach && detach.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const brandName of detach) {
        yield call(
          axios.post,
          `${PARTICIPANT_API}/brands/attachments/remove`,
          { name: brandName, attachments: [gdtiId] },
          { headers: { authenticateit_identity_ticket: ticket } }
        )
      }
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.postAttacedGdtiFail(error))
  }
}

export function* postDetachedGdti({ payload: { gtinId, gdtiId } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(
      axios.post,
      `${DESCRIPTION_API}/gtins/${gtinId}/attachments/remove`,
      { attachments: [gdtiId] },
      { headers: { authenticateit_identity_ticket: ticket } }
    )

    yield put(actions.getGdtiAttachedGtin(gdtiId))
    toast.success(intl.get('documents.attach.detached'))
    yield put(actions.postDetachedGdtiSuccess())
  } catch (error) {
    yield put(actions.postDetachedGdtiFail())
  }
}

export function* gdtiGlobalAttachProducts({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { gdtiId, products, brands, positionProductInfoAll } = payload

    yield call(
      axios.post,
      `${GDTI_API}/attachments/global/add`,
      {
        attachments: [gdtiId],
        attachment_positions: { [gdtiId]: positionProductInfoAll }
      },
      { headers: { authenticateit_identity_ticket: ticket } }
    )

    yield call(putAttachedMultiProducts, [], products || [], [], gdtiId, {})
    yield call(putAttachedMultiBrands, [], brands || [], [], gdtiId, {})

    yield put(actions.getGdtiAttachedGtin(gdtiId))
    toast.success(intl.get('documents.attach.success'))
    yield put(actions.gdtiGlobalAttachProductsSuccess())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.gdtiGlobalAttachProductsFail())
  }
}

export function* gdtiAttachProducts({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { gdtiId, products, brands, positionProductInfo } = payload

    const reqPayload = {
      attachments: [gdtiId]
    }

    yield call(
      axios.post,
      `${GDTI_API}/attachments/global/remove`,
      { attachments: [gdtiId], attachment_positions: { [gdtiId]: null } },
      { headers: { authenticateit_identity_ticket: ticket } }
    )

    const {
      data: { gtin, brand }
    } = yield call(axios.get, `${GDTI_API}/gdtis/${gdtiId}/attached`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    const { data } = yield call(axios.get, `${GDTI_API}/gdtis/${gdtiId}/attached/positions`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    if (positionProductInfo) {
      reqPayload.attachment_positions = { [gdtiId]: positionProductInfo }
    }

    const {
      productsToAttach,
      productsToDetach,
      brandsToDetach,
      brandsToAttach,
      positionProductToDetach,
      positionBrandToDetach
    } = getModifiedDataForPostAttachmentsRequest(data, brands, products, gtin, positionProductInfo, brand)

    yield call(
      putAttachedMultiProducts,
      productsToAttach,
      productsToDetach,
      positionProductToDetach,
      gdtiId,
      reqPayload
    )

    yield call(putAttachedMultiBrands, brandsToAttach, brandsToDetach, positionBrandToDetach, gdtiId, reqPayload)

    yield put(actions.getGdtiAttachedGtin(gdtiId))
    toast.success(intl.get('documents.attach.success'))
    yield put(actions.gdtiAttachProductsSuccess())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }
    yield put(actions.gdtiAttachProductsFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.GET_GDTI_CERTIFICATES, getGdtiCertificates)
  yield takeEvery(actions.GET_GDTI_NUTRITIONS, getGdtiNutritions)
  yield takeEvery(actions.POST_ATTACHED_GDTI, postAttachedGdti)
  yield takeEvery(actions.POST_DETACHED_GDTI, postDetachedGdti)
  yield takeEvery(actions.DELETE_GDTI, deleteGdti)
  yield takeEvery(actions.POST_GDTI, postGdti)
  yield takeEvery(actions.GET_GDTI, getGdti)
  yield takeEvery(actions.UPDATE_GDTI, updateGdti)
  yield takeEvery(actions.GET_GDTI_ATTACHED_GTIN, getGdtiAttachedGtin)
  yield takeEvery(actions.GDTI_ATTACH_PRODUCTS, gdtiAttachProducts)
  yield takeEvery(actions.GDTI_GLOBAL_ATTACH_PRODUCTS, gdtiGlobalAttachProducts)
}
