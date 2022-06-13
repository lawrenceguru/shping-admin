import React, { lazy, Suspense } from 'react'
import intl from 'react-intl-universal'
import { Typography } from 'antd'
import PropTypes from 'prop-types'
import { withRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import Loader from '../../templates/Loader'
import { StyledContainer, TabsHeader, TabItem, ProfileSettings } from './styles'

const ProfileUser = lazy(() => import('../../organisms/ProfileUser'))
const ProfilePassword = lazy(() => import('../../organisms/ProfilePassword'))
const ProfileParticipant = lazy(() => import('../../organisms/ProfileParticipant'))
const ProfileBuddies = lazy(() => import('../../organisms/ProfileBuddies'))
const Profile = ({ location }) => {
  return (
    <StyledContainer>
      <TabsHeader>
        <Link to='/admin/settings/profile/user'>
          <TabItem isActive={location.pathname.includes('user')}>
            <Typography.Text strong>{intl.get('profile.userSettings')}</Typography.Text>
          </TabItem>
        </Link>
        <Link to='/admin/settings/profile/password'>
          <TabItem isActive={location.pathname.includes('password')}>
            <Typography.Text strong>{intl.get('profile.passwordSettings')}</Typography.Text>
          </TabItem>
        </Link>
        <Link to='/admin/settings/profile/participant'>
          <TabItem isActive={location.pathname.includes('participant')}>
            <Typography.Text strong>{intl.get('profile.participantSettings')}</Typography.Text>
          </TabItem>
        </Link>
        <Link to='/admin/settings/profile/buddies'>
          <TabItem isActive={location.pathname.includes('buddies')}>
            <Typography.Text strong>{intl.get('profile.buddies')}</Typography.Text>
          </TabItem>
        </Link>
      </TabsHeader>
      <ProfileSettings>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path='/admin/settings/profile/user' component={ProfileUser} />
            <Route path='/admin/settings/profile/password' component={ProfilePassword} />
            <Route path='/admin/settings/profile/participant' component={ProfileParticipant} />
            <Route path='/admin/settings/profile/buddies' component={ProfileBuddies} />
            <Redirect to='/admin/settings/profile/user' />
          </Switch>
        </Suspense>
      </ProfileSettings>
    </StyledContainer>
  )
}

Profile.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired
}

export default withRouter(Profile)
