import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import intl from 'react-intl-universal'
import CustomPagination from '../../atoms/CustomPagination'
import ReviewCard from '../../organisms/ReviewCard'
import Loader from '../../templates/Loader'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'
import * as ST from './styles'
import FilterPanel from '../../molecules/FilterPanel'
import { fieldsForMainPanelAdvanced, optionsForFilters, defaultInitialStateFilters } from './consts'
import { name } from '../../../utils/consts'
import Button from '../../atoms/Button'
import RadioGroup from '../../atoms/RadioGroup'
import ApproveTagForm from '../../molecules/ApproveTagForm'
import AllBatchTasksForm from '../../molecules/AllBatchTasksForm'
import { validateGTIN } from '../../../utils/validation'

const ACTION_OPTIONS = [
  {
    label: intl.get('reviews.actions.acceptAll'),
    value: 'accept'
  },
  {
    label: intl.get('reviews.actions.rejectAll'),
    value: 'reject'
  }
]

const ReviewsListTab = ({
  reviewsPostGetDocs,
  isReviewsLoading,
  reviews,
  media,
  reviewsUpdateReviewImages,
  reviewsCount,
  countries,
  languages,
  isLoadingCountries,
  isLoadingLanguages,
  settingsGetCountries,
  settingsGetLanguages,
  reviewsSetFilters,
  reviewStatusAllBatchTask,
  allBatchTasks,
  isLoadingAllBatchTasks,
  reviewsPostReviewList,
  containerRef
}) => {
  const [approveValue, setApproveValue] = useState(null)
  const [values, setValues] = useState({})
  const [filters, setFilters] = useState({ statuses: ['open', 'report'] })
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1)
  const [paginationSize, setPaginationSize] = useState(10)
  const lastPage = useMemo(() => Math.ceil(reviewsCount / paginationSize), [reviewsCount, paginationSize])
  const mediaUrl = useMemo(() => {
    return media && media.url
  }, [media])

  useEffect(() => {
    if ((!countries || !countries.length) && !isLoadingCountries) {
      settingsGetCountries()
    }

    if ((!languages || !languages.length) && !isLoadingLanguages) {
      settingsGetLanguages()
    }

    if (!isLoadingAllBatchTasks) {
      reviewStatusAllBatchTask()
    }
  }, [])

  useEffect(() => {
    if (!isReviewsLoading) {
      reviewsPostGetDocs({
        limit: paginationSize,
        page: currentPaginationPage - 1,
        ...filters
      })
      reviewsSetFilters({
        limit: paginationSize,
        page: currentPaginationPage - 1,
        ...filters
      })
    }
  }, [paginationSize, currentPaginationPage])

  useEffect(() => {
    setValues({})
    setApproveValue(null)
  }, [currentPaginationPage])

  const filterOptions = useMemo(() => {
    const newOptions = [...optionsForFilters]

    if (languages && languages.length) {
      newOptions.unshift({
        fieldId: 'languages',
        type: 'select',
        mode: 'multiple',
        placeholder: intl.get('campaigns.shoutouts.filters.languagePlaceholder'),
        options: languages.map(item => ({
          value: item.code,
          label: item[name]
        }))
      })
    }

    if (countries && countries.length) {
      newOptions.unshift({
        fieldId: 'countries',
        type: 'select',
        mode: 'multiple',
        placeholder: intl.get('campaigns.shoutouts.filters.countryPlaceholder'),
        options: countries.map(item => ({
          value: item.iso,
          label: item[name]
        }))
      })
    }

    return newOptions
  }, [countries, languages, optionsForFilters])

  useEffect(() => {
    if (mediaUrl) {
      const searchDocumentIndex =
        reviews && reviews.length !== 0 && reviews.findIndex(review => review.id === media.widgetIndex)
      if (searchDocumentIndex !== -1) {
        const { id, images } = { ...reviews[searchDocumentIndex] }
        const newImages = images.map(item => (item.id === media.id ? { url: mediaUrl } : { url: item.url }))
        reviewsUpdateReviewImages({ id, images: newImages })
      }
    }
  }, [mediaUrl])

  const handleFilterCampaigns = useCallback(
    userFilters => {
      if (userFilters.gtin && userFilters.gtin.value) {
        const validationMessage = validateGTIN(userFilters.gtin.value)
        if (validationMessage) {
          toast.error(validationMessage)
          return
        }
      }

      const newFilters = Object.keys(userFilters).reduce((currRes, currItem) => {
        const res = { ...currRes }
        res[currItem] = userFilters[currItem].value
        return res
      }, {})

      reviewsPostGetDocs({
        ...newFilters,
        limit: paginationSize,
        page: currentPaginationPage - 1
      })

      reviewsSetFilters({
        ...newFilters,
        limit: paginationSize,
        page: currentPaginationPage - 1
      })

      setFilters(newFilters)
    },
    [paginationSize, currentPaginationPage]
  )

  const handleOnChangeRadio = useCallback(
    event => {
      if (event && event.target && event.target.value) {
        const approvedReviews = {}
        reviews.filter(item => item.status === 'open').forEach(item => (approvedReviews[item.id] = event.target.value))
        setValues(approvedReviews)
        setApproveValue(event.target.value)
      }
    },
    [reviews]
  )

  const handleOnClickSubmit = useCallback(() => {
    let tagsValues = []
    ApproveTagForm(
      () => {
        reviewsPostReviewList({
          values,
          tags: tagsValues
        })
      },
      value => (tagsValues = value)
    )
    setValues({})
    setApproveValue(null)
  }, [values])

  const handleOnClickViewAllBatch = useCallback(() => {
    reviewStatusAllBatchTask()
    AllBatchTasksForm(allBatchTasks)
  }, [allBatchTasks])
  const wrapper = useRef()
  useEffect(() => {
    if (wrapper.current) {
      wrapper.current.parentElement.parentElement.style.overflowY = 'hidden'
      wrapper.current.parentElement.style.overflowY = 'auto'
    }
  }, [wrapper])
  return (
    <ST.Wrapper ref={wrapper}>
      <ST.ReviewHeader>
        <ST.FilterPanelWrapper count={(fieldsForMainPanelAdvanced && fieldsForMainPanelAdvanced.length) || 0}>
          <FilterPanel
            isAdvanced
            noEquals
            fieldsForMainPanelAdvanced={fieldsForMainPanelAdvanced}
            columnsData={filterOptions}
            handleFilterProducts={handleFilterCampaigns}
            defaultInitialState={defaultInitialStateFilters}
          />
        </ST.FilterPanelWrapper>
        <TableHeaderOptions
          totalItems={reviewsCount}
          handleChangePaginationSize={size => setPaginationSize(size)}
          paginationSize={paginationSize}
          hasNotSort
        >
          <ST.ReviewForWrapper>
            <RadioGroup group={ACTION_OPTIONS} value={approveValue} onChange={handleOnChangeRadio} />
            <Button type='danger' onClick={handleOnClickSubmit}>
              {intl.get('reviews.actions.submit')}
            </Button>
            <Button type='danger' onClick={handleOnClickViewAllBatch}>
              {intl.get('reviews.actions.viewStatus')}
            </Button>
          </ST.ReviewForWrapper>
        </TableHeaderOptions>
      </ST.ReviewHeader>
      {isReviewsLoading ? (
        <ST.LoaderWrapper>
          <Loader />
        </ST.LoaderWrapper>
      ) : (
        <>
          {!!(reviews && reviews.length) &&
            reviews.map(item => (
              <ReviewCard
                containerRef={containerRef}
                values={values}
                setValues={setValues}
                key={item.id}
                review={item}
              />
            ))}
          {lastPage > 1 && (
            <CustomPagination
              currentPaginationPage={currentPaginationPage}
              paginationSize={paginationSize}
              handlePagination={page => {
                setCurrentPaginationPage(page)
              }}
              count={reviewsCount}
              lastPage={lastPage}
              size='small'
            />
          )}
        </>
      )}
    </ST.Wrapper>
  )
}

