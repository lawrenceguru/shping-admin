import React, { lazy, Suspense, useMemo } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, Switch, Redirect, Route } from 'react-router-dom'
import styled from 'styled-components'
import intl from 'react-intl-universal'
import { fromIdentity } from 'store/selectors'
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

const systemTabs = ['/admin/campaigns/reminder', '/admin/campaigns/boost', '/admin/campaigns/rewards']

const CampaignRewardsTab = lazy(() => import('../CampaignRewardsTab'))
const CampaignRewardsEditor = lazy(() => import('../CampaignRewardsEditor'))
const CampaignShpingBotTab = lazy(() => import('../CampaignShpingBotTab'))
const CampaignShpingBotEditor = lazy(() => import('../CampaignShpingBotEditor'))
const CampaignShoutoutsTab = lazy(() => import('../CampaignShoutoutsTab'))
const CampaignShoutoutsEditor = lazy(() => import('../CampaignShoutoutsEditor'))
const CampaignBoostTab = lazy(() => import('../CampaignBoostTab'))
const CampaignBoostEditor = lazy(() => import('../CampaignBoostEditor'))
const CampaignReminderTab = lazy(() => import('../CampaignReminderTab'))
const CampaignReminderEditor = lazy(() => import('../CampaignReminderEditor'))
const CampaignFeaturedProductsTab = lazy(() => import('../CampaignFeaturedProductsTab'))
const CampaignFeaturedProductsEditor = lazy(() => import('../CampaignFeaturedProductsEditor'))
const CampaignSummaryReportsTab = lazy(() => import('../CampaignSummaryReportsTab'))
const CampaignSummaryReportsShowForm = lazy(() => import('../CampaignSummaryReportsShowForm'))
const CampaignSummaryReportEditor = lazy(() => import('../CampaignSummaryReportEditor'))
const ShoppingListAdsTab = lazy(() => import('../ShoppingListAdsTab'))
const ShoppingListAdsCreatePage = lazy(() => import('../ShoppingListAdsTab/create'))
const ShoppingListAdsEditPage = lazy(() => import('../ShoppingListAdsTab/edit'))
const CampaignCashbackTab = lazy(() => import('../CampaignCashbackTab'))
const CampaignCashbackCreatePage = lazy(() => import('../CampaignCashbackTab/create'))
const CampaignCashbackEditPage = lazy(() => import('../CampaignCashbackTab/edit'))
const CampaignCashbackViewPage = lazy(() => import('../CampaignCashbackTab/view'))
const CampaignCashbackSubmissionViewPage = lazy(() => import('../CampaignCashbackTab/submission-view'))
const CampaignCashbackSubmissionPriceEditPage = lazy(() => import('../CampaignCashbackTab/price-edit'))
const CampaignCashoutTab = lazy(() => import('../CampaignCashoutTab'))
const CampaignCashoutCreatePage = lazy(() => import('../CampaignCashoutTab/create'))
const CampaignCashoutEditPage = lazy(() => import('../CampaignCashoutTab/edit'))
const CampaignCashoutViewPage = lazy(() => import('../CampaignCashoutTab/view'))
const CampaignCashoutSubmissionViewPage = lazy(() => import('../CampaignCashoutTab/submission-view'))
const CampaignCashoutSubmissionPriceEditPage = lazy(() => import('../CampaignCashoutTab/price-edit'))

