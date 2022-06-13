import React, { useState } from 'react'
import PropTypes from 'prop-types'
import 'react-grid-layout/css/styles.css'
import PageWidgetWrapper from '../../molecules/PageWidgetWrapper'
import RenderGridItems from './RenderGridItems'

const ConversionTab = ({ isLoadingNewFiltersInfo }) => {
  const [layout, setLayout] = useState([])
  const [cols, setCols] = useState(4)

  return (
    <PageWidgetWrapper pageName='conversionPage' layout={layout} cols={cols}>
      {(invisibleItems, setInvisibleItemsCallback, setWidgetModalVisible) => (
        <RenderGridItems
          invisibleItems={invisibleItems}
          getLayoutForParent={setLayout}
          getCols={setCols}
          setInvisibleItemsCallback={setInvisibleItemsCallback}
          setWidgetModalVisible={setWidgetModalVisible}
          isLoadingNewFiltersInfo={isLoadingNewFiltersInfo}
        />
      )}
    </PageWidgetWrapper>
  )
}

ConversionTab.propTypes = {
  isLoadingNewFiltersInfo: PropTypes.bool
}

ConversionTab.defaultProps = {
  isLoadingNewFiltersInfo: false
}

export default ConversionTab
