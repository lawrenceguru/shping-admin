import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PageWidgetWrapper from '../../molecules/PageWidgetWrapper'
import RenderGridItems from './RenderGridItems'

const GeographyTab = ({ isLoadingNewFiltersInfo }) => {
  const [layout, setLayout] = useState([])
  const [cols, setCols] = useState(4)

  return (
    <PageWidgetWrapper pageName='geographyPage' layout={layout} cols={cols}>
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

GeographyTab.propTypes = {
  isLoadingNewFiltersInfo: PropTypes.bool
}

GeographyTab.defaultProps = {
  isLoadingNewFiltersInfo: false
}

export default GeographyTab
