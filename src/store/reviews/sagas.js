import axios from 'axios'
import { call, put, select, takeEvery, delay } from 'redux-saga/effects'
import { REVIEWS_API } from 'constants/url'
import { fromIdentity, fromReviews } from 'store/selectors'
import uuid from 'uuid4'
import { toast } from 'react-toastify'
import * as actions from './actions'

export function* postGetDocs({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const filters = { ...payload }
    let id = null

    if (filters.id) {
      // eslint-disable-next-line prefer-destructuring
      id = filters.id
      delete filters.id
    }

    const { data } = yield call(axios.post, `${REVIEWS_API}/review_docs`, payload, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    const refactoredData = { ...data }
    refactoredData.id = id
    if (refactoredData.documents && refactoredData.documents.length) {
      refactoredData.documents = refactoredData.documents.map(doc => {
        const newDoc = { ...doc }

        if (newDoc.images && newDoc.images.length) {
          newDoc.images = newDoc.images.map(el => ({ ...el, id: uuid() }))
        }

        return newDoc
      })
    }

    yield put(actions.reviewsPostGetDocsSuccess(refactoredData))
  } catch (error) {
    yield put(actions.reviewsPostGetDocsFail(error))
  }
}

export function* updateReviewImages({ payload: { id, images } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(
      axios.post,
      `${REVIEWS_API}/review_doc/review/${id}/override`,
      {
        images
      },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    yield put(actions.reviewsUpdateReviewImagesSuccess())
    const filters = yield select(fromReviews.getFilters)
    filters.id = id
    yield put(actions.reviewsPostGetDocs(filters))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.reviewsUpdateReviewImagesFail())
  }
}

export function* putReviewTags({ payload: { id, tags } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    yield call(
      axios.put,
      `${REVIEWS_API}/review_docs/${id}/tags`,
      { tags },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    toast.success('Tags successfully updated')
    yield put(actions.reviewPutReviewTagSuccess())
    const filters = yield select(fromReviews.getFilters)
    yield put(actions.reviewsPostGetDocs(filters))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.reviewPutReviewTagFail(error))
  }
}

export function* putLockReview({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.put, `${REVIEWS_API}/review_doc/lock/${payload}`, payload, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.reviewsPutLocReviewSuccess())
  } catch (error) {
    yield put(actions.reviewsPutLocReviewFail(error))
  }
}

export function* putReviewDoc({ payload: { id, status, tags, images } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    yield put(actions.reviewsPutLocReview(id))

    yield call(
      axios.put,
      `${REVIEWS_API}/review_doc/review/${id}`,
      {
        status,
        images,
        ...(tags && tags.length > 0 && { tags })
      },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    yield put(actions.reviewsPutReviewDocSuccess())
    const filters = yield select(fromReviews.getFilters)
    yield put(actions.reviewsPostGetDocs(filters))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.reviewsPutReviewDocFail(error))
  }
}

export function* putReviewAcceptReport({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.delete, `${REVIEWS_API}/review_doc/${payload}/reports`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield call(axios.delete, `${REVIEWS_API}/review_doc/${payload}`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.reviewsPutReviewAcceptReportSuccess())
    const filters = yield select(fromReviews.getFilters)
    yield put(actions.reviewsPostGetDocs(filters))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.reviewsPutReviewAcceptReportFail(error))
  }
}

export function* putReviewRejectReport({ payload }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)

    yield call(axios.delete, `${REVIEWS_API}/review_doc/${payload}/reports`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    yield put(actions.reviewsPutReviewRejectReportSuccess())
    const filters = yield select(fromReviews.getFilters)
    yield put(actions.reviewsPostGetDocs(filters))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.reviewsPutReviewRejectReportFail(error))
  }
}

export function* reviewStatusAllBatchTask() {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const { data } = yield call(axios.get, `${REVIEWS_API}/review/tasks`, {
      headers: { authenticateit_identity_ticket: ticket }
    })

    const modifiedData =
      data && data.tasks && data.tasks.length > 0
        ? data.tasks.map(d => ({
            status: d.status.toUpperCase(),
            errors:
              d.errors && d.errors.length > 0
                ? d.errors.map(error => `${error.review_doc}: ${error.error_id}`).join(', ')
                : 'None'
          }))
        : []

    yield put(actions.reviewStatusAllBatchTaskSuccess(modifiedData))
  } catch (error) {
    yield put(actions.reviewStatusAllBatchTaskFail(error))
  }
}

