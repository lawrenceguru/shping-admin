import React, { lazy, Suspense, useMemo } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { withRouter, Switch, Redirect, Route } from 'react-router-dom'
import styled from 'styled-components'
import Loader from '../../templates/Loader'
import Tabs from '../../atoms/Tabs'
import RedirectTabs from '../../atoms/RedirectTabs'
import PrivateRoute from '../../../containers/PrivateRoute'

const StyledContainer = styled.div`
  max-height: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`

const ConfigurationTab = lazy(() => import('../ConfigurationTab'))
const StoreCardsList = lazy(() => import('../StoreCardsList'))
const StoreCardEditor = lazy(() => import('../SotreCardEditor'))
const CardReports = lazy(() => import('../CardReports'))
const CardReportDetails = lazy(() => import('../CardReportDetails'))
const ReceiptsReportsTab = lazy(() => import('../ReceiptsReportsTab'))
const ReceiptReportsDetails = lazy(() => import('../ReceiptReportsDetails'))

const StoreCardsPage = ({ location }) => {
  const links = useMemo(
    () => [
      {
        destination: '/admin/store-cards/configuration',
        isActive: location.pathname.includes('configuration'),
        iconType: 'container',
        title: intl.get('storecards.tabs.configuration')
      },
      {
        destination: '/admin/store-cards/cards-reports',
        isActive: location.pathname.includes('cards-reports'),
        iconType: 'container',
        title: intl.get('storecards.tabs.cardsReports')
      },
      {
        destination: '/admin/store-cards/receipts-reports',
        isActive: location.pathname.includes('receipts-reports'),
        iconType: 'container',
        title: intl.get('storecards.tabs.receiptsReports')
      }
    ],
    [location]
  )
  return (
    <StyledContainer>
      <Tabs linksList={links} />
      <RedirectTabs>
        <Suspense fallback={<Loader />}>
          <Switch>
            <PrivateRoute exact path='/admin/store-cards/configuration' component={ConfigurationTab} />
            <Route exact path='/admin/store-cards/configuration/:id*/list' component={StoreCardsList} />
            <Route exact path='/admin/store-cards/configuration/:id?/list/editor' component={StoreCardEditor} />
            <Route path='/admin/store-cards/configuration/:id?/list/editor/:card?' component={StoreCardEditor} />
            <PrivateRoute exact path='/admin/store-cards/cards-reports' component={CardReports} />
            <Route path='/admin/store-cards/cards-reports/:user?/:card?' component={CardReportDetails} />
            <PrivateRoute exact path='/admin/store-cards/receipts-reports' component={ReceiptsReportsTab} />
            <Route path='/admin/store-cards/receipts-reports/:user?/:receipt?' component={ReceiptReportsDetails} />
            <Redirect to='/admin/store-cards/configuration' />
          </Switch>
        </Suspense>
      </RedirectTabs>
    </StyledContainer>
  )
}

StoreCardsPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  location: PropTypes.object.isRequired
}

export default withRouter(StoreCardsPage)
