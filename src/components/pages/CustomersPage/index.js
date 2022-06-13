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

const AddBrand = lazy(() => import('../AddBrand'))
const CustomersTab = lazy(() => import('../CustomersTab'))
const CustomerInfo = lazy(() => import('../CustomerInfo'))
const TariffCreate = lazy(() => import('../Tariff/create'))
const TariffEdit = lazy(() => import('../Tariff/edit'))
const AllImportTasksTab = lazy(() => import('../AllImportTasksTab'))
const AllImportTasksHistory = lazy(() => import('../AllImportTasksHistory'))

const CustomersPage = ({ location }) => {
  const links = useMemo(
    () => [
      {
        destination: '/admin/customers/list',
        isActive: location.pathname.includes('list') || location.pathname.includes('add-brand'),
        iconType: 'container',
        title: intl.get('navigation.customers')
      },
      {
        destination: '/admin/customers/import-tasks',
        isActive: location.pathname.includes('import'),
        iconType: 'container',
        title: intl.get('navigation.customersImport')
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
            <PrivateRoute exact path='/admin/customers/add-brand' component={AddBrand} />
            <PrivateRoute exact path='/admin/customers/list' component={CustomersTab} />
            <Route path='/admin/customers/list/:id?/tariff-create' component={TariffCreate} />
            <Route path='/admin/customers/list/:id?/tariff-update/:tariff?' component={TariffEdit} />
            <Route path='/admin/customers/list/:id?' component={CustomerInfo} />
            <PrivateRoute exact path='/admin/customers/import-tasks' component={AllImportTasksTab} />
            <Route path='/admin/customers/import-tasks/:id?' component={AllImportTasksHistory} />
            <Redirect to='/admin/customers/list' />
          </Switch>
        </Suspense>
      </RedirectTabs>
    </StyledContainer>
  )
}

CustomersPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  location: PropTypes.object.isRequired
}

export default withRouter(CustomersPage)
