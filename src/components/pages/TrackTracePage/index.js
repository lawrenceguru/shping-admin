import React, { lazy, Suspense, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { shallowEqual, useSelector } from 'react-redux'
import intl from 'react-intl-universal'
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

const SerializedProducts = lazy(() => import('../SerializedProductsTab'))
const InventoryReports = lazy(() => import('../InventoryReportsTab'))
const SupplyChain = lazy(() => import('../SupplyChainTab'))
// const TTOperations = lazy(() => import('../TTOperations'))
const SerializationTasks = lazy(() => import('../SerializationTasksTab'))
const SupplyChainEditParticipant = lazy(() => import('../SupplyChainEditParticipant'))
const SupplyChainLocations = lazy(() => import('../SupplyChainLocations'))
const SupplyChainEditLocations = lazy(() => import('../SupplyChainEditLocations'))
const SerializationSSCCSteps = lazy(() => import('../SerializationSSCCSteps'))
const SerializationGTINSteps = lazy(() => import('../SerializationGTINSteps'))

const TrackTracePage = ({ location }) => {
  const containerRef = useRef(null)
  const identity = useSelector(state => state.identity, shallowEqual)
  const links = useMemo(
    () => [
      {
        destination: '/admin/track-and-trace/serialized-products',
        isActive: location.pathname.includes('serialized-products'),
        iconType: 'container',
        title: intl.get('navigation.serializedProducts'),
        module: ['supply_chain']
      },
      {
        destination: '/admin/track-and-trace/inventory-reports',
        isActive: location.pathname.includes('inventory-reports'),
        iconType: 'container',
        title: intl.get('navigation.inventoryReports')
      },
      // {
      //   destination: '/admin/track-and-trace/tt-operations',
      //   isActive: location.pathname.includes('tt-operations'),
      //   iconType: 'container',
      //   title: intl.get('navigation.operations')
      // },
      {
        destination: '/admin/track-and-trace/supply-chain',
        isActive: location.pathname.includes('supply-chain'),
        iconType: 'container',
        title: intl.get('navigation.supplyChain'),
        module: ['supply_chain']
      },
      {
        destination: '/admin/track-and-trace/serialization-tasks',
        isActive: location.pathname.includes('serialization-tasks'),
        iconType: 'container',
        title: intl.get('navigation.serializationTasks')
      }
    ],
    [location]
  )
  const validLinks = links.filter(el => {
    if (identity && identity.modules[0] === 'supply_chain') {
      return el.module && el.module[0] === 'supply_chain'
    }
    return el
  })
  return (
    <StyledContainer id='container1' ref={containerRef}>
      <Tabs linksList={validLinks} />
      <RedirectTabs>
        <Suspense fallback={<Loader />}>
          <Switch>
            <PrivateRoute path='/admin/track-and-trace/serialized-products' component={SerializedProducts} />
            <PrivateRoute path='/admin/track-and-trace/inventory-reports' component={InventoryReports} />
            {/* <PrivateRoute path='/admin/track-and-trace/tt-operations' component={TTOperations} /> */}
            <PrivateRoute
              path='/admin/track-and-trace/supply-chain/supply-form'
              component={SupplyChainEditParticipant}
            />
            <PrivateRoute
              path='/admin/track-and-trace/supply-chain/location-editor'
              component={SupplyChainEditLocations}
            />
            <PrivateRoute path='/admin/track-and-trace/supply-chain/locations' component={SupplyChainLocations} />
            <PrivateRoute path='/admin/track-and-trace/supply-chain' component={SupplyChain} />
            <PrivateRoute
              path='/admin/track-and-trace/serialization-tasks/sscc-steps'
              component={SerializationSSCCSteps}
            />
            <PrivateRoute
              path='/admin/track-and-trace/serialization-tasks/steps'
              component={props => <SerializationGTINSteps {...props} containerRef={containerRef} />}
            />
            <PrivateRoute path='/admin/track-and-trace/serialization-tasks' component={SerializationTasks} />
            <Redirect to='/admin/track-and-trace/serialized-products' />
          </Switch>
        </Suspense>
      </RedirectTabs>
    </StyledContainer>
  )
}

TrackTracePage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired
}

export default withRouter(TrackTracePage)
