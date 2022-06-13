import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import Loader from '../../templates/Loader'
import CustomPagination from '../../atoms/CustomPagination'
import AdvancedFiltersPanel from '../AdvancedFiltersPanel'
import ProductCatalogueCard from '../../atoms/ProductCatalogueCard'
import deleteModal from '../../molecules/DeleteModal'
import * as ST from './styles'
import CustomButton from '../../molecules/Button'
import IconButton from '../../molecules/IconButton'
import SortBy from '../../atoms/SortBy'
import ConfigureFieldsButton from '../../atoms/ConfigureFieldsButton'
import FoundItems from '../../atoms/FoundItems'
import NumberOfElementsPerPage from '../../atoms/NumberOfElementsPerPage'
import { getModifiedFields } from '../../../utils/serializationProducts'

const advancedFieldsNamesInLocalStorage = 'serializedAdvancedOptionsConfiguration'

const ProductTable = ({
  getProductsList,
  products,
  count,
  isLoadingProductsList,
  isDeletingGtin,
  customIndexFields,
  defaultIndexFields,
  deleteGtin,
  brands,
  history,
  indexFieldsProductsGetIndexInfo,
  showAddButton,
  hiddenFields,
  showBrands,
  isDeleteIconExist,
  showPreviewOnClick,
  showDatamatrix,
  showConfigurableButton,
  participants,
  currentParticipant,
  location,
  indexFieldsProductsGetBrands,
  startFilterByDate,
  showIndexFields,
  isProductPage,
  isHaveImport,
  orderState,
  serializedProductsSetProductsOrder
}) => {
  const [paginationSize, setPaginationSize] = useState(10)
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1)
  const [skip, setSkip] = useState(0)
  const [filters, setFilters] = useState(null)
  const [order, setOrder] = useState(isProductPage ? null : orderState)
  const [orderPostfix, setOrderPostfix] = useState('-desc')
  const [indexedFields, setIndexedFields] = useState([])
  const [advancedOptions, setAdvancedOptions] = useState([])

  const lastPage = useMemo(() => Math.ceil(count / paginationSize), [count, paginationSize])
  const filterOptions = useMemo(() => {
    return isProductPage ? customIndexFields : advancedOptions.filter(f => !f.isDisabled)
  }, [isProductPage, customIndexFields, advancedOptions])

  const sortedOptions = useMemo(
    () =>
      [
        {
          fieldName: intl.get('tableSettings.dontSort'),
          columnName: intl.get('tableSettings.dontSort'),
          fieldId: 'Do not sort'
        },
        ...defaultIndexFields,
        ...customIndexFields,
        { fieldName: 'GTIN', columnName: 'GTIN', fieldId: 'id' },
        {
          fieldName: intl.get('tableSettings.name'),
          columnName: intl.get('tableSettings.name'),
          fieldId: 'name'
        }
      ]
        .filter(el => !['datamatrix_code'].includes(el.fieldId))
        .map((field, index) => {
          return {
            title: field.columnName,
            value: field.fieldName,
            customFieldId: `${field.fieldId}-${index}`,
            fieldId: field.fieldId
          }
        }),
    [defaultIndexFields, customIndexFields]
  )

  const getTableData = () => {
    if (location && location.state) {
      setFilters(location.state)
      getProductsList({
        skip: skip.toString(),
        paginationSize: paginationSize.toString(),
        order: order ? order.toString() : null,
        filters: location.state
      })
    } else {
      getProductsList({
        skip: skip.toString(),
        paginationSize: paginationSize.toString(),
        order: order ? order.toString() : null,
        filters
      })
    }
  }

  const fieldNameInLocalStorage = useMemo(
    () => (isProductPage ? currentParticipant : 'serializedFieldsConfiguration'),
    [isProductPage]
  )

  const getInitialInformation = () => {
    let currentFields
    let currentAdvancedOptions

    try {
      currentFields = JSON.parse(localStorage.getItem(fieldNameInLocalStorage))
      currentAdvancedOptions = isProductPage ? [] : JSON.parse(localStorage.getItem(advancedFieldsNamesInLocalStorage))
    } catch (e) {
      console.log('Parse error', e)
    }

    if (!currentFields) {
      currentFields =
        (defaultIndexFields && defaultIndexFields.length) || (customIndexFields && customIndexFields.length)
          ? [...defaultIndexFields, ...customIndexFields]
          : []
    }

    if (!isProductPage && !currentAdvancedOptions) {
      currentAdvancedOptions =
        (defaultIndexFields && defaultIndexFields.length) || (customIndexFields && customIndexFields.length)
          ? [...defaultIndexFields, ...customIndexFields]
          : []
    }

    setIndexedFields(currentFields)
    setAdvancedOptions(getModifiedFields(defaultIndexFields, customIndexFields, currentAdvancedOptions))
  }

  useEffect(() => {
    if (showDatamatrix || showIndexFields) {
      getInitialInformation()
    }
  }, [defaultIndexFields, customIndexFields])

  const handleDeleteGtin = id => {
    deleteGtin({
      id,
      skip: skip.toString(),
      paginationSize: paginationSize.toString(),
      order: order ? order.toString() : null,
      filters
    })
  }

  const handleChangePaginationSize = value => {
    setCurrentPaginationPage(1)
    setPaginationSize(value)
    setSkip(0)
    getProductsList({ skip: '0', paginationSize: value.toString(), order: order ? order.toString() : null, filters })
  }

  const handlePagination = value => {
    setCurrentPaginationPage(value)
    setSkip(paginationSize * (value - 1))
    getProductsList({
      skip: (paginationSize * (value - 1)).toString(),
      paginationSize: paginationSize.toString(),
      order: order ? order.toString() : null,
      filters
    })
  }

  const handleSortProducts = (sortBy, postfix) => {
    if (sortBy !== 'Do not sort') {
      const newOrder = `${sortBy}${postfix || orderPostfix}`
      setOrder(newOrder)
      getProductsList({
        skip: skip.toString(),
        paginationSize: paginationSize.toString(),
        order: newOrder,
        filters
      })
      if (!isProductPage) {
        serializedProductsSetProductsOrder(newOrder)
      }
    } else {
      setOrder(null)
      getProductsList({
        skip: skip.toString(),
        paginationSize: paginationSize.toString(),
        filters
      })
      if (!isProductPage) {
        serializedProductsSetProductsOrder(null)
      }
    }
  }

  const handleFilterProducts = userFilters => {
    setFilters(userFilters)
    setSkip(0)
    setCurrentPaginationPage(1)
    getProductsList({
      skip: 0,
      paginationSize: paginationSize.toString(),
      filters: userFilters,
      order
    })
  }

  const getOrderWithoutPostfix = useCallback((currOrder, isSetOrderPostfix = true) => {
    const partsOfOrder = currOrder.split('-')
    if (isSetOrderPostfix) {
      setOrderPostfix(`-${partsOfOrder[1]}`)
    }

    return {
      order: partsOfOrder[0],
      postfix: partsOfOrder[1] && `-${partsOfOrder[1]}`
    }
  }, [])

  const getOrderLabel = useCallback(
    currOrder => {
      const orderWithoutPostfix = getOrderWithoutPostfix(currOrder, false)
      const orderOption = sortedOptions.find(option => option.value === orderWithoutPostfix.order)
      return orderOption ? orderOption.title : orderWithoutPostfix.order
    },
    [sortedOptions]
  )

  useEffect(() => {
    getTableData()
    indexFieldsProductsGetBrands()
    if (showDatamatrix) {
      getInitialInformation()
    }

    if (startFilterByDate) {
      const currOrder = order ? getOrderWithoutPostfix(order) : { order: 'date_created' }
      handleSortProducts(currOrder.order, currOrder.postfix)
    }
  }, [])

  const handleOnClickImport = useCallback(() => {
    history.push('/admin/products/catalogue/import')
  }, [history])

  const handleOnClickImportStatus = useCallback(() => {
    history.push('/admin/products/catalogue/import-status')
  }, [history])

  const handleChangeOrder = useCallback(
    newOrder => {
      if (order && order !== 'Do not sort') {
        const firstOrder = order.split('-')
        const finalOrder = `${firstOrder[0]}${newOrder}`
        setOrder(finalOrder)

        getProductsList({
          skip: skip.toString(),
          paginationSize: paginationSize.toString(),
          order: finalOrder,
          filters
        })

        serializedProductsSetProductsOrder(finalOrder)
      }

      setOrderPostfix(newOrder)
    },
    [order, filters, paginationSize, skip]
  )

  return (
    <ST.Wrapper>
      <AdvancedFiltersPanel
        handleFilterProducts={handleFilterProducts}
        customIndexFields={filterOptions}
        defaultIndexFields={isProductPage ? defaultIndexFields : []}
        brands={brands}
        hiddenFields={hiddenFields}
        showBrands={showBrands}
        indexFieldsProductsGetIndexInfo={indexFieldsProductsGetIndexInfo}
        currentParticipant={currentParticipant}
        isProductPage={isProductPage}
      />
      <ST.StyledPanelContainer>
        <ST.ActionsWrapper>
          <FoundItems count={count} text={intl.get('serializedProductsPage.foundProducts')} />
          {showConfigurableButton && (
            <ConfigureFieldsButton
              fieldNameInLocalStorage={fieldNameInLocalStorage}
              hiddenFields={hiddenFields}
              indexedFields={indexedFields}
              setIndexedFields={setIndexedFields}
              currentParticipant={currentParticipant}
              isProductPage={isProductPage}
            />
          )}
          {!isProductPage && (
            <ConfigureFieldsButton
              fieldNameInLocalStorage={advancedFieldsNamesInLocalStorage}
              hiddenFields={hiddenFields}
              indexedFields={advancedOptions}
              setIndexedFields={setAdvancedOptions}
              currentParticipant={currentParticipant}
              isProductPage={isProductPage}
              isAdvancedOptionsConfigurate
            />
          )}
          {isHaveImport ? (
            <>
              <IconButton
                type='Download'
                actionFunction={handleOnClickImport}
                styleParam={{ fontSize: 24, marginLeft: 10 }}
                popText={intl.get('serializedProductsPage.import')}
              />
              <IconButton
                type='InfoCircle'
                actionFunction={handleOnClickImportStatus}
                styleParam={{ fontSize: 24, marginLeft: 10 }}
                popText={intl.get('importProducts.importHistoryLabel')}
              />
            </>
          ) : null}
        </ST.ActionsWrapper>
        {count ? (
          <ST.StyledSelectsContainer>
            <SortBy
              orderPostfix={orderPostfix}
              isHaveOrderIcon={!isProductPage}
              handleChangeOrder={handleChangeOrder}
              defaultValue={
                startFilterByDate
                  ? (order && getOrderLabel(order)) || intl.get('serializedProductsPage.dateCreated')
                  : intl.get('tableSettings.dontSort')
              }
              handleSort={handleSortProducts}
              style={{ width: 200, marginRight: 20 }}
              order={order}
              sortedOptions={sortedOptions}
            />
            <NumberOfElementsPerPage
              paginationSize={paginationSize}
              handleChangePaginationSize={handleChangePaginationSize}
            />
          </ST.StyledSelectsContainer>
        ) : null}
      </ST.StyledPanelContainer>
      <ST.StyledTableContainer>
        {isLoadingProductsList || isDeletingGtin ? (
          <ST.LoaderContainer>
            <Loader />
          </ST.LoaderContainer>
        ) : (
          <>
            <ProductCatalogueCard
              products={products}
              visibleFields={indexedFields.filter(f => !f.isDisabled).map(({ fieldId }) => fieldId)}
              fields={indexedFields}
              showConfirm={id => deleteModal(() => handleDeleteGtin(id), `Are you sure delete ${id} GTIN`)}
              isLoadingProductsList={isLoadingProductsList}
              isDeletingGtin={isDeletingGtin}
              hiddenFields={hiddenFields}
              isDeleteIconExist={isDeleteIconExist}
              showPreviewOnClick={showPreviewOnClick}
              showDatamatrix={showDatamatrix}
              participants={participants}
              isProductPage={isProductPage}
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
      {showAddButton && (
        <CustomButton
          text={intl.get('productCatalogue.addProduct')}
          position='fixed'
          bottom='20px'
          right='45px'
          height='50px'
          fontSize='18px'
          handleClick={() => history.push(`/admin/products/catalogue/add-product`)}
        >
          <IconButton type='Add' styleParam={{ marginRight: 8, color: '#fff' }} />
        </CustomButton>
      )}
    </ST.Wrapper>
  )
}

ProductTable.propTypes = {
  getProductsList: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.object),
  isLoadingProductsList: PropTypes.bool,
  count: PropTypes.number,
  isDeletingGtin: PropTypes.bool,
  customIndexFields: PropTypes.arrayOf(PropTypes.object),
  defaultIndexFields: PropTypes.arrayOf(PropTypes.object),
  deleteGtin: PropTypes.func,
  brands: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  indexFieldsProductsGetIndexInfo: PropTypes.func.isRequired,
  showAddButton: PropTypes.bool,
  hiddenFields: PropTypes.arrayOf(PropTypes.string),
  showBrands: PropTypes.bool,
  isDeleteIconExist: PropTypes.bool,
  showPreviewOnClick: PropTypes.bool,
  showDatamatrix: PropTypes.bool,
  showConfigurableButton: PropTypes.bool,
  participants: PropTypes.arrayOf(PropTypes.object),
  currentParticipant: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
  indexFieldsProductsGetBrands: PropTypes.func.isRequired,
  startFilterByDate: PropTypes.bool,
  isProductPage: PropTypes.bool,
  showIndexFields: PropTypes.bool,
  isHaveImport: PropTypes.bool,
  orderState: PropTypes.string,
  serializedProductsSetProductsOrder: PropTypes.func
}

ProductTable.defaultProps = {
  isLoadingProductsList: false,
  customIndexFields: [],
  defaultIndexFields: [],
  isDeletingGtin: false,
  products: [],
  brands: [],
  count: 0,
  showAddButton: false,
  hiddenFields: [],
  showBrands: false,
  isDeleteIconExist: false,
  showPreviewOnClick: false,
  showDatamatrix: false,
  showConfigurableButton: false,
  participants: [],
  currentParticipant: null,
  deleteGtin: null,
  startFilterByDate: false,
  isProductPage: false,
  showIndexFields: false,
  isHaveImport: false,
  orderState: null,
  serializedProductsSetProductsOrder: null
}

export default ProductTable
