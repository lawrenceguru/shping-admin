import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PageWidgetWrapper from '../../molecules/PageWidgetWrapper'
import RenderGridItems from './RenderGridItems'
import Panel from '../../organisms/SerializationFilterPanel'

const OverviewSerializationTab = ({ isLoadingNewFiltersInfo }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [layout, setLayout] = useState([])
  const [cols, setCols] = useState(4)

  const setModal = () => {
    setModalVisible(!modalVisible)
  }
  return (
    <PageWidgetWrapper pageName='serializationOverviewPage' layout={layout} cols={cols}>
      {(invisibleItems, setInvisibleItemsCallback, setWidgetModalVisible) => (
        <>
          <Panel setModal={state => setWidgetModalVisible(state)} />
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
  )
}

OverviewSerializationTab.propTypes = {
  isLoadingNewFiltersInfo: PropTypes.bool
}

OverviewSerializationTab.defaultProps = {
  isLoadingNewFiltersInfo: false
}

export default OverviewSerializationTab
