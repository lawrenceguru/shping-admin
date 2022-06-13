import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { Typography } from 'antd'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { withRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import { filterAnalyticsSetCurrentTab } from 'store/actions'
import Loader from '../../templates/Loader'
import { StyledIcon, StyledContainer, TabsHeader, TabItem, AnalyticInformation } from './styles'

const Overview = lazy(() => import('../OverviewTab'))
const Audience = lazy(() => import('../AudienceTab'))
const Geography = lazy(() => import('../GeographyTab'))
const Conversion = lazy(() => import('../ConversionTab'))
const Spend = lazy(() => import('../SpendTab'))
const Roi = lazy(() => import('../RoiTab'))
const Shoppinglists = lazy(() => import('../ShopListUsageTab'))

const BETA_TESTERS = ['artyom.tryliskyi@gmail.com']

const isBetaTester = email => {
  if (BETA_TESTERS.includes(email) || email.includes('@shping.com') || email.includes('@authenticateit.com')) {
    return true
  }
  return false
}

// eslint-disable-next-line no-shadow
const AnalyticPage = ({ location, filterAnalyticsSetCurrentTab }) => {
  const [session, setSession] = useState(JSON.parse(localStorage.getItem('session')))
  useEffect(() => {
    const pathName = location.pathname.split('/')
    filterAnalyticsSetCurrentTab(pathName[pathName.length - 1])
    setSession(JSON.parse(localStorage.getItem('session')))
  }, [location])

  const isProdEnviroment = useMemo(() => {
    return !!(
      window &&
      window.location &&
      window.location.href &&
      !window.location.href.includes('localhost') &&
      !window.location.href.includes('dev')
    )
  }, [window])
  const currentParticipant = useSelector(({ identity }) => identity.current_participant)

  return (
    <StyledContainer>
      <TabsHeader>
        {isProdEnviroment && !isBetaTester(session.email) ? null : (
          <Link to='/admin/analytics/roi'>
            <TabItem isActive={location.pathname.includes('roi')}>
              <StyledIcon type='percentage' isActive={location.pathname.includes('roi')} />
              <Typography.Text strong>{intl.get('navigation.roi')}</Typography.Text>
            </TabItem>
          </Link>
        )}
        <Link to='/admin/analytics/overview'>
          <TabItem isActive={location.pathname.includes('overview')}>
            <StyledIcon type='appstore' theme='filled' isActive={location.pathname.includes('overview')} />
            <Typography.Text strong>{intl.get('navigation.overview')}</Typography.Text>
          </TabItem>
        </Link>
        <Link to='/admin/analytics/audience'>
          <TabItem isActive={location.pathname.includes('audience')}>
            <StyledIcon type='user' isActive={location.pathname.includes('audience')} />
            <Typography.Text strong>{intl.get('navigation.audience')}</Typography.Text>
          </TabItem>
        </Link>
        <Link to='/admin/analytics/geography'>
          <TabItem isActive={location.pathname.includes('geography')}>
            <StyledIcon type='global' isActive={location.pathname.includes('geography')} />
            <Typography.Text strong>{intl.get('navigation.geography')}</Typography.Text>
          </TabItem>
        </Link>
        <Link to='/admin/analytics/conversion'>
          <TabItem isActive={location.pathname.includes('conversion')}>
            <StyledIcon type='rise' isActive={location.pathname.includes('conversion')} />
            <Typography.Text strong>{intl.get('navigation.conversion')}</Typography.Text>
          </TabItem>
        </Link>
        <Link to='/admin/analytics/spend'>
          <TabItem isActive={location.pathname.includes('spend')}>
            <StyledIcon type='dollar' isActive={location.pathname.includes('spend')} />
            <Typography.Text strong>{intl.get('navigation.spend')}</Typography.Text>
          </TabItem>
        </Link>
        {currentParticipant === 'urn:authenticateit:participant:1' && (
          <Link to='/admin/analytics/shoppinglists'>
            <TabItem isActive={location.pathname.includes('shoppinglists')}>
              <StyledIcon type='stock' isActive={location.pathname.includes('shoppinglists')} />
              <Typography.Text strong>{intl.get('navigation.shoppinglists')}</Typography.Text>
            </TabItem>
          </Link>
        )}
      </TabsHeader>
      <AnalyticInformation>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path='/admin/analytics/overview' component={Overview} />
            <Route path='/admin/analytics/audience' component={Audience} />
            <Route path='/admin/analytics/geography' component={Geography} />
            <Route path='/admin/analytics/conversion' component={Conversion} />
            <Route path='/admin/analytics/spend' component={Spend} />
            {currentParticipant === 'urn:authenticateit:participant:1' && (
              <Route path='/admin/analytics/shoppinglists' component={Shoppinglists} />
            )}
            {isProdEnviroment && !isBetaTester(session.email) ? null : (
              <Route path='/admin/analytics/roi' component={Roi} />
            )}
            <Redirect to='/admin/analytics/overview' />
          </Switch>
        </Suspense>
      </AnalyticInformation>
    </StyledContainer>
  )
}

AnalyticPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
  filterAnalyticsSetCurrentTab: PropTypes.func.isRequired
}

export default connect(null, { filterAnalyticsSetCurrentTab })(withRouter(AnalyticPage))
