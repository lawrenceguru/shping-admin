import React, { useCallback, useEffect, useMemo, useState } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import TableField from '../TableField'

const productsFieldColumns = [
  {
    title: intl.get('todo.deliveries.form.productsHeader2'),
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: intl.get('todo.deliveries.form.productsHeader1'),
    dataIndex: 'barcode',
    key: 'barcode'
  }
]

const threshold = 10

const ProductsTableField = ({
  products,
  getProductsList,
  unregister,
  register,
  setValue,
  name,
  isLoadingProductsList,
  values,
  count,
  disabled
}) => {
  const [filters, setFilters] = useState(null)
  const [order, setOrder] = useState(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [productsCardsFieldData, setProductsCardsFieldData] = useState([])
  const [isFilterOrOrder, setIsFilterOrOrder] = useState(false)
  const [totalItemsBeforeFilters, setTotalItemsBeforeFilters] = useState(0)

  const rowSelection = useMemo(() => {
    return {
      onChange: (rowKeys, currSelectedRows) => {
        setSelectedRowKeys([...rowKeys])
        setSelectedRows(currSelectedRows.map(item => item.barcode))
      },
      selectedRowKeys
    }
  }, [selectedRowKeys])

  const optionsForSortProducts = useMemo(() => {
    return productsFieldColumns && productsFieldColumns.map(item => ({ title: item.key, dataIndex: item.key }))
  }, [productsFieldColumns])

  const optionsForFilters = useMemo(() => {
    return productsFieldColumns && productsFieldColumns.map(item => item.key)
  }, [productsFieldColumns])

  const totalItemsProducts = useMemo(() => {
    return productsCardsFieldData && productsCardsFieldData.length
  }, [productsCardsFieldData])

  const hasMore = useMemo(() => {
    return totalItemsProducts && totalItemsProducts < count
  }, [totalItemsProducts, count])

  const defaultFilterState = useMemo(() => {
    const defaultState = {}
    if (productsFieldColumns && productsFieldColumns.length > 0) {
      productsFieldColumns.forEach(item => {
        defaultState[item.key] = { value: '', option: true }
      })
    }

    return defaultState
  }, [productsFieldColumns])

  useEffect(() => {
    getProductsList({
      paginationSize: threshold
    })
  }, [])

  useEffect(() => {
    if (values.products && values.products.length && values.products.length > selectedRows.length) {
      const copiedProducts = [...values.products]
      copiedProducts.forEach((product, index) => {
        if (selectedRows[index]) {
          register({ name: `products[${index}]` })
          setValue(`products[${index}]`, selectedRows[index])
        } else {
          unregister(`products[${index}]`)
        }
      })
      setValue('products', [])
    } else {
      selectedRows.forEach((item, index) => {
        register({ name: `products[${index}]` })
        setValue(`products[${index}]`, item)
      })
    }
  }, [selectedRows])

  useEffect(() => {
    if (values.products && values.products.length) {
      const selectedKeys = []
      values.products.forEach(item => {
        const selectedKey = productsCardsFieldData
          .filter(element => element.barcode === item)
          .map(element => element.key)
        if (item.length) {
          selectedKeys.push(selectedKey[0])
        }
      })
      setSelectedRowKeys(selectedKeys)
      setSelectedRows([...values.products])
    }
  }, [productsCardsFieldData])

  const getProductsItems = useCallback(() => {
    let index = -1
    if (productsCardsFieldData && productsCardsFieldData.length && !isFilterOrOrder) {
      index = productsCardsFieldData[productsCardsFieldData.length - 1].key
    }
    return products.map(item => {
      return {
        key: (index += 1),
        name: item.name,
        barcode: item.id
      }
    })
  }, [products])

  useEffect(() => {
    if (isFilterOrOrder) {
      setProductsCardsFieldData(getProductsItems())
    } else {
      setProductsCardsFieldData(productsCardsFieldData.concat(getProductsItems()))
    }
  }, [products])

  const handleInfiniteOnLoad = useCallback(() => {
    setIsFilterOrOrder(false)
    getProductsList({
      skip: totalItemsProducts,
      filters,
      order,
      paginationSize: threshold
    })
  }, [totalItemsProducts, getProductsList])

  const setCurrItemsProductsForSort = useCallback(
    sortBy => {
      setIsFilterOrOrder(true)
      let sortParam = sortBy
      if (sortBy === 'barcode') {
        sortParam = 'id'
      }
      setOrder(`${sortParam}-asc`)
      getProductsList({
        paginationSize: totalItemsProducts,
        filters,
        order: `${sortParam}-asc`
      })
    },
    [totalItemsProducts]
  )

  const setDefaultItemsProducts = useCallback(() => {
    setIsFilterOrOrder(true)
    setOrder(null)
    getProductsList({
      paginationSize: totalItemsProducts,
      filters,
      order: null
    })
  }, [getProductsItems, totalItemsProducts])

  const handleFilter = useCallback(
    filterValues => {
      const responseFilters = { ...filterValues }
      let paginationSize = totalItemsBeforeFilters

      if (totalItemsProducts > totalItemsBeforeFilters) {
        setTotalItemsBeforeFilters(totalItemsProducts)
        paginationSize = totalItemsProducts
      }
      if (responseFilters && responseFilters.barcode) {
        responseFilters.id = { ...responseFilters.barcode }
        delete responseFilters.barcode
      }

      setIsFilterOrOrder(true)
      setFilters(responseFilters)
      getProductsList({
        paginationSize,
        filters: responseFilters,
        order
      })
    },
    [getProductsList, totalItemsProducts]
  )

  const customHandleOnRowClick = useCallback(
    record => {
      if (!record || record.key === undefined) {
        return
      }
      if (selectedRowKeys.indexOf(record.key) === -1) {
        setSelectedRowKeys(prevState => [...prevState, record.key])
        setSelectedRows(prevState => [...prevState, record.barcode])
      } else {
        setSelectedRowKeys(selectedRowKeys.filter(key => key !== record.key))
        setSelectedRows(selectedRows.filter(barcode => barcode !== record.barcode))
      }
    },
    [selectedRowKeys]
  )

  return (
    <TableField
      dataSource={productsCardsFieldData}
      columns={productsFieldColumns}
      unregister={unregister}
      setValue={setValue}
      register={register}
      name={name}
      setDefaultSort={setDefaultItemsProducts}
      options={optionsForSortProducts}
      totalItems={totalItemsProducts}
      loading={isLoadingProductsList}
      itemsForSort={productsCardsFieldData}
      defaultFiltersState={defaultFilterState}
      filterOptions={optionsForFilters}
      handleFilter={handleFilter}
      requiredField='barcode'
      customHandleSort={setCurrItemsProductsForSort}
      customHandleOnRowClick={customHandleOnRowClick}
      rowSelection={rowSelection}
      handleInfiniteOnLoad={handleInfiniteOnLoad}
      hasMore={!!hasMore}
      disabled={disabled}
    />
  )
}

ProductsTableField.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  unregister: PropTypes.func.isRequired,
  isLoadingProductsList: PropTypes.bool,
  getProductsList: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object.isRequired,
  count: PropTypes.number,
  disabled: PropTypes.bool
}

ProductsTableField.defaultProps = {
  products: [],
  isLoadingProductsList: false,
  count: 0,
  disabled: false
}

export default ProductsTableField
