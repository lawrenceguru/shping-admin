import React, { lazy, Suspense, useEffect } from 'react'
import { connect } from 'react-redux'
import intl from 'react-intl-universal'
import { Typography } from 'antd'
import PropTypes from 'prop-types'
import { withRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import { serializationFilterAnalyticsSetCurrentTab } from 'store/actions'
import Loader from '../../templates/Loader'
import { StyledIcon, StyledContainer, TabsHeader, TabItem, AnalyticInformation } from './styles'

const Overview = lazy(() => import('../OverviewSerializationTab'))

// eslint-disable-next-line no-shadow
const AnalyticSerializationPage = ({ location, serializationFilterAnalyticsSetCurrentTab }) => {
  useEffect(() => {
    const pathName = location.pathname.split('/')
    serializationFilterAnalyticsSetCurrentTab(pathName[pathName.length - 1])
  }, [location])
  return (
    <StyledContainer>
      <TabsHeader>
        <Link to='/admin/analytics/overview'>
          <TabItem isActive={location.pathname.includes('overview')}>
            <StyledIcon type='appstore' theme='filled' isActive={location.pathname.includes('overview')} />
            <Typography.Text strong>{intl.get('navigation.overview')}</Typography.Text>
          </TabItem>
        </Link>
      </TabsHeader>
      <AnalyticInformation>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path='/admin/analytics/overview' component={Overview} />
            <Redirect to='/admin/analytics/overview' />
          </Switch>
        </Suspense>
      </AnalyticInformation>
    </StyledContainer>
  )
}

AnalyticSerializationPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
  serializationFilterAnalyticsSetCurrentTab: PropTypes.func.isRequired
}

export default connect(null, { serializationFilterAnalyticsSetCurrentTab })(withRouter(AnalyticSerializationPage))
