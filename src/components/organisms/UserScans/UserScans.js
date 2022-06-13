import React, { useEffect, useState, useCallback, useMemo } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import * as ST from './styles'
import Table from '../../molecules/Table'
import { columns, mapStyles } from './consts'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'
import IconButton from '../../molecules/IconButton'
import { copyToClipboard } from '../../../utils/copyToClipBoard'
import { name } from '../../../utils/consts'
import MobilePreviewModal from '../MobilePreviewModal'

const UserScans = ({
  id,
  isLoadingScans,
  scans,
  usersGetUsersScans,
  count,
  settingsGetCountries,
  settingsGetLanguages,
  countries,
  languages,
  isLoadingCountries,
  isLoadingLanguages,
  google
}) => {
  const [limit, setLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const positions = useMemo(() => {
    return scans && scans.length
      ? scans.map(item => ({
          lat: item.latitude,
          lng: item.longitude
        }))
      : []
  }, [scans])
  const dataSource = useMemo(() => {
    let result = scans || []

    if (result.length && countries && countries.length && languages && languages.length) {
      result = result.map(item => {
        const labelCountry = countries.find(elem => elem.iso === (item && item.country))
        const labelLanguage = languages.find(elem => elem.code === (item && item.language))

        return {
          ...item,
          language: labelLanguage ? labelLanguage[name] : item && item.language,
          country: labelCountry ? labelCountry[name] : item && item.country
        }
      })
    }

    return result
  }, [scans, countries, languages])

  useEffect(() => {
    usersGetUsersScans({
      id,
      limit,
      offset: limit * (currentPage - 1)
    })

    if ((!countries || !countries.length) && !isLoadingCountries) {
      settingsGetCountries()
    }

    if ((!languages || !languages.length) && !isLoadingLanguages) {
      settingsGetLanguages()
    }
  }, [])

  const handleChangePaginationSize = useCallback(
    value => {
      setLimit(value)

      usersGetUsersScans({
        id,
        limit: value,
        offset: limit * (currentPage - 1)
      })
    },
    [currentPage, id]
  )

  const handleChangePage = useCallback(
    value => {
      setCurrentPage(value)

      usersGetUsersScans({
        id,
        limit,
        offset: limit * (value - 1)
      })
    },
    [limit, id]
  )

  const handleShowInfo = useCallback(data => {
    MobilePreviewModal(data)
  }, [])

  const mergedColumns = useMemo(() => {
    return [
      {
        key: 'action',
        align: 'center',
        render: data => (
          <ST.ActionsWrapper>
            <IconButton type='Copy' actionFunction={() => copyToClipboard(data.id)} styleParam={{ fontSize: '20px' }} />
            <IconButton type='File' actionFunction={() => handleShowInfo(data)} styleParam={{ fontSize: '20px' }} />
          </ST.ActionsWrapper>
        )
      },
      ...columns
    ]
  }, [columns])

  return (
    <>
      <ST.Header>{intl.get('users.scans.header')}</ST.Header>
      <TableHeaderOptions
        totalItems={count}
        hasNotSort
        handleChangePaginationSize={handleChangePaginationSize}
        paginationSize={limit}
      />
      <Table
        data={dataSource}
        columns={mergedColumns}
        totalCounts={count}
        limit={limit}
        rowKey='id'
        loading={isLoadingScans}
        pagination
        handlePagination={handleChangePage}
      />
      {count !== 0 && (
        <ST.MapContainer>
          <Map initialCenter={positions[0]} style={mapStyles} google={google} zoom={5} center={positions[0]}>
            {positions.length &&
              positions.map((store, index) => {
                return (
                  <Marker
                    /* eslint-disable-next-line react/no-array-index.js-key,react/no-array-index-key */
                    key={index}
                    id={index}
                    position={{ ...store }}
                  />
                )
              })}
          </Map>
        </ST.MapContainer>
      )}
    </>
  )
}

UserScans.propTypes = {
  id: PropTypes.string,
  count: PropTypes.number,
  usersGetUsersScans: PropTypes.func.isRequired,
  isLoadingScans: PropTypes.bool,
  languages: PropTypes.arrayOf(PropTypes.object),
  countries: PropTypes.arrayOf(PropTypes.object),
  isLoadingLanguages: PropTypes.bool,
  isLoadingCountries: PropTypes.bool,
  settingsGetCountries: PropTypes.func.isRequired,
  settingsGetLanguages: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  google: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  scans: PropTypes.arrayOf(PropTypes.object)
}
UserScans.defaultProps = {
  isLoadingLanguages: false,
  isLoadingCountries: false,
  languages: [],
  countries: [],
  isLoadingScans: false,
  scans: null,
  id: null,
  count: 0
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD0KIyfe3R1Xk9hnKpEkDuXv-M2inmkMDI'
})(UserScans)
