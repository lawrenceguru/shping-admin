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

const SettingsTab = lazy(() => import('../CashoutParametersPage'))
const ModerationTab = lazy(() => import('../CashoutModeration'))
const CardReportDetails = lazy(() => import('../CardReportDetails'))
const ReceiptsReportsTab = lazy(() => import('../ReceiptsReportsTab'))
const ReceiptReportsDetails = lazy(() => import('../ReceiptReportsDetails'))

const CashoutParametersPage = ({ location }) => {
  const links = useMemo(
    () => [
      {
        destination: '/admin/cashout/settings',
        isActive: location.pathname.includes('settings'),
        iconType: 'container',
        title: intl.get('cashout.tab_title.setting')
      },
      {
        destination: '/admin/cashout/moderation',
        isActive: location.pathname.includes('moderation'),
        iconType: 'container',
        title: intl.get('cashout.tab_title.moderation')
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
            <PrivateRoute exact path='/admin/cashout/settings' component={SettingsTab} />
            <PrivateRoute exact path='/admin/cashout/moderation' component={ModerationTab} />
            <Route path='/admin/store-cards/cards-reports/:user?/:card?' component={CardReportDetails} />
            <PrivateRoute exact path='/admin/store-cards/receipts-reports' component={ReceiptsReportsTab} />
            <Route path='/admin/store-cards/receipts-reports/:user?/:receipt?' component={ReceiptReportsDetails} />
            <Redirect to='/admin/cashout/settings' />
          </Switch>
        </Suspense>
      </RedirectTabs>
    </StyledContainer>
  )
}

CashoutParametersPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  location: PropTypes.object.isRequired
}

export default withRouter(CashoutParametersPage)
