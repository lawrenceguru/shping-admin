import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import CustomTable from '../../../molecules/Table'
import CustomPagination from '../../../atoms/CustomPagination'
import { columns } from './consts'
import TableHeaderOptions from '../../../atoms/TableHeaderOptions'
import SerializationStepsHeader from '../../../atoms/SerializationStepsHeader'
import AdvancedFiltersPanel from '../../AdvancedFiltersPanel/AdvancedFiltersPanel'
import { AssignWrapper } from './styles'

const Assign = ({
  supplyParticipantsLocations,
  getParticipantLocation,
  countries,
  settingsGetCountries,
  isSupplyParticipantsLocationLoading,
  values,
  setIsSubmit,
  triggerValidation,
  setValue,
  handleNextStep,
  register,
  setError,
  clearError,
  participantGetSupplyParticipants,
  supplyParticipants
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationSize, setPaginationSize] = useState(10)
  const [currItems, setCurrItems] = useState(null)
  const [filterValues, setFilterValues] = useState(null)

  useEffect(() => {
    register({ name: 'location' })
    register({ name: 'allLocations' })
  }, [register])

  const validationFieldValue = () => {
    if (values && values.location) {
      clearError('location')
      return values.location
    }
    setError('location', 'notMatch', intl.get('validation.requiredField'))
    return null
  }

  useEffect(() => {
    getParticipantLocation()
    validationFieldValue()
    participantGetSupplyParticipants({
      skip: 0,
      take: 100
    })
    if (!countries || !countries.length) {
      settingsGetCountries()
    }
  }, [])

  const handleChangePagination = page => {
    setCurrentPage(page)
  }

  const handleChangePaginationSize = value => {
    setCurrentPage(1)
    setPaginationSize(value)
  }

  const allItems = useMemo(() => {
    let allLocations = []

    // eslint-disable-next-line consistent-return
    supplyParticipantsLocations.forEach(el => {
      const currParticipant = supplyParticipants.find(part => part.id === el.id)
      if (el.business_locations && el.business_locations.length) {
        const newParticipantLocation = el.business_locations.map(loc => {
          return { ...loc, external_id: currParticipant && currParticipant.external_id }
        })
        return (allLocations = [...allLocations, ...newParticipantLocation])
      }
    })
    setValue('allLocations', allLocations)
    return allLocations
  }, [supplyParticipantsLocations, supplyParticipants])

  const setItems = () => {
    const newItems = allItems.map(el => ({
      ...el,
      country: countries && countries.length && countries.find(item => item.iso === el.country).name
    }))
    setCurrItems(newItems)
  }

  const setLocationsWithFilters = () => {
    let filteredLocation = allItems
    if (filterValues && Object.keys(filterValues).length !== 0) {
      Object.keys(filterValues).forEach(el => {
        const filterField = filterValues[el]
        const regExValue = new RegExp(filterField.value, 'gi')
        const isMatch = filterField && (filterField.value || filterField.option)

        filteredLocation =
          filteredLocation &&
          filteredLocation.filter(loc => (loc[el] && isMatch ? loc[el].match(regExValue) : !loc[el].match(regExValue)))
      })
    }

    const newFilteredLocation = filteredLocation.map(el => ({
      ...el,
      country: countries && countries.length && countries.find(item => item.iso === el.country).name
    }))

    setCurrItems(newFilteredLocation || null)
  }

  useEffect(() => {
    setLocationsWithFilters()
  }, [allItems, filterValues])

  useEffect(() => {
    setItems()
  }, [supplyParticipantsLocations])

  const totalItems = useMemo(() => {
    return currItems && currItems.length
  }, [currItems])

  const lastPage = useMemo(() => Math.ceil(totalItems / paginationSize), [totalItems, paginationSize])

  const setDefaultSort = () => {
    setItems()
  }

  const slicedDataForTable = useMemo(() => {
    return (
      currItems &&
      currItems.slice((currentPage - 1) * paginationSize, (currentPage - 1) * paginationSize + paginationSize)
    )
  }, [currItems, currentPage, paginationSize])

  const handleFilterProducts = userFilters => {
    setFilterValues(userFilters)
  }

  const getGap = actualValues => {
    if (actualValues && actualValues.serialization && actualValues.serialization.Update) {
      return 1
    }
    return 2
  }

  useEffect(() => {
    setIsSubmit({
      call: () =>
        new Promise(resolve => {
          triggerValidation().then(result => {
            if (result) {
              clearError('location')
              resolve()
            }
          })
        }),
      gap: getGap
    })
  }, [])

  const onRowClick = data => {
    setValue('location', data.id)
    handleNextStep()
  }

  const preparedColumns = columns
    .map(el => ({ ...el, columnName: el.title, fieldId: el.dataIndex }))
    .filter(el => el.fieldId !== 'actions')

  const preparedCountriesOptions = countries.map(el => ({ value: el.iso, label: el.name }))

  return (
    <AssignWrapper>
      <SerializationStepsHeader
        firstHeaderText={intl.get('serializationTasks.serializationStep.thirdStep.header')}
        secondHeaderText={intl.get('serializationTasks.serializationStep.thirdStep.subHeader')}
      />
      <AdvancedFiltersPanel
        handleFilterProducts={handleFilterProducts}
        columnsData={preparedColumns}
        options={preparedCountriesOptions}
        defaultInitialState={{ country: { value: [] } }}
        noEquals
      />
      <TableHeaderOptions
        totalItems={totalItems}
        foundItemsLabel={intl.get('supplyChainLocations.foundLocations')}
        optionsForSort={columns}
        itemsForSort={currItems}
        handleChangePaginationSize={handleChangePaginationSize}
        paginationSize={paginationSize}
        setCurrItemsForSort={items => setCurrItems(items)}
        setDefaultSort={setDefaultSort}
      />
      <CustomTable
        columns={columns}
        data={slicedDataForTable}
        loading={isSupplyParticipantsLocationLoading}
        rowKey='key'
        totalCounts={totalItems}
        onRowClick={onRowClick}
      />
      {!isSupplyParticipantsLocationLoading && (
        <CustomPagination
          count={totalItems}
          currentPaginationPage={currentPage}
          lastPage={lastPage}
          paginationSize={paginationSize}
          handlePagination={handleChangePagination}
        />
      )}
    </AssignWrapper>
  )
}

Assign.propTypes = {
  getParticipantLocation: PropTypes.func.isRequired,
  isSupplyParticipantsLocationLoading: PropTypes.bool,
  countries: PropTypes.arrayOf(PropTypes.object),
  settingsGetCountries: PropTypes.func.isRequired,
  supplyParticipantsLocations: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object.isRequired,
  setIsSubmit: PropTypes.func.isRequired,
  triggerValidation: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  handleNextStep: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  participantGetSupplyParticipants: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  supplyParticipants: PropTypes.array
}

Assign.defaultProps = {
  countries: [],
  supplyParticipantsLocations: [],
  isSupplyParticipantsLocationLoading: false,
  supplyParticipants: []
}

export default Assign
