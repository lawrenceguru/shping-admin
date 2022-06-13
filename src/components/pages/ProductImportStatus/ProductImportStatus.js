import React, { useEffect, useState, useMemo, useCallback } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import Loader from '../../templates/Loader'
import * as ST from './styles'
import ImportStatusCard from '../../molecules/ImportStatusCard'
import CustomPagination from '../../atoms/CustomPagination'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'
import CardImport from '../../atoms/CardImport'
import Button from '../../atoms/Button'

const ProductImportStatus = ({ importStatus, isImportLoading, productsGetImportStatus, productsGetImportStatuses }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationSize, setPaginationSize] = useState(10)
  const [errors, setErrors] = useState(null)
  const [currentLastPage, setCurrentLastPage] = useState(0)

  const totalTasksCount = useMemo(() => {
    return (importStatus && importStatus.tasks && importStatus.tasks.length) || 0
  }, [importStatus])
  const totalErrorsCount = useMemo(() => {
    return (errors && errors.length) || 0
  }, [errors])

  const lastPageTasks = useMemo(() => Math.ceil(totalTasksCount / paginationSize), [totalTasksCount, paginationSize])
  const lastPageErrors = useMemo(() => Math.ceil(totalErrorsCount / paginationSize), [totalErrorsCount, paginationSize])

  useEffect(() => {
    if ((!importStatus || !importStatus.length) && !isImportLoading) {
      productsGetImportStatuses()
    }
  }, [])

  useEffect(() => {
    if (errors) {
      setCurrentLastPage(lastPageErrors)
    } else {
      setCurrentLastPage(lastPageTasks)
    }
  }, [errors, lastPageTasks, lastPageErrors])

  const handleRefresh = useCallback(
    id => {
      productsGetImportStatus(id)
    },
    [productsGetImportStatus]
  )

  const handleOnCardClick = useCallback(errorsTask => {
    setErrors(errorsTask)
    setCurrentPage(1)
    setPaginationSize(10)
  }, [])

  const renderErrorsList = useCallback((renderedErrors, page, currPaginationSize) => {
    return (
      renderedErrors &&
      renderedErrors.length &&
      renderedErrors.slice(currPaginationSize * (page - 1), currPaginationSize * page).map((error, index) => {
        const isString = typeof error === 'string'
        const errorName = !isString && Object.keys(error)[0].toLocaleUpperCase()
        return (
          <CardImport
            /* eslint-disable-next-line react/no-array-index-key */
            key={`error-${index}`}
            header={`${intl.get('importProducts.importStatus.error')} #${renderedErrors.length - index}`}
            mainInfo={[
              isString
                ? `${intl.get('importProducts.importStatus.line')}: ${error}`
                : `${intl.get('importProducts.importStatus.line')}: ${error.line}, ${intl.get(
                    'importProducts.importStatus.column'
                  )}: ${errorName}, ${intl.get('importProducts.importStatus.value')}: ${error[Object.keys(error)[0]]}`
            ]}
          />
        )
      })
    )
  }, [])

  const handleOnCancelClick = useCallback(() => {
    setErrors(null)
    setCurrentPage(1)
    setPaginationSize(10)
  }, [])

  return (
    <ST.Wrapper>
      <ST.MainHeader>
        {`${intl.get('importProducts.importWithCsv')}:`}
        &nbsp;
        {intl.get('importProducts.importHistoryLabel')}
      </ST.MainHeader>
      <ST.SubHeader>{intl.get('importProducts.statusOrder')}</ST.SubHeader>
      {isImportLoading ? (
        <Loader />
      ) : (
        <>
          <TableHeaderOptions
            totalItems={totalErrorsCount || totalTasksCount}
            foundItemsLabel={
              errors ? intl.get('importProducts.importStatus.errors') : intl.get('importProducts.importStatus.tasks')
            }
            handleChangePaginationSize={size => setPaginationSize(size)}
            paginationSize={paginationSize}
            hasNotSort
          />
          {!!(importStatus && importStatus.tasks && importStatus.tasks.length) && (
            <>
              <ST.ListWrapper>
                {errors
                  ? renderErrorsList(errors, currentPage, paginationSize)
                  : importStatus &&
                    importStatus.tasks &&
                    importStatus.tasks.length &&
                    importStatus.tasks
                      .slice(paginationSize * (currentPage - 1), paginationSize * currentPage)
                      .map((item, index) => (
                        <ImportStatusCard
                          currentPage={currentPage}
                          paginationSize={paginationSize}
                          key={item.id}
                          item={item}
                          index={index}
                          handleRefresh={handleRefresh}
                          handleOnCardClick={handleOnCardClick}
                        />
                      ))}
              </ST.ListWrapper>
              {!isImportLoading && currentLastPage > 1 && (
                <CustomPagination
                  count={totalErrorsCount || totalTasksCount}
                  currentPaginationPage={currentPage}
                  lastPage={currentLastPage}
                  paginationSize={paginationSize}
                  handlePagination={page => setCurrentPage(page)}
                />
              )}
              {errors && (
                <ST.ButtonsWrapper>
                  <Button size='large' onClick={handleOnCancelClick}>
                    {intl.get('importProducts.mapping.back')}
                  </Button>
                </ST.ButtonsWrapper>
              )}
            </>
          )}
        </>
      )}
    </ST.Wrapper>
  )
}

ProductImportStatus.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  importStatus: PropTypes.object,
  isImportLoading: PropTypes.bool,
  productsGetImportStatus: PropTypes.func.isRequired,
  productsGetImportStatuses: PropTypes.func.isRequired
}

ProductImportStatus.defaultProps = {
  importStatus: null,
  isImportLoading: false
}

export default ProductImportStatus
