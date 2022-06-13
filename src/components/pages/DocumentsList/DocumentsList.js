import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { withRouter } from 'react-router-dom'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import * as ST from './styles'
import AdvancedFiltersPanel from '../../organisms/AdvancedFiltersPanel'
import FoundItems from '../../atoms/FoundItems'
import ConfigureFieldsButton from '../../atoms/ConfigureFieldsButton'
import SortBy from '../../atoms/SortBy'
import NumberOfElementsPerPage from '../../atoms/NumberOfElementsPerPage'
import Loader from '../../templates/Loader'
import CustomPagination from '../../atoms/CustomPagination'
import DocumentCard from '../../atoms/DocumentCard'
import deleteModal from '../../molecules/DeleteModal'
import Button from '../../atoms/Button'

const fieldNameInLocalStorage = 'documentsFieldsConfiguration'

const DocumentsList = ({
  documents,
  deleteGdti,
  documentsGetDocuments,
  isLoading,
  count,
  deletedId,
  participants,
  customIndexFields,
  indexFieldsDocumentsGetIndexInfo,
  history
}) => {
  const [paginationSize, setPaginationSize] = useState(10)
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1)
  const [skip, setSkip] = useState(0)
  const [filters, setFilters] = useState(null)
  const [order, setOrder] = useState(null)
  const [indexedFields, setIndexedFields] = useState([])
  const lastPage = useMemo(() => Math.ceil(count / paginationSize), [count, paginationSize])

  const sortedOptions = useMemo(
    () =>
      customIndexFields && customIndexFields.length
        ? [
            {
              fieldName: intl.get('tableSettings.dontSort'),
              columnName: intl.get('tableSettings.dontSort'),
              title: intl.get('tableSettings.dontSort'),
              fieldId: 'Do not sort',
              value: 'Do not sort'
            },
            ...[...customIndexFields]
              .filter(el => !['image'].includes(el.fieldName))
              .map(field => {
                return {
                  title: field.columnName,
                  value: field.fieldName,
                  customFieldId: `${field.fieldId}`,
                  fieldId: field.fieldName
                }
              })
          ]
        : [],
    [customIndexFields]
  )

  const filterOptions = useMemo(
    () =>
      customIndexFields && customIndexFields.length
        ? customIndexFields
            .filter(el => !['image', 'id'].includes(el.fieldName))
            .map(field => {
              return {
                ...field,
                fieldId: field.fieldName
              }
            })
        : [],
    [customIndexFields]
  )

  const getInitialInformation = useCallback(() => {
    let currentFields

    try {
      currentFields = JSON.parse(localStorage.getItem(fieldNameInLocalStorage))
    } catch (e) {
      console.log('Parse error', e)
    }

    if (!currentFields || !currentFields.length) {
      currentFields = customIndexFields && customIndexFields.length ? [...customIndexFields] : []
    }

    setIndexedFields(currentFields)
  }, [customIndexFields])

  useEffect(() => {
    getInitialInformation()
  }, [getInitialInformation])

  useEffect(() => {
    documentsGetDocuments({ skip: skip.toString(), paginationSize: paginationSize.toString() })
  }, [])

  const handleChangePaginationSize = useCallback(
    value => {
      setCurrentPaginationPage(1)
      setPaginationSize(value)
      setSkip(0)
      documentsGetDocuments({
        skip: '0',
        paginationSize: value.toString(),
        order: order ? order.toString() : null,
        filters
      })
    },
    [order, filters]
  )

  const handlePagination = useCallback(
    value => {
      setCurrentPaginationPage(value)
      setSkip(paginationSize * (value - 1))
      documentsGetDocuments({
        skip: (paginationSize * (value - 1)).toString(),
        paginationSize: paginationSize.toString(),
        order: order ? order.toString() : null,
        filters
      })
    },
    [filters, order, paginationSize]
  )

  const handleSortDocuments = useCallback(
    sortBy => {
      if (sortBy !== 'Do not sort') {
        setOrder(`${sortBy}-asc`)
        documentsGetDocuments({
          skip: skip.toString(),
          paginationSize: paginationSize.toString(),
          order: `${sortBy}-asc`,
          filters
        })
      } else {
        setOrder(null)
        documentsGetDocuments({
          skip: skip.toString(),
          paginationSize: paginationSize.toString(),
          filters
        })
      }
    },
    [filters, skip, paginationSize]
  )

  const handleFilterDocuments = useCallback(
    userFilters => {
      setCurrentPaginationPage(1)
      setSkip(0)
      setFilters(userFilters)
      documentsGetDocuments({
        skip: 0,
        paginationSize: paginationSize.toString(),
        filters: userFilters
      })
    },
    [skip, paginationSize]
  )

  const handleDeleteDocument = useCallback(
    id => {
      let title = ''
      const currDocument = documents.find(document => document.id === id)
      if (currDocument) {
        // eslint-disable-next-line prefer-destructuring
        title = currDocument.title
      }
      deleteGdti({
        id,
        skip: skip.toString(),
        paginationSize: paginationSize.toString(),
        order: order ? order.toString() : null,
        filters,
        title
      })
    },
    [filters, skip, paginationSize, order, documents]
  )

  const handleAddDocument = useCallback(() => {
    history.push(`/admin/documents/add-document`)
  }, [history])

  const handleOnCardClick = useCallback(
    id => {
      history.push(`/admin/documents/editor/${id}`)
    },
    [history]
  )

  return (
    <ST.Wrapper>
      <AdvancedFiltersPanel
        handleFilterProducts={handleFilterDocuments}
        customIndexFields={filterOptions}
        indexFieldsProductsGetIndexInfo={indexFieldsDocumentsGetIndexInfo}
        idPlaceholder='ID'
        hiddenAdvancedOptions={[]}
        headerOptions={['id']}
      >
        <ST.ExportButtonWrapper>
          <Button type='danger' size='large' onClick={handleAddDocument}>
            {intl.get('documents.add')}
          </Button>
        </ST.ExportButtonWrapper>
      </AdvancedFiltersPanel>
      <ST.StyledPanelContainer>
        <ST.ActionsWrapper>
          <FoundItems count={count || 0} />
          <ConfigureFieldsButton
            indexedFields={indexedFields}
            setIndexedFields={setIndexedFields}
            fieldNameInLocalStorage={fieldNameInLocalStorage}
          />
        </ST.ActionsWrapper>
        {count ? (
          <ST.StyledSelectsContainer>
            <SortBy
              defaultValue='Do not sort'
              handleSort={handleSortDocuments}
              style={{ width: 200, marginRight: 20 }}
              order={order}
              sortedOptions={sortedOptions}
              isAsc
            />
            <NumberOfElementsPerPage
              paginationSize={paginationSize}
              handleChangePaginationSize={handleChangePaginationSize}
            />
          </ST.StyledSelectsContainer>
        ) : null}
      </ST.StyledPanelContainer>
      <ST.StyledTableContainer>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <DocumentCard
              documents={documents}
              visibleFields={indexedFields.filter(f => !f.isDisabled).map(({ fieldId }) => fieldId)}
              participants={participants}
              fields={indexedFields}
              deletedId={deletedId}
              onClickCard={handleOnCardClick}
              showConfirm={id =>
                deleteModal(() => handleDeleteDocument(id), intl.get('documents.deleteMessage', { id }))
              }
            />
            {lastPage > 1 ? (
              <CustomPagination
                paginationSize={paginationSize}
                handlePagination={handlePagination}
                currentPaginationPage={currentPaginationPage}
                count={count}
                lastPage={lastPage}
              />
            ) : null}
          </>
        )}
      </ST.StyledTableContainer>
    </ST.Wrapper>
  )
}

DocumentsList.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.object),
  participants: PropTypes.arrayOf(PropTypes.object),
  deleteGdti: PropTypes.func.isRequired,
  documentsGetDocuments: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  count: PropTypes.number,
  deletedId: PropTypes.string,
  customIndexFields: PropTypes.arrayOf(PropTypes.object),
  indexFieldsDocumentsGetIndexInfo: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
}

DocumentsList.defaultProps = {
  documents: [],
  participants: null,
  count: 0,
  deletedId: null,
  customIndexFields: null,
  isLoading: false
}

export default withRouter(DocumentsList)
