import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import intl from 'react-intl-universal'

import TableHeaderOptions from '../../atoms/TableHeaderOptions'
import CustomPagination from '../../atoms/CustomPagination'
import Button from '../../atoms/Button'
import FilterPanel from '../../molecules/FilterPanel'
import Card from '../../organisms/ReviewTemplateCard'
import Loader from '../../templates/Loader'
import useTemplates from '../../../data/review/templates'
import * as ST from './styles'

const ReviewTemplates = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationSize, setPaginationSize] = useState(10)
  const { reviewTemplates } = useTemplates()
  const isReviewsTemplatesLoading = reviewTemplates === undefined
  const [isReviewTemplateDeleting, setIsReviewTemplateDeleting] = useState(false)
  const history = useHistory()
  const [filterValues, setFilterValues] = useState(null)
  const handleAddTemplate = () => {
    history.push('/admin/reviews/templates/create')
  }
  const handleChangePagination = page => {
    setCurrentPage(page)
  }
  const handleChangePaginationSize = value => {
    setCurrentPage(1)
    setPaginationSize(value)
  }
  const handleFilterTemplates = userFilters => {
    setFilterValues(userFilters)
  }
  const count = Array.isArray(reviewTemplates)
    ? reviewTemplates.filter(item => {
        if (filterValues && filterValues.name) {
          return item.name.toLowerCase().includes(filterValues.name.value.toLowerCase())
        }
        return true
      }).length
    : 0
  const lastPage = Math.ceil(count / paginationSize)
  return (
    <ST.Wrapper>
      <FilterPanel
        handleFilterProducts={handleFilterTemplates}
        noEquals
        fieldsForMainPanelAdvanced={[
          {
            fieldId: 'name',
            type: 'text',
            columnName: 'Name'
          }
        ]}
      >
        <ST.ExportButtonWrapper>
          <Button type='danger' size='large' onClick={handleAddTemplate}>
            {intl.get('reviews.templates.actions.add')}
          </Button>
        </ST.ExportButtonWrapper>
      </FilterPanel>
      <TableHeaderOptions
        totalItems={count}
        hasNotSort
        foundItemsLabel='templates'
        handleChangePaginationSize={handleChangePaginationSize}
        paginationSize={paginationSize}
      />
      <div>
        {isReviewsTemplatesLoading || isReviewTemplateDeleting ? (
          <Loader />
        ) : (
          reviewTemplates
            .filter(item => {
              if (filterValues && filterValues.name) {
                return item.name.toLowerCase().includes(filterValues.name.value.toLowerCase())
              }
              return true
            })
            .slice((currentPage - 1) * paginationSize, currentPage * paginationSize)
            .map(template => <Card key={template.id} template={template} setDeleting={setIsReviewTemplateDeleting} />)
        )}
      </div>
      {!isReviewsTemplatesLoading && lastPage > 1 && (
        <CustomPagination
          count={count}
          currentPaginationPage={currentPage}
          lastPage={lastPage}
          paginationSize={paginationSize}
          handlePagination={handleChangePagination}
        />
      )}
    </ST.Wrapper>
  )
}

export default ReviewTemplates
