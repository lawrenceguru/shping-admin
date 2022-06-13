import React, { lazy, useRef, useMemo } from 'react'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import * as ST from './styles'
import Tabs from '../../atoms/Tabs'
import RedirectTabs from '../../atoms/RedirectTabs'

const ProductCatalogue = lazy(() => import('../ProductCatalogueTab'))
const ProductWidgets = lazy(() => import('../../organisms/ProductWidgets'))
const RecalledProducts = lazy(() => import('../RecalledProductsTab'))
const ProductImport = lazy(() => import('../ProductsImport'))
const ProductImportStatus = lazy(() => import('../ProductImportStatus'))
const ReceiptsMapping = lazy(() => import('../ReceiptsMappingTab'))
const ReceiptsMappingDetail = lazy(() => import('../ReceiptsMappingDetail'))

const ProductsPage = ({ location }) => {
  const containerRef = useRef(null)

  const links = useMemo(
    () => [
      {
        destination: '/admin/products/catalogue',
        isActive: location.pathname.includes('catalogue'),
        iconType: 'container',
        title: intl.get('productsPage.Product Catalogue')
      },
      {
        destination: '/admin/products/recalled',
        isActive: location.pathname.includes('recalled'),
        title: intl.get('productsPage.Recalled Products')
      },
      {
        destination: '/admin/products/receipts-mapping',
        isActive: location.pathname.includes('receipts-mapping'),
        title: intl.get('productsPage.Receipts Mapping')
      }
    ],
    [location]
  )

  return (
    <ST.StyledContainer id='container1' ref={containerRef}>
      <Tabs linksList={links} />
      <RedirectTabs>
        <Switch>
          <Route
            exac
            path='/admin/products/catalogue/edit/:id?'
            component={props => <ProductWidgets {...props} containerRef={containerRef} />}
          />
          <Route
            exac
            path='/admin/products/catalogue/add-product'
            component={props => <ProductWidgets {...props} containerRef={containerRef} />}
          />
          <Route exac path='/admin/products/catalogue/import' component={ProductImport} />
          <Route exac path='/admin/products/catalogue/import-status' component={ProductImportStatus} />
          <Route exac path='/admin/products/catalogue' component={ProductCatalogue} />
          <Route exac path='/admin/products/recalled' component={RecalledProducts} />
          <Route exac path='/admin/products/receipts-mapping/:id' component={ReceiptsMappingDetail} />
          <Route exac path='/admin/products/receipts-mapping' component={ReceiptsMapping} />
          <Redirect to='/admin/products/catalogue' />
        </Switch>
      </RedirectTabs>
    </ST.StyledContainer>
  )
}

ProductsPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired
}

export default withRouter(ProductsPage)
