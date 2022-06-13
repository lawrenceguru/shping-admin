import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import intl from 'react-intl-universal'
import { Wrapper, StyledPanelContainer, StyledSelectsContainer, ActionsWrapper, ButtonWrapper } from './styles'
import { columns as getColumns } from './constants'
import CustomPagination from '../../atoms/CustomPagination'
import CustomTable from '../../molecules/Table'
import SortBy from '../../atoms/SortBy'
import NumberOfElementsPerPage from '../../atoms/NumberOfElementsPerPage'
import AdvancedFiltersPanel from '../../organisms/AdvancedFiltersPanel/AdvancedFiltersPanel'
import FoundItems from '../../atoms/FoundItems'
import ConfigureFieldsButton from '../../atoms/ConfigureFieldsButton'
import Button from '../../atoms/Button'

const SupplyChainTab = ({
  participantGetSupplyParticipants,
  skip,
  take,
  allItems,
  totalItems,
  isLoading,
  history,
  deleteParticipant,
  countries,
  settingsGetCountries,
  editParticipant,
  getParticipantLocation,
  supplyParticipantsLocations,
  selectParticipant,
  isSupplyParticipantsLocationLoading
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationSize, setPaginationSize] = useState(10)
  const [order, setOrder] = useState(null)
  const [indexedFields, setIndexedFields] = useState([])
  const [filters, setFilters] = useState({})

  const columns = useMemo(
    () => getColumns(history, deleteParticipant, editParticipant, supplyParticipantsLocations, selectParticipant),
    [history, supplyParticipantsLocations]
  )

  const validAllItems = allItems.map(el => ({
    ...el,
    ts: moment(el.ts).format('MM/DD/YYYY h:mm A'),
    country: countries && countries.length && countries.find(item => item.iso === el.country).name
  }))
  const lastPage = useMemo(() => Math.ceil(totalItems / take), [totalItems, take])

  const getInitialInformation = () => {
    let currentFields

    try {
      const localStoreFields = JSON.parse(localStorage.getItem('supplyChainFieldsConfiguration'))
      const actionField = localStoreFields && localStoreFields.find(el => el.dataIndex === 'actions')
      if (localStoreFields && localStoreFields.includes(actionField)) {
        currentFields = localStoreFields.map(el => {
          if (el.dataIndex === 'actions') {
            return { ...el, render: columns[0].render }
          }
          return { ...el }
        })
      } else {
        currentFields = localStoreFields
      }
    } catch (e) {
      console.log('Parse error', e)
    }

    if (!currentFields) {
      currentFields = [...columns]
    }
    setIndexedFields(currentFields)
  }

  useEffect(() => {
    participantGetSupplyParticipants({ skip, take })
    getInitialInformation()
    settingsGetCountries()
    getParticipantLocation()
  }, [])

  useEffect(() => {
    editParticipant({ countries })
  }, [countries])

  const handleChangePagination = page => {
    if (filters || order) {
      participantGetSupplyParticipants({ skip: (page - 1) * paginationSize, take: paginationSize, order, filters })
    } else {
      participantGetSupplyParticipants({ skip: (page - 1) * paginationSize, take: paginationSize })
    }
    setCurrentPage(page)
  }

  const sortOptions = useMemo(
    () =>
      [...columns, { title: intl.get('tableSettings.dontSort'), dataIndex: 'Do not sort' }]
        .map((field, index) => {
          return {
            title: field.title,
            value: field.dataIndex,
            customFieldId: `${field.dataIndex}-${index}`,
            fieldId: field.dataIndex
          }
        })
        .filter(el => el.value !== 'actions'),
    [allItems]
  )

  const handleSortProducts = sortBy => {
    if (sortBy !== 'Do not sort') {
      setOrder(sortBy)
      participantGetSupplyParticipants({
        skip,
        take: paginationSize,
        order: sortBy,
        filters
      })
    } else {
      setOrder(null)
      participantGetSupplyParticipants({
        skip,
        take: paginationSize,
        filters
      })
    }
  }

  const handleChangePaginationSize = value => {
    setCurrentPage(1)
    setPaginationSize(value)
    if (order || filters) {
      participantGetSupplyParticipants({ skip: 0, take: value, order, filters })
    } else {
      participantGetSupplyParticipants({ skip: 0, take: value })
    }
  }

  const handleFilterProducts = userFilters => {
    setFilters(userFilters)
    participantGetSupplyParticipants({
      skip,
      take: paginationSize,
      order,
      filters: userFilters
    })
  }

  const isVisibleFields = fields => {
    return fields.filter(el => !el.isDisabled)
  }

  const preparedColumns = columns
    .map(el => ({ ...el, columnName: el.title, fieldId: el.dataIndex }))
    .filter(el => el.fieldId !== 'actions')
  const preparedCountriesOptions = countries.map(el => ({ value: el.iso, label: el.name }))

  return (
    <Wrapper>
      <AdvancedFiltersPanel
        handleFilterProducts={handleFilterProducts}
        columnsData={preparedColumns}
        options={preparedCountriesOptions}
        defaultInitialState={{ country: { value: [] } }}
        noEquals
      >
        <ButtonWrapper>
          <Button
            type='danger'
            size='large'
            onClick={() => history.push('/admin/track-and-trace/supply-chain/supply-form')}
          >
            {intl.get('supplyChain.createParticipant')}
          </Button>
        </ButtonWrapper>
      </AdvancedFiltersPanel>
      <StyledPanelContainer>
        <ActionsWrapper>
          <FoundItems count={totalItems} text={intl.get('trackAndTrace.inventory.foundReports')} />
          <ConfigureFieldsButton
            fieldNameInLocalStorage='supplyChainFieldsConfiguration'
            indexedFields={indexedFields}
            setIndexedFields={setIndexedFields}
          />
        </ActionsWrapper>
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
      </StyledPanelContainer>
      <CustomTable
        columns={isVisibleFields(indexedFields)}
        data={validAllItems}
        loading={isLoading || isSupplyParticipantsLocationLoading}
        rowKey='key'
        totalCounts={totalItems}
      />
      {!isLoading && (
        <CustomPagination
          count={totalItems}
          currentPaginationPage={currentPage}
          lastPage={lastPage}
          paginationSize={paginationSize}
          handlePagination={handleChangePagination}
        />
      )}
    </Wrapper>
  )
}

SupplyChainTab.propTypes = {
  participantGetSupplyParticipants: PropTypes.func.isRequired,
  skip: PropTypes.number.isRequired,
  take: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  allItems: PropTypes.array,
  totalItems: PropTypes.number,
  isLoading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  deleteParticipant: PropTypes.func.isRequired,
  countries: PropTypes.arrayOf(PropTypes.object),
  settingsGetCountries: PropTypes.func.isRequired,
  editParticipant: PropTypes.func.isRequired,
  supplyParticipantsLocations: PropTypes.arrayOf(PropTypes.object),
  getParticipantLocation: PropTypes.func.isRequired,
  isSupplyParticipantsLocationLoading: PropTypes.bool,
  selectParticipant: PropTypes.func.isRequired
}

SupplyChainTab.defaultProps = {
  allItems: [],
  totalItems: null,
  isLoading: false,
  countries: [],
  supplyParticipantsLocations: [],
  isSupplyParticipantsLocationLoading: false
}

export default withRouter(SupplyChainTab)
