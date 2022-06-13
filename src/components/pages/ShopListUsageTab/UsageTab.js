import React, { useState } from 'react'
import PageWidgetWrapper from '../../molecules/PageWidgetWrapper'
import RenderGridItems from './RenderGridItems'
import Panel from '../../organisms/FilterPanel'

const UsageTab = () => {
  const [layout, setLayout] = useState([])
  const [cols, setCols] = useState(4)
  return (
    <PageWidgetWrapper pageName='shoppinglistsPage' layout={layout} cols={cols}>
      {(invisibleItems, setInvisibleItemsCallback, setWidgetModalVisible) => (
        <>
          <Panel
            setModal={state => setWidgetModalVisible(state)}
            hasBrandFilter={false}
            hasPostcodeFilter
            hasRangeFilter
            hasStateFilter
          />
          <RenderGridItems
            invisibleItems={invisibleItems}
            setInvisibleItemsCallback={setInvisibleItemsCallback}
            getLayoutForParent={setLayout}
            getCols={setCols}
          />
        </>
      )}
    </PageWidgetWrapper>
  )
}

export default UsageTab
