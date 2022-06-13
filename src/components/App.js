import React, { lazy, Suspense, useEffect, useState } from 'react'
import 'moment/min/locales'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { toast } from 'react-toastify'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { connect } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import PropTypes from 'prop-types'

import { GRAPHQL } from '../constants/url'
import styledTheme from './themes/primary'
import Loader from './templates/Loader'
import ServiceTemplate from './templates/ServiseTemplate'
import pages from './organisms/Sidebar/pages'

const Profile = lazy(() => import('./pages/Profile'))
const MainPage = lazy(() => import('./pages/AnalyticsPage'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const IndexFieldsPage = lazy(() => import('./pages/IndexFieldsPage'))
const MyTeamPage = lazy(() => import('./pages/MyTeamPage'))
const IntegrationsPage = lazy(() => import('./pages/IntegrationsPage'))
const Plans = lazy(() => import('./pages/ShpingMarketingPlan'))
const PaymentHistory = lazy(() => import('./pages/PaymentHistory'))
const CreateUser = lazy(() => import('./pages/CreateUserTab'))
const InviteUser = lazy(() => import('./pages/InviteUserTab'))
const TrackTracePage = lazy(() => import('./pages/TrackTracePage'))
const TodoCardsPage = lazy(() => import('./pages/TodoCardsPage'))
const DocumentsPage = lazy(() => import('./pages/DocumentsPage'))
const CampaignPage = lazy(() => import('./pages/CampaignPage'))
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'))
const AnalyticsSerializationPage = lazy(() => import('./pages/AnalyticsSeriliazationPage'))
const CustomersPage = lazy(() => import('./pages/CustomersPage'))
const StoreCardsPage = lazy(() => import('./pages/StoreCardsPage'))
const CashoutParametersPage = lazy(() => import('./pages/CashoutPage'))
const UsersPage = lazy(() => import('./pages/UsersPage'))
const UserInfo = lazy(() => import('./pages/UserInfo'))

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  // const whyDidYouRender = require('@welldone-software/why-did-you-render')
  // whyDidYouRender(React, {include: [/^.*/], exclude:[/IconBase|Link|StyledComponent|Connect|Field|FieldArray/]})
  // whyDidYouRender(React, { include: [/^.*/], exclude: [] })
}

toast.configure({
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: true,
  newestOnTop: true,
  closeOnClick: true,
  pauseOnVisibilityChange: true,
  draggable: true,
  pauseOnHover: true
})

const client = new ApolloClient({
  uri: GRAPHQL
})

const App = ({ history, identity }) => {
  const [newClient, setNewClient] = useState(null)
  useEffect(() => {
    if (identity.ticket) {
      setNewClient(
        new ApolloClient({
          uri: GRAPHQL,
          headers: {
            authenticateit_identity_ticket: identity.ticket
          }
        })
      )
    }
  }, [identity.ticket, identity.current_participant])
  useEffect(() => {
    let redirectPath = null

    if (identity && identity.modules) {
      let idPage = null
      pages(null)
        .map(({ module }) => module)
        .some((module, id) => {
          identity.modules.some(el => {
            if (module.includes(el)) {
              idPage = id
              return true
            }
            return null
          })
          if (idPage || idPage === 0) return true

          return null
        })
      if (idPage) {
        redirectPath = Array.isArray(pages(null)[idPage].path) ? pages(null)[idPage].path[0] : pages(null)[idPage].path
      } else {
        redirectPath = '/admin/analytics'
      }
      if (process.env.NODE_ENV === 'production')
        if (!window.location.pathname.includes('/admin/products/catalogue/edit/')) history.push(redirectPath)
    }
  }, [identity.current_participant])

  return (
    <ApolloProvider client={newClient || client}>
      <DndProvider backend={HTML5Backend}>
        <ThemeProvider theme={styledTheme}>
          <ServiceTemplate>
            <Suspense fallback={<Loader />}>
              <Switch>
                <Route path='/admin/settings/profile' component={Profile} />
                <Route path='/admin/settings/plans' component={Plans} />
                <Route path='/admin/settings/payment-history' component={PaymentHistory} />
                <Route
                  path='/admin/analytics'
                  component={
                    identity.modules && identity.modules.some(item => ['serialization', 'supply_chain'].includes(item))
                      ? AnalyticsSerializationPage
                      : MainPage
                  }
                />
                <Route path='/admin/campaigns' component={CampaignPage} />
                <Route path='/admin/reviews' component={ReviewsPage} />
                <Route path='/admin/products' component={ProductsPage} />
                <Route path='/admin/documents' component={DocumentsPage} />
                <Route path='/admin/settings/index-fields' component={IndexFieldsPage} />
                <Route exact path='/admin/settings/my-team' component={MyTeamPage} />
                <Route path='/admin/settings/integrations' component={IntegrationsPage} />
                <Route path='/admin/settings/my-team/invite' component={InviteUser} />
                <Route path='/admin/settings/my-team/create' component={CreateUser} />
                <Route path='/admin/settings/todo-cards/builder' component={TodoCardsPage} />
                <Route path='/admin/track-and-trace' component={TrackTracePage} />
                <Route path='/admin/customers' component={CustomersPage} />
                <Route path='/admin/store-cards' component={StoreCardsPage} />
                <Route path='/admin/todo-cards' component={TodoCardsPage} />
                <Route path='/admin/cashout' component={CashoutParametersPage} />
                <Route exact path='/admin/users' component={UsersPage} />
                <Route path='/admin/users/info/:id?' component={UserInfo} />
                <Redirect to='/admin/analytics' />
              </Switch>
            </Suspense>
          </ServiceTemplate>
        </ThemeProvider>
      </DndProvider>
    </ApolloProvider>
  )
}
App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  identity: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  identity: state.identity
})

export default connect(mapStateToProps)(App)
