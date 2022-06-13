import React, { lazy, useRef } from 'react'
import styled from 'styled-components'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'

const DocumentsList = lazy(() => import('../DocumentsList'))
const DocumentsEditorTabs = lazy(() => import('../DocumentEditorTabs'))
const DocumentsWidget = lazy(() => import('../../organisms/DocumentsWidgets'))

export const StyledContainer = styled.div`
  margin-top: 96px;
  max-height: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`

const DocumentsPage = () => {
  const containerRef = useRef(null)
  return (
    <StyledContainer id='container1' ref={containerRef}>
      <Switch>
        <Route
          path='/admin/documents/editor/:id?'
          component={props => <DocumentsEditorTabs {...props} containerRef={containerRef} />}
        />
        <Route
          exac
          path='/admin/documents/add-document'
          component={props => <DocumentsWidget {...props} containerRef={containerRef} />}
        />
        <Route exac path='/admin/documents' component={DocumentsList} />
        <Redirect to='/admin/documents' />
      </Switch>
    </StyledContainer>
  )
}

export default withRouter(DocumentsPage)
