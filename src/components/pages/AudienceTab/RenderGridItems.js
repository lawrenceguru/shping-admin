import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Responsive, WidthProvider } from 'react-grid-layout'
import AudienceGraphPanel from '../../organisms/AudienceGraphPanel'
import AudiencePieGenders from '../../organisms/AudiencePieGenders'
import AudiencePieRetailers from '../../organisms/AudiencePieRetailers'
import AudiencePieTotalUsers from '../../organisms/AudiencePieTotalUsers'
import AudiencePieGenerations from '../../organisms/AudiencePieGenerations'
import 'react-grid-layout/css/styles.css'
import Panel from '../../organisms/FilterPanel'
import Loader from '../../templates/Loader'
import { getUserConfiguration, setUserOrder } from '../../../utils/localStorage'
import { useWindowSize } from '../../molecules/Table/utils'

const widgetsEnum = {
  1: 'audience',
  2: 'gender',
  3: 'generation',
  5: 'totalUsers'
}

const WidgetsSettings = [
  { i: '1', x: 0, y: 0, w: 3, h: 3 },
  { i: '2', x: 0, y: 0, w: 1, h: 4 },
  { i: '3', x: 1, y: 0, w: 1, h: 4 },
  { i: '5', x: 3, y: 0, w: 1, h: 4 }
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
    return localStorage.getItem('order') && JSON.parse(localStorage.getItem('order')).audiencePage
      ? JSON.parse(localStorage.getItem('order')).audiencePage.filter(({ i }) => i !== '4')
      : WidgetsSettings
  }, [])
  const [layout, setLayout] = useState(getLayout)
  const [width] = useWindowSize()
  const [maxItemsCount, setMaxItemsCount] = useState(0)
  const [maxPieHeight, setMaxPieHeight] = useState(5)
  const setFilteredLayout = () => {
    const layouts = [...getLayout].filter(el => !invisibleItems.includes(widgetsEnum[el.i]))
    WidgetsSettings.forEach(item => {
      const indexInLayout = layouts.findIndex(el => el.i === item.i)
      if (indexInLayout === -1 && !invisibleItems.includes(widgetsEnum[item.i])) {
        layouts.push(item)
      }
    })
    return layouts
  }

  const rerenderHeightWidget = useCallback(
    lays => {
      const oldSized = [...lays]

      // eslint-disable-next-line no-plusplus
      for (let ind = 1; ind < oldSized.length; ind++) {
        oldSized[ind] = { ...oldSized[ind], h: maxPieHeight }
      }

      setLayout(oldSized)
      setUserOrder('audiencePage', oldSized)
    },
    [maxPieHeight]
  )

  useEffect(() => {
    const order = localStorage.getItem('order')

    if (order && order.audiencePage) {
      getLayoutForParent(order.audiencePage)
    }
  }, [])

  useEffect(() => {
    if (width > 1599) {
      getCols(3)
    } else if (width > 1024) {
      getCols(2)
    }
  }, [width])

  useEffect(() => {
    const newLayout = setFilteredLayout()
    rerenderHeightWidget(newLayout)
  }, [invisibleItems])

  useEffect(() => {
    const isCheckedOnRetailersWidgetAudience = JSON.parse(localStorage.getItem('isCheckedOnRetailersWidgetAudience'))
    if (!isCheckedOnRetailersWidgetAudience) {
      const userConfig = getUserConfiguration('audiencePage')
      const invisible = [
        {
          pageName: 'audiencePage',
          widgetName: 'retailers'
        }
      ]

      setInvisibleItemsCallback(
        invisible.filter(item => !(userConfig && Array.isArray(userConfig) && userConfig.includes(item.widgetName)))
      )

      const newLayout = setFilteredLayout()
      setLayout(newLayout)
      localStorage.setItem('isCheckedOnRetailersWidgetAudience', true)
    }
  }, [])

  const addInvisible = layer => {
    const newLayer = [...layer]
    getLayout.forEach(el => {
      if (newLayer.findIndex(item => item.i === el.i) === -1) {
        newLayer.push(el)
      }
    })
    return newLayer
  }

  const getMaxCountItems = useCallback(
    count => {
      if (maxItemsCount < count) {
        setMaxItemsCount(count)
      }
    },
    [maxItemsCount]
  )

  useEffect(() => {
    switch (maxItemsCount) {
      case 1:
        setMaxPieHeight(3.2)
        break
      case 2:
        setMaxPieHeight(3.2)
        break
      case 3:
        setMaxPieHeight(3.4)
        break
      case 4:
        setMaxPieHeight(3.6)
        break
      case 5:
        setMaxPieHeight(3.8)
        break
      case 6:
        setMaxPieHeight(4.0)
        break
      case 7:
        setMaxPieHeight(4.2)
        break
      case 8:
        setMaxPieHeight(4.4)
        break
      case 9:
        setMaxPieHeight(4.6)
        break
      case 10:
        setMaxPieHeight(4.8)
        break
      default:
        setMaxPieHeight(3)
    }
  }, [maxItemsCount])

  useEffect(() => {
    const newLayout = setFilteredLayout()
    rerenderHeightWidget(newLayout)
  }, [maxPieHeight])

  // eslint-disable-next-line consistent-return
  const renderComponent = gridData => {
    if (gridData.i === '1') {
      return (
        <AudienceGraphPanel
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'audiencePage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
        />
      )
    }
    if (gridData.i === '2') {
      return (
        <AudiencePieGenders
          getMaxCountItems={getMaxCountItems}
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'audiencePage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
        />
      )
    }
    if (gridData.i === '3') {
      return (
        <AudiencePieGenerations
          getMaxCountItems={getMaxCountItems}
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'audiencePage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
        />
      )
    }
    if (gridData.i === '4') {
      return (
        <AudiencePieRetailers
          getMaxCountItems={getMaxCountItems}
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'audiencePage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
        />
      )
    }
    if (gridData.i === '5') {
      return (
        <AudiencePieTotalUsers
          getMaxCountItems={getMaxCountItems}
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'audiencePage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
        />
      )
    }
  }
  const onBreakpointChange = (point, cols) => {
    getCols(cols)
    if (point !== 'xs') {
      let currLayout = [...layout]
      const index = currLayout.findIndex(el => el.i === '1')
      if (index !== -1 && currLayout[index] && currLayout[index].w !== 3) {
        currLayout[index].w = 3
      }
      currLayout = addInvisible(currLayout)
      setLayout(currLayout)
      setUserOrder('audiencePage', currLayout)
    }
  }

  const onLayoutChange = lay => {
    setLayout(lay)
    setUserOrder('audiencePage', lay)
  }

  return (
    <>
      <Panel setModal={state => setWidgetModalVisible(state)} isCityInputShow />
      <ResponsiveGridLayout
        className='layout'
        style={{ display: isLoadingNewFiltersInfo ? 'none' : 'block' }}
        layouts={{ lg: layout, md: layout, sm: layout, xs: layout }}
        breakpoints={{ lg: 1200, md: 1024, sm: 767, xs: 0 }}
        onBreakpointChange={onBreakpointChange}
        measureBeforeMount
        onDragStop={onLayoutChange}
        margin={[15, 15]}
        cols={{ lg: 3, md: 2, sm: 1, xs: 1 }}
        onLayoutChange={newLayout => getLayoutForParent(newLayout)}
      >
        {layout.map(gridData => {
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
