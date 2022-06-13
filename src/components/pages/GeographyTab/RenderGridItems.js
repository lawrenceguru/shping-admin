import React, { useEffect, useMemo, useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import PropTypes from 'prop-types'
import GeographyGraphPanel from '../../organisms/GeographyGraphPanel'
// import GeographyPieCountries from '../../organisms/GeographyPieCountries'
// import GeographyPieStates from '../../organisms/GeographyPieStates'
import 'react-grid-layout/css/styles.css'
import Panel from '../../organisms/FilterPanel'
import Loader from '../../templates/Loader'
import { setUserOrder } from '../../../utils/localStorage'
import { useWindowSize } from '../../molecules/Table/utils'

const widgetsEnum = {
  1: 'geography'
  // 2: 'country',
  // 3: 'state'
}

const WidgetsSettings = [
  { i: '1', x: 0, y: 0, w: 4, h: 4 }
  // { i: '2', x: 0, y: 0, w: 1, h: 4.5 },
  // { i: '3', x: 1, y: 0, w: 1, h: 4.5 }
]
const ResponsiveGridLayout = WidthProvider(Responsive)
const renderGridItems = ({
  invisibleItems,
  setInvisibleItemsCallback,
  setWidgetModalVisible,
  isLoadingNewFiltersInfo,
  getLayoutForParent,
  getCols
}) => {
  const getLayout = useMemo(() => {
    return localStorage.getItem('order') && JSON.parse(localStorage.getItem('order')).geographyPage
      ? JSON.parse(localStorage.getItem('order')).geographyPage.map(item => ({
          ...item,
          w: WidgetsSettings.find(elem => elem.i === item.i).w
        }))
      : WidgetsSettings
  }, [])

  const [layout, setLayout] = useState(getLayout)
  const [width] = useWindowSize()
  const setFilteredLayout = () => {
    return [...layout].filter(el => !invisibleItems.includes(widgetsEnum[el.i]))
  }

  useEffect(() => {
    const order = localStorage.getItem('order')

    if (order && order.geographyPage) {
      getLayoutForParent(order.geographyPage)
    }
  }, [])

  useEffect(() => {
    if (width > 1599) {
      getCols(2)
    } else if (width > 1024) {
      getCols(2)
    }
  }, [width])

  useEffect(() => {
    const newLayout = setFilteredLayout()
    setLayout(newLayout)
    window.dispatchEvent(new Event('resize'))
  }, [invisibleItems])

  const addInvisible = layer => {
    const newLayer = [...layer]
    getLayout.forEach(el => {
      if (newLayer.findIndex(item => item.i === el.i) === -1) {
        newLayer.push(el)
      }
    })
    return newLayer
  }
  // eslint-disable-next-line consistent-return
  const renderComponent = gridData => {
    if (gridData.i === '1') {
      return (
        <GeographyGraphPanel
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'geographyPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
        />
      )
    }
    // if (gridData.i === '2') {
    //   return (
    //     <GeographyPieCountries
    //       key={gridData.i}
    //       setItem={() =>
    //         setInvisibleItemsCallback({
    //           pageName: 'geographyPage',
    //           widgetName: widgetsEnum[gridData.i]
    //         })
    //       }
    //     />
    //   )
    // }
    // if (gridData.i === '3') {
    //   return (
    //     <GeographyPieStates
    //       key={gridData.i}
    //       setItem={() =>
    //         setInvisibleItemsCallback({
    //           pageName: 'geographyPage',
    //           widgetName: widgetsEnum[gridData.i]
    //         })
    //       }
    //     />
    //   )
    // }
  }

  const onBreakpointChange = (point, cols) => {
    getCols(cols)
    if (point !== 'xs') {
      let currLayout = [...layout]
      const index = currLayout.findIndex(el => el.i === '1')
      if (index !== -1 && currLayout[index] && currLayout[index].w !== 2) {
        currLayout[index].w = 2
      }
      currLayout = addInvisible(currLayout)
      setLayout(currLayout)
      setUserOrder('geographyPage', currLayout)
    }
  }
  return (
    <>
      <Panel setModal={state => setWidgetModalVisible(state)} />
      <ResponsiveGridLayout
        className='layout'
        style={{ display: isLoadingNewFiltersInfo ? 'none' : 'block' }}
        layouts={{ lg: layout, md: layout, sm: layout, xs: layout }}
        breakpoints={{ lg: 1600, md: 1024, sm: 767, xs: 0 }}
        onBreakpointChange={onBreakpointChange}
        measureBeforeMount
        cols={{ lg: 2, md: 2, sm: 2, xs: 1 }}
        draggableCancel='.gm-style'
        onLayoutChange={newLayout => getLayoutForParent(newLayout)}
      >
        {layout
          .filter(el => {
            return !invisibleItems.includes(widgetsEnum[el.i])
          })
          .map(gridData => {
            return renderComponent(gridData)
          })}
      </ResponsiveGridLayout>
      <Loader style={{ display: isLoadingNewFiltersInfo ? 'block' : 'none' }} />
    </>
  )
}

renderGridItems.propTypes = {
  invisibleItems: PropTypes.arrayOf(PropTypes.string),
  setInvisibleItemsCallback: PropTypes.func.isRequired,
  isLoadingNewFiltersInfo: PropTypes.bool.isRequired,
  setWidgetModalVisible: PropTypes.func.isRequired,
  getLayoutForParent: PropTypes.func.isRequired,
  getCols: PropTypes.func.isRequired
}

renderGridItems.defaultProps = {
  invisibleItems: []
}

export default renderGridItems
