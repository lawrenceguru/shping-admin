import React, { useState } from 'react'
import PropTypes from 'prop-types'
import 'react-grid-layout/css/styles.css'
import PageWidgetWrapper from '../../molecules/PageWidgetWrapper'
import RenderGridItems from './RenderGridItems'

const AudienceTab = ({ isLoadingNewFiltersInfo }) => {
  const [layout, setLayout] = useState([])
  const [cols, setCols] = useState(4)

  return (
    <PageWidgetWrapper pageName='audiencePage' layout={layout} cols={cols}>
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

AudienceTab.propTypes = {
  isLoadingNewFiltersInfo: PropTypes.bool
}

AudienceTab.defaultProps = {
  isLoadingNewFiltersInfo: false
}

export default AudienceTab
