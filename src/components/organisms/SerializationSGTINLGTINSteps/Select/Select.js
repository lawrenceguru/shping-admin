import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import intl from 'react-intl-universal'
import CustomTable from '../../../molecules/Table'
import CustomPagination from '../../../atoms/CustomPagination'
import { columns } from './consts'
import AdvancedFiltersPanel from '../../AdvancedFiltersPanel/AdvancedFiltersPanel'
import TableHeaderOptions from '../../../atoms/TableHeaderOptions'
import SerializationStepsHeader from '../../../atoms/SerializationStepsHeader'

const SelectWrapper = styled.div`
  .ant-table-thead > tr,
  .ant-table-tbody > tr:hover {
    cursor: pointer;
  }
`

const Select = ({
  serializationGetGtinSelect,
  allData,
  isLoading,
  totalItems,
  skip,
  take,
  indexFieldsProductsGetBrands,
  brands,
  setIsSubmit,
  handleNextStep,
  register,
  setValue,
  values,
  triggerValidation,
  setError,
  clearError
}) => {
  const [currTasks, setCurrTasks] = useState(null)

  const setTasks = () => {
    setCurrTasks(allData)
  }

  const validationFieldValue = () => {
    if (values && values.select && values.select.gtin) {
      clearError('select.gtin')
      return values.select.gtin
    }
    setError('select.gtin', 'notMatch', intl.get('validation.requiredField'))
    return null
  }

  const setDefaultSort = () => {
    setTasks()
  }

  useEffect(() => {
    setTasks()
  }, [allData])

  useEffect(() => {
    register({ name: 'select' })
    register({ name: 'serialization' })
  }, [register])

  useEffect(() => {
    serializationGetGtinSelect({ query: '', skip, take })
    validationFieldValue()
    indexFieldsProductsGetBrands()
  }, [])

  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState('')
  const lastPage = useMemo(() => Math.ceil(totalItems / take), [totalItems, take])

  const handleChangePagination = page => {
    if (filters) {
      serializationGetGtinSelect({ skip: (page - 1) * take, take, query: filters })
    } else {
      serializationGetGtinSelect({ skip: (page - 1) * take, take, include_scans: true, query: '' })
    }
    setCurrentPage(page)
  }

  const handleFilterProducts = userFilters => {
    setFilters(userFilters)
    serializationGetGtinSelect({ skip, take, query: userFilters })
  }

  useEffect(() => {
    setIsSubmit({
      call: () =>
        new Promise(resolve => {
          triggerValidation().then(result => {
            if (result) {
              clearError('select.gtin')
              resolve()
            }
          })
        })
    })
  }, [])

  const onRowClick = data => {
    const newValues = { ...values.select }
    newValues.gtin = data.id
    newValues.name = data.name
    setValue('select', newValues)
    handleNextStep()
  }

  return (
    <SelectWrapper>
      <SerializationStepsHeader
        firstHeaderText={intl.get('serializationTasks.serializationStep.firstStep.header')}
        secondHeaderText={intl.get('serializationTasks.serializationStep.firstStep.subHeader')}
      />
      <AdvancedFiltersPanel
        handleFilterProducts={handleFilterProducts}
        columnsData={columns}
        brands={brands}
        showBrands
      />
      <TableHeaderOptions
        totalItems={totalItems}
        foundItemsLabel='GTINs'
        optionsForSort={columns}
        itemsForSort={currTasks}
        setCurrItemsForSort={items => setCurrTasks(items)}
        setDefaultSort={setDefaultSort}
      />
      <CustomTable
        columns={columns}
        loading={isLoading}
        data={currTasks}
        rowKey='key'
        noScroll
        onRowClick={onRowClick}
      />
      {!isLoading && (
        <CustomPagination
          count={totalItems}
          currentPaginationPage={currentPage}
          lastPage={lastPage}
          paginationSize={take}
          handlePagination={handleChangePagination}
        />
      )}
    </SelectWrapper>
  )
}

Select.propTypes = {
  serializationGetGtinSelect: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  allData: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  totalItems: PropTypes.number.isRequired,
  skip: PropTypes.number,
  take: PropTypes.number,
  setIsSubmit: PropTypes.func.isRequired,
  handleNextStep: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  triggerValidation: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  brands: PropTypes.object,
  indexFieldsProductsGetBrands: PropTypes.func.isRequired
}

Select.defaultProps = {
  values: {},
  brands: {},
  take: 10,
  skip: 0
}

export default withRouter(Select)
