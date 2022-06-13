import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PageWidgetWrapper from '../../molecules/PageWidgetWrapper'
import RenderGridItems from './RenderGridItems'
import Panel from '../../organisms/FilterPanel'
import ImpressionsModal from '../../atoms/ImpressionsModal'

const OverviewTab = ({ isLoadingNewFiltersInfo }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedItemData, setSelectedItemData] = useState(null)
  const [layout, setLayout] = useState([])
  const [cols, setCols] = useState(4)

  const setModal = data => {
    setModalVisible(!modalVisible)
    setSelectedItemData(data)
  }

  return (
    <div id='overviewPage'>
      <PageWidgetWrapper pageName='overviewPage' layout={layout} cols={cols}>
        {(invisibleItems, setInvisibleItemsCallback, setWidgetModalVisible) => (
          <>
            {!!selectedItemData && (
              <ImpressionsModal
                selectedItemData={selectedItemData}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
              />
            )}
            <Panel setModal={state => setWidgetModalVisible(state)} hasRangeFilter />
            <RenderGridItems
              invisibleItems={invisibleItems}
              getLayoutForParent={setLayout}
              getCols={setCols}
              setInvisibleItemsCallback={setInvisibleItemsCallback}
              setModal={setModal}
              isLoadingNewFiltersInfo={isLoadingNewFiltersInfo}
            />
          </>
        )}
      </PageWidgetWrapper>
    </div>
  )
}

OverviewTab.propTypes = {
  isLoadingNewFiltersInfo: PropTypes.bool
}

OverviewTab.defaultProps = {
  isLoadingNewFiltersInfo: false
}
export default OverviewTab