ReviewsListTab.propTypes = {
  reviewsPostGetDocs: PropTypes.func.isRequired,
  isReviewsLoading: PropTypes.bool,
  reviews: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  media: PropTypes.object,
  reviewsUpdateReviewImages: PropTypes.func.isRequired,
  reviewsCount: PropTypes.number,
  languages: PropTypes.arrayOf(PropTypes.object),
  countries: PropTypes.arrayOf(PropTypes.object),
  isLoadingLanguages: PropTypes.bool,
  isLoadingCountries: PropTypes.bool,
  settingsGetCountries: PropTypes.func.isRequired,
  settingsGetLanguages: PropTypes.func.isRequired,
  reviewsSetFilters: PropTypes.func.isRequired,
  reviewStatusAllBatchTask: PropTypes.func.isRequired,
  allBatchTasks: PropTypes.arrayOf(PropTypes.object),
  isLoadingAllBatchTasks: PropTypes.bool,
  reviewsPostReviewList: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  containerRef: PropTypes.object.isRequired
}

ReviewsListTab.defaultProps = {
  isReviewsLoading: false,
  reviews: null,
  media: null,
  reviewsCount: 0,
  isLoadingLanguages: false,
  isLoadingCountries: false,
  languages: [],
  countries: [],
  allBatchTasks: null,
  isLoadingAllBatchTasks: false
}
export default ReviewsListTab
