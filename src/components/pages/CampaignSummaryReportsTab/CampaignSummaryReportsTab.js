/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import moment from 'moment'
import * as ST from './styles'
import Loader from '../../templates/Loader'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'
import { getReportsFromRequest } from '../../../utils/campaign'
import LoadingSpinner from '../../atoms/LoadingSpinner'
import IconButton from '../../molecules/IconButton'
import DeleteModal from '../../molecules/DeleteModal'
import CustomPagination from '../../atoms/CustomPagination'
import Button from '../../atoms/Button'

const CampaignSummaryReportsTab = ({
  campaingsGetSummaryReports,
  campaignsDeleteSummaryReport,
  isLoading,
  reports,
  deletingId,
  participants,
  countries,
  isLoadingCountries,
  settingsGetCountries,
  team,
  history
}) => {
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1)
  const [localReports, setLocalReports] = useState([])
  const [paginationSize, setPaginationSize] = useState(10)
  const totalItems = useMemo(() => {
    return (reports && reports.length) || 0
  }, [reports])
  const dataSource = useMemo(() => {
    return localReports && localReports.length
      ? localReports.slice((currentPaginationPage - 1) * paginationSize, paginationSize * currentPaginationPage)
      : []
  }, [localReports, currentPaginationPage, paginationSize])
  const lastPage = useMemo(() => Math.ceil(totalItems / paginationSize), [totalItems, paginationSize])

  useEffect(() => {
    if (currentPaginationPage > lastPage) {
      setCurrentPaginationPage(1)
    }
  }, [lastPage])

  const showConfirm = useCallback(id => {
    DeleteModal(() => campaignsDeleteSummaryReport(id), intl.get('campaigns.summaryReports.deleteDialog'))
  }, [])

  useEffect(() => {
    campaingsGetSummaryReports()

    if ((!countries || !countries.length) && !isLoadingCountries) {
      settingsGetCountries()
    }
  }, [])

  useEffect(() => {
    setLocalReports(getReportsFromRequest(reports, participants, countries))
  }, [reports, countries, participants])

  const getUsers = useCallback(
    users => {
      return users
        .map(user => {
          const userInfo = team && team.find(serverTeam => (serverTeam && serverTeam.id) === user)

          return userInfo ? userInfo.first_name : user || undefined
        })
        .filter(user => user)
        .join(', ')
    },
    [team]
  )

  const handleRefresh = useCallback(() => {
    campaingsGetSummaryReports()
  }, [])

  const handleOnRowClick = useCallback(
    id => {
      history.push(`/admin/campaigns/summary-reports/show/${id}`)
    },
    [history]
  )

  const handleOnAddClick = useCallback(() => {
    history.push(`/admin/campaigns/summary-reports/editor`)
  }, [history])

  return (
    <ST.Wrapper>
      <ST.Header>{intl.get('campaigns.tabs.summary')}</ST.Header>
      <ST.ButtonWrapper>
        <Button type='danger' size='large' onClick={handleOnAddClick}>
          {intl.get('campaigns.summaryReports.add')}
        </Button>
      </ST.ButtonWrapper>
      <TableHeaderOptions
        totalItems={totalItems}
        hasNotSort
        paginationSize={paginationSize}
        handleChangePaginationSize={size => setPaginationSize(size)}
        isHaveActionsContainer
      >
        <IconButton type='Refresh' styleParam={{ fontSize: '22px' }} actionFunction={handleRefresh} />
      </TableHeaderOptions>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {dataSource &&
            dataSource.length !== 0 &&
            dataSource.map(item => (
              <LoadingSpinner key={item.id} isLoading={item.id === deletingId}>
                <ST.ProductInfoWrapper onClick={() => handleOnRowClick(item.id)}>
                  <ST.StyledProductMainInfo>
                    <ST.StyledMainProductText>
                      {item.report_by && item.report_by.info && item.report_by.info.name}
                    </ST.StyledMainProductText>
                    <span>{`${intl.get('campaigns.summaryReports.item.status')} ${intl.get(
                      `campaigns.summaryReports.item.${item.status}`
                    )}`}</span>
                    <span>{`${intl.get('campaigns.summaryReports.item.startDate')}${moment
                      .utc(item.started)
                      .format('L')}`}</span>
                    <span>{`${intl.get('campaigns.summaryReports.item.email')}${item.report_by &&
                      item.report_by.info &&
                      item.report_by.info.email}`}</span>
                  </ST.StyledProductMainInfo>
                  <ST.IndexFieldsInfo>
                    <ST.StyledMainProductText>
                      {intl.get('campaigns.summaryReports.item.filters')}
                    </ST.StyledMainProductText>
                    <span>{`${intl.get('campaigns.summaryReports.item.fromDate')}${item.filters &&
                      item.filters.from_datetime &&
                      moment.utc(item.filters.from_datetime).format('L')}`}</span>
                    <span>{`${intl.get('campaigns.summaryReports.item.toDate')}${item.filters &&
                      item.filters.to_datetime &&
                      moment.utc(item.filters.to_datetime).format('L')}`}</span>
                    {item.filters && item.filters.countries && item.filters.countries.length !== 0 ? (
                      <span>{`${intl.get('campaigns.summaryReports.item.countries')}${item.filters.countries ||
                        null}`}</span>
                    ) : null}
                  </ST.IndexFieldsInfo>
                  <ST.IndexFieldsInfo>
                    <ST.StyledMainProductText style={{ height: '22px' }} />
                    {item.filters && item.filters.products && item.filters.products.length !== 0 && (
                      <span>{`${intl.get('campaigns.summaryReports.item.products')}${item.filters.products.join(
                        ', '
                      )}`}</span>
                    )}
                    {item.filters && item.filters.users_blacklist && item.filters.users_blacklist.length !== 0 && (
                      <span>{`${intl.get('campaigns.summaryReports.item.usersBlacklist')}${getUsers(
                        item.filters.users_blacklist
                      )}`}</span>
                    )}
                  </ST.IndexFieldsInfo>
                  <ST.DeleteIcon>
                    <IconButton
                      type='DeleteTrash'
                      actionFunction={e => {
                        e.stopPropagation()
                        e.preventDefault()
                        showConfirm(item.id)
                      }}
                      popText={intl.get('campaigns.summaryReports.deletePop')}
                    />
                  </ST.DeleteIcon>
                </ST.ProductInfoWrapper>
              </LoadingSpinner>
            ))}
          {dataSource && dataSource.length !== 0 && lastPage > 1 && (
            <CustomPagination
              currentPaginationPage={currentPaginationPage}
              paginationSize={paginationSize}
              handlePagination={page => {
                setCurrentPaginationPage(page)
              }}
              count={totalItems}
              lastPage={lastPage}
              size='small'
            />
          )}
        </>
      )}
    </ST.Wrapper>
  )
}

CampaignSummaryReportsTab.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  countries: PropTypes.arrayOf(PropTypes.object),
  isLoadingCountries: PropTypes.bool,
  settingsGetCountries: PropTypes.func.isRequired,
  campaingsGetSummaryReports: PropTypes.func.isRequired,
  campaignsDeleteSummaryReport: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  reports: PropTypes.arrayOf(PropTypes.object),
  deletingId: PropTypes.string,
  participants: PropTypes.arrayOf(PropTypes.object),
  team: PropTypes.arrayOf(PropTypes.object)
}
CampaignSummaryReportsTab.defaultProps = {
  isLoading: false,
  reports: null,
  deletingId: null,
  participants: [],
  isLoadingCountries: false,
  countries: [],
  team: null
}

export default CampaignSummaryReportsTab
