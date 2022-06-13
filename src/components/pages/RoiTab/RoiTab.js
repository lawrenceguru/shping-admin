import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PageWidgetWrapper from '../../molecules/PageWidgetWrapper'
import RenderGridItems from './RenderGridItems'
import Panel from '../../organisms/FilterPanel'

const SpendTab = ({ isLoadingNewFiltersInfo }) => {
  const [layout, setLayout] = useState([])
  const [cols, setCols] = useState(4)

  return (
    <PageWidgetWrapper pageName='roiPage' layout={layout} cols={cols}>
      {(invisibleItems, setInvisibleItemsCallback, setWidgetModalVisible) => (
        <>
          <Panel setModal={state => setWidgetModalVisible(state)} />
          <RenderGridItems
            invisibleItems={invisibleItems}
            setInvisibleItemsCallback={setInvisibleItemsCallback}
            getLayoutForParent={setLayout}
            getCols={setCols}
            isLoadingNewFiltersInfo={isLoadingNewFiltersInfo}
          />
        </>
      )}
    </PageWidgetWrapper>
  )
}

SpendTab.propTypes = {
  isLoadingNewFiltersInfo: PropTypes.bool
}

SpendTab.defaultProps = {
  isLoadingNewFiltersInfo: false
}
export default SpendTab
