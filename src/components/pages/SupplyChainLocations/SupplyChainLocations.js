import React, { useEffect, useMemo, useState } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import CustomTable from '../../molecules/Table'
import deleteModal from '../../molecules/DeleteModal'
import IconButton from '../../molecules/IconButton'
import { subSiteType } from '../../../utils/consts'
import NoContent from '../../atoms/NoContent'
import Button from '../../atoms/Button'
import { NoContentWrapper, Wrapper, TableHeaderWrapper, CreateButtonWrapper, StyledSelectsContainer } from './styles'
import CustomPagination from '../../atoms/CustomPagination'
import FoundItems from '../../atoms/FoundItems'
import NumberOfElementsPerPage from '../../atoms/NumberOfElementsPerPage'
import AdvancedFiltersPanel from '../../organisms/AdvancedFiltersPanel/AdvancedFiltersPanel'
import SortBy from '../../atoms/SortBy'

const SupplyChainLocations = ({
  history,
  countries,
  selectedParticipantId,
  isSupplyParticipantsLocationLoading,
  supplyParticipantsLocations,
  deleteParticipantLocation,
  selectLocation
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationSize, setPaginationSize] = useState(10)
  const [filterValues, setFilterValues] = useState(null)
  const [filterLoading, setFilterLoading] = useState(false)
  const [currLocations, setCurrLocations] = useState(null)
  const [order, setOrder] = useState(null)

  const setLocationsWithFilters = () => {
    const locationsById = supplyParticipantsLocations.find(el => el.id === selectedParticipantId)

    let filteredLocation = locationsById && locationsById.business_locations
    if (filterValues && Object.keys(filterValues).length !== 0) {
      Object.keys(filterValues).forEach(el => {
        const filterField = filterValues[el]
        const regExValue = new RegExp(filterField.value, 'gi')
        const isMatch = filterField && filterField.option

        if (el === 'name') {
          filteredLocation =
            filteredLocation &&
            filteredLocation.filter(loc =>
              loc.name && isMatch ? loc.name.match(regExValue) : !loc.name.match(regExValue)
            )
        }

        if (el === 'sub_site_type') {
          filteredLocation =
            filteredLocation &&
            filteredLocation.filter(loc => {
              const currType = subSiteType.find(type => type.value === loc.sub_site_type)
              return isMatch ? currType.label.match(regExValue) : !currType.label.match(regExValue)
            })
        }

        if (el === 'address') {
          filteredLocation =
            filteredLocation &&
            filteredLocation.filter(loc => {
              const country = countries.find(count => count.iso === loc.country)
              return isMatch
                ? `${loc.address}, ${loc.city || null}, ${country ? country.name : null}`.match(regExValue)
                : !`${loc.address}, ${loc.city || null}, ${country ? country.name : null}`.match(regExValue)
            })
        }
      })
    }
    setFilterLoading(false)
    setCurrLocations({ ...locationsById, business_locations: filteredLocation } || null)
  }

  useEffect(() => {
    setLocationsWithFilters()
  }, [selectedParticipantId, supplyParticipantsLocations, filterValues])

  const deleteLocation = (id, name) => {
    deleteParticipantLocation({ id, name })
  }

  const onRowClick = data => {
    selectLocation(data)
    history.push('/admin/track-and-trace/supply-chain/location-editor')
  }

  const columns = useMemo(() => {
    return [
      {
        title: intl.get('supplyChainLocations.name'),
        dataIndex: 'name',
        rowKey: 'name'
      },
      {
        title: intl.get('supplyChainLocations.address'),
        dataIndex: 'address',
        rowKey: 'address',
        render: (i, data) => {
          const country = countries.find(el => el.iso === data.country)
          return `${i}, ${data.city || null}, ${country ? country.name : null}`
        }
      },
      {
        title: intl.get('supplyChainLocations.type'),
        dataIndex: 'sub_site_type',
        rowKey: 'sub_site_type',
        render: i => {
          const currType = subSiteType.find(el => el.value === i)
          return (currType && currType.label) || null
        }
      },
      {
        dataIndex: 'action',
        rowKey: 'action',
        render: (i, data) => {
          return (
            <IconButton
              type='Delete'
              styleParam={{ fontSize: 19 }}
              actionFunction={e => {
                e.stopPropagation()
                e.preventDefault()
                deleteModal(
                  () => deleteLocation(data.id, data.name),
                  intl.get('supplyChainLocations.delete', { name: data.name })
                )
              }}
            />
          )
        }
      }
    ]
  }, [supplyParticipantsLocations])

  const totalItems = useMemo(() => {
    return (currLocations && currLocations.business_locations.length) || null
  }, [currLocations])

  const lastPage = useMemo(() => Math.ceil(totalItems / paginationSize), [totalItems, paginationSize])

  const handleChangePagination = page => {
    setCurrentPage(page)
  }

  const handleChangePaginationSize = value => {
    setCurrentPage(1)
    setPaginationSize(value)
  }

  const slicedDataForTable = useMemo(() => {
    return (
      currLocations &&
      currLocations.business_locations &&
      currLocations.business_locations.slice(
        (currentPage - 1) * paginationSize,
        (currentPage - 1) * paginationSize + paginationSize
      )
    )
  }, [currLocations, currentPage, paginationSize])

  const handleFilterLocation = data => {
    setFilterLoading(true)
    setFilterValues(data)
  }

  const preparedColumns = useMemo(
    () =>
      columns
        .filter(el => el.dataIndex !== 'action')
        .map(el => ({ ...el, columnName: el.title, fieldId: el.dataIndex })),
    [columns]
  )

  const sortOptions = useMemo(
    () =>
      [...preparedColumns, { title: intl.get('tableSettings.dontSort'), dataIndex: 'Do not sort' }].map(
        (field, index) => {
          return {
            title: field.title,
            value: field.dataIndex,
            customFieldId: `${field.dataIndex}-${index}`,
            fieldId: field.dataIndex
          }
        }
      ),
    [preparedColumns]
  )

  const sort = (a, b) => {
    if (a < b) {
      return -1
    }
    if (a > b) {
      return 1
    }
    return 0
  }

  const handleSortProducts = sortBy => {
    if (sortBy !== 'Do not sort') {
      setOrder(`${sortBy}-desc`)
      if (currLocations && currLocations.business_locations) {
        const copyCurrLocations = [...currLocations.business_locations]

        copyCurrLocations.sort((a, b) => {
          if (sortBy === 'sub_site_type') {
            const currTypeA = subSiteType.find(el => el.value === a[sortBy])
            const currTypeB = subSiteType.find(el => el.value === b[sortBy])
            return sort(currTypeA.label, currTypeB.label)
          }
          return sort(a[sortBy], b[sortBy])
        })
        setCurrLocations({ ...currLocations, business_locations: copyCurrLocations })
      }
    } else {
      setOrder(null)
      setLocationsWithFilters()
    }
  }

  return (
    <Wrapper>
      <AdvancedFiltersPanel handleFilterProducts={handleFilterLocation} columnsData={preparedColumns}>
        <CreateButtonWrapper>
          <Button
            type='danger'
            size='large'
            onClick={() => history.push('/admin/track-and-trace/supply-chain/location-editor')}
          >
            {intl.get('supplyChainLocations.createLocationTitle')}
          </Button>
        </CreateButtonWrapper>
      </AdvancedFiltersPanel>
      {currLocations && currLocations.business_locations && currLocations.business_locations.length ? (
        <>
          <TableHeaderWrapper>
            <FoundItems count={totalItems} text={intl.get('supplyChainLocations.foundLocations')} />
            {totalItems ? (
              <StyledSelectsContainer>
                <SortBy
                  defaultValue='Do not sort'
                  handleSort={handleSortProducts}
                  style={{ width: 200, marginRight: 20 }}
                  order={order}
                  sortedOptions={sortOptions}
                />
                <NumberOfElementsPerPage
                  paginationSize={paginationSize}
                  handleChangePaginationSize={handleChangePaginationSize}
                />
              </StyledSelectsContainer>
            ) : null}
          </TableHeaderWrapper>
          <CustomTable
            columns={columns}
            data={slicedDataForTable}
            loading={isSupplyParticipantsLocationLoading || filterLoading}
            totalCounts={totalItems}
            onRowClick={onRowClick}
          />
          {!isSupplyParticipantsLocationLoading && !filterLoading && (
            <CustomPagination
              count={totalItems}
              currentPaginationPage={currentPage}
              lastPage={lastPage}
              paginationSize={paginationSize}
              handlePagination={handleChangePagination}
            />
          )}
        </>
      ) : (
        <NoContentWrapper>
          <NoContent text={intl.get('supplyChainLocations.noLocations')} fontSize='25px' iconFontSize='35px' />
        </NoContentWrapper>
      )}
    </Wrapper>
  )
}

SupplyChainLocations.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  countries: PropTypes.arrayOf(PropTypes.object),
  selectedParticipantId: PropTypes.string.isRequired,
  isSupplyParticipantsLocationLoading: PropTypes.bool,
  supplyParticipantsLocations: PropTypes.arrayOf(PropTypes.object),
  deleteParticipantLocation: PropTypes.func.isRequired,
  selectLocation: PropTypes.func.isRequired
}

SupplyChainLocations.defaultProps = {
  isSupplyParticipantsLocationLoading: false,
  supplyParticipantsLocations: [],
  countries: []
}

export default SupplyChainLocations
