import React, { lazy, Suspense, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
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

const ReviewsListTab = lazy(() => import('../ReviewsListTab'))
const ReviewsTemplatesTab = lazy(() => import('../ReviewsTemplatesTab'))
const ReviewsTemplatesCreate = lazy(() => import('../ReviewsTemplatesTab/create'))
const ReviewsTemplatesEdit = lazy(() => import('../ReviewsTemplatesTab/edit'))

const TodoCardsPage = ({ location }) => {
  const containerRef = useRef(null)
  const links = useMemo(
    () => [
      {
        destination: '/admin/reviews/all',
        isActive: location.pathname.includes('all'),
        iconType: 'container',
        title: intl.get('reviews.tabs.reviews')
      },
      {
        destination: '/admin/reviews/templates',
        isActive: location.pathname.includes('templates') || location.pathname.includes('templates/editor'),
        iconType: 'container',
        title: intl.get('reviews.tabs.templates')
      }
    ],
    [location]
  )
  return (
    <StyledContainer ref={containerRef}>
      <Tabs linksList={links} />
      <RedirectTabs>
        <Suspense fallback={<Loader />}>
          <Switch>
            <PrivateRoute
              exact
              path='/admin/reviews/all'
              component={props => <ReviewsListTab {...props} containerRef={containerRef} />}
            />
            <PrivateRoute
              exact
              path='/admin/reviews/templates'
              component={props => <ReviewsTemplatesTab {...props} />}
            />
            <PrivateRoute
              exact
              path='/admin/reviews/templates/create'
              component={props => <ReviewsTemplatesCreate {...props} />}
            />
            <PrivateRoute
              path='/admin/reviews/templates/:id'
              component={props => <ReviewsTemplatesEdit {...props} />}
            />
            <Redirect to='/admin/reviews/all' />
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
