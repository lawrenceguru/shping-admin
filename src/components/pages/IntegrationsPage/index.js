import React, { lazy, Suspense } from 'react'
import intl from 'react-intl-universal'
import { Typography } from 'antd'
import PropTypes from 'prop-types'
import { withRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import Loader from '../../templates/Loader'
import { StyledContainer, TabsHeader, TabItem, ProfileSettings } from './styles'

const IntegrationApi = lazy(() => import('../../organisms/IntegrationApi'))
const IntegrationApplications = lazy(() => import('../../organisms/IntegrationApplications'))
const IntegrationApplication = lazy(() => import('../../organisms/ProfilePassword'))
const Integration = ({ location }) => {
  return (
    <StyledContainer>
      <TabsHeader>
        <Link to='/admin/settings/integrations/api'>
          <TabItem isActive={location.pathname.includes('api')}>
            <Typography.Text strong>{intl.get('integration.api')}</Typography.Text>
          </TabItem>
        </Link>
        <Link to='/admin/settings/integrations/applications'>
          <TabItem isActive={location.pathname.includes('applications')}>
            <Typography.Text strong>{intl.get('integration.aplications')}</Typography.Text>
          </TabItem>
        </Link>
        {/* <Link to='/admin/settings/integrations/application'>
          <TabItem isActive={location.pathname.includes('application')}>
            <Typography.Text strong>{intl.get('integration.application')}</Typography.Text>
          </TabItem>
        </Link> */}
      </TabsHeader>
      <ProfileSettings>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path='/admin/settings/integrations/api' component={IntegrationApi} />
            <Route path='/admin/settings/integrations/applications' component={IntegrationApplications} />
            <Route path='/admin/settings/integrations/application' component={IntegrationApplication} />
            <Redirect to='/admin/settings/integrations/api' />
          </Switch>
        </Suspense>
      </ProfileSettings>
    </StyledContainer>
  )
}

Integration.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired
}

export default withRouter(Integration)
