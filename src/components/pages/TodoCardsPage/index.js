import React, { lazy, Suspense, useMemo } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Switch, Redirect } from 'react-router-dom'
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

const TodoCardsBuilder = lazy(() => import('../TodoCardsBuilder'))
const TodoCardsDeliveries = lazy(() => import('../TodoCardsDeliveries'))
const TodoCardsEditor = lazy(() => import('../TodoCardsEditor'))
const TodoDeliveryEditor = lazy(() => import('../TodoDeliveryEditor'))
const TodoCardsExport = lazy(() => import('../TodoCardsExport'))

const TodoCardsPage = ({ location }) => {
  const links = useMemo(
    () => [
      {
        destination: '/admin/todo-cards/builder',
        isActive: location.pathname.includes('builder'),
        iconType: 'container',
        title: 'Builder'
      },
      {
        destination: '/admin/todo-cards/deliveries',
        isActive: location.pathname.includes('deliveries'),
        iconType: 'container',
        title: 'Deliveries'
      },
      {
        destination: '/admin/todo-cards/export-submissions',
        isActive: location.pathname.includes('export-submissions'),
        iconType: 'container',
        title: 'Export submissions'
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
            <PrivateRoute exact path='/admin/todo-cards/deliveries' component={TodoCardsDeliveries} />
            <PrivateRoute path='/admin/todo-cards/deliveries/editor' component={TodoDeliveryEditor} />
            <PrivateRoute path='/admin/todo-cards/builder' component={TodoCardsBuilder} />
            <PrivateRoute path='/admin/todo-cards/editor' component={TodoCardsEditor} />
            <PrivateRoute path='/admin/todo-cards/export-submissions' component={TodoCardsExport} />
            <Redirect to='/admin/todo-cards/builder' />
          </Switch>
        </Suspense>
      </RedirectTabs>
    </StyledContainer>
  )
}

TodoCardsPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  location: PropTypes.object.isRequired
}

export default withRouter(TodoCardsPage)