const TodoCardsPage = ({ location, isSystem }) => {
  const links = useMemo(
    () => [
      {
        destination: '/admin/campaigns/rewards',
        isActive: location.pathname.includes('rewards'),
        iconType: 'container',
        title: intl.get('campaigns.tabs.rewards')
      },
      {
        destination: '/admin/campaigns/bot',
        isActive: location.pathname.includes('bot'),
        iconType: 'container',
        title: intl.get('campaigns.tabs.bot')
      },
      {
        destination: '/admin/campaigns/shoutouts',
        isActive: location.pathname.includes('shoutouts'),
        iconType: 'container',
        title: intl.get('campaigns.tabs.shoutouts')
      },
      {
        destination: '/admin/campaigns/boost',
        isActive: location.pathname.includes('/boost'),
        iconType: 'container',
        title: intl.get('campaigns.tabs.boost')
      },
      {
        destination: '/admin/campaigns/reminder',
        isActive: location.pathname.includes('reminder'),
        iconType: 'container',
        title: intl.get('campaigns.tabs.reminder')
      },
      {
        destination: '/admin/campaigns/featured',
        isActive: location.pathname.includes('featured'),
        iconType: 'container',
        title: intl.get('campaigns.tabs.featured')
      },
      {
        destination: '/admin/campaigns/cashbacks',
        isActive: location.pathname.includes('cashbacks'),
        iconType: 'container',
        title: intl.get('campaigns.tabs.cashbacks')
      },
      {
        destination: '/admin/campaigns/cashout',
        isActive: location.pathname.includes('cashout'),
        iconType: 'container',
        title: intl.get('campaigns.tabs.cashout')
      },
      {
        destination: '/admin/campaigns/summary-reports',
        isActive: location.pathname.includes('summary-reports'),
        iconType: 'container',
        title: intl.get('campaigns.tabs.summary')
      },
      {
        destination: '/admin/campaigns/shopping-list-ads',
        isActive: location.pathname.includes('shopping-list-ads'),
        iconType: 'container',
        title: intl.get('campaigns.tabs.ads')
      }
    ],
    [location]
  )
  return (
    <StyledContainer>
      <Tabs linksList={isSystem ? links : links.filter(item => !systemTabs.includes(item.destination))} />
      <RedirectTabs>
        <Suspense fallback={<Loader />}>
          <Switch>
            <PrivateRoute whiteList={['system']} exact path='/admin/campaigns/rewards' component={CampaignRewardsTab} />
            <PrivateRoute
              whiteList={['system']}
              path='/admin/campaigns/rewards/new-campaign'
              component={CampaignRewardsEditor}
            />
            <Route path='/admin/campaigns/rewards/:id?' component={CampaignRewardsEditor} />
            <PrivateRoute exact path='/admin/campaigns/bot' component={CampaignShpingBotTab} />
            <PrivateRoute path='/admin/campaigns/bot/new-bot' component={CampaignShpingBotEditor} />
            <Route path='/admin/campaigns/bot/:id?' component={CampaignShpingBotEditor} />
            <PrivateRoute exact path='/admin/campaigns/shoutouts' component={CampaignShoutoutsTab} />
            <PrivateRoute path='/admin/campaigns/shoutouts/new-shoutout' component={CampaignShoutoutsEditor} />
            <Route path='/admin/campaigns/shoutouts/:id?' component={CampaignShoutoutsEditor} />
            <PrivateRoute whiteList={['system']} exact path='/admin/campaigns/boost' component={CampaignBoostTab} />
            <PrivateRoute
              whiteList={['system']}
              path='/admin/campaigns/boost/new-boost'
              component={CampaignBoostEditor}
            />
            <Route path='/admin/campaigns/boost/:id?' component={CampaignBoostEditor} />
            <PrivateRoute
              whiteList={['system']}
              exact
              path='/admin/campaigns/reminder'
              component={CampaignReminderTab}
            />
            <PrivateRoute
              whiteList={['system']}
              path='/admin/campaigns/reminder/new-reminder'
              component={CampaignReminderEditor}
            />
            <Route path='/admin/campaigns/reminder/:id?' component={CampaignReminderEditor} />
            <PrivateRoute
              exact
              whiteList={['system']}
              path='/admin/campaigns/featured'
              component={CampaignFeaturedProductsTab}
            />
            <PrivateRoute
              whiteList={['system']}
              path='/admin/campaigns/featured/new-featured'
              component={CampaignFeaturedProductsEditor}
            />
            <Route
              whiteList={['system']}
              path='/admin/campaigns/featured/:id?'
              component={CampaignFeaturedProductsEditor}
            />
            <PrivateRoute exact path='/admin/campaigns/cashbacks' component={CampaignCashbackTab} />
            <PrivateRoute exact path='/admin/campaigns/cashbacks/create' component={CampaignCashbackCreatePage} />
            <Route exact path='/admin/campaigns/cashbacks/:id?' component={CampaignCashbackViewPage} />
            <Route
              exact
              path='/admin/campaigns/cashbacks/submissions/:id?'
              component={CampaignCashbackSubmissionViewPage}
            />
            <Route
              exact
              path='/admin/campaigns/cashbacks/submissions/:submission_id?/:price_id'
              component={CampaignCashbackSubmissionPriceEditPage}
            />
            <Route exact path='/admin/campaigns/cashbacks/:id?/update' component={CampaignCashbackEditPage} />
            <PrivateRoute
              exact
              whiteList={['system']}
              path='/admin/campaigns/summary-reports'
              component={CampaignSummaryReportsTab}
            />
            <PrivateRoute exact path='/admin/campaigns/cashout' component={CampaignCashoutTab} />
            <PrivateRoute exact path='/admin/campaigns/cashout/create' component={CampaignCashoutCreatePage} />
            <Route exact path='/admin/campaigns/cashout/:id?' component={CampaignCashoutViewPage} />
            <Route
              exact
              path='/admin/campaigns/cashout/submissions/:id?'
              component={CampaignCashoutSubmissionViewPage}
            />
            <Route
              exact
              path='/admin/campaigns/cashout/submissions/:submission_id?/:price_id'
              component={CampaignCashoutSubmissionPriceEditPage}
            />
            <Route exact path='/admin/campaigns/cashout/:id?/update' component={CampaignCashoutEditPage} />
            <PrivateRoute
              exact
              whiteList={['system']}
              path='/admin/campaigns/summary-reports'
              component={CampaignSummaryReportsTab}
            />
            <Route
              whiteList={['system']}
              path='/admin/campaigns/summary-reports/show/:id?'
              component={CampaignSummaryReportsShowForm}
            />
            <PrivateRoute
              whiteList={['system']}
              path='/admin/campaigns/summary-reports/editor'
              component={CampaignSummaryReportEditor}
            />
            <PrivateRoute exact path='/admin/campaigns/shopping-list-ads' component={ShoppingListAdsTab} />
            <PrivateRoute
              exact
              path='/admin/campaigns/shopping-list-ads/create'
              component={ShoppingListAdsCreatePage}
            />
            <Route exact path='/admin/campaigns/shopping-list-ads/:id?' component={ShoppingListAdsEditPage} />
            <Redirect to={isSystem ? '/admin/campaigns/rewards' : '/admin/campaigns/bot'} />
          </Switch>
        </Suspense>
      </RedirectTabs>
    </StyledContainer>
  )
}

TodoCardsPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  location: PropTypes.object.isRequired,
  isSystem: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isSystem: fromIdentity.isSystem(state)
})

export default connect(mapStateToProps, null)(withRouter(TodoCardsPage))
