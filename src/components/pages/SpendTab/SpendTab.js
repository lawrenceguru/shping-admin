import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PageWidgetWrapper from '../../molecules/PageWidgetWrapper'
import RenderGridItems from './RenderGridItems'
import Panel from '../../organisms/FilterPanel'
import ImpressionsModal from '../../atoms/ImpressionsModal'

const SpendTab = ({ isLoadingNewFiltersInfo }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedItemData, setSelectedItemData] = useState(null)
  const [layout, setLayout] = useState([])
  const [cols, setCols] = useState(4)
  const setModal = data => {
    setModalVisible(!modalVisible)
    setSelectedItemData(data)
  }
  return (
    <PageWidgetWrapper pageName='spendsPage' layout={layout} cols={cols}>
      {(invisibleItems, setInvisibleItemsCallback, setWidgetModalVisible) => (
        <>
          {!!selectedItemData && (
            <ImpressionsModal
              selectedItemData={selectedItemData}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          )}
          <Panel isHaveGtinFilter setModal={state => setWidgetModalVisible(state)} hasRangeFilter />
          <RenderGridItems
            invisibleItems={invisibleItems}
            setInvisibleItemsCallback={setInvisibleItemsCallback}
            getLayoutForParent={setLayout}
            getCols={setCols}
            setModal={setModal}
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
