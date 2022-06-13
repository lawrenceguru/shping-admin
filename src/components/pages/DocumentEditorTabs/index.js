import React, { lazy, Suspense, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Switch, Redirect, Route } from 'react-router-dom'
import intl from 'react-intl-universal'
import styled from 'styled-components'
import Loader from '../../templates/Loader'
import Tabs from '../../atoms/Tabs'
import RedirectTabs from '../../atoms/RedirectTabs'

const StyledContainer = styled.div`
  position: relative;
  max-height: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  & > section {
    margin-top: 0;
  }
`

const DocumentsWidgets = lazy(() => import('../../organisms/DocumentsWidgets'))
const DocumentsAttachmentsTab = lazy(() => import('../DocumentsAttachmentsTab'))

const DocumentEditorTabs = ({ location }) => {
  const containerRef = useRef(null)
  const id = useMemo(() => {
    const pathSplit = location.pathname.split('/')
    return pathSplit[pathSplit.length - 1]
  }, [location])

  const links = useMemo(
    () => [
      {
        destination: `/admin/documents/editor/${id}`,
        isActive: !location.pathname.includes('attach-product'),
        iconType: 'container',
        title: intl.get('documents.tabs.documents')
      },
      {
        destination: `/admin/documents/editor/attach-product/${id}`,
        isActive: location.pathname.includes('attach-product'),
        iconType: 'container',
        title: intl.get('documents.tabs.attach')
      }
    ],
    [location]
  )
  return (
    <StyledContainer id='container2' ref={containerRef}>
      <Tabs linksList={links} />
      <RedirectTabs>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path='/admin/documents/editor/attach-product/:id?' component={DocumentsAttachmentsTab} />
            <Route
              exac
              path='/admin/documents/editor/:id?'
              component={props => <DocumentsWidgets {...props} idContainer='container2' containerRef={containerRef} />}
            />
            <Redirect to='/admin/documents' />
          </Switch>
        </Suspense>
      </RedirectTabs>
    </StyledContainer>
  )
}

DocumentEditorTabs.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  location: PropTypes.object.isRequired
}

export default withRouter(DocumentEditorTabs)
