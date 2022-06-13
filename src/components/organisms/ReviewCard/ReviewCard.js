import React, { useMemo, useEffect, useCallback, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Flag from 'react-world-flags'
import intl from 'react-intl-universal'
import 'image-manipulation'
import { toast } from 'react-toastify'
import { Form, Input, Tag } from 'antd'
import * as ST from './styles'
import { formatDate } from '../../../utils/helpers/date'
import placeholder from '../../../assets/logo-placeholder.png'
import Rate from '../../atoms/Rate'
import IconButton from '../../molecules/IconButton'
import { ACTION_OPTIONS } from './consts'
import Button from '../../atoms/Button'
import RadioGroup from '../../atoms/RadioGroup'
import LoadingSpinner from '../../atoms/LoadingSpinner'
import ApproveTagForm from '../../molecules/ApproveTagForm'
import ApproveCommentForm from '../../molecules/ApproveCommentForm'
import deleteModal from '../../molecules/DeleteModal'

const ReviewCard = ({
  review,
  lastUpload,
  isCommentUpdated,
  isUploading,
  activeIndex,
  postUpload,
  isLoading,
  reviewPutReviewTag,
  isTagUpdated,
  updatingReview,
  reviewsPutReviewAcceptReport,
  reviewsPutReviewRejectReport,
  reviewsPutReviewDoc,
  values,
  setValues,
  loadedReviews,
  updatedId,
  reviewsClearUpdatedId,
  containerRef,
  reviewsAddComment,
  reviewsUpdateComment,
  reviewsDeleteComment
}) => {
  const [isRotatingImage, setIsRotatingImage] = useState(false)
  const cardRef = useRef(null)
  const imageRef = useRef(null)
  const executeScroll = () => {
    let heightScroll = 0
    if (cardRef && cardRef.current && cardRef.current.offsetTop) {
      heightScroll += cardRef.current.offsetTop
    }

    if (imageRef && imageRef.current && imageRef.current.offsetTop) {
      heightScroll += imageRef.current.offsetTop
    }
    containerRef.current.scrollTo(0, heightScroll)
    reviewsClearUpdatedId()
  }

  useEffect(() => {
    if (updatedId === review.id) {
      executeScroll()
    }
  }, [updatedId])

  const isUploadingImage = useMemo(() => {
    return (
      isRotatingImage ||
      isTagUpdated ||
      isLoading ||
      (isUploading && activeIndex === review.id) ||
      updatingReview === review.id ||
      loadedReviews.includes(review.id)
    )
  }, [isRotatingImage, activeIndex, lastUpload, isLoading, review, isTagUpdated, loadedReviews])
  const status = useMemo(() => {
    const isHaveReports =
      review.reports && review.reports.length > 0 ? { warning: true, success: true } : { success: true }
    return review.status !== 'open' && (review.status === 'approve' ? isHaveReports : { error: true })
  }, [review])

  const onDrop = (file, index, id) => {
    postUpload({ file: file[0], index, id })
  }

  const handleUpload = (files, index, id) => {
    const file = files[0]
    const fileType = ['image/png', 'image/jpg', 'image/jpeg']

    if (!file) return
    if (!fileType.includes(file.type)) {
      toast.error(intl.get('reviews.invalidFileType', { type: file.type }))
      return
    }

    onDrop(files, index, id)
  }

  const rotateImage = (url, index, action, id) => {
    setIsRotatingImage(true)
    const { ImageMethods } = window

    ImageMethods.getCanvasFromUrl(`${url}?cacheblock=true`, canvas => {
      const instance = new ImageMethods(canvas)
      if (action === 'rotateRight') {
        instance.rotate(90)
      } else {
        instance.rotate(-90)
      }
      setIsRotatingImage(false)
      handleUpload([ImageMethods.toBlob(instance.canvas)], index, id)
    })
  }

  const handleAddTag = useCallback(
    event => {
      if (event && event.target && event.target.value) {
        const tags = (review.tags && [...review.tags]) || []
        tags.push(event.target.value)
        reviewPutReviewTag({ id: review.id, tags })
      }
    },
    [review]
  )

  const handleDeleteTags = useCallback((event, id, oldTags, tag) => {
    event.preventDefault()
    event.stopPropagation()
    const tags = oldTags.filter(item => item !== tag)
    reviewPutReviewTag({ id, tags })
  }, [])

  const handleAccept = useCallback(() => {
    reviewsPutReviewAcceptReport(review.id)
  }, [review])

  const handleReject = useCallback(() => {
    reviewsPutReviewRejectReport(review.id)
  }, [review])

  const handleButtonClick = useCallback(
    selectedStatus => {
      let tagsValues = []
      if (selectedStatus === 'approve') {
        ApproveTagForm(
          () => {
            reviewsPutReviewDoc({
              id: review.id,
              status: selectedStatus,
              ...(review.images &&
                review.images.length && { images: review.images.map(image => ({ url: image.url })) }),
              tags: tagsValues
            })
          },
          value => (tagsValues = value)
        )
      } else {
        reviewsPutReviewDoc({ id: review.id, status: selectedStatus })
      }
    },
    [review]
  )

  const handleEditCommentClick = useCallback((id, commentId, commentText) => {
    let comment

    ApproveCommentForm(
      () => {
        if (!comment) {
          toast.error('Comment is requried')
          return false
        }

        if (comment.length > 250) {
          toast.error(intl.get('validation.tooLongValue', { number: 250 }))
          return false
        }

        if (commentId) {
          reviewsUpdateComment({
            id,
            commentId,
            comment
          })
        } else {
          reviewsAddComment({
            id,
            comment
          })
        }

        return true
      },
      value => (comment = value),
      commentText
    )
  }, [])

  const renderStatusIcon = useCallback((statuses, isLoad) => {
    const { warning, success } = statuses
    const isWarning = warning ? (
      <IconButton
        type='Warning'
        styleParam={{ opacity: isLoad ? 0.4 : 1, fontSize: '35px', color: '#ef3d46', cursor: 'default' }}
      />
    ) : (
      <IconButton
        type='Check'
        styleParam={{ opacity: isLoad ? 0.4 : 1, fontSize: '35px', color: '#ef3d46', cursor: 'default' }}
      />
    )
    return success ? isWarning : null
  }, [])

  return (
    <ST.CardWrapper ref={cardRef}>
      <ST.StatusIconContainer>{renderStatusIcon(status, isUploadingImage)}</ST.StatusIconContainer>
      <LoadingSpinner key={review.id} isLoading={isUploadingImage || isCommentUpdated}>
        <ST.CardHeader>
          <ST.CardHeaderInfo>
            <ST.IconContainer>
              <img src={review.user_photo || placeholder} alt='icon' width='33' height='33' />
            </ST.IconContainer>
            <ST.ProfileInfo>
              <ST.Info>
                {review.user_name && review.user_name.trim() && <span>{review.user_name}</span>}
                <Flag
                  code={review.country}
                  fallback={<span>Flag</span>}
                  style={{ margin: 4, boxShadow: '2px 2px 7px #ccc' }}
                  height={16}
                />
                <ST.RateWrapper>
                  <Rate rate={review.rate} />
                </ST.RateWrapper>
              </ST.Info>
              <span
                style={{ lineHeight: 1, marginTop: review.user_name && review.user_name.trim() ? '2px' : '6px' }}
              >{`${review.product_id} - ${review.product_name}`}</span>
            </ST.ProfileInfo>
          </ST.CardHeaderInfo>
          <ST.CardHeaderRightLabel>{formatDate(review.ts)}</ST.CardHeaderRightLabel>
        </ST.CardHeader>
        <ST.CardBody>{review.text}</ST.CardBody>
        {!!(review.images && review.images.length) && (
          <ST.CardMedia ref={imageRef}>
            {review.images.map((image, index) => (
              <div key={image.url || index}>
                {image.url && (
                  <ST.ImageBlock>
                    <ST.IconWrapper>
                      <IconButton
                        type='RotateLeft'
                        popText={intl.get('widgets.images.rotate')}
                        styleParam={{ fontSize: 19, marginRight: 10 }}
                        actionFunction={() => rotateImage(image.url, review.id, 'rotateLeft', image.id)}
                      />
                      <IconButton
                        type='Rotate'
                        popText={intl.get('widgets.images.rotate')}
                        styleParam={{ fontSize: 19, marginRight: 10 }}
                        actionFunction={() => rotateImage(image.url, review.id, 'rotateRight', image.id)}
                      />
                    </ST.IconWrapper>
                    <ST.Image src={image.url} alt='Review' />
                  </ST.ImageBlock>
                )}
              </div>
            ))}
          </ST.CardMedia>
        )}
        {review.videos && review.videos.length !== 0 && (
          <ST.VideoWrapper>
            {review.videos.map(video => (
              <ST.Video key={video.url} src={video.url} controls crossOrigin='anonymous' />
            ))}
          </ST.VideoWrapper>
        )}
        {status.warning && (
          <>
            <h3>Report Details</h3>
            <ST.ReportWrapper>
              {review.reports.map((report, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <React.Fragment key={index}>
                  <span style={{ lineHeight: 1.2 }}>{`${report.user.first_name} ${report.user.last_name} - ${formatDate(
                    report.ts
                  )}`}</span>
                  <span>{report.report}</span>
                </React.Fragment>
              ))}
            </ST.ReportWrapper>
          </>
        )}
        {review.status === 'approve' && review.reports && review.reports.length === 0 && (
          <Form.Item label={intl.get('reviews.tags.label')}>
            <Input onPressEnter={handleAddTag} size='large' placeholder={intl.get('reviews.tags.placeholder')} />
          </Form.Item>
        )}
        {review.status === 'approve' &&
          review.reports &&
          review.reports.length === 0 &&
          Array.isArray(review.tags) &&
          review.tags.length > 0 && (
            <ST.Tags>
              {review.tags.map((tag, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Tag key={index} closable onClose={event => handleDeleteTags(event, review.id, review.tags, tag)}>
                  {tag}
                </Tag>
              ))}
            </ST.Tags>
          )}
        {review.status === 'approve' &&
          (review.comments && review.comments.length !== 0 ? (
            <Form.Item label={intl.get('reviews.comments.label')}>
              <ST.Comments>
                <ST.ContentCommentWrapper>
                  <span>{formatDate(review.comments[0].ts)}</span>
                  <span>{review.comments[0].text}</span>
                </ST.ContentCommentWrapper>
                <ST.ActionsWrapper>
                  <IconButton
                    type='Edit'
                    styleParam={{ color: '#ef3d46', fontSize: '25px' }}
                    actionFunction={() =>
                      handleEditCommentClick(review.id, review.comments[0].id, review.comments[0].text)
                    }
                  />
                  <IconButton
                    type='DeleteTrash'
                    styleParam={{ fontSize: '25px' }}
                    actionFunction={() =>
                      deleteModal(
                        () => reviewsDeleteComment({ id: review.id, commentId: review.comments[0].id }),
                        intl.get('reviews.comments.confirmDelete')
                      )
                    }
                  />
                </ST.ActionsWrapper>
              </ST.Comments>
            </Form.Item>
          ) : (
            <ST.CardActions>
              <ST.ButtonsWrapper isHaveOneButton>
                <Button type='danger' onClick={() => handleEditCommentClick(review.id)}>
                  Add comment
                </Button>
              </ST.ButtonsWrapper>
            </ST.CardActions>
          ))}
        {status.warning ? (
          <ST.CardActions>
            <ST.ButtonsWrapper>
              <Button type='danger' onClick={handleAccept}>
                Accept report and delete
              </Button>
              <Button type='danger' onClick={handleReject}>
                Reject report
              </Button>
            </ST.ButtonsWrapper>
          </ST.CardActions>
        ) : (
          !status.success &&
          !status.error && (
            <ST.CardActions isHaveRadio>
              <RadioGroup
                group={ACTION_OPTIONS}
                value={values[review.id]}
                onChange={event =>
                  setValues({
                    ...values,
                    [review.id]: event && event.target && event.target.value
                  })
                }
              />
              <ST.ButtonsWrapper>
                <Button type='danger' onClick={() => handleButtonClick('approve')}>
                  {intl.get('reviews.actions.accept')}
                </Button>
                <Button type='danger' onClick={() => handleButtonClick('reject')}>
                  {intl.get('reviews.actions.reject')}
                </Button>
              </ST.ButtonsWrapper>
            </ST.CardActions>
          )
        )}
      </LoadingSpinner>
    </ST.CardWrapper>
  )
}

ReviewCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  review: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  lastUpload: PropTypes.object,
  isUploading: PropTypes.string,
  activeIndex: PropTypes.string,
  postUpload: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  reviewPutReviewTag: PropTypes.func.isRequired,
  isTagUpdated: PropTypes.bool,
  updatingReview: PropTypes.string,
  reviewsPutReviewAcceptReport: PropTypes.func.isRequired,
  reviewsPutReviewRejectReport: PropTypes.func.isRequired,
  reviewsPutReviewDoc: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  setValues: PropTypes.func.isRequired,
  loadedReviews: PropTypes.arrayOf(PropTypes.string),
  updatedId: PropTypes.string,
  reviewsClearUpdatedId: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  containerRef: PropTypes.object.isRequired,
  reviewsAddComment: PropTypes.func.isRequired,
  reviewsUpdateComment: PropTypes.func.isRequired,
  reviewsDeleteComment: PropTypes.func.isRequired,
  isCommentUpdated: PropTypes.bool
}

ReviewCard.defaultProps = {
  lastUpload: null,
  isUploading: null,
  activeIndex: null,
  isLoading: false,
  isTagUpdated: false,
  updatingReview: null,
  updatedId: null,
  values: {},
  loadedReviews: [],
  isCommentUpdated: false
}

export default ReviewCard