export function* postReviewList({ payload: { tags, values } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    const acceptedReviews =
      values && Object.entries(values).length > 0
        ? Object.entries(values)
            .filter(review => review[1] === 'accept')
            .map(review => review[0])
        : []

    const rejectedReviews =
      values && Object.entries(values).length > 0
        ? Object.entries(values)
            .filter(review => review[1] === 'reject')
            .map(review => review[0])
        : []
    const filters = yield select(fromReviews.getFilters)
    if (acceptedReviews && acceptedReviews.length > 0) {
      const { data } = yield call(
        axios.post,
        `${REVIEWS_API}/review/tasks`,
        {
          review_docs: acceptedReviews,
          status: 'approve',
          ...(tags && tags.length > 0 && { tags })
        },
        {
          headers: { authenticateit_identity_ticket: ticket }
        }
      )
      toast.success(`Created batch approve review task: ${data.id}`)

      if (filters && filters.statuses && filters.statuses.includes('approve')) {
        // eslint-disable-next-line no-plusplus
        for (let ind = 0; ind < acceptedReviews.length; ind++) {
          yield put(actions.reviewsPutReviewChangeStatus({ id: acceptedReviews[ind], status: 'approve' }))
        }
      } else {
        // eslint-disable-next-line no-plusplus
        for (let ind = 0; ind < acceptedReviews.length; ind++) {
          yield put(actions.reviewsPutRemoveReviewItem(acceptedReviews[ind]))
        }
      }
    }

    if (rejectedReviews && rejectedReviews.length > 0) {
      const { data } = yield call(
        axios.post,
        `${REVIEWS_API}/review/tasks`,
        {
          review_docs: rejectedReviews,
          status: 'reject'
        },
        {
          headers: { authenticateit_identity_ticket: ticket }
        }
      )
      toast.success(`Created batch reject review task: ${data.id}`)
      if (filters && filters.statuses && filters.statuses.includes('reject')) {
        // eslint-disable-next-line no-plusplus
        for (let ind = 0; ind < acceptedReviews.length; ind++) {
          yield put(actions.reviewsPutReviewChangeStatus({ id: acceptedReviews[ind], status: 'reject' }))
        }
      } else {
        // eslint-disable-next-line no-plusplus
        for (let ind = 0; ind < acceptedReviews.length; ind++) {
          yield put(actions.reviewsPutRemoveReviewItem(acceptedReviews[ind]))
        }
      }
    }

    yield delay(5000)
    yield put(actions.reviewsPostReviewListSuccess())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.reviewsPostReviewListFail(error))
  }
}

export function* addComment({ payload: { id, comment } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    yield call(
      axios.post,
      `${REVIEWS_API}/comments/${id}`,
      { comment },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    toast.success('Comment successfully added')
    yield put(actions.reviewsAddCommentSuccess())
    const filters = yield select(fromReviews.getFilters)
    yield put(actions.reviewsPostGetDocs(filters))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.reviewsAddCommentFail(error))
  }
}

export function* updateComment({ payload: { id, comment, commentId } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    yield call(
      axios.put,
      `${REVIEWS_API}/comments/${id}`,
      { comment, comment_id: commentId },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    toast.success('Comment successfully updated')
    yield put(actions.reviewsUpdateCommentSuccess())
    const filters = yield select(fromReviews.getFilters)
    yield put(actions.reviewsPostGetDocs(filters))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.reviewsUpdateCommentFail(error))
  }
}

export function* deleteComment({ payload: { id, commentId } }) {
  try {
    const ticket = yield select(fromIdentity.getTicket)
    yield call(
      axios.put,
      `${REVIEWS_API}/comments/${id}/delete`,
      { comment_ids: [commentId] },
      {
        headers: { authenticateit_identity_ticket: ticket }
      }
    )

    toast.success('Comment successfully deleted')
    yield put(actions.reviewsDeleteCommentSuccess())
    const filters = yield select(fromReviews.getFilters)
    yield put(actions.reviewsPostGetDocs(filters))
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`${error.response.data.error}`)
    }

    yield put(actions.reviewsDeleteCommentFail(error))
  }
}

export default function*() {
  yield takeEvery(actions.POST_GET_DOCS, postGetDocs)
  yield takeEvery(actions.UPDATE_REVIEW_IMAGES, updateReviewImages)
  yield takeEvery(actions.PUT_REVIEW_TAG, putReviewTags)
  yield takeEvery(actions.PUT_REVIEW_REJECT_REPORT, putReviewRejectReport)
  yield takeEvery(actions.PUT_REVIEW_ACCEPT_REPORT, putReviewAcceptReport)
  yield takeEvery(actions.PUT_LOC_REVIEW, putLockReview)
  yield takeEvery(actions.PUT_REVIEW_DOC, putReviewDoc)
  yield takeEvery(actions.REVIEW_STATUS_ALL_BATCH_TASKS, reviewStatusAllBatchTask)
  yield takeEvery(actions.POST_REVIEW_LIST, postReviewList)
  yield takeEvery(actions.ADD_COMMENT, addComment)
  yield takeEvery(actions.DELETE_COMMENT, deleteComment)
  yield takeEvery(actions.UPDATE_COMMENT, updateComment)
}
